import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Filter, Search, ShieldCheck, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AppTopNav } from "@/components/AppTopNav";

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
  tags: string[];
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
    tags: ["Cloud", "FedRAMP", "Migration"],
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
    tags: ["Security", "Zero Trust", "Network"],
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
    tags: ["Data", "Analytics", "Cloud"],
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
    tags: ["Security", "SOC", "SIEM"],
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
    tags: ["Modernization", "DevSecOps"],
  },
  {
    id: "identity-management-platform",
    title: "Identity Management Platform",
    agency: "Treasury",
    due: "Apr 05, 2026",
    urgent: false,
    match: 83,
    estValue: "$2.8M",
    stage: "Qualified",
    tags: ["IAM", "Security", "Cloud"],
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

      <div className="relative p-5 md:p-6">
        {/* Top row: Title + Stage */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-foreground md:text-[18px]">{opportunity.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Agency: {opportunity.agency}</p>
          </div>

          <span
            className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold ${stage.className}`}
            aria-label={`Stage: ${stage.label}`}
          >
            {stage.label}
          </span>
        </div>

        {/* Middle row: Meta info */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className={opportunity.urgent ? "font-medium text-urgent" : "text-muted-foreground"}>
              Due: {opportunity.due}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Est. Value: {opportunity.estValue}</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span className="text-lg font-bold text-success">{opportunity.match}%</span>
              <Progress value={opportunity.match} className="h-1 w-16 bg-muted" />
            </div>
          </div>
        </div>

        {/* Bottom row: Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function Opportunities() {
  const [search, setSearch] = useState("");
  const [agency, setAgency] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [match, setMatch] = useState<string | undefined>(undefined);
  const [setAside, setSetAside] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("list");

  // Visual-only filters (no logic). We still compute a stable list for rendering.
  const rows = useMemo(() => opportunities, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />
      <main className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-6 md:px-8">
        {/* Page Header */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-[32px]">Opportunities</h1>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Browse and shortlist high-fit federal RFPs
              </p>
            </div>

            <Button className="h-11 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-card transition-all hover:scale-[1.02] hover:shadow-glow sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Create Watchlist
            </Button>
          </div>
        </section>

        {/* Filter + Action Bar */}
        <section className="mb-6 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Search + Filters */}
            <div className="flex flex-1 flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              {/* Search Input */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search title, agency, NAICS…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 rounded-full border-border bg-background/40 pl-9 text-sm"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-2">
                <Select value={agency} onValueChange={setAgency}>
                  <SelectTrigger className="h-9 w-28 rounded-full border-border bg-background/40 text-xs">
                    <SelectValue placeholder="Agency" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="DOE">DOE</SelectItem>
                    <SelectItem value="DHS">DHS</SelectItem>
                    <SelectItem value="GSA">GSA</SelectItem>
                    <SelectItem value="DoD">DoD</SelectItem>
                    <SelectItem value="VA">VA</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dueDate} onValueChange={setDueDate}>
                  <SelectTrigger className="h-9 w-32 rounded-full border-border bg-background/40 text-xs">
                    <SelectValue placeholder="Due Date" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="7">Next 7 days</SelectItem>
                    <SelectItem value="30">Next 30 days</SelectItem>
                    <SelectItem value="60">Next 60 days</SelectItem>
                    <SelectItem value="past">Past Due</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={match} onValueChange={setMatch}>
                  <SelectTrigger className="h-9 w-28 rounded-full border-border bg-background/40 text-xs">
                    <SelectValue placeholder="Match %" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="90">&gt;90%</SelectItem>
                    <SelectItem value="75">75-90%</SelectItem>
                    <SelectItem value="60">60-75%</SelectItem>
                    <SelectItem value="below60">&lt;60%</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={setAside} onValueChange={setSetAside}>
                  <SelectTrigger className="h-9 w-32 rounded-full border-border bg-background/40 text-xs">
                    <SelectValue placeholder="Set-Aside" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] border-border bg-popover text-popover-foreground shadow-card">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="full">Full & Open</SelectItem>
                    <SelectItem value="8a">8(a)</SelectItem>
                    <SelectItem value="sdvosb">SDVOSB</SelectItem>
                    <SelectItem value="hubzone">HUBZone</SelectItem>
                    <SelectItem value="wosb">WOSB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right: View Toggle */}
            <div className="flex items-center gap-1 rounded-full border border-border bg-background/40 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-3.5 w-3.5" />
                List
              </button>
              <button
                onClick={() => setViewMode("pipeline")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "pipeline"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Pipeline
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">Filters are visual-only in this demo</p>
        </section>

        {/* Opportunities List */}
        <section className="space-y-4">
          {rows.length > 0 ? (
            rows.map((o) => <OpportunityCard key={o.id} opportunity={o} />)
          ) : (
            <Card className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center shadow-card">
              <p className="text-muted-foreground">No opportunities match your filters yet.</p>
              <Button variant="outline" className="mt-4">
                Clear Filters
              </Button>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
