import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText } from "lucide-react";
import type { PastPerformance } from "@/hooks/useCompanyProfile";
import { PastPerformanceStats } from "./PastPerformanceStats";
import { PastPerformanceForm } from "./PastPerformanceForm";
import { PastPerformanceCard } from "./PastPerformanceCard";

type Props = {
  profileId: string | undefined;
  pastPerformance: PastPerformance[];
  onSave: (values: Partial<PastPerformance>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function PastPerformanceTab({ profileId, pastPerformance, onSave, onDelete }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Past Performance Records
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {pastPerformance.length} contracts • Showcase your federal experience
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      {pastPerformance.length > 0 && <PastPerformanceStats pastPerformance={pastPerformance} />}

      {/* Add Form */}
      <PastPerformanceForm profileId={profileId} onSave={onSave} />

      {/* Past Performance Cards */}
      {pastPerformance.length > 0 && (
        <div className="space-y-4">
          {pastPerformance.map((pp) => (
            <PastPerformanceCard key={pp.id} performance={pp} onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {pastPerformance.length === 0 && (
        <Card className="bg-card/50 border-dashed border-border">
          <CardContent className="py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Past Performance Records</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Add your federal contract history to improve opportunity matching and build credibility with potential partners.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
