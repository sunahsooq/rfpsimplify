import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Inbox, Send, CheckCircle, Clock, MessageSquare, User, 
  ArrowLeft, ArrowRight, Eye, Check, X, Lightbulb, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppTopNav } from "@/components/AppTopNav";

interface PartnerRequest {
  id: string;
  type: "incoming" | "outgoing";
  status: "new" | "viewed" | "interested" | "pending" | "accepted" | "declined";
  partnerName: string;
  partnerInitials: string;
  partnerLocation: string;
  partnerIndustry: string;
  opportunityTitle: string;
  opportunityAgency: string;
  opportunityDueDate: string;
  capabilities: string[];
  message: string;
  createdAt: string;
}

const mockRequests: PartnerRequest[] = [
  {
    id: "1",
    type: "incoming",
    status: "new",
    partnerName: "CyberShield Solutions",
    partnerInitials: "CS",
    partnerLocation: "Reston, VA",
    partnerIndustry: "Cybersecurity",
    opportunityTitle: "Cloud Infrastructure Modernization Services",
    opportunityAgency: "DOE",
    opportunityDueDate: "Feb 15, 2026",
    capabilities: ["FedRAMP High", "CMMC L2", "Cloud Migration"],
    message: "We're impressed by your past performance with DHS and believe our combined capabilities would create a compelling proposal...",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    type: "incoming",
    status: "viewed",
    partnerName: "CloudFirst Federal",
    partnerInitials: "CF",
    partnerLocation: "Arlington, VA",
    partnerIndustry: "Cloud Services",
    opportunityTitle: "Cybersecurity Operations Center Support",
    opportunityAgency: "DoD",
    opportunityDueDate: "Jan 30, 2026",
    capabilities: ["AWS GovCloud", "DevSecOps"],
    message: "Looking to partner on the DoD CSOC opportunity. We bring AWS expertise and cleared staff...",
    createdAt: "1 day ago",
  },
  {
    id: "3",
    type: "outgoing",
    status: "pending",
    partnerName: "SecureNet Systems",
    partnerInitials: "SN",
    partnerLocation: "McLean, VA",
    partnerIndustry: "Network Security",
    opportunityTitle: "Enterprise Network Operations",
    opportunityAgency: "State",
    opportunityDueDate: "Mar 20, 2026",
    capabilities: ["FedRAMP High", "Secret Clearance"],
    message: "Your FedRAMP High authorization and network expertise would be perfect for this opportunity...",
    createdAt: "3 days ago",
  },
  {
    id: "4",
    type: "incoming",
    status: "interested",
    partnerName: "DataTech Federal",
    partnerInitials: "DT",
    partnerLocation: "Bethesda, MD",
    partnerIndustry: "Data Analytics",
    opportunityTitle: "Data Analytics Platform Development",
    opportunityAgency: "HHS",
    opportunityDueDate: "Mar 15, 2026",
    capabilities: ["FedRAMP Moderate", "AI/ML"],
    message: "Interested in partnering on the HHS analytics platform. Our team has extensive HHS experience...",
    createdAt: "5 days ago",
  },
  {
    id: "5",
    type: "outgoing",
    status: "accepted",
    partnerName: "GovCloud Partners",
    partnerInitials: "GP",
    partnerLocation: "Herndon, VA",
    partnerIndustry: "Cloud Infrastructure",
    opportunityTitle: "Cloud Migration Services",
    opportunityAgency: "VA",
    opportunityDueDate: "Feb 28, 2026",
    capabilities: ["AWS Gov", "Azure Gov"],
    message: "Proposing a teaming arrangement for the VA cloud migration...",
    createdAt: "1 week ago",
  },
];

const recentActivity = [
  { text: "TechSecure viewed your request", time: "2h ago" },
  { text: "CloudFirst accepted invitation", time: "1d ago" },
  { text: "You sent request to DataShield", time: "2d ago" },
];

export default function PartnerRequestsInbox() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("incoming");

  const incomingRequests = mockRequests.filter(r => r.type === "incoming");
  const outgoingRequests = mockRequests.filter(r => r.type === "outgoing");
  const newCount = incomingRequests.filter(r => r.status === "new").length;

  const stats = {
    incoming: incomingRequests.length,
    outgoing: outgoingRequests.length,
    accepted: mockRequests.filter(r => r.status === "accepted").length,
    awaiting: mockRequests.filter(r => r.status === "pending" || r.status === "new" || r.status === "viewed").length,
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white",
      viewed: "bg-slate-200 text-slate-700",
      interested: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
      accepted: "bg-green-100 text-green-700",
      declined: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-slate-100 text-slate-600";
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredRequests = activeTab === "incoming" 
    ? incomingRequests 
    : activeTab === "outgoing" 
      ? outgoingRequests 
      : mockRequests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppTopNav />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Partner Requests</h1>
          <p className="text-slate-500">Manage all incoming and outgoing teaming requests</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Inbox className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.incoming}</p>
                <p className="text-xs text-slate-500">Incoming Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Send className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.outgoing}</p>
                <p className="text-xs text-slate-500">Outgoing Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.accepted}</p>
                <p className="text-xs text-slate-500">Accepted</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.awaiting}</p>
                <p className="text-xs text-slate-500">Awaiting Response</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Request List - Left Column */}
          <div className="col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-slate-100">
                    <TabsTrigger value="incoming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e40af] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white">
                      Incoming
                      {newCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{newCount}</span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="outgoing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e40af] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white">
                      Outgoing ({outgoingRequests.length})
                    </TabsTrigger>
                    <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e40af] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white">
                      All Requests ({mockRequests.length})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`bg-white rounded-xl p-5 border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                      request.type === "incoming" ? "border-l-blue-500" : "border-l-amber-500"
                    }`}
                    onClick={() => navigate(`/partner-requests/${request.id}/conversation`)}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold">
                          {request.partnerInitials}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{request.partnerName}</h3>
                          <p className="text-sm text-slate-500">{request.partnerLocation} • {request.partnerIndustry}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {request.type === "incoming" ? (
                            <><ArrowLeft className="h-3 w-3 mr-1" /> Incoming</>
                          ) : (
                            <>Outgoing <ArrowRight className="h-3 w-3 ml-1" /></>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Opportunity Context */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Re:</span> {request.opportunityTitle.length > 50 ? request.opportunityTitle.substring(0, 50) + "..." : request.opportunityTitle}
                      </p>
                      <p className="text-xs text-slate-500">{request.opportunityAgency} • Due: {request.opportunityDueDate}</p>
                    </div>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {request.capabilities.map((cap, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white">
                          {cap}
                        </Badge>
                      ))}
                    </div>

                    {/* Message Preview */}
                    <p className="text-sm text-slate-500 line-clamp-2 mb-3">{request.message}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Received: {request.createdAt}</span>
                      <div className="flex gap-2">
                        {request.type === "incoming" && request.status !== "accepted" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <Check className="h-3 w-3 mr-1" /> Accept
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" /> Message
                        </Button>
                        <Button size="sm" variant="ghost">
                          <User className="h-3 w-3 mr-1" /> Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Quick Response Templates */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Quick Responses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Interested - Let's discuss",
                  "Need more details",
                  "Not a fit right now",
                  "Schedule a call",
                ].map((template, idx) => (
                  <Button key={idx} variant="outline" size="sm" className="w-full justify-start text-sm">
                    {template}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-700">{item.text}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Partner Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-700">
                <p>• Respond within 48 hours for best results</p>
                <p>• Include specific past performance references</p>
                <p>• Be clear about your role expectations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
