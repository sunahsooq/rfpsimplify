import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailOutreachModal } from "@/components/partner/EmailOutreachModal";
import {
  Search,
  MapPin,
  CheckCircle2,
  Building2,
  Calendar,
  Users,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Sparkles,
} from "lucide-react";

interface Partner {
  id: number;
  name: string;
  initials: string;
  location: string;
  match: number;
  certifications: { name: string; status: "verified" | "inferred" | "self-reported" }[];
  capabilities: string[];
  fills: string[];
  about?: string;
  founded?: string;
  employees?: string;
  pastPerformance?: string;
  naics?: string[];
  verified?: boolean;
  winRate?: number;
  setAsides?: string[];
}

const partners: Partner[] = [
  { id: 1, name: "CyberShield Solutions", initials: "CS", location: "Arlington, VA", match: 92, certifications: [{ name: "FedRAMP High", status: "verified" }, { name: "CMMC L2", status: "verified" }], capabilities: ["Cybersecurity", "Cloud Security", "SOC"], fills: ["FedRAMP High (30%)", "CMMC L2 (20%)", "3 Cyber FTEs (5%)"], about: "Leading federal cybersecurity provider with 10+ years of DoD experience.", founded: "2012", employees: "150-200", pastPerformance: "12 federal contracts, $45M total value", naics: ["541512", "541519"], verified: true, winRate: 68, setAsides: ["Small Business", "8(a)"] },
  { id: 2, name: "DataFlow Analytics", initials: "DA", location: "Reston, VA", match: 87, certifications: [{ name: "ISO 27001", status: "verified" }], capabilities: ["Data Analytics", "AI/ML", "BI"], fills: ["Data Analytics (25%)", "AI/ML (15%)"], about: "Specialized in big data analytics for federal healthcare agencies.", founded: "2015", employees: "75-100", pastPerformance: "8 federal contracts, $22M total value", naics: ["541511", "518210"], verified: true, winRate: 52, setAsides: ["Small Business", "WOSB"] },
  { id: 3, name: "CloudFirst Federal", initials: "CF", location: "Washington, DC", match: 85, certifications: [{ name: "FedRAMP High", status: "verified" }, { name: "AWS Gov", status: "self-reported" }], capabilities: ["Cloud Migration", "AWS", "Azure"], fills: ["FedRAMP High (30%)", "Cloud Migration (20%)"], about: "AWS Premier Partner focused on federal cloud modernization.", founded: "2014", employees: "200-300", pastPerformance: "15 federal contracts, $68M total value", naics: ["541512", "518210"], verified: true, winRate: 58, setAsides: ["Small Business"] },
  { id: 4, name: "SecureNet Partners", initials: "SP", location: "Bethesda, MD", match: 83, certifications: [{ name: "CMMC L3", status: "verified" }, { name: "SOC 2", status: "inferred" }], capabilities: ["Network Security", "Zero Trust"], fills: ["Zero Trust (15%)", "Cleared Staff (10%)"], about: "Zero Trust architecture specialists for defense agencies.", founded: "2016", employees: "50-75", pastPerformance: "6 federal contracts, $18M total value", naics: ["541512"], winRate: 55, setAsides: ["Small Business", "SDVOSB"] },
  { id: 5, name: "AgileGov Solutions", initials: "AG", location: "McLean, VA", match: 81, certifications: [{ name: "ISO 27001", status: "verified" }], capabilities: ["Agile Development", "DevSecOps"], fills: ["DevSecOps (20%)", "Agile (10%)"], about: "Agile transformation experts for federal IT modernization.", founded: "2017", employees: "100-150", pastPerformance: "9 federal contracts, $35M total value", naics: ["541511", "541512"], winRate: 48, setAsides: ["Small Business"] },
  { id: 6, name: "FedCloud Systems", initials: "FC", location: "Herndon, VA", match: 79, certifications: [{ name: "FedRAMP Moderate", status: "verified" }], capabilities: ["Cloud Hosting", "IaaS"], fills: ["FedRAMP Moderate (20%)", "Cloud Hosting (15%)"], about: "FedRAMP authorized cloud hosting provider.", founded: "2013", employees: "75-100", pastPerformance: "11 federal contracts, $42M total value", naics: ["518210"], winRate: 52, setAsides: ["Small Business", "HUBZone"] },
  { id: 7, name: "TechBridge Federal", initials: "TB", location: "Alexandria, VA", match: 77, certifications: [{ name: "CMMC L2", status: "verified" }], capabilities: ["IT Modernization", "Legacy Migration"], fills: ["Legacy Migration (25%)", "CMMC L2 (20%)"], about: "Legacy system modernization for civilian agencies.", founded: "2018", employees: "50-75", pastPerformance: "5 federal contracts, $15M total value", naics: ["541512", "541519"], winRate: 45, setAsides: ["Small Business"] },
  { id: 8, name: "DataSecure Inc", initials: "DS", location: "Rockville, MD", match: 75, certifications: [{ name: "SOC 2", status: "verified" }, { name: "ISO", status: "inferred" }], capabilities: ["Data Protection", "Encryption"], fills: ["Encryption (15%)", "Data Security (10%)"], about: "Data encryption and protection solutions provider.", founded: "2015", employees: "40-60", pastPerformance: "7 federal contracts, $12M total value", naics: ["541512"], winRate: 42, setAsides: ["Small Business"] },
  { id: 9, name: "GovTech Dynamics", initials: "GT", location: "Fairfax, VA", match: 73, certifications: [{ name: "FedRAMP", status: "self-reported" }], capabilities: ["Software Development", "Low-Code"], fills: ["Low-Code Dev (15%)", "Rapid Prototyping (10%)"], about: "Low-code development platform specialists.", founded: "2019", employees: "30-50", pastPerformance: "4 federal contracts, $8M total value", naics: ["541511"], winRate: 38, setAsides: ["Small Business"] },
];

