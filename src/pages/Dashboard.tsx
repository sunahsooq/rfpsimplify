import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, Clock, DollarSign, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { CompanySnapshot } from "@/components/dashboard/CompanySnapshot";
import { supabase } from "@/integrations/supabase/client";

type Stat = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  accentClassName: string;
  valueClassName?: string;
};

const stats: Stat[] = [
  {
    label: "Active Opportunities",
    value: "12",
    icon: Briefcase,
    accentClassName: "border-primary",
  },
  {
    label: "Due This Week",
    value: "3",
    icon: Clock,
    accentClassName: "border-warning",
    valueClassName: "text-warning",
  },
  {
    label: "Avg Win Probability",
    value: "42%",
    icon: Target,
    accentClassName: "border-success",
    valueClassName: "text-success",
  },
  {
    label: "Pipeline Value",
    value: "$18.4M",
    icon: DollarSign,
    accentClassName: "border-primary",
    valueClassName: "text-primary",
  },
];

type RecentOpp = { id: string; title: string; org: string; due: string; match: number | null };

const recentOpportunitiesFallback: RecentOpp[] = [
  { id: "cloud-infra-modernization", title: "Cloud Infrastructure Modernization", org: "DOE", due: "Feb 15, 2026", match: 78 },
  { id: "zero-trust-network-upgrade", title: "Zero Trust Network Upgrade", org: "DHS", due: "Feb 19, 2026", match: 71 },
  { id: "data-platform-consolidation", title: "Data Platform Consolidation", org: "GSA", due: "Mar 02, 2026", match: 65 },
];

const insights = [
  {
    tone: "warning" as const,
    prefix: "⚠️",
    text: "2 opportunities due in the next 5 days",
  },
  {
    tone: "success" as const,
    prefix: "✅",
    text: "One high-fit partner available for DHS IT Services RFP",
  },
  {
    tone: "destructive" as const,
    prefix: "⚠️",
    text: "You may want to reconsider bidding on VA Cloud Migration",
  },
];

const insightToneClass: Record<"warning" | "success" | "destructive", string> = {
  warning: "bg-warning/20 text-warning",
  success: "bg-success/20 text-success",
  destructive: "bg-destructive/20 text-destructive",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [dbRecent, setDbRecent] = useState<RecentOpp[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("opportunities")
        .select("id,title,agency,due_date,scores,source,status,created_at")
        .in("source", ["sam_gov", "manual_upload"])
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(6);

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

      setDbRecent(mapped);
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

        {/* Stats */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:scale-[1.02] hover:shadow-glow border-l-4 ${stat.accentClassName}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`mt-2 text-3xl font-bold ${stat.valueClassName ?? "text-foreground"}`}> {stat.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/40">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Second row */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Recent Opportunities (60%) */}
          <div className="rounded-xl border border-border bg-card shadow-card transition-all hover:scale-[1.01] hover:shadow-glow md:col-span-3">
            <div className="p-6">
              <h2 className="text-[20px] font-bold text-foreground">Recent Opportunities</h2>
            </div>

            <div className="px-2 pb-2">
              {recentOpportunities.map((row) => (
                <div
                  key={row.title}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-muted/30"
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
                      Match: {typeof row.match === "number" ? `${row.match}%` : "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 pt-2">
              <Button
                variant="outline"
                className="w-full border-primary/40 text-foreground hover:bg-primary/10"
                onClick={() => navigate("/opportunities")}
              >
                View All Opportunities
              </Button>
            </div>
          </div>

          {/* Right column: Company Snapshot + AI Insights */}
          <div className="md:col-span-2 space-y-6">
            {/* Company Snapshot */}
            <CompanySnapshot />

            {/* AI Insights */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow">
              <h2 className="text-[20px] font-bold text-foreground">AI Insights</h2>

              <div className="mt-4 space-y-3">
                {insights.map((i) => (
                  <div
                    key={i.text}
                    className={`flex items-start gap-3 rounded-xl p-4 ${insightToneClass[i.tone]}`}
                  >
                    <span className="mt-0.5">{i.prefix}</span>
                    <p className="text-sm font-medium">{i.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
