import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Target, 
  Users, 
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Trophy,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { CompanySnapshot } from "@/components/dashboard/CompanySnapshot";
import { supabase } from "@/integrations/supabase/client";

type Stat = {
  label: string;
  value: string;
  subtext?: string;
  icon: ComponentType<{ className?: string }>;
  accentClassName: string;
  valueClassName?: string;
  highlighted?: boolean;
};

function parseMoneyToNumber(input: string | null | undefined) {
  if (!input) return 0;
  const s = String(input).trim();
  const num = Number(s.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num)) return 0;
  if (/[mM]\b/.test(s)) return num * 1_000_000;
  if (/[kK]\b/.test(s)) return num * 1_000;
  return num;
}

type RecentOpp = { id: string; title: string; org: string; due: string; match: number | null };

const recentOpportunitiesFallback: RecentOpp[] = [
  { id: "cloud-infra-modernization", title: "Cloud Infrastructure Modernization", org: "DOE", due: "Feb 15, 2026", match: 78 },
  { id: "zero-trust-network-upgrade", title: "Zero Trust Network Upgrade", org: "DHS", due: "Feb 19, 2026", match: 71 },
  { id: "data-platform-consolidation", title: "Data Platform Consolidation", org: "GSA", due: "Mar 02, 2026", match: 65 },
];

const agencyData = [
  { name: "DoD", value: 2.8, color: "bg-primary" },
  { name: "VA", value: 2.1, color: "bg-blue-400" },
  { name: "DHS", value: 1.8, color: "bg-blue-500" },
  { name: "HHS", value: 1.5, color: "bg-blue-600" },
  { name: "DOE", value: 1.2, color: "bg-primary" },
  { name: "DOJ", value: 0.9, color: "bg-blue-400" },
  { name: "State", value: 0.6, color: "bg-blue-500" },
  { name: "EPA", value: 0.4, color: "bg-blue-600" },
];

const recentOutcomes = [
  { title: "VA IT Support Services", value: "$2.8M", date: "Jan 15", outcome: "Won" as const },
  { title: "DHS Cybersecurity Assessment", value: "$3.2M", date: "Jan 10", outcome: "Lost" as const },
  { title: "DOE Legacy Modernization", value: "$1.5M", date: "Jan 5", outcome: "No-Bid" as const },
];

