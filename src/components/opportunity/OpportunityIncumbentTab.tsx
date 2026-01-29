import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, Clock, DollarSign, TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

const incumbent = {
  name: "TechNova Federal",
  location: "Reston, VA",
  size: "500+ employees",
  contractYears: 5,
  totalValue: "$42M",
  rewinRate: "72%",
  trend: "stable" as const,
  strengths: [
    "Strong relationship with DOE stakeholders",
    "Deep institutional knowledge of systems",
    "FedRAMP High authorized platform",
    "Large cleared workforce (150+ cleared)",
    "On-site presence at multiple facilities",
  ],
  weaknesses: [
    "Recent delivery issues on Phase 2 milestone",
    "Key PM departed 6 months ago",
    "Higher-than-market labor rates",
    "Limited cloud-native experience",
    "Customer complaints about responsiveness",
  ],
};

const displacementStrategies = [
  {
    strategy: "Technical Innovation",
    description: "Propose modern cloud-native architecture vs. their lift-and-shift approach",
    difficulty: "Medium",
    impact: "High",
  },
  {
    strategy: "Price Competitiveness",
    description: "Undercut by 10-15% while maintaining quality through automation",
    difficulty: "Low",
    impact: "High",
  },
  {
    strategy: "Fresh Perspective",
    description: "Emphasize new ideas and solutions to known problems",
    difficulty: "Low",
    impact: "Medium",
  },
  {
    strategy: "Key Personnel",
    description: "Recruit their departing PM or other disaffected staff",
    difficulty: "High",
    impact: "High",
  },
];

export function OpportunityIncumbentTab() {
  return (
    <div className="space-y-6">
      {/* Incumbent Overview */}
      <Card className="p-6 bg-background/5 border-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xl font-bold text-white">
              TN
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{incumbent.name}</h3>
              <p className="text-sm text-muted-foreground">{incumbent.location} • {incumbent.size}</p>
            </div>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-0 text-sm px-3 py-1">
            Current Incumbent
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-background/50 rounded-xl text-center">
            <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{incumbent.contractYears}</p>
            <p className="text-xs text-muted-foreground">Years on Contract</p>
          </div>
          <div className="p-4 bg-background/50 rounded-xl text-center">
            <DollarSign className="h-5 w-5 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{incumbent.totalValue}</p>
            <p className="text-xs text-muted-foreground">Total Contract Value</p>
          </div>
          <div className="p-4 bg-background/50 rounded-xl text-center">
            <TrendingUp className="h-5 w-5 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{incumbent.rewinRate}</p>
            <p className="text-xs text-muted-foreground">Historical Re-win Rate</p>
          </div>
          <div className="p-4 bg-background/50 rounded-xl text-center">
            {incumbent.trend === "stable" ? (
              <TrendingUp className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-destructive mx-auto mb-2" />
            )}
            <p className="text-2xl font-bold text-foreground capitalize">{incumbent.trend}</p>
            <p className="text-xs text-muted-foreground">Performance Trend</p>
          </div>
        </div>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-background/5 border-border/50">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Incumbent Strengths
          </h4>
          <ul className="space-y-2">
            {incumbent.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-success mt-1">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 bg-background/5 border-border/50">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Incumbent Weaknesses
          </h4>
          <ul className="space-y-2">
            {incumbent.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-destructive mt-1">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Displacement Strategies */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Displacement Strategies
        </h3>
        <div className="space-y-3">
          {displacementStrategies.map((strategy, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-background/50 rounded-xl border border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{strategy.strategy}</h4>
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`border-0 ${
                  strategy.difficulty === "Low" ? "bg-success/20 text-success" :
                  strategy.difficulty === "Medium" ? "bg-warning/20 text-warning" :
                  "bg-destructive/20 text-destructive"
                }`}>
                  {strategy.difficulty} Effort
                </Badge>
                <Badge className={`border-0 ${
                  strategy.impact === "High" ? "bg-primary/20 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {strategy.impact} Impact
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Incumbent data derived from FPDS, USAspending.gov, and public sources. Performance assessments are estimates.
      </p>
    </div>
  );
}
