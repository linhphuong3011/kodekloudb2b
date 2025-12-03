import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Target, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface SkillCategory {
  name: string;
  skills: { name: string; current: number; required: number }[];
}

const initialSkillCategories: SkillCategory[] = [
  {
    name: "Container & Orchestration",
    skills: [
      { name: "Docker", current: 0, required: 4 },
      { name: "Kubernetes", current: 0, required: 4 },
      { name: "Helm", current: 0, required: 3 },
      { name: "Service Mesh (Istio/Linkerd)", current: 0, required: 2 }
    ]
  },
  {
    name: "Cloud Platforms",
    skills: [
      { name: "AWS", current: 0, required: 4 },
      { name: "Azure", current: 0, required: 3 },
      { name: "GCP", current: 0, required: 2 },
      { name: "Multi-cloud Strategy", current: 0, required: 2 }
    ]
  },
  {
    name: "CI/CD & Automation",
    skills: [
      { name: "Jenkins/GitLab CI", current: 0, required: 4 },
      { name: "GitHub Actions", current: 0, required: 3 },
      { name: "ArgoCD/Flux", current: 0, required: 3 },
      { name: "Ansible/Chef/Puppet", current: 0, required: 2 }
    ]
  },
  {
    name: "Infrastructure as Code",
    skills: [
      { name: "Terraform", current: 0, required: 4 },
      { name: "CloudFormation/ARM", current: 0, required: 3 },
      { name: "Pulumi", current: 0, required: 2 },
      { name: "Crossplane", current: 0, required: 2 }
    ]
  },
  {
    name: "Observability",
    skills: [
      { name: "Prometheus/Grafana", current: 0, required: 4 },
      { name: "ELK Stack", current: 0, required: 3 },
      { name: "Datadog/New Relic", current: 0, required: 3 },
      { name: "OpenTelemetry", current: 0, required: 3 }
    ]
  },
  {
    name: "Security",
    skills: [
      { name: "Container Security", current: 0, required: 4 },
      { name: "SAST/DAST Tools", current: 0, required: 3 },
      { name: "Secrets Management", current: 0, required: 4 },
      { name: "Compliance as Code", current: 0, required: 2 }
    ]
  }
];

const SkillsAnalyzer = () => {
  const [skillCategories, setSkillCategories] = useState(initialSkillCategories);
  const [showResults, setShowResults] = useState(false);

  const skillLevels = ["None", "Basic", "Intermediate", "Advanced", "Expert"];

  const updateSkill = (categoryIndex: number, skillIndex: number, value: number) => {
    const newCategories = [...skillCategories];
    newCategories[categoryIndex].skills[skillIndex].current = value;
    setSkillCategories(newCategories);
  };

  const calculateGapScore = () => {
    let totalGap = 0;
    let totalRequired = 0;
    skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        totalGap += Math.max(0, skill.required - skill.current);
        totalRequired += skill.required;
      });
    });
    return Math.round(((totalRequired - totalGap) / totalRequired) * 100);
  };

  const getTopGaps = () => {
    const gaps: { category: string; skill: string; gap: number; current: number; required: number }[] = [];
    skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        const gap = skill.required - skill.current;
        if (gap > 0) {
          gaps.push({
            category: category.name,
            skill: skill.name,
            gap,
            current: skill.current,
            required: skill.required
          });
        }
      });
    });
    return gaps.sort((a, b) => b.gap - a.gap).slice(0, 5);
  };

  const getCategoryScores = () => {
    return skillCategories.map(category => {
      let totalCurrent = 0;
      let totalRequired = 0;
      category.skills.forEach(skill => {
        totalCurrent += skill.current;
        totalRequired += skill.required;
      });
      return {
        name: category.name,
        score: Math.round((totalCurrent / totalRequired) * 100)
      };
    });
  };

  const gapScore = calculateGapScore();
  const topGaps = getTopGaps();
  const categoryScores = getCategoryScores();

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Analysis Complete</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Skills Gap Analysis</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Overall Score */}
              <div className="glass rounded-2xl p-8 text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${gapScore * 4.4} 440`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{gapScore}%</span>
                    <span className="text-xs text-muted-foreground">Skills Coverage</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Your team covers {gapScore}% of the required skills for modern DevOps practices.
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Skills by Category</h3>
                <div className="space-y-4">
                  {categoryScores.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{cat.name}</span>
                        <span className={cat.score < 50 ? "text-destructive" : cat.score < 75 ? "text-accent" : "text-primary"}>
                          {cat.score}%
                        </span>
                      </div>
                      <Progress value={cat.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Gaps */}
              <div className="lg:col-span-2 glass rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Priority Training Recommendations</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topGaps.map((gap, index) => (
                    <div key={index} className="bg-secondary/50 rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="font-medium text-foreground">{gap.skill}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{gap.category}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-destructive">Current: {skillLevels[gap.current]}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-primary">Target: {skillLevels[gap.required]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" onClick={() => setShowResults(false)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Update Assessment
                </Button>
                <Button variant="hero" asChild>
                  <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                    Get Custom Learning Paths
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Skills Gap Analyzer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Assess Your Team's Skills</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rate your team's current proficiency level for each skill. We'll identify gaps and recommend training priorities.
            </p>
          </div>

          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.name} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 text-foreground">{category.name}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Target: {skillLevels[skill.required]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {skillLevels.map((level, levelIndex) => (
                          <button
                            key={level}
                            onClick={() => updateSkill(categoryIndex, skillIndex, levelIndex)}
                            className={`flex-1 py-2 px-1 text-xs rounded-lg transition-all ${
                              skill.current === levelIndex
                                ? "bg-primary text-primary-foreground"
                                : skill.current > levelIndex
                                ? "bg-primary/20 text-primary"
                                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="hero" size="xl" onClick={() => setShowResults(true)}>
              Analyze Skills Gaps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillsAnalyzer;
