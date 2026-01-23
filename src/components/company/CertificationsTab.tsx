import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Certification } from "@/hooks/useCompanyProfile";

const typeOptions = ["Security", "Quality", "Industry", "Clearance"] as const;
const statusOptions = ["Active", "In Process", "Expired", "Pending"] as const;

const commonCerts = [
  { name: "FedRAMP", type: "Security" as const, levels: ["Low", "Moderate", "High", "Agency ATO"] },
  { name: "CMMC", type: "Security" as const, levels: ["Level 1", "Level 2", "Level 3"] },
  { name: "SOC 2", type: "Quality" as const, levels: ["Type I", "Type II"] },
  { name: "ISO 27001", type: "Quality" as const, levels: [] },
  { name: "ISO 9001", type: "Quality" as const, levels: [] },
  { name: "PCI DSS", type: "Industry" as const, levels: [] },
  { name: "HIPAA", type: "Industry" as const, levels: [] },
  { name: "StateRAMP", type: "Security" as const, levels: ["Moderate", "High"] },
];

type Props = {
  profileId: string | undefined;
  certifications: Certification[];
  onSave: (values: Partial<Certification>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function CertificationsTab({ profileId, certifications, onSave, onDelete }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Industry" as (typeof typeOptions)[number],
    level: "",
    status: "Active" as (typeof statusOptions)[number],
    issuing_authority: "",
    certificate_number: "",
    expiration_date: "",
  });

  const handleChange = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const handleAdd = async () => {
    if (!profileId) {
      toast.error("Save Identity first");
      return;
    }
    if (!form.name || !form.issuing_authority) {
      toast.error("Name and Issuing Authority required");
      return;
    }
    setIsSaving(true);
    try {
      await onSave({
        name: form.name,
        type: form.type,
        level: form.level || null,
        status: form.status,
        issuing_authority: form.issuing_authority,
        certificate_number: form.certificate_number || null,
        expiration_date: form.expiration_date || null,
      } as any);
      setForm({ name: "", type: "Industry", level: "", status: "Active", issuing_authority: "", certificate_number: "", expiration_date: "" });
      toast.success("Certification added");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickAdd = (cert: (typeof commonCerts)[number]) => {
    setForm((prev) => ({ ...prev, name: cert.name, type: cert.type }));
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Quick Add Buttons */}
        <div className="flex flex-wrap gap-2">
          {commonCerts.map((c) => (
            <Button key={c.name} type="button" variant="outline" size="sm" onClick={() => handleQuickAdd(c)}>
              {c.name}
            </Button>
          ))}
        </div>

        {/* Form Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Certification Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Select value={form.type} onValueChange={(v) => handleChange("type", v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Level (optional)" value={form.level} onChange={(e) => handleChange("level", e.target.value)} />
          <Select value={form.status} onValueChange={(v) => handleChange("status", v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Issuing Authority *" value={form.issuing_authority} onChange={(e) => handleChange("issuing_authority", e.target.value)} />
          <Input placeholder="Certificate #" value={form.certificate_number} onChange={(e) => handleChange("certificate_number", e.target.value)} />
          <Input type="date" placeholder="Expiration" value={form.expiration_date} onChange={(e) => handleChange("expiration_date", e.target.value)} />
          <Button onClick={handleAdd} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Add
          </Button>
        </div>

        {/* Existing Certifications Table */}
        {certifications.length > 0 && (
          <div className="border border-border rounded-md divide-y divide-border mt-4">
            {certifications.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-2 text-sm">
                <div>
                  <span className="font-medium text-foreground">{c.name}</span>
                  {c.level && <span className="ml-1 text-muted-foreground">({c.level})</span>}
                  <span className="ml-3 text-xs text-muted-foreground">{c.status}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onDelete(c.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
