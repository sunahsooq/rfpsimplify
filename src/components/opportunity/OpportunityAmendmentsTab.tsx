import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Calendar, AlertTriangle, Plus, Minus, Edit3 } from "lucide-react";

interface Amendment {
  number: number;
  date: string;
  type: "Admin" | "Scope" | "Deadline" | "Requirement";
  summary: string;
  changes: {
    type: "added" | "removed" | "changed";
    text: string;
  }[];
}

const amendments: Amendment[] = [
  {
    number: 4,
    date: "Jan 20, 2025",
    type: "Requirement",
    summary: "Updated FedRAMP requirement from Moderate to High",
    changes: [
      { type: "removed", text: "FedRAMP Moderate authorization required" },
      { type: "added", text: "FedRAMP High authorization required for all cloud services" },
      { type: "added", text: "Contractor must demonstrate FedRAMP High compliance within 90 days of award" },
    ],
  },
  {
    number: 3,
    date: "Jan 15, 2025",
    type: "Deadline",
    summary: "Proposal deadline extended by 15 days",
    changes: [
      { type: "removed", text: "Proposals due: January 31, 2025" },
      { type: "added", text: "Proposals due: February 15, 2025" },
    ],
  },
  {
    number: 2,
    date: "Jan 10, 2025",
    type: "Scope",
    summary: "Added data migration requirements",
    changes: [
      { type: "added", text: "Contractor shall migrate existing data from legacy Oracle database" },
      { type: "added", text: "Data migration must be completed within first 6 months of contract" },
      { type: "changed", text: "Period of performance changed from 3 years to 4 years base" },
    ],
  },
  {
    number: 1,
    date: "Jan 5, 2025",
    type: "Admin",
    summary: "Corrected POC information and clarified submission instructions",
    changes: [
      { type: "changed", text: "Updated Contracting Officer contact information" },
      { type: "added", text: "Proposals must be submitted via SAM.gov portal" },
    ],
  },
];

const typeColors = {
  Admin: "bg-muted text-muted-foreground",
  Scope: "bg-purple-500/20 text-purple-400",
  Deadline: "bg-warning/20 text-warning",
  Requirement: "bg-destructive/20 text-destructive",
};

const changeIcons = {
  added: { icon: Plus, color: "text-success" },
  removed: { icon: Minus, color: "text-destructive" },
  changed: { icon: Edit3, color: "text-warning" },
};

export function OpportunityAmendmentsTab() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="flex flex-wrap gap-4">
        <Card className="px-4 py-3 bg-background/5 border-border/50 flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <p className="text-lg font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Amendments</p>
          </div>
        </Card>
        <Card className="px-4 py-3 bg-destructive/10 border-destructive/20 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div>
            <p className="text-lg font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground">Impacting Your Bid</p>
          </div>
        </Card>
        <Card className="px-4 py-3 bg-background/5 border-border/50 flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="text-lg font-bold text-foreground">Jan 20</p>
            <p className="text-xs text-muted-foreground">Latest Amendment</p>
          </div>
        </Card>
      </div>

      {/* Amendments List */}
      <div className="space-y-4">
        {amendments.map((amendment) => (
          <Card key={amendment.number} className="p-5 bg-background/5 border-border/50">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/20 text-primary border-0 text-sm">
                  Amendment {amendment.number}
                </Badge>
                <Badge className={typeColors[amendment.type]}>
                  {amendment.type}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {amendment.date}
              </span>
            </div>
            
            <p className="font-medium text-foreground mb-4">{amendment.summary}</p>
            
            {/* Diff View */}
            <div className="space-y-2 p-4 bg-background/50 rounded-lg border border-border/30">
              {amendment.changes.map((change, idx) => {
                const Icon = changeIcons[change.type].icon;
                const color = changeIcons[change.type].color;
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-2 p-2 rounded ${
                      change.type === 'added' ? 'bg-success/10' : 
                      change.type === 'removed' ? 'bg-destructive/10' : 
                      'bg-warning/10'
                    }`}
                  >
                    <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${color}`} />
                    <span className={`text-sm ${
                      change.type === 'removed' ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}>
                      {change.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Download Link */}
      <div className="flex justify-center">
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <FileText className="h-4 w-4" />
          Download All Amendments (PDF)
        </button>
      </div>
    </div>
  );
}
