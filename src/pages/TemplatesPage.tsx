import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEMPLATES } from "@/components/templates";
import { ResumeRenderer } from "@/components/templates";
import { sampleResume, TemplateId } from "@/lib/resume-types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useResumeStore } from "@/store/useResumeStore";
import { ArrowRight } from "lucide-react";

export default function TemplatesPage() {
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const nav = useNavigate();
  const sample = sampleResume();

  const choose = (id: TemplateId) => { setTemplate(id); nav("/builder"); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="container mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Templates</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">Six templates. One careful eye.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">Every template is ATS-tested and built on the same data — switch any time without losing your work.</p>
      </section>
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-2">
          {TEMPLATES.map((t) => {
            const data = { ...sample, meta: { ...sample.meta, template: t.id } };
            return (
              <div key={t.id} className="group">
                <div className="overflow-hidden rounded-xl border border-border bg-secondary/40 p-4 shadow-soft transition-all duration-500 ease-smooth hover:shadow-lift">
                  <div className="origin-top mx-auto" style={{ transform: "scale(0.48)", height: 540, width: 794, marginLeft: "auto", marginRight: "auto" }}>
                    <ResumeRenderer data={data} />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.tagline}</p>
                  </div>
                  <Button onClick={() => choose(t.id)} className="gap-1.5 bg-foreground text-background hover:bg-foreground/90">Use {t.name} <ArrowRight className="h-4 w-4" /></Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <Button variant="outline" asChild><Link to="/builder">Just start building →</Link></Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
