import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Clock,
  Users,
  HelpCircle,
  Sparkles,
  Eye,
  FileText,
  Bell,
  Check,
  Filter,
} from "lucide-react";

type Priority = "critical" | "high" | "medium" | "low";
type NotificationType = "amendment" | "deadline" | "partner" | "qa" | "match" | "profile" | "setAside" | "team" | "summary";

interface Notification {
  id: number;
  priority: Priority;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  actionLabel?: string;
  section: "today" | "yesterday" | "thisWeek";
}

const priorityConfig: Record<Priority, { color: string; bgColor: string; icon: React.ElementType }> = {
  critical: { color: "text-destructive", bgColor: "bg-destructive/20", icon: AlertTriangle },
  high: { color: "text-warning", bgColor: "bg-warning/20", icon: Clock },
  medium: { color: "text-primary", bgColor: "bg-primary/20", icon: Bell },
  low: { color: "text-success", bgColor: "bg-success/20", icon: Check },
};

const notifications: Notification[] = [
  { id: 1, priority: "critical", type: "amendment", title: "Amendment 004 Posted", description: "Cloud Migration Services - DOE added FedRAMP High requirement", timestamp: "2 hours ago", unread: true, actionLabel: "View Amendment", section: "today" },
  { id: 2, priority: "high", type: "deadline", title: "Deadline in 3 Days", description: "Cybersecurity Ops proposal due Feb 15", timestamp: "3 hours ago", unread: true, actionLabel: "View Opportunity", section: "today" },
  { id: 3, priority: "medium", type: "partner", title: "Partner Responded", description: "CyberShield Solutions accepted your request", timestamp: "5 hours ago", unread: true, actionLabel: "View Request", section: "today" },
  { id: 4, priority: "high", type: "qa", title: "New Q&A Posted", description: "5 new questions answered for Cloud Migration", timestamp: "1 day ago", unread: false, actionLabel: "View Q&A", section: "yesterday" },
  { id: 5, priority: "medium", type: "match", title: "New Match Found", description: "89% match: Data Analytics Platform - HHS", timestamp: "1 day ago", unread: false, actionLabel: "View Opportunity", section: "yesterday" },
  { id: 6, priority: "low", type: "profile", title: "Profile View", description: "CloudFirst Federal viewed your company profile", timestamp: "1 day ago", unread: false, section: "yesterday" },
  { id: 7, priority: "critical", type: "setAside", title: "Set-Aside Changed", description: "IT Modernization changed to 8(a) only", timestamp: "3 days ago", unread: false, actionLabel: "View Details", section: "thisWeek" },
  { id: 8, priority: "high", type: "deadline", title: "Deadline in 7 Days", description: "Network Infrastructure due Feb 20", timestamp: "4 days ago", unread: false, actionLabel: "View Opportunity", section: "thisWeek" },
  { id: 9, priority: "medium", type: "team", title: "Team Invitation", description: "Michael Park invited to Pipeline", timestamp: "5 days ago", unread: false, actionLabel: "View", section: "thisWeek" },
  { id: 10, priority: "low", type: "summary", title: "Weekly Summary Ready", description: "Your weekly pipeline report is ready", timestamp: "6 days ago", unread: false, actionLabel: "View Report", section: "thisWeek" },
];

const typeFilters = ["All Types", "Amendments", "Deadlines", "Partner Activity", "Q&A Updates", "New Matches"];
const priorityFilters: { label: string; value: Priority }[] = [
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export default function NotificationsNew() {
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (statusFilter === "unread") return n.unread;
    if (statusFilter === "read") return !n.unread;
    return true;
  });

  const todayNotifications = filteredNotifications.filter((n) => n.section === "today");
  const yesterdayNotifications = filteredNotifications.filter((n) => n.section === "yesterday");
  const thisWeekNotifications = filteredNotifications.filter((n) => n.section === "thisWeek");

  const priorityCounts = {
    critical: notifications.filter((n) => n.priority === "critical").length,
    high: notifications.filter((n) => n.priority === "high").length,
    medium: notifications.filter((n) => n.priority === "medium").length,
    low: notifications.filter((n) => n.priority === "low").length,
  };

  const renderNotification = (notification: Notification) => {
    const config = priorityConfig[notification.priority];
    const Icon = config.icon;

    return (
      <div
        key={notification.id}
        className={`p-4 rounded-xl transition-colors ${
          notification.unread
            ? "bg-primary/5 border-l-4 border-l-primary"
            : "bg-card hover:bg-secondary/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`h-10 w-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-foreground">{notification.title}</h4>
              {notification.unread && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
              {notification.actionLabel && (
                <Button size="sm" variant="outline" className="h-7 text-xs border-border">
                  {notification.actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <div className="flex">
        {/* Left Filters */}
        <aside className="w-[250px] min-h-[calc(100vh-70px)] border-r border-border bg-card p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </h2>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-2">By Type</h3>
            <div className="space-y-2">
              {typeFilters.map((filter) => (
                <label key={filter} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  <Checkbox defaultChecked={filter === "All Types"} />
                  {filter}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-2">By Status</h3>
            <div className="space-y-2">
              {[
                { label: "All", value: "all" as const },
                { label: "Unread only", value: "unread" as const },
                { label: "Read", value: "read" as const },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === option.value}
                    onChange={() => setStatusFilter(option.value)}
                    className="text-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">By Priority</h3>
            <div className="space-y-2">
              {priorityFilters.map((filter) => {
                const config = priorityConfig[filter.value];
                return (
                  <label key={filter.value} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    <Checkbox />
                    <span className={`h-2 w-2 rounded-full ${config.bgColor.replace("/20", "")}`} />
                    {filter.label}
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Notifications List */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>

          <ScrollArea className="h-[calc(100vh-180px)]">
            {todayNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3">Today</h2>
                <div className="space-y-3">
                  {todayNotifications.map(renderNotification)}
                </div>
              </div>
            )}

            {yesterdayNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3">Yesterday</h2>
                <div className="space-y-3">
                  {yesterdayNotifications.map(renderNotification)}
                </div>
              </div>
            )}

            {thisWeekNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3">This Week</h2>
                <div className="space-y-3">
                  {thisWeekNotifications.map(renderNotification)}
                </div>
              </div>
            )}
          </ScrollArea>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[300px] border-l border-border p-6">
          <Card className="p-4 bg-card border-border rounded-[20px] mb-4">
            <h3 className="font-semibold text-foreground mb-3">Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-destructive">Critical</span>
                <span className="font-medium text-foreground">{priorityCounts.critical}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-warning">High</span>
                <span className="font-medium text-foreground">{priorityCounts.high}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary">Medium</span>
                <span className="font-medium text-foreground">{priorityCounts.medium}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-success">Low</span>
                <span className="font-medium text-foreground">{priorityCounts.low}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-2 mb-4">
            <Button variant="outline" className="w-full border-border">Mark All Read</Button>
            <Button className="w-full gradient-primary text-primary-foreground">View Critical Only</Button>
          </div>

          <Card className="p-4 bg-card border-border rounded-[20px]">
            <h3 className="font-semibold text-foreground mb-3">Email Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email notifications</span>
                <input type="checkbox" defaultChecked className="toggle" />
              </label>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Frequency</label>
                <Select defaultValue="daily">
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
