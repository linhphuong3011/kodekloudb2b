import ToolCard from "./ToolCard";
import { Calculator, Target, Users } from "lucide-react";
import { Button } from "./ui/button";

const ToolsSection = () => {
  const tools = [
    {
      icon: Calculator,
      title: "Training ROI Calculator",
      description: "Calculate the business impact of investing in DevOps and Cloud training for your engineering teams.",
      features: [
        "Estimate productivity gains from upskilling",
        "Calculate cost savings from reduced incidents",
        "Project time-to-value improvements",
        "Generate stakeholder-ready ROI reports"
      ],
      href: "/roi-calculator",
      accentColor: "primary" as const
    },
    {
      icon: Target,
      title: "Skills Gap Analyzer",
      description: "Identify critical skill gaps across your DevOps, Cloud, and Platform Engineering teams.",
      features: [
        "Map current vs required skills for your stack",
        "Prioritize training investments by impact",
        "Align skills with career frameworks",
        "Track progress over time"
      ],
      href: "/skills-analyzer",
      accentColor: "accent" as const
    }
  ];

  return (
    <section id="tools" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Free Tools for <span className="text-gradient">Engineering Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Make data-driven decisions about your team's development with our enterprise-grade assessment tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Webinar CTA Card */}
          <div className="glass-card p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build the Team Behind Your System</h3>
              <p className="text-muted-foreground mb-6">
                Production-ready systems require production-ready people. Join our exclusive webinar to learn strategies for developing high-performing DevOps teams that can build, deploy, and maintain resilient infrastructure at scale.
              </p>
            </div>
            <Button 
              asChild 
              variant="default" 
              className="w-full"
            >
              <a 
                href="https://kodekloud.com/webinar/prod-and-people" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Learn How
              </a>
            </Button>
          </div>

          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
