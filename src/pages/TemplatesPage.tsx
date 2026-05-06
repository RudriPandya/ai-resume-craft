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

  // A4 preview is 794 x 1123. We render at scale and clip to the scaled box
  // so cards have no empty whitespace beside the preview.
  const SCALE = 0.36;
  const W = Math.round(794 * SCALE); // ~286
  const H = Math.round(1123 * SCALE); // ~404

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="container mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Templates</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">Ten templates. One careful eye.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">Every template is ATS-tested and built on the same data — switch any time without losing your work.</p>
      </section>
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => {
            const data = { ...sample, meta: { ...sample.meta, template: t.id } };
            return (
              <div key={t.id} className="group flex flex-col">
                <button
                  onClick={() => choose(t.id)}
                  className="relative block overflow-hidden rounded-xl border border-border bg-secondary/40 shadow-soft transition-all duration-500 ease-smooth hover:shadow-lift hover:-translate-y-1"
                  style={{ width: "100%", aspectRatio: `${W} / ${H}` }}
                  aria-label={`Use ${t.name} template`}
                >
                  <div
                    className="absolute left-0 top-0 origin-top-left bg-white"
                    style={{
                      width: 794,
                      height: 1123,
                      transform: `scale(${SCALE})`,
                      // Width-fit: scale matches the card width visually because aspectRatio is locked.
                    }}
                  >
                    <ResumeRenderer data={data} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl">{t.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{t.tagline}</p>
                  </div>
                  <Button size="sm" onClick={() => choose(t.id)} className="shrink-0 gap-1 bg-foreground text-background hover:bg-foreground/90">
                    Use <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
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
