import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const AGENCIES = [
  { id: "doe", name: "DOE", fullName: "Department of Energy" },
  { id: "va", name: "VA", fullName: "Department of Veterans Affairs" },
  { id: "dhs", name: "DHS", fullName: "Department of Homeland Security" },
  { id: "dod", name: "DoD", fullName: "Department of Defense" },
  { id: "hhs", name: "HHS", fullName: "Department of Health & Human Services" },
  { id: "gsa", name: "GSA", fullName: "General Services Administration" },
  { id: "nasa", name: "NASA", fullName: "National Aeronautics & Space Administration" },
  { id: "epa", name: "EPA", fullName: "Environmental Protection Agency" },
  { id: "usda", name: "USDA", fullName: "Department of Agriculture" },
  { id: "doc", name: "DOC", fullName: "Department of Commerce" },
  { id: "doj", name: "DOJ", fullName: "Department of Justice" },
  { id: "state", name: "State", fullName: "Department of State" },
  { id: "treasury", name: "Treasury", fullName: "Department of Treasury" },
  { id: "interior", name: "DOI", fullName: "Department of the Interior" },
  { id: "labor", name: "DOL", fullName: "Department of Labor" },
  { id: "education", name: "ED", fullName: "Department of Education" },
];

type Props = {
  selectedAgencies: string[];
  onSave: (agencies: string[]) => void;
};

export function AgencyExperienceSection({ selectedAgencies = [], onSave }: Props) {
  const [selected, setSelected] = useState<string[]>(selectedAgencies);

  const handleToggle = (agencyId: string) => {
    const newSelected = selected.includes(agencyId)
      ? selected.filter((id) => id !== agencyId)
      : [...selected, agencyId];
    setSelected(newSelected);
    onSave(newSelected);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building className="h-5 w-5 text-primary" />
            Agency Experience
          </CardTitle>
          <Badge variant="secondary">{selected.length} agencies selected</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Select federal agencies you have experience working with
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AGENCIES.map((agency) => {
            const isSelected = selected.includes(agency.id);
            return (
              <button
                key={agency.id}
                onClick={() => handleToggle(agency.id)}
                className={cn(
                  "p-3 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground">{agency.name}</span>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{agency.fullName}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
