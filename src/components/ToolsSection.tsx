import ToolCard from "./ToolCard";
import { Activity, Calculator, Target } from "lucide-react";

const ToolsSection = () => {
  const tools = [
    {
      icon: Activity,
      title: "DevOps Maturity Assessment",
      description: "Benchmark your team's DevOps capabilities against industry standards with our comprehensive assessment.",
      features: [
        "10-question diagnostic covering CI/CD, IaC, monitoring & security",
        "Instant maturity score with industry benchmarks",
        "Personalized improvement roadmap",
        "Exportable executive summary report"
      ],
      href: "/assessment",
      accentColor: "primary" as const
    },
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
      accentColor: "accent" as const
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
      accentColor: "primary" as const
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
