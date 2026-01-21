import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { OpportunityOverviewTab } from "@/components/opportunity/OpportunityOverviewTab";
import { OpportunityRequirementsTab } from "@/components/opportunity/OpportunityRequirementsTab";
import { OpportunityAiPanel } from "@/components/opportunity/OpportunityAiPanel";

type Stage = "Identified" | "Qualified" | "Pursuing" | "Submitted";

type OpportunityDetailData = {
  title: string;
  agency: string;
  match: number;
  stage: Stage;
  due: string;
  urgent: boolean;
  estValue: string;
  contractType: string;
  setAside: string;
};

const stageBadgeClass: Record<Stage, string> = {
  Identified: "bg-stage-identified",
  Qualified: "bg-stage-qualified",
  Pursuing: "bg-stage-pursuing",
  Submitted: "bg-stage-submitted",
};

const demoById: Record<string, OpportunityDetailData> = {
  "cloud-infra-modernization": {
    title: "Cloud Infrastructure Modernization",
    agency: "DOE",
    match: 78,
    stage: "Qualified",
    due: "Feb 15, 2026",
    urgent: true,
    estValue: "$4.2M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
  "zero-trust-network-upgrade": {
    title: "Zero Trust Network Upgrade",
    agency: "DHS",
    match: 71,
    stage: "Pursuing",
    due: "Feb 19, 2026",
    urgent: true,
    estValue: "$3.8M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
  "data-platform-consolidation": {
    title: "Data Platform Consolidation",
    agency: "GSA",
    match: 65,
    stage: "Identified",
    due: "Mar 02, 2026",
    urgent: false,
    estValue: "$2.1M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
  "cybersecurity-monitoring": {
    title: "Cybersecurity Monitoring",
    agency: "DoD",
    match: 92,
    stage: "Pursuing",
    due: "Feb 10, 2026",
    urgent: true,
    estValue: "$5.5M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
  "application-modernization": {
    title: "Application Modernization",
    agency: "VA",
    match: 54,
    stage: "Identified",
    due: "Mar 20, 2026",
    urgent: false,
    estValue: "$3.2M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
};

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Requirements" | "Gaps & Risks" | "Teaming Partners" | "Compliance Matrix" | "AI Recommendations"
  >("Overview");

  const data = useMemo<OpportunityDetailData>(() => {
    if (id && demoById[id]) return demoById[id];

    const title = !id
      ? "Opportunity"
      : id
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

    return {
      title,
      agency: "DOE",
      match: 78,
      stage: "Qualified",
      due: "Feb 15, 2026",
      urgent: true,
      estValue: "$4.2M",
      contractType: "IDIQ",
      setAside: "8(a)",
    };
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />

      <main className="mx-auto w-full max-w-[1600px] px-8 py-6">
        {/* Back link */}
        <div className="mb-4">
          <Link
            to="/opportunities"
            className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/90"
          >
            {"\u2190"} Back to Opportunities
          </Link>
        </div>

        {/* Header */}
        <section className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-foreground">{data.title}</h1>
            <p className="mt-1 text-[16px] text-muted-foreground">{data.agency}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:pt-1">
            <span className="inline-flex items-center rounded-lg bg-success px-3 py-2 text-sm font-bold text-success-foreground shadow-card">
              {data.match}% Match
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-2 text-xs font-bold text-primary-foreground shadow-card ${stageBadgeClass[data.stage]}`}
              aria-label={`Stage: ${data.stage}`}
            >
              {data.stage}
            </span>
          </div>
        </section>

        {/* Meta row */}
        <section className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold">Due Date:</span>{" "}
            <span className={data.urgent ? "text-urgent" : "text-muted-foreground"}>{data.due}</span>
          </div>
          <div>
            <span className="font-semibold">Est. Value:</span> <span>{data.estValue}</span>
          </div>
          <div>
            <span className="font-semibold">Contract Type:</span> <span>{data.contractType}</span>
          </div>
          <div>
            <span className="font-semibold">Set-Aside:</span> <span>{data.setAside}</span>
          </div>
        </section>

        {/* Tabs + content + AI panel */}
        <section className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Main content */}
            <div className="md:col-span-8">
              <div className="rounded-t-2xl bg-nav shadow-card">
                <div className="flex items-center gap-1 overflow-x-auto px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {(
                    [
                      "Overview",
                      "Requirements",
                      "Gaps & Risks",
                      "Teaming Partners",
                      "Compliance Matrix",
                      "AI Recommendations",
                    ] as const
                  ).map((label) => {
                    const active = label === activeTab;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveTab(label)}
                        className={`shrink-0 rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          active ? "bg-background/10 text-foreground" : "text-muted-foreground"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className={active ? "border-b-2 border-primary pb-1" : "pb-1"}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-b-2xl bg-nav p-6 shadow-card">
                {activeTab === "Overview" ? (
                  <OpportunityOverviewTab data={data} />
                ) : activeTab === "Requirements" ? (
                  <OpportunityRequirementsTab />
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Tab content placeholder</p>
                    <p className="text-sm text-muted-foreground">Content for “{activeTab}” coming soon.</p>
                  </div>
                )}
              </div>

              {/* Mobile: AI panel below content */}
              <div className="mt-6">
                <div className="md:hidden">
                  <OpportunityAiPanel variant="mobile" />
                </div>
              </div>
            </div>

            {/* Desktop: right rail AI panel */}
            <div className="md:col-span-4">
              <div className="hidden md:block">
                <OpportunityAiPanel variant="desktop" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
