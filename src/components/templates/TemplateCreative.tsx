import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateCreative({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "44px 56px" }}>
      <header style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 24, paddingBottom: 18, borderBottom: `4px double ${accent}` }}>
        <div>
          <div style={{ fontSize: s.small, color: accent, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Portfolio</div>
          <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 38, fontWeight: 600, margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>{data.personal.fullName || "Your Name"}</h1>
          {data.personal.jobTitle && <div style={{ marginTop: 4, fontStyle: "italic", color: "#555" }}>{data.personal.jobTitle}</div>}
        </div>
        <div style={{ fontSize: s.small, color: "#555", textAlign: "right" }}>
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
          {data.personal.website && <div style={{ color: accent }}>{data.personal.website}</div>}
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "62% 38%", gap: 28, marginTop: 22 }}>
        <div>
          {show("summary") && data.summary && (
            <Block title="Story" accent={accent} s={s}><p style={{ margin: 0, fontSize: s.h3, lineHeight: 1.55, fontFamily: "Fraunces, Georgia, serif" }}>{data.summary}</p></Block>
          )}
          {show("experience") && data.experience.some((e) => e.company || e.role) && (
            <Block title="Experience" accent={accent} s={s}>
              {data.experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${accent}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{e.role}</strong>
                    <span style={{ fontSize: s.small, color: "#777" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</span>
                  </div>
                  <div style={{ color: accent, fontWeight: 500 }}>{e.company}</div>
                  <ul style={{ margin: "4px 0 0 16px" }}>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
              ))}
            </Block>
          )}
          {show("projects") && data.projects.some((p) => p.name) && (
            <Block title="Selected Work" accent={accent} s={s}>
              {data.projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 8 }}>
                  <strong>{p.name}</strong>{p.link && <span style={{ color: accent, fontSize: s.small }}> — {p.link}</span>}
                  {p.description && <div>{p.description}</div>}
                </div>
              ))}
            </Block>
          )}
        </div>
        <aside>
          {show("skills") && data.skills.technical.length > 0 && (
            <Block title="Craft" accent={accent} s={s}>
              {data.skills.technical.map((sk) => <div key={sk} style={{ paddingBottom: 3, marginBottom: 3, borderBottom: "1px dotted #ddd" }}>{sk}</div>)}
            </Block>
          )}
          {show("skills") && data.skills.tools.length > 0 && (
            <Block title="Tools" accent={accent} s={s}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {data.skills.tools.map((t) => <span key={t} style={{ fontSize: s.small, padding: "1px 7px", border: `1px solid ${accent}55`, borderRadius: 999, color: accent }}>{t}</span>)}
              </div>
            </Block>
          )}
          {show("education") && data.education.some((e) => e.institution) && (
            <Block title="Education" accent={accent} s={s}>
              {data.education.map((e) => (
                <div key={e.id} style={{ marginBottom: 6 }}>
                  <div><strong>{e.institution}</strong></div>
                  <div style={{ fontSize: s.small, color: "#666" }}>{e.degree}{e.field && `, ${e.field}`} — {[e.startYear, e.endYear].filter(Boolean).join("–")}</div>
                </div>
              ))}
            </Block>
          )}
          {show("hobbies") && data.hobbies.length > 0 && (
            <Block title="Off-screen" accent={accent} s={s}><div>{data.hobbies.join(" · ")}</div></Block>
          )}
        </aside>
      </div>
    </div>
  );
}
function Block({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: s.h2, fontWeight: 600, color: accent, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{title}</h2>
      {children}
    </section>
  );
}
