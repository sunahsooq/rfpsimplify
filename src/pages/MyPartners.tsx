import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Building2, 
  Eye, 
  Trash2,
  UserPlus,
  Shield
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

type RelationshipStatus = "Active" | "Pending" | "Past";

interface Partner {
  id: number;
  name: string;
  status: RelationshipStatus;
  certifications: string[];
  notes: string;
  since: string;
}

const myPartners: Partner[] = [
  {
    id: 1,
    name: "CyberShield Solutions",
    status: "Active",
    certifications: ["FedRAMP", "CMMC L2"],
    notes: "Primary partner for DOE cloud opportunities. Strong past performance together.",
    since: "March 2024",
  },
  {
    id: 2,
    name: "FedCloud Partners",
    status: "Pending",
    certifications: ["FedRAMP High", "SOC 2"],
    notes: "Teaming agreement under review for VA modernization bid.",
    since: "January 2026",
  },
  {
    id: 3,
    name: "SecureTeaming Inc",
    status: "Past",
    certifications: ["CMMC L2", "ISO 27001"],
    notes: "Collaborated on DHS cybersecurity contract (completed 2023).",
    since: "June 2022",
  },
];

const statusColors: Record<RelationshipStatus, string> = {
  Active: "bg-success/20 text-success border-success/30",
  Pending: "bg-warning/20 text-warning border-warning/30",
  Past: "bg-muted text-muted-foreground border-muted",
};

export default function MyPartners() {
  const navigate = useNavigate();
  const hasPartners = myPartners.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              My Partners
            </h1>
            <p className="text-muted-foreground">
              Your active and past teaming relationships
            </p>
          </div>
          <Button 
            className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white w-full sm:w-auto"
            onClick={() => navigate("/partners/discover")}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Find Partners
          </Button>
        </div>

        {hasPartners ? (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {myPartners.filter(p => p.status === "Active").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active Partners</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {myPartners.filter(p => p.status === "Pending").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#1a2540] border-[#334155]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {myPartners.filter(p => p.status === "Past").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Past Partners</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Partners Table - Desktop */}
            <Card className="bg-[#1a2540] border-[#334155] hidden md:block">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">Partner Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#334155] hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Company</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Certifications</TableHead>
                      <TableHead className="text-muted-foreground">Notes</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myPartners.map((partner) => (
                      <TableRow key={partner.id} className="border-[#334155] hover:bg-[#2a334f]/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-foreground font-medium">{partner.name}</p>
                              <p className="text-xs text-muted-foreground">Since {partner.since}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[partner.status]}>
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1.5">
                            {partner.certifications.map((cert) => (
                              <Badge 
                                key={cert}
                                variant="secondary"
                                className="bg-[#2a334f] text-foreground border-[#334155] text-xs"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-muted-foreground text-sm truncate">
                            {partner.notes}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Partners Cards - Mobile */}
            <div className="md:hidden space-y-4">
              {myPartners.map((partner) => (
                <Card key={partner.id} className="bg-[#2a334f] border-[#334155]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">{partner.name}</h3>
                          <p className="text-xs text-muted-foreground">Since {partner.since}</p>
                        </div>
                      </div>
                      <Badge className={statusColors[partner.status]}>
                        {partner.status}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Shield className="h-4 w-4" />
                        <span>Certifications</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.certifications.map((cert) => (
                          <Badge 
                            key={cert}
                            variant="secondary"
                            className="bg-[#1a2540] text-foreground border-[#334155] text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">
                      {partner.notes}
                    </p>

                    <div className="flex gap-2 pt-3 border-t border-[#334155]">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-[#334155] hover:bg-[#3a4560]"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-destructive/50 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <Card className="bg-[#1a2540] border-[#334155]">
            <CardContent className="py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No partners yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You have no active partners yet. Discover partners to strengthen your bids.
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white"
                asChild
              >
                <Link to="/partners/discover">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Discover Partners
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
