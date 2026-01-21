import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronDown, Filter, Percent, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Stage = "Identified" | "Qualified" | "Pursuing" | "Submitted";

type Opportunity = {
  id: string;
  title: string;
  agency: string;
  due: string;
  urgent: boolean;
  match: number;
  estValue: string;
  stage: Stage;
};

const stageMeta: Record<Stage, { label: Stage; className: string }> = {
  Identified: { label: "Identified", className: "bg-stage-identified/15 text-stage-identified" },
  Qualified: { label: "Qualified", className: "bg-stage-qualified/15 text-stage-qualified" },
  Pursuing: { label: "Pursuing", className: "bg-stage-pursuing/15 text-stage-pursuing" },
  Submitted: { label: "Submitted", className: "bg-stage-submitted/15 text-stage-submitted" },
};

const opportunities: Opportunity[] = [
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
    title: "Cybersecurity Monitoring",
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
];

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const navigate = useNavigate();
  const stage = stageMeta[opportunity.stage];

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/opportunity/${opportunity.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/opportunity/${opportunity.id}`);
      }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
      aria-label={`Open opportunity ${opportunity.title}`}
    >
      {/* Subtle surface treatment */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-60" />

      <div className="relative p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-[18px] font-bold text-foreground">{opportunity.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Agency: {opportunity.agency}</p>
          </div>

          {/* Stage badge (visual only; not clickable) */}
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${stage.className}`}
            aria-label={`Stage: ${stage.label}`}
          >
            {stage.label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className={opportunity.urgent ? "text-urgent" : "text-muted-foreground"}>
              Due: {opportunity.due}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>Est. Value: {opportunity.estValue}</span>
          </div>
          <div className="flex items-center justify-start sm:justify-end">
            <span className="inline-flex items-center rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
              Match: {opportunity.match}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Opportunities() {
  const [agency, setAgency] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [match, setMatch] = useState<string | undefined>(undefined);
  const [setAside, setSetAside] = useState<string | undefined>(undefined);

  // Visual-only filters (no logic). We still compute a stable list for rendering.
  const rows = useMemo(() => opportunities, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="mx-auto w-full max-w-[1600px] px-8 pb-10 pt-6">
        <section className="mb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-bold text-foreground">Opportunities</h1>
              <p className="mt-1 text-[16px] text-muted-foreground">Browse and shortlist high-fit federal RFPs</p>
            </div>

            <Button className="h-11 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-card transition-all hover:scale-[1.02] hover:shadow-glow">
              <Filter className="mr-2 h-4 w-4" />
              Create Watchlist
            </Button>
          </div>
        </section>

        {/* Filters (visual only) */}
        <section className="mb-6 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <Select value={agency} onValueChange={setAgency}>
              <SelectTrigger className="h-11 rounded-full border-border bg-background/40">
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                <SelectItem value="DOE">DOE</SelectItem>
                <SelectItem value="DHS">DHS</SelectItem>
                <SelectItem value="GSA">GSA</SelectItem>
                <SelectItem value="DoD">DoD</SelectItem>
                <SelectItem value="VA">VA</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dueDate} onValueChange={setDueDate}>
              <SelectTrigger className="h-11 rounded-full border-border bg-background/40">
                <SelectValue placeholder="Due Date" />
              </SelectTrigger>
              <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                <SelectItem value="7">Next 7 days</SelectItem>
                <SelectItem value="30">Next 30 days</SelectItem>
                <SelectItem value="60">Next 60 days</SelectItem>
              </SelectContent>
            </Select>

            <Select value={match} onValueChange={setMatch}>
              <SelectTrigger className="h-11 rounded-full border-border bg-background/40">
                <SelectValue placeholder="Match %" />
              </SelectTrigger>
              <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                <SelectItem value="90">90%+</SelectItem>
                <SelectItem value="75">75%+</SelectItem>
                <SelectItem value="60">60%+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={setAside} onValueChange={setSetAside}>
              <SelectTrigger className="h-11 rounded-full border-border bg-background/40">
                <SelectValue placeholder="Set-Aside" />
              </SelectTrigger>
              <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="8a">8(a)</SelectItem>
                <SelectItem value="sdvosb">SDVOSB</SelectItem>
                <SelectItem value="wosb">WOSB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
              Filters are visual-only in this demo
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Percent className="h-4 w-4" />
              List view (default)
            </div>
          </div>
        </section>

        {/* List view */}
        <section className="space-y-4">
          {rows.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </section>
      </main>
    </div>
  );
}
