import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Target, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Capability {
  name: string;
  question: string;
  levels: string[];
  current: number;
}

interface Category {
  name: string;
  capabilities: Capability[];
}

const ratingLabels = [
  "Not Assessed",
  "No Process",
  "Ad Hoc",
  "Defined",
  "Consistent",
  "Automated"
];

const initialCategories: Category[] = [
  {
    name: "Service Strategy",
    capabilities: [
      {
        name: "Justifying",
        question: "Rate your team's ability to justify your service offering",
        levels: [
          "Not assessed",
          "Never justified or validated from a business perspective",
          "Ad hoc informal uncaptured process of justification",
          "Defined process, but informal with inconsistent execution",
          "Manual consistent, documented process with traceable approval",
          "Fully automated, captured, and documented justification process"
        ],
        current: 0
      },
      {
        name: "Costing",
        question: "Rate your team's ability to cost your service offering",
        levels: [
          "Not assessed",
          "No billing, chargeback, or financial conversations",
          "Informal costing exists but not consistently done",
          "Defined process but informal, results not published",
          "Consistent documented process with full financial analysis",
          "Fully automated with live billing dashboards and controls"
        ],
        current: 0
      },
      {
        name: "Designing",
        question: "Rate your team's ability to design your service offering",
        levels: [
          "Not assessed",
          "No design or clear technical requirements exist",
          "Informal design exists but not consistently captured",
          "Defined process but designs not published or updated",
          "Manual consistent documented design process with approvals",
          "Fully automated design documentation with strategic and tactical designs"
        ],
        current: 0
      },
      {
        name: "Productizing",
        question: "Rate your team's ability to productize your service offering",
        levels: [
          "Not assessed",
          "No clear productization path or Product evaluation",
          "Informal product direction exists but not captured",
          "Defined process but product lifecycle not published",
          "Consistent documented process including lifecycle and onboarding",
          "Fully automated product documentation with self-service capabilities"
        ],
        current: 0
      },
      {
        name: "Implementing",
        question: "Rate your team's capacity to implement your service offering",
        levels: [
          "Not assessed",
          "No team assigned or capacity/capabilities assessed",
          "Informal implementation plan with some assessments",
          "Defined process but team dynamics not published",
          "Consistent documented process across multiple teams",
          "Fully automated with strategic and tactical implementation planning"
        ],
        current: 0
      },
      {
        name: "Enrolling",
        question: "Rate your team's ability to enroll and train staff",
        levels: [
          "Not assessed",
          "No training plan or knowledge transfer strategy",
          "Informal training through shadowing with minimal docs",
          "Defined training process but effectiveness not measured",
          "Consistent documented training with skill verification",
          "Fully automated learning platform with certification paths"
        ],
        current: 0
      }
    ]
  },
  {
    name: "Service Delivery",
    capabilities: [
      {
        name: "Provisioning/Building",
        question: "Rate your team's ability to provision or build your service",
        levels: [
          "Not assessed",
          "Click provisioning - no process or expertise",
          "Manual undocumented provisioning/build process",
          "Defined process but still manual and infrequent",
          "Automated IaC with version-controlled repo",
          "Complete IaC with self-service portal"
        ],
        current: 0
      },
      {
        name: "Storing",
        question: "Rate your team's ability to store data from your service",
        levels: [
          "Not assessed",
          "No documented storage capabilities or process",
          "Manual data storage not meeting requirements",
          "Defined process but state not consistently monitored",
          "Automated storage with lifecycle and RTO/RPO defined",
          "Complete IaC with consistent monitoring and compliance"
        ],
        current: 0
      },
      {
        name: "Connecting",
        question: "Rate your team's ability to connect your service offering",
        levels: [
          "Not assessed",
          "No documented networking process",
          "Manual networking without documentation",
          "Defined process but not enforced or monitored",
          "Automated networking with load balancing and security",
          "Complete IaC with geo-failover and security monitoring"
        ],
        current: 0
      },
      {
        name: "Configuring",
        question: "Rate your team's ability to configure/change your service",
        levels: [
          "Not assessed",
          "No documented configuration/change process",
          "Manual configuration without documentation",
          "Defined process but state not consistently checked",
          "Automated config management with drift detection",
          "Complete IaC with lifecycle management and auditing"
        ],
        current: 0
      },
      {
        name: "Securing",
        question: "Rate your team's ability to secure your service offering",
        levels: [
          "Not assessed",
          "No documented security process",
          "Manual security process without documentation",
          "Defined process but not consistently enforced",
          "Automated security with version-controlled reviews",
          "Complete IaC with continuous security monitoring"
        ],
        current: 0
      },
      {
        name: "Deploying",
        question: "Rate your team's ability to deploy to/on your service",
        levels: [
          "Not assessed",
          "No documented deployment process",
          "Manual undocumented deployment process",
          "Defined manual deployment process",
          "Continuous compliant deployment via CI/CD",
          "Fully automated end-to-end deployment process"
        ],
        current: 0
      },
      {
        name: "Discovering",
        question: "Rate your service's ability to be discovered",
        levels: [
          "Not assessed",
          "No documented service discovery process",
          "Culturally known process (e.g., add DNS record)",
          "Defined process but not automated",
          "Automated discovery with version control",
          "Complete automated discovery with metrics"
        ],
        current: 0
      },
      {
        name: "Distributing",
        question: "Rate your service's ability to be distributed",
        levels: [
          "Not assessed",
          "No documented distribution process",
          "Culturally known (e.g., load balancer, geo-DNS)",
          "Defined process but not automated",
          "Automated distribution with version control",
          "Complete IaC with HA and DR capabilities"
        ],
        current: 0
      }
    ]
  },
  {
    name: "Service Operations",
    capabilities: [
      {
        name: "Governing",
        question: "Rate your service's ability to be governed",
        levels: [
          "Not assessed",
          "No documented governance process",
          "Culturally known governance without documentation",
          "Defined process but not automated",
          "Automated governance with version control",
          "Complete IaC with policy enforcement"
        ],
        current: 0
      },
      {
        name: "Auditing",
        question: "Rate your service's ability to be audited",
        levels: [
          "Not assessed",
          "No documented audit process",
          "Culturally known auditing without documentation",
          "Defined process but not automated",
          "Automated auditing with version control",
          "Complete IaC with continuous compliance"
        ],
        current: 0
      },
      {
        name: "Documenting",
        question: "Rate your service's level of documentation",
        levels: [
          "Not assessed",
          "No documentation process exists",
          "Culturally known documentation without capture",
          "Defined process but inconsistently updated",
          "Automated documentation with version control",
          "Complete IaC with auto-generated docs"
        ],
        current: 0
      },
      {
        name: "Licensing",
        question: "Rate your service's ability to be licensed",
        levels: [
          "Not assessed",
          "No documented licensing process",
          "Culturally known licensing without documentation",
          "Defined process but not automated",
          "Automated licensing with version control",
          "Complete IaC with compliance monitoring"
        ],
        current: 0
      }
    ]
  },
  {
    name: "Service Support",
    capabilities: [
      {
        name: "Maintaining",
        question: "Rate your service's ability to be maintained",
        levels: [
          "Not assessed",
          "No documented maintenance process",
          "Culturally known maintenance without documentation",
          "Defined process but not automated",
          "Automated maintenance with version control",
          "Complete IaC with self-healing systems"
        ],
        current: 0
      },
      {
        name: "Performing",
        question: "Rate your service's ability to perform/scale",
        levels: [
          "Not assessed",
          "No documented performance process",
          "Culturally known performance without documentation",
          "Defined process but not automated",
          "Automated performance with SLAs and scaling",
          "Complete IaC with auto-scaling and monitoring"
        ],
        current: 0
      },
      {
        name: "Supporting",
        question: "Rate your service's ability to be supported",
        levels: [
          "Not assessed",
          "No documented support process",
          "Culturally known support without documentation",
          "Defined process but not automated",
          "Automated support with SLAs and escalation",
          "Complete IaC with self-service support"
        ],
        current: 0
      },
      {
        name: "Recovering",
        question: "Rate your service's ability to be recovered",
        levels: [
          "Not assessed",
          "No documented recovery process",
          "Culturally known recovery without documentation",
          "Defined process but not automated",
          "Automated recovery with RTO/RPO defined",
          "Complete IaC with orchestrated DR"
        ],
        current: 0
      },
      {
        name: "Monitoring",
        question: "Rate your service's ability to be monitored",
        levels: [
          "Not assessed",
          "No documented monitoring process",
          "Culturally known monitoring without documentation",
          "Defined process but not automated",
          "Automated monitoring with alerting and SLAs",
          "Complete IaC with predictive monitoring"
        ],
        current: 0
      },
      {
        name: "Logging",
        question: "Rate your service's ability to be logged",
        levels: [
          "Not assessed",
          "No documented logging process",
          "Culturally known logging without documentation",
          "Defined process but not automated",
          "Automated logging with centralized collection",
          "Complete IaC with log analytics and security"
        ],
        current: 0
      },
      {
        name: "Tracing",
        question: "Rate your service's ability to be traced",
        levels: [
          "Not assessed",
          "No documented tracing process",
          "Culturally known tracing without documentation",
          "Defined process but not automated",
          "Automated tracing with dependency mapping",
          "Complete distributed tracing with visualization"
        ],
        current: 0
      }
    ]
  }
];

