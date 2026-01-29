import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, FileText, Users, CheckCircle2, AlertTriangle, MessageSquare, Upload, Edit3 } from "lucide-react";

interface DecisionSnapshot {
  date: string;
  decision: "Pursue" | "Caution" | "No-Bid";
  pwin: number;
  readiness: number;
  notes: string;
  user: string;
}

interface ActivityLogItem {
  date: string;
  time: string;
  action: string;
  user: string;
  icon: React.ComponentType<{ className?: string }>;
}

const decisionSnapshots: DecisionSnapshot[] = [
  { date: "Jan 20, 2025", decision: "Pursue", pwin: 65, readiness: 72, notes: "Amendment 4 addressed our FedRAMP gap with partner", user: "Sarah Chen" },
  { date: "Jan 15, 2025", decision: "Caution", pwin: 45, readiness: 55, notes: "Need to address FedRAMP High requirement", user: "Sarah Chen" },
  { date: "Jan 8, 2025", decision: "Pursue", pwin: 55, readiness: 68, notes: "Strong initial fit, worth pursuing", user: "Mike Rodriguez" },
];

const activityLog: ActivityLogItem[] = [
  { date: "Today", time: "2:30 PM", action: "Updated capture notes with partner strategy", user: "Sarah Chen", icon: Edit3 },
  { date: "Today", time: "11:15 AM", action: "Reviewed Amendment 4 impact analysis", user: "Mike Rodriguez", icon: FileText },
  { date: "Yesterday", time: "4:45 PM", action: "Added CyberShield as teaming partner", user: "Sarah Chen", icon: Users },
  { date: "Yesterday", time: "2:00 PM", action: "Uploaded draft technical approach", user: "James Park", icon: Upload },
  { date: "Jan 20", time: "10:30 AM", action: "Changed decision from Caution to Pursue", user: "Sarah Chen", icon: CheckCircle2 },
  { date: "Jan 18", time: "3:15 PM", action: "Identified FedRAMP gap in analysis", user: "Mike Rodriguez", icon: AlertTriangle },
  { date: "Jan 15", time: "9:00 AM", action: "Initial opportunity review completed", user: "Sarah Chen", icon: FileText },
  { date: "Jan 12", time: "11:00 AM", action: "Added opportunity to pipeline", user: "Mike Rodriguez", icon: CheckCircle2 },
];

const decisionColors = {
  Pursue: "bg-success/20 text-success",
  Caution: "bg-warning/20 text-warning",
  "No-Bid": "bg-destructive/20 text-destructive",
};

export function OpportunityTrackerTab() {
  return (
    <div className="space-y-6">
      {/* Decision Snapshots */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Decision History
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {decisionSnapshots.map((snapshot, idx) => (
            <Card 
              key={idx} 
              className={`p-4 bg-background/5 border-border/50 ${idx === 0 ? 'ring-2 ring-primary/30' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{snapshot.date}</span>
                {idx === 0 && <Badge className="bg-primary/20 text-primary border-0 text-xs">Current</Badge>}
              </div>
              <Badge className={`${decisionColors[snapshot.decision]} mb-3`}>
                {snapshot.decision}
              </Badge>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center p-2 bg-background/50 rounded">
                  <p className="text-lg font-bold text-foreground">{snapshot.pwin}%</p>
                  <p className="text-xs text-muted-foreground">P(Win)</p>
                </div>
                <div className="text-center p-2 bg-background/50 rounded">
                  <p className="text-lg font-bold text-foreground">{snapshot.readiness}%</p>
                  <p className="text-xs text-muted-foreground">Readiness</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{snapshot.notes}"</p>
              <p className="text-xs text-muted-foreground mt-2">— {snapshot.user}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <Card className="p-6 bg-background/5 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Activity Log
        </h3>
        <div className="space-y-1">
          {activityLog.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 py-3 border-b border-border/30 last:border-0 hover:bg-primary/5 px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-2 min-w-[100px]">
                  <span className="text-sm font-medium text-muted-foreground">{item.date}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">by {item.user}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
          + Add Note
        </button>
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
          Schedule Review
        </button>
        <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
          Export History
        </button>
      </div>
    </div>
  );
}
