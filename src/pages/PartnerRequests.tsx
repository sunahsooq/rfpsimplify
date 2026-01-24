import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  X,
  Inbox,
  Send,
  List,
} from "lucide-react";

type RequestStatus = "New" | "Pending" | "Accepted" | "Declined";
type RequestType = "incoming" | "outgoing";

interface PartnerRequest {
  id: number;
  type: RequestType;
  partnerName: string;
  partnerInitials: string;
  location: string;
  verified: boolean;
  status: RequestStatus;
  opportunity: string;
  capabilities: string[];
  message: string;
  timestamp: string;
}

const statusColors: Record<RequestStatus, string> = {
  New: "bg-primary/20 text-primary",
  Pending: "bg-warning/20 text-warning",
  Accepted: "bg-success/20 text-success",
  Declined: "bg-destructive/20 text-destructive",
};

const requests: PartnerRequest[] = [
  { id: 1, type: "incoming", partnerName: "CyberShield Solutions", partnerInitials: "CS", location: "Arlington, VA", verified: true, status: "New", opportunity: "Cloud Migration Services - DOE", capabilities: ["Cybersecurity", "FedRAMP"], message: "We're interested in partnering on this opportunity. Our team has extensive DoD experience...", timestamp: "2 hours ago" },
  { id: 2, type: "incoming", partnerName: "DataFlow Analytics", partnerInitials: "DA", location: "Reston, VA", verified: true, status: "Pending", opportunity: "Data Platform - HHS", capabilities: ["Analytics", "AI/ML"], message: "Looking to collaborate on the HHS data platform project. We bring strong...", timestamp: "1 day ago" },
  { id: 3, type: "incoming", partnerName: "SecureNet Partners", partnerInitials: "SP", location: "Bethesda, MD", verified: false, status: "New", opportunity: "Network Infra - DOD", capabilities: ["Zero Trust"], message: "Our zero trust expertise would complement your capabilities for this...", timestamp: "2 days ago" },
  { id: 4, type: "outgoing", partnerName: "CloudFirst Federal", partnerInitials: "CF", location: "Washington, DC", verified: true, status: "Accepted", opportunity: "Cloud Services - Treasury", capabilities: ["AWS", "Azure"], message: "We'd like to partner with you on the Treasury cloud services opportunity...", timestamp: "3 days ago" },
  { id: 5, type: "outgoing", partnerName: "AgileGov Solutions", partnerInitials: "AG", location: "McLean, VA", verified: true, status: "Pending", opportunity: "Software Dev - NASA", capabilities: ["DevSecOps"], message: "Your agile expertise would be valuable for the NASA project we're pursuing...", timestamp: "5 days ago" },
  { id: 6, type: "outgoing", partnerName: "TechBridge Federal", partnerInitials: "TB", location: "Alexandria, VA", verified: false, status: "Declined", opportunity: "IT Mod - VA", capabilities: ["Legacy Systems"], message: "We're looking for a partner with legacy modernization experience for...", timestamp: "1 week ago" },
];

const stats = [
  { label: "Incoming Requests", value: "8", icon: ArrowDownLeft, color: "text-primary" },
  { label: "Outgoing Requests", value: "12", icon: ArrowUpRight, color: "text-warning" },
  { label: "Accepted", value: "5", icon: CheckCircle2, color: "text-success" },
  { label: "Pending Response", value: "9", icon: Clock, color: "text-muted-foreground" },
];

type TabType = "incoming" | "outgoing" | "all";

export default function PartnerRequests() {
  const [activeTab, setActiveTab] = useState<TabType>("incoming");

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "all") return true;
    return req.type === activeTab;
  });

  const incomingCount = requests.filter((r) => r.type === "incoming").length;
  const newCount = requests.filter((r) => r.type === "incoming" && r.status === "New").length;

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <div className="flex">
        <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Partner Requests</h1>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-4 bg-card border-border rounded-[20px]">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("incoming")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "incoming"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Inbox className="h-4 w-4" />
              Incoming {newCount > 0 && <span className="ml-1 text-xs">({newCount} new)</span>}
            </button>
            <button
              onClick={() => setActiveTab("outgoing")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "outgoing"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Send className="h-4 w-4" />
              Outgoing ({requests.filter((r) => r.type === "outgoing").length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
              All Requests ({requests.length})
            </button>
          </div>

          {/* Request Cards */}
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <Card
                key={req.id}
                className={`p-5 bg-card border-border rounded-[20px] border-l-4 ${
                  req.type === "incoming" ? "border-l-primary" : "border-l-warning"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-blue-400">
                      <AvatarFallback className="text-sm font-bold text-primary-foreground">
                        {req.partnerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground">{req.partnerName}</h3>
                        {req.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-success">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </span>
                        )}
                        <Badge className={statusColors[req.status]}>{req.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{req.location}</p>
                      <p className="text-sm text-primary font-medium mb-2">Re: {req.opportunity}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {req.capabilities.map((cap) => (
                          <span key={cap} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">{cap}</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{req.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{req.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {req.type === "incoming" && req.status !== "Accepted" && req.status !== "Declined" && (
                      <>
                        <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                          Decline
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="border-border">
                      <MessageSquare className="h-4 w-4 mr-1" /> Message
                    </Button>
                    <Button size="sm" variant="outline" className="border-border">
                      <User className="h-4 w-4 mr-1" /> Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-[300px] p-6 border-l border-border">
          <Card className="p-4 bg-card border-border rounded-[20px] mb-4">
            <h3 className="font-semibold text-foreground mb-3">Quick Response Templates</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start border-border text-sm">
                Interested - Let's discuss
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start border-border text-sm">
                Need more information
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start border-border text-sm">
                Schedule a call
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-secondary/50 border-border rounded-[20px]">
            <h3 className="font-semibold text-foreground mb-2">Tips for Successful Partnerships</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Respond to requests within 48 hours</li>
              <li>• Be clear about your capabilities</li>
              <li>• Discuss work share early</li>
              <li>• Verify certifications before committing</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
