import { ResumeData } from "./resume-types";

/** Flatten a resume to plain text for AI ATS checks. */
export function resumeToText(r: ResumeData): string {
  const lines: string[] = [];
  const p = r.personal;
  lines.push(`${p.fullName} — ${p.jobTitle}`);
  lines.push([p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean).join(" | "));
  if (r.summary) lines.push("\nSUMMARY\n" + r.summary);
  if (r.experience.length) {
    lines.push("\nEXPERIENCE");
    r.experience.forEach((e) => {
      lines.push(`${e.role} — ${e.company} (${e.startDate} – ${e.isCurrent ? "Present" : e.endDate})`);
      e.bullets.filter(Boolean).forEach((b) => lines.push("• " + b));
    });
  }
  if (r.education.length) {
    lines.push("\nEDUCATION");
    r.education.forEach((e) => lines.push(`${e.degree} ${e.field} — ${e.institution} (${e.startYear}–${e.endYear})${e.achievements ? ". " + e.achievements : ""}`));
  }
  const allSkills = [...r.skills.technical, ...r.skills.tools, ...r.skills.soft, ...r.skills.languages];
  if (allSkills.length) lines.push("\nSKILLS\n" + allSkills.join(", "));
  if (r.projects.length) {
    lines.push("\nPROJECTS");
    r.projects.forEach((pr) => {
      lines.push(`${pr.name}${pr.techStack.length ? " — " + pr.techStack.join(", ") : ""}`);
      if (pr.description) lines.push(pr.description);
      pr.bullets.filter(Boolean).forEach((b) => lines.push("• " + b));
    });
  }
  if (r.achievements.length) lines.push("\nACHIEVEMENTS\n" + r.achievements.join(" • "));
  return lines.join("\n");
}

export function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}