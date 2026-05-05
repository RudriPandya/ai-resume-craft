import { Feather } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/30">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2"><Feather className="h-5 w-5 text-accent" /><span className="font-display text-xl font-semibold">Inkwell</span></div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">Editorial-grade resumes, written with AI. Free, private, and no signup required.</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/builder" className="hover:text-accent">Resume builder</Link></li>
            <li><Link to="/templates" className="hover:text-accent">Templates</Link></li>
            <li><Link to="/tools" className="hover:text-accent">AI tools</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Resources</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/#how" className="hover:text-accent">How it works</a></li>
            <li><a href="/#faq" className="hover:text-accent">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Legal</div>
          <p className="text-sm text-muted-foreground">Your resume lives only in your browser. We never store, sell, or see your data.</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Inkwell. Made with care.</div>
    </footer>
  );
}
