import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { CompanyProfile, SetAside } from "@/hooks/useCompanyProfile";

const samStatusOptions = ["Active", "Inactive", "Pending"] as const;
const employeeSizeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
const revenueOptions = ["<$1M", "$1-5M", "$5-25M", "$25-100M", "$100M+"] as const;

const setAsideTypes = ["SB", "8a", "WOSB", "EDWOSB", "SDVOSB", "VOSB", "HUBZone", "SDB"] as const;
const setAsideStatusOptions = ["Certified", "Self-Certified", "Pending", "Expired", "N/A"] as const;

type Props = {
  profile: CompanyProfile | null;
  setAsides: SetAside[];
  onSaveProfile: (values: Partial<CompanyProfile>) => Promise<void>;
  onSaveSetAside: (values: Partial<SetAside>) => Promise<void>;
  onDeleteSetAside: (id: string) => Promise<void>;
};

export function IdentityTab({ profile, setAsides, onSaveProfile, onSaveSetAside, onDeleteSetAside }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    legal_name: "",
    dba_name: "",
    uei: "",
    cage_code: "",
    sam_status: "Pending" as (typeof samStatusOptions)[number],
    primary_naics: "",
    secondary_naics: [] as string[],
    employee_count_range: "1-10" as (typeof employeeSizeOptions)[number],
    annual_revenue_range: "<$1M" as (typeof revenueOptions)[number],
    headquarters: { address: "", city: "", state: "", zip: "" },
    website_url: "",
    year_founded: null as number | null,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        legal_name: profile.legal_name ?? "",
        dba_name: profile.dba_name ?? "",
        uei: profile.uei ?? "",
        cage_code: profile.cage_code ?? "",
        sam_status: (profile.sam_status as any) ?? "Pending",
        primary_naics: profile.primary_naics ?? "",
        secondary_naics: profile.secondary_naics ?? [],
        employee_count_range: (profile.employee_count_range as any) ?? "1-10",
        annual_revenue_range: (profile.annual_revenue_range as any) ?? "<$1M",
        headquarters: (profile.headquarters as any) ?? { address: "", city: "", state: "", zip: "" },
        website_url: profile.website_url ?? "",
        year_founded: profile.year_founded ?? null,
      });
    }
  }, [profile]);

  const handleChange = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSaveProfile({
        ...form,
        headquarters: form.headquarters as any,
        secondary_naics: form.secondary_naics,
      });
      toast.success("Identity saved");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSetAside = async (type: (typeof setAsideTypes)[number]) => {
    const existing = setAsides.find((s) => s.type === type);
    if (existing) {
      await onDeleteSetAside(existing.id);
    } else {
      await onSaveSetAside({ type, status: "N/A" } as any);
    }
  };

  const isTypeSelected = (type: string) => setAsides.some((s) => s.type === type);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-primary" />
          Identity & Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Legal Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Legal Business Name *</label>
            <Input value={form.legal_name} onChange={(e) => handleChange("legal_name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">DBA Name</label>
            <Input value={form.dba_name} onChange={(e) => handleChange("dba_name", e.target.value)} />
          </div>
        </div>

        {/* UEI + CAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">UEI *</label>
            <Input
              value={form.uei}
              onChange={(e) => handleChange("uei", e.target.value.toUpperCase().slice(0, 12))}
              className="font-mono"
              maxLength={12}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">CAGE Code</label>
            <Input
              value={form.cage_code}
              onChange={(e) => handleChange("cage_code", e.target.value.toUpperCase().slice(0, 5))}
              className="font-mono"
              maxLength={5}
            />
          </div>
        </div>

        {/* SAM Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">SAM Status</label>
            <Select value={form.sam_status} onValueChange={(v) => handleChange("sam_status", v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {samStatusOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Employee Size</label>
            <Select value={form.employee_count_range} onValueChange={(v) => handleChange("employee_count_range", v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {employeeSizeOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Annual Revenue</label>
            <Select value={form.annual_revenue_range} onValueChange={(v) => handleChange("annual_revenue_range", v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {revenueOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* NAICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Primary NAICS *</label>
            <Input
              value={form.primary_naics}
              onChange={(e) => handleChange("primary_naics", e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              className="font-mono"
              maxLength={6}
              placeholder="e.g. 541512"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Secondary NAICS</label>
            <Input
              placeholder="Comma-separated codes"
              value={form.secondary_naics.join(", ")}
              onChange={(e) =>
                handleChange(
                  "secondary_naics",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim().replace(/[^0-9]/g, "").slice(0, 6))
                    .filter(Boolean)
                )
              }
            />
          </div>
        </div>

        {/* Headquarters */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Headquarters Address</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              placeholder="Street"
              value={form.headquarters.address}
              onChange={(e) => handleChange("headquarters", { ...form.headquarters, address: e.target.value })}
            />
            <Input
              placeholder="City"
              value={form.headquarters.city}
              onChange={(e) => handleChange("headquarters", { ...form.headquarters, city: e.target.value })}
            />
            <Input
              placeholder="State"
              value={form.headquarters.state}
              onChange={(e) => handleChange("headquarters", { ...form.headquarters, state: e.target.value.slice(0, 2).toUpperCase() })}
              maxLength={2}
            />
            <Input
              placeholder="ZIP"
              value={form.headquarters.zip}
              onChange={(e) => handleChange("headquarters", { ...form.headquarters, zip: e.target.value.replace(/[^0-9-]/g, "").slice(0, 10) })}
              maxLength={10}
            />
          </div>
        </div>

        {/* Set-Asides */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Set-Aside Designations</label>
          <div className="flex flex-wrap gap-2">
            {setAsideTypes.map((type) => {
              const selected = isTypeSelected(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleSetAside(type)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border ${
                    selected
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {selected ? <Check className="h-3 w-3" /> : null}
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save Identity"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
