import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateCompact({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a1a", fontSize: s.base, lineHeight: 1.4, padding: "32px 44px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `2px solid ${accent}`, paddingBottom: 8, marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{data.personal.fullName || "Your Name"}</h1>
          {data.personal.jobTitle && <div style={{ fontSize: s.h3, color: accent, fontWeight: 500 }}>{data.personal.jobTitle}</div>}
        </div>
        <div style={{ fontSize: s.small, color: "#555", textAlign: "right" }}>
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
        </div>
      </header>
      {show("summary") && data.summary && <p style={{ margin: "0 0 12px" }}>{data.summary}</p>}
      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.role}</strong> · {e.company}{e.location && `, ${e.location}`}</div>
                <div style={{ fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              </div>
              <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          {show("education") && data.education.some((e) => e.institution) && (
            <Section title="Education" accent={accent} s={s}>
              {data.education.map((e) => (
                <div key={e.id} style={{ marginBottom: 6 }}>
                  <div><strong>{e.institution}</strong></div>
                  <div style={{ fontSize: s.small }}>{e.degree}{e.field && `, ${e.field}`} · {[e.startYear, e.endYear].filter(Boolean).join("–")}</div>
                </div>
              ))}
            </Section>
          )}
          {show("projects") && data.projects.some((p) => p.name) && (
            <Section title="Projects" accent={accent} s={s}>
              {data.projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 6 }}><strong>{p.name}</strong>{p.description && <div style={{ fontSize: s.small }}>{p.description}</div>}</div>
              ))}
            </Section>
          )}
        </div>
        <div>
          {show("skills") && data.skills.technical.length > 0 && (
            <Section title="Skills" accent={accent} s={s}><div>{data.skills.technical.join(" · ")}</div></Section>
          )}
          {show("skills") && data.skills.tools.length > 0 && (
            <Section title="Tools" accent={accent} s={s}><div>{data.skills.tools.join(" · ")}</div></Section>
          )}
          {show("achievements") && data.achievements.length > 0 && (
            <Section title="Awards" accent={accent} s={s}><ul style={{ margin: "0 0 0 16px" }}>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul></Section>
          )}
        </div>
      </div>
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 10 }}>
      <h2 style={{ fontSize: s.h3, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: "0 0 4px" }}>{title}</h2>
      {children}
    </section>
  );
}
