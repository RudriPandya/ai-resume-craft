import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResumeStore } from "@/store/useResumeStore";
import { resumeToText, downloadText, downloadJSON } from "@/lib/resume-text";
import { callAI } from "@/lib/ai-client";
import { AIButton } from "@/components/AIButton";
import { toast } from "sonner";
import { ShieldCheck, Target, Mail, Database, Loader2, CheckCircle2, AlertTriangle, Upload, Download, Copy, Sparkles } from "lucide-react";
import { emptyResume } from "@/lib/resume-types";
import { useId } from "react";
import { Seo } from "@/components/Seo";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Resume Tools — ATS Audit, JD Match, Cover Letters | Inkwell"
        description="Run an ATS audit, tailor your resume to a job description, generate a cover letter, and back up your data — all free, all private."
        path="/tools"
      />
      <Navbar />
      <section className="container mx-auto px-6 pt-14 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">AI tools</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">Sharpen, tailor, and ship.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">Run an ATS audit, tune your resume to a job description, generate a cover letter, or back up your data.</p>
      </section>
      <section className="container mx-auto px-6 pb-24">
        <Tabs defaultValue="ats" className="mx-auto max-w-4xl">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="ats" className="gap-1.5"><ShieldCheck className="h-4 w-4" />ATS check</TabsTrigger>
            <TabsTrigger value="jd" className="gap-1.5"><Target className="h-4 w-4" />JD match</TabsTrigger>
            <TabsTrigger value="cover" className="gap-1.5"><Mail className="h-4 w-4" />Cover letter</TabsTrigger>
            <TabsTrigger value="data" className="gap-1.5"><Database className="h-4 w-4" />Data</TabsTrigger>
          </TabsList>
          <TabsContent value="ats" className="mt-6"><ATSPanel /></TabsContent>
          <TabsContent value="jd" className="mt-6"><JDMatchPanel /></TabsContent>
          <TabsContent value="cover" className="mt-6"><CoverLetterPanel /></TabsContent>
          <TabsContent value="data" className="mt-6"><DataPanel /></TabsContent>
        </Tabs>
      </section>
      <Footer />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">{children}</div>;
}

