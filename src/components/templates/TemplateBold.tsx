import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateBold({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line }}>
      <header style={{ background: accent, color: "#fff", padding: "44px 56px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontSize: s.h2, fontWeight: 500, marginTop: 6, opacity: 0.95 }}>{data.personal.jobTitle}</div>}
        <div style={{ fontSize: s.small, marginTop: 14, opacity: 0.9 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean).join("  ·  ")}
        </div>
      </header>

      <div style={{ padding: "32px 56px" }}>
        {show("summary") && data.summary && <Section title="Summary" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}

        {show("experience") && data.experience.some((e) => e.company || e.role) && (
          <Section title="Experience" accent={accent} s={s}>
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontWeight: 700, fontSize: s.h3 }}>{e.role} <span style={{ color: accent }}>· {e.company}</span></div>
                  <div style={{ fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
                </div>
                {e.location && <div style={{ fontSize: s.small, color: "#888" }}>{e.location}</div>}
                <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {show("skills") && (data.skills.technical.length + data.skills.tools.length) > 0 && (
          <Section title="Skills" accent={accent} s={s}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[...data.skills.technical, ...data.skills.tools].map((sk) => (
                <span key={sk} style={{ padding: "3px 10px", background: `${accent}18`, color: accent, borderRadius: 4, fontWeight: 500, fontSize: s.small }}>{sk}</span>
              ))}
            </div>
          </Section>
        )}

        {show("education") && data.education.some((e) => e.institution) && (
          <Section title="Education" accent={accent} s={s}>
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.institution}</strong>
                  <span style={{ fontSize: s.small, color: "#666" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</span>
                </div>
                <div>{e.degree}{e.field && ` in ${e.field}`}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </Section>
        )}

        {show("projects") && data.projects.some((p) => p.name) && (
          <Section title="Projects" accent={accent} s={s}>
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 8 }}>
                <strong>{p.name}</strong>{p.techStack.length > 0 && <span style={{ color: "#666", fontSize: s.small }}> — {p.techStack.join(", ")}</span>}
                {p.description && <div>{p.description}</div>}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, margin: "0 0 8px", display: "inline-block", borderBottom: `3px solid ${accent}`, paddingBottom: 2 }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
