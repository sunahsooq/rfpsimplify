import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Filter, 
  Shield, 
  Building2, 
  FileCheck, 
  Users, 
  ChevronRight,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const partners = [
  {
    id: 1,
    name: "CyberShield Solutions",
    fit: "High",
    description: "Leading cybersecurity firm specializing in federal zero-trust implementations and continuous monitoring solutions.",
    certifications: ["FedRAMP Moderate", "CMMC Level 2", "ISO 27001"],
    vehicles: ["GSA Schedule 70", "CIO-SP3"],
    agencies: ["DOE", "DHS", "DoD"],
  },
  {
    id: 2,
    name: "FedCloud Partners",
    fit: "High",
    description: "Cloud migration specialists with extensive DOE and VA past performance. Expert in hybrid cloud architectures.",
    certifications: ["FedRAMP High", "SOC 2 Type II"],
    vehicles: ["GSA Schedule 70", "SEWP V"],
    agencies: ["DOE", "VA", "GSA"],
  },
  {
    id: 3,
    name: "SecureTeaming Inc",
    fit: "Medium",
    description: "Security compliance consultants helping agencies meet FISMA, NIST, and emerging security frameworks.",
    certifications: ["CMMC Level 2", "ISO 27001"],
    vehicles: ["CIO-SP3"],
    agencies: ["DoD", "DHS"],
  },
  {
    id: 4,
    name: "Innovation GovTech",
    fit: "Medium",
    description: "DevSecOps and innovation specialists bringing modern development practices to federal IT modernization.",
    certifications: ["FedRAMP Moderate", "SOC 2 Type II"],
    vehicles: ["GSA Schedule 70", "SEWP V"],
    agencies: ["GSA", "VA"],
  },
];

export default function PartnerDiscovery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Partner Discovery
            </h1>
            <p className="text-muted-foreground">
              Find teaming partners to close gaps and strengthen bids
            </p>
          </div>
          <Button variant="outline" className="border-[#334155] hover:bg-[#2a334f] w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="bg-[#1a2540] border-[#334155] mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search partners..." 
                  className="pl-10 bg-[#2a334f] border-[#334155] text-foreground"
                />
              </div>
              <Select>
                <SelectTrigger className="bg-[#2a334f] border-[#334155] text-foreground">
                  <SelectValue placeholder="Certification" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a334f] border-[#334155]">
                  <SelectItem value="fedramp">FedRAMP</SelectItem>
                  <SelectItem value="cmmc">CMMC</SelectItem>
                  <SelectItem value="iso">ISO 27001</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-[#2a334f] border-[#334155] text-foreground">
                  <SelectValue placeholder="Vehicle" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a334f] border-[#334155]">
                  <SelectItem value="gsa70">GSA Schedule 70</SelectItem>
                  <SelectItem value="ciosp3">CIO-SP3</SelectItem>
                  <SelectItem value="sewp">SEWP V</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-[#2a334f] border-[#334155] text-foreground">
                  <SelectValue placeholder="Agency Experience" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a334f] border-[#334155]">
                  <SelectItem value="doe">DOE</SelectItem>
                  <SelectItem value="dhs">DHS</SelectItem>
                  <SelectItem value="dod">DoD</SelectItem>
                  <SelectItem value="va">VA</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          Showing <span className="text-foreground font-medium">{partners.length}</span> potential partners
        </p>

        {/* Partner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {partners.map((partner) => (
            <Card 
              key={partner.id}
              className="bg-[#2a334f] border-[#334155] rounded-2xl hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.01] transition-all duration-200"
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
                  </div>
                  <Badge 
                    className={
                      partner.fit === "High"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }
                  >
                    {partner.fit} Fit
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {partner.description}
                </p>

                {/* Certifications */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Certifications</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.certifications.map((cert) => (
                      <Badge 
                        key={cert} 
                        variant="secondary"
                        className="bg-[#1a2540] text-foreground border-[#334155] text-xs"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Vehicles */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <FileCheck className="h-4 w-4" />
                    <span>Vehicles</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.vehicles.map((vehicle) => (
                      <Badge 
                        key={vehicle} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/30 text-xs"
                      >
                        {vehicle}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Agencies */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span>Agency Experience</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.agencies.map((agency) => (
                      <Badge 
                        key={agency} 
                        variant="outline"
                        className="border-[#334155] text-muted-foreground text-xs"
                      >
                        {agency}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-3 border-t border-[#334155]">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-[#334155] hover:bg-[#3a4560]"
                  >
                    View Profile
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white"
                  >
                    Request Teaming
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
