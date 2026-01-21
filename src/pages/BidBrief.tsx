import { useParams } from "react-router-dom";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Target,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

// Demo data for the bid brief
const briefData = {
  id: "1",
  opportunity: "Cloud Infrastructure Modernization",
  agency: "Department of Energy",
  stage: "Qualified",
  match: 78,
  summary: "The DOE is seeking a contractor to modernize its legacy cloud infrastructure across 12 regional facilities. This opportunity represents a strategic fit with our core cloud migration capabilities and past DOE experience. The scope includes hybrid cloud architecture design, FedRAMP-compliant implementation, and managed services transition. While the technical requirements align well with our team's expertise, vehicle and compliance gaps present moderate risk that can be addressed through teaming.",
  value: "$4.2M",
  dueDate: "Feb 15, 2026",
  daysUntilDue: 25,
  contractType: "IDIQ Task Order",
  setAside: "Small Business",
  recommendation: "BID with Partner",
  pWinBase: 52,
  pWinWithPartner: 78,
  keyDrivers: [
    "Strong technical fit with cloud migration and modernization capabilities",
    "Existing DOE past performance provides credibility advantage",
    "FedRAMP gap can be fully mitigated via CyberShield partnership",
    "Competitive risk: incumbent has 3-year relationship but mixed CPARS",
    "Pricing strategy supports competitive positioning"
  ],
  gaps: [
    { name: "FedRAMP Authorization", status: "warn", risk: "Medium", note: "Partner coverage available" },
    { name: "GSA Schedule 70", status: "fail", risk: "High", note: "Requires teaming agreement" },
    { name: "Past Performance", status: "pass", risk: "Low", note: "3 relevant contracts" },
    { name: "Pricing Competitiveness", status: "warn", risk: "Medium", note: "Market analysis pending" },
    { name: "Technical Capability", status: "pass", risk: "Low", note: "Core competency" },
    { name: "Key Personnel", status: "pass", risk: "Low", note: "Team identified" },
  ],
  mitigationNote: "Primary risks can be mitigated through teaming with CyberShield Solutions (FedRAMP/GSA) and refined pricing strategy based on competitive analysis.",
  partners: [
    { name: "CyberShield Solutions", fit: "High", coverage: "FedRAMP Moderate + GSA Schedule 70" },
    { name: "FedCloud Partners", fit: "Medium", coverage: "Additional DOE past performance" },
  ],
  decisionNotes: "Decision rationale: Strong strategic fit outweighs vehicle gaps given available teaming options. Recommend proceeding to capture phase with partner negotiations as priority action. Follow-up: Complete teaming agreement with CyberShield by Jan 30. Assumptions: Partner pricing will support competitive total evaluated price.",
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pass":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "warn":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "fail":
      return <XCircle className="h-5 w-5 text-destructive" />;
    default:
      return null;
  }
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-success/20 text-success border-success/30";
    case "Medium":
      return "bg-warning/20 text-warning border-warning/30";
    case "High":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function BidBrief() {
  const { opportunityId } = useParams();
  const data = briefData; // Use demo data

  const isUrgent = data.daysUntilDue < 30;

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Link */}
        <Link 
          to={`/opportunity/${opportunityId || "1"}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunity
        </Link>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Bid Brief
            </h1>
            <p className="text-lg text-muted-foreground">
              {data.opportunity} • <span className="text-foreground">{data.agency}</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Match & Stage */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-2xl font-bold text-success">{data.match}%</span>
                <div className="w-16 h-1.5 bg-[#334155] rounded-full mt-1">
                  <div 
                    className="h-full bg-success rounded-full"
                    style={{ width: `${data.match}%` }}
                  />
                </div>
              </div>
              <Badge className="bg-success/20 text-success border-success/30 text-sm px-3 py-1">
                {data.stage}
              </Badge>
            </div>

            {/* Decision Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none bg-success hover:bg-success/90 text-white">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as BID
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none border-destructive/50 text-destructive hover:bg-destructive/10">
                <XCircle className="h-4 w-4 mr-2" />
                Mark as NO-BID
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Executive Summary */}
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {data.summary}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#334155]">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <DollarSign className="h-4 w-4" />
                      Est. Value
                    </div>
                    <p className="text-foreground font-semibold">{data.value}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      Due Date
                    </div>
                    <p className={`font-semibold ${isUrgent ? "text-destructive" : "text-foreground"}`}>
                      {data.dueDate}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <FileText className="h-4 w-4" />
                      Contract Type
                    </div>
                    <p className="text-foreground font-semibold">{data.contractType}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Target className="h-4 w-4" />
                      Set-Aside
                    </div>
                    <p className="text-foreground font-semibold">{data.setAside}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: AI Bid Recommendation */}
            <Card className="bg-[#1a2540] border-[#334155] shadow-lg shadow-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Bid Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recommendation Badge */}
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-warning/15 text-warning border-warning/30 text-base px-4 py-2">
                    Recommended: {data.recommendation}
                  </Badge>
                </div>

                {/* P(win) */}
                <div className="flex flex-wrap gap-6 p-4 rounded-lg bg-[#2a334f]">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Base P(win)</p>
                    <p className="text-2xl font-bold text-muted-foreground">{data.pWinBase}%</p>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-success mx-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">With Partner</p>
                    <p className="text-2xl font-bold text-success">{data.pWinWithPartner}%</p>
                  </div>
                </div>

                {/* Key Drivers */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Key Decision Drivers</p>
                  <ul className="space-y-2">
                    {data.keyDrivers.map((driver, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {driver}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Gaps & Risks Snapshot */}
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Gaps & Risks Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.gaps.map((gap, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#2a334f] border border-[#334155]"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(gap.status)}
                        <div>
                          <p className="text-sm font-medium text-foreground">{gap.name}</p>
                          <p className="text-xs text-muted-foreground">{gap.note}</p>
                        </div>
                      </div>
                      <Badge className={getRiskBadge(gap.risk)}>
                        {gap.risk}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Mitigation: </span>
                    {data.mitigationNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Section 4: Teaming Status */}
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  Teaming Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">{partner.name}</span>
                      </div>
                      <Badge className={
                        partner.fit === "High" 
                          ? "bg-success/20 text-success border-success/30" 
                          : "bg-warning/20 text-warning border-warning/30"
                      }>
                        {partner.fit} Fit
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Covers: {partner.coverage}
                    </p>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  className="w-full border-[#334155] hover:bg-[#2a334f] mt-2"
                >
                  Find More Partners
                </Button>
              </CardContent>
            </Card>

            {/* Section 5: Decision Notes */}
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Decision Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.decisionNotes}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-muted-foreground hover:text-foreground"
                >
                  Edit Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
