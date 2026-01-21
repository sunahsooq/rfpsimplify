import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Users, Plug, Shield, CheckCircle2, XCircle, LogOut, UserPlus, Key } from "lucide-react";

const userData = {
  name: "Sarah Williams",
  email: "sarah.williams@acmefederal.com",
  role: "Owner",
};

const teamMembers = [
  { name: "Sarah Williams", email: "sarah.williams@acmefederal.com", role: "Owner" },
  { name: "Michael Chen", email: "m.chen@acmefederal.com", role: "Admin" },
  { name: "Jessica Rodriguez", email: "j.rodriguez@acmefederal.com", role: "Member" },
  { name: "David Thompson", email: "d.thompson@acmefederal.com", role: "Member" },
];

const integrations = [
  { name: "SAM.gov", description: "Federal contract opportunities sync", connected: true, icon: "🏛️" },
  { name: "Claude AI", description: "AI-powered analysis and recommendations", connected: true, icon: "🤖" },
  { name: "Resend", description: "Email notifications and outreach", connected: true, icon: "📧" },
  { name: "Slack", description: "Team notifications and alerts", connected: false, icon: "💬" },
];

const sessionInfo = {
  lastLogin: "January 21, 2026 at 10:32 AM",
  browser: "Chrome 120 on macOS",
  ip: "192.168.1.xxx",
  activeSessions: 2,
};

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Account & Team Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your profile, team members, and integrations
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-[#1a2540] border border-[#334155] p-1">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="team"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Plug className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white text-xl font-bold">
                    SW
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{userData.name}</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30 mt-1">
                      {userData.role}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <Input 
                      defaultValue={userData.name} 
                      className="bg-[#2a334f] border-[#334155] text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email (Read-only)</label>
                    <Input 
                      defaultValue={userData.email} 
                      readOnly
                      className="bg-[#2a334f]/50 border-[#334155] text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#334155]">
                  <Button variant="outline" className="border-[#334155] hover:bg-[#2a334f]">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white">
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-foreground">Team Members</CardTitle>
                <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#334155] hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Name</TableHead>
                        <TableHead className="text-muted-foreground">Email</TableHead>
                        <TableHead className="text-muted-foreground">Role</TableHead>
                        <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member, index) => (
                        <TableRow key={index} className="border-[#334155] hover:bg-[#2a334f]/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white text-xs font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-foreground font-medium">{member.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{member.email}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                member.role === "Owner" 
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  : member.role === "Admin"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-secondary text-secondary-foreground"
                              }
                            >
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {member.role !== "Owner" && (
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                Edit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="bg-[#1a2540] border-[#334155]">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Connected Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <div 
                      key={integration.name}
                      className="p-4 rounded-lg bg-[#2a334f] border border-[#334155] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h4 className="text-foreground font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.connected ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            <span className="text-sm text-success">Connected</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                            <Button variant="outline" size="sm" className="border-[#334155] hover:bg-[#3a4560]">
                              Connect
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Session Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                        <p className="text-sm text-muted-foreground mb-1">Last Login</p>
                        <p className="text-foreground font-medium">{sessionInfo.lastLogin}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                        <p className="text-sm text-muted-foreground mb-1">Browser</p>
                        <p className="text-foreground font-medium">{sessionInfo.browser}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                        <p className="text-sm text-muted-foreground mb-1">IP Address</p>
                        <p className="text-foreground font-medium">{sessionInfo.ip}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                        <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
                        <p className="text-foreground font-medium">{sessionInfo.activeSessions} devices</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a2540] border-[#334155]">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Security Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                      <div>
                        <h4 className="text-foreground font-medium">Logout All Sessions</h4>
                        <p className="text-sm text-muted-foreground">
                          Sign out from all devices except this one
                        </p>
                      </div>
                      <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout All
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#2a334f] border border-[#334155]">
                      <div>
                        <h4 className="text-foreground font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" className="border-[#334155] hover:bg-[#3a4560]">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
