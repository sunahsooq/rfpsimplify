import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Shield, Award, Briefcase } from "lucide-react";

const companyData = {
  name: "Acme Federal Solutions",
  uei: "JQNC9KQPXYZ1",
  cageCode: "7ABC1",
  address: "1234 Government Way, Suite 500, Arlington, VA 22201",
  primaryNaics: "541512 - Computer Systems Design Services",
  setAsides: ["8(a)", "SDVOSB", "HUBZone"],
};

const certifications = [
  { name: "FedRAMP", status: "active", level: "Moderate" },
  { name: "CMMC Level 2", status: "active", level: "" },
  { name: "ISO 27001", status: "active", level: "" },
  { name: "SOC 2 Type II", status: "expired", level: "" },
];

const capabilities = [
  "Cloud Migration",
  "Cybersecurity",
  "DevSecOps",
  "Data Platforms",
  "Zero Trust Architecture",
  "Application Modernization",
  "AI/ML Integration",
  "Agile Development",
];

const pastPerformance = [
  { agency: "Department of Energy", contract: "Cloud Infrastructure Modernization", value: "$4.2M", year: "2023" },
  { agency: "Department of Defense", contract: "Cybersecurity Operations Center", value: "$8.7M", year: "2022" },
  { agency: "GSA", contract: "IT Schedule 70 Support", value: "$2.1M", year: "2021" },
];

export default function Company() {
  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Company Profile
          </h1>
          <p className="text-muted-foreground">
            Information used to evaluate opportunities and generate recommendations
          </p>
        </div>

        <div className="space-y-6">
          {/* Company Overview */}
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Building2 className="h-5 w-5 text-primary" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Company Name</label>
                  <Input 
                    defaultValue={companyData.name} 
                    className="bg-[#2a334f] border-[#334155] text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">UEI (Read-only)</label>
                  <Input 
                    defaultValue={companyData.uei} 
                    readOnly
                    className="bg-[#2a334f]/50 border-[#334155] text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">CAGE Code</label>
                  <Input 
                    defaultValue={companyData.cageCode} 
                    className="bg-[#2a334f] border-[#334155] text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Primary NAICS</label>
                  <Input 
                    defaultValue={companyData.primaryNaics} 
                    className="bg-[#2a334f] border-[#334155] text-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Address</label>
                <Input 
                  defaultValue={companyData.address} 
                  className="bg-[#2a334f] border-[#334155] text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Set-Asides</label>
                <div className="flex flex-wrap gap-2">
                  {companyData.setAsides.map((setAside) => (
                    <Badge 
                      key={setAside} 
                      className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                    >
                      {setAside}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground hover:text-foreground">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert) => (
                  <div 
                    key={cert.name}
                    className={`p-4 rounded-lg border ${
                      cert.status === "active" 
                        ? "bg-success/10 border-success/30" 
                        : "bg-destructive/10 border-destructive/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{cert.name}</span>
                      <Badge 
                        className={
                          cert.status === "active"
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-destructive/20 text-destructive border-destructive/30"
                        }
                      >
                        {cert.status === "active" ? "Active" : "Expired"}
                      </Badge>
                    </div>
                    {cert.level && (
                      <span className="text-sm text-muted-foreground">{cert.level}</span>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-4 text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Award className="h-5 w-5 text-primary" />
                Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {capabilities.map((capability) => (
                  <Badge 
                    key={capability}
                    variant="secondary"
                    className="bg-[#2a334f] text-foreground border-[#334155] hover:bg-[#3a4560]"
                  >
                    {capability}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add new capability..." 
                  className="bg-[#2a334f] border-[#334155] text-foreground max-w-xs"
                />
                <Button variant="outline" size="sm" className="border-[#334155] hover:bg-[#2a334f]">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Past Performance */}
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Past Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#334155] hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Agency</TableHead>
                      <TableHead className="text-muted-foreground">Contract Name</TableHead>
                      <TableHead className="text-muted-foreground">Value</TableHead>
                      <TableHead className="text-muted-foreground">Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPerformance.map((pp, index) => (
                      <TableRow key={index} className="border-[#334155] hover:bg-[#2a334f]/50">
                        <TableCell className="text-foreground font-medium">{pp.agency}</TableCell>
                        <TableCell className="text-muted-foreground">{pp.contract}</TableCell>
                        <TableCell className="text-success font-medium">{pp.value}</TableCell>
                        <TableCell className="text-muted-foreground">{pp.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Past Performance
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
