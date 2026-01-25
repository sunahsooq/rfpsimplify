import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Users, 
  Plug, 
  Shield, 
  Bell,
  CreditCard,
  CheckCircle2, 
  LogOut, 
  UserPlus, 
  Key,
  Camera,
  Smartphone,
  Mail,
  Info,
  Clock,
  FileText,
  Handshake,
  Target
} from "lucide-react";

const userData = {
  name: "Sarah Chen",
  email: "sarah.chen@techgov.com",
  phone: "(202) 555-0147",
  title: "Capture Manager",
  role: "Admin",
};

const teamMembers = [
  { name: "Sarah Chen", email: "sarah.chen@techgov.com", role: "Admin" },
  { name: "Michael Park", email: "m.park@techgov.com", role: "Member" },
  { name: "Jessica Williams", email: "j.williams@techgov.com", role: "Member" },
];

const integrations = [
  { name: "SAM.gov", description: "Federal contract opportunities sync", connected: true, icon: "🏛️", lastSync: "2 hours ago" },
  { name: "GovWin", description: "Intelligence and analytics platform", connected: false, icon: "📊" },
  { name: "Microsoft 365", description: "Calendar and email integration", connected: false, icon: "📧" },
  { name: "Google Workspace", description: "Calendar and email integration", connected: false, icon: "🔵" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  
  // Notification states
  const [pushEnabled, setPushEnabled] = useState(true);
  const [pushAmendments, setPushAmendments] = useState(true);
  const [pushDeadlines, setPushDeadlines] = useState(true);
  const [pushPartners, setPushPartners] = useState(true);
  const [pushMatches, setPushMatches] = useState(false);
  
  const [emailAmendments, setEmailAmendments] = useState(true);
  const [emailDeadlines, setEmailDeadlines] = useState(true);
  const [emailPartners, setEmailPartners] = useState(true);
  const [emailMatches, setEmailMatches] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(true);
  const [emailFrequency, setEmailFrequency] = useState("realtime");

  const sidebarSections = [
    { id: "account", label: "ACCOUNT", items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "security", label: "Security", icon: Shield },
      { id: "notifications", label: "Notifications", icon: Bell },
    ]},
    { id: "workspace", label: "WORKSPACE", items: [
      { id: "team", label: "Team", icon: Users },
      { id: "integrations", label: "Integrations", icon: Plug },
    ]},
    { id: "billing", label: "BILLING", items: [
      { id: "subscription", label: "Subscription", icon: CreditCard },
    ]},
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, team, and preferences
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-[250px] flex-shrink-0">
            <div className="space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.id}>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white text-2xl font-bold">
                        SC
                      </div>
                      <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium">{userData.name}</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30 mt-1">
                        {userData.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Full Name</label>
                      <Input 
                        defaultValue={userData.name} 
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Email</label>
                      <Input 
                        defaultValue={userData.email} 
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <Input 
                        defaultValue={userData.phone} 
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Job Title</label>
                      <Input 
                        defaultValue={userData.title} 
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Password</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-mono">••••••••</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" className="border-border">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Add an extra layer of security</p>
                      <p className="text-sm text-yellow-500">Not enabled</p>
                    </div>
                    <Switch />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Active Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground">2 active sessions</p>
                      <p className="text-sm text-muted-foreground">Chrome on macOS, Safari on iPhone</p>
                    </div>
                    <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out All
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                {/* Mobile Push Notifications */}
                <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">Mobile Push Notifications</CardTitle>
                          <p className="text-purple-200 text-sm">Get instant alerts on your phone</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {pushEnabled && (
                          <Badge className="bg-white/20 text-white border-0">Enabled</Badge>
                        )}
                        <Switch 
                          checked={pushEnabled} 
                          onCheckedChange={setPushEnabled}
                          className="data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  {pushEnabled && (
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-purple-200" />
                            <span className="text-sm">RFP Amendments</span>
                          </div>
                          <Switch 
                            checked={pushAmendments} 
                            onCheckedChange={setPushAmendments}
                            className="scale-90"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-200" />
                            <span className="text-sm">Deadline Reminders</span>
                          </div>
                          <Switch 
                            checked={pushDeadlines} 
                            onCheckedChange={setPushDeadlines}
                            className="scale-90"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Handshake className="h-4 w-4 text-purple-200" />
                            <span className="text-sm">Partner Responses</span>
                          </div>
                          <Switch 
                            checked={pushPartners} 
                            onCheckedChange={setPushPartners}
                            className="scale-90"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-purple-200" />
                            <span className="text-sm">New Matches</span>
                          </div>
                          <Switch 
                            checked={pushMatches} 
                            onCheckedChange={setPushMatches}
                            className="scale-90"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-purple-200 text-sm">
                        <Info className="h-4 w-4" />
                        <span>
                          Download our app for{" "}
                          <a href="#" className="underline hover:text-white">iOS</a> or{" "}
                          <a href="#" className="underline hover:text-white">Android</a>
                        </span>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Email Notifications */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">Email Notifications</CardTitle>
                        <p className="text-muted-foreground text-sm">Manage your email preferences</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-foreground">Amendment Alerts</span>
                        {pushAmendments && (
                          <Badge variant="outline" className="text-xs text-purple-500 border-purple-500/30">+PUSH</Badge>
                        )}
                      </div>
                      <Switch checked={emailAmendments} onCheckedChange={setEmailAmendments} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-foreground">Deadline Reminders</span>
                        {pushDeadlines && (
                          <Badge variant="outline" className="text-xs text-purple-500 border-purple-500/30">+PUSH</Badge>
                        )}
                      </div>
                      <Switch checked={emailDeadlines} onCheckedChange={setEmailDeadlines} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-foreground">Partner Activity</span>
                        {pushPartners && (
                          <Badge variant="outline" className="text-xs text-purple-500 border-purple-500/30">+PUSH</Badge>
                        )}
                      </div>
                      <Switch checked={emailPartners} onCheckedChange={setEmailPartners} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">New Opportunity Matches</span>
                      <Switch checked={emailMatches} onCheckedChange={setEmailMatches} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Weekly Summary</span>
                      <Switch checked={emailWeekly} onCheckedChange={setEmailWeekly} />
                    </div>

                    {/* Email Digest Frequency */}
                    <div className="pt-4">
                      <p className="text-sm font-medium text-foreground mb-3">Email Digest Frequency</p>
                      <div className="flex gap-2">
                        {["realtime", "daily", "weekly"].map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setEmailFrequency(freq)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              emailFrequency === freq
                                ? "bg-primary text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Team Section */}
            {activeSection === "team" && (
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Team Members</CardTitle>
                  <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white text-sm font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-foreground font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={
                              member.role === "Admin" 
                                ? "bg-primary/20 text-primary border-primary/30"
                                : "bg-secondary text-secondary-foreground"
                            }
                          >
                            {member.role}
                          </Badge>
                          {member.role !== "Admin" && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations Section */}
            {activeSection === "integrations" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Connected Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                      <div 
                        key={integration.name}
                        className="p-4 rounded-xl bg-muted border border-border flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <h4 className="text-foreground font-medium">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {integration.connected ? (
                            <>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">Connected</span>
                              </div>
                              {integration.lastSync && (
                                <span className="text-xs text-muted-foreground">
                                  Last sync: {integration.lastSync}
                                </span>
                              )}
                              <Button variant="outline" size="sm" className="mt-2 border-border">
                                Sync Now
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subscription Section */}
            {activeSection === "subscription" && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary to-blue-500 border-0 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="bg-white/20 text-white border-0 mb-2">Current Plan</Badge>
                        <h2 className="text-2xl font-bold">Professional</h2>
                        <p className="text-blue-100">$99/month • Billed annually</p>
                      </div>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Usage This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">AI Analysis Credits</span>
                        <span className="text-foreground">145 / 500</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "29%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Team Members</span>
                        <span className="text-foreground">3 / 10</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Partner Invites</span>
                        <span className="text-foreground">12 / 50</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "24%" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}