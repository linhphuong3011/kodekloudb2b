import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Moon, BookOpen, FlaskConical, Users, Zap, Bot } from "lucide-react";
import { Link } from "react-router-dom";

interface Persona {
  id: string;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  tagline: string;
  vibe: string;
  persona: string;
  linkedInBio: string;
  kodekloudTwist: string;
}

const personas: Persona[] = [
  {
    id: "midnight-coder",
    icon: <Moon className="w-8 h-8" />,
    emoji: "🦉",
    title: "The Midnight Coder",
    tagline: "I get more done between 10 PM and 3 AM than the rest of the day combined. Coffee is my IDE.",
    vibe: "Hacker energy meets late-night zen.",
    persona: "The insomniac innovator who disappears into code and re-emerges with genius — or an obscure bash script only they understand.",
    linkedInBio: "A relentless problem-solver who finds clarity when the world goes quiet. Might be on their third cup of espresso at 2 AM, but they've just optimized your deployment process in half the time.",
    kodekloudTwist: "This learner thrives in self-paced, project-driven courses with late-night Slack support or forum activity."
  },
  {
    id: "documentation-diver",
    icon: <BookOpen className="w-8 h-8" />,
    emoji: "📚",
    title: "The Documentation Deep Diver",
    tagline: "If there's a README, I've read it. Twice.",
    vibe: "Inner calm, outer precision.",
    persona: "Your team's go-to for \"How does this actually work?\" explanations and the only one who reads the Kubernetes changelog start to finish.",
    linkedInBio: "Methodical, reliable, and deeply committed to understanding the why before jumping into the how. Their notes are often better than official documentation.",
    kodekloudTwist: "Create binge-worthy content trails and structured learning paths to appeal to their love of order and depth."
  },
  {
    id: "hands-on-experimenter",
    icon: <FlaskConical className="w-8 h-8" />,
    emoji: "🧪",
    title: "The Hands-On Experimenter",
    tagline: "I broke production once. It was the best lesson I ever learned.",
    vibe: "Chaos monkey turned DevOps guru.",
    persona: "Thinks best by doing. Their test environment is their playground, and they don't mind a few bumps along the way.",
    linkedInBio: "The kind of engineer who says \"just deploy it and see\" — and somehow always lands on their feet. Fast learner, fast implementer, and a huge fan of blameless post-mortems.",
    kodekloudTwist: "Sandbox labs and challenge-based learning = 🔥 for this persona."
  },
  {
    id: "community-connector",
    icon: <Users className="w-8 h-8" />,
    emoji: "🧑‍🤝‍🧑",
    title: "The Community Connector",
    tagline: "Why struggle alone when you can ask your DevOps fam?",
    vibe: "Tech with a social twist.",
    persona: "They're in every Slack, Discord, and community forum — not just to learn, but to teach.",
    linkedInBio: "Constantly learning through conversation. They're your best bet for real-world tips, because they've already asked every question in the book and got five different answers.",
    kodekloudTwist: "Encourage forum engagement, peer feedback, and mentorship inside the platform."
  },
  {
    id: "efficiency-optimizer",
    icon: <Zap className="w-8 h-8" />,
    emoji: "⚙️",
    title: "The Efficiency Optimizer",
    tagline: "If I have to do it twice, I'm writing a script.",
    vibe: "Practical, lean, minimalism-meets-mastery.",
    persona: "They don't want all the knowledge — just what's useful. Expect a clean dotfiles repo and a shortcut for everything.",
    linkedInBio: "Masters the art of \"just enough.\" They're not here for theory — they're here to automate it and move on. Their GitHub is a treasure chest of time-saving wizardry.",
    kodekloudTwist: "Serve bite-sized microlearning and skill-paths tailored to business value outcomes."
  },
  {
    id: "genai-engineer",
    icon: <Bot className="w-8 h-8" />,
    emoji: "🤖",
    title: "The GenAI-Augmented Engineer",
    tagline: "If I don't know it, ChatGPT probably does.",
    vibe: "Prompt-pilled and future-ready.",
    persona: "Uses GenAI like a co-pilot, knowing when to trust it — and when to triple-check. This learner is pioneering the new skill stack.",
    linkedInBio: "Fluent in prompt engineering and AI-enhanced workflows. Sees GenAI as a tool, not a crutch. They're bridging the gap between deep knowledge and instant acceleration.",
    kodekloudTwist: "Teach not just what AI can do — but how to leverage it responsibly in real-world DevOps environments."
  }
];

