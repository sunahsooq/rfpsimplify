import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react";

const laborRates = [
  { category: "Program Manager", yrsRequired: "10+", yourCandidate: "Sarah Chen", marketLow: "$145", marketAvg: "$165", marketHigh: "$185", yourRate: "$155" },
  { category: "Technical Lead", yrsRequired: "8+", yourCandidate: "Mike Rodriguez", marketLow: "$135", marketAvg: "$155", marketHigh: "$175", yourRate: "$145" },
  { category: "Sr. Cloud Engineer", yrsRequired: "5+", yourCandidate: "Open Position", marketLow: "$125", marketAvg: "$145", marketHigh: "$165", yourRate: "$140" },
  { category: "Security Engineer", yrsRequired: "5+", yourCandidate: "James Park", marketLow: "$130", marketAvg: "$150", marketHigh: "$170", yourRate: "$148" },
  { category: "DevOps Engineer", yrsRequired: "3+", yourCandidate: "Open Position", marketLow: "$115", marketAvg: "$130", marketHigh: "$150", yourRate: "$125" },
];

export function OpportunityPricingTab() {
  return (
    <div className="space-y-6">
      {/* Pricing Overview Panel */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Pricing Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-background/50 rounded-xl">
            <p className="text-3xl font-bold text-foreground">$142</p>
            <p className="text-sm text-muted-foreground">Avg Blended Rate/hr</p>
            <Badge className="mt-2 bg-success/20 text-success border-0">Market Average</Badge>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-xl">
            <p className="text-3xl font-bold text-foreground">$6.8M</p>
            <p className="text-sm text-muted-foreground">Median Similar Award</p>
            <Badge className="mt-2 bg-primary/20 text-primary border-0">Based on 12 awards</Badge>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-xl">
            <p className="text-3xl font-bold text-foreground">18</p>
            <p className="text-sm text-muted-foreground">Average FTEs</p>
            <Badge className="mt-2 bg-warning/20 text-warning border-0">Large Team</Badge>
          </div>
        </div>
      </Card>

      {/* Price to Win Analysis */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Price-to-Win Analysis
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-success/10 rounded-xl border border-success/20">
            <p className="text-sm font-medium text-success mb-2">Recommended Range</p>
            <p className="text-2xl font-bold text-foreground">$5.8M - $6.5M</p>
            <p className="text-sm text-muted-foreground mt-1">Based on competitive analysis</p>
          </div>
          <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
            <p className="text-sm font-medium text-warning mb-2">Incumbent Range (est.)</p>
            <p className="text-2xl font-bold text-foreground">$6.2M - $7.0M</p>
            <p className="text-sm text-muted-foreground mt-1">Historical contract data</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-foreground">
            💡 <strong>Strategy:</strong> Bid at lower end of range ($5.9M) to undercut incumbent while maintaining margin. Emphasize technical differentiators to justify value.
          </p>
        </div>
      </Card>

      {/* Labor Rate Benchmarks */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Labor Rate Benchmarks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Yrs Req'd</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Your Candidate</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Market Low</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Market Avg</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Market High</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Your Rate</th>
              </tr>
            </thead>
            <tbody>
              {laborRates.map((rate, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-primary/5">
                  <td className="py-3 font-medium text-foreground">{rate.category}</td>
                  <td className="py-3 text-muted-foreground">{rate.yrsRequired}</td>
                  <td className="py-3">
                    {rate.yourCandidate === "Open Position" ? (
                      <Badge className="bg-warning/20 text-warning border-0">Open Position</Badge>
                    ) : (
                      <span className="text-foreground">{rate.yourCandidate}</span>
                    )}
                  </td>
                  <td className="py-3 text-center text-muted-foreground">{rate.marketLow}</td>
                  <td className="py-3 text-center text-muted-foreground">{rate.marketAvg}</td>
                  <td className="py-3 text-center text-muted-foreground">{rate.marketHigh}</td>
                  <td className="py-3 text-center">
                    <Badge className="bg-success/20 text-success border-0">{rate.yourRate}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Pricing data derived from GSA Schedule rates, USAspending.gov, and industry benchmarks. Actual rates may vary.
      </p>
    </div>
  );
}
