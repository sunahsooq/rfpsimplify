import { Link } from "react-router-dom";
import { Mail, Users, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePartners, type Certification } from "@/contexts/PartnerContext";
import { useCompany } from "@/contexts/CompanyContext";
import { toast } from "sonner";

type Props = {
  opportunityAgency?: string;
  requiredCerts?: Certification[];
  companyGaps?: Certification[];
  setAsideType?: string;
};

export function OpportunityRecommendedPartners({
  opportunityAgency = "DOE",
  requiredCerts = ["FedRAMP", "CMMC"],
  companyGaps = ["FedRAMP", "GSA Schedule"],
}: Props) {
  const { partners } = usePartners();
  const { company } = useCompany();

  // Generate intelligent recommendations with clear gap-filling reasons
  const getEnhancedRecommendations = () => {
    const recommendations: Array<{
      partner: typeof partners[0];
      reasons: string[];
      fitLevel: "high" | "medium" | "low";
    }> = [];

    partners.forEach((partner) => {
      const reasons: string[] = [];
      let score = 0;

      // Check for socio-economic gaps
      if (partner.socioEconomicStatuses.includes("HUBZone") && !company.socioEconomicStatuses.includes("HUBZone")) {
        reasons.push("Recommended because this partner holds HUBZone certification");
        score += 30;
      }
      
      if (partner.socioEconomicStatuses.includes("SDVOSB") && !company.socioEconomicStatuses.includes("SDVOSB")) {
        reasons.push("Fills SDVOSB set-aside requirement");
        score += 25;
      }

      if (partner.socioEconomicStatuses.includes("8(a)") && !company.socioEconomicStatuses.includes("8(a)")) {
        reasons.push("Brings 8(a) certification for set-aside eligibility");
        score += 25;
      }

      if (partner.socioEconomicStatuses.includes("WOSB") && !company.socioEconomicStatuses.includes("WOSB")) {
        reasons.push("Provides WOSB qualification for this solicitation");
        score += 20;
      }

      // Check agency experience
      if (opportunityAgency && partner.pastPerformanceAgencies.includes(opportunityAgency)) {
        reasons.push(`Recommended due to past ${opportunityAgency} experience`);
        score += 25;
      }

      // Check certification gaps
      companyGaps.forEach((gap) => {
        if (partner.certifications.includes(gap)) {
          reasons.push(`Has ${gap} certification you need`);
          score += 20;
        }
      });

      // Check required certs
      requiredCerts.forEach((cert) => {
        if (partner.certifications.includes(cert) && !reasons.some(r => r.includes(cert))) {
          reasons.push(`Holds required ${cert} authorization`);
          score += 15;
        }
      });

      if (reasons.length > 0) {
        const fitLevel: "high" | "medium" | "low" = 
          score >= 50 ? "high" : score >= 25 ? "medium" : "low";
        recommendations.push({ partner, reasons: reasons.slice(0, 3), fitLevel });
      }
    });

    return recommendations
      .sort((a, b) => {
        const fitOrder = { high: 3, medium: 2, low: 1 };
        return fitOrder[b.fitLevel] - fitOrder[a.fitLevel];
      })
      .slice(0, 3);
  };

  const recommended = getEnhancedRecommendations();

  const fitBadgeClass = {
    high: "bg-success/15 text-success border-success/30",
    medium: "bg-warning/15 text-warning border-warning/30",
    low: "bg-muted/50 text-muted-foreground border-border",
  };

  const fitLabel = {
    high: "High Fit",
    medium: "Medium Fit",
    low: "Potential",
  };

  const handleOutreach = (partnerName: string) => {
    toast.success(`Outreach request sent to ${partnerName}`);
  };

  if (recommended.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-background/5 p-6 text-center">
        <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          No partner recommendations available for this opportunity.
        </p>
        <Link
          to="/partners"
          className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary/80"
        >
          Browse all partners <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Intro */}
      <p className="text-sm text-muted-foreground">
        Partners recommended to fill your capability gaps for this opportunity.
      </p>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {recommended.map(({ partner, reasons, fitLevel }) => (
          <div
            key={partner.id}
            className="rounded-lg border border-border bg-background/5 p-4 transition-all hover:border-primary/30"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="text-sm font-bold text-foreground">{partner.name}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {partner.location}
                </div>
              </div>
              <Badge className={`shrink-0 text-xs ${fitBadgeClass[fitLevel]}`}>
                {fitLabel[fitLevel]}
              </Badge>
            </div>

            {/* Gap-Filling Reasons */}
            <ul className="space-y-1.5 mb-3">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            {/* Set-Aside Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {partner.socioEconomicStatuses.map((status) => (
                <Badge
                  key={status}
                  variant="outline"
                  className="text-[10px] border-border text-muted-foreground py-0"
                >
                  {status}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <Button
              size="sm"
              onClick={() => handleOutreach(partner.name)}
              className="w-full h-8 text-xs bg-gradient-to-r from-primary to-blue-400 text-primary-foreground"
            >
              <Mail className="mr-1.5 h-3 w-3" />
              Send Outreach
            </Button>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-2">
        <Link
          to="/partners"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
        >
          View all partners <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