const filterSections = {
  capabilities: ["Cloud Migration", "Cybersecurity", "Software Development", "Data Analytics", "IT Modernization"],
  certifications: ["FedRAMP (any level)", "CMMC Level 2+", "ISO 27001", "SOC 2 Type II"],
  setAside: ["Small Business", "8(a)", "WOSB", "SDVOSB", "HUBZone"],
  companySize: ["1-50 employees", "51-200 employees", "201-500 employees", "500+ employees"],
};

const certStatusColors = {
  verified: "border-success text-success",
  inferred: "border-warning text-warning",
  "self-reported": "border-purple-400 text-purple-400",
};

export default function PartnerDiscoveryNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<Partner[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    capabilities: true,
    certifications: true,
    setAside: true,
    companySize: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const togglePartnerSelection = (partner: Partner) => {
    setSelectedPartners((prev) => 
      prev.some(p => p.id === partner.id)
        ? prev.filter(p => p.id !== partner.id)
        : [...prev, partner]
    );
  };

  const clearSelection = () => {
    setSelectedPartners([]);
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <div className="flex">
        {/* Left Filters Sidebar */}
        <aside className="w-[280px] min-h-[calc(100vh-70px)] border-r border-border bg-card p-4">
          <h2 className="font-semibold text-foreground mb-4">Filters</h2>
          <ScrollArea className="h-[calc(100vh-160px)]">
            {Object.entries(filterSections).map(([key, options]) => (
              <div key={key} className="mb-4">
                <button
                  onClick={() => toggleSection(key)}
                  className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground"
                >
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  {expandedSections[key] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedSections[key] && (
                  <div className="space-y-2 mt-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                        <Checkbox />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="text-sm text-primary hover:underline mt-4">Clear All Filters</button>
          </ScrollArea>
        </aside>

        {/* Center Results */}
        <main className={`flex-1 p-6 transition-all ${selectedPartner ? "mr-[350px]" : ""}`}>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners by name, capability, or NAICS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          
          {/* Data Accuracy Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-secondary/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Data Accuracy:</span>
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-success"></span> Verified (SAM/FedRAMP)</span>
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-warning"></span> Inferred (awards)</span>
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Self-Reported</span>
          </div>

          {/* AI Suggestion */}
          {filteredPartners.length > 1 && (
            <div className="mb-4 p-4 bg-success/10 border border-success/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-success" />
                <span className="text-sm text-foreground">
                  <strong>AI Suggestion:</strong> Select CyberShield + CloudFirst - fills 100% of your gaps
                </span>
              </div>
              <Button 
                size="sm" 
                className="bg-success text-white hover:bg-success/90"
                onClick={() => {
                  const suggested = partners.filter(p => p.id === 1 || p.id === 3);
                  setSelectedPartners(suggested);
                }}
              >
                Select Both
              </Button>
            </div>
          )}

          <p className="text-muted-foreground mb-4">{filteredPartners.length} partners found</p>

          {/* Partner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPartners.map((partner) => {
              const isSelected = selectedPartners.some(p => p.id === partner.id);
              return (
                <Card
                  key={partner.id}
                  className={`p-5 bg-card border-border rounded-[20px] cursor-pointer transition-all hover:border-primary/50 ${
                    selectedPartner?.id === partner.id ? "border-primary ring-2 ring-primary/20" : ""
                  } ${isSelected ? "ring-2 ring-success/50 border-success" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={() => togglePartnerSelection(partner)}
                          className="absolute -top-1 -left-1 z-10"
                        />
                        <div 
                          className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground cursor-pointer"
                          onClick={() => setSelectedPartner(partner)}
                        >
                          {partner.initials}
                        </div>
                      </div>
                      <div onClick={() => setSelectedPartner(partner)}>
                        <h3 className="font-semibold text-foreground">{partner.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {partner.location}
                        </p>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {partner.match}%
                    </div>
                  </div>
                  
                  {/* Fills */}
                  {partner.fills && partner.fills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Fills your gaps:</p>
                      <div className="flex flex-wrap gap-1">
                        {partner.fills.slice(0, 2).map((fill) => (
                          <span key={fill} className="text-xs text-success bg-success/10 px-2 py-0.5 rounded">{fill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Certifications with status */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {partner.certifications.map((cert) => (
                      <Badge 
                        key={cert.name} 
                        variant="outline" 
                        className={`text-xs ${certStatusColors[cert.status]}`}
                      >
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {partner.capabilities.slice(0, 3).map((cap) => (
                      <span key={cap} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{cap}</span>
                    ))}
                  </div>
                  
                  {partner.winRate && (
                    <p className="text-xs text-muted-foreground mb-3">Win Rate: <span className="text-foreground font-medium">{partner.winRate}%</span></p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-border" onClick={() => setSelectedPartner(partner)}>View Profile</Button>
                    <Button size="sm" className="flex-1 gradient-primary text-primary-foreground">Invite to Team</Button>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {/* Load More */}
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-border">Load More Partners</Button>
          </div>
        </main>

        {/* Right Detail Panel */}
        {selectedPartner && (
          <aside className="fixed right-0 top-[70px] w-[350px] h-[calc(100vh-70px)] border-l border-border bg-card p-6 overflow-y-auto">
            <button onClick={() => setSelectedPartner(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                {selectedPartner.initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{selectedPartner.name}</h2>
                {selectedPartner.verified && (
                  <span className="inline-flex items-center gap-1 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" /> Verified Partner
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedPartner.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {selectedPartner.founded}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {selectedPartner.employees}</span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">About</h4>
              <p className="text-sm text-muted-foreground">{selectedPartner.about}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-1">
                {selectedPartner.certifications.map((cert) => (
                  <Badge key={cert.name} variant="outline" className={certStatusColors[cert.status]}>{cert.name}</Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Capabilities</h4>
              <div className="flex flex-wrap gap-1">
                {selectedPartner.capabilities.map((cap) => (
                  <span key={cap} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">{cap}</span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                <FileText className="h-4 w-4" /> Past Performance
              </h4>
              <p className="text-sm text-muted-foreground">{selectedPartner.pastPerformance}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">NAICS Codes</h4>
              <div className="flex flex-wrap gap-1">
                {selectedPartner.naics?.map((code) => (
                  <span key={code} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">{code}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full gradient-primary text-primary-foreground">Invite to Team</Button>
              <Button variant="outline" className="w-full border-border">View Full Profile</Button>
              <Button variant="outline" className="w-full border-border">
                <MessageSquare className="h-4 w-4 mr-2" /> Message
              </Button>
            </div>
          </aside>
        )}
        
        {/* Sticky Bottom Selection Bar */}
        {selectedPartners.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-blue-500 p-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-3 text-white">
              <span className="font-semibold">{selectedPartners.length} partner{selectedPartners.length > 1 ? 's' : ''} selected</span>
              <div className="flex -space-x-2">
                {selectedPartners.slice(0, 4).map((p) => (
                  <div key={p.id} className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border-2 border-white/30">
                    {p.initials}
                  </div>
                ))}
                {selectedPartners.length > 4 && (
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border-2 border-white/30">
                    +{selectedPartners.length - 4}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={clearSelection}>
                Clear Selection
              </Button>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:from-amber-600 hover:to-yellow-500"
                onClick={() => setShowEmailModal(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Outreach Email
              </Button>
            </div>
          </div>
        )}
        
        {/* Email Outreach Modal */}
        <EmailOutreachModal
          open={showEmailModal}
          onOpenChange={setShowEmailModal}
          selectedPartners={selectedPartners}
          onClearSelection={clearSelection}
        />
      </div>
    </div>
  );
}