const SkillsAnalyzer = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showResults, setShowResults] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const updateCapability = (categoryIndex: number, capabilityIndex: number, value: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].capabilities[capabilityIndex].current = value;
    setCategories(newCategories);
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    let totalCapabilities = 0;
    categories.forEach(category => {
      category.capabilities.forEach(cap => {
        if (cap.current > 0) {
          totalScore += cap.current;
          totalCapabilities++;
        }
      });
    });
    if (totalCapabilities === 0) return 0;
    return Math.round((totalScore / (totalCapabilities * 5)) * 100);
  };

  const getCategoryScores = () => {
    return categories.map(category => {
      let totalScore = 0;
      let assessedCount = 0;
      category.capabilities.forEach(cap => {
        if (cap.current > 0) {
          totalScore += cap.current;
          assessedCount++;
        }
      });
      const score = assessedCount > 0 ? Math.round((totalScore / (assessedCount * 5)) * 100) : 0;
      return {
        name: category.name,
        score,
        assessed: assessedCount,
        total: category.capabilities.length
      };
    });
  };

  const getTopGaps = () => {
    const gaps: { category: string; capability: string; current: number; level: string }[] = [];
    categories.forEach(category => {
      category.capabilities.forEach(cap => {
        if (cap.current > 0 && cap.current < 4) {
          gaps.push({
            category: category.name,
            capability: cap.name,
            current: cap.current,
            level: ratingLabels[cap.current]
          });
        }
      });
    });
    return gaps.sort((a, b) => a.current - b.current).slice(0, 6);
  };

  const getTier = (score: number) => {
    if (score >= 80) return { name: "Production Ready", color: "text-primary" };
    if (score >= 60) return { name: "Maturing", color: "text-accent" };
    if (score >= 40) return { name: "Developing", color: "text-yellow-500" };
    return { name: "Beginning", color: "text-destructive" };
  };

  const overallScore = calculateOverallScore();
  const categoryScores = getCategoryScores();
  const topGaps = getTopGaps();
  const tier = getTier(overallScore);

  const totalAssessed = categoryScores.reduce((sum, cat) => sum + cat.assessed, 0);
  const totalCapabilities = categoryScores.reduce((sum, cat) => sum + cat.total, 0);

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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Production Readiness Assessment</h1>
              <p className="text-muted-foreground">
                Assessed {totalAssessed} of {totalCapabilities} capabilities
              </p>
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
                      strokeDasharray={`${overallScore * 4.4} 440`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{overallScore}%</span>
                    <span className={`text-sm font-medium ${tier.color}`}>{tier.name}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your service is rated <span className={`font-semibold ${tier.color}`}>{tier.name}</span> based on your assessment across all capability areas.
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Capability Areas</h3>
                <div className="space-y-4">
                  {categoryScores.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{cat.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {cat.assessed}/{cat.total} assessed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={cat.score} className="h-2 flex-1" />
                        <span className={`text-sm font-medium min-w-[3rem] text-right ${
                          cat.score < 40 ? "text-destructive" : 
                          cat.score < 60 ? "text-yellow-500" : 
                          cat.score < 80 ? "text-accent" : "text-primary"
                        }`}>
                          {cat.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Improvements */}
              {topGaps.length > 0 && (
                <div className="lg:col-span-2 glass rounded-2xl p-8">
                  <h3 className="text-lg font-bold mb-6">Priority Improvement Areas</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topGaps.map((gap, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-medium text-foreground">{gap.capability}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{gap.category}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded bg-destructive/10 text-destructive">
                            {gap.level}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                            Automated
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" onClick={() => setShowResults(false)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Update Assessment
                </Button>
                <Button variant="hero" asChild>
                  <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                    Get Expert Consultation
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

  const currentCategory = categories[currentCategoryIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Production Readiness Checklist</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Is Your Service Production Ready?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assess your service across 25 capability areas. Rate from 1 (no process) to 5 (fully automated).
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat, index) => {
              const catScore = getCategoryScores()[index];
              return (
                <button
                  key={cat.name}
                  onClick={() => setCurrentCategoryIndex(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentCategoryIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.name}
                  {catScore.assessed > 0 && (
                    <span className="ml-2 text-xs opacity-70">
                      ({catScore.assessed}/{catScore.total})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Category Assessment */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-foreground">{currentCategory.name}</h3>
            <div className="space-y-6">
              {currentCategory.capabilities.map((capability, capIndex) => (
                <div key={capability.name} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{capability.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{capability.question}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {capability.current > 0 && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        capability.current < 3 ? "bg-destructive/10 text-destructive" :
                        capability.current < 4 ? "bg-yellow-500/10 text-yellow-600" :
                        capability.current < 5 ? "bg-accent/10 text-accent" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {ratingLabels[capability.current]}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <TooltipProvider key={level}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => updateCapability(currentCategoryIndex, capIndex, level)}
                              className={`py-3 px-2 text-xs rounded-lg transition-all ${
                                capability.current === level
                                  ? level === 0 
                                    ? "bg-muted text-muted-foreground ring-2 ring-border"
                                    : "bg-primary text-primary-foreground"
                                  : capability.current > level && level > 0
                                  ? "bg-primary/20 text-primary"
                                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {level === 0 ? "N/A" : level}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-medium">{ratingLabels[level]}</p>
                            <p className="text-xs mt-1">{capability.levels[level]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="glass"
              onClick={() => setCurrentCategoryIndex(Math.max(0, currentCategoryIndex - 1))}
              disabled={currentCategoryIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {totalAssessed} of {totalCapabilities} assessed
            </div>

            {currentCategoryIndex < categories.length - 1 ? (
              <Button
                variant="glass"
                onClick={() => setCurrentCategoryIndex(currentCategoryIndex + 1)}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={() => setShowResults(true)}
                disabled={totalAssessed === 0}
              >
                View Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillsAnalyzer;