import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Handshake, AlertTriangle } from "lucide-react";

type Props = {
  preferredRoles: string[];
  seekingPartnersWith: string[];
  onSave: (roles: string[], seeking: string[]) => void;
};

const ROLE_OPTIONS = [
  { id: "prime", label: "Prime Contractor" },
  { id: "sub", label: "Subcontractor" },
  { id: "jv", label: "Joint Venture Partner" },
  { id: "mentor-protege", label: "Mentor-Protégé Relationship" },
];

const SEEKING_OPTIONS = [
  { id: "fedramp-high", label: "FedRAMP High", isGap: true },
  { id: "cmmc-l2", label: "CMMC Level 2", isGap: true },
  { id: "secret-clearance", label: "Secret Clearance", isGap: false },
  { id: "gsa-schedule", label: "GSA Schedule Holder", isGap: true },
  { id: "8a", label: "8(a) Certification", isGap: false },
  { id: "hubzone", label: "HUBZone Certification", isGap: false },
  { id: "sdvosb", label: "SDVOSB Certification", isGap: false },
  { id: "wosb", label: "WOSB Certification", isGap: false },
];

export function TeamingPreferencesSection({ 
  preferredRoles = ["prime", "sub"], 
  seekingPartnersWith = ["fedramp-high", "cmmc-l2", "gsa-schedule"],
  onSave 
}: Partial<Props>) {
  const [roles, setRoles] = useState<string[]>(preferredRoles);
  const [seeking, setSeeking] = useState<string[]>(seekingPartnersWith);

  const handleRoleToggle = (roleId: string) => {
    const newRoles = roles.includes(roleId)
      ? roles.filter((r) => r !== roleId)
      : [...roles, roleId];
    setRoles(newRoles);
    onSave?.(newRoles, seeking);
  };

  const handleSeekingToggle = (id: string) => {
    const newSeeking = seeking.includes(id)
      ? seeking.filter((s) => s !== id)
      : [...seeking, id];
    setSeeking(newSeeking);
    onSave?.(roles, newSeeking);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Handshake className="h-5 w-5 text-primary" />
          Teaming Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preferred Roles */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Preferred Role in Teaming Arrangements</h4>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_OPTIONS.map((role) => (
              <label
                key={role.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer"
              >
                <Checkbox
                  checked={roles.includes(role.id)}
                  onCheckedChange={() => handleRoleToggle(role.id)}
                />
                <span className="text-sm text-foreground">{role.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seeking Partners With */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Seeking Partners With</h4>
          <div className="grid grid-cols-2 gap-3">
            {SEEKING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer"
              >
                <Checkbox
                  checked={seeking.includes(option.id)}
                  onCheckedChange={() => handleSeekingToggle(option.id)}
                />
                <span className="text-sm text-foreground flex items-center gap-2">
                  {option.label}
                  {option.isGap && (
                    <Badge className="bg-warning/20 text-warning text-xs px-1.5 py-0">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Gap
                    </Badge>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
