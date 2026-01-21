import { useNavigate } from "react-router-dom";
import { Plus, GripVertical, CalendarDays } from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";

type Stage = "Identified" | "Qualified" | "Pursuing" | "Submitted";

interface PipelineOpportunity {
  id: string;
  title: string;
  agency: string;
  due: string;
  urgent: boolean;
  match: number;
  estValue: string;
  stage: Stage;
}

const opportunities: PipelineOpportunity[] = [
  {
    id: "cloud-infra-modernization",
    title: "Cloud Infrastructure Modernization",
    agency: "DOE",
    due: "Feb 15, 2026",
    urgent: true,
    match: 78,
    estValue: "$4.2M",
    stage: "Qualified",
  },
  {
    id: "zero-trust-network-upgrade",
    title: "Zero Trust Network Upgrade",
    agency: "DHS",
    due: "Feb 19, 2026",
    urgent: true,
    match: 71,
    estValue: "$3.8M",
    stage: "Pursuing",
  },
  {
    id: "data-platform-consolidation",
    title: "Data Platform Consolidation",
    agency: "GSA",
    due: "Mar 02, 2026",
    urgent: false,
    match: 65,
    estValue: "$2.1M",
    stage: "Identified",
  },
  {
    id: "cybersecurity-monitoring",
    title: "Cybersecurity Monitoring Services",
    agency: "DoD",
    due: "Feb 10, 2026",
    urgent: true,
    match: 92,
    estValue: "$5.5M",
    stage: "Pursuing",
  },
  {
    id: "application-modernization",
    title: "Application Modernization",
    agency: "VA",
    due: "Mar 20, 2026",
    urgent: false,
    match: 54,
    estValue: "$3.2M",
    stage: "Identified",
  },
  {
    id: "enterprise-sso-integration",
    title: "Enterprise SSO Integration",
    agency: "Treasury",
    due: "Jan 30, 2026",
    urgent: false,
    match: 88,
    estValue: "$1.8M",
    stage: "Submitted",
  },
];

const stages: Stage[] = ["Identified", "Qualified", "Pursuing", "Submitted"];

const stageColors: Record<Stage, { bg: string; text: string; badge: string }> = {
  Identified: {
    bg: "bg-stage-identified/10",
    text: "text-stage-identified",
    badge: "bg-stage-identified/15 text-stage-identified",
  },
  Qualified: {
    bg: "bg-stage-qualified/10",
    text: "text-stage-qualified",
    badge: "bg-stage-qualified/15 text-stage-qualified",
  },
  Pursuing: {
    bg: "bg-stage-pursuing/10",
    text: "text-stage-pursuing",
    badge: "bg-stage-pursuing/15 text-stage-pursuing",
  },
  Submitted: {
    bg: "bg-stage-submitted/10",
    text: "text-stage-submitted",
    badge: "bg-stage-submitted/15 text-stage-submitted",
  },
};

function PipelineCard({ opportunity }: { opportunity: PipelineOpportunity }) {
  const navigate = useNavigate();
  const colors = stageColors[opportunity.stage];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/opportunity/${opportunity.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/opportunity/${opportunity.id}`);
      }}
      className="group cursor-pointer rounded-lg bg-[#2a334f] p-4 shadow-card transition-all hover:scale-[1.02] hover:shadow-glow"
    >
      {/* Drag Handle + Title */}
      <div className="mb-2 flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground opacity-50 group-hover:opacity-100" />
        <h3 className="text-sm font-bold leading-tight text-foreground">{opportunity.title}</h3>
      </div>

      {/* Agency */}
      <p className="mb-3 pl-6 text-xs text-muted-foreground">{opportunity.agency}</p>

      {/* Meta Row */}
      <div className="flex items-center justify-between gap-2 pl-6">
        <div className="flex items-center gap-1.5 text-xs">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <span className={opportunity.urgent ? "font-medium text-red-500" : "text-muted-foreground"}>
            {opportunity.due}
          </span>
        </div>
        <span className="text-sm font-bold text-success">{opportunity.match}%</span>
      </div>

      {/* Bottom Row: Value + Badge */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#334155] pt-3 pl-6">
        <span className="text-xs text-muted-foreground">{opportunity.estValue}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
          {opportunity.stage}
        </span>
      </div>
    </div>
  );
}

function PipelineColumn({ stage, items }: { stage: Stage; items: PipelineOpportunity[] }) {
  const colors = stageColors[stage];

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl bg-[#1a2540] shadow-card md:w-80">
      {/* Column Header */}
      <div className="flex items-center justify-between border-b border-[#334155] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${colors.bg} ${colors.text}`} />
          <h2 className="text-sm font-bold text-foreground">{stage}</h2>
        </div>
        <span className="rounded-full bg-[#334155] px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-[#334155] p-4">
            <p className="text-center text-xs text-muted-foreground">No opportunities in this stage</p>
          </div>
        ) : (
          items.map((opp) => <PipelineCard key={opp.id} opportunity={opp} />)
        )}
      </div>
    </div>
  );
}

export default function Pipeline() {
  // Group opportunities by stage
  const groupedByStage = stages.reduce(
    (acc, stage) => {
      acc[stage] = opportunities.filter((o) => o.stage === stage);
      return acc;
    },
    {} as Record<Stage, PipelineOpportunity[]>
  );

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-6 md:px-8">
        {/* Page Header */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-[32px]">Capture Pipeline</h1>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Track opportunities from identification to submission
              </p>
            </div>

            <Button className="h-11 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-card transition-all hover:scale-[1.02] hover:shadow-glow sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Opportunity
            </Button>
          </div>
        </section>

        {/* Pipeline Board */}
        <section className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#334155] [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="flex gap-4 md:gap-5">
            {stages.map((stage) => (
              <PipelineColumn key={stage} stage={stage} items={groupedByStage[stage]} />
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <p className="mt-6 text-xs italic text-muted-foreground">
          Drag cards between columns to update opportunity stage. Changes are visual-only in this demo.
        </p>
      </main>
    </div>
  );
}
