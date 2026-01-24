import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Shield,
  Bell,
  Users,
  Plug,
  Camera,
  Mail,
  Phone,
  Pencil,
  Trash2,
  Check,
  RefreshCw,
} from "lucide-react";

type SettingsTab = "profile" | "security" | "notifications" | "team" | "integrations";

const sidebarItems: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "team", label: "Team", icon: Users },
  { id: "integrations", label: "Integrations", icon: Plug },
];

const teamMembers = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@techgov.com", role: "Admin", initials: "SC" },
  { id: 2, name: "Michael Park", email: "m.park@techgov.com", role: "Member", initials: "MP" },
  { id: 3, name: "Jessica Williams", email: "j.williams@techgov.com", role: "Member", initials: "JW" },
];

const integrations = [
  { id: 1, name: "SAM.gov", connected: true, lastSync: "2 hours ago" },
  { id: 2, name: "GovWin", connected: false },
  { id: 3, name: "Microsoft 365", connected: false },
  { id: 4, name: "Google Workspace", connected: false },
];

export default function SettingsNew() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [notifications, setNotifications] = useState({
    amendments: true,
    deadlines: true,
    partnerActivity: true,
    newMatches: true,
    weeklySummary: true,
    mobilePush: true,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-[250px] min-h-[calc(100vh-70px)] border-r border-border bg-card p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "gradient-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8">
          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h1>
              <Card className="p-6 bg-card border-border rounded-[20px]">
                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <Avatar className="h-20 w-20 bg-gradient-to-br from-primary to-blue-400">
                      <AvatarFallback className="text-xl font-bold text-primary-foreground">SC</AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                      <Camera className="h-4 w-4 text-primary-foreground" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Sarah Chen</h3>
                    <p className="text-muted-foreground">Capture Manager</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input defaultValue="Sarah Chen" className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue="sarah.chen@techgov.com" className="bg-secondary border-border pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue="(202) 555-0147" className="bg-secondary border-border pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Job Title</label>
                    <Input defaultValue="Capture Manager" className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="gradient-primary text-primary-foreground">Save Changes</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Security Section */}
          {activeTab === "security" && (
            <div className="max-w-3xl space-y-6">
              <h1 className="text-2xl font-bold text-foreground mb-6">Security Settings</h1>

              <Card className="p-6 bg-card border-border rounded-[20px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Password</h3>
                    <p className="text-muted-foreground text-sm">••••••••</p>
                  </div>
                  <Button variant="outline" className="border-border">Change Password</Button>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border rounded-[20px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="text-muted-foreground text-sm">
                      {twoFactor ? "Enabled - Your account is protected" : "Add an extra layer of security"}
                    </p>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
              </Card>

              <Card className="p-6 bg-card border-border rounded-[20px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Active Sessions</h3>
                    <p className="text-muted-foreground text-sm">2 active sessions</p>
                  </div>
                  <Button variant="link" className="text-primary">View All</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === "notifications" && (
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h1>
              <Card className="p-6 bg-card border-border rounded-[20px] space-y-6">
                {[
                  { key: "amendments", label: "Amendment Alerts" },
                  { key: "deadlines", label: "Deadline Reminders" },
                  { key: "partnerActivity", label: "Partner Activity" },
                  { key: "newMatches", label: "New Opportunity Matches" },
                  { key: "weeklySummary", label: "Weekly Summary Email" },
                  { key: "mobilePush", label: "Mobile Push Notifications" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <span className="text-foreground">{item.label}</span>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* Team Section */}
          {activeTab === "team" && (
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
                <Button className="gradient-primary text-primary-foreground">Invite Member</Button>
              </div>
              <Card className="bg-card border-border rounded-[20px] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Member</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-blue-400">
                              <AvatarFallback className="text-sm font-medium text-primary-foreground">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{member.email}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={member.role === "Admin" ? "default" : "secondary"}
                            className={member.role === "Admin" ? "bg-primary text-primary-foreground" : ""}
                          >
                            {member.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* Integrations Section */}
          {activeTab === "integrations" && (
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold text-foreground mb-6">Integrations</h1>
              <div className="grid grid-cols-2 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="p-6 bg-card border-border rounded-[20px]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                          <Plug className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{integration.name}</h3>
                          {integration.connected && (
                            <p className="text-sm text-muted-foreground">Last sync: {integration.lastSync}</p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={integration.connected ? "default" : "secondary"}
                        className={integration.connected ? "bg-success text-success-foreground" : ""}
                      >
                        {integration.connected ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" /> Connected
                          </span>
                        ) : (
                          "Not Connected"
                        )}
                      </Badge>
                    </div>
                    <Button
                      variant={integration.connected ? "outline" : "default"}
                      className={integration.connected ? "w-full border-border" : "w-full gradient-primary text-primary-foreground"}
                    >
                      {integration.connected ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" /> Sync Now
                        </span>
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
