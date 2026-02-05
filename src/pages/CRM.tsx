import { useState } from "react";
import { toast } from "sonner";
import { AppTopNav } from "@/components/AppTopNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Activity, 
  Eye, 
  Search, 
  Handshake, 
  TrendingUp,
  Brain,
  DollarSign,
  Clock,
  AlertTriangle,
  Download
} from "lucide-react";

const stats = [
  { label: "Active Users", value: "12", change: "+20%", icon: Users, positive: true },
  { label: "Sessions", value: "847", change: "+15%", icon: Activity, positive: true },
  { label: "Opps Viewed", value: "234", change: "+32%", icon: Eye, positive: true },
  { label: "Searches", value: "156", change: "→ Same", icon: Search, positive: null },
  { label: "Partner Requests", value: "23", change: "+44%", icon: Handshake, positive: true },
  { label: "Conversion Rate", value: "34%", change: "+8%", icon: TrendingUp, positive: true, highlighted: true },
];

const userActivity = [
  { name: "Sarah Chen", action: "Viewed Cloud Migration RFP", time: "2 min ago" },
  { name: "Michael Park", action: "Sent partner request to CyberShield", time: "15 min ago" },
  { name: "Jessica Williams", action: "Added opportunity to pipeline", time: "1 hour ago" },
  { name: "David Kim", action: "Generated bid brief", time: "2 hours ago" },
  { name: "Sarah Chen", action: "Exported compliance matrix", time: "3 hours ago" },
];

const featureUsage = [
  { name: "Partner Discovery", usage: 89 },
  { name: "Opportunity Analysis", usage: 76 },
  { name: "Pipeline Management", usage: 65 },
  { name: "Gap Analysis", usage: 58 },
  { name: "Bid Brief Generation", usage: 45 },
];

const churnRiskUsers = [
  { name: "Alex Thompson", lastActive: "14 days ago" },
  { name: "Maria Garcia", lastActive: "12 days ago" },
  { name: "Robert Lee", lastActive: "10 days ago" },
];

export default function CRM() {
  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                📊 CRM Dashboard
              </h1>
              <Badge className="bg-primary/20 text-primary">NEW</Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Track user behavior and optimize your capture strategy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <Button 
              variant="outline" 
              className="border-border"
              onClick={() => toast.success("Report exported to CSV")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className={`bg-card border-border ${stat.highlighted ? 'border-l-4 border-l-success' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className={`text-xs font-medium ${
                      stat.positive === true ? 'text-success' : 
                      stat.positive === false ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* User Activity */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Activity
                </h2>
                <div className="space-y-4">
                  {userActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{activity.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature Usage */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  📈 Feature Usage
                </h2>
                <div className="space-y-4">
                  {featureUsage.map((feature) => (
                    <div key={feature.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{feature.name}</span>
                        <span className="text-muted-foreground">{feature.usage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                          style={{ width: `${feature.usage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Behavioral Insights */}
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Behavioral Insights
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📊</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Pricing Optimization</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Users spend 3x more time on opportunities with detailed cost breakdowns. Consider adding cost estimation features.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🤝</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Partner Conversion</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Partner requests sent within 24 hours of opportunity discovery have 2x higher acceptance rate.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">⏰</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Peak Usage</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Most bid decisions are made Tuesday-Thursday 9-11am. Schedule key notifications for these windows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Attribution */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Attribution
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">$7.2M</p>
                    <p className="text-xs text-muted-foreground">Pipeline from rfpSimplify</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-success">$2.1M</p>
                    <p className="text-xs text-muted-foreground">Weighted Pipeline Value</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Partner Discovery</span>
                    <span className="text-foreground">$3.2M (44%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SAM.gov Import</span>
                    <span className="text-foreground">$2.5M (35%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manual RFP Upload</span>
                    <span className="text-foreground">$1.5M (21%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Churn Risk */}
            <Card className="bg-card border-destructive/30 border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Churn Risk Users
                </h2>
                <div className="space-y-3">
                  {churnRiskUsers.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last active: {user.lastActive}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={() => toast.success(`Re-engagement email sent to ${user.name}`)}
                      >
                        Re-engage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
