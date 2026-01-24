import { Card, CardContent } from "@/components/ui/card";
import { FileText, Award, Briefcase, Clock } from "lucide-react";
import type { PastPerformance } from "@/hooks/useCompanyProfile";

type Props = {
  pastPerformance: PastPerformance[];
};

export function PastPerformanceStats({ pastPerformance }: Props) {
  const totalContracts = pastPerformance.length;
  const primeContracts = pastPerformance.filter((p) => p.role === "Prime").length;
  const highCpars = pastPerformance.filter(
    (p) => p.cpars_rating === "Exceptional" || p.cpars_rating === "Very Good"
  ).length;
  const activeContracts = pastPerformance.filter((p) => p.status === "Active").length;

  const stats = [
    { label: "Total Contracts", value: totalContracts, icon: FileText, color: "text-primary" },
    { label: "As Prime", value: primeContracts, icon: Briefcase, color: "text-emerald-400" },
    { label: "High CPARS", value: highCpars, icon: Award, color: "text-amber-400" },
    { label: "Active", value: activeContracts, icon: Clock, color: "text-blue-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card/50 border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
