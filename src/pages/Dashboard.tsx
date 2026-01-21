import type { ComponentType } from "react";
import { Bell, Briefcase, Clock, DollarSign, Search, Target, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

const recentOpportunities = [
  { title: "Cloud Infrastructure Modernization", org: "DOE", due: "Feb 15, 2026", match: 78 },
  { title: "Zero Trust Network Upgrade", org: "DHS", due: "Feb 19, 2026", match: 71 },
  { title: "Data Platform Consolidation", org: "GSA", due: "Mar 02, 2026", match: 65 },
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
  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-nav">
        <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center gap-4 px-8">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-logo shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-[24px] font-bold text-foreground">rfpSimplify</span>
          </div>

          {/* Center */}
          <div className="flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-[500px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search opportunities, agencies, partners…"
                className="h-11 rounded-full border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground transition-transform hover:scale-[1.02]"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-destructive-foreground">
                3
              </span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.02]"
                  aria-label="User menu"
                >
                  SW
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 border-border bg-popover text-popover-foreground shadow-card"
              >
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

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
                >
                  <div>
                    <div className="font-semibold text-foreground">{row.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{row.org}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Due: {row.due}</div>
                    <div className="mt-1 inline-flex items-center rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                      Match: {row.match}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 pt-2">
              <Button variant="outline" className="w-full border-primary/40 text-foreground hover:bg-primary/10">
                View All Opportunities
              </Button>
            </div>
          </div>

          {/* AI Insights (40%) */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow md:col-span-2">
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
        </section>
      </main>
    </div>
  );
}
