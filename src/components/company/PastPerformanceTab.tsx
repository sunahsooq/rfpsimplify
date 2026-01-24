import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, Building2, Mail, Phone, Plus, CheckCircle2 } from "lucide-react";
import type { PastPerformance } from "@/hooks/useCompanyProfile";
import { PastPerformanceStats } from "./PastPerformanceStats";
import { PastPerformanceForm } from "./PastPerformanceForm";
import { PastPerformanceCard } from "./PastPerformanceCard";

// Sample data to show when no database records exist
const samplePastPerformance = [
  {
    id: "sample-1",
    contract_name: "Enterprise Cloud Migration Services",
    contract_number: "GS-35F-0123X",
    agency_or_client: "Department of Energy",
    sub_agency: "Office of the CIO",
    client_type: "Federal" as const,
    contract_type: "IDIQ" as const,
    role: "Prime" as const,
    work_share_percentage: 100,
    contract_value_range: "$5-25M" as const,
    pop_start_date: "2022-01-15",
    pop_end_date: "2024-12-31",
    status: "Active" as const,
    cpars_rating: "Exceptional" as const,
    scope_tags: ["Cloud Migration", "AWS", "DevSecOps", "FedRAMP"],
    scope_description: "Led enterprise-wide cloud migration for 47 legacy applications to AWS GovCloud.",
    reference_contact: {
      name: "John Smith",
      title: "Contracting Officer",
      email: "john.smith@doe.gov",
      phone: "(202) 555-0147",
    },
  },
  {
    id: "sample-2",
    contract_name: "Cybersecurity Operations Center",
    contract_number: "HHSN316201200001W",
    agency_or_client: "Department of Health & Human Services",
    sub_agency: "Centers for Medicare Services",
    client_type: "Federal" as const,
    contract_type: "T&M" as const,
    role: "Prime" as const,
    work_share_percentage: 85,
    contract_value_range: "$1-5M" as const,
    pop_start_date: "2021-06-01",
    pop_end_date: "2023-05-31",
    status: "Completed" as const,
    cpars_rating: "Very Good" as const,
    scope_tags: ["SOC", "SIEM", "Incident Response", "CMMC"],
    scope_description: "Established and operated 24/7 Security Operations Center monitoring 12,000+ endpoints.",
    reference_contact: {
      name: "Sarah Johnson",
      title: "COR",
      email: "sarah.johnson@hhs.gov",
      phone: "(301) 555-0198",
    },
  },
  {
    id: "sample-3",
    contract_name: "IT Modernization Support",
    contract_number: "VA118-16-D-1234",
    agency_or_client: "Department of Veterans Affairs",
    sub_agency: "Office of Information Technology",
    client_type: "Federal" as const,
    contract_type: "FFP" as const,
    role: "Subcontractor" as const,
    work_share_percentage: 35,
    contract_value_range: "$1-5M" as const,
    pop_start_date: "2020-03-01",
    pop_end_date: "2022-02-28",
    status: "Completed" as const,
    cpars_rating: "Satisfactory" as const,
    scope_tags: ["Agile", "Legacy Modernization", "Java", "API Development"],
    scope_description: "Provided agile development support for veteran benefits processing system modernization.",
    reference_contact: {
      name: "Michael Chen",
      title: "Program Manager",
      email: "michael.chen@va.gov",
      phone: "(571) 555-0234",
    },
  },
];

const cparsColors: Record<string, string> = {
  Exceptional: "bg-gradient-to-r from-success to-emerald-400 text-success-foreground",
  "Very Good": "bg-gradient-to-r from-primary to-blue-400 text-primary-foreground",
  Satisfactory: "bg-gradient-to-r from-warning to-yellow-400 text-warning-foreground",
  Marginal: "bg-gradient-to-r from-orange-500 to-orange-400 text-white",
  Unsatisfactory: "bg-gradient-to-r from-destructive to-red-400 text-destructive-foreground",
};

