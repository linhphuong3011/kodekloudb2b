import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Calculator, DollarSign, TrendingUp, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(20);
  const [avgSalary, setAvgSalary] = useState(120000);
  const [deploymentFrequency, setDeploymentFrequency] = useState(4); // per month
  const [incidentRate, setIncidentRate] = useState(8); // per month
  const [avgIncidentCost, setAvgIncidentCost] = useState(5000);
  const [trainingInvestment, setTrainingInvestment] = useState(25000);

  // Calculate ROI metrics
  const productivityGain = 0.15; // 15% productivity improvement
  const incidentReduction = 0.40; // 40% incident reduction
  const deploymentSpeedup = 0.30; // 30% faster deployments

  const annualProductivitySavings = teamSize * avgSalary * productivityGain;
  const annualIncidentSavings = incidentRate * 12 * avgIncidentCost * incidentReduction;
  const deploymentTimeSavings = deploymentFrequency * 12 * (avgSalary / 2080) * 4 * teamSize * 0.2 * deploymentSpeedup;
  
  const totalAnnualBenefit = annualProductivitySavings + annualIncidentSavings + deploymentTimeSavings;
  const roi = ((totalAnnualBenefit - trainingInvestment) / trainingInvestment) * 100;
  const paybackMonths = Math.ceil((trainingInvestment / totalAnnualBenefit) * 12);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Calculator className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Training ROI Calculator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Training ROI</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the potential return on investment from upskilling your DevOps and Cloud engineering teams.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Your Team Details</h2>
              
              <div className="space-y-8">
                <div>
                  <Label className="text-foreground mb-3 block">Engineering Team Size</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[teamSize]}
                      onValueChange={(v) => setTeamSize(v[0])}
                      min={5}
                      max={200}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">{teamSize}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Average Engineer Salary (Annual)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Monthly Deployment Frequency</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[deploymentFrequency]}
                      onValueChange={(v) => setDeploymentFrequency(v[0])}
                      min={1}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">{deploymentFrequency}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Monthly Production Incidents</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[incidentRate]}
                      onValueChange={(v) => setIncidentRate(v[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">{incidentRate}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Average Cost per Incident</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={avgIncidentCost}
                      onChange={(e) => setAvgIncidentCost(Number(e.target.value))}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Proposed Training Investment</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={trainingInvestment}
                      onChange={(e) => setTrainingInvestment(Number(e.target.value))}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* ROI Highlight */}
              <div className="glass rounded-2xl p-8 text-center glow-border">
                <p className="text-sm text-muted-foreground mb-2">Projected Annual ROI</p>
                <p className="text-5xl font-bold text-gradient mb-2">{roi.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">
                  Payback period: <span className="text-primary font-medium">{paybackMonths} months</span>
                </p>
              </div>

              {/* Benefits Breakdown */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Annual Benefits Breakdown</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">Productivity Gains</p>
                          <p className="text-sm text-muted-foreground">15% efficiency improvement</p>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(annualProductivitySavings)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">Incident Reduction</p>
                          <p className="text-sm text-muted-foreground">40% fewer production incidents</p>
                        </div>
                        <p className="text-lg font-bold text-accent">{formatCurrency(annualIncidentSavings)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">Deployment Efficiency</p>
                          <p className="text-sm text-muted-foreground">30% faster deployment cycles</p>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(deploymentTimeSavings)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-foreground">Total Annual Benefit</p>
                      <p className="text-2xl font-bold text-gradient">{formatCurrency(totalAnnualBenefit)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to see these results with your team? Our enterprise solutions include custom ROI tracking.
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <a href="https://kodekloud.com/business" target="_blank" rel="noopener noreferrer">
                    Get a Custom Proposal
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ROICalculator;
