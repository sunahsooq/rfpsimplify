import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Target,
  Eye
} from "lucide-react";

const stats = [
  { label: "Pending Review", value: "23", icon: Clock, color: "text-warning" },
  { label: "Approved Today", value: "47", icon: CheckCircle2, color: "text-success" },
  { label: "Flagged", value: "5", icon: AlertTriangle, color: "text-destructive" },
  { label: "Avg Time", value: "4.2m", icon: BarChart3, color: "text-primary" },
  { label: "Accuracy", value: "94%", icon: Target, color: "text-admin-accent" },
];

const queueItems = [
  {
    id: "1",
    title: "Cloud Infrastructure Modernization",
    solicitationId: "DE-SOL-0012847",
    source: "SAM.gov",
    agency: "DOE",
    confidence: 92,
    priority: "normal",
    flagged: false,
  },
  {
    id: "2",
    title: "Enterprise Cybersecurity Assessment",
    solicitationId: "VA-RFP-2025-0034",
    source: "SAM.gov",
    agency: "VA",
    confidence: 58,
    priority: "urgent",
    flagged: true,
  },
  {
    id: "3",
    title: "Border Security Analytics Platform",
    solicitationId: "DHS-CBP-2025-001",
    source: "GovWin",
    agency: "DHS",
    confidence: 78,
    priority: "normal",
    flagged: false,
  },
  {
    id: "4",
    title: "IT Modernization Support Services",
    solicitationId: "GSA-OASIS-2025-012",
    source: "SAM.gov",
    agency: "GSA",
    confidence: 85,
    priority: "normal",
    flagged: false,
  },
  {
    id: "5",
    title: "Healthcare Data Analytics",
    solicitationId: "HHS-CMS-2025-007",
    source: "Manual",
    agency: "HHS",
    confidence: 45,
    priority: "urgent",
    flagged: true,
  },
];

export default function AdminQAQueue() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedItems(prev => 
      prev.length === queueItems.length ? [] : queueItems.map(i => i.id)
    );
  };

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* Admin Nav */}
      <nav className="bg-admin-surface border-b border-admin-border px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-white">rfpSimplify</span>
              <Badge className="bg-admin-accent/20 text-admin-accent border-admin-accent/30 ml-2">
                ADMIN
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin/qa-queue" className="text-white font-medium">QA Queue</Link>
              <Link to="/admin/rfp-review/1" className="text-gray-400 hover:text-white transition-colors">RFP Review</Link>
            </div>
          </div>
          <Badge variant="outline" className="border-success/50 text-success">
            Production
          </Badge>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-admin-surface border-admin-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select className="h-10 rounded-lg border border-admin-border bg-admin-surface text-white px-3 text-sm">
            <option>All Sources</option>
            <option>SAM.gov</option>
            <option>GovWin</option>
            <option>Manual</option>
          </select>
          <select className="h-10 rounded-lg border border-admin-border bg-admin-surface text-white px-3 text-sm">
            <option>All Confidence</option>
            <option>Low (&lt;70%)</option>
            <option>Medium (70-90%)</option>
            <option>High (&gt;90%)</option>
          </select>
          <select className="h-10 rounded-lg border border-admin-border bg-admin-surface text-white px-3 text-sm">
            <option>All Status</option>
            <option>Pending</option>
            <option>Flagged</option>
            <option>In Review</option>
          </select>
          <select className="h-10 rounded-lg border border-admin-border bg-admin-surface text-white px-3 text-sm">
            <option>All Agencies</option>
            <option>DOE</option>
            <option>VA</option>
            <option>DHS</option>
            <option>GSA</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search RFPs..." 
              className="pl-9 bg-admin-surface border-admin-border text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-admin-accent/10 border border-admin-accent/30 rounded-lg">
            <span className="text-sm text-admin-accent">{selectedItems.length} selected</span>
            <Button size="sm" className="bg-success text-white">Approve Selected</Button>
            <Button size="sm" variant="outline" className="border-admin-border text-white">Assign</Button>
            <Button size="sm" variant="outline" className="border-admin-border text-white">Export</Button>
          </div>
        )}

        {/* Queue Table */}
        <Card className="bg-admin-surface border-admin-border">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  <th className="p-4 text-left">
                    <Checkbox 
                      checked={selectedItems.length === queueItems.length}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">RFP Title / ID</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Source</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Agency</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Confidence</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Priority</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queueItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-admin-border hover:bg-admin-bg/50 transition-colors ${
                      item.flagged ? 'bg-destructive/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.solicitationId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={
                          item.source === 'SAM.gov' 
                            ? 'bg-primary/20 text-primary' 
                            : item.source === 'GovWin'
                            ? 'bg-admin-accent/20 text-admin-accent'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {item.source}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-300">{item.agency}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-admin-border rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.confidence >= 90 ? 'bg-success' : 
                              item.confidence >= 70 ? 'bg-warning' : 
                              'bg-destructive'
                            }`}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className={`text-sm ${
                          item.confidence >= 90 ? 'text-success' : 
                          item.confidence >= 70 ? 'text-warning' : 
                          'text-destructive'
                        }`}>
                          {item.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {item.priority === 'urgent' ? (
                        <span className="text-destructive">🔴 Urgent</span>
                      ) : (
                        <span className="text-gray-400">🟢 Normal</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/admin/rfp-review/${item.id}`}>
                        <Button size="sm" className="bg-admin-accent hover:bg-admin-accent/80 text-white">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
