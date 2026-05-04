import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateAcademic({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "'Cambria', 'Georgia', serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "48px 60px" }}>
      <header style={{ textAlign: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: s.h1, margin: 0, fontWeight: 700 }}>{data.personal.fullName || "Your Name"}</h1>
        <div style={{ fontSize: s.small, color: "#555", marginTop: 4 }}>
          {[data.personal.location, data.personal.email, data.personal.phone, data.personal.linkedin, data.personal.website].filter(Boolean).join(" · ")}
        </div>
      </header>

      {show("summary") && data.summary && <Section title="Research Statement" accent={accent} s={s}><p style={{ margin: 0, textAlign: "justify" }}>{data.summary}</p></Section>}

      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" accent={accent} s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.institution}</strong>
                <span>{[e.startYear, e.endYear].filter(Boolean).join(" – ")}</span>
              </div>
              <div style={{ fontStyle: "italic" }}>{e.degree}{e.field && `, ${e.field}`}{e.grade && ` · ${e.grade}`}</div>
              {e.achievements && <div style={{ marginTop: 2 }}>{e.achievements}</div>}
            </div>
          ))}
        </Section>
      )}

      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Appointments & Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.role}</strong>, <span style={{ fontStyle: "italic" }}>{e.company}</span>{e.location && ` — ${e.location}`}</div>
                <span>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</span>
              </div>
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {show("projects") && data.projects.some((p) => p.name) && (
        <Section title="Selected Projects" accent={accent} s={s}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <strong>{p.name}</strong>{p.link && <span style={{ color: "#666" }}> — {p.link}</span>}
              {p.description && <div>{p.description}</div>}
              {p.bullets.filter(Boolean).length > 0 && <ul style={{ margin: "2px 0 0 18px" }}>{p.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>}
            </div>
          ))}
        </Section>
      )}

      {show("certifications") && data.certifications.length > 0 && (
        <Section title="Certifications" accent={accent} s={s}>
          {data.certifications.map((c) => <div key={c.id}>{c.name}{c.issuer && `, ${c.issuer}`}{c.date && ` (${c.date})`}</div>)}
        </Section>
      )}

      {show("skills") && (data.skills.technical.length + data.skills.tools.length + data.skills.languages.length) > 0 && (
        <Section title="Skills & Languages" accent={accent} s={s}>
          {data.skills.technical.length > 0 && <div><strong>Methods:</strong> {data.skills.technical.join(", ")}</div>}
          {data.skills.tools.length > 0 && <div><strong>Tools:</strong> {data.skills.tools.join(", ")}</div>}
          {data.skills.languages.length > 0 && <div><strong>Languages:</strong> {data.skills.languages.join(", ")}</div>}
        </Section>
      )}

      {show("achievements") && data.achievements.length > 0 && (
        <Section title="Honors & Awards" accent={accent} s={s}>
          <ul style={{ margin: "0 0 0 18px" }}>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </Section>
      )}
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 14 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: accent, margin: "0 0 6px", borderBottom: `1px solid ${accent}55`, paddingBottom: 3 }}>{title}</h2>
      {children}
    </section>
  );
}
