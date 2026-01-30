import { useState, useEffect } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useCompany } from "@/contexts/CompanyContext";
import { Skeleton } from "@/components/ui/skeleton";

// Profile components
import { ProfileCompletenessCard } from "@/components/company/ProfileCompletenessCard";
import { ProfileSidebar, type ProfileSection } from "@/components/company/ProfileSidebar";
import { IdentityTab } from "@/components/company/IdentityTab";
import { CapabilitiesTab } from "@/components/company/CapabilitiesTab";
import { CertificationsTab } from "@/components/company/CertificationsTab";
import { PastPerformanceTab } from "@/components/company/PastPerformanceTab";

// New section components
import { PlacesOfPerformanceSection } from "@/components/company/sections/PlacesOfPerformanceSection";
import { NAICSCodesSection } from "@/components/company/sections/NAICSCodesSection";
import { PSCCodesSection } from "@/components/company/sections/PSCCodesSection";
import { ContractVehiclesSection } from "@/components/company/sections/ContractVehiclesSection";
import { SecurityClearancesSection } from "@/components/company/sections/SecurityClearancesSection";
import { AgencyExperienceSection } from "@/components/company/sections/AgencyExperienceSection";
import { KeyPersonnelSection } from "@/components/company/sections/KeyPersonnelSection";
import { TeamingPreferencesSection } from "@/components/company/sections/TeamingPreferencesSection";
import { LaborCategoriesSection } from "@/components/company/sections/LaborCategoriesSection";
import { KeywordsSection } from "@/components/company/sections/KeywordsSection";

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
  const [activeSection, setActiveSection] = useState<ProfileSection>("company-info");

  // Track incomplete sections
  const incompleteSections: ProfileSection[] = [];
  if (!profile?.headquarters) incompleteSections.push("places-of-performance");
  // Add more logic as needed for other sections

  // Calculate profile completeness
  const sectionsTotal = 14;
  const sectionsComplete = profile ? Math.max(5, Math.floor((profile.profile_completeness / 100) * sectionsTotal)) : 0;
  const completeness = profile?.profile_completeness ?? 35;

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

  const renderSection = () => {
    switch (activeSection) {
      case "company-info":
        return (
          <IdentityTab
            profile={profile}
            setAsides={setAsides}
            onSaveProfile={upsertProfile}
            onSaveSetAside={upsertSetAside}
            onDeleteSetAside={deleteSetAside}
          />
        );
      case "places-of-performance":
        return (
          <PlacesOfPerformanceSection
            selectedStates={[]}
            onSave={(states) => console.log("Save states:", states)}
          />
        );
      case "naics-codes":
        return (
          <NAICSCodesSection
            primaryNaics={profile?.primary_naics ?? ""}
            secondaryNaics={profile?.secondary_naics ?? []}
            onSave={(primary, secondary) => upsertProfile({ primary_naics: primary, secondary_naics: secondary } as any)}
          />
        );
      case "psc-codes":
        return <PSCCodesSection />;
      case "certifications":
        return (
          <CertificationsTab
            profileId={profile?.id}
            certifications={certifications}
            onSave={upsertCertification}
            onDelete={deleteCertification}
          />
        );
      case "past-performance":
        return (
          <PastPerformanceTab
            profileId={profile?.id}
            pastPerformance={pastPerformance}
            onSave={upsertPastPerformance}
            onDelete={deletePastPerformance}
          />
        );
      case "agency-experience":
        return (
          <AgencyExperienceSection
            selectedAgencies={[]}
            onSave={(agencies) => console.log("Save agencies:", agencies)}
          />
        );
      case "key-personnel":
        return <KeyPersonnelSection />;
      case "technical-capabilities":
        return <CapabilitiesTab profile={profile} onSave={handleSaveCapabilities} />;
      case "contract-vehicles":
        return <ContractVehiclesSection />;
      case "security-clearances":
        return <SecurityClearancesSection />;
      case "teaming-preferences":
        return <TeamingPreferencesSection />;
      case "labor-categories":
        return <LaborCategoriesSection />;
      case "keywords":
        return <KeywordsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppTopNav />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Company Profile</h1>
          <p className="text-muted-foreground">Manage your GovCon identity for opportunity matching and gap analysis</p>
        </div>

        {/* Profile Completeness Card */}
        <div className="mb-6">
          <ProfileCompletenessCard
            completeness={completeness}
            sectionsComplete={sectionsComplete}
            sectionsTotal={sectionsTotal}
          />
        </div>

        {/* Two Column Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <ProfileSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            incompleteSections={incompleteSections}
          />

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {renderSection()}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-foreground">How This Data Powers Matching:</strong> Your profile is used for Match Scores 
            (comparing RFPs against your capabilities), Gap Analysis (identifying what you're missing), Partner Discovery 
            (finding companies that fill YOUR gaps), and AI Recommendations. A complete profile = better results.
          </p>
        </div>
      </main>
    </div>
  );
}