const recompeteAlerts = [
  { contract: "DOE Cloud Infrastructure", countdown: "45 days", incumbent: "Incumbent", fit: 72 },
  { contract: "VA Enterprise IT", countdown: "90 days", incumbent: "Current", fit: 85 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [dbRecent, setDbRecent] = useState<RecentOpp[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [showRiskAlert, setShowRiskAlert] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, count } = await supabase
        .from("opportunities")
        .select("id,title,agency,due_date,estimated_value,scores,source,status,created_at", { count: "exact" })
        .in("source", ["sam_gov", "manual_upload"])
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(200);

      if (cancelled) return;

      const mapped: RecentOpp[] = (data as any[] | null)?.map((r) => {
        const score = typeof r?.scores?.overall_match_score === "number" ? r.scores.overall_match_score : null;
        return {
          id: r.id,
          title: r.title ?? "Untitled Opportunity (Manual RFP Upload)",
          org: r.agency ?? "Unknown",
          due: r.due_date ?? "—",
          match: typeof score === "number" ? Math.max(0, Math.min(100, Math.round(score))) : null,
        };
      }) ?? [];

      setDbRecent(mapped.slice(0, 6));

      const rows = (data as any[] | null) ?? [];
      const now = Date.now();
      const weekMs = 7 * 24 * 60 * 60 * 1000;
      const dueThisWeek = rows.filter((r) => {
        const t = Date.parse(String(r?.due_date ?? ""));
        return Number.isFinite(t) && t >= now && t <= now + weekMs;
      }).length;
      const scoreNums = rows
        .map((r) => (typeof r?.scores?.overall_match_score === "number" ? r.scores.overall_match_score : null))
        .filter((n): n is number => typeof n === "number");
      const avgMatch = scoreNums.length ? Math.round(scoreNums.reduce((a, b) => a + b, 0) / scoreNums.length) : null;
      const pipelineValue = rows.reduce((sum, r) => sum + parseMoneyToNumber(r?.estimated_value), 0);
      const pipelineValueM = pipelineValue ? `$${(pipelineValue / 1_000_000).toFixed(1)}M` : "$18.7M";

      setStats([
        {
          label: "Weighted Pipeline",
          value: pipelineValueM,
          subtext: "Pwin-adjusted",
          icon: DollarSign,
          accentClassName: "border-primary",
          valueClassName: "text-primary",
          highlighted: true,
        },
        {
          label: "Active Opportunities",
          value: String((count ?? rows.length) || 47),
          icon: Briefcase,
          accentClassName: "border-border",
        },
        {
          label: "Upcoming Recompetes",
          value: "8",
          icon: RefreshCw,
          accentClassName: "border-warning",
          valueClassName: "text-warning",
        },
        {
          label: "Pre-RFP Signals",
          value: "15",
          icon: TrendingUp,
          accentClassName: "border-primary",
        },
        {
          label: "Staffing Strength",
          value: "32 FTEs",
          subtext: "85% coverage",
          icon: Users,
          accentClassName: "border-success",
          valueClassName: "text-success",
        },
      ]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const recentOpportunities = useMemo(
    () => (dbRecent.length ? dbRecent : recentOpportunitiesFallback),
    [dbRecent],
  );

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />

      <main className="mx-auto w-full max-w-[1600px] px-8 pb-10 pt-6">
        {/* Page header */}
        <section className="mb-6">
          <h1 className="text-[32px] font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-[16px] text-muted-foreground">Your federal pipeline at a glance</p>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className={`border-border bg-card shadow-card transition-all hover:scale-[1.02] hover:shadow-glow border-l-4 ${stat.accentClassName} ${
                  stat.highlighted ? 'bg-gradient-to-br from-primary/10 to-primary/5' : ''
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${stat.valueClassName ?? "text-foreground"}`}>
                        {stat.value}
                      </p>
                      {stat.subtext && (
                        <p className="text-xs text-muted-foreground mt-0.5">{stat.subtext}</p>
                      )}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/40">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Risk Alert Banner */}
        {showRiskAlert && (
          <section className="mb-6">
            <div className="relative rounded-xl bg-gradient-to-r from-warning/20 to-warning/10 border border-warning/30 p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Pipeline Concentration Risk</p>
                <p className="text-sm text-muted-foreground">
                  62% of weighted pipeline depends on recompete wins. Consider diversifying with new opportunities.
                </p>
              </div>
              <button 
                onClick={() => setShowRiskAlert(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {/* Agency Spending Trends */}
        <section className="mb-6">
          <Card className="bg-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">📊 Agency Spending Trends (541512)</h2>
                    <Badge className="bg-primary/20 text-primary">NEW</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">FY2024 IT Services Spending • Source: USAspending.gov</p>
                </div>
                <Button variant="outline" onClick={() => navigate("/opportunities")}>
                  View All Agencies
                </Button>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-32 mb-4">
                {agencyData.map((agency) => (
                  <div key={agency.name} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full ${agency.color} rounded-t-lg transition-all hover:opacity-80`}
                      style={{ height: `${(agency.value / 2.8) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">{agency.name}</span>
                    <span className="text-xs font-medium text-foreground">${agency.value}B</span>
                  </div>
                ))}
              </div>

              {/* Insight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-sm font-medium text-success">Your Top Agency: DOE</p>
                  <p className="text-xs text-muted-foreground">3 wins, $8.2M</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm font-medium text-primary">Fastest Growing: VA</p>
                  <p className="text-xs text-muted-foreground">+32% YoY</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                  <p className="text-sm font-medium text-warning">Opportunity Alert: DHS</p>
                  <p className="text-xs text-muted-foreground">12 new RFPs this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Two-Column Layout */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Left Column - Matched Opportunities */}
          <div className="md:col-span-3">
            <Card className="bg-card border-border shadow-card h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">🎯 Matched Opportunities</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate("/opportunities")}>
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {recentOpportunities.map((row) => (
                    <div
                      key={row.id}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 bg-muted/20 border border-border transition-colors hover:bg-muted/40"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/opportunity/${row.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") navigate(`/opportunity/${row.id}`);
                      }}
                    >
                      <div>
                        <div className="font-semibold text-foreground">{row.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{row.org}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Due: {row.due}</div>
                        <div className="mt-1 inline-flex items-center rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                          {typeof row.match === "number" ? `${row.match}% Match` : "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Weighted Revenue Forecast */}
            <Card className="bg-card border-border shadow-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">📈 Weighted Revenue Forecast</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <p className="text-xl font-bold text-primary">$2.4M</p>
                    <p className="text-xs text-muted-foreground">Q1 2025</p>
                    <p className="text-xs text-muted-foreground mt-1">Raw: $4.8M</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <p className="text-xl font-bold text-primary">$5.1M</p>
                    <p className="text-xs text-muted-foreground">Q2 2025</p>
                    <p className="text-xs text-muted-foreground mt-1">Raw: $9.2M</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate("/pipeline")}>
                  View Full Forecast →
                </Button>
              </CardContent>
            </Card>

            {/* Recent Outcomes */}
            <Card className="bg-card border-border shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-bold text-foreground">🏆 Recent Outcomes</h2>
                  <Badge className="bg-primary/20 text-primary text-xs">NEW</Badge>
                </div>
                <div className="space-y-3">
                  {recentOutcomes.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.value} • {item.date}</p>
                      </div>
                      <Badge className={
                        item.outcome === 'Won' ? 'bg-success/20 text-success' :
                        item.outcome === 'Lost' ? 'bg-destructive/20 text-destructive' :
                        'bg-muted text-muted-foreground'
                      }>
                        {item.outcome}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  YTD Stats: 12 Won, 6 Lost, 4 No-Bid
                </p>
              </CardContent>
            </Card>

            {/* Recompete Alerts */}
            <Card className="bg-card border-border shadow-card border-l-4 border-l-warning">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">🔄 Recompete Alerts</h2>
                <div className="space-y-3">
                  {recompeteAlerts.map((item, idx) => (
                    <div key={idx} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">{item.contract}</p>
                        <Badge className="bg-destructive/20 text-destructive text-xs">
                          {item.countdown}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.incumbent}</span>
                        <span>Fit: {item.fit}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-warning text-warning hover:bg-warning/10"
                  onClick={() => navigate("/recompetes")}
                >
                  View All Recompetes
                </Button>
              </CardContent>
            </Card>

            {/* Company Snapshot */}
            <CompanySnapshot />
          </div>
        </section>
      </main>
    </div>
  );
}
