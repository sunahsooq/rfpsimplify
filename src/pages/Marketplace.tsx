import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  Send,
  Inbox,
  Globe,
  Users,
  Shield,
  Clock,
  ArrowRight,
  Plus,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type RequestStatus = "New" | "In Review" | "Accepted" | "Pending" | "Declined";

interface IncomingRequest {
  id: number;
  opportunity: string;
  agency: string;
  company: string;
  role: "Prime" | "Sub";
  certifications: string[];
  message: string;
  status: RequestStatus;
  date: string;
}

interface OutgoingRequest {
  id: number;
  opportunity: string;
  agency: string;
  partner: string;
  role: "Prime" | "Sub";
  sentDate: string;
  status: RequestStatus;
}

interface OpenOpportunity {
  id: number;
  name: string;
  agency: string;
  seeking: "Prime" | "Sub" | "Both";
  certifications: string[];
  match: number;
  dueDate: string;
}

const incomingRequests: IncomingRequest[] = [
  {
    id: 1,
    opportunity: "Cloud Infrastructure Modernization",
    agency: "Department of Energy",
    company: "CyberShield Solutions",
    role: "Sub",
    certifications: ["FedRAMP Moderate", "GSA Schedule 70"],
    message: "We're interested in supporting your DOE bid. Our FedRAMP authorization and cloud expertise would strengthen the proposal...",
    status: "New",
    date: "Jan 20, 2026",
  },
  {
    id: 2,
    opportunity: "Zero Trust Network Upgrade",
    agency: "Department of Homeland Security",
    company: "FedCloud Partners",
    role: "Prime",
    certifications: ["CMMC Level 2", "ISO 27001"],
    message: "Looking for a strong sub with DHS past performance. Your cybersecurity credentials make you an ideal partner...",
    status: "In Review",
    date: "Jan 18, 2026",
  },
  {
    id: 3,
    opportunity: "Data Platform Consolidation",
    agency: "GSA",
    company: "Innovation GovTech",
    role: "Sub",
    certifications: ["FedRAMP", "SOC 2"],
    message: "Would like to discuss teaming on the upcoming GSA data platform opportunity...",
    status: "Accepted",
    date: "Jan 15, 2026",
  },
];

const outgoingRequests: OutgoingRequest[] = [
  {
    id: 1,
    opportunity: "Cybersecurity Monitoring",
    agency: "DoD",
    partner: "SecureTeaming Inc",
    role: "Sub",
    sentDate: "Jan 19, 2026",
    status: "Pending",
  },
  {
    id: 2,
    opportunity: "Application Modernization",
    agency: "VA",
    partner: "FedCloud Partners",
    role: "Prime",
    sentDate: "Jan 12, 2026",
    status: "Accepted",
  },
];

const openOpportunities: OpenOpportunity[] = [
  {
    id: 1,
    name: "Enterprise Cloud Migration",
    agency: "Treasury",
    seeking: "Sub",
    certifications: ["FedRAMP High", "CMMC Level 2"],
    match: 85,
    dueDate: "Feb 15, 2026",
  },
  {
    id: 2,
    name: "IT Infrastructure Support",
    agency: "HHS",
    seeking: "Prime",
    certifications: ["GSA Schedule 70", "ISO 27001"],
    match: 72,
    dueDate: "Mar 1, 2026",
  },
  {
    id: 3,
    name: "Secure Communications Platform",
    agency: "DoD",
    seeking: "Both",
    certifications: ["CMMC Level 3", "FedRAMP High"],
    match: 68,
    dueDate: "Feb 28, 2026",
  },
];

