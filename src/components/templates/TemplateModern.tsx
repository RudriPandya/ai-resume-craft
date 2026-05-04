import { ResumeData } from "@/lib/resume-types";
import { accentHex, sizeMap, formatDateRange } from "./template-utils";

export default function TemplateModern({ data }: { data: ResumeData }) {
  const accent = accentHex(data.meta.colorScheme);
  const s = sizeMap[data.meta.fontSize];
  const hidden = data.meta.sectionsHidden;
  const show = (id: string) => !hidden.includes(id);
  const initials = (data.personal.fullName || "Y N").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1f1f1f", fontSize: s.base, lineHeight: s.line, display: "grid", gridTemplateColumns: "34% 66%", minHeight: "100%" }}>
      {/* Sidebar */}
      <aside style={{ background: accent, color: "#fff", padding: "40px 24px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 22, marginBottom: 18 }}>{initials}</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.jobTitle && <div style={{ fontSize: s.h3, opacity: 0.9, marginTop: 4 }}>{data.personal.jobTitle}</div>}

        <SidebarBlock title="Contact" s={s}>
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
          {data.personal.github && <div>{data.personal.github}</div>}
          {data.personal.website && <div>{data.personal.website}</div>}
        </SidebarBlock>

        {show("skills") && data.skills.technical.length > 0 && (
          <SidebarBlock title="Skills" s={s}>{data.skills.technical.map((sk) => <Pill key={sk}>{sk}</Pill>)}</SidebarBlock>
        )}
        {show("skills") && data.skills.tools.length > 0 && (
          <SidebarBlock title="Tools" s={s}>{data.skills.tools.map((sk) => <Pill key={sk}>{sk}</Pill>)}</SidebarBlock>
        )}
        {show("skills") && data.skills.languages.length > 0 && (
          <SidebarBlock title="Languages" s={s}>{data.skills.languages.map((l) => <div key={l}>{l}</div>)}</SidebarBlock>
        )}
        {show("hobbies") && data.hobbies.length > 0 && (
          <SidebarBlock title="Interests" s={s}><div>{data.hobbies.join(" • ")}</div></SidebarBlock>
        )}
      </aside>

      {/* Main */}
      <main style={{ padding: "40px 36px", background: "#fff" }}>
        {show("summary") && data.summary && <MainSection title="Profile" accent={accent} s={s}><p style={{ margin: 0 }}>{data.summary}</p></MainSection>}
        {show("experience") && data.experience.some((e) => e.company || e.role) && (
          <MainSection title="Experience" accent={accent} s={s}>
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.role || "Role"}</strong>
                  <span style={{ fontSize: s.small, color: "#666" }}>{formatDateRange(e.startDate, e.endDate, e.isCurrent)}</span>
                </div>
                <div style={{ fontSize: s.h3, color: accent, fontWeight: 500 }}>{e.company}{e.location && ` · ${e.location}`}</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </MainSection>
        )}
        {show("projects") && data.projects.some((p) => p.name) && (
          <MainSection title="Projects" accent={accent} s={s}>
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <strong>{p.name}</strong>{p.techStack.length > 0 && <span style={{ color: "#666", fontSize: s.small }}> — {p.techStack.join(", ")}</span>}
                {p.description && <div>{p.description}</div>}
                {p.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: "2px 0 0 16px" }}>{p.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </MainSection>
        )}
        {show("education") && data.education.some((e) => e.institution) && (
          <MainSection title="Education" accent={accent} s={s}>
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.institution}</strong>
                  <span style={{ fontSize: s.small, color: "#666" }}>{[e.startYear, e.endYear].filter(Boolean).join(" — ")}</span>
                </div>
                <div>{e.degree}{e.field && ` in ${e.field}`}{e.grade && ` · ${e.grade}`}</div>
                {e.achievements && <div style={{ fontSize: s.small, color: "#555" }}>{e.achievements}</div>}
              </div>
            ))}
          </MainSection>
        )}
        {show("certifications") && data.certifications.length > 0 && (
          <MainSection title="Certifications" accent={accent} s={s}>
            {data.certifications.map((c) => <div key={c.id}>{c.name}{c.issuer && ` — ${c.issuer}`}{c.date && ` (${c.date})`}</div>)}
          </MainSection>
        )}
        {show("achievements") && data.achievements.length > 0 && (
          <MainSection title="Achievements" accent={accent} s={s}>
            <ul style={{ margin: "0 0 0 16px" }}>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </MainSection>
        )}
      </main>
    </div>
  );
}

function SidebarBlock({ title, s, children }: any) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ fontSize: s.h3, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: s.small, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}
function Pill({ children }: any) {
  return <span style={{ display: "inline-block", padding: "2px 8px", background: "rgba(255,255,255,0.18)", borderRadius: 999, marginRight: 4, marginBottom: 4 }}>{children}</span>;
}
function MainSection({ title, accent, s, children }: any) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: s.h2, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: accent, margin: "0 0 8px" }}>{title}</h2>
      {children}
    </section>
  );
}
