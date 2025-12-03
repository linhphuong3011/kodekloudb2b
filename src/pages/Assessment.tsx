import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

interface Question {
  id: number;
  category: string;
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "CI/CD",
    question: "How automated is your deployment pipeline?",
    options: [
      { text: "Manual deployments are the norm", score: 1 },
      { text: "Some automation, but manual steps remain", score: 2 },
      { text: "Mostly automated with some manual approvals", score: 3 },
      { text: "Fully automated CI/CD with rollback capabilities", score: 4 }
    ]
  },
  {
    id: 2,
    category: "CI/CD",
    question: "How frequently does your team deploy to production?",
    options: [
      { text: "Monthly or less frequently", score: 1 },
      { text: "Every few weeks", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Multiple times per day", score: 4 }
    ]
  },
  {
    id: 3,
    category: "Infrastructure as Code",
    question: "How do you manage infrastructure provisioning?",
    options: [
      { text: "Manual configuration through consoles", score: 1 },
      { text: "Some scripting, but inconsistent", score: 2 },
      { text: "IaC tools used for most infrastructure", score: 3 },
      { text: "All infrastructure is code with version control", score: 4 }
    ]
  },
  {
    id: 4,
    category: "Infrastructure as Code",
    question: "How do you handle environment consistency?",
    options: [
      { text: "Environments differ significantly", score: 1 },
      { text: "Some effort to keep parity, but drifts occur", score: 2 },
      { text: "Environments are similar with some differences", score: 3 },
      { text: "Identical environments via IaC and containers", score: 4 }
    ]
  },
  {
    id: 5,
    category: "Monitoring & Observability",
    question: "What is your current monitoring maturity?",
    options: [
      { text: "Basic server/application uptime monitoring", score: 1 },
      { text: "Metrics collection with basic alerting", score: 2 },
      { text: "Full APM with distributed tracing", score: 3 },
      { text: "Complete observability (metrics, logs, traces) with SLOs", score: 4 }
    ]
  },
  {
    id: 6,
    category: "Monitoring & Observability",
    question: "How do you handle incident response?",
    options: [
      { text: "Ad-hoc response, no formal process", score: 1 },
      { text: "Basic on-call rotation, manual escalation", score: 2 },
      { text: "Defined runbooks with automated alerting", score: 3 },
      { text: "Full incident management with blameless postmortems", score: 4 }
    ]
  },
  {
    id: 7,
    category: "Security",
    question: "How integrated is security in your development process?",
    options: [
      { text: "Security review at the end of projects", score: 1 },
      { text: "Some security checks in CI pipeline", score: 2 },
      { text: "Shift-left security with automated scanning", score: 3 },
      { text: "Full DevSecOps with continuous security validation", score: 4 }
    ]
  },
  {
    id: 8,
    category: "Security",
    question: "How do you manage secrets and credentials?",
    options: [
      { text: "Stored in code or config files", score: 1 },
      { text: "Environment variables with basic protection", score: 2 },
      { text: "Centralized secrets management", score: 3 },
      { text: "Dynamic secrets with automatic rotation", score: 4 }
    ]
  },
  {
    id: 9,
    category: "Culture & Collaboration",
    question: "How well do Dev and Ops teams collaborate?",
    options: [
      { text: "Separate silos with handoffs", score: 1 },
      { text: "Some collaboration, but distinct responsibilities", score: 2 },
      { text: "Shared ownership with regular sync-ups", score: 3 },
      { text: "Fully integrated teams with shared goals", score: 4 }
    ]
  },
  {
    id: 10,
    category: "Culture & Collaboration",
    question: "How does your organization approach learning and experimentation?",
    options: [
      { text: "Limited time/budget for learning", score: 1 },
      { text: "Some training available upon request", score: 2 },
      { text: "Structured learning programs with time allocated", score: 3 },
      { text: "Continuous learning culture with innovation time", score: 4 }
    ]
  }
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestion]: score });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getMaturityLevel = (score: number) => {
    if (score < 25) return { level: "Initial", description: "Ad-hoc processes with significant room for improvement" };
    if (score < 50) return { level: "Developing", description: "Some automation in place, but inconsistent practices" };
    if (score < 75) return { level: "Defined", description: "Standardized processes with good automation coverage" };
    return { level: "Optimizing", description: "Industry-leading practices with continuous improvement" };
  };

  const getCategoryScores = () => {
    const categories: Record<string, { total: number; count: number }> = {};
    questions.forEach((q, index) => {
      if (answers[index] !== undefined) {
        if (!categories[q.category]) {
          categories[q.category] = { total: 0, count: 0 };
        }
        categories[q.category].total += answers[index];
        categories[q.category].count += 1;
      }
    });
    return Object.entries(categories).map(([name, data]) => ({
      name,
      score: Math.round((data.total / (data.count * 4)) * 100)
    }));
  };

  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  const score = calculateScore();
  const maturity = getMaturityLevel(score);
  const categoryScores = getCategoryScores();

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Assessment Complete</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your DevOps Maturity Score</h1>
            </div>

            {/* Score Display */}
            <div className="glass rounded-2xl p-8 mb-8 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${score * 5.53} 553`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-foreground">{score}%</span>
                  <span className="text-sm text-muted-foreground">Maturity Score</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gradient mb-2">{maturity.level}</h2>
              <p className="text-muted-foreground">{maturity.description}</p>
            </div>

            {/* Category Breakdown */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">Category Breakdown</h3>
              <div className="space-y-6">
                {categoryScores.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-medium">{cat.name}</span>
                      <span className="text-primary">{cat.score}%</span>
                    </div>
                    <Progress value={cat.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Recommended Next Steps</h3>
              <ul className="space-y-3">
                {categoryScores
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 3)
                  .map((cat) => (
                    <li key={cat.name} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">
                        Focus on improving <strong className="text-foreground">{cat.name}</strong> - currently at {cat.score}% maturity
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Button variant="hero" asChild>
                <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                  Talk to Our Team
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="glass rounded-2xl p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-primary">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Category Badge */}
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {question.category}
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-foreground mb-8">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    answers[currentQuestion] === option.score
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
              >
                {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