const statusColors: Record<string, string> = {
  Active: "bg-success/20 text-success",
  Completed: "bg-muted text-muted-foreground",
  Terminated: "bg-destructive/20 text-destructive",
};

type Props = {
  profileId: string | undefined;
  pastPerformance: PastPerformance[];
  onSave: (values: Partial<PastPerformance>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function PastPerformanceTab({ profileId, pastPerformance, onSave, onDelete }: Props) {
  // Use sample data if no database records exist
  const displayData = pastPerformance.length > 0 ? pastPerformance : samplePastPerformance;
  const isUsingDemo = pastPerformance.length === 0;

  // Stats calculation
  const totalContracts = displayData.length;
  const asPrime = displayData.filter((p) => p.role === "Prime").length;
  const highCpars = displayData.filter((p) => p.cpars_rating === "Exceptional" || p.cpars_rating === "Very Good").length;
  const activeContracts = displayData.filter((p) => p.status === "Active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Past Performance Records
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {totalContracts} contracts • Showcase your federal experience
            {isUsingDemo && <span className="text-primary ml-2">(Sample data - add your own records)</span>}
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Contract
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border rounded-[20px]">
          <p className="text-2xl font-bold text-foreground">{totalContracts}</p>
          <p className="text-sm text-muted-foreground">Total Contracts</p>
        </Card>
        <Card className="p-4 bg-card border-border rounded-[20px]">
          <p className="text-2xl font-bold text-foreground">{asPrime}</p>
          <p className="text-sm text-muted-foreground">As Prime</p>
        </Card>
        <Card className="p-4 bg-card border-border rounded-[20px]">
          <p className="text-2xl font-bold text-foreground">{highCpars}</p>
          <p className="text-sm text-muted-foreground">High CPARS</p>
        </Card>
        <Card className="p-4 bg-card border-border rounded-[20px]">
          <p className="text-2xl font-bold text-foreground">{activeContracts}</p>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
      </div>

      {/* Contract Cards */}
      <div className="space-y-4">
        {displayData.map((pp) => {
          const ref = pp.reference_contact as { name?: string; title?: string; email?: string; phone?: string } | null;

          return (
            <Card key={pp.id} className="p-6 bg-card border-border rounded-[20px]">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{pp.contract_name}</h3>
                    <Badge className={statusColors[pp.status] || "bg-muted text-muted-foreground"}>
                      {pp.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {pp.agency_or_client}
                    <span className="mx-1">•</span>
                    {pp.contract_number}
                  </div>
                </div>
                <Badge className={cparsColors[pp.cpars_rating || ""] || "bg-muted text-muted-foreground"}>
                  {pp.cpars_rating || "No Rating"}
                </Badge>
              </div>

              {/* Contract Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p className="font-medium text-foreground">
                    {pp.role}
                    {pp.work_share_percentage && <span className="text-muted-foreground ml-1">({pp.work_share_percentage}%)</span>}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contract Type</p>
                  <p className="font-medium text-foreground">{pp.contract_type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Value</p>
                  <p className="font-medium text-foreground">{pp.contract_value_range}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Period</p>
                  <p className="font-medium text-foreground">
                    {pp.pop_start_date && new Date(pp.pop_start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {" — "}
                    {pp.pop_end_date && new Date(pp.pop_end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Client Type</p>
                  <p className="font-medium text-foreground flex items-center gap-1">
                    {pp.client_type}
                    {pp.client_type === "Federal" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  </p>
                </div>
              </div>

              {/* Scope Description */}
              {pp.scope_description && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Scope of Work</p>
                  <p className="text-sm text-foreground">{pp.scope_description}</p>
                </div>
              )}

              {/* Scope Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(pp.scope_tags || []).map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reference Contact */}
              {ref && ref.name && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {ref.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{ref.name}</p>
                        <p className="text-sm text-muted-foreground">{ref.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {ref.email && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {ref.phone && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
