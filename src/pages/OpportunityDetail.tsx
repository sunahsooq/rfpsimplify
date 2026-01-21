import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { OpportunityOverviewTab } from "@/components/opportunity/OpportunityOverviewTab";
import { OpportunityRequirementsTab } from "@/components/opportunity/OpportunityRequirementsTab";
import { OpportunityAiPanel } from "@/components/opportunity/OpportunityAiPanel";
import { OpportunityGapsRisksTab } from "@/components/opportunity/OpportunityGapsRisksTab";

const tabs = [
  { label: "Overview", key: "overview" },
  { label: "Requirements", key: "requirements" },
  { label: "Gaps & Risks", key: "gaps-risks" },
  { label: "Teaming Partners", key: "teaming-partners" },
  { label: "Compliance Matrix", key: "compliance-matrix" },
  { label: "AI Recommendations", key: "ai-recommendations" },
] as const;

type TabKey = (typeof tabs)[number]["key"];
type TabLabel = (typeof tabs)[number]["label"];

const isValidTabKey = (value: string): value is TabKey => {
  return tabs.some((tab) => tab.key === value);
};

const getTabLabel = (key: TabKey): TabLabel => {
  return tabs.find((tab) => tab.key === key)?.label ?? "Overview";
};

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

const agencyFullNames: Record<string, string> = {
  DOE: "Department of Energy (DOE)",
  DHS: "Department of Homeland Security (DHS)",
  GSA: "General Services Administration (GSA)",
  DoD: "Department of Defense (DoD)",
  VA: "Department of Veterans Affairs (VA)",
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
    title: "Cybersecurity Monitoring Services",
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
  "identity-management-platform": {
    title: "Identity Management Platform",
    agency: "Treasury",
    match: 83,
    stage: "Qualified",
    due: "Apr 05, 2026",
    urgent: false,
    estValue: "$2.8M",
    contractType: "IDIQ",
    setAside: "8(a)",
  },
};

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL, default to "overview"
  const getInitialTab = (): TabKey => {
    const param = searchParams.get("tab") || "overview";
    return isValidTabKey(param) ? param : "overview";
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab);

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    const param = searchParams.get("tab") || "overview";
    const validTab = isValidTabKey(param) ? param : "overview";
    if (validTab !== activeTab) {
      setActiveTab(validTab);
    }
  }, [searchParams]);

  // Sync URL when tab changes via click
  const handleTabClick = (key: TabKey) => {
    if (key !== activeTab) {
      setActiveTab(key);
      setSearchParams({ tab: key }, { replace: false });
    }
  };

  const activeTabLabel = getTabLabel(activeTab);

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

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-6 md:px-8">
        {/* Back link */}
        <div className="mb-4">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            ← Back to Opportunities
          </Link>
        </div>

        {/* Header */}
        <section className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-foreground md:text-[28px]">{data.title}</h1>
            <p className="mt-1 text-base text-muted-foreground">
              {agencyFullNames[data.agency] || data.agency}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-bold text-white shadow-card">
              {data.match}% Match
            </span>
            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold text-white shadow-card ${stageBadgeClass[data.stage]}`}
              aria-label={`Stage: ${data.stage}`}
            >
              {data.stage}
            </span>
          </div>
        </section>

        {/* Meta row */}
        <section className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Due Date: </span>
            <span className={data.urgent ? "font-semibold text-[#ef4444]" : "text-foreground"}>{data.due}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Est. Value: </span>
            <span className="text-foreground">{data.estValue}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Contract Type: </span>
            <span className="text-foreground">{data.contractType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Set-Aside: </span>
            <span className="text-foreground">{data.setAside}</span>
          </div>
        </section>

        {/* Tabs + content + AI panel */}
        <section className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Main content */}
            <div className="md:col-span-8">
              {/* Tabs bar */}
              <div className="rounded-t-xl bg-[#1a2540] shadow-card">
                <div className="flex flex-wrap items-center gap-1 overflow-x-auto px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {tabs.map((tab) => {
                    const active = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => handleTabClick(tab.key)}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                          ${active ? "bg-background/10 text-foreground" : "text-muted-foreground"}`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className={active ? "border-b-2 border-primary pb-1" : "pb-1"}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab content */}
              <div className="rounded-b-xl bg-[#1a2540] p-6 shadow-card">
                {activeTabLabel === "Overview" ? (
                  <OpportunityOverviewTab data={data} />
                ) : activeTabLabel === "Requirements" ? (
                  <OpportunityRequirementsTab />
                ) : activeTabLabel === "Gaps & Risks" ? (
                  <OpportunityGapsRisksTab />
                ) : (
                  <div className="rounded-lg border border-[#334155] bg-background/5 p-6">
                    <p className="text-base font-semibold text-foreground">{activeTabLabel}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Content for this tab is coming soon. This section will include detailed information
                      relevant to {activeTabLabel.toLowerCase()} for this opportunity.
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile: AI panel below content */}
              <div className="mt-6 md:hidden">
                <OpportunityAiPanel variant="mobile" />
              </div>
            </div>

            {/* Desktop: right rail AI panel */}
            <div className="hidden md:col-span-4 md:block">
              <OpportunityAiPanel variant="desktop" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
