import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Users,
  ArrowRight,
  Target,
  Calendar,
  FileCheck
} from "lucide-react";

type NotificationType = "opportunity" | "pipeline" | "teaming" | "ai";
type FilterType = "all" | NotificationType;

interface Notification {
  id: number;
  type: NotificationType;
  icon: "alert" | "check" | "ai" | "teaming" | "pipeline" | "calendar";
  message: string;
  context: string;
  timestamp: string;
  unread: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "opportunity",
    icon: "alert",
    message: "Opportunity due in 5 days",
    context: "Cloud Infrastructure Modernization • DOE",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "teaming",
    icon: "teaming",
    message: "New teaming request received",
    context: "Zero Trust Network Upgrade • DHS",
    timestamp: "4 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "pipeline",
    icon: "pipeline",
    message: "Pipeline stage updated: Pursuing",
    context: "Cybersecurity Monitoring • DoD",
    timestamp: "6 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "ai",
    icon: "ai",
    message: "FedRAMP gap detected",
    context: "Application Modernization • VA",
    timestamp: "8 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "teaming",
    icon: "check",
    message: "Partner request accepted",
    context: "CyberShield Solutions",
    timestamp: "1 day ago",
    unread: false,
  },
  {
    id: 6,
    type: "pipeline",
    icon: "check",
    message: "Capture decision marked as BID",
    context: "Cloud Infrastructure Modernization • DOE",
    timestamp: "1 day ago",
    unread: false,
  },
  {
    id: 7,
    type: "opportunity",
    icon: "calendar",
    message: "New opportunity matches your profile",
    context: "Enterprise Cloud Migration • Treasury",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 8,
    type: "ai",
    icon: "ai",
    message: "Win probability increased to 78%",
    context: "Cloud Infrastructure Modernization • DOE",
    timestamp: "3 days ago",
    unread: false,
  },
];

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "opportunity", label: "Opportunities" },
  { value: "pipeline", label: "Pipeline" },
  { value: "teaming", label: "Teaming" },
  { value: "ai", label: "AI Insights" },
];

const getIcon = (icon: Notification["icon"]) => {
  switch (icon) {
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "check":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "ai":
      return <Sparkles className="h-5 w-5 text-primary" />;
    case "teaming":
      return <Users className="h-5 w-5 text-primary" />;
    case "pipeline":
      return <ArrowRight className="h-5 w-5 text-primary" />;
    case "calendar":
      return <Calendar className="h-5 w-5 text-primary" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const getIconBg = (icon: Notification["icon"]) => {
  switch (icon) {
    case "alert":
      return "bg-warning/20";
    case "check":
      return "bg-success/20";
    case "ai":
    case "teaming":
    case "pipeline":
    case "calendar":
      return "bg-primary/20";
    default:
      return "bg-muted/20";
  }
};

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredNotifications = activeFilter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Recent activity and alerts across your pipeline
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#1a2540] text-muted-foreground hover:text-foreground hover:bg-[#2a334f] border border-[#334155]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`bg-[#1a2540] border-[#334155] hover:bg-[#1e2a48] transition-colors cursor-pointer ${
                  notification.unread ? "border-l-2 border-l-primary" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`h-10 w-10 rounded-full ${getIconBg(notification.icon)} flex items-center justify-center shrink-0`}>
                      {getIcon(notification.icon)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`font-medium ${notification.unread ? "text-foreground" : "text-foreground/80"}`}>
                            {notification.message}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notification.context}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.timestamp}
                          </span>
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardContent className="py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                You're all caught up
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No new notifications. Check back later for updates on your opportunities and teaming requests.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
