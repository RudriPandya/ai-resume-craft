import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResumePaper from "@/components/preview/ResumePaper";
import { sampleResume } from "@/lib/resume-types";
import { ArrowRight, Sparkles, FileDown, Lock, Wand2, FileText, Layers } from "lucide-react";
import { TEMPLATES } from "@/components/templates";
import { ResumeRenderer } from "@/components/templates";

const sample = sampleResume();

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm opacity-70" />
        <div className="absolute inset-0 paper-grain opacity-60" />
        <div className="container relative mx-auto grid items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-accent" /> AI that writes like a careful editor
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
              The resume you've been <em className="text-accent not-italic font-display">meaning</em> to write.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
              Inkwell pairs editorial-grade templates with an AI that writes the words for you. Beautiful, ATS-safe, and yours in ten minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2 h-12 px-6">
                <Link to="/builder">Build my resume <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6">
                <Link to="/templates">See the templates</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Private — saves to your browser</span>
              <span className="flex items-center gap-1.5"><FileDown className="h-3 w-3" /> Free PDF export</span>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/10 blur-3xl" />
            <div className="rotate-[1.5deg] origin-top-right transition-transform duration-700 ease-smooth hover:rotate-0">
              <div className="origin-top mx-auto" style={{ transform: "scale(0.55)", marginBottom: -460 }}>
                <ResumePaper data={sample} id="hero-paper" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Why Inkwell</p>
          <h2 className="mt-3 font-display text-4xl text-balance">Words that earn their place on the page.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Feature icon={Wand2} title="AI as your editor" desc="Tell it the role and company. It writes punchy, quantified bullet points you can edit in one click." />
          <Feature icon={Layers} title="Six considered templates" desc="From classic serif to bold and modern. Switch any time without losing a single word." />
          <Feature icon={FileText} title="ATS-safe by design" desc="Real text, no images, no tables. Every template parses cleanly through applicant tracking systems." />
          <Feature icon={Lock} title="Private by default" desc="Your data lives only in your browser. No accounts, no servers, no surveillance." />
        </div>
      </section>

      {/* Templates strip */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Templates</p>
              <h2 className="mt-3 font-display text-4xl text-balance">A look for every kind of work.</h2>
            </div>
            <Button asChild variant="ghost" className="gap-1.5 text-foreground"><Link to="/templates">Browse all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TEMPLATES.slice(0, 3).map((t) => (
              <div key={t.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl border border-border bg-background p-3 shadow-soft transition-all duration-500 ease-smooth group-hover:shadow-lift group-hover:-translate-y-1">
                  <div className="origin-top mx-auto" style={{ transform: "scale(0.42)", height: 470, width: 794, marginLeft: "auto", marginRight: "auto" }}>
                    <ResumeRenderer data={{ ...sample, meta: { ...sample.meta, template: t.id } }} />
                  </div>
                </div>
                <div className="mt-3"><div className="font-display text-xl">{t.name}</div><div className="text-sm text-muted-foreground">{t.tagline}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container mx-auto px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-balance">Three steps. Ten minutes. One resume to be proud of.</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Tell us the basics", d: "Your roles, schools, and a few skills. Skip what doesn't apply — Inkwell hides empty sections automatically." },
            { n: "02", t: "Let AI write the rest", d: "One click turns a job title into four ATS-friendly bullet points. Same for your summary and projects." },
            { n: "03", t: "Pick a look. Export.", d: "Try every template live. Download a clean PDF. No watermarks, no signup." },
          ].map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-6xl text-accent/30">{s.n}</div>
              <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
              <p className="mt-2 text-muted-foreground text-pretty">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-display text-3xl leading-tight text-balance md:text-4xl">
            "I rewrote eight years of resumes in an afternoon. The bullets read like I finally hired a copywriter."
          </p>
          <p className="mt-5 text-sm text-background/70">Riya P. — Engineering manager, fintech</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">FAQ</p>
          <h2 className="mt-3 font-display text-4xl">Honest answers.</h2>
        </div>
        <Accordion type="single" collapsible className="max-w-3xl">
          {[
            ["Is it really free?", "Yes — every template, the AI, and PDF export are free. No paywalls, no signup."],
            ["Where is my data stored?", "Only in your browser's local storage. Closing the tab won't lose it; clearing browser data will."],
            ["Will my resume pass ATS filters?", "Every template uses real text only — no tables, images, or text-in-shapes. They're built to be parsed cleanly."],
            ["What does the AI actually do?", "It writes draft bullet points, summaries, project descriptions, and skill suggestions based on the details you give it. You edit anything, any time."],
            ["Can I export to Word?", "PDF only for now. PDFs are the standard for ATS systems and look identical everywhere."],
          ].map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="text-left font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-foreground p-12 text-center text-background md:p-16">
          <h2 className="font-display text-4xl md:text-5xl text-balance">Stop staring at a blank document.</h2>
          <p className="mx-auto mt-3 max-w-lg text-background/75 text-pretty">Open Inkwell, answer a few questions, and walk out with a resume worth sending.</p>
          <Button asChild size="lg" className="mt-8 h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90"><Link to="/builder">Start writing →</Link></Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent"><Icon className="h-5 w-5" /></div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">{desc}</p>
    </div>
  );
}
