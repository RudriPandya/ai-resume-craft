import { ResumeData } from "@/lib/resume-types";
import { ResumeRenderer } from "@/components/templates";

// A4 at 96dpi ≈ 794 × 1123 px
export default function ResumePaper({ data, id = "resume-paper" }: { data: ResumeData; id?: string }) {
  return (
    <div
      id={id}
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#ffffff",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,.25), 0 4px 12px -6px rgba(0,0,0,.1)",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <ResumeRenderer data={data} />
    </div>
  );
}
