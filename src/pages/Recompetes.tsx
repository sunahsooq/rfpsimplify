import { AppTopNav } from "@/components/AppTopNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  AlertTriangle,
  Clock,
  Eye,
  Building2
} from "lucide-react";

const stats = [
  { label: "Upcoming Recompetes", value: "8", color: "text-foreground" },
  { label: "Expiring <90 Days", value: "2", color: "text-destructive", border: "border-l-destructive" },
  { label: "90-180 Days", value: "3", color: "text-warning", border: "border-l-warning" },
  { label: "180+ Days", value: "3", color: "text-muted-foreground" },
];

const recompetes = [
  {
    id: 1,
    contract: "DOE Cloud Infrastructure Support",
    agency: "Department of Energy",
    incumbent: "Booz Allen Hamilton",
    value: "$8.5M",
    expires: "45 days",
    expiresDate: "Mar 15, 2026",
    rewinRate: 85,
    yourFit: 72,
    urgent: true,
  },
  {
    id: 2,
    contract: "VA Healthcare IT Modernization",
    agency: "Department of Veterans Affairs",
    incumbent: "Leidos",
    value: "$12.2M",
    expires: "67 days",
    expiresDate: "Apr 5, 2026",
    rewinRate: 78,
    yourFit: 85,
    urgent: true,
  },
  {
    id: 3,
    contract: "DHS Cybersecurity Operations",
    agency: "Department of Homeland Security",
    incumbent: "SAIC",
    value: "$15.8M",
    expires: "120 days",
    expiresDate: "May 28, 2026",
    rewinRate: 82,
    yourFit: 68,
    urgent: false,
  },
  {
    id: 4,
    contract: "GSA Data Analytics Platform",
    agency: "General Services Administration",
    incumbent: "Accenture Federal",
    value: "$5.2M",
    expires: "145 days",
    expiresDate: "Jun 20, 2026",
    rewinRate: 75,
    yourFit: 88,
    urgent: false,
  },
  {
    id: 5,
    contract: "Treasury Financial Systems",
    agency: "Department of Treasury",
    incumbent: "IBM Federal",
    value: "$22.5M",
    expires: "180 days",
    expiresDate: "Jul 25, 2026",
    rewinRate: 90,
    yourFit: 45,
    urgent: false,
  },
  {
    id: 6,
    contract: "HHS Medicare Data Services",
    agency: "Department of Health & Human Services",
    incumbent: "CGI Federal",
    value: "$18.9M",
    expires: "210 days",
    expiresDate: "Aug 22, 2026",
    rewinRate: 72,
    yourFit: 78,
    urgent: false,
  },
];

export default function Recompetes() {
  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <RefreshCw className="h-7 w-7" />
            Recompete Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Track expiring contracts and identify recompete opportunities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className={`bg-card border-border ${stat.border ? `border-l-4 ${stat.border}` : ''}`}
            >
              <CardContent className="p-4">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recompete Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Contract</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Agency</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Incumbent</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Value</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Expires</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Re-win Rate</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Your Fit</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recompetes.map((item) => (
                    <tr 
                      key={item.id} 
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-medium text-foreground">{item.contract}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{item.agency}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground">{item.incumbent}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-foreground">{item.value}</span>
                      </td>
                      <td className="p-4">
                        <Badge 
                          className={`${
                            item.urgent 
                              ? 'bg-destructive/20 text-destructive border-destructive/30' 
                              : parseInt(item.expires) <= 180 
                                ? 'bg-warning/20 text-warning border-warning/30'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {item.expires}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{item.expiresDate}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            item.rewinRate >= 80 ? 'text-warning' : 'text-foreground'
                          }`}>
                            {item.rewinRate}%
                          </span>
                          {item.rewinRate >= 80 && (
                            <AlertTriangle className="h-4 w-4 text-warning" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.yourFit >= 80 ? 'bg-success' : 
                                item.yourFit >= 60 ? 'bg-warning' : 
                                'bg-destructive'
                              }`}
                              style={{ width: `${item.yourFit}%` }}
                            />
                          </div>
                          <span className="text-sm text-foreground">{item.yourFit}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-border">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="bg-primary text-white">
                            Track
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Recompete data from USAspending.gov and FPDS. Re-win rates calculated from historical award patterns.
        </p>
      </main>
    </div>
  );
}
