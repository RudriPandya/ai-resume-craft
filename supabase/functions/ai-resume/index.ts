// AI Resume helper — uses Google Gemini API. Public function, no JWT required.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

type Task =
  | "bullets"
  | "summary"
  | "skills"
  | "ats"
  | "jd_match"
  | "cover_letter"
  | "project_desc"
  | "education_achievements";

interface Body {
  task: Task;
  payload: Record<string, unknown>;
}

function buildMessages(task: Task, p: any): { system: string; user: string; tool?: any } {
  switch (task) {
    case "bullets":
      return {
        system: "You write punchy, ATS-friendly resume bullet points. Always start with a strong past-tense action verb. Quantify outcomes. Keep each bullet under 22 words. Truthful — never invent specifics.",
        user: `Write 4 resume bullet points for this role.\nRole: ${p.role}\nCompany: ${p.company}\nContext: ${p.context || "(none)"}\nReturn JSON only via the tool.`,
        tool: {
          name: "return_bullets",
          description: "Return 4 resume bullet points",
          parameters: {
            type: "object",
            properties: { bullets: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 } },
            required: ["bullets"],
            additionalProperties: false,
          },
        },
      };
    case "summary":
      return {
        system: "You write professional resume summaries. 3 sentences, ~50-70 words. Confident, specific, no clichés like 'results-driven'. No first-person pronouns.",
        user: `Write a professional summary.\nName: ${p.name}\nTitle: ${p.title}\nYears experience: ${p.years || "unspecified"}\nTop skills: ${(p.skills || []).join(", ")}\nKey experience: ${p.experience || "(none)"}\nReturn JSON via the tool.`,
        tool: {
          name: "return_summary",
          description: "Return a professional summary",
          parameters: {
            type: "object",
            properties: { summary: { type: "string" } },
            required: ["summary"],
            additionalProperties: false,
          },
        },
      };
    case "skills":
      return {
        system: "You suggest relevant skills for resumes. Be specific to the role and industry.",
        user: `Suggest skills for: ${p.title}${p.industry ? ` in ${p.industry}` : ""}. Return 10 technical, 5 soft, 6 tools.`,
        tool: {
          name: "return_skills",
          description: "Return categorized skills",
          parameters: {
            type: "object",
            properties: {
              technical: { type: "array", items: { type: "string" } },
              soft: { type: "array", items: { type: "string" } },
              tools: { type: "array", items: { type: "string" } },
            },
            required: ["technical", "soft", "tools"],
            additionalProperties: false,
          },
        },
      };
    case "ats":
      return {
        system: "You audit resumes for ATS compatibility. Be precise and actionable.",
        user: `Analyze for ATS compatibility (0-100 score). Resume:\n${p.resumeText}\n\n${p.jobDescription ? `Job description:\n${p.jobDescription}` : ""}`,
        tool: {
          name: "return_ats",
          description: "Return ATS analysis",
          parameters: {
            type: "object",
            properties: {
              score: { type: "number" },
              issues: { type: "array", items: { type: "string" } },
              fixes: { type: "array", items: { type: "string" } },
              keywords_missing: { type: "array", items: { type: "string" } },
            },
            required: ["score", "issues", "fixes", "keywords_missing"],
            additionalProperties: false,
          },
        },
      };
    case "jd_match":
      return {
        system: "You rewrite resumes to better match job descriptions. Keep it truthful — never fabricate experience.",
        user: `Job description:\n${p.jobDescription}\n\nCurrent summary:\n${p.summary}\n\nTop bullets:\n${(p.bullets || []).join("\n")}`,
        tool: {
          name: "return_jd_match",
          description: "Return rewrites tailored to JD",
          parameters: {
            type: "object",
            properties: {
              summary: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
              tips: { type: "array", items: { type: "string" } },
            },
            required: ["summary", "bullets", "tips"],
            additionalProperties: false,
          },
        },
      };
    case "cover_letter":
      return {
        system: "You write professional cover letters. 3 paragraphs, max 280 words. Confident, specific, no clichés like 'I am writing to express my interest'.",
        user: `Applicant: ${p.name}\nRole: ${p.role} at ${p.company}\nResume summary: ${p.summary}\nKey experience: ${p.experience || ""}\nTone: ${p.tone || "Professional"}\nJob description: ${p.jobDescription || "(none)"}`,
        tool: {
          name: "return_letter",
          description: "Return cover letter",
          parameters: {
            type: "object",
            properties: { letter: { type: "string" } },
            required: ["letter"],
            additionalProperties: false,
          },
        },
      };
    case "project_desc":
      return {
        system: "You write punchy resume project descriptions. 2-3 sentences highlighting technical complexity and measurable impact.",
        user: `Project: ${p.name}\nTech: ${(p.tech || []).join(", ")}\nContext: ${p.context || ""}`,
        tool: {
          name: "return_project",
          description: "Return project description and 3 bullets",
          parameters: {
            type: "object",
            properties: {
              description: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
            },
            required: ["description", "bullets"],
            additionalProperties: false,
          },
        },
      };
    case "education_achievements":
      return {
        system: "You suggest concise, plausible academic achievements/coursework lines for resumes.",
        user: `Degree: ${p.degree} in ${p.field} at ${p.institution}. Suggest 3 short achievement lines.`,
        tool: {
          name: "return_edu",
          description: "Return education achievements",
          parameters: {
            type: "object",
            properties: { items: { type: "array", items: { type: "string" } } },
            required: ["items"],
            additionalProperties: false,
          },
        },
      };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const { task, payload } = (await req.json()) as Body;
    if (!task || !payload) {
      return new Response(JSON.stringify({ error: "task and payload required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { system, user, tool } = buildMessages(task, payload);

    const body: any = {
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    };
    if (tool) {
      body.tools = [{ type: "function", function: tool }];
      body.tool_choice = { type: "function", function: { name: tool.name } };
    }

    const resp = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit reached. Please wait a moment and try again." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("Gemini API error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI API error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const choice = data.choices?.[0];
    let result: any = {};
    const toolCall = choice?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      try { result = JSON.parse(toolCall.function.arguments); } catch (e) { result = { raw: toolCall.function.arguments }; }
    } else {
      result = { text: choice?.message?.content ?? "" };
    }

    return new Response(JSON.stringify({ task, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
