import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";

type Props = {
  opportunityNaics?: string;
  opportunitySetAside?: string;
};

export function OpportunityCompanyMatch({ opportunityNaics = "541512", opportunitySetAside = "8(a)" }: Props) {
  const { company } = useCompany();

  // Check NAICS match
  const naicsMatches = company.primaryNaics === opportunityNaics || 
    company.primaryNaics.startsWith(opportunityNaics.slice(0, 4));

  // Check set-aside eligibility
  const setAsideMatches = company.socioEconomicStatuses.some(
    (status) => status === opportunitySetAside || 
      (opportunitySetAside === "Small Business" && company.socioEconomicStatuses.includes("Small Business"))
  );

  // Check for gaps
  const hasGaps = !naicsMatches || !setAsideMatches;

  return (
    <div className="rounded-lg border border-border bg-background/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Company Fit Analysis</span>
      </div>

      <div className="space-y-2">
        {/* NAICS Match */}
        <div className="flex items-start gap-2">
          {naicsMatches ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
          )}
          <p className="text-sm text-muted-foreground">
            {naicsMatches ? (
              <>
                Your primary NAICS (<span className="font-mono text-foreground">{company.primaryNaics}</span>) matches this solicitation.
              </>
            ) : (
              <>
                Your primary NAICS (<span className="font-mono text-foreground">{company.primaryNaics}</span>) does not match the required NAICS (<span className="font-mono text-foreground">{opportunityNaics}</span>).
              </>
            )}
          </p>
        </div>

        {/* Set-Aside Match */}
        <div className="flex items-start gap-2">
          {setAsideMatches ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
          )}
          <p className="text-sm text-muted-foreground">
            {setAsideMatches ? (
              <>
                You qualify for this set-aside based on your <span className="font-semibold text-foreground">{company.socioEconomicStatuses.find(s => s === opportunitySetAside) || company.socioEconomicStatuses[0]}</span> certification.
              </>
            ) : (
              <>
                You may not qualify for the <span className="font-semibold text-foreground">{opportunitySetAside}</span> set-aside. Review your certifications.
              </>
            )}
          </p>
        </div>

        {/* Summary */}
        {!hasGaps && (
          <div className="flex items-start gap-2 pt-1">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
            <p className="text-sm font-medium text-success">
              No gaps detected for required socio-economic status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
