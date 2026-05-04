import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

export function Navbar() {
  const loc = useLocation();
  const onBuilder = loc.pathname.startsWith("/builder");
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Feather className="h-5 w-5 text-accent" />
          <span className="font-display text-xl font-semibold tracking-tight">Inkwell</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/templates" className="text-muted-foreground transition-colors hover:text-foreground">Templates</Link>
          <a href="/#how" className="text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="/#faq" className="text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
        </nav>
        {!onBuilder && (
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
            <Link to="/builder">Build my resume</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
