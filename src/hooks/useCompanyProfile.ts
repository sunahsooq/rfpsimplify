import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

// Types based on DB schema
export type CompanyProfile = Tables<"company_profiles">;
export type SetAside = Tables<"company_set_asides">;
export type Certification = Tables<"company_certifications">;
export type PastPerformance = Tables<"company_past_performance">;

export type FullCompanyProfile = {
  profile: CompanyProfile | null;
  setAsides: SetAside[];
  certifications: Certification[];
  pastPerformance: PastPerformance[];
};

export function useCompanyProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FullCompanyProfile>({
    profile: null,
    setAsides: [],
    certifications: [],
    pastPerformance: [],
  });

  const refetch = async () => {
    if (!user) {
      setData({ profile: null, setAsides: [], certifications: [], pastPerformance: [] });
      setLoading(false);
      return;
    }
    setLoading(true);

    const { data: profile } = await supabase
      .from("company_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profile) {
      const [{ data: setAsides }, { data: certifications }, { data: pastPerformance }] =
        await Promise.all([
          supabase.from("company_set_asides").select("*").eq("company_profile_id", profile.id),
          supabase.from("company_certifications").select("*").eq("company_profile_id", profile.id),
          supabase.from("company_past_performance").select("*").eq("company_profile_id", profile.id),
        ]);

      setData({
        profile,
        setAsides: setAsides ?? [],
        certifications: certifications ?? [],
        pastPerformance: pastPerformance ?? [],
      });
    } else {
      setData({ profile: null, setAsides: [], certifications: [], pastPerformance: [] });
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // --- Mutations ---

  const upsertProfile = async (
    values: Omit<TablesInsert<"company_profiles">, "id" | "user_id" | "created_at" | "updated_at" | "profile_completeness">
  ) => {
    if (!user) throw new Error("Not authenticated");
    const payload = { ...values, user_id: user.id };
    if (data.profile) {
      const { error } = await supabase.from("company_profiles").update(payload).eq("id", data.profile.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("company_profiles").insert(payload);
      if (error) throw error;
    }
    await refetch();
  };

  const upsertSetAside = async (values: TablesInsert<"company_set_asides"> | TablesUpdate<"company_set_asides">) => {
    if (!data.profile) throw new Error("No profile");
    const payload = { ...values, company_profile_id: data.profile.id };
    if ((values as any).id) {
      const { error } = await supabase.from("company_set_asides").update(payload).eq("id", (values as any).id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("company_set_asides").insert(payload as TablesInsert<"company_set_asides">);
      if (error) throw error;
    }
    await refetch();
  };

  const deleteSetAside = async (id: string) => {
    await supabase.from("company_set_asides").delete().eq("id", id);
    await refetch();
  };

  const upsertCertification = async (values: TablesInsert<"company_certifications"> | TablesUpdate<"company_certifications">) => {
    if (!data.profile) throw new Error("No profile");
    const payload = { ...values, company_profile_id: data.profile.id };
    if ((values as any).id) {
      const { error } = await supabase.from("company_certifications").update(payload).eq("id", (values as any).id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("company_certifications").insert(payload as TablesInsert<"company_certifications">);
      if (error) throw error;
    }
    await refetch();
  };

  const deleteCertification = async (id: string) => {
    await supabase.from("company_certifications").delete().eq("id", id);
    await refetch();
  };

  const upsertPastPerformance = async (values: TablesInsert<"company_past_performance"> | TablesUpdate<"company_past_performance">) => {
    if (!data.profile) throw new Error("No profile");
    const payload = { ...values, company_profile_id: data.profile.id };
    if ((values as any).id) {
      const { error } = await supabase.from("company_past_performance").update(payload).eq("id", (values as any).id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("company_past_performance").insert(payload as TablesInsert<"company_past_performance">);
      if (error) throw error;
    }
    await refetch();
  };

  const deletePastPerformance = async (id: string) => {
    await supabase.from("company_past_performance").delete().eq("id", id);
    await refetch();
  };

  return {
    ...data,
    loading,
    refetch,
    upsertProfile,
    upsertSetAside,
    deleteSetAside,
    upsertCertification,
    deleteCertification,
    upsertPastPerformance,
    deletePastPerformance,
  };
}
