import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateElegant({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const show = (id: string) => !data.meta.sectionsHidden.includes(id);
  return (
    <div style={{ fontFamily: "Fraunces, Georgia, serif", color: "#1a1a1a", fontSize: s.base, lineHeight: s.line, padding: "60px 72px" }}>
      <header style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: s.small, letterSpacing: "0.4em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Curriculum Vitae</div>
        <h1 style={{ fontSize: 40, fontWeight: 400, margin: 0, letterSpacing: "0.04em" }}>{data.personal.fullName || "Your Name"}</h1>
        <div style={{ width: 60, height: 1, background: accent, margin: "12px auto" }} />
        {data.personal.jobTitle && <div style={{ fontStyle: "italic", color: "#555" }}>{data.personal.jobTitle}</div>}
        <div style={{ fontSize: s.small, color: "#666", marginTop: 8, fontFamily: "Inter, sans-serif" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin].filter(Boolean).join("  ·  ")}
        </div>
      </header>
      {show("summary") && data.summary && (
        <section style={{ marginBottom: 22, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          <p style={{ margin: 0, fontStyle: "italic", fontSize: s.h3, lineHeight: 1.6 }}>"{data.summary}"</p>
        </section>
      )}
      {show("experience") && data.experience.some((e) => e.company || e.role) && (
        <Section title="Experience" accent={accent} s={s}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: s.h3 }}>{e.role}</div>
              <div style={{ color: accent, fontStyle: "italic" }}>{e.company}{e.location && ` · ${e.location}`}</div>
              <div style={{ fontSize: s.small, color: "#888", marginBottom: 4, fontFamily: "Inter, sans-serif" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</div>
              <ul style={{ margin: "4px auto 0", padding: 0, listStyle: "none", maxWidth: 560 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 3 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      {show("education") && data.education.some((e) => e.institution) && (
        <Section title="Education" accent={accent} s={s}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6, textAlign: "center" }}>
              <strong>{e.institution}</strong> — {e.degree}{e.field && `, ${e.field}`} <span style={{ color: "#888" }}>({[e.startYear, e.endYear].filter(Boolean).join("–")})</span>
            </div>
          ))}
        </Section>
      )}
      {show("skills") && (data.skills.technical.length + data.skills.tools.length) > 0 && (
        <Section title="Skills" accent={accent} s={s}>
          <div style={{ textAlign: "center" }}>{[...data.skills.technical, ...data.skills.tools].join("  ·  ")}</div>
        </Section>
      )}
    </div>
  );
}
function Section({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: s.small, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: accent, textAlign: "center", margin: "0 0 12px", fontFamily: "Inter, sans-serif" }}>— {title} —</h2>
      {children}
    </section>
  );
}
