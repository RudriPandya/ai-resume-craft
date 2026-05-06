export type TemplateId =
  | "classic"
  | "modern"
  | "minimal"
  | "bold"
  | "academic"
  | "creative"
  | "executive"
  | "compact"
  | "elegant"
  | "tech";
export type ColorScheme = "terracotta" | "ink" | "olive" | "navy" | "plum";
export type FontSize = "sm" | "md" | "lg";

export interface Personal {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  achievements: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  meta: {
    template: TemplateId;
    colorScheme: ColorScheme;
    fontSize: FontSize;
    lastUpdated: string;
    sectionsHidden: string[];
  };
  personal: Personal;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: string[];
  hobbies: string[];
}

export const newId = () => Math.random().toString(36).slice(2, 10);

export const blankExperience = (): ExperienceItem => ({
  id: newId(), company: "", role: "", startDate: "", endDate: "", isCurrent: false, location: "", bullets: [""],
});
export const blankEducation = (): EducationItem => ({
  id: newId(), institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "", achievements: "",
});
export const blankProject = (): ProjectItem => ({
  id: newId(), name: "", description: "", techStack: [], link: "", bullets: [""],
});
export const blankCertification = (): CertificationItem => ({
  id: newId(), name: "", issuer: "", date: "", link: "",
});

export const sampleResume = (): ResumeData => ({
  meta: { template: "classic", colorScheme: "terracotta", fontSize: "md", lastUpdated: new Date().toISOString(), sectionsHidden: [] },
  personal: {
    fullName: "Amelia Hart",
    jobTitle: "Senior Product Designer",
    email: "amelia.hart@example.com",
    phone: "+1 (415) 555-0184",
    location: "Brooklyn, NY",
    linkedin: "linkedin.com/in/ameliahart",
    github: "",
    website: "ameliahart.design",
  },
  summary:
    "Senior product designer with eight years shaping consumer software at the intersection of editorial craft and systems thinking. Led design at two Series-A startups, shipping flagship products used by millions. Equally fluent with founders, engineers, and customers.",
  experience: [
    {
      id: newId(), company: "Marginalia", role: "Lead Product Designer", startDate: "Jan 2022", endDate: "Present", isCurrent: true, location: "New York, NY",
      bullets: [
        "Led the redesign of the reading experience, lifting weekly active readers by 38% in two quarters.",
        "Built a 120-token design system adopted across web, iOS, and Android — cutting design QA time in half.",
        "Mentored four designers; promoted two to senior within a year.",
      ],
    },
    {
      id: newId(), company: "Folio", role: "Product Designer", startDate: "Mar 2019", endDate: "Dec 2021", isCurrent: false, location: "Remote",
      bullets: [
        "Shipped a publishing dashboard now used by 12,000+ writers, growing paid conversion by 22%.",
        "Partnered with engineering to define a measurement system that informed every roadmap review.",
      ],
    },
  ],
  education: [
    { id: newId(), institution: "Rhode Island School of Design", degree: "BFA", field: "Graphic Design", startYear: "2013", endYear: "2017", grade: "Magna cum laude", achievements: "Editor, RISD Quarterly. Type design fellowship 2016." },
  ],
  skills: {
    technical: ["Figma", "Prototyping", "Design Systems", "User Research", "Information Architecture", "Motion Design"],
    soft: ["Cross-functional leadership", "Mentorship", "Workshop facilitation", "Editorial writing"],
    tools: ["Linear", "Notion", "Framer", "Principle", "Webflow"],
    languages: ["English (native)", "Spanish (fluent)"],
  },
  projects: [
    { id: newId(), name: "Inkwell type studies", description: "A weekly newsletter exploring the typographic decisions behind canonical books.", techStack: ["Substack", "Glyphs"], link: "ameliahart.design/inkwell", bullets: ["Grew to 7,400 subscribers in 9 months with no paid acquisition.", "Featured in It's Nice That and Sidebar."] },
  ],
  certifications: [],
  achievements: ["Communication Arts Design Annual, 2022"],
  hobbies: ["Letterpress printing", "Trail running", "Cookbook collecting"],
});

export const emptyResume = (): ResumeData => ({
  meta: { template: "classic", colorScheme: "terracotta", fontSize: "md", lastUpdated: new Date().toISOString(), sectionsHidden: [] },
  personal: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "" },
  summary: "",
  experience: [blankExperience()],
  education: [blankEducation()],
  skills: { technical: [], soft: [], tools: [], languages: [] },
  projects: [],
  certifications: [],
  achievements: [],
  hobbies: [],
});
