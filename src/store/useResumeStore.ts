import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData, ExperienceItem, EducationItem, ProjectItem, CertificationItem,
  Personal, TemplateId, ColorScheme, FontSize,
  blankExperience, blankEducation, blankProject, blankCertification, emptyResume,
} from "@/lib/resume-types";

interface State {
  resume: ResumeData;
  loadSample: (sample: ResumeData) => void;
  reset: () => void;
  // meta
  setTemplate: (t: TemplateId) => void;
  setColor: (c: ColorScheme) => void;
  setFontSize: (s: FontSize) => void;
  toggleSection: (id: string) => void;
  // personal & summary
  updatePersonal: (patch: Partial<Personal>) => void;
  setSummary: (s: string) => void;
  // experience
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  setExperienceBullets: (id: string, bullets: string[]) => void;
  // education
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  // skills
  setSkills: (key: keyof ResumeData["skills"], values: string[]) => void;
  // projects
  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  // certifications
  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  // simple lists
  setAchievements: (a: string[]) => void;
  setHobbies: (h: string[]) => void;
}

const touch = (r: ResumeData): ResumeData => ({ ...r, meta: { ...r.meta, lastUpdated: new Date().toISOString() } });

export const useResumeStore = create<State>()(
  persist(
    (set) => ({
      resume: emptyResume(),
      loadSample: (sample) => set({ resume: touch(sample) }),
      reset: () => set({ resume: emptyResume() }),
      setTemplate: (t) => set((s) => ({ resume: touch({ ...s.resume, meta: { ...s.resume.meta, template: t } }) })),
      setColor: (c) => set((s) => ({ resume: touch({ ...s.resume, meta: { ...s.resume.meta, colorScheme: c } }) })),
      setFontSize: (sz) => set((s) => ({ resume: touch({ ...s.resume, meta: { ...s.resume.meta, fontSize: sz } }) })),
      toggleSection: (id) => set((s) => {
        const hidden = s.resume.meta.sectionsHidden;
        const next = hidden.includes(id) ? hidden.filter((x) => x !== id) : [...hidden, id];
        return { resume: touch({ ...s.resume, meta: { ...s.resume.meta, sectionsHidden: next } }) };
      }),
      updatePersonal: (patch) => set((s) => ({ resume: touch({ ...s.resume, personal: { ...s.resume.personal, ...patch } }) })),
      setSummary: (summary) => set((s) => ({ resume: touch({ ...s.resume, summary }) })),
      addExperience: () => set((s) => ({ resume: touch({ ...s.resume, experience: [...s.resume.experience, blankExperience()] }) })),
      updateExperience: (id, patch) => set((s) => ({ resume: touch({ ...s.resume, experience: s.resume.experience.map((e) => e.id === id ? { ...e, ...patch } : e) }) })),
      removeExperience: (id) => set((s) => ({ resume: touch({ ...s.resume, experience: s.resume.experience.filter((e) => e.id !== id) }) })),
      setExperienceBullets: (id, bullets) => set((s) => ({ resume: touch({ ...s.resume, experience: s.resume.experience.map((e) => e.id === id ? { ...e, bullets } : e) }) })),
      addEducation: () => set((s) => ({ resume: touch({ ...s.resume, education: [...s.resume.education, blankEducation()] }) })),
      updateEducation: (id, patch) => set((s) => ({ resume: touch({ ...s.resume, education: s.resume.education.map((e) => e.id === id ? { ...e, ...patch } : e) }) })),
      removeEducation: (id) => set((s) => ({ resume: touch({ ...s.resume, education: s.resume.education.filter((e) => e.id !== id) }) })),
      setSkills: (key, values) => set((s) => ({ resume: touch({ ...s.resume, skills: { ...s.resume.skills, [key]: values } }) })),
      addProject: () => set((s) => ({ resume: touch({ ...s.resume, projects: [...s.resume.projects, blankProject()] }) })),
      updateProject: (id, patch) => set((s) => ({ resume: touch({ ...s.resume, projects: s.resume.projects.map((p) => p.id === id ? { ...p, ...patch } : p) }) })),
      removeProject: (id) => set((s) => ({ resume: touch({ ...s.resume, projects: s.resume.projects.filter((p) => p.id !== id) }) })),
      addCertification: () => set((s) => ({ resume: touch({ ...s.resume, certifications: [...s.resume.certifications, blankCertification()] }) })),
      updateCertification: (id, patch) => set((s) => ({ resume: touch({ ...s.resume, certifications: s.resume.certifications.map((c) => c.id === id ? { ...c, ...patch } : c) }) })),
      removeCertification: (id) => set((s) => ({ resume: touch({ ...s.resume, certifications: s.resume.certifications.filter((c) => c.id !== id) }) })),
      setAchievements: (achievements) => set((s) => ({ resume: touch({ ...s.resume, achievements }) })),
      setHobbies: (hobbies) => set((s) => ({ resume: touch({ ...s.resume, hobbies }) })),
    }),
    { name: "inkwell-resume-v1" }
  )
);

export const completenessScore = (r: ResumeData): number => {
  let pts = 0; const max = 10;
  if (r.personal.fullName && r.personal.email) pts++;
  if (r.personal.jobTitle) pts++;
  if (r.personal.location && r.personal.phone) pts++;
  if (r.summary.length > 50) pts++;
  if (r.experience.some((e) => e.role && e.company && e.bullets.some((b) => b.length > 5))) pts += 2;
  if (r.education.some((e) => e.institution && e.degree)) pts++;
  if (r.skills.technical.length >= 4) pts++;
  if (r.projects.some((p) => p.name)) pts++;
  if (r.skills.soft.length >= 2) pts++;
  return Math.round((pts / max) * 100);
};
