import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";

interface Partner {
  id: number;
  name: string;
  initials: string;
  location: string;
  match: number;
  certifications: string[];
  capabilities: string[];
  about?: string;
  founded?: string;
  employees?: string;
  pastPerformance?: string;
  naics?: string[];
  verified?: boolean;
}

const partners: Partner[] = [
  { id: 1, name: "CyberShield Solutions", initials: "CS", location: "Arlington, VA", match: 92, certifications: ["FedRAMP", "CMMC L2"], capabilities: ["Cybersecurity", "Cloud Security", "SOC"], about: "Leading federal cybersecurity provider with 10+ years of DoD experience.", founded: "2012", employees: "150-200", pastPerformance: "12 federal contracts, $45M total value", naics: ["541512", "541519"], verified: true },
  { id: 2, name: "DataFlow Analytics", initials: "DA", location: "Reston, VA", match: 87, certifications: ["ISO 27001"], capabilities: ["Data Analytics", "AI/ML", "BI"], about: "Specialized in big data analytics for federal healthcare agencies.", founded: "2015", employees: "75-100", pastPerformance: "8 federal contracts, $22M total value", naics: ["541511", "518210"], verified: true },
  { id: 3, name: "CloudFirst Federal", initials: "CF", location: "Washington, DC", match: 85, certifications: ["FedRAMP High"], capabilities: ["Cloud Migration", "AWS", "Azure"], about: "AWS Premier Partner focused on federal cloud modernization.", founded: "2014", employees: "200-300", pastPerformance: "15 federal contracts, $68M total value", naics: ["541512", "518210"], verified: true },
  { id: 4, name: "SecureNet Partners", initials: "SP", location: "Bethesda, MD", match: 83, certifications: ["CMMC L3", "SOC 2"], capabilities: ["Network Security", "Zero Trust"], about: "Zero Trust architecture specialists for defense agencies.", founded: "2016", employees: "50-75", pastPerformance: "6 federal contracts, $18M total value", naics: ["541512"] },
  { id: 5, name: "AgileGov Solutions", initials: "AG", location: "McLean, VA", match: 81, certifications: ["ISO 27001"], capabilities: ["Agile Development", "DevSecOps"], about: "Agile transformation experts for federal IT modernization.", founded: "2017", employees: "100-150", pastPerformance: "9 federal contracts, $35M total value", naics: ["541511", "541512"] },
  { id: 6, name: "FedCloud Systems", initials: "FC", location: "Herndon, VA", match: 79, certifications: ["FedRAMP Moderate"], capabilities: ["Cloud Hosting", "IaaS"], about: "FedRAMP authorized cloud hosting provider.", founded: "2013", employees: "75-100", pastPerformance: "11 federal contracts, $42M total value", naics: ["518210"] },
  { id: 7, name: "TechBridge Federal", initials: "TB", location: "Alexandria, VA", match: 77, certifications: ["CMMC L2"], capabilities: ["IT Modernization", "Legacy Migration"], about: "Legacy system modernization for civilian agencies.", founded: "2018", employees: "50-75", pastPerformance: "5 federal contracts, $15M total value", naics: ["541512", "541519"] },
  { id: 8, name: "DataSecure Inc", initials: "DS", location: "Rockville, MD", match: 75, certifications: ["SOC 2", "ISO"], capabilities: ["Data Protection", "Encryption"], about: "Data encryption and protection solutions provider.", founded: "2015", employees: "40-60", pastPerformance: "7 federal contracts, $12M total value", naics: ["541512"] },
  { id: 9, name: "GovTech Dynamics", initials: "GT", location: "Fairfax, VA", match: 73, certifications: ["FedRAMP"], capabilities: ["Software Development", "Low-Code"], about: "Low-code development platform specialists.", founded: "2019", employees: "30-50", pastPerformance: "4 federal contracts, $8M total value", naics: ["541511"] },
];

const filterSections = {
  capabilities: ["Cloud Migration", "Cybersecurity", "Software Development", "Data Analytics", "IT Modernization"],
  certifications: ["FedRAMP (any level)", "CMMC Level 2+", "ISO 27001", "SOC 2 Type II"],
  setAside: ["Small Business", "8(a)", "WOSB", "SDVOSB", "HUBZone"],
  companySize: ["1-50 employees", "51-200 employees", "201-500 employees", "500+ employees"],
};

export default function PartnerDiscoveryNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    capabilities: true,
    certifications: true,
    setAside: true,
    companySize: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
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
          <p className="text-muted-foreground mb-4">{filteredPartners.length} partners found</p>

          {/* Partner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPartners.map((partner) => (
              <Card
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`p-5 bg-card border-border rounded-[20px] cursor-pointer transition-all hover:border-primary/50 ${
                  selectedPartner?.id === partner.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {partner.initials}
                    </div>
                    <div>
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
                <div className="flex flex-wrap gap-1 mb-3">
                  {partner.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {partner.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{cap}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-border">View Profile</Button>
                  <Button size="sm" className="flex-1 gradient-primary text-primary-foreground">Invite to Team</Button>
                </div>
              </Card>
            ))}
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
                  <Badge key={cert} variant="secondary">{cert}</Badge>
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
      </div>
    </div>
  );
}
