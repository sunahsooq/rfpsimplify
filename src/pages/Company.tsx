import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Check, Loader2 } from "lucide-react";
import { useCompany, type SocioEconomicStatus } from "@/contexts/CompanyContext";
import { toast } from "sonner";

const allSocioEconomicOptions: SocioEconomicStatus[] = [
  "Small Business",
  "8(a)",
  "WOSB",
  "SDVOSB",
  "HUBZone",
];

export default function Company() {
  const { company, updateCompany, maskedUei } = useCompany();
  
  const [formData, setFormData] = useState({
    legalBusinessName: company.legalBusinessName,
    uei: company.uei,
    cageCode: company.cageCode,
    primaryNaics: company.primaryNaics,
    socioEconomicStatuses: [...company.socioEconomicStatuses],
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSocioEconomicStatus = (status: SocioEconomicStatus) => {
    setFormData((prev) => {
      const current = prev.socioEconomicStatuses;
      const updated = current.includes(status)
        ? current.filter((s) => s !== status)
        : [...current, status];
      return { ...prev, socioEconomicStatuses: updated };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateCompany(formData);
    setIsSaving(false);
    toast.success("Company profile updated successfully");
  };

  // Masked UEI for preview
  const previewMaskedUei = formData.uei.length >= 4 
    ? `****${formData.uei.slice(-4)}` 
    : formData.uei;

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Company Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your company identity for opportunity matching and gap analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Editable Fields (65%) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Building2 className="h-5 w-5 text-primary" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Legal Business Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Legal Business Name
                  </label>
                  <Input 
                    value={formData.legalBusinessName}
                    onChange={(e) => handleInputChange("legalBusinessName", e.target.value)}
                    className="bg-secondary border-border text-foreground"
                    placeholder="Enter your legal business name"
                  />
                </div>

                {/* UEI */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Unique Entity ID (UEI)
                  </label>
                  <Input 
                    value={formData.uei}
                    onChange={(e) => handleInputChange("uei", e.target.value.toUpperCase().slice(0, 12))}
                    className="bg-secondary border-border text-foreground font-mono"
                    placeholder="12-character UEI"
                    maxLength={12}
                  />
                  <p className="text-xs text-muted-foreground">
                    12-character alphanumeric identifier from SAM.gov
                  </p>
                </div>

                {/* CAGE Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    CAGE Code
                  </label>
                  <Input 
                    value={formData.cageCode}
                    onChange={(e) => handleInputChange("cageCode", e.target.value.toUpperCase())}
                    className="bg-secondary border-border text-foreground font-mono"
                    placeholder="5-character CAGE code"
                  />
                </div>

                {/* Primary NAICS */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Primary NAICS Code
                  </label>
                  <Input 
                    value={formData.primaryNaics}
                    onChange={(e) => handleInputChange("primaryNaics", e.target.value)}
                    className="bg-secondary border-border text-foreground font-mono"
                    placeholder="e.g., 541512"
                  />
                </div>

                {/* Socio-Economic Status */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    Socio-Economic Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allSocioEconomicOptions.map((status) => {
                      const isSelected = formData.socioEconomicStatuses.includes(status);
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => toggleSocioEconomicStatus(status)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border ${
                            isSelected
                              ? "bg-primary/20 text-primary border-primary/40"
                              : "bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                          {status}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select all applicable socio-economic designations
                  </p>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-primary-foreground px-8"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Company Preview (35%) */}
          <div className="lg:col-span-4">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground">
                  Company Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Company Name */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Company Name
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {formData.legalBusinessName || "—"}
                  </p>
                </div>

                {/* Masked UEI */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    UEI
                  </p>
                  <p className="mt-1 text-base font-mono text-foreground">
                    {previewMaskedUei || "—"}
                  </p>
                </div>

                {/* Primary NAICS */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Primary NAICS
                  </p>
                  <p className="mt-1 text-base font-mono text-foreground">
                    {formData.primaryNaics || "—"}
                  </p>
                </div>

                {/* Socio-Economic Badges */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Certifications
                  </p>
                  {formData.socioEconomicStatuses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {formData.socioEconomicStatuses.map((status) => (
                        <Badge 
                          key={status}
                          className="bg-success/15 text-success border-success/30"
                        >
                          {status}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No certifications selected</p>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This information is used for opportunity matching and gap analysis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
