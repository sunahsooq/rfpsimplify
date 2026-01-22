import { Link } from "react-router-dom";
import { Mail, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePartners, type Certification } from "@/contexts/PartnerContext";
import { toast } from "sonner";

type Props = {
  opportunityAgency?: string;
  requiredCerts?: Certification[];
  companyGaps?: Certification[];
};

export function OpportunityRecommendedPartners({
  opportunityAgency = "DOE",
  requiredCerts = ["FedRAMP", "CMMC"],
  companyGaps = ["FedRAMP", "GSA Schedule"],
}: Props) {
  const { getRecommendedPartners } = usePartners();

  const recommended = getRecommendedPartners(companyGaps, requiredCerts, opportunityAgency).slice(0, 3);

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
        Partners recommended based on your capability gaps and this opportunity's requirements.
      </p>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {recommended.map((partner) => (
          <div
            key={partner.id}
            className="rounded-lg border border-border bg-background/5 p-4 transition-all hover:border-primary/30"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="text-sm font-bold text-foreground">{partner.name}</h4>
              <Badge className={`shrink-0 text-xs ${fitBadgeClass[partner.fitLevel]}`}>
                {fitLabel[partner.fitLevel]}
              </Badge>
            </div>

            {/* Match Reasons */}
            <ul className="space-y-1 mb-3">
              {partner.matchReasons.slice(0, 2).map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {reason}
                </li>
              ))}
            </ul>

            {/* Certs */}
            <div className="flex flex-wrap gap-1 mb-3">
              {partner.certifications.slice(0, 3).map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="text-[10px] border-border text-muted-foreground py-0"
                >
                  {cert}
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
