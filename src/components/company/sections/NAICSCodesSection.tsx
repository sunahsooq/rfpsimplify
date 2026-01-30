import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, X, Star } from "lucide-react";

const NAICS_CODES = [
  { code: "541511", desc: "Custom Computer Programming Services" },
  { code: "541512", desc: "Computer Systems Design Services" },
  { code: "541513", desc: "Computer Facilities Management Services" },
  { code: "541519", desc: "Other Computer Related Services" },
  { code: "541330", desc: "Engineering Services" },
  { code: "541611", desc: "Administrative Management Consulting" },
  { code: "541612", desc: "Human Resources Consulting Services" },
  { code: "541613", desc: "Marketing Consulting Services" },
  { code: "541614", desc: "Process, Physical, Logistics Consulting" },
  { code: "541618", desc: "Other Management Consulting Services" },
  { code: "541690", desc: "Other Scientific & Technical Consulting" },
  { code: "518210", desc: "Data Processing, Hosting & Related Services" },
  { code: "517311", desc: "Wired Telecommunications Carriers" },
  { code: "517312", desc: "Wireless Telecommunications Carriers" },
  { code: "561210", desc: "Facilities Support Services" },
  { code: "561320", desc: "Temporary Help Services" },
  { code: "611420", desc: "Computer Training" },
];

type Props = {
  primaryNaics: string;
  secondaryNaics: string[];
  onSave: (primary: string, secondary: string[]) => void;
};

export function NAICSCodesSection({ primaryNaics, secondaryNaics, onSave }: Props) {
  const [primary, setPrimary] = useState(primaryNaics);
  const [secondary, setSecondary] = useState<string[]>(secondaryNaics);
  const [selectedCode, setSelectedCode] = useState("");

  const handleAddSecondary = () => {
    if (selectedCode && !secondary.includes(selectedCode) && selectedCode !== primary) {
      const newSecondary = [...secondary, selectedCode];
      setSecondary(newSecondary);
      onSave(primary, newSecondary);
      setSelectedCode("");
    }
  };

  const handleRemoveSecondary = (code: string) => {
    const newSecondary = secondary.filter((c) => c !== code);
    setSecondary(newSecondary);
    onSave(primary, newSecondary);
  };

  const handleSetPrimary = (code: string) => {
    setPrimary(code);
    // Remove from secondary if it was there
    const newSecondary = secondary.filter((c) => c !== code);
    setSecondary(newSecondary);
    onSave(code, newSecondary);
  };

  const getCodeLabel = (code: string) => {
    const naics = NAICS_CODES.find((n) => n.code === code);
    return naics ? `${code} — ${naics.desc}` : code;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          NAICS Codes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Primary NAICS *</label>
          <Select value={primary} onValueChange={handleSetPrimary}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary NAICS code..." />
            </SelectTrigger>
            <SelectContent>
              {NAICS_CODES.map((naics) => (
                <SelectItem key={naics.code} value={naics.code}>
                  {naics.code} — {naics.desc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {primary && (
            <Badge className="mt-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 text-sm gap-2">
              <Star className="h-4 w-4" />
              {getCodeLabel(primary)}
              <span className="opacity-70">(PRIMARY)</span>
            </Badge>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Secondary NAICS</label>
          <div className="flex gap-3 mb-3">
            <Select value={selectedCode} onValueChange={setSelectedCode}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Add secondary NAICS..." />
              </SelectTrigger>
              <SelectContent>
                {NAICS_CODES.filter((n) => n.code !== primary && !secondary.includes(n.code)).map((naics) => (
                  <SelectItem key={naics.code} value={naics.code}>
                    {naics.code} — {naics.desc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddSecondary} disabled={!selectedCode}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {secondary.map((code) => (
              <Badge 
                key={code} 
                variant="secondary" 
                className="px-3 py-1.5 gap-2"
              >
                {getCodeLabel(code)}
                <button onClick={() => handleRemoveSecondary(code)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