interface Question {
  id: number;
  question: string;
  options: { text: string; personaId: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "When do you feel most productive?",
    options: [
      { text: "Late at night when everyone else is asleep", personaId: "midnight-coder" },
      { text: "After I've thoroughly researched and documented everything", personaId: "documentation-diver" },
      { text: "When I'm hands-on, experimenting with new tools", personaId: "hands-on-experimenter" },
      { text: "When I'm collaborating with others in the community", personaId: "community-connector" },
      { text: "When I've automated repetitive tasks", personaId: "efficiency-optimizer" },
      { text: "When I'm leveraging AI to speed up my workflow", personaId: "genai-engineer" }
    ]
  },
  {
    id: 2,
    question: "How do you approach learning a new technology?",
    options: [
      { text: "Deep dive sessions, often late into the night", personaId: "midnight-coder" },
      { text: "Read all the documentation first", personaId: "documentation-diver" },
      { text: "Jump in and start breaking things", personaId: "hands-on-experimenter" },
      { text: "Ask the community for recommendations", personaId: "community-connector" },
      { text: "Find the shortest path to practical application", personaId: "efficiency-optimizer" },
      { text: "Use AI to help me understand and implement faster", personaId: "genai-engineer" }
    ]
  },
  {
    id: 3,
    question: "What's your ideal learning environment?",
    options: [
      { text: "Quiet, distraction-free, preferably after hours", personaId: "midnight-coder" },
      { text: "Structured courses with comprehensive materials", personaId: "documentation-diver" },
      { text: "Interactive labs and sandbox environments", personaId: "hands-on-experimenter" },
      { text: "Study groups and community forums", personaId: "community-connector" },
      { text: "Quick, focused tutorials that get to the point", personaId: "efficiency-optimizer" },
      { text: "AI-assisted learning with smart recommendations", personaId: "genai-engineer" }
    ]
  },
  {
    id: 4,
    question: "How do you handle getting stuck on a problem?",
    options: [
      { text: "Keep grinding until I figure it out, no matter how late", personaId: "midnight-coder" },
      { text: "Research extensively until I understand the root cause", personaId: "documentation-diver" },
      { text: "Try different approaches until something works", personaId: "hands-on-experimenter" },
      { text: "Reach out to my network for advice", personaId: "community-connector" },
      { text: "Find the quickest workaround and move on", personaId: "efficiency-optimizer" },
      { text: "Ask an AI for suggestions and iterate", personaId: "genai-engineer" }
    ]
  },
  {
    id: 5,
    question: "What motivates you to keep learning?",
    options: [
      { text: "The thrill of solving complex problems in peace", personaId: "midnight-coder" },
      { text: "Building deep expertise and understanding", personaId: "documentation-diver" },
      { text: "The excitement of trying new things", personaId: "hands-on-experimenter" },
      { text: "Sharing knowledge and helping others grow", personaId: "community-connector" },
      { text: "Making my work more efficient and impactful", personaId: "efficiency-optimizer" },
      { text: "Staying ahead of the curve with emerging tech", personaId: "genai-engineer" }
    ]
  }
];

const LearningPersona = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (personaId: string) => {
    setSelectedOption(personaId);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const calculateResult = (): Persona => {
    const counts: Record<string, number> = {};
    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    
    const topPersonaId = Object.entries(counts).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];
    
    return personas.find((p) => p.id === topPersonaId) || personas[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const result = showResult ? calculateResult() : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/#tools" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                DevOps <span className="text-gradient">Learning Persona</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover your unique learning style and get personalized recommendations
              </p>
            </div>

            {!showResult ? (
              <div className="glass rounded-2xl p-8">
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.personaId)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        selectedOption === option.personaId
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <Button 
                    onClick={handleNext} 
                    disabled={!selectedOption}
                    variant="hero"
                  >
                    {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : result && (
              <div className="glass rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{result.emoji}</div>
                  <h2 className="text-3xl font-bold mb-2">{result.title}</h2>
                  <p className="text-xl text-primary italic">"{result.tagline}"</p>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold text-primary mb-2">Vibe</h3>
                    <p className="text-muted-foreground">{result.vibe}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold text-primary mb-2">Persona</h3>
                    <p className="text-muted-foreground">{result.persona}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold text-primary mb-2">LinkedIn Style Bio</h3>
                    <p className="text-muted-foreground">{result.linkedInBio}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">How KodeKloud Can Help</h3>
                    <p className="text-muted-foreground">{result.kodekloudTwist}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Retake Assessment
                  </Button>
                  <Button variant="hero" className="flex-1" asChild>
                    <a href="https://kodekloud.com" target="_blank" rel="noopener noreferrer">
                      Start Learning with KodeKloud
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearningPersona;
