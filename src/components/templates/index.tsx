import { ResumeData, TemplateId } from "@/lib/resume-types";
import TemplateClassic from "./TemplateClassic";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";
import TemplateBold from "./TemplateBold";
import TemplateAcademic from "./TemplateAcademic";
import TemplateCreative from "./TemplateCreative";
import TemplateExecutive from "./TemplateExecutive";
import TemplateCompact from "./TemplateCompact";
import TemplateElegant from "./TemplateElegant";
import TemplateTech from "./TemplateTech";
import TemplateOnyx from "./TemplateOnyx";
import TemplateNordic from "./TemplateNordic";

export const TEMPLATES: { id: TemplateId; name: string; tagline: string }[] = [
  { id: "classic", name: "Classic", tagline: "Timeless serif. Best for finance, law, consulting." },
  { id: "modern", name: "Modern", tagline: "Two-column with a confident sidebar. Tech & design." },
  { id: "minimal", name: "Minimal", tagline: "Quiet, generous, editorial. Startups & writers." },
  { id: "bold", name: "Bold", tagline: "Strong header band. Marketing & sales." },
  { id: "academic", name: "Academic", tagline: "Detailed and structured. Research & PhDs." },
  { id: "creative", name: "Creative", tagline: "Asymmetric & expressive. Designers & makers." },
  { id: "executive", name: "Executive", tagline: "Authoritative serif for senior leaders & C-suite." },
  { id: "compact", name: "Compact", tagline: "One-page dense layout. Great for engineers." },
  { id: "elegant", name: "Elegant", tagline: "Centered, refined, ceremonial. Academia & arts." },
  { id: "tech", name: "Tech", tagline: "Monospace accents. Built for developers." },
  { id: "onyx", name: "Onyx", tagline: "Bold dark header. Modern & confident." },
  { id: "nordic", name: "Nordic", tagline: "Calm two-column timeline. Quietly precise." },
];

export function ResumeRenderer({ data }: { data: ResumeData }) {
  switch (data.meta.template) {
    case "modern": return <TemplateModern data={data} />;
    case "minimal": return <TemplateMinimal data={data} />;
    case "bold": return <TemplateBold data={data} />;
    case "academic": return <TemplateAcademic data={data} />;
    case "creative": return <TemplateCreative data={data} />;
    case "executive": return <TemplateExecutive data={data} />;
    case "compact": return <TemplateCompact data={data} />;
    case "elegant": return <TemplateElegant data={data} />;
    case "tech": return <TemplateTech data={data} />;
    case "onyx": return <TemplateOnyx data={data} />;
    case "nordic": return <TemplateNordic data={data} />;
    case "classic":
    default: return <TemplateClassic data={data} />;
  }
}
