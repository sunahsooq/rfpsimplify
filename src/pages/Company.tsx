import { AppTopNav } from "@/components/AppTopNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Lightbulb, ShieldCheck, Briefcase } from "lucide-react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { IdentityTab } from "@/components/company/IdentityTab";
import { CapabilitiesTab } from "@/components/company/CapabilitiesTab";
import { CertificationsTab } from "@/components/company/CertificationsTab";
import { PastPerformanceTab } from "@/components/company/PastPerformanceTab";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/contexts/CompanyContext";
import { useEffect } from "react";

export default function Company() {
  const {
    profile,
    setAsides,
    certifications,
    pastPerformance,
    loading,
    upsertProfile,
    upsertSetAside,
    deleteSetAside,
    upsertCertification,
    deleteCertification,
    upsertPastPerformance,
    deletePastPerformance,
  } = useCompanyProfile();

  const { updateCompany } = useCompany();

  // Sync DB profile to shared context so Dashboard/Opportunity pages reflect latest data
  useEffect(() => {
    if (profile) {
      const caps = (profile.capabilities as any) ?? {};
      updateCompany({
        legalBusinessName: profile.legal_name,
        uei: profile.uei,
        cageCode: profile.cage_code ?? "",
        primaryNaics: profile.primary_naics,
        secondaryNaics: profile.secondary_naics ?? [],
        socioEconomicStatuses: setAsides.map((s) => {
          const mapping: Record<string, string> = {
            SB: "Small Business",
            "8a": "8(a)",
            WOSB: "WOSB",
            EDWOSB: "WOSB",
            SDVOSB: "SDVOSB",
            VOSB: "SDVOSB",
            HUBZone: "HUBZone",
            SDB: "Small Business",
          };
          return (mapping[s.type as string] ?? s.type) as any;
        }),
        coreCapabilities: caps.core_capabilities ?? [],
        certifications: certifications.map((c) => c.name),
        pastPerformanceTags: pastPerformance.flatMap((p) => p.scope_tags ?? []),
        location: profile.headquarters
          ? `${(profile.headquarters as any).city ?? ""}, ${(profile.headquarters as any).state ?? ""}`.replace(/^,\s*/, "").replace(/,\s*$/, "") || null
          : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, setAsides, certifications, pastPerformance]);

  const handleSaveCapabilities = async (capabilities: any) => {
    await upsertProfile({ capabilities } as any);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppTopNav />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-96 w-full" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Company Profile</h1>
          <p className="text-muted-foreground">Manage your GovCon identity for opportunity matching and gap analysis</p>
        </div>

        <Tabs defaultValue="identity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="identity" className="gap-2">
              <Building2 className="h-4 w-4 hidden sm:block" />
              Identity
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="gap-2">
              <Lightbulb className="h-4 w-4 hidden sm:block" />
              Capabilities
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-2">
              <ShieldCheck className="h-4 w-4 hidden sm:block" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="pastperformance" className="gap-2">
              <Briefcase className="h-4 w-4 hidden sm:block" />
              Past Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="identity">
            <IdentityTab
              profile={profile}
              setAsides={setAsides}
              onSaveProfile={upsertProfile}
              onSaveSetAside={upsertSetAside}
              onDeleteSetAside={deleteSetAside}
            />
          </TabsContent>

          <TabsContent value="capabilities">
            <CapabilitiesTab profile={profile} onSave={handleSaveCapabilities} />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsTab
              profileId={profile?.id}
              certifications={certifications}
              onSave={upsertCertification}
              onDelete={deleteCertification}
            />
          </TabsContent>

          <TabsContent value="pastperformance">
            <PastPerformanceTab
              profileId={profile?.id}
              pastPerformance={pastPerformance}
              onSave={upsertPastPerformance}
              onDelete={deletePastPerformance}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
