import { ResumeData, TemplateId } from "@/lib/resume-types";
import TemplateClassic from "./TemplateClassic";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";
import TemplateBold from "./TemplateBold";
import TemplateAcademic from "./TemplateAcademic";
import TemplateCreative from "./TemplateCreative";

export const TEMPLATES: { id: TemplateId; name: string; tagline: string }[] = [
  { id: "classic", name: "Classic", tagline: "Timeless serif. Best for finance, law, consulting." },
  { id: "modern", name: "Modern", tagline: "Two-column with a confident sidebar. Tech & design." },
  { id: "minimal", name: "Minimal", tagline: "Quiet, generous, editorial. Startups & writers." },
  { id: "bold", name: "Bold", tagline: "Strong header band. Marketing & sales." },
  { id: "academic", name: "Academic", tagline: "Detailed and structured. Research & PhDs." },
  { id: "creative", name: "Creative", tagline: "Asymmetric & expressive. Designers & makers." },
];

export function ResumeRenderer({ data }: { data: ResumeData }) {
  switch (data.meta.template) {
    case "modern": return <TemplateModern data={data} />;
    case "minimal": return <TemplateMinimal data={data} />;
    case "bold": return <TemplateBold data={data} />;
    case "academic": return <TemplateAcademic data={data} />;
    case "creative": return <TemplateCreative data={data} />;
    case "classic":
    default: return <TemplateClassic data={data} />;
  }
}
