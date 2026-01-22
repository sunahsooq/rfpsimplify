import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Loader2 } from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePipeline, type PipelineStage } from "@/contexts/PipelineContext";
import { toast } from "sonner";

const stages: PipelineStage[] = ["Identify", "Qualify", "Pursuit", "Bid Submitted", "Won", "Lost"];

const stageStyles: Record<PipelineStage, string> = {
  Identify: "bg-muted/50 text-muted-foreground",
  Qualify: "bg-muted/50 text-muted-foreground",
  Pursuit: "bg-primary/15 text-primary",
  "Bid Submitted": "bg-primary/15 text-primary",
  Won: "bg-success/15 text-success",
  Lost: "bg-destructive/15 text-destructive",
};

const rowAccentStyles: Record<PipelineStage, string> = {
  Identify: "",
  Qualify: "",
  Pursuit: "bg-primary/5",
  "Bid Submitted": "bg-primary/5",
  Won: "bg-success/5",
  Lost: "bg-destructive/5",
};

export default function Pipeline() {
  const navigate = useNavigate();
  const { items, updateStage, updatePWin } = usePipeline();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const simulateLoading = async (id: string, callback: () => void) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    callback();
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleStageChange = (id: string, stage: PipelineStage) => {
    simulateLoading(id, () => {
      updateStage(id, stage);
      toast.success(`Stage updated to ${stage}`);
    });
  };

  const handlePWinChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      simulateLoading(`pwin-${id}`, () => {
        updatePWin(id, numValue);
        toast.success("P(Win) updated");
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-6 md:px-8">
        {/* Page Header */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-[32px]">Pipeline</h1>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Track and manage your active pursuits
              </p>
            </div>

            <Button
              onClick={() => navigate("/opportunities")}
              className="h-11 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-card transition-all hover:scale-[1.02] hover:shadow-glow sm:w-auto"
            >
              <FolderKanban className="mr-2 h-4 w-4" />
              Browse Opportunities
            </Button>
          </div>
        </section>

        {/* Pipeline Table or Empty State */}
        {items.length === 0 ? (
          <section className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              No opportunities in your pipeline yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Add an opportunity to start tracking your pursuits
            </p>
            <Button
              onClick={() => navigate("/opportunities")}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
            >
              Browse Opportunities
            </Button>
          </section>
        ) : (
          <section className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold">
                      Opportunity Name
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Agency</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Est. Value</TableHead>
                    <TableHead className="text-muted-foreground font-semibold w-28">P(Win) %</TableHead>
                    <TableHead className="text-muted-foreground font-semibold w-40">Stage</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      className={`border-border transition-colors ${rowAccentStyles[item.stage]}`}
                    >
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => navigate(`/opportunity/${item.id}`)}
                          className="text-foreground font-medium hover:text-primary hover:underline text-left"
                        >
                          {item.opportunityName}
                        </button>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.agency}</TableCell>
                      <TableCell className="text-success font-medium">{item.estimatedValue}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={item.pWin}
                            onChange={(e) => handlePWinChange(item.id, e.target.value)}
                            className="w-20 h-8 bg-secondary border-border text-foreground text-center font-mono text-sm"
                          />
                          {loadingStates[`pwin-${item.id}`] && (
                            <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Select
                            value={item.stage}
                            onValueChange={(value) => handleStageChange(item.id, value as PipelineStage)}
                          >
                            <SelectTrigger
                              className={`w-36 h-8 border-border text-sm font-medium ${stageStyles[item.stage]}`}
                            >
                              <SelectValue />
                              {loadingStates[item.id] && (
                                <Loader2 className="ml-1 h-3 w-3 animate-spin" />
                              )}
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                              {stages.map((stage) => (
                                <SelectItem
                                  key={stage}
                                  value={stage}
                                  className="text-sm"
                                >
                                  {stage}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        )}

        {/* Footer Note */}
        {items.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            {items.length} {items.length === 1 ? "opportunity" : "opportunities"} in pipeline
          </p>
        )}
      </main>
    </div>
  );
}
