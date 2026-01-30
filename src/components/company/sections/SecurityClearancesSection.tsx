import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Users, Building2 } from "lucide-react";

type Props = {
  facilityLevel: "Secret" | "Top Secret" | "None";
  secretCount: number;
  tsSciCount: number;
  publicTrustCount: number;
};

export function SecurityClearancesSection({ 
  facilityLevel = "Secret", 
  secretCount = 8, 
  tsSciCount = 2, 
  publicTrustCount = 35 
}: Partial<Props>) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="h-5 w-5 text-primary" />
          Security Clearances
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facility Clearance */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Facility Clearance
            </h4>
            <div className={`rounded-xl p-5 text-center ${
              facilityLevel === "Top Secret" 
                ? "bg-gradient-to-br from-primary to-primary/80" 
                : facilityLevel === "Secret"
                  ? "bg-gradient-to-br from-success to-success/80"
                  : "bg-muted"
            } text-white`}>
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <p className="text-xl font-bold">{facilityLevel?.toUpperCase() || "SECRET"}</p>
              <p className="text-sm opacity-80 mt-1">Facility Clearance Level</p>
            </div>
          </div>

          {/* Cleared Personnel */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Cleared Personnel
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-success/10 border border-success/30 text-center">
                <p className="text-2xl font-bold text-success">{secretCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Secret</p>
              </div>
              <div className="rounded-xl p-4 bg-primary/10 border border-primary/30 text-center">
                <p className="text-2xl font-bold text-primary">{tsSciCount}</p>
                <p className="text-xs text-muted-foreground mt-1">TS/SCI</p>
              </div>
              <div className="rounded-xl p-4 bg-muted border border-border text-center">
                <p className="text-2xl font-bold text-foreground">{publicTrustCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Public Trust</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
