import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Printer,
  ArrowLeft,
  Building2,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";
import { usePartners } from "@/contexts/PartnerContext";
import { usePipeline } from "@/contexts/PipelineContext";

// Demo data for the bid brief
const briefDataById: Record<string, {
  title: string;
  solicitationNumber: string;
  agency: string;
  match: number;
  naics: string;
  setAside: string;
  estValue: string;
  pWin: number;
  expectedMargin: string;
  requirements: Array<{ requirement: string; capability: string; status: "match" | "partial" | "gap" }>;
}> = {
  "cloud-infra-modernization": {
    title: "Cloud Infrastructure Modernization",
    solicitationNumber: "DOE-2026-CLOUD-001",
    agency: "Department of Energy",
    match: 78,
    naics: "541512",
    setAside: "8(a)",
    estValue: "$4.2M",
    pWin: 52,
    expectedMargin: "15-20%",
    requirements: [
      { requirement: "NAICS 541512 - Computer Systems Design", capability: "Primary NAICS Code", status: "match" },
      { requirement: "8(a) Set-Aside Eligibility", capability: "8(a) Certification Active", status: "match" },
      { requirement: "FedRAMP Moderate Authorization", capability: "In Progress (Q2 2026)", status: "partial" },
      { requirement: "Cloud Migration Experience (3 contracts)", capability: "5 Relevant Contracts", status: "match" },
      { requirement: "GSA Schedule 70", capability: "Not Held", status: "gap" },
      { requirement: "DOE Past Performance", capability: "2 Active DOE Contracts", status: "match" },
    ],
  },
  "zero-trust-network-upgrade": {
    title: "Zero Trust Network Upgrade",
    solicitationNumber: "DHS-2026-ZT-042",
    agency: "Department of Homeland Security",
    match: 71,
    naics: "541512",
    setAside: "Small Business",
    estValue: "$3.8M",
    pWin: 45,
    expectedMargin: "12-18%",
    requirements: [
      { requirement: "NAICS 541512", capability: "Primary NAICS Code", status: "match" },
      { requirement: "Small Business Set-Aside", capability: "Small Business Status", status: "match" },
      { requirement: "CMMC Level 2", capability: "Assessment Pending", status: "partial" },
      { requirement: "Zero Trust Architecture Experience", capability: "Limited Experience", status: "partial" },
    ],
  },
};

const defaultBriefData = {
  title: "Cloud Infrastructure Modernization",
  solicitationNumber: "DOE-2026-CLOUD-001",
  agency: "Department of Energy",
  match: 78,
  naics: "541512",
  setAside: "8(a)",
  estValue: "$4.2M",
  pWin: 52,
  expectedMargin: "15-20%",
  requirements: [
    { requirement: "NAICS 541512 - Computer Systems Design", capability: "Primary NAICS Code", status: "match" as const },
    { requirement: "8(a) Set-Aside Eligibility", capability: "8(a) Certification Active", status: "match" as const },
    { requirement: "FedRAMP Moderate Authorization", capability: "In Progress (Q2 2026)", status: "partial" as const },
    { requirement: "Cloud Migration Experience (3 contracts)", capability: "5 Relevant Contracts", status: "match" as const },
    { requirement: "GSA Schedule 70", capability: "Not Held", status: "gap" as const },
    { requirement: "DOE Past Performance", capability: "2 Active DOE Contracts", status: "match" as const },
  ],
};

