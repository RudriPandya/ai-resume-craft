import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "personal", label: "Personal" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "summary", label: "Summary" },
];

export function Stepper({ current, onChange, completion }: { current: number; onChange: (i: number) => void; completion: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onChange(i)}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
              i === current
                ? "bg-foreground text-background"
                : i < current
                ? "bg-secondary text-foreground hover:bg-secondary/80"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
              i === current ? "bg-background text-foreground" : i < current ? "bg-foreground text-background" : "bg-secondary"
            )}>
              {i < current ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-accent transition-all duration-500 ease-smooth" style={{ width: `${completion}%` }} />
      </div>
    </div>
  );
}

export const STEP_COUNT = STEPS.length;
