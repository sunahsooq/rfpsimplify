import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";
type Status = "pass" | "partial" | "gap";

interface GapItem {
  label: string;
  status: Status;
  impact: string;
  risk: RiskLevel;
}

const statusConfig: Record<Status, { icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  pass: { icon: CheckCircle2, color: "text-success", bgColor: "bg-success/10" },
  partial: { icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10" },
  gap: { icon: XCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
};

const riskBadgeClass: Record<RiskLevel, string> = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
};

export function OpportunityGapsRisksTab({
  matchAnalysis,
}: {
  matchAnalysis?: { gaps?: string[] | null; risk_flags?: string[] | null } | null;
}) {
  const gaps: GapItem[] = (matchAnalysis?.gaps ?? []).map((g) => ({
    label: g,
    status: "gap" as const,
    impact: "Gap identified",
    risk: "medium" as const,
  }));

  const risks: GapItem[] = (matchAnalysis?.risk_flags ?? []).map((r) => ({
    label: r,
    status: "partial" as const,
    impact: "Risk flag",
    risk: "high" as const,
  }));

  const rows = [...gaps, ...risks].slice(0, 12);

  if (!rows.length) {
    return (
      <div className="rounded-lg border border-border bg-background/5 p-6">
        <p className="text-sm text-muted-foreground">No gaps or risks available for this opportunity yet.</p>
      </div>
    );
  }

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
        {rows.map((item) => {
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
      <p className="text-xs italic text-muted-foreground">Gaps and risks are derived from the persisted RFP analysis.</p>
    </div>
  );
}
