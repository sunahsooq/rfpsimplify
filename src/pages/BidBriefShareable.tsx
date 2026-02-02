import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Link2, FileText, CheckCircle, Calendar, MapPin, 
  Shield, Building2, Users, DollarSign, Clock, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";

export default function BidBriefShareable() {
  const { id } = useParams();
  const navigate = useNavigate();

  const opportunity = {
    title: "Cloud Infrastructure Modernization Services",
    solicitationId: "DE-SOL-0012847",
    agency: "Department of Energy",
    contractType: "FFP",
    value: "$10M - $25M",
    setAside: "8(a)",
    dueDate: "2026-03-15",
    daysRemaining: 23,
    period: "5 years (Base + 4 Options)",
  };

  const scope = [
    "Cloud infrastructure assessment and migration planning",
    "Implementation of zero-trust security architecture",
    "Ongoing managed services and support",
    "Staff augmentation for cleared personnel",
  ];

  const requirements = {
    naics: "541512 - Computer Systems Design Services",
    setAside: "8(a) Small Business",
    location: "Washington, DC (on-site required)",
    certifications: [
      { name: "FedRAMP Moderate", status: "required" },
      { name: "CMMC Level 2", status: "required" },
      { name: "ISO 27001", status: "preferred" },
    ],
    preferred: [
      "3+ prior DHS/CISA contracts",
      "TS/SCI cleared staff available",
      "AWS GovCloud experience",
    ],
  };

  const strengths = [
    "Active Secret facility clearance",
    "5 successful CISA contracts ($45M total)",
    "CMMC Level 2 certified",
    "12 TS/SCI cleared engineers",
  ];

  const needs = [
    { text: "FedRAMP High authorization", priority: true },
    { text: "GSA IT Schedule 70 holder", priority: false },
    { text: "AWS GovCloud managed services experience", priority: false },
  ];

  const dates = [
    { label: "Questions Due", date: "Feb 15, 2026" },
    { label: "Proposal Due", date: "Mar 15, 2026" },
    { label: "Anticipated Award", date: "May 1, 2026" },
    { label: "Period of Performance", date: "5 years" },
  ];

  const company = {
    name: "TechSolutions Federal, Inc.",
    type: "Small Business | 8(a) Certified",
    contact: {
      name: "Sarah Chen",
      title: "Director of Capture",
      email: "sarah.chen@techsolutions.com",
      phone: "(703) 555-0123",
    },
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleExportPDF = () => {
    window.print();
    toast.success("Preparing PDF export...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white">
      {/* Header Bar */}
      <div className="bg-white border-b shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <Badge className="bg-blue-100 text-blue-700">Bid Brief</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyLink}>
              <Link2 className="h-4 w-4 mr-2" /> Copy Link
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <FileText className="h-4 w-4 mr-2" /> Export PDF
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
              <CheckCircle className="h-4 w-4 mr-2" /> Express Interest
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Link - hide on print */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors print:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-5 gap-6">
          {/* Left Column (60%) */}
          <div className="col-span-3 space-y-6">
            {/* Opportunity Header */}
            <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] rounded-2xl p-6 text-white">
              <h1 className="text-2xl font-extrabold mb-2">{opportunity.title}</h1>
              <p className="text-blue-100 mb-4">Solicitation: {opportunity.solicitationId}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-white/30">{opportunity.contractType}</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{opportunity.value}</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{opportunity.setAside}</Badge>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 inline-flex">
                <Calendar className="h-4 w-4" />
                <span>Response Due: {new Date(opportunity.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <Badge className="bg-amber-500/80 text-white ml-2">{opportunity.daysRemaining} days remaining</Badge>
              </div>
            </div>

            {/* Scope of Work */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Scope of Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Key Requirements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Key Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">NAICS</p>
                    <p className="font-medium text-slate-900">{requirements.naics}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Set-Aside</p>
                    <p className="font-medium text-slate-900">{requirements.setAside}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 text-sm">Place of Performance</p>
                  <p className="font-medium text-slate-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {requirements.location}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 mb-2 text-sm">Required Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {requirements.certifications.map((cert, idx) => (
                      <Badge
                        key={idx}
                        className={cert.status === "required" 
                          ? "bg-green-100 text-green-700 border-green-200" 
                          : "bg-slate-100 text-slate-600"}
                      >
                        {cert.status === "required" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 mb-2 text-sm">Preferred Qualifications</p>
                  <ul className="space-y-1">
                    {requirements.preferred.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Our Strengths */}
            <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-green-700">What We Bring</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strengths.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What We Need */}
            <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-amber-700">Partner Capabilities Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {needs.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                      <span className={`w-2 h-2 rounded-full ${item.priority ? "bg-red-500" : "bg-amber-500"}`} />
                      {item.text}
                      {item.priority && (
                        <Badge className="bg-red-100 text-red-700 text-xs">PRIORITY</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (40%) */}
          <div className="col-span-2 space-y-6">
            {/* Key Dates */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dates.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prepared By */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Prepared By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold">
                    TS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{company.name}</p>
                    <p className="text-sm text-slate-500">{company.type}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Contact</p>
                  <p className="font-medium text-slate-900">{company.contact.name}</p>
                  <p className="text-sm text-slate-600">{company.contact.title}</p>
                  <p className="text-sm text-blue-600 mt-2">{company.contact.email}</p>
                  <p className="text-sm text-slate-600">{company.contact.phone}</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white">
                  <MessageSquare className="h-4 w-4 mr-2" /> Express Interest
                </Button>
              </CardContent>
            </Card>

            {/* Validity Note */}
            <p className="text-xs text-slate-400 text-center">
              This brief is valid until Mar 15, 2026. Information sourced from SAM.gov and company records.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t flex items-center justify-center gap-8 text-slate-400 text-sm print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            SAM.gov Verified
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Secure
          </div>
          <div className="flex items-center gap-2">
            <Logo size="sm" />
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4 print:hidden">
          Generated via rfpSimplify - GovCon Teaming Platform
        </p>
      </div>
    </div>
  );
}
