import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  accentColor?: "primary" | "accent";
}

const ToolCard = ({ icon: Icon, title, description, features, href, accentColor = "primary" }: ToolCardProps) => {
  const gradientClass = accentColor === "accent" 
    ? "from-accent/20 to-accent/5" 
    : "from-primary/20 to-primary/5";
  
  const iconBgClass = accentColor === "accent"
    ? "bg-accent/10 text-accent"
    : "bg-primary/10 text-primary";

  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative glass rounded-2xl p-8 h-full flex flex-col hover:border-primary/30 transition-all duration-300 group-hover:translate-y-[-4px]">
        <div className={`w-14 h-14 rounded-xl ${iconBgClass} flex items-center justify-center mb-6`}>
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button variant="hero" className="w-full" asChild>
          <Link to={href}>
            Start Assessment
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;
