import { CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type FactorStatus = "pass" | "warn" | "fail";

interface DecisionFactor {
  label: string;
  status: FactorStatus;
  detail: string;
}

const factors: DecisionFactor[] = [
  { label: "Fit Score", status: "pass", detail: "High (78%)" },
  { label: "Compliance Risk", status: "warn", detail: "Medium" },
  { label: "Competitive Risk", status: "warn", detail: "Incumbent present" },
  { label: "Resource Availability", status: "pass", detail: "Available" },
  { label: "Schedule Risk", status: "warn", detail: "Tight deadline" },
];

const statusConfig: Record<FactorStatus, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-success" },
  warn: { icon: AlertTriangle, color: "text-warning" },
  fail: { icon: AlertTriangle, color: "text-destructive" },
};

export function OpportunityCaptureDecisionPanel() {
  return (
    <div className="rounded-xl bg-[#1a2540] p-5 shadow-card md:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground md:text-xl">Capture Decision</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on fit, gaps, competition, and available partners
        </p>
      </div>

      {/* Recommendation Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-warning/15 px-4 py-2">
        <Users className="h-4 w-4 text-warning" />
        <span className="text-sm font-bold text-warning">Recommended: BID WITH PARTNER</span>
      </div>

      {/* Justification */}
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Strong technical fit and past performance. Gaps in GSA vehicle and FedRAMP can be mitigated
        through identified teaming partners.
      </p>

      {/* Decision Factors */}
      <div className="mb-5 space-y-2.5 border-t border-[#334155] pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Decision Factors
        </p>
        {factors.map((factor) => {
          const config = statusConfig[factor.status];
          const Icon = config.icon;
          return (
            <div key={factor.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 shrink-0 ${config.color}`} />
                <span className="text-sm text-foreground">{factor.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{factor.detail}</span>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-sm font-medium text-white shadow-card transition-all hover:scale-[1.01] hover:shadow-glow">
          Mark as Bid
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#334155] text-sm font-medium text-foreground hover:bg-[#2a334f]"
        >
          Mark as No-Bid
        </Button>
        <button
          type="button"
          className="mt-1 text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Revisit Later
        </button>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 border-t border-[#334155] pt-4 text-xs italic text-muted-foreground">
        Decision guidance is advisory and should be reviewed by capture lead.
      </p>
    </div>
  );
}
