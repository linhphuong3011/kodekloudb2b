import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="https://kodekloud.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Terminal className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            KodeKloud
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Free Tools
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </a>
          <a href="https://kodekloud.com/courses" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Courses
          </a>
          <a href="https://kodekloud.com/pricing" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <Button variant="hero" size="sm" asChild>
            <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
              For Teams
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
