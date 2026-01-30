import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit2, Trash2 } from "lucide-react";

type Person = {
  id: string;
  name: string;
  title: string;
  clearance: "Secret" | "TS/SCI" | "Public Trust" | "None";
  experience: number;
  certifications: string[];
};

const SAMPLE_PERSONNEL: Person[] = [
  { id: "1", name: "John Smith", title: "Program Manager", clearance: "Secret", experience: 15, certifications: ["PMP", "ITIL"] },
  { id: "2", name: "Sarah Johnson", title: "Chief Technology Officer", clearance: "TS/SCI", experience: 20, certifications: ["CISSP", "AWS-SAP"] },
  { id: "3", name: "Michael Chen", title: "Lead Developer", clearance: "Secret", experience: 12, certifications: ["AWS-DEV", "Kubernetes"] },
  { id: "4", name: "Emily Davis", title: "Security Analyst", clearance: "TS/SCI", experience: 8, certifications: ["CISSP", "CISM", "CEH"] },
];

type Props = {
  personnel?: Person[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function KeyPersonnelSection({ personnel = SAMPLE_PERSONNEL }: Props) {
  const getClearanceBadgeStyle = (clearance: Person["clearance"]) => {
    switch (clearance) {
      case "TS/SCI":
        return "bg-primary/20 text-primary";
      case "Secret":
        return "bg-success/20 text-success";
      case "Public Trust":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Key Personnel
          </CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personnel.map((person) => (
            <div
              key={person.id}
              className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.title}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getClearanceBadgeStyle(person.clearance)}>
                  {person.clearance}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {person.experience} years experience
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {person.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
