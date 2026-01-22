import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCompany } from "@/contexts/CompanyContext";
import { Link } from "react-router-dom";

export function CompanySnapshot() {
  const { company, maskedUei } = useCompany();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          Company Snapshot
        </h2>
        <Link 
          to="/company" 
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Edit
        </Link>
      </div>

      <div className="space-y-2.5">
        <div>
          <p className="text-sm font-semibold text-foreground">{company.legalBusinessName}</p>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">UEI: </span>
            <span className="font-mono text-foreground">{maskedUei}</span>
          </div>
          <div>
            <span className="text-muted-foreground">NAICS: </span>
            <span className="font-mono text-foreground">{company.primaryNaics}</span>
          </div>
        </div>

        {company.socioEconomicStatuses.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {company.socioEconomicStatuses.map((status) => (
              <Badge 
                key={status}
                className="bg-primary/15 text-primary border-primary/30 text-xs py-0.5"
              >
                {status}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
