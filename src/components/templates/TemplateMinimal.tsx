import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateMinimal({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#222", fontSize: s.base, lineHeight: s.line, padding: "56px 64px" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: s.h1, fontWeight: 500, letterSpacing: "-0.02em", margin: 0, color: "#111" }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontSize: s.h3, color: accent, marginTop: 2 }}>{data.personal.jobTitle}</div>}
        <div style={{ fontSize: s.small, color: "#777", marginTop: 8 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean).join(" · ")}
        </div>
      </header>

      {show("summary") && data.summary && <Section title="About" s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}

      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Experience" s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
              <div style={{ fontSize: s.small, color: "#888" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              <div>
                <div><strong>{e.role}</strong>{e.company && <span style={{ color: "#666" }}>, {e.company}</span>}</div>
                <ul style={{ margin: "4px 0 0 14px", padding: 0 }}>
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </Section>
      )}

      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 8, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
              <div style={{ fontSize: s.small, color: "#888" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</div>
              <div>
                <div><strong>{e.institution}</strong></div>
                <div style={{ color: "#555" }}>{e.degree}{e.field && ` in ${e.field}`}{e.grade && ` · ${e.grade}`}</div>
                {e.achievements && <div style={{ color: "#666", fontSize: s.small, marginTop: 2 }}>{e.achievements}</div>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {show("skills") && (data.skills.technical.length + data.skills.tools.length + data.skills.soft.length) > 0 && (
        <Section title="Skills" s={s}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, marginBottom: 4 }}>
            {data.skills.technical.length > 0 && (<><div style={{ fontSize: s.small, color: "#888" }}>Technical</div><div>{data.skills.technical.join(" · ")}</div></>)}
          </div>
          {data.skills.tools.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, marginBottom: 4 }}><div style={{ fontSize: s.small, color: "#888" }}>Tools</div><div>{data.skills.tools.join(" · ")}</div></div>}
          {data.skills.soft.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}><div style={{ fontSize: s.small, color: "#888" }}>Strengths</div><div>{data.skills.soft.join(" · ")}</div></div>}
        </Section>
      )}

      {show("projects") && data.projects.some((p) => p.name) && (
        <Section title="Projects" s={s}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
              <div style={{ fontSize: s.small, color: "#888" }}>{p.techStack.slice(0, 2).join(", ")}</div>
              <div>
                <strong>{p.name}</strong>
                {p.description && <div>{p.description}</div>}
                {p.bullets.filter(Boolean).length > 0 && <ul style={{ margin: "2px 0 0 14px" }}>{p.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>}
              </div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, s, children }: any) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 500, color: "#111", margin: "0 0 10px", paddingBottom: 4, borderBottom: "1px solid #eaeaea" }}>{title}</h2>
      {children}
    </section>
  );
}
