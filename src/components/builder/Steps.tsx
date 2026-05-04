import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AIButton } from "@/components/AIButton";
import { TagInput } from "@/components/TagInput";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { callAI } from "@/lib/ai-client";
import { toast } from "sonner";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function StepPersonal() {
  const r = useResumeStore((s) => s.resume);
  const update = useResumeStore((s) => s.updatePersonal);
  return (
    <div className="space-y-5">
      <SectionHeader title="Personal details" subtitle="The basics. Required fields are marked." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Full name *"><Input value={r.personal.fullName} onChange={(e) => update({ fullName: e.target.value })} placeholder="Amelia Hart" /></Field>
        <Field label="Job title"><Input value={r.personal.jobTitle} onChange={(e) => update({ jobTitle: e.target.value })} placeholder="Senior Product Designer" /></Field>
        <Field label="Email *"><Input type="email" value={r.personal.email} onChange={(e) => update({ email: e.target.value })} placeholder="you@example.com" /></Field>
        <Field label="Phone"><Input value={r.personal.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="+1 (415) 555-0184" /></Field>
        <Field label="Location"><Input value={r.personal.location} onChange={(e) => update({ location: e.target.value })} placeholder="Brooklyn, NY" /></Field>
        <Field label="LinkedIn"><Input value={r.personal.linkedin} onChange={(e) => update({ linkedin: e.target.value })} placeholder="linkedin.com/in/you" /></Field>
        <Field label="GitHub"><Input value={r.personal.github} onChange={(e) => update({ github: e.target.value })} placeholder="github.com/you" /></Field>
        <Field label="Website"><Input value={r.personal.website} onChange={(e) => update({ website: e.target.value })} placeholder="yourname.com" /></Field>
      </div>
    </div>
  );
}

export function StepExperience() {
  const r = useResumeStore((s) => s.resume);
  const { addExperience, updateExperience, removeExperience, setExperienceBullets } = useResumeStore.getState();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const generate = async (id: string, role: string, company: string, context: string) => {
    if (!role && !company) return toast.error("Add a role and company first.");
    setLoadingId(id);
    try {
      const res = await callAI<{ bullets: string[] }>("bullets", { role, company, context });
      setExperienceBullets(id, res.bullets);
      toast.success("Bullet points written.");
    } catch (e: any) { toast.error(e.message); } finally { setLoadingId(null); }
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Work experience" subtitle="Most recent first. Use the AI button on any role to generate bullet points." />
      {r.experience.map((e) => (
        <div key={e.id} className="rounded-lg border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-muted-foreground"><GripVertical className="h-4 w-4" /><span className="text-xs uppercase tracking-wider">Role</span></div>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(e.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Role"><Input value={e.role} onChange={(ev) => updateExperience(e.id, { role: ev.target.value })} placeholder="Senior Product Designer" /></Field>
            <Field label="Company"><Input value={e.company} onChange={(ev) => updateExperience(e.id, { company: ev.target.value })} placeholder="Acme Inc." /></Field>
            <Field label="Start date"><Input value={e.startDate} onChange={(ev) => updateExperience(e.id, { startDate: ev.target.value })} placeholder="Jan 2022" /></Field>
            <Field label="End date">
              <Input value={e.endDate} disabled={e.isCurrent} onChange={(ev) => updateExperience(e.id, { endDate: ev.target.value })} placeholder="Dec 2024" />
            </Field>
            <Field label="Location"><Input value={e.location} onChange={(ev) => updateExperience(e.id, { location: ev.target.value })} placeholder="Remote" /></Field>
            <div className="flex items-end gap-2"><Checkbox id={`cur-${e.id}`} checked={e.isCurrent} onCheckedChange={(v) => updateExperience(e.id, { isCurrent: !!v, endDate: v ? "" : e.endDate })} /><Label htmlFor={`cur-${e.id}`}>I currently work here</Label></div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Achievements</Label>
              <AIButton loading={loadingId === e.id} onClick={() => generate(e.id, e.role, e.company, e.bullets.join(". "))}>Write bullets with AI</AIButton>
            </div>
            <div className="space-y-2">
              {e.bullets.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <Textarea value={b} onChange={(ev) => { const nb = [...e.bullets]; nb[i] = ev.target.value; setExperienceBullets(e.id, nb); }} rows={2} placeholder="Led the redesign that lifted weekly active users by 38%." />
                  <Button variant="ghost" size="icon" onClick={() => setExperienceBullets(e.id, e.bullets.filter((_, j) => j !== i))} className="shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setExperienceBullets(e.id, [...e.bullets, ""])} className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add bullet</Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-full gap-2"><Plus className="h-4 w-4" /> Add another role</Button>
    </div>
  );
}

export function StepEducation() {
  const r = useResumeStore((s) => s.resume);
  const { addEducation, updateEducation, removeEducation } = useResumeStore.getState();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const suggest = async (id: string, degree: string, field: string, institution: string) => {
    if (!degree) return toast.error("Add a degree first.");
    setLoadingId(id);
    try {
      const res = await callAI<{ items: string[] }>("education_achievements", { degree, field, institution });
      updateEducation(id, { achievements: res.items.join(" • ") });
      toast.success("Suggestions added.");
    } catch (e: any) { toast.error(e.message); } finally { setLoadingId(null); }
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Education" subtitle="Schools, degrees, and notable achievements." />
      {r.education.map((e) => (
        <div key={e.id} className="rounded-lg border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Education</span>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(e.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Institution"><Input value={e.institution} onChange={(ev) => updateEducation(e.id, { institution: ev.target.value })} placeholder="Rhode Island School of Design" /></Field>
            <Field label="Degree"><Input value={e.degree} onChange={(ev) => updateEducation(e.id, { degree: ev.target.value })} placeholder="BFA" /></Field>
            <Field label="Field of study"><Input value={e.field} onChange={(ev) => updateEducation(e.id, { field: ev.target.value })} placeholder="Graphic Design" /></Field>
            <Field label="Grade / GPA"><Input value={e.grade} onChange={(ev) => updateEducation(e.id, { grade: ev.target.value })} placeholder="Magna cum laude" /></Field>
            <Field label="Start year"><Input value={e.startYear} onChange={(ev) => updateEducation(e.id, { startYear: ev.target.value })} placeholder="2013" /></Field>
            <Field label="End year"><Input value={e.endYear} onChange={(ev) => updateEducation(e.id, { endYear: ev.target.value })} placeholder="2017" /></Field>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Achievements</Label>
              <AIButton loading={loadingId === e.id} onClick={() => suggest(e.id, e.degree, e.field, e.institution)}>Suggest with AI</AIButton>
            </div>
            <Textarea value={e.achievements} onChange={(ev) => updateEducation(e.id, { achievements: ev.target.value })} placeholder="Editor of the school journal. Type design fellowship 2016." rows={3} />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full gap-2"><Plus className="h-4 w-4" /> Add education</Button>
    </div>
  );
}

export function StepSkills() {
  const r = useResumeStore((s) => s.resume);
  const setSkills = useResumeStore((s) => s.setSkills);
  const [loading, setLoading] = useState(false);
  const suggest = async () => {
    if (!r.personal.jobTitle) return toast.error("Add a job title in Personal first.");
    setLoading(true);
    try {
      const res = await callAI<{ technical: string[]; soft: string[]; tools: string[] }>("skills", { title: r.personal.jobTitle });
      setSkills("technical", Array.from(new Set([...r.skills.technical, ...res.technical])));
      setSkills("soft", Array.from(new Set([...r.skills.soft, ...res.soft])));
      setSkills("tools", Array.from(new Set([...r.skills.tools, ...res.tools])));
      toast.success("Skills suggested.");
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Skills" subtitle="Press Enter or comma to add a tag. Backspace to remove." />
      <div className="flex justify-end">
        <AIButton loading={loading} onClick={suggest}>Suggest skills for my role</AIButton>
      </div>
      <Field label="Technical skills"><TagInput value={r.skills.technical} onChange={(v) => setSkills("technical", v)} placeholder="Figma, Prototyping, Design Systems…" /></Field>
      <Field label="Tools & software"><TagInput value={r.skills.tools} onChange={(v) => setSkills("tools", v)} placeholder="Linear, Notion, Framer…" /></Field>
      <Field label="Strengths (soft skills)"><TagInput value={r.skills.soft} onChange={(v) => setSkills("soft", v)} placeholder="Cross-functional leadership, mentorship…" /></Field>
      <Field label="Languages"><TagInput value={r.skills.languages} onChange={(v) => setSkills("languages", v)} placeholder="English (native), Spanish (fluent)…" /></Field>
    </div>
  );
}

export function StepProjects() {
  const r = useResumeStore((s) => s.resume);
  const { addProject, updateProject, removeProject } = useResumeStore.getState();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const generate = async (id: string, name: string, tech: string[], context: string) => {
    if (!name) return toast.error("Add a project name first.");
    setLoadingId(id);
    try {
      const res = await callAI<{ description: string; bullets: string[] }>("project_desc", { name, tech, context });
      updateProject(id, { description: res.description, bullets: res.bullets });
      toast.success("Project written.");
    } catch (e: any) { toast.error(e.message); } finally { setLoadingId(null); }
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Projects" subtitle="Optional but powerful — especially for early-career resumes." />
      {r.projects.map((p) => (
        <div key={p.id} className="rounded-lg border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Project</span>
            <Button variant="ghost" size="sm" onClick={() => removeProject(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Project name"><Input value={p.name} onChange={(e) => updateProject(p.id, { name: e.target.value })} placeholder="Inkwell type studies" /></Field>
            <Field label="Link"><Input value={p.link} onChange={(e) => updateProject(p.id, { link: e.target.value })} placeholder="github.com/you/project" /></Field>
            <div className="md:col-span-2"><Field label="Tech stack"><TagInput value={p.techStack} onChange={(v) => updateProject(p.id, { techStack: v })} placeholder="React, Postgres, Stripe…" /></Field></div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</Label>
              <AIButton loading={loadingId === p.id} onClick={() => generate(p.id, p.name, p.techStack, p.description)}>Write with AI</AIButton>
            </div>
            <Textarea value={p.description} onChange={(e) => updateProject(p.id, { description: e.target.value })} rows={2} placeholder="A weekly newsletter exploring typography decisions in canonical books." />
          </div>
          <div className="mt-3 space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Highlights</Label>
            {p.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={b} onChange={(e) => { const nb = [...p.bullets]; nb[i] = e.target.value; updateProject(p.id, { bullets: nb }); }} rows={1} placeholder="Grew to 7,400 subscribers in 9 months." />
                <Button variant="ghost" size="icon" onClick={() => updateProject(p.id, { bullets: p.bullets.filter((_, j) => j !== i) })} className="shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => updateProject(p.id, { bullets: [...p.bullets, ""] })} className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add highlight</Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addProject} className="w-full gap-2"><Plus className="h-4 w-4" /> Add a project</Button>
    </div>
  );
}

export function StepSummary() {
  const r = useResumeStore((s) => s.resume);
  const setSummary = useResumeStore((s) => s.setSummary);
  const setAchievements = useResumeStore((s) => s.setAchievements);
  const setHobbies = useResumeStore((s) => s.setHobbies);
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    setLoading(true);
    try {
      const res = await callAI<{ summary: string }>("summary", {
        name: r.personal.fullName, title: r.personal.jobTitle,
        years: r.experience.length, skills: r.skills.technical.slice(0, 6),
        experience: r.experience.slice(0, 2).map((e) => `${e.role} at ${e.company}: ${e.bullets[0] || ""}`).join("; "),
      });
      setSummary(res.summary);
      toast.success("Summary written.");
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Summary & extras" subtitle="Top of your resume — the hook a recruiter sees first." />
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Professional summary</Label>
          <AIButton loading={loading} onClick={generate}>Write my summary</AIButton>
        </div>
        <Textarea value={r.summary} onChange={(e) => setSummary(e.target.value)} rows={5} placeholder="Three sentences that frame who you are and what you do best." />
        <div className="mt-1 text-xs text-muted-foreground">{r.summary.length} characters · aim for 280–500</div>
      </div>
      <Field label="Achievements & awards (one per tag)">
        <TagInput value={r.achievements} onChange={setAchievements} placeholder="Communication Arts Design Annual, 2022" />
      </Field>
      <Field label="Interests"><TagInput value={r.hobbies} onChange={setHobbies} placeholder="Letterpress printing, Trail running…" /></Field>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
