import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  Search,
  Plus,
  Download,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { usePipeline, type PipelineStage } from "@/contexts/PipelineContext";

type Stage = "Identify" | "Qualify" | "Pursuit" | "Bid Submitted" | "Won" | "Lost";

const stageToDisplayName: Record<Stage, string> = {
  "Identify": "Reviewing",
  "Qualify": "Pursuing",
  "Pursuit": "Preparing",
  "Bid Submitted": "Submitted",
  "Won": "Won",
  "Lost": "Lost",
};

const stageColors: Record<string, string> = {
  Reviewing: "bg-primary/20 text-primary",
  Pursuing: "bg-warning/20 text-warning",
  Preparing: "bg-[hsl(258_90%_66%)]/20 text-[hsl(258_90%_66%)]",
  Submitted: "bg-[hsl(24_95%_53%)]/20 text-[hsl(24_95%_53%)]",
  Won: "bg-success/20 text-success",
  Lost: "bg-muted text-muted-foreground",
};

const quarterlyForecast = [
  { quarter: "Q1 2026", raw: 18.5, weighted: 8.2 },
  { quarter: "Q2 2026", raw: 24.3, weighted: 12.1 },
  { quarter: "Q3 2026", raw: 31.2, weighted: 15.8 },
  { quarter: "Q4 2026", raw: 28.7, weighted: 14.2 },
];

const stages: string[] = ["All", "Reviewing", "Pursuing", "Preparing", "Submitted", "Won", "Lost"];

function parseMoneyToNumber(input: string | null | undefined) {
  if (!input) return 0;
  const s = String(input).trim();
  const num = Number(s.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num)) return 0;
  if (/[mM]\b/.test(s)) return num * 1_000_000;
  if (/[kK]\b/.test(s)) return num * 1_000;
  return num;
}

export default function PipelineNew() {
  const navigate = useNavigate();
  const { items } = usePipeline();
  const [activeStage, setActiveStage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Map context stage to display stage
  const displayStageMap: Record<PipelineStage, string> = {
    "Identify": "Reviewing",
    "Qualify": "Pursuing",
    "Pursuit": "Preparing",
    "Bid Submitted": "Submitted",
    "Won": "Won",
    "Lost": "Lost",
  };

  // Convert pipeline context items to display format
  const opportunities = useMemo(() => {
    return items.map((item, idx) => ({
      id: idx + 1,
      opportunityId: item.id,
      title: item.opportunityName,
      agency: item.agency,
      stage: displayStageMap[item.stage] || "Reviewing",
      value: item.estimatedValue,
      dueDate: "Mar 15, 2026",
      match: 75 + Math.floor(Math.random() * 20),
      pwin: item.pWin,
      weighted: `$${((parseMoneyToNumber(item.estimatedValue) * item.pWin) / 100 / 1_000_000).toFixed(1)}M`,
      team: ["SC", "MP"],
      type: (item.stage === "Won" || item.stage === "Lost" ? "Completed" : "Active") as "Active" | "Completed",
    }));
  }, [items]);

  // Computed stats from real data
  const stats = useMemo(() => {
    const totalValue = items.reduce((sum, i) => sum + parseMoneyToNumber(i.estimatedValue), 0);
    const activePursuits = items.filter(i => !["Won", "Lost"].includes(i.stage)).length;
    const wonCount = items.filter(i => i.stage === "Won").length;
    const completedCount = items.filter(i => ["Won", "Lost"].includes(i.stage)).length;
    const winRate = completedCount > 0 ? Math.round((wonCount / completedCount) * 100) : 0;

    return [
      { label: "Total Pipeline Value", value: `$${(totalValue / 1_000_000).toFixed(1)}M`, icon: DollarSign, color: "text-primary" },
      { label: "Active Pursuits", value: String(activePursuits), icon: Target, color: "text-success" },
      { label: "Win Rate", value: `${winRate}%`, icon: TrendingUp, color: "text-[hsl(258_90%_66%)]" },
      { label: "In Pipeline", value: String(items.length), icon: Clock, color: "text-warning" },
    ];
  }, [items]);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesStage = activeStage === "All" || opp.stage === activeStage;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.agency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ["Title", "Agency", "Stage", "Value", "P(Win)", "Weighted Value"];
    const rows = filteredOpportunities.map(o => [o.title, o.agency, o.stage, o.value, `${o.pwin}%`, o.weighted]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pipeline-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Pipeline exported to CSV");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Pipeline & Revenue Forecast</h1>
          <Button variant="outline" className="border-border" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4 bg-card border-border rounded-[20px]">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quarterly Forecast Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quarterlyForecast.map((q) => (
            <Card key={q.quarter} className="p-4 bg-card border-border rounded-[20px]">
              <p className="text-sm font-medium text-muted-foreground mb-2">{q.quarter}</p>
              <p className="text-2xl font-bold text-primary">${q.weighted}M</p>
              <p className="text-xs text-muted-foreground">Raw: ${q.raw}M</p>
            </Card>
          ))}
        </div>

        {/* Pipeline Chart */}
        <Card className="p-6 bg-card border-border rounded-[20px] mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Raw vs Weighted Pipeline</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyForecast}>
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }} 
                  formatter={(value: number) => [`$${value}M`]}
                />
                <Legend />
                <Bar dataKey="raw" name="Raw Pipeline" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="weighted" name="Weighted (Pwin)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeStage === stage
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border w-full sm:w-[250px]"
              />
            </div>
            <Button 
              className="gradient-primary text-primary-foreground"
              onClick={() => navigate("/opportunities")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Find Opportunities
            </Button>
          </div>
        </div>

        {/* Pipeline Table */}
        <Card className="bg-card border-border rounded-[20px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Opportunity</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Stage</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Value</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">P(Win)</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Weighted</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOpportunities.map((opp) => (
                  <tr 
                    key={opp.id} 
                    className="hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => navigate(`/opportunity/${opp.opportunityId}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{opp.title}</p>
                        <p className="text-sm text-muted-foreground">{opp.agency}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={stageColors[opp.stage]}>{opp.stage}</Badge>
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium">{opp.value}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${
                        opp.pwin >= 60 ? 'text-success' : 
                        opp.pwin >= 40 ? 'text-warning' : 
                        'text-destructive'
                      }`}>
                        {opp.pwin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-primary font-medium">{opp.weighted}</td>
                    <td className="px-6 py-4 text-muted-foreground">{opp.dueDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        opp.type === "Completed" 
                          ? "border-success text-success" 
                          : "border-primary text-primary"
                      }>
                        {opp.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {opp.team.slice(0, 3).map((initials, idx) => (
                          <Avatar key={idx} className="h-8 w-8 border-2 border-card bg-gradient-to-br from-primary to-blue-400">
                            <AvatarFallback className="text-xs font-medium text-primary-foreground">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {opp.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                            +{opp.team.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
