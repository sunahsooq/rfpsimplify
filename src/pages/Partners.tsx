import { useState } from "react";
import { Search, Filter, Mail, Building2, Shield, Award, MapPin, Eye, Send } from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePartners, type Partner } from "@/contexts/PartnerContext";
import { useCompany, type SocioEconomicStatus } from "@/contexts/CompanyContext";
import { toast } from "sonner";

const socioEconomicOptions: SocioEconomicStatus[] = ["Small Business", "8(a)", "WOSB", "SDVOSB", "HUBZone"];
const naicsOptions = ["541511", "541512", "541513", "541519", "518210", "541611"];

export default function Partners() {
  const { partners } = usePartners();
  const { company } = useCompany();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [socioEconomicFilter, setSocioEconomicFilter] = useState<string>("all");
  const [naicsFilter, setNaicsFilter] = useState<string>("all");
  
  // Modal states
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTeamingModal, setShowTeamingModal] = useState(false);
  const [teamingMessage, setTeamingMessage] = useState("");

  // Filter partners based on search and filters
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      searchQuery === "" ||
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.capabilities.some((cap) => cap.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSocioEconomic =
      socioEconomicFilter === "all" || 
      partner.socioEconomicStatuses.includes(socioEconomicFilter as SocioEconomicStatus);

    const matchesNaics =
      naicsFilter === "all" || partner.naicsCodes.includes(naicsFilter);

    return matchesSearch && matchesSocioEconomic && matchesNaics;
  });

  // Calculate fit based on company gaps
  const getPartnerFit = (partner: Partner) => {
    let score = 0;
    
    // Bonus for complementary socio-economic status
    const complementaryStatuses = partner.socioEconomicStatuses.filter(
      (s) => !company.socioEconomicStatuses.includes(s)
    );
    if (complementaryStatuses.length > 0) score += 20;

    // Bonus for certifications
    if (partner.certifications.includes("FedRAMP")) score += 30;
    if (partner.certifications.includes("CMMC")) score += 25;
    if (partner.certifications.includes("GSA Schedule")) score += 20;
    if (partner.certifications.length >= 3) score += 15;
    
    // Bonus for matching NAICS
    if (partner.naicsCodes.includes(company.primaryNaics)) score += 10;

    return score >= 50 ? "high" : score >= 30 ? "medium" : "low";
  };

  const getMatchScore = (partner: Partner) => {
    let score = 50; // Base score
    const complementaryStatuses = partner.socioEconomicStatuses.filter(
      (s) => !company.socioEconomicStatuses.includes(s)
    );
    if (complementaryStatuses.length > 0) score += 15;
    if (partner.certifications.includes("FedRAMP")) score += 15;
    if (partner.certifications.includes("CMMC")) score += 10;
    if (partner.naicsCodes.includes(company.primaryNaics)) score += 10;
    return Math.min(score, 100);
  };

  const handleViewProfile = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowProfileModal(true);
  };

  const handleRequestTeaming = (partner: Partner) => {
    setSelectedPartner(partner);
    setTeamingMessage(`Hi ${partner.name} team,\n\nI'm reaching out from ${company.legalBusinessName} to explore potential teaming opportunities. We believe our capabilities could complement yours well.\n\nLooking forward to connecting.\n\nBest regards`);
    setShowTeamingModal(true);
  };

  const handleSendTeamingRequest = () => {
    if (selectedPartner) {
      toast.success(`Teaming request sent to ${selectedPartner.name}`);
      setShowTeamingModal(false);
      setTeamingMessage("");
    }
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
              placeholder="Search by company name or capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={naicsFilter} onValueChange={setNaicsFilter}>
              <SelectTrigger className="w-36 bg-secondary border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="NAICS" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All NAICS</SelectItem>
                {naicsOptions.map((code) => (
                  <SelectItem key={code} value={code}>{code}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={socioEconomicFilter} onValueChange={setSocioEconomicFilter}>
              <SelectTrigger className="w-44 bg-secondary border-border">
                <Award className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Set-Aside" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Set-Asides</SelectItem>
                {socioEconomicOptions.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
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
              No partners found with these certifications. Try adjusting your filters.
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPartners.map((partner) => {
              const fit = getPartnerFit(partner);
              const matchScore = getMatchScore(partner);
              return (
                <div
                  key={partner.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {partner.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <Badge className={`shrink-0 ${fitBadgeClass[fit]}`}>
                        {fitLabel[fit]}
                      </Badge>
                      <span className="text-xs font-semibold text-primary">{matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Core Capabilities
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.capabilities.slice(0, 4).map((cap) => (
                        <Badge
                          key={cap}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 text-xs"
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

                  {/* Socio-Economic Badges */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Set-Asides
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.socioEconomicStatuses.map((status) => (
                        <Badge
                          key={status}
                          variant="outline"
                          className="text-xs border-border text-muted-foreground"
                        >
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => handleViewProfile(partner)}
                      className="flex-1 border-border hover:bg-accent"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button
                      onClick={() => handleRequestTeaming(partner)}
                      className="flex-1 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Request Teaming
                    </Button>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Footer */}
        {filteredPartners.length > 0 && (
          <p className="mt-6 text-xs text-muted-foreground">
            Showing {filteredPartners.length} of {partners.length} partners. 
            Match scores based on complementary certifications and capabilities.
          </p>
        )}
      </main>

      {/* View Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedPartner?.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {selectedPartner?.location}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPartner && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-foreground">{selectedPartner.tagline}</p>
              
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPartner.certifications.map((cert) => (
                    <Badge key={cert} className="bg-primary/10 text-primary border-primary/20">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Capabilities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPartner.capabilities.map((cap) => (
                    <Badge key={cap} variant="secondary" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  NAICS Codes
                </h4>
                <p className="text-sm text-foreground">{selectedPartner.naicsCodes.join(", ")}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Past Performance Agencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPartner.pastPerformanceAgencies.map((agency) => (
                    <Badge key={agency} variant="outline" className="text-xs">
                      {agency}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Contact
                </h4>
                <p className="text-sm text-primary">{selectedPartner.contactEmail}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowProfileModal(false);
                if (selectedPartner) handleRequestTeaming(selectedPartner);
              }}
              className="bg-gradient-to-r from-primary to-blue-400"
            >
              <Mail className="mr-2 h-4 w-4" />
              Request Teaming
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Teaming Request Modal */}
      <Dialog open={showTeamingModal} onOpenChange={setShowTeamingModal}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>Request Teaming with {selectedPartner?.name}</DialogTitle>
            <DialogDescription>
              Send a teaming inquiry to {selectedPartner?.name}. They will receive your message and company profile.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={teamingMessage}
              onChange={(e) => setTeamingMessage(e.target.value)}
              placeholder="Write your message..."
              className="min-h-[150px] bg-secondary border-border"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTeamingModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendTeamingRequest}
              className="bg-gradient-to-r from-primary to-blue-400"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
