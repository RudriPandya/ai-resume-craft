import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResumePaper from "@/components/preview/ResumePaper";
import { sampleResume } from "@/lib/resume-types";
import { ArrowRight, Sparkles, FileDown, Lock, Wand2, FileText, Layers, ShieldCheck, Target, Mail, Star, Check, X, Zap, Globe, Palette } from "lucide-react";
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
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-olive/15 blur-3xl animate-blob-slow" />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-gold/15 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="container relative mx-auto grid items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-sm shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              AI that writes like a careful editor
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
              The resume you've been <em className="text-accent not-italic font-display">meaning</em> to write.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
              Inkwell pairs editorial-grade templates with an AI that writes the words for you. Beautiful, ATS-safe, and yours in ten minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 gap-2 h-12 px-6 shadow-lift">
                <Link to="/builder">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Build my resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6 backdrop-blur bg-card/60">
                <Link to="/templates">See the templates</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Private — saves to your browser</span>
              <span className="flex items-center gap-1.5"><FileDown className="h-3 w-3" /> Free PDF export</span>
              <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> No signup required</span>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-accent/15 via-gold/10 to-olive/15 blur-3xl animate-blob-slow" />
            <div className="origin-top-right animate-tilt transition-transform duration-700 ease-smooth hover:!rotate-0">
              <div className="origin-top mx-auto" style={{ transform: "scale(0.55)", marginBottom: -460 }}>
                <ResumePaper data={sample} id="hero-paper" />
              </div>
            </div>
            <div className="absolute -left-6 top-12 hidden rotate-[-6deg] rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur lg:block animate-float" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center gap-2 text-xs"><Sparkles className="h-3.5 w-3.5 text-accent" /><span className="font-medium">AI bullets generated</span></div>
              <div className="mt-1 text-[11px] text-muted-foreground">4 quantified, ATS-safe lines</div>
            </div>
            <div className="absolute -right-2 bottom-32 hidden rotate-[5deg] rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur lg:block animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="flex items-center gap-2 text-xs"><ShieldCheck className="h-3.5 w-3.5 text-olive" /><span className="font-medium">ATS score</span></div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-2xl text-foreground">94</span>
                <span className="text-sm text-muted-foreground">/100</span>
                <span className="ml-1 rounded-full bg-olive/15 px-1.5 py-0.5 text-[10px] font-semibold text-olive">PASS</span>
              </div>
            </div>
            <div className="absolute right-6 top-4 hidden rotate-[3deg] rounded-2xl border border-border bg-foreground px-4 py-3 text-background shadow-lift lg:block animate-float" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2 text-[11px]"><Globe className="h-3 w-3 text-accent" /><span className="font-medium">Tailored to JD</span></div>
              <div className="mt-0.5 font-display text-xs text-background/80">Senior PM — Stripe</div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-border/50 bg-card/40 backdrop-blur">
          <div className="container mx-auto grid grid-cols-2 gap-y-6 px-6 py-8 md:grid-cols-4">
            {[
              { n: "10 min", l: "Average build time" },
              { n: "6", l: "ATS-safe templates" },
              { n: "8+", l: "AI writing tools" },
              { n: "100%", l: "Free, no signup" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl text-foreground md:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo marquee */}
      <section className="border-b border-border/50 bg-secondary/30 py-8">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Built by people who landed roles at</p>
        <div className="marquee">
          <div className="marquee-track font-display text-2xl text-foreground/40">
            {["Stripe", "Linear", "Notion", "Figma", "Vercel", "Anthropic", "Airbnb", "Spotify", "Shopify"].concat(["Stripe", "Linear", "Notion", "Figma", "Vercel", "Anthropic", "Airbnb", "Spotify", "Shopify"]).map((n, i) => (
              <span key={i} className="whitespace-nowrap">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Why Inkwell</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">Words that earn their place on the page.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <BigFeature icon={Wand2} title="AI as your editor" desc="Tell it the role and company. It writes punchy, quantified bullet points you can edit in one click." accent />
          <BigFeature icon={Target} title="Tailor to any JD" desc="Paste a job description. Get a tuned summary, rewritten bullets, and missing keywords — never fabricated." />
          <BigFeature icon={ShieldCheck} title="ATS audit, scored" desc="Run a 0–100 ATS check with concrete fixes. Know your resume parses before you ever hit submit." />
          <BigFeature icon={Mail} title="Cover letters in seconds" desc="Three confident paragraphs in your voice. Pick a tone, paste the JD, ship it." />
          <BigFeature icon={Layers} title="Six considered templates" desc="From classic serif to bold modern. Switch any time without losing a single word." />
          <BigFeature icon={Lock} title="Private by default" desc="Your data lives only in your browser. No accounts, no servers, no surveillance." />
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
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-soft transition-all duration-500 ease-smooth group-hover:-translate-y-1 group-hover:shadow-lift">
                  <div className="relative w-full" style={{ aspectRatio: 794 / 1123 }}>
                    <div
                      className="absolute left-1/2 top-0 origin-top"
                      style={{ width: 794, height: 1123, transform: "translateX(-50%) scale(0.55)" }}
                    >
                      <ResumeRenderer data={{ ...sample, meta: { ...sample.meta, template: t.id } }} />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent" />
                  </div>
                </div>
                <div className="mt-3"><div className="font-display text-xl">{t.name}</div><div className="text-sm text-muted-foreground">{t.tagline}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live preview gallery / split feature */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Live preview</p>
            <h2 className="mt-3 font-display text-4xl text-balance">Edit on the left. Watch it set itself on the right.</h2>
            <p className="mt-4 text-muted-foreground text-pretty">Every change reflects instantly on a true-to-PDF page. Switch templates, recolor accents, hide sections, resize type — all without losing a word.</p>
            <ul className="mt-6 space-y-3">
              {[
                ["Six templates, one source of truth", Layers],
                ["Five accent palettes built for print", Palette],
                ["Toggle any section on or off", Zap],
                ["Compact / Comfortable / Spacious type", FileText],
              ].map(([t, I]: any) => (
                <li key={t} className="flex items-center gap-3 text-sm"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent"><I className="h-3.5 w-3.5" /></span>{t}</li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 gap-2 bg-foreground text-background hover:bg-foreground/90"><Link to="/builder">Open the builder <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40 p-6 shadow-lift">
              <div className="origin-top mx-auto" style={{ transform: "scale(0.55)", height: 700 }}>
                <ResumeRenderer data={{ ...sample, meta: { ...sample.meta, template: "modern" } }} />
              </div>
            </div>
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

      {/* Comparison */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">The honest comparison</p>
            <h2 className="mt-3 font-display text-4xl text-balance">Why people quietly leave the others.</h2>
          </div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-foreground text-background">
                <tr>
                  <th className="px-6 py-4 text-left font-display text-base font-normal">Feature</th>
                  <th className="px-6 py-4 text-center font-display text-base">Inkwell</th>
                  <th className="px-6 py-4 text-center font-display text-base font-normal text-background/70">Typical builders</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI bullet writer", true, "Paywall"],
                  ["ATS audit & score", true, "Paywall"],
                  ["JD tailoring", true, false],
                  ["Cover letter generator", true, "Paywall"],
                  ["No signup required", true, false],
                  ["No watermark on PDF", true, false],
                  ["Data stays on your device", true, false],
                  ["Free forever", true, false],
                ].map(([label, ours, theirs], i) => (
                  <tr key={i} className="border-t border-border/60">
                    <td className="px-6 py-3.5 text-foreground">{label as string}</td>
                    <td className="px-6 py-3.5 text-center"><Check className="mx-auto h-5 w-5 text-olive" /></td>
                    <td className="px-6 py-3.5 text-center text-muted-foreground">
                      {theirs === true ? <Check className="mx-auto h-5 w-5 text-olive" /> : theirs === false ? <X className="mx-auto h-5 w-5 text-destructive/70" /> : <span className="text-xs">{theirs}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">From the desks of</p>
          <h2 className="mt-3 font-display text-4xl text-balance">People who hit "send" with confidence.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { q: "I rewrote eight years of resumes in an afternoon. The bullets read like I finally hired a copywriter.", n: "Riya P.", r: "Engineering Manager, Fintech" },
            { q: "The ATS check caught keywords I would have missed. Three callbacks in two weeks.", n: "Marcus L.", r: "Product Marketing" },
            { q: "Templates feel like they came from a print magazine, not a SaaS dashboard. Recruiter actually complimented it.", n: "Sana K.", r: "UX Researcher" },
          ].map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5">
              <div className="flex gap-0.5 text-accent">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-foreground/85 text-pretty leading-relaxed">"{t.q}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="font-medium">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-foreground text-background">
        <div className="container relative mx-auto max-w-4xl px-6 py-24 text-center">
          <Sparkles className="mx-auto mb-6 h-8 w-8 text-accent" />
          <p className="font-display text-3xl leading-tight text-balance md:text-5xl">
            Stop sounding like everyone else. <span className="text-accent">Start sounding like you.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-background/70 text-pretty">Inkwell's AI was tuned by editors, not engineers. Every word it writes is meant to be read aloud — and to land.</p>
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
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-12 text-center text-background md:p-20">
          <div className="absolute inset-0 grid-lines opacity-30" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
          <h2 className="font-display text-4xl md:text-5xl text-balance">Stop staring at a blank document.</h2>
          <p className="mx-auto mt-3 max-w-lg text-background/75 text-pretty">Open Inkwell, answer a few questions, and walk out with a resume worth sending.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90"><Link to="/builder">Start writing <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-background/30 bg-transparent px-8 text-background hover:bg-background/10 hover:text-background"><Link to="/templates">Browse templates</Link></Button>
          </div>
          </div>
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

function BigFeature({ icon: Icon, title, desc, accent }: any) {
  return (
    <div className={`group relative rounded-2xl border ${accent ? "border-accent/30 bg-accent/[0.03]" : "border-border bg-card"} p-7 shadow-soft transition-all duration-500 ease-smooth hover:shadow-lift hover:-translate-y-1`}>
      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent ? "bg-accent text-accent-foreground" : "bg-foreground text-background"}`}><Icon className="h-5 w-5" /></div>
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground text-pretty leading-relaxed">{desc}</p>
    </div>
  );
}
