import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEMPLATES, TemplateCategory } from "@/components/templates";
import { ResumeRenderer } from "@/components/templates";
import { sampleResume, TemplateId } from "@/lib/resume-types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useResumeStore } from "@/store/useResumeStore";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_W = 794;
const PAGE_H = 1123;
const PREVIEW_SCALE = 0.55;
const THUMB_RATIO = PAGE_W / PAGE_H;

function TemplateThumb({ data, onClick, label }: { data: any; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group relative block w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift hover:border-accent/40"
    >
      <div className="relative w-full" style={{ aspectRatio: THUMB_RATIO }}>
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: PAGE_W, height: PAGE_H, transform: `translateX(-50%) scale(${PREVIEW_SCALE})` }}
        >
          <ResumeRenderer data={data} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card via-card/85 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/30" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-xs font-semibold text-foreground shadow-lift backdrop-blur translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <Eye className="h-3.5 w-3.5 text-accent" /> Use this template
          </span>
        </div>
      </div>
    </button>
  );
}

export default function TemplatesPage() {
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const nav = useNavigate();
  const sample = sampleResume();
  const [filter, setFilter] = useState<TemplateCategory | "All">("All");

  const choose = (id: TemplateId) => { setTemplate(id); nav("/builder"); };

  const categories: (TemplateCategory | "All")[] = ["All", "Classic", "Modern", "Creative", "Technical", "Academic"];
  const filtered = useMemo(
    () => TEMPLATES.filter((t) => filter === "All" || t.category === filter),
    [filter]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm opacity-60" />
        <div className="absolute inset-0 paper-grain opacity-50" />
        <div className="absolute -top-32 left-1/2 -z-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative mx-auto px-6 pt-20 pb-10 text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" /> {TEMPLATES.length} hand-crafted layouts
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl text-balance">A look for every kind of work.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">Every template is ATS-tested and built on the same data — switch any time without losing a single word.</p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="sticky top-16 z-20 -mx-6 mb-10 border-y border-border/60 bg-background/85 px-6 py-3 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => {
              const active = filter === c;
              const count = c === "All" ? TEMPLATES.length : TEMPLATES.filter((t) => t.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    active
                      ? "bg-foreground text-background shadow-soft"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {c}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                    active ? "bg-background/20 text-background" : "bg-secondary text-muted-foreground group-hover:bg-background/60"
                  )}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={filter} className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => {
            const data = { ...sample, meta: { ...sample.meta, template: t.id } };
            return (
              <div
                key={t.id}
                className="group flex flex-col animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
              >
                <TemplateThumb data={data} onClick={() => choose(t.id)} label={`Use ${t.name} template`} />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl leading-tight">{t.name}</h3>
                      <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{t.category}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t.tagline}</p>
                  </div>
                  <Button size="sm" onClick={() => choose(t.id)} className="shrink-0 gap-1 bg-foreground text-background hover:bg-foreground/90">
                    Use <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No templates in this category yet.</p>
        )}
        <div className="mt-16 text-center">
          <Button variant="outline" asChild><Link to="/builder">Just start building →</Link></Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
