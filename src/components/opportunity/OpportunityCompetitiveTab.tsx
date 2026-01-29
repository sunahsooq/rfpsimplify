import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Target, TrendingUp, Building2 } from "lucide-react";

interface Competitor {
  name: string;
  location: string;
  size: string;
  threatLevel: "High" | "Medium" | "Low";
  advantages: string[];
  disadvantages: string[];
  incumbentHistory?: string;
}

const competitors: Competitor[] = [
  {
    name: "TechNova Federal",
    location: "Reston, VA",
    size: "500+ employees",
    threatLevel: "High",
    advantages: ["Incumbent on similar DOE contract", "FedRAMP High certified", "Strong past performance"],
    disadvantages: ["Higher rates", "Recent delivery issues on VA contract"],
    incumbentHistory: "Current holder - 5 years",
  },
  {
    name: "CloudFirst Systems",
    location: "Arlington, VA",
    size: "200-500 employees",
    threatLevel: "Medium",
    advantages: ["AWS Premier Partner", "Competitive pricing"],
    disadvantages: ["No DOE experience", "Limited cleared staff"],
  },
  {
    name: "DataSecure Corp",
    location: "McLean, VA",
    size: "100-200 employees",
    threatLevel: "Low",
    advantages: ["Strong cybersecurity focus"],
    disadvantages: ["No cloud migration experience", "Small team for this scope"],
  },
];

const threatColors = {
  High: "bg-destructive/20 text-destructive",
  Medium: "bg-warning/20 text-warning",
  Low: "bg-success/20 text-success",
};

export function OpportunityCompetitiveTab() {
  return (
    <div className="space-y-6">
      {/* Your Discriminators */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Your Competitive Discriminators
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-success mb-2">✓ Advantages</h4>
            <div className="flex flex-wrap gap-2">
              {["DOE Past Performance", "CMMC Level 2", "Agile Methodology", "Lower Rates", "Local Staff"].map((item) => (
                <Badge key={item} className="bg-success/20 text-success border-0">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-destructive mb-2">✗ Disadvantages</h4>
            <div className="flex flex-wrap gap-2">
              {["No FedRAMP High", "Smaller Team", "First DOE Cloud Project"].map((item) => (
                <Badge key={item} className="bg-destructive/20 text-destructive border-0">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Competitive Density */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Competitive Density
        </h3>
        <div className="flex items-center gap-4">
          <Badge className="bg-warning/20 text-warning border-0 text-sm px-3 py-1">
            MEDIUM
          </Badge>
          <span className="text-muted-foreground">Estimated 12-18 bidders based on similar awards</span>
        </div>
      </Card>

      {/* Estimated Competitors */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Estimated Competitors
        </h3>
        <div className="grid gap-4">
          {competitors.map((competitor) => (
            <Card key={competitor.name} className="p-5 bg-background/5 border-border/50">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{competitor.name}</h4>
                    <Badge className={threatColors[competitor.threatLevel]}>
                      {competitor.threatLevel} Threat
                    </Badge>
                    {competitor.incumbentHistory && (
                      <Badge className="bg-purple-500/20 text-purple-400 border-0">
                        Incumbent
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {competitor.location} • {competitor.size}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-success mb-1">Strengths</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {competitor.advantages.map((adv, i) => (
                          <li key={i}>• {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-destructive mb-1">Weaknesses</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {competitor.disadvantages.map((dis, i) => (
                          <li key={i}>• {dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Competitor data derived from FPDS award history and GovWin intelligence. Verify with additional research.
      </p>
    </div>
  );
}
