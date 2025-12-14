import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Users, TrendingUp } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{
      animationDelay: '-3s'
    }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
      backgroundSize: '60px 60px'
    }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Continuous Learning starts here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Build a <span className="text-gradient">World-Class</span>
            <br />DevOps Team
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{
          animationDelay: '0.1s'
        }}>Discover your team’s learning types, identify skill gaps, and connect upskilling to delivery outcomes.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{
          animationDelay: '0.2s'
        }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#tools">
                Explore Free Tools
                <ArrowDown className="w-5 h-5 ml-1" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                Enterprise Solutions
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{
          animationDelay: '0.3s'
        }}>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">1M+</span>
              </div>
              <p className="text-sm text-muted-foreground">Engineers Trained</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">800+</span>
              </div>
              <p className="text-sm text-muted-foreground">Enterprise Clients</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">200+</span>
              </div>
              <p className="text-sm text-muted-foreground">Hands-on Courses</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;