const statusColors: Record<RequestStatus, string> = {
  New: "bg-primary/20 text-primary border-primary/30",
  "In Review": "bg-warning/20 text-warning border-warning/30",
  Accepted: "bg-success/20 text-success border-success/30",
  Pending: "bg-warning/20 text-warning border-warning/30",
  Declined: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function Marketplace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Teaming Marketplace
            </h1>
            <p className="text-muted-foreground">
              Manage teaming requests across active opportunities
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Post Teaming Request
          </Button>
        </div>

        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList className="bg-[#1a2540] border border-[#334155] p-1 w-full sm:w-auto">
            <TabsTrigger 
              value="incoming" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex-1 sm:flex-none"
            >
              <Inbox className="h-4 w-4 mr-2" />
              Incoming
              <Badge className="ml-2 bg-primary/30 text-primary-foreground text-xs">
                {incomingRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="outgoing"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex-1 sm:flex-none"
            >
              <Send className="h-4 w-4 mr-2" />
              Outgoing
              <Badge className="ml-2 bg-muted text-muted-foreground text-xs">
                {outgoingRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="open"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex-1 sm:flex-none"
            >
              <Globe className="h-4 w-4 mr-2" />
              Open
              <Badge className="ml-2 bg-muted text-muted-foreground text-xs">
                {openOpportunities.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests Tab */}
          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.length > 0 ? (
              incomingRequests.map((request) => (
                <Card key={request.id} className="bg-[#1a2540] border-[#334155] hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">
                            {request.opportunity}
                          </h3>
                          <Badge className={statusColors[request.status]}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{request.agency}</span>
                          <span className="text-[#334155]">•</span>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <span className="text-foreground font-medium">{request.company}</span>
                          </div>
                          <Badge variant="outline" className="border-[#334155] text-muted-foreground">
                            Seeking {request.role}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1.5">
                            {request.certifications.map((cert) => (
                              <Badge 
                                key={cert}
                                variant="secondary"
                                className="bg-[#2a334f] text-foreground border-[#334155] text-xs"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-2 p-3 rounded-lg bg-[#2a334f]/50">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {request.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Received {request.date}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-36">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-[#334155] hover:bg-[#2a334f] w-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-success/20 text-success hover:bg-success/30 border border-success/30 w-full"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-destructive/50 text-destructive hover:bg-destructive/10 w-full"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                    <Inbox className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No incoming requests
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You don't have any teaming requests yet. Complete your company profile to attract partners.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-[#334155] hover:bg-[#2a334f]"
                    onClick={() => navigate("/company")}
                  >
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Outgoing Requests Tab */}
          <TabsContent value="outgoing" className="space-y-4">
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map((request) => (
                <Card key={request.id} className="bg-[#1a2540] border-[#334155] hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">
                            {request.opportunity}
                          </h3>
                          <Badge className={statusColors[request.status]}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{request.agency}</span>
                          <span className="text-[#334155]">•</span>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <span className="text-foreground font-medium">{request.partner}</span>
                          </div>
                          <Badge variant="outline" className="border-[#334155] text-muted-foreground">
                            Requesting as {request.role}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Sent {request.sentDate}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-36">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-[#334155] hover:bg-[#2a334f] w-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {request.status === "Pending" && (
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border-destructive/50 text-destructive hover:bg-destructive/10 w-full"
                          >
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No outgoing requests
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't sent any teaming requests yet. Discover partners to strengthen your bids.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white"
                    onClick={() => navigate("/partners/discover")}
                  >
                    Discover Partners
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Open Opportunities Tab */}
          <TabsContent value="open">
            {openOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {openOpportunities.map((opp) => (
                  <Card 
                    key={opp.id}
                    className="bg-[#2a334f] border-[#334155] rounded-2xl hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.01] transition-all duration-200"
                  >
                    <CardContent className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{opp.name}</h3>
                          <p className="text-sm text-muted-foreground">{opp.agency}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-success">{opp.match}%</span>
                          <div className="w-16 h-1.5 bg-[#334155] rounded-full mt-1">
                            <div 
                              className="h-full bg-success rounded-full"
                              style={{ width: `${opp.match}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Seeking */}
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Badge 
                          variant="outline"
                          className="border-primary/50 text-primary"
                        >
                          Seeking {opp.seeking === "Both" ? "Prime & Sub" : opp.seeking}
                        </Badge>
                      </div>

                      {/* Certifications */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Shield className="h-4 w-4" />
                          <span>Required</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {opp.certifications.map((cert) => (
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

                      {/* Due Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {opp.dueDate}</span>
                      </div>

                      {/* CTA */}
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white"
                      >
                        Request Teaming
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No open opportunities
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    There are no opportunities seeking partners right now. Check back soon or post your own request.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Teaming Request
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
