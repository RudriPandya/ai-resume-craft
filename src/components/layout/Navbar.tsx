import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Feather, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const loc = useLocation();
  const onBuilder = loc.pathname.startsWith("/builder");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/templates", label: "Templates" },
    { to: "/tools", label: "AI Tools" },
    { href: "/#how", label: "How it works" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/90 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2 text-foreground">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background shadow-soft transition-transform group-hover:scale-105">
            <Feather className="h-4 w-4 text-accent" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Inkwell</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => {
            const isActive = "to" in l && loc.pathname.startsWith(l.to!);
            const Comp: any = "to" in l ? Link : "a";
            const props: any = "to" in l ? { to: l.to } : { href: l.href };
            return (
              <Comp
                key={l.label}
                {...props}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {l.label}
              </Comp>
            );
          })}
        </nav>
        {!onBuilder && (
          <Button asChild className="group gap-1.5 bg-foreground text-background hover:bg-foreground/90 shadow-soft">
            <Link to="/builder">
              Build my resume
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