export default function BidBrief() {
  const { opportunityId } = useParams();
  const navigate = useNavigate();
  const { company } = useCompany();
  const { partners } = usePartners();
  const { items: pipelineItems } = usePipeline();

  const data = opportunityId && briefDataById[opportunityId] 
    ? briefDataById[opportunityId] 
    : defaultBriefData;

  // Get pipeline item for this opportunity
  const pipelineItem = pipelineItems.find(p => p.id === opportunityId);
  const pWin = pipelineItem?.pWin ?? data.pWin;

  // Get recommended partners
  const recommendedPartners = partners.slice(0, 2).map(p => ({
    name: p.name,
    reason: p.certifications.includes("FedRAMP") 
      ? "Provides FedRAMP Moderate authorization coverage" 
      : p.certifications.includes("GSA Schedule")
        ? "Holds GSA Schedule 70 for vehicle access"
        : `Brings ${p.socioEconomicStatuses[0]} certification`,
    certifications: p.certifications.slice(0, 3),
  }));

  const handlePrint = () => {
    window.print();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "gap":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Generate AI Win Themes based on company data and opportunity
  const winThemes = [
    {
      theme: "Proven Technical Excellence",
      detail: `Our ${company.primaryNaics === data.naics ? "exact NAICS match" : "aligned NAICS code"} (${company.primaryNaics}) demonstrates deep domain expertise in this sector.`,
    },
    {
      theme: "Compliant Set-Aside Status",
      detail: company.socioEconomicStatuses.some(s => data.setAside.includes(s) || s === "8(a)")
        ? `Active ${company.socioEconomicStatuses.join(", ")} certification(s) meet the ${data.setAside} set-aside requirement.`
        : `Strategic teaming arrangement provides ${data.setAside} compliance pathway.`,
    },
    {
      theme: "Agency Relationship Advantage",
      detail: `Established past performance with ${data.agency} reduces perceived risk and demonstrates mission understanding.`,
    },
    {
      theme: "Ready-to-Deploy Team",
      detail: data.requirements.filter(r => r.status === "match").length >= 3
        ? "Pre-qualified team with proven capability alignment minimizes ramp-up time."
        : "Teaming partners fill capability gaps, creating a comprehensive solution.",
    },
    {
      theme: "Competitive Pricing Position",
      detail: "Lean operational model enables aggressive pricing while maintaining quality standards.",
    },
  ];

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-container { 
            max-width: 100% !important; 
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Navigation - hidden on print */}
        <header className="no-print border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => navigate(`/opportunity/${opportunityId || "cloud-infra-modernization"}`)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Opportunity
            </button>
            <Button 
              onClick={handlePrint}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print / Export PDF
            </Button>
          </div>
        </header>

        {/* Document Content */}
        <main className="print-container max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <section className="mb-10 pb-8 border-b border-gray-200">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Bid Brief</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
                <p className="text-lg text-gray-600">{data.agency}</p>
                <p className="text-sm text-gray-500 mt-1">Solicitation: {data.solicitationNumber}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-3xl font-bold text-green-600">{data.match}</span>
                  <span className="text-xl text-gray-400">/100</span>
                </div>
              </div>
            </div>
          </section>

          {/* Win Themes (Executive Summary) */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Win Themes
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                {winThemes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.theme}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-gray-400 italic">
                AI-generated win themes (simulated)
              </p>
            </div>
          </section>

          {/* Capability Comparison Table */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Capability Comparison
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">RFP Requirement</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Our Capability</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-24">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.requirements.map((req, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.requirement}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.capability}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {getStatusIcon(req.status)}
                          <span className={`text-xs font-medium capitalize ${
                            req.status === "match" ? "text-green-600" :
                            req.status === "partial" ? "text-amber-600" : "text-red-600"
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Proposed Team */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Proposed Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prime Contractor */}
              <div className="rounded-lg border border-gray-200 p-5 bg-blue-50/30">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">Prime</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{company.legalBusinessName}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  NAICS: {company.primaryNaics} • UEI: {company.uei.slice(-4)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {company.socioEconomicStatuses.map(status => (
                    <Badge key={status} variant="outline" className="text-xs border-gray-300 text-gray-600">
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Teaming Partners */}
              {recommendedPartners.map((partner, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Partner</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{partner.reason}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.certifications.map(cert => (
                      <Badge key={cert} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Financial Snapshot */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Financial Snapshot
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 w-1/2">Estimated Contract Value</td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900">{data.estValue}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-700">Probability of Win (P(Win))</td>
                    <td className="px-4 py-4 text-sm font-bold text-green-600">{pWin}%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-4 text-sm font-medium text-gray-700">Expected Margin</td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900">{data.expectedMargin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Generated by RFP Simplify • {new Date().toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
