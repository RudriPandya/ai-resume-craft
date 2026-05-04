import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Loader2, Eye, EyeOff } from "lucide-react";
import { TEMPLATES } from "@/components/templates";
import { ColorScheme, FontSize, TemplateId } from "@/lib/resume-types";
import { useState } from "react";
import { exportResumeToPDF } from "@/lib/export-pdf";
import { toast } from "sonner";

const COLORS: { id: ColorScheme; hex: string; label: string }[] = [
  { id: "terracotta", hex: "#c45a3a", label: "Terracotta" },
  { id: "ink", hex: "#23201c", label: "Ink" },
  { id: "olive", hex: "#5d6f3a", label: "Olive" },
  { id: "navy", hex: "#2c3e60", label: "Navy" },
  { id: "plum", hex: "#6b3a52", label: "Plum" },
];

const TOGGLE_SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "hobbies", label: "Interests" },
];

export function PreviewControls() {
  const r = useResumeStore((s) => s.resume);
  const { setTemplate, setColor, setFontSize, toggleSection } = useResumeStore.getState();
  const [exporting, setExporting] = useState(false);

  const onDownload = async () => {
    setExporting(true);
    try {
      const name = r.personal.fullName ? `${r.personal.fullName} — Resume` : "Resume";
      await exportResumeToPDF("resume-paper", name);
      toast.success("PDF downloaded.");
    } catch (e: any) { toast.error("Export failed: " + e.message); } finally { setExporting(false); }
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-soft">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Template</div>
          <Select value={r.meta.template} onValueChange={(v) => setTemplate(v as TemplateId)}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>{TEMPLATES.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Font size</div>
          <Select value={r.meta.fontSize} onValueChange={(v) => setFontSize(v as FontSize)}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Compact</SelectItem>
              <SelectItem value="md">Comfortable</SelectItem>
              <SelectItem value="lg">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Accent</div>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button key={c.id} onClick={() => setColor(c.id)} title={c.label}
              className={`h-7 w-7 rounded-full border-2 transition-all ${r.meta.colorScheme === c.id ? "border-foreground scale-110" : "border-transparent"}`}
              style={{ background: c.hex }} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sections</div>
        <div className="flex flex-wrap gap-1">
          {TOGGLE_SECTIONS.map((s) => {
            const on = !r.meta.sectionsHidden.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggleSection(s.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition ${on ? "border-foreground/20 bg-secondary text-foreground" : "border-dashed border-border text-muted-foreground line-through"}`}>
                {on ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {s.label}
              </button>
            );
          })}
        </div>
      </div>
      <Button onClick={onDownload} disabled={exporting} className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
        {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {exporting ? "Generating PDF…" : "Download PDF"}
      </Button>
    </div>
  );
}
