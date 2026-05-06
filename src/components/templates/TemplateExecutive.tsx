import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateExecutive({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Garamond', 'Georgia', serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "56px 64px" }}>
      <header style={{ textAlign: "left", marginBottom: 22, paddingBottom: 14, borderBottom: `3px solid ${accent}` }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0, letterSpacing: "0.02em" }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontSize: s.h2, color: accent, fontStyle: "italic", marginTop: 4 }}>{data.personal.jobTitle}</div>}
        <div style={{ fontSize: s.small, marginTop: 10, color: "#444" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean).join("   |   ")}
        </div>
      </header>
      {show("summary") && data.summary && <Section title="Executive Summary" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></Section>}
      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Professional Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: s.h3, fontWeight: 700, color: accent }}>{e.company}</div>
                <div style={{ fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              </div>
              <div style={{ fontStyle: "italic", marginBottom: 4 }}>{e.role}{e.location && ` — ${e.location}`}</div>
              <ul style={{ margin: "0 0 0 18px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" accent={accent} s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.degree}{e.field && `, ${e.field}`}</strong> — {e.institution}</div>
                <div style={{ fontSize: s.small, color: "#666" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</div>
              </div>
            </div>
          ))}
        </Section>
      )}
      {show("skills") && (data.skills.technical.length + data.skills.tools.length) > 0 && (
        <Section title="Core Competencies" accent={accent} s={s}>
          <div style={{ columns: 3, columnGap: 24 }}>
            {[...data.skills.technical, ...data.skills.tools].map((sk) => (
              <div key={sk} style={{ breakInside: "avoid", marginBottom: 2 }}>• {sk}</div>
            ))}
          </div>
        </Section>
      )}
      {show("achievements") && data.achievements.length > 0 && (
        <Section title="Notable Achievements" accent={accent} s={s}>
          <ul style={{ margin: "0 0 0 18px" }}>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </Section>
      )}
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, margin: "0 0 8px" }}>{title}</h2>
      {children}
    </section>
  );
}
