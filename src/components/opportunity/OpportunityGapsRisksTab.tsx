import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";
type Status = "pass" | "partial" | "gap";

interface GapItem {
  label: string;
  status: Status;
  impact: string;
  risk: RiskLevel;
}

const gaps: GapItem[] = [
  {
    label: "FedRAMP Authorization",
    status: "partial",
    impact: "Partial compliance",
    risk: "medium",
  },
  {
    label: "CMMC Level 2 Certification",
    status: "pass",
    impact: "In place",
    risk: "low",
  },
  {
    label: "GSA Schedule 70 Access",
    status: "gap",
    impact: "No current hold",
    risk: "high",
  },
  {
    label: "Past Performance in DOE Cloud Projects",
    status: "pass",
    impact: "Strong",
    risk: "low",
  },
  {
    label: "Pricing Competitiveness",
    status: "partial",
    impact: "Estimated 8–12% above incumbent",
    risk: "medium",
  },
  {
    label: "Security Clearance Requirements",
    status: "pass",
    impact: "Cleared staff available",
    risk: "low",
  },
];

const statusConfig: Record<Status, { icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  pass: { icon: CheckCircle2, color: "text-[#22c55e]", bgColor: "bg-[#22c55e]/10" },
  partial: { icon: AlertTriangle, color: "text-[#f59e0b]", bgColor: "bg-[#f59e0b]/10" },
  gap: { icon: XCircle, color: "text-[#ef4444]", bgColor: "bg-[#ef4444]/10" },
};

const riskBadgeClass: Record<RiskLevel, string> = {
  low: "bg-[#22c55e]/15 text-[#22c55e]",
  medium: "bg-[#f59e0b]/15 text-[#f59e0b]",
  high: "bg-[#ef4444]/15 text-[#ef4444]",
};

export function OpportunityGapsRisksTab() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <header>
        <h2 className="mb-4 text-[20px] font-bold text-foreground">Gaps & Risks Snapshot</h2>
        <p className="text-[15px] leading-relaxed text-slate-200">
          Identified gaps and risks based on your company profile vs solicitation requirements. Green =
          strong match, yellow = partial, red = gap requiring mitigation.
        </p>
      </header>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {gaps.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;

          return (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-lg border border-[#334155] bg-[#2a334f] p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-md p-1.5 ${config.bgColor}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.impact}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#334155] pt-3">
                <span className="text-xs text-muted-foreground">Risk Level</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${riskBadgeClass[item.risk]}`}
                >
                  {item.risk}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Disclaimer */}
      <p className="text-xs italic text-muted-foreground">
        Gaps based on static profile match. Real analysis coming soon.
      </p>
    </div>
  );
}
