import { useMemo, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompany } from "@/contexts/CompanyContext";
import { extractRfpTextFromFile } from "@/lib/rfpTextExtract";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { RfpAnalysis } from "@/types/rfpAnalysis";
import { postParseProcessing, type CompanyForScoring, type RfpForScoring } from "@/lib/opportunityScoring";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (id: string) => void;
};

export function ManualRfpIngestDialog({ open, onOpenChange, onCreated }: Props) {
  const { company } = useCompany();
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze = useMemo(() => {
    return Boolean(file) || pastedText.trim().length > 0;
  }, [file, pastedText]);

  const reset = () => {
    setFile(null);
    setPastedText("");
    setIsRunning(false);
    setError(null);
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) reset();
  };

  const handleAnalyze = async () => {
    if (!canAnalyze || isRunning) return;
    setIsRunning(true);
    setError(null);

    try {
      const rfpText = file ? await extractRfpTextFromFile(file) : pastedText;
      if (!rfpText || rfpText.trim().length < 50) {
        throw new Error("RFP text looks too short. Paste more text or upload the full document.");
      }

      const companyProfile = {
        company_name: company.legalBusinessName ?? null,
        primary_naics: company.primaryNaics ?? null,
        secondary_naics: Array.isArray((company as any).secondaryNaics)
          ? (company as any).secondaryNaics
          : (company as any).secondaryNaics
            ? [(company as any).secondaryNaics]
            : [],
        certifications: (company as any).certifications ?? [],
        capabilities: (company as any).coreCapabilities ?? [],
        past_performance_tags: (company as any).pastPerformanceTags ?? [],
        location: (company as any).location ?? null,
      };

      const { data, error: fnError } = await supabase.functions.invoke("analyze-rfp", {
        body: {
          rfp_text: rfpText,
          company_profile: companyProfile,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || "Analyze failed");
      }

      const payload = data as { id: string; analysis: RfpAnalysis };
      if (!payload?.id) throw new Error("No opportunity id returned");

      // Deterministic, company-aware scoring (platform-owned)
      const rfpForScoring: RfpForScoring = {
        naics_codes: payload.analysis?.opportunity?.naics_codes ?? [],
        required_certifications: payload.analysis?.requirements?.certifications_required ?? [],
        technical_requirements: payload.analysis?.requirements?.technical ?? [],
        experience_requirements: payload.analysis?.requirements?.experience_required ?? [],
        compliance_requirements: payload.analysis?.requirements?.compliance_requirements ?? [],
        place_of_performance: payload.analysis?.opportunity?.place_of_performance ?? null,
      };

      const companyForScoring: CompanyForScoring = {
        primary_naics: company.primaryNaics,
        secondary_naics: Array.isArray((company as any).secondaryNaics)
          ? ((company as any).secondaryNaics as string[])
          : (company as any).secondaryNaics
            ? [String((company as any).secondaryNaics)]
            : [],
        certifications: ((company as any).certifications as string[] | null) ??
          ((company as any).certificationsSetAsides as string[] | null) ??
          (company.socioEconomicStatuses as unknown as string[]),
        capabilities: ((company as any).coreCapabilities as string[] | null) ?? [],
        past_performance_tags: ((company as any).pastPerformanceTags as string[] | null) ?? [],
        location: ((company as any).location as string | null) ?? null,
      };

      const computed = postParseProcessing(companyForScoring, rfpForScoring);
      const nextBidBrief = {
        ...(payload.analysis?.bid_brief ?? {}),
        scorecard: {
          overall_match_score: computed.overall_match_score,
          readiness_level: computed.readiness_level,
        },
      };

      await supabase
        .from("opportunities")
        .update({ scores: computed, bid_brief: nextBidBrief })
        .eq("id", payload.id);

      toast.success("RFP analyzed and opportunity created");
      handleClose(false);
      onCreated(payload.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Analyze failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Opportunity from RFP (Manual)</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Option A: Upload file (PDF, DOCX, TXT)</p>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-card hover:bg-accent">
                <Upload className="h-4 w-4" />
                <span>{file ? file.name : "Choose file"}</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setFile(f);
                    if (f) setPastedText("");
                  }}
                />
              </label>
              {file && (
                <Button
                  type="button"
                  variant="outline"
                  className="border-border"
                  onClick={() => setFile(null)}
                  disabled={isRunning}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Option B: Paste RFP text</p>
            <Textarea
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                if (e.target.value.trim().length > 0) setFile(null);
              }}
              placeholder="Paste full RFP text or excerpts here…"
              className="min-h-[220px]"
              disabled={isRunning}
            />
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isRunning}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAnalyze} disabled={!canAnalyze || isRunning}>
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing RFP…
              </>
            ) : (
              "Analyze RFP"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
