import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { PastPerformance } from "@/hooks/useCompanyProfile";

const clientTypes = ["Federal", "State", "Municipal", "Commercial"] as const;
const contractTypes = ["IDIQ", "IDIQ-TO", "FFP", "T&M", "Cost-Plus", "BPA", "Other"] as const;
const roleOptions = ["Prime", "Subcontractor", "JV-Partner"] as const;
const valueRanges = ["<$1M", "$1-5M", "$5-25M", "$25M+"] as const;
const statusOptions = ["Active", "Completed", "Terminated"] as const;
const cparsRatings = ["Exceptional", "Very Good", "Satisfactory", "Marginal", "Unsatisfactory"] as const;

type Props = {
  profileId: string | undefined;
  onSave: (values: Partial<PastPerformance>) => Promise<void>;
};

export function PastPerformanceForm({ profileId, onSave }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scopeTag, setScopeTag] = useState("");
  const [form, setForm] = useState({
    contract_name: "",
    contract_number: "",
    client_type: "Federal" as (typeof clientTypes)[number],
    agency_or_client: "",
    sub_agency: "",
    contract_type: "FFP" as (typeof contractTypes)[number],
    contract_vehicle: "",
    role: "Prime" as (typeof roleOptions)[number],
    work_share_percentage: null as number | null,
    contract_value_range: "<$1M" as (typeof valueRanges)[number],
    pop_start_date: "",
    pop_end_date: "",
    status: "Completed" as (typeof statusOptions)[number],
    scope_tags: [] as string[],
    scope_description: "",
    cpars_rating: null as (typeof cparsRatings)[number] | null,
  });

  const handleChange = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const handleAddScopeTag = () => {
    const tag = scopeTag.trim();
    if (!tag) return;
    if (form.scope_tags.includes(tag)) return;
    setForm((prev) => ({ ...prev, scope_tags: [...prev.scope_tags, tag] }));
    setScopeTag("");
  };

  const handleRemoveScopeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, scope_tags: prev.scope_tags.filter((t) => t !== tag) }));
  };

  const resetForm = () => {
    setForm({
      contract_name: "",
      contract_number: "",
      client_type: "Federal",
      agency_or_client: "",
      sub_agency: "",
      contract_type: "FFP",
      contract_vehicle: "",
      role: "Prime",
      work_share_percentage: null,
      contract_value_range: "<$1M",
      pop_start_date: "",
      pop_end_date: "",
      status: "Completed",
      scope_tags: [],
      scope_description: "",
      cpars_rating: null,
    });
    setScopeTag("");
  };

  const handleAdd = async () => {
    if (!profileId) {
      toast.error("Save Identity first");
      return;
    }
    if (!form.contract_name || !form.agency_or_client) {
      toast.error("Contract Name and Agency required");
      return;
    }
    setIsSaving(true);
    try {
      await onSave({
        ...form,
        pop_start_date: form.pop_start_date || null,
        pop_end_date: form.pop_end_date || null,
        cpars_rating: form.cpars_rating || null,
      } as any);
      resetForm();
      setIsOpen(false);
      toast.success("Past performance added");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-card border-border">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                Add New Contract
              </span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Contract Name *" value={form.contract_name} onChange={(e) => handleChange("contract_name", e.target.value)} />
              <Input placeholder="Contract #" value={form.contract_number} onChange={(e) => handleChange("contract_number", e.target.value)} />
              <Select value={form.client_type} onValueChange={(v) => handleChange("client_type", v as any)}>
                <SelectTrigger><SelectValue placeholder="Client Type" /></SelectTrigger>
                <SelectContent>
                  {clientTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Agency / Client *" value={form.agency_or_client} onChange={(e) => handleChange("agency_or_client", e.target.value)} />
              <Input placeholder="Sub-Agency" value={form.sub_agency} onChange={(e) => handleChange("sub_agency", e.target.value)} />
              <Select value={form.contract_type} onValueChange={(v) => handleChange("contract_type", v as any)}>
                <SelectTrigger><SelectValue placeholder="Contract Type" /></SelectTrigger>
                <SelectContent>
                  {contractTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select value={form.role} onValueChange={(v) => handleChange("role", v as any)}>
                <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  {roleOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={form.contract_value_range} onValueChange={(v) => handleChange("contract_value_range", v as any)}>
                <SelectTrigger><SelectValue placeholder="Value" /></SelectTrigger>
                <SelectContent>
                  {valueRanges.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="date" placeholder="POP Start" value={form.pop_start_date} onChange={(e) => handleChange("pop_start_date", e.target.value)} />
              <Input type="date" placeholder="POP End" value={form.pop_end_date} onChange={(e) => handleChange("pop_end_date", e.target.value)} />
            </div>

            {/* Scope Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Scope Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.scope_tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveScopeTag(tag)} className="ml-1 text-muted-foreground hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Cloud, DevSecOps"
                  value={scopeTag}
                  onChange={(e) => setScopeTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddScopeTag())}
                />
                <Button type="button" variant="secondary" size="icon" onClick={handleAddScopeTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Scope Description */}
            <Textarea
              placeholder="Scope of work description..."
              value={form.scope_description}
              onChange={(e) => handleChange("scope_description", e.target.value)}
              rows={3}
            />

            {/* CPARS + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select value={form.status} onValueChange={(v) => handleChange("status", v as any)}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={form.cpars_rating ?? ""} onValueChange={(v) => handleChange("cpars_rating", (v || null) as any)}>
                <SelectTrigger><SelectValue placeholder="CPARS Rating (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {cparsRatings.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleAdd} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Add Past Performance
              </Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
