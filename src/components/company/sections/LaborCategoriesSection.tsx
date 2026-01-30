import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus, Trash2 } from "lucide-react";

type LaborCategory = {
  id: string;
  title: string;
  minRate: number;
  maxRate: number;
  headcount: number;
};

const SAMPLE_LCATS: LaborCategory[] = [
  { id: "1", title: "Senior Software Engineer", minRate: 125, maxRate: 175, headcount: 8 },
  { id: "2", title: "Cloud Architect", minRate: 150, maxRate: 200, headcount: 3 },
  { id: "3", title: "Project Manager", minRate: 120, maxRate: 165, headcount: 4 },
  { id: "4", title: "Cybersecurity Analyst", minRate: 115, maxRate: 160, headcount: 5 },
  { id: "5", title: "DevOps Engineer", minRate: 130, maxRate: 180, headcount: 4 },
];

type Props = {
  laborCategories?: LaborCategory[];
  onAdd?: (lcat: Omit<LaborCategory, "id">) => void;
  onDelete?: (id: string) => void;
};

export function LaborCategoriesSection({ laborCategories = SAMPLE_LCATS }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newLcat, setNewLcat] = useState({ title: "", minRate: 0, maxRate: 0, headcount: 0 });

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            Labor Categories (LCATs)
          </CardTitle>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add LCAT
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="LCAT Title"
                value={newLcat.title}
                onChange={(e) => setNewLcat({ ...newLcat, title: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Min Rate ($/hr)"
                value={newLcat.minRate || ""}
                onChange={(e) => setNewLcat({ ...newLcat, minRate: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Max Rate ($/hr)"
                value={newLcat.maxRate || ""}
                onChange={(e) => setNewLcat({ ...newLcat, maxRate: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Headcount"
                value={newLcat.headcount || ""}
                onChange={(e) => setNewLcat({ ...newLcat, headcount: Number(e.target.value) })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button>Save LCAT</Button>
            </div>
          </div>
        )}

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">LCAT Title</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Rate Range</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Available</th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {laborCategories.map((lcat) => (
                <tr key={lcat.id} className="hover:bg-muted/20">
                  <td className="p-3">
                    <span className="font-medium text-foreground">{lcat.title}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-foreground">
                      ${lcat.minRate} - ${lcat.maxRate}/hr
                    </span>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">{lcat.headcount} FTEs</Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
