import { Check, User, Briefcase, GraduationCap, Wrench, Lightbulb, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: Lightbulb },
  { id: "summary", label: "Summary", icon: FileText },
];

export function Stepper({ current, onChange, completion }: { current: number; onChange: (i: number) => void; completion: number }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card/60 p-3 shadow-soft backdrop-blur">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = i === current;
          const done = i < current;
          return (
            <button
              key={s.id}
              onClick={() => onChange(i)}
              className={cn(
                "group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
                active
                  ? "bg-foreground text-background shadow-soft"
                  : done
                  ? "bg-secondary text-foreground hover:bg-secondary/80"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <span className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full transition-all",
                active ? "bg-background text-foreground" : done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {done ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 px-1">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-gradient-to-r from-accent via-gold to-accent transition-all duration-700 ease-smooth" style={{ width: `${completion}%` }} />
        </div>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">{completion}%</span>
      </div>
    </div>
  );
}

export const STEP_COUNT = STEPS.length;