function ATSPanel() {
  const r = useResumeStore((s) => s.resume);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; issues: string[]; fixes: string[]; keywords_missing: string[] } | null>(null);

  const run = async () => {
    if (!r.personal.fullName) return toast.error("Build your resume first.");
    setLoading(true);
    try {
      const res = await callAI<any>("ats", { resumeText: resumeToText(r), jobDescription: jd });
      setResult(res);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Card>
      <h2 className="font-display text-2xl">ATS compatibility check</h2>
      <p className="mt-1 text-sm text-muted-foreground">Score your resume against applicant tracking systems. Add a job description for keyword analysis.</p>
      <AtsJdField jd={jd} setJd={setJd} />
      <div className="mt-5 flex justify-end">
        <Button onClick={run} disabled={loading} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          {loading ? "Scanning…" : "Run ATS audit"}
        </Button>
      </div>
      {result && (
        <div className="mt-6 space-y-5 border-t border-border pt-5 animate-fade-in">
          <div>
            <div className="flex items-end justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">ATS score</Label>
              <span className="font-display text-3xl">{result.score}<span className="text-base text-muted-foreground">/100</span></span>
            </div>
            <Progress value={result.score} className="mt-2 h-2" />
          </div>
          {result.issues?.length > 0 && (
            <Section icon={<AlertTriangle className="h-4 w-4 text-destructive" />} title="Issues found">
              {result.issues.map((x, i) => <Item key={i}>{x}</Item>)}
            </Section>
          )}
          {result.fixes?.length > 0 && (
            <Section icon={<CheckCircle2 className="h-4 w-4 text-olive" />} title="Recommended fixes">
              {result.fixes.map((x, i) => <Item key={i}>{x}</Item>)}
            </Section>
          )}
          {result.keywords_missing?.length > 0 && (
            <Section icon={<Sparkles className="h-4 w-4 text-accent" />} title="Missing keywords">
              <div className="flex flex-wrap gap-1.5">
                {result.keywords_missing.map((k, i) => (
                  <span key={i} className="rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs text-accent">{k}</span>
                ))}
              </div>
            </Section>
          )}
        </div>
      )}
    </Card>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">{icon} {title}</div>
      <div className="space-y-1.5 text-sm text-foreground/85">{children}</div>
    </div>
  );
}
function Item({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2"><span className="text-muted-foreground">—</span><span>{children}</span></div>;
}

function JDMatchPanel() {
  const r = useResumeStore((s) => s.resume);
  const setSummary = useResumeStore((s) => s.setSummary);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<{ summary: string; bullets: string[]; tips: string[] } | null>(null);

  const run = async () => {
    if (!jd.trim()) return toast.error("Paste a job description.");
    setLoading(true);
    try {
      const top = r.experience[0]?.bullets || [];
      const data = await callAI<any>("jd_match", { jobDescription: jd, summary: r.summary, bullets: top });
      setRes(data);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Card>
      <h2 className="font-display text-2xl">Tailor to a job description</h2>
      <p className="mt-1 text-sm text-muted-foreground">Get a tuned summary and rewritten bullets — never fabricated.</p>
      <JdMatchField jd={jd} setJd={setJd} />
      <div className="mt-4 flex justify-end">
        <Button onClick={run} disabled={loading} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
          {loading ? "Tailoring…" : "Tailor my resume"}
        </Button>
      </div>
      {res && (
        <div className="mt-6 space-y-5 border-t border-border pt-5 animate-fade-in">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tailored summary</Label>
              <Button size="sm" variant="outline" onClick={() => { setSummary(res.summary); toast.success("Summary applied."); }}>Apply to resume</Button>
            </div>
            <p className="rounded-lg bg-secondary/40 p-3 text-sm">{res.summary}</p>
          </div>
          {res.bullets?.length > 0 && (
            <Section icon={<Sparkles className="h-4 w-4 text-accent" />} title="Suggested bullets">
              {res.bullets.map((b, i) => <Item key={i}>{b}</Item>)}
            </Section>
          )}
          {res.tips?.length > 0 && (
            <Section icon={<CheckCircle2 className="h-4 w-4 text-olive" />} title="Tips">
              {res.tips.map((t, i) => <Item key={i}>{t}</Item>)}
            </Section>
          )}
        </div>
      )}
    </Card>
  );
}

function CoverLetterPanel() {
  const r = useResumeStore((s) => s.resume);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [tone, setTone] = useState("Professional");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  const run = async () => {
    if (!role || !company) return toast.error("Add the role and company.");
    setLoading(true);
    try {
      const data = await callAI<{ letter: string }>("cover_letter", {
        name: r.personal.fullName, role, company, tone,
        summary: r.summary, jobDescription: jd,
        experience: r.experience.slice(0, 2).map((e) => `${e.role} at ${e.company}`).join("; "),
      });
      setLetter(data.letter);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Card>
      <h2 className="font-display text-2xl">Cover letter generator</h2>
      <p className="mt-1 text-sm text-muted-foreground">Three confident paragraphs, in your voice.</p>
      <CoverLetterFields role={role} setRole={setRole} company={company} setCompany={setCompany} tone={tone} setTone={setTone} jd={jd} setJd={setJd} />
      <div className="mt-5 flex justify-end">
        <Button onClick={run} disabled={loading} className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {loading ? "Writing…" : "Write my cover letter"}
        </Button>
      </div>
      {letter && (
        <div className="mt-6 space-y-3 border-t border-border pt-5 animate-fade-in">
          <Textarea value={letter} onChange={(e) => setLetter(e.target.value)} rows={14} className="font-display text-[15px] leading-relaxed bg-paper" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(letter); toast.success("Copied."); }} className="gap-1.5"><Copy className="h-3.5 w-3.5" /> Copy</Button>
            <Button size="sm" onClick={() => downloadText(letter, `Cover Letter — ${company}.txt`)} className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"><Download className="h-3.5 w-3.5" /> Download</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function DataPanel() {
  const r = useResumeStore((s) => s.resume);
  const loadSample = useResumeStore((s) => s.loadSample);
  const reset = useResumeStore((s) => s.reset);

  const onImport = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data?.personal || !data?.meta) throw new Error("Not a valid resume export.");
      loadSample({ ...emptyResume(), ...data });
      toast.success("Resume imported.");
    } catch (e: any) { toast.error("Import failed: " + e.message); }
  };

  return (
    <Card>
      <h2 className="font-display text-2xl">Your data</h2>
      <p className="mt-1 text-sm text-muted-foreground">Back up, restore, or wipe your resume. Everything lives in your browser.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-5">
          <Download className="h-5 w-5 text-accent" />
          <h3 className="mt-3 font-display text-lg">Export as JSON</h3>
          <p className="mt-1 text-sm text-muted-foreground">Save a complete backup you can re-import any time.</p>
          <Button size="sm" variant="outline" className="mt-4" onClick={() => downloadJSON(r, `Resume — ${r.personal.fullName || "draft"}`)}>Download backup</Button>
        </div>
        <div className="rounded-xl border border-border p-5">
          <Upload className="h-5 w-5 text-accent" />
          <h3 className="mt-3 font-display text-lg">Import a backup</h3>
          <p className="mt-1 text-sm text-muted-foreground">Restore a previous resume from a JSON file.</p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-secondary">
            Choose file…
            <input type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); }} />
          </label>
        </div>
        <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-5 sm:col-span-2">
          <h3 className="font-display text-lg text-destructive">Danger zone</h3>
          <p className="mt-1 text-sm text-muted-foreground">Permanently clear all resume data from this browser.</p>
          <Button size="sm" variant="outline" className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => { if (confirm("Erase all data?")) { reset(); toast.success("Cleared."); } }}>Erase everything</Button>
        </div>
      </div>
    </Card>
  );
}

