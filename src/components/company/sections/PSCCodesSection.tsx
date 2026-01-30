import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Hash, Plus, X } from "lucide-react";

const PSC_CODES = [
  { code: "D301", desc: "IT and Telecom - Facility Operation and Maintenance" },
  { code: "D302", desc: "IT and Telecom - Systems Development" },
  { code: "D303", desc: "IT and Telecom - Integration Services" },
  { code: "D304", desc: "IT and Telecom - Telecommunications and Transmission" },
  { code: "D306", desc: "IT and Telecom - Systems Analysis" },
  { code: "D307", desc: "IT and Telecom - IT Strategy and Architecture" },
  { code: "D308", desc: "IT and Telecom - Programming" },
  { code: "D310", desc: "IT and Telecom - Cyber Security" },
  { code: "D311", desc: "IT and Telecom - Data/Records Management" },
  { code: "D314", desc: "IT and Telecom - System Acquisition Support" },
  { code: "D316", desc: "IT and Telecom - IT Network Management" },
  { code: "D317", desc: "IT and Telecom - Web Based Subscription" },
  { code: "D318", desc: "IT and Telecom - Integrated Hardware/Software/Services" },
  { code: "D319", desc: "IT and Telecom - Annual Software Maintenance Service Plans" },
  { code: "D399", desc: "IT and Telecom - Other" },
  { code: "R408", desc: "Program Management/Support Services" },
  { code: "R425", desc: "Engineering and Technical Services" },
  { code: "R499", desc: "Other Professional Services" },
];

type Props = {
  selectedCodes: string[];
  onSave: (codes: string[]) => void;
};

export function PSCCodesSection({ selectedCodes = [], onSave }: Partial<Props>) {
  const [codes, setCodes] = useState<string[]>(selectedCodes);
  const [selectedCode, setSelectedCode] = useState("");

  const handleAdd = () => {
    if (selectedCode && !codes.includes(selectedCode)) {
      const newCodes = [...codes, selectedCode];
      setCodes(newCodes);
      onSave?.(newCodes);
      setSelectedCode("");
    }
  };

  const handleRemove = (code: string) => {
    const newCodes = codes.filter((c) => c !== code);
    setCodes(newCodes);
    onSave?.(newCodes);
  };

  const getCodeLabel = (code: string) => {
    const psc = PSC_CODES.find((p) => p.code === code);
    return psc ? `${code} — ${psc.desc}` : code;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="h-5 w-5 text-primary" />
          PSC Codes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <Select value={selectedCode} onValueChange={setSelectedCode}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a PSC code..." />
            </SelectTrigger>
            <SelectContent>
              {PSC_CODES.filter((p) => !codes.includes(p.code)).map((psc) => (
                <SelectItem key={psc.code} value={psc.code}>
                  {psc.code} — {psc.desc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!selectedCode}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {codes.map((code) => (
            <Badge
              key={code}
              variant="secondary"
              className="px-3 py-1.5 gap-2"
            >
              {getCodeLabel(code)}
              <button onClick={() => handleRemove(code)} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {codes.length === 0 && (
            <p className="text-sm text-muted-foreground">No PSC codes added yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
