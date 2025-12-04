import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Lock, Trophy, Target, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

type SkillTrack = "kubernetes" | "terraform" | "cicd" | "aws";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface TrackInfo {
  id: SkillTrack;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
  courses: { name: string; url: string; level: string }[];
}

const skillTracks: TrackInfo[] = [
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "☸️",
    description: "Container orchestration & cluster management",
    questions: [
      {
        id: 1,
        question: "What is the smallest deployable unit in Kubernetes?",
        options: ["Container", "Pod", "Node", "Deployment"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 2,
        question: "Which command is used to view the logs of a pod?",
        options: ["kubectl get logs", "kubectl logs", "kubectl describe logs", "kubectl show logs"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 3,
        question: "What does a ReplicaSet ensure?",
        options: ["Pods are distributed across nodes", "A specified number of pod replicas are running", "Pods have unique IPs", "Containers share storage"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 4,
        question: "Which resource type would you use to expose a service externally with load balancing?",
        options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
        correctAnswer: 2,
        difficulty: "intermediate"
      },
      {
        id: 5,
        question: "What is the purpose of a PersistentVolumeClaim (PVC)?",
        options: ["To create network policies", "To request storage resources", "To define pod affinity", "To manage secrets"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 6,
        question: "Which Kubernetes object would you use to run a task to completion?",
        options: ["Deployment", "DaemonSet", "Job", "StatefulSet"],
        correctAnswer: 2,
        difficulty: "intermediate"
      },
      {
        id: 7,
        question: "What does the 'kubectl apply' command do differently than 'kubectl create'?",
        options: ["Creates resources faster", "Applies declarative configuration updates", "Only works with YAML files", "Requires admin privileges"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 8,
        question: "In a StatefulSet, what is guaranteed about pod naming?",
        options: ["Random names for security", "Stable, predictable names", "Names based on node", "Timestamp-based names"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 9,
        question: "What is the purpose of a Network Policy in Kubernetes?",
        options: ["Load balancing traffic", "DNS resolution", "Controlling pod-to-pod communication", "Managing ingress controllers"],
        correctAnswer: 2,
        difficulty: "advanced"
      },
      {
        id: 10,
        question: "Which component is responsible for scheduling pods to nodes?",
        options: ["kubelet", "kube-proxy", "kube-scheduler", "etcd"],
        correctAnswer: 2,
        difficulty: "advanced"
      }
    ],
    courses: [
      { name: "Kubernetes for Beginners", url: "https://kodekloud.com/courses/kubernetes-for-beginners/", level: "Beginner" },
      { name: "Certified Kubernetes Administrator (CKA)", url: "https://kodekloud.com/courses/certified-kubernetes-administrator-cka/", level: "Intermediate" },
      { name: "Kubernetes Certified Application Developer (CKAD)", url: "https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/", level: "Advanced" }
    ]
  },
  {
    id: "terraform",
    name: "Terraform",
    icon: "🏗️",
    description: "Infrastructure as Code & cloud provisioning",
    questions: [
      {
        id: 1,
        question: "What language is Terraform configuration written in?",
        options: ["YAML", "JSON only", "HCL (HashiCorp Configuration Language)", "Python"],
        correctAnswer: 2,
        difficulty: "beginner"
      },
      {
        id: 2,
        question: "What command initializes a Terraform working directory?",
        options: ["terraform start", "terraform init", "terraform begin", "terraform setup"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 3,
        question: "What does 'terraform plan' do?",
        options: ["Applies changes immediately", "Shows what changes will be made", "Destroys infrastructure", "Validates syntax only"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 4,
        question: "What is the purpose of the Terraform state file?",
        options: ["Store credentials", "Track managed infrastructure", "Define variables", "Store provider plugins"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 5,
        question: "How do you reference an output from another Terraform module?",
        options: ["var.module_name.output", "module.module_name.output_name", "output.module_name.value", "data.module_name.output"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 6,
        question: "What is a Terraform workspace used for?",
        options: ["Organizing modules", "Managing multiple state files for environments", "Storing secrets", "Version control"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 7,
        question: "Which block type is used to fetch data from existing resources?",
        options: ["resource", "data", "module", "provider"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 8,
        question: "What does 'terraform import' do?",
        options: ["Downloads modules", "Imports existing infrastructure into state", "Imports variable files", "Copies configuration files"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 9,
        question: "How can you prevent accidental destruction of a critical resource?",
        options: ["Use terraform lock", "Set prevent_destroy lifecycle rule", "Use read-only provider", "Disable terraform destroy"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 10,
        question: "What is the purpose of 'terraform taint'?",
        options: ["Mark resource for recreation", "Lock state file", "Validate configuration", "Remove from state"],
        correctAnswer: 0,
        difficulty: "advanced"
      }
    ],
    courses: [
      { name: "Terraform for Beginners", url: "https://kodekloud.com/courses/terraform-for-beginners/", level: "Beginner" },
      { name: "Terraform Associate Certification", url: "https://kodekloud.com/courses/hashicorp-certified-terraform-associate/", level: "Intermediate" },
      { name: "Terraform Challenges", url: "https://kodekloud.com/courses/terraform-challenges/", level: "Advanced" }
    ]
  },
  {
    id: "cicd",
    name: "CI/CD & GitOps",
    icon: "🔄",
    description: "Continuous integration & deployment pipelines",
    questions: [
      {
        id: 1,
        question: "What does CI stand for in CI/CD?",
        options: ["Code Integration", "Continuous Integration", "Central Infrastructure", "Cloud Infrastructure"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 2,
        question: "Which file defines a GitHub Actions workflow?",
        options: [".github/workflows/*.yml", "Jenkinsfile", ".gitlab-ci.yml", "pipeline.json"],
        correctAnswer: 0,
        difficulty: "beginner"
      },
      {
        id: 3,
        question: "What is the primary benefit of automated testing in CI/CD?",
        options: ["Faster deployments only", "Early detection of bugs", "Reduced server costs", "Better documentation"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 4,
        question: "What is GitOps?",
        options: ["Git hosting service", "Using Git as source of truth for infrastructure", "GitHub operations team", "Git optimization"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 5,
        question: "Which tool is commonly used for GitOps in Kubernetes?",
        options: ["Jenkins", "ArgoCD", "Maven", "Ansible"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 6,
        question: "What is a 'pipeline artifact'?",
        options: ["A bug in the pipeline", "Output files passed between stages", "Pipeline configuration", "A deprecated feature"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 7,
        question: "What does 'shift-left' mean in DevOps?",
        options: ["Move to cloud", "Perform testing earlier in development", "Use left-side navigation", "Prioritize older issues"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 8,
        question: "What is a canary deployment?",
        options: ["Full rollout to all users", "Gradual rollout to a subset of users", "Rollback strategy", "Blue-green deployment"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 9,
        question: "In Jenkins, what is a 'Jenkinsfile'?",
        options: ["Configuration for Jenkins server", "Pipeline as code definition", "Plugin manifest", "Build log file"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 10,
        question: "What is the difference between Continuous Delivery and Continuous Deployment?",
        options: ["They are the same", "Delivery requires manual approval, Deployment is automatic", "Deployment is slower", "Delivery is for code, Deployment is for infrastructure"],
        correctAnswer: 1,
        difficulty: "advanced"
      }
    ],
    courses: [
      { name: "Jenkins for Beginners", url: "https://kodekloud.com/courses/jenkins/", level: "Beginner" },
      { name: "GitHub Actions", url: "https://kodekloud.com/courses/github-actions/", level: "Intermediate" },
      { name: "ArgoCD", url: "https://kodekloud.com/courses/argocd/", level: "Advanced" }
    ]
  },
  {
    id: "aws",
    name: "AWS Cloud",
    icon: "☁️",
    description: "Amazon Web Services fundamentals & architecture",
    questions: [
      {
        id: 1,
        question: "What is an AWS Region?",
        options: ["A single data center", "A geographical area with multiple data centers", "A virtual network", "A security group"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 2,
        question: "Which service is used for object storage in AWS?",
        options: ["EBS", "S3", "EFS", "Glacier"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 3,
        question: "What does EC2 stand for?",
        options: ["Elastic Cloud Computing", "Elastic Compute Cloud", "Enterprise Cloud Container", "Elastic Container Compute"],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      {
        id: 4,
        question: "What is the purpose of an AWS VPC?",
        options: ["Virtual container platform", "Isolated virtual network", "Version control", "Backup service"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 5,
        question: "Which service provides managed Kubernetes in AWS?",
        options: ["ECS", "EKS", "Fargate", "Lambda"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 6,
        question: "What is an IAM Role used for?",
        options: ["User authentication only", "Granting permissions to AWS services", "Network routing", "Data encryption"],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        id: 7,
        question: "Which AWS service is serverless compute?",
        options: ["EC2", "ECS", "Lambda", "Lightsail"],
        correctAnswer: 2,
        difficulty: "intermediate"
      },
      {
        id: 8,
        question: "What is the AWS Well-Architected Framework?",
        options: ["A deployment tool", "Best practices for cloud architecture", "A monitoring service", "A billing system"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 9,
        question: "What does AWS CloudFormation do?",
        options: ["Monitors applications", "Infrastructure as Code provisioning", "Container orchestration", "Database management"],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        id: 10,
        question: "What is the difference between a Security Group and NACL?",
        options: ["They are the same", "SG is stateful at instance level, NACL is stateless at subnet level", "NACL is for storage", "SG is for S3 buckets"],
        correctAnswer: 1,
        difficulty: "advanced"
      }
    ],
    courses: [
      { name: "AWS Cloud Practitioner", url: "https://kodekloud.com/courses/aws-cloud-practitioner/", level: "Beginner" },
      { name: "AWS Solutions Architect Associate", url: "https://kodekloud.com/courses/aws-solutions-architect-associate/", level: "Intermediate" },
      { name: "AWS DevOps Engineer Professional", url: "https://kodekloud.com/courses/aws-devops-engineer-professional/", level: "Advanced" }
    ]
  }
];

const SkillsBenchmark = () => {
  const [selectedTrack, setSelectedTrack] = useState<SkillTrack | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const currentTrack = skillTracks.find(t => t.id === selectedTrack);

  const handleSelectTrack = (trackId: SkillTrack) => {
    setSelectedTrack(trackId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setIsUnlocked(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (currentTrack?.questions.length || 0) - 1) {
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

  const calculateScore = () => {
    if (!currentTrack) return { score: 0, percentage: 0, tier: "Beginner", correct: 0, total: 0 };
    
    let correct = 0;
    currentTrack.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    
    const percentage = Math.round((correct / currentTrack.questions.length) * 100);
    let tier = "Beginner";
    if (percentage >= 80) tier = "Expert";
    else if (percentage >= 60) tier = "Advanced";
    else if (percentage >= 40) tier = "Intermediate";
    
    return { score: correct, percentage, tier, correct, total: currentTrack.questions.length };
  };

  const getBreakdownByDifficulty = () => {
    if (!currentTrack) return { beginner: 0, intermediate: 0, advanced: 0 };
    
    const breakdown = { beginner: { correct: 0, total: 0 }, intermediate: { correct: 0, total: 0 }, advanced: { correct: 0, total: 0 } };
    
    currentTrack.questions.forEach((q, index) => {
      breakdown[q.difficulty].total++;
      if (answers[index] === q.correctAnswer) {
        breakdown[q.difficulty].correct++;
      }
    });
    
    return {
      beginner: breakdown.beginner.total > 0 ? Math.round((breakdown.beginner.correct / breakdown.beginner.total) * 100) : 0,
      intermediate: breakdown.intermediate.total > 0 ? Math.round((breakdown.intermediate.correct / breakdown.intermediate.total) * 100) : 0,
      advanced: breakdown.advanced.total > 0 ? Math.round((breakdown.advanced.correct / breakdown.advanced.total) * 100) : 0
    };
  };

  const handleUnlock = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid work email");
      return;
    }
    setEmailError("");
    setIsUnlocked(true);
  };

  const result = calculateScore();
  const breakdown = getBreakdownByDifficulty();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Expert": return "text-primary";
      case "Advanced": return "text-green-400";
      case "Intermediate": return "text-accent";
      default: return "text-orange-400";
    }
  };

  // Track Selection Screen
  if (!selectedTrack) {
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
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Skills Benchmark</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Test Your DevOps Knowledge</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take a 10-question assessment to benchmark your skills. Get your proficiency tier and personalized learning recommendations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {skillTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  className="glass rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{track.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{track.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-secondary rounded">10 Questions</span>
                        <span className="px-2 py-1 bg-secondary rounded">~5 mins</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Looking for team-wide assessments?</p>
              <Button variant="glass" asChild>
                <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                  Explore Enterprise Solutions
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

  // Results Screen
  if (showResults && currentTrack) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Assessment Complete</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentTrack.name} Skills Benchmark</h1>
              <p className="text-muted-foreground">Your personalized results</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Score Card - Always Visible */}
              <div className="glass rounded-2xl p-8 text-center">
                <div className="relative w-44 h-44 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="88" cy="88" r="78" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                    <circle
                      cx="88"
                      cy="88"
                      r="78"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${result.percentage * 4.9} 490`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-foreground">{result.percentage}%</span>
                    <span className={`text-lg font-semibold ${getTierColor(result.tier)}`}>{result.tier}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  You answered <span className="text-foreground font-semibold">{result.correct}</span> out of <span className="text-foreground font-semibold">{result.total}</span> questions correctly.
                </p>
              </div>

              {/* Gated Content */}
              <div className="glass rounded-2xl p-8 relative overflow-hidden">
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6">
                    <Lock className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-bold mb-2 text-center">Unlock Detailed Breakdown</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      Enter your work email to see skill-by-skill analysis and personalized recommendations.
                    </p>
                    <div className="w-full max-w-xs space-y-3">
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary border-border"
                      />
                      {emailError && <p className="text-xs text-destructive">{emailError}</p>}
                      <Button variant="hero" className="w-full" onClick={handleUnlock}>
                        Unlock Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Performance by Difficulty
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">Beginner Questions</span>
                      <span className={breakdown.beginner >= 80 ? "text-primary" : breakdown.beginner >= 50 ? "text-accent" : "text-destructive"}>
                        {breakdown.beginner}%
                      </span>
                    </div>
                    <Progress value={breakdown.beginner} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">Intermediate Questions</span>
                      <span className={breakdown.intermediate >= 80 ? "text-primary" : breakdown.intermediate >= 50 ? "text-accent" : "text-destructive"}>
                        {breakdown.intermediate}%
                      </span>
                    </div>
                    <Progress value={breakdown.intermediate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">Advanced Questions</span>
                      <span className={breakdown.advanced >= 80 ? "text-primary" : breakdown.advanced >= 50 ? "text-accent" : "text-destructive"}>
                        {breakdown.advanced}%
                      </span>
                    </div>
                    <Progress value={breakdown.advanced} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Recommended Courses - Gated */}
              <div className="lg:col-span-2 glass rounded-2xl p-8 relative overflow-hidden">
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Unlock to see personalized course recommendations</p>
                    </div>
                  </div>
                )}
                
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Learning Path
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentTrack.courses.map((course, index) => (
                    <a
                      key={index}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary/50 rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">{course.level}</span>
                      </div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{course.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">View course →</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" onClick={() => setSelectedTrack(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Try Another Track
                </Button>
                <Button variant="hero" asChild>
                  <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                    Get Team Training Plan
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

  // Quiz Screen
  const question = currentTrack?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <button
            onClick={() => setSelectedTrack(null)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Track Selection
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xl">{currentTrack?.icon}</span>
              <span className="text-sm text-primary font-medium">{currentTrack?.name}</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {currentTrack?.questions.length}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                question?.difficulty === "beginner" ? "bg-green-500/20 text-green-400" :
                question?.difficulty === "intermediate" ? "bg-accent/20 text-accent" :
                "bg-destructive/20 text-destructive"
              }`}>
                {question?.difficulty}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / (currentTrack?.questions.length || 1)) * 100} className="h-2" />
          </div>

          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">{question?.question}</h2>
            
            <div className="space-y-3 mb-8">
              {question?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    answers[currentQuestion] === index
                      ? "bg-primary text-primary-foreground border-2 border-primary"
                      : "bg-secondary border-2 border-transparent hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      answers[currentQuestion] === index
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="glass"
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
                {currentQuestion === (currentTrack?.questions.length || 0) - 1 ? "See Results" : "Next"}
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

export default SkillsBenchmark;
