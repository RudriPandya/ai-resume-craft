import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Stepper, STEP_COUNT } from "@/components/builder/Stepper";
import { StepPersonal, StepExperience, StepEducation, StepSkills, StepProjects, StepSummary } from "@/components/builder/Steps";
import { Button } from "@/components/ui/button";
import ResumePaper from "@/components/preview/ResumePaper";
import { PreviewControls } from "@/components/preview/PreviewControls";
import { useResumeStore, completenessScore } from "@/store/useResumeStore";
import { sampleResume } from "@/lib/resume-types";
import { ChevronLeft, ChevronRight, Sparkles, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Seo } from "@/components/Seo";

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const resume = useResumeStore((s) => s.resume);
  const loadSample = useResumeStore((s) => s.loadSample);
  const reset = useResumeStore((s) => s.reset);
  const completion = completenessScore(resume);

  const renderStep = () => {
    switch (step) {
      case 0: return <StepPersonal />;
      case 1: return <StepExperience />;
      case 2: return <StepEducation />;
      case 3: return <StepSkills />;
      case 4: return <StepProjects />;
      case 5: return <StepSummary />;
    }
  };

  const isEmpty = !resume.personal.fullName && !resume.summary && resume.experience.every((e) => !e.role && !e.company);

  return (
    <div className="min-h-screen bg-background paper-grain">
      <Seo
        title="Resume Builder — Inkwell"
        description="Compose your resume step by step with live preview, AI writing help, and instant PDF export. Auto-saves to your browser."
        path="/builder"
      />
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl text-foreground md:text-3xl">Compose your resume</h1>
            <p className="text-sm text-muted-foreground">Auto-saves to your browser as you type.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs shadow-soft backdrop-blur sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-olive" />
              </span>
              <span className="font-medium text-foreground">{completion}%</span>
              <span className="text-muted-foreground">complete</span>
            </div>
            {isEmpty && (
              <Button variant="outline" size="sm" onClick={() => loadSample(sampleResume())} className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Try with sample data</Button>
            )}
            {!isEmpty && (
              <Button variant="ghost" size="sm" onClick={() => { if (confirm("Clear all resume data?")) reset(); }}>Clear</Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="form" className="lg:hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="mt-4 space-y-6">
            <Stepper current={step} onChange={setStep} completion={completion} />
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">{renderStep()}</div>
            <NavButtons step={step} onChange={setStep} />
          </TabsContent>
          <TabsContent value="preview" className="mt-4 space-y-4">
            <PreviewControls />
            <div className="origin-top scale-[0.6] sm:scale-75"><ResumePaper data={resume} /></div>
          </TabsContent>
        </Tabs>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(620px,1fr)]">
          <div className="space-y-6">
            <Stepper current={step} onChange={setStep} completion={completion} />
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft animate-fade-in">{renderStep()}</div>
            <NavButtons step={step} onChange={setStep} />
          </div>
          <div className="space-y-4">
            <PreviewControls />
            <div className="overflow-auto rounded-xl bg-secondary/40 p-6 max-h-[calc(100vh-180px)] sticky top-24">
              <div className="origin-top scale-[0.62] xl:scale-75 mx-auto">
                <ResumePaper data={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButtons({ step, onChange }: { step: number; onChange: (i: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" disabled={step === 0} onClick={() => onChange(step - 1)} className="gap-1.5"><ChevronLeft className="h-4 w-4" /> Back</Button>
      <div className="text-xs text-muted-foreground"><FileText className="inline h-3 w-3 mr-1" /> Saved just now</div>
      <Button disabled={step === STEP_COUNT - 1} onClick={() => onChange(step + 1)} className="gap-1.5 bg-foreground text-background hover:bg-foreground/90">Next <ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
}
