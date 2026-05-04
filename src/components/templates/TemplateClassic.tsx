import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateClassic({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const hidden = data.meta.sectionsHidden;
  const show = (id: string) => !hidden.includes(id);

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "48px 56px" }}>
      <header style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: 16, marginBottom: 20 }}>
        <h1 style={{ fontSize: s.h1, fontWeight: 700, letterSpacing: "0.04em", margin: 0, textTransform: "uppercase" }}>
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.jobTitle && (
          <div style={{ fontSize: s.h3, fontStyle: "italic", marginTop: 4, color: "#444" }}>{data.personal.jobTitle}</div>
        )}
        <div style={{ fontSize: s.small, marginTop: 8, color: "#555" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website, data.personal.github]
            .filter(Boolean).join("  •  ")}
        </div>
      </header>

      {show("summary") && data.summary && <Section title="Summary" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}

      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div><strong>{e.role}</strong>{e.company && <>, <span style={{ fontStyle: "italic" }}>{e.company}</span></>}</div>
                <div style={{ fontSize: s.small, color: "#555" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              </div>
              {e.location && <div style={{ fontSize: s.small, color: "#666", marginBottom: 4 }}>{e.location}</div>}
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" accent={accent} s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.institution}</strong>{e.degree && <> — {e.degree}{e.field && ` in ${e.field}`}</>}</div>
                <div style={{ fontSize: s.small, color: "#555" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</div>
              </div>
              {e.grade && <div style={{ fontSize: s.small, color: "#666" }}>{e.grade}</div>}
              {e.achievements && <div style={{ marginTop: 2 }}>{e.achievements}</div>}
            </div>
          ))}
        </Section>
      )}

      {show("skills") && (data.skills.technical.length + data.skills.soft.length + data.skills.tools.length > 0) && (
        <Section title="Skills" accent={accent} s={s}>
          {data.skills.technical.length > 0 && <div><strong>Technical:</strong> {data.skills.technical.join(", ")}</div>}
          {data.skills.tools.length > 0 && <div><strong>Tools:</strong> {data.skills.tools.join(", ")}</div>}
          {data.skills.soft.length > 0 && <div><strong>Strengths:</strong> {data.skills.soft.join(", ")}</div>}
          {data.skills.languages.length > 0 && <div><strong>Languages:</strong> {data.skills.languages.join(", ")}</div>}
        </Section>
      )}

      {show("projects") && data.projects.some((p) => p.name) && (
        <Section title="Projects" accent={accent} s={s}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div><strong>{p.name}</strong>{p.techStack.length > 0 && <span style={{ fontSize: s.small, color: "#666" }}> — {p.techStack.join(", ")}</span>}</div>
              {p.description && <div>{p.description}</div>}
              {p.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: "2px 0 0 18px" }}>{p.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {show("certifications") && data.certifications.length > 0 && (
        <Section title="Certifications" accent={accent} s={s}>
          {data.certifications.map((c) => (
            <div key={c.id}>{c.name}{c.issuer && ` — ${c.issuer}`}{c.date && ` (${c.date})`}</div>
          ))}
        </Section>
      )}

      {show("achievements") && data.achievements.length > 0 && (
        <Section title="Achievements" accent={accent} s={s}>
          <ul style={{ margin: "0 0 0 18px" }}>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </Section>
      )}

      {show("hobbies") && data.hobbies.length > 0 && (
        <Section title="Interests" accent={accent} s={s}><div>{data.hobbies.join(" • ")}</div></Section>
      )}
    </div>
  );
}

function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 14 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}33`, paddingBottom: 4, margin: "0 0 8px" }}>{title}</h2>
      {children}
    </section>
  );
}
