import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateTech({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  const mono = "'JetBrains Mono', 'Menlo', 'Consolas', monospace";
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "44px 52px" }}>
      <header style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: mono, fontSize: s.small, color: accent, marginBottom: 6 }}>$ whoami</div>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontFamily: mono, color: "#555", marginTop: 2 }}>// {data.personal.jobTitle}</div>}
        <div style={{ fontFamily: mono, fontSize: s.small, color: "#666", marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {data.personal.email && <span>✉ {data.personal.email}</span>}
          {data.personal.phone && <span>☎ {data.personal.phone}</span>}
          {data.personal.location && <span>⌖ {data.personal.location}</span>}
          {data.personal.github && <span>⌥ {data.personal.github}</span>}
          {data.personal.linkedin && <span>in/ {data.personal.linkedin}</span>}
        </div>
      </header>
      {show("summary") && data.summary && <Section title="about" accent={accent} s={s} mono={mono}><p style={{ margin: 0 }}>{data.summary}</p></Section>}
      {show("skills") && (data.skills.technical.length + data.skills.tools.length) > 0 && (
        <Section title="stack" accent={accent} s={s} mono={mono}>
          {data.skills.technical.length > 0 && (
            <div style={{ marginBottom: 4, fontFamily: mono, fontSize: s.small }}>
              <span style={{ color: accent }}>languages</span> = [{data.skills.technical.map((t) => `"${t}"`).join(", ")}]
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div style={{ fontFamily: mono, fontSize: s.small }}>
              <span style={{ color: accent }}>tools</span> = [{data.skills.tools.map((t) => `"${t}"`).join(", ")}]
            </div>
          )}
        </Section>
      )}
      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="experience" accent={accent} s={s} mono={mono}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `2px solid ${accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.role}</strong> <span style={{ fontFamily: mono, color: accent }}>@ {e.company}</span></div>
                <div style={{ fontFamily: mono, fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              </div>
              <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      {show("projects") && data.projects.some((p) => p.name) && (
        <Section title="projects" accent={accent} s={s} mono={mono}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div><strong>{p.name}</strong>{p.techStack.length > 0 && <span style={{ fontFamily: mono, fontSize: s.small, color: "#666" }}> [{p.techStack.join(", ")}]</span>}</div>
              {p.description && <div>{p.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="education" accent={accent} s={s} mono={mono}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 4 }}>
              <strong>{e.institution}</strong> — {e.degree}{e.field && `, ${e.field}`} <span style={{ fontFamily: mono, fontSize: s.small, color: "#666" }}>({[e.startYear, e.endYear].filter(Boolean).join("–")})</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}
function Section({ title, accent, s, mono, children }: any) {
  return (
    <section style={{ marginBottom: 14 }}>
      <h2 style={{ fontFamily: mono, fontSize: s.h3, fontWeight: 600, color: accent, margin: "0 0 6px" }}>## {title}</h2>
      {children}
    </section>
  );
}