function AtsJdField({ jd, setJd }: { jd: string; setJd: (v: string) => void }) {
  const id = useId();
  return (
    <div className="mt-5">
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">Job description (optional)</Label>
      <Textarea id={id} value={jd} onChange={(e) => setJd(e.target.value)} rows={5} placeholder="Paste the job description for keyword analysis…" className="mt-1.5" />
    </div>
  );
}

function JdMatchField({ jd, setJd }: { jd: string; setJd: (v: string) => void }) {
  const id = useId();
  return (
    <>
      <Label htmlFor={id} className="sr-only">Job description</Label>
      <Textarea id={id} value={jd} onChange={(e) => setJd(e.target.value)} rows={6} placeholder="Paste the full job description here…" className="mt-4" />
    </>
  );
}

function CoverLetterFields({ role, setRole, company, setCompany, tone, setTone, jd, setJd }: { role: string; setRole: (v: string) => void; company: string; setCompany: (v: string) => void; tone: string; setTone: (v: string) => void; jd: string; setJd: (v: string) => void }) {
  const roleId = useId();
  const companyId = useId();
  const toneId = useId();
  const jdId = useId();
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div><Label htmlFor={roleId} className="text-xs uppercase tracking-wider text-muted-foreground">Role</Label><Input id={roleId} value={role} onChange={(e) => setRole(e.target.value)} placeholder="Senior Product Designer" className="mt-1.5" /></div>
      <div><Label htmlFor={companyId} className="text-xs uppercase tracking-wider text-muted-foreground">Company</Label><Input id={companyId} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1.5" /></div>
      <div className="md:col-span-2">
        <Label htmlFor={toneId} className="text-xs uppercase tracking-wider text-muted-foreground">Tone</Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger id={toneId} className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Warm">Warm & personable</SelectItem>
            <SelectItem value="Confident">Confident & direct</SelectItem>
            <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Label htmlFor={jdId} className="text-xs uppercase tracking-wider text-muted-foreground">Job description (optional)</Label>
        <Textarea id={jdId} value={jd} onChange={(e) => setJd(e.target.value)} rows={4} placeholder="Paste the JD for sharper targeting…" className="mt-1.5" />
      </div>
    </div>
  );
}