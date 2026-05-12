import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateNordic({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1f2933", fontSize: s.base, lineHeight: s.line, padding: "52px 60px", background: "#fafaf7" }}>
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #d8d5cc", paddingBottom: 12 }}>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, letterSpacing: "0.04em" }}>{data.personal.fullName || "Your Name"}</h1>
          <div style={{ fontSize: s.small, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>{data.personal.jobTitle}</div>
        </div>
        <div style={{ fontSize: s.small, marginTop: 10, color: "#5a6470", display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean).map((x, i) => <span key={i}>{x}</span>)}
        </div>
      </header>
      {show("summary") && data.summary && <Section title="Summary" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}
      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
              <div style={{ fontSize: s.small, color: "#5a6470" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              <div>
                <div><strong>{e.role}</strong> — <span style={{ color: accent }}>{e.company}</span></div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </Section>
      )}
      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" accent={accent} s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
              <div style={{ fontSize: s.small, color: "#5a6470" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</div>
              <div><strong>{e.institution}</strong> — {e.degree}{e.field && `, ${e.field}`}</div>
            </div>
          ))}
        </Section>
      )}
      {show("skills") && (data.skills.technical.length + data.skills.tools.length) > 0 && (
        <Section title="Skills" accent={accent} s={s}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
            <div style={{ fontSize: s.small, color: "#5a6470" }}>Tools</div>
            <div>{[...data.skills.technical, ...data.skills.tools].join(" · ")}</div>
          </div>
        </Section>
      )}
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h2 style={{ fontSize: s.small, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: accent, margin: "0 0 10px" }}>{title}</h2>
      {children}
    </section>
  );
}