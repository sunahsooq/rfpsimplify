import { useState } from "react";
import { Search, Filter, Mail, Building2, Shield, Award } from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePartners, type Certification } from "@/contexts/PartnerContext";
import { useCompany } from "@/contexts/CompanyContext";
import { toast } from "sonner";

const certificationOptions: Certification[] = ["FedRAMP", "CMMC", "ISO 27001", "SOC 2", "GSA Schedule"];
const agencyOptions = ["DOE", "DHS", "DoD", "GSA", "VA", "Treasury", "HHS", "Commerce", "DOJ"];

export default function Partners() {
  const { partners } = usePartners();
  const { company } = useCompany();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [certFilter, setCertFilter] = useState<string>("all");
  const [agencyFilter, setAgencyFilter] = useState<string>("all");

  // Filter partners based on search and filters
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      searchQuery === "" ||
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.capabilities.some((cap) => cap.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCert =
      certFilter === "all" || partner.certifications.includes(certFilter as Certification);

    const matchesAgency =
      agencyFilter === "all" || partner.pastPerformanceAgencies.includes(agencyFilter);

    return matchesSearch && matchesCert && matchesAgency;
  });

  // Calculate fit based on company gaps
  const getPartnerFit = (partner: typeof partners[0]) => {
    // Check if partner has certs we don't have
    const partnerHasFedRAMP = partner.certifications.includes("FedRAMP");
    const partnerHasCMMC = partner.certifications.includes("CMMC");
    const partnerHasGSA = partner.certifications.includes("GSA Schedule");
    
    // Simple scoring based on complementary certifications
    let score = 0;
    if (partnerHasFedRAMP) score += 30;
    if (partnerHasCMMC) score += 25;
    if (partnerHasGSA) score += 20;
    if (partner.certifications.length >= 3) score += 15;
    
    // Bonus for complementary socio-economic status
    const complementaryStatuses = partner.socioEconomicStatuses.filter(
      (s) => !company.socioEconomicStatuses.includes(s)
    );
    if (complementaryStatuses.length > 0) score += 10;

    return score >= 50 ? "high" : score >= 30 ? "medium" : "low";
  };

  const handleOutreach = (partnerName: string) => {
    toast.success(`Outreach request sent to ${partnerName}`);
  };

  const fitBadgeClass = {
    high: "bg-success/15 text-success border-success/30",
    medium: "bg-warning/15 text-warning border-warning/30",
    low: "bg-muted/50 text-muted-foreground border-border",
  };

  const fitLabel = {
    high: "High Fit",
    medium: "Medium Fit",
    low: "Potential Fit",
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <AppTopNav />

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-6 md:px-8">
        {/* Page Header */}
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-[32px]">Partner Discovery</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Find teaming partners that complement your capabilities and certifications
          </p>
        </section>

        {/* Filters */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <div className="flex gap-3">
            <Select value={certFilter} onValueChange={setCertFilter}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Certification" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Certifications</SelectItem>
                {certificationOptions.map((cert) => (
                  <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={agencyFilter} onValueChange={setAgencyFilter}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Agencies</SelectItem>
                {agencyOptions.map((agency) => (
                  <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Partner Grid */}
        {filteredPartners.length === 0 ? (
          <section className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">No partners found</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPartners.map((partner) => {
              const fit = getPartnerFit(partner);
              return (
                <div
                  key={partner.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">{partner.tagline}</p>
                    </div>
                    <Badge className={`shrink-0 ${fitBadgeClass[fit]}`}>
                      {fitLabel[fit]}
                    </Badge>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Certifications
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Capabilities
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.capabilities.slice(0, 4).map((cap) => (
                        <Badge
                          key={cap}
                          variant="outline"
                          className="text-xs border-border text-muted-foreground"
                        >
                          {cap}
                        </Badge>
                      ))}
                      {partner.capabilities.length > 4 && (
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                          +{partner.capabilities.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Set-Asides */}
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground">Set-Asides: </span>
                    <span className="text-xs font-medium text-foreground">
                      {partner.socioEconomicStatuses.join(", ")}
                    </span>
                  </div>

                  {/* Past Performance */}
                  <div className="mb-5 pb-4 border-b border-border">
                    <span className="text-xs text-muted-foreground">Agency Experience: </span>
                    <span className="text-xs font-medium text-foreground">
                      {partner.pastPerformanceAgencies.join(", ")}
                    </span>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => handleOutreach(partner.name)}
                    className="w-full bg-gradient-to-r from-primary to-blue-400 text-primary-foreground"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Outreach
                  </Button>
                </div>
              );
            })}
          </section>
        )}

        {/* Footer */}
        {filteredPartners.length > 0 && (
          <p className="mt-6 text-xs text-muted-foreground">
            Showing {filteredPartners.length} of {partners.length} partners. 
            Fit scores based on complementary certifications and capabilities.
          </p>
        )}
      </main>
    </div>
  );
}
