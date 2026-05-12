import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateOnyx({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line }}>
      <header style={{ background: "#0f0f10", color: "#fff", padding: "40px 56px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontSize: s.h2, color: accent, marginTop: 4, fontWeight: 500 }}>{data.personal.jobTitle}</div>}
        <div style={{ fontSize: s.small, marginTop: 12, color: "#bbb", display: "flex", flexWrap: "wrap", gap: 14 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean).map((x, i) => <span key={i}>{x}</span>)}
        </div>
      </header>
      <div style={{ padding: "32px 56px" }}>
        {show("summary") && data.summary && <Section title="Profile" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}
        {show("experience") && data.experience.some((e) => e.company || e.role) && (
          <Section title="Experience" accent={accent} s={s}>
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div><strong>{e.role}</strong> · <span style={{ color: accent }}>{e.company}</span></div>
                  <div style={{ fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
                </div>
                <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
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
                <span key={sk} style={{ background: "#f3f3f1", padding: "3px 10px", borderRadius: 999, fontSize: s.small }}>{sk}</span>
              ))}
            </div>
          </Section>
        )}
        {show("education") && data.education.some((e) => e.institution) && (
          <Section title="Education" accent={accent} s={s}>
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.institution}</strong> — {e.degree}{e.field && `, ${e.field}`}</div>
                <div style={{ fontSize: s.small, color: "#666" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</div>
              </div>
            ))}
          </Section>
        )}
        {show("projects") && data.projects.some((p) => p.name) && (
          <Section title="Projects" accent={accent} s={s}>
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <strong>{p.name}</strong>
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
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0f0f10", margin: "0 0 8px", borderBottom: `2px solid ${accent}`, paddingBottom: 4, display: "inline-block" }}>{title}</h2>
      <div style={{ marginTop: 6 }}>{children}</div>
    </section>
  );
}