// Lovable Cloud backend function: Analyze an RFP and create a persisted Opportunity
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CompanyProfile = {
  company_name: string | null;
  primary_naics: string | null;
  secondary_naics: string[] | null;
  certifications: string[] | null;
  capabilities: string[] | null;
  past_performance_tags?: string[] | null;
  location?: string | null;
};

const analysisTool = {
  type: "function",
  function: {
    name: "rfp_analysis",
    description: "Return a single RFP analysis JSON object in the required schema.",
    parameters: {
      type: "object",
      properties: {
        opportunity: {
          type: "object",
          properties: {
            title: { type: ["string", "null"] },
            solicitation_id: { type: ["string", "null"] },
            agency: { type: ["string", "null"] },
            sub_agency: { type: ["string", "null"] },
            due_date: { type: ["string", "null"] },
            naics_codes: { type: "array", items: { type: "string" } },
            set_aside: { type: "array", items: { type: "string" } },
            contract_type: { type: ["string", "null"] },
            estimated_value: { type: ["string", "null"] },
            place_of_performance: { type: ["string", "null"] },
            summary: { type: "array", items: { type: "string" } },
          },
          required: [
            "title",
            "solicitation_id",
            "agency",
            "sub_agency",
            "due_date",
            "naics_codes",
            "set_aside",
            "contract_type",
            "estimated_value",
            "place_of_performance",
            "summary",
          ],
          additionalProperties: false,
        },
        requirements: {
          type: "object",
          properties: {
            technical: { type: "array", items: { type: "string" } },
            certifications_required: { type: "array", items: { type: "string" } },
            experience_required: { type: "array", items: { type: "string" } },
            compliance_requirements: { type: "array", items: { type: "string" } },
          },
          required: ["technical", "certifications_required", "experience_required", "compliance_requirements"],
          additionalProperties: false,
        },
        evaluation_criteria: { type: "array", items: { type: "string" } },
        match_analysis: {
          type: "object",
          properties: {
            strengths: { type: "array", items: { type: "string" } },
            gaps: { type: "array", items: { type: "string" } },
            risk_flags: { type: "array", items: { type: "string" } },
          },
          required: ["strengths", "gaps", "risk_flags"],
          additionalProperties: false,
        },
        partner_recommendations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              partner_type: { type: "string", enum: ["Prime", "Sub", "Prime | Sub"] },
              gap_filled: { type: ["string", "null"] },
              ideal_partner_profile: { type: ["string", "null"] },
              reason: { type: ["string", "null"] },
            },
            required: ["partner_type", "gap_filled", "ideal_partner_profile", "reason"],
            additionalProperties: false,
          },
        },
        bid_brief: {
          type: "object",
          properties: {
            win_themes: { type: "array", items: { type: "string" } },
            why_us: { type: "array", items: { type: "string" } },
            proposed_team_strategy: { type: ["string", "null"] },
            financial_snapshot: {
              type: "object",
              properties: {
                estimated_contract_value: { type: ["string", "null"] },
                expected_margin: { type: ["string", "null"] },
                probability_of_win: { type: ["string", "null"] },
              },
              required: ["estimated_contract_value", "expected_margin", "probability_of_win"],
              additionalProperties: false,
            },
            go_no_go_recommendation: { type: "string", enum: ["Go", "No-Go", "Conditional Go", "Go | No-Go | Conditional Go"] },
            justification: { type: ["string", "null"] },
          },
          required: ["win_themes", "why_us", "proposed_team_strategy", "financial_snapshot", "go_no_go_recommendation", "justification"],
          additionalProperties: false,
        },
      },
      required: [
        "opportunity",
        "requirements",
        "evaluation_criteria",
        "match_analysis",
        "partner_recommendations",
        "bid_brief",
      ],
      additionalProperties: false,
    },
  },
} as const;

type ComputedScores = {
  naics_alignment_score: number;
  certification_alignment_score: number;
  capability_alignment_score: number;
  past_performance_alignment_score: number;
  overall_match_score: number;
  readiness_level: "Low" | "Medium" | "High";
};

const clamp0to100 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function computeNaicsScore(company: CompanyProfile, rfpNaics: string[]) {
  if (!rfpNaics?.length) return 70;
  if (company.primary_naics && rfpNaics.includes(company.primary_naics)) return 100;
  const secondary = Array.isArray(company.secondary_naics) ? company.secondary_naics : [];
  const overlap = secondary.filter((n) => rfpNaics.includes(n));
  return overlap.length ? 75 : 40;
}

function computeCertificationScore(company: CompanyProfile, required: string[]) {
  if (!required?.length) return 70;
  const certs = Array.isArray(company.certifications) ? company.certifications : [];
  const matched = required.filter((c) => certs.includes(c));
  return clamp0to100((matched.length / required.length) * 100);
}

function computeCapabilityScore(company: CompanyProfile, technicalReqs: string[]) {
  if (!technicalReqs?.length) return 60;
  const caps = Array.isArray(company.capabilities) ? company.capabilities : [];
  const matches = technicalReqs.filter((req) => caps.some((cap) => req.toLowerCase().includes(cap.toLowerCase())));
  return clamp0to100(Math.min(100, (matches.length / technicalReqs.length) * 100));
}

function computePastPerformanceScore(company: CompanyProfile, experienceReqs: string[]) {
  const tags = Array.isArray(company.past_performance_tags) ? company.past_performance_tags : [];
  if (!tags.length) return 50;
  const haystack = (experienceReqs ?? []).join(" ").toLowerCase();
  const matches = tags.filter((t) => haystack.includes(t.toLowerCase()));
  return matches.length ? 75 : 55;
}

function computeOverallScore(scores: { naics: number; certifications: number; capabilities: number; past_performance: number }) {
  return clamp0to100(
    scores.naics * 0.2 + scores.certifications * 0.3 + scores.capabilities * 0.2 + scores.past_performance * 0.2 + 10,
  );
}

function computeReadiness(overall: number): ComputedScores["readiness_level"] {
  if (overall >= 75) return "High";
  if (overall >= 55) return "Medium";
  return "Low";
}

function postParseProcessing(company: CompanyProfile, analysis: any): ComputedScores {
  const rfpNaics: string[] = analysis?.opportunity?.naics_codes ?? [];
  const requiredCerts: string[] = analysis?.requirements?.certifications_required ?? [];
  const technicalReqs: string[] = analysis?.requirements?.technical ?? [];
  const experienceReqs: string[] = analysis?.requirements?.experience_required ?? [];

  const subscores = {
    naics: computeNaicsScore(company, rfpNaics),
    certifications: computeCertificationScore(company, requiredCerts),
    capabilities: computeCapabilityScore(company, technicalReqs),
    past_performance: computePastPerformanceScore(company, experienceReqs),
  };

  const overall = computeOverallScore(subscores);
  return {
    naics_alignment_score: clamp0to100(subscores.naics),
    certification_alignment_score: clamp0to100(subscores.certifications),
    capability_alignment_score: clamp0to100(subscores.capabilities),
    past_performance_alignment_score: clamp0to100(subscores.past_performance),
    overall_match_score: clamp0to100(overall),
    readiness_level: computeReadiness(overall),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { rfp_text, company_profile } = (await req.json()) as {
      rfp_text?: string;
      company_profile?: CompanyProfile;
    };

    if (!rfp_text || typeof rfp_text !== "string") {
      return new Response(JSON.stringify({ error: "Missing rfp_text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const system = `You are a senior GovCon capture manager and RFP analyst.\n\nYour task is to ingest a raw government RFP and produce a fully structured, application-ready analysis that can be used to create an Opportunity, drive match scoring, gap analysis, partner recommendations, and a bid brief.\n\nIMPORTANT RULES:\n- Return ONLY valid JSON\n- Do NOT include explanations or commentary\n- If a field is not found, return null (for strings) or [] (for lists)\n- Be precise, conservative, and realistic (do not hallucinate requirements)\n- Prefer fewer, clearer requirements over long lists\n- Normalize terms (e.g., NAICS names, certifications)\n\nREQUIREMENTS EXTRACTION RULE:\nIf explicit \'shall\' requirements are sparse/absent, infer capability-based requirements from the scope of work (do not leave requirements empty unless the scope is truly missing).`;

    const user = {
      company_profile: company_profile ?? {
        company_name: null,
        primary_naics: null,
        secondary_naics: null,
        certifications: null,
        capabilities: null,
        past_performance_tags: null,
        location: null,
      },
      rfp_text,
      output_schema_note:
        "Return the EXACT schema; use null for unknown scalar strings and [] for unknown lists. Do not add fields.",
    };

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify(user) },
        ],
        tools: [analysisTool],
        tool_choice: { type: "function", function: { name: "rfp_analysis" } },
      }),
    });

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits and retry." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiJson = await aiResp.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) throw new Error("AI did not return structured tool output");

    const analysis = JSON.parse(argsStr);

    // Defensive normalization + minimal validation
    if (!analysis || typeof analysis !== "object") throw new Error("Invalid AI output");
    if (!analysis.opportunity || !analysis.requirements) {
      throw new Error("AI output missing required sections");
    }

    analysis.opportunity.naics_codes = Array.isArray(analysis?.opportunity?.naics_codes) ? analysis.opportunity.naics_codes : [];
    analysis.opportunity.set_aside = Array.isArray(analysis?.opportunity?.set_aside) ? analysis.opportunity.set_aside : [];
    analysis.opportunity.summary = Array.isArray(analysis?.opportunity?.summary) ? analysis.opportunity.summary : [];

    analysis.requirements.technical = Array.isArray(analysis?.requirements?.technical) ? analysis.requirements.technical : [];
    analysis.requirements.certifications_required = Array.isArray(analysis?.requirements?.certifications_required)
      ? analysis.requirements.certifications_required
      : [];
    analysis.requirements.experience_required = Array.isArray(analysis?.requirements?.experience_required) ? analysis.requirements.experience_required : [];
    analysis.requirements.compliance_requirements = Array.isArray(analysis?.requirements?.compliance_requirements)
      ? analysis.requirements.compliance_requirements
      : [];

    // If requirements came back empty but we have scope summary, infer a small set
    const reqTotal =
      analysis.requirements.technical.length +
      analysis.requirements.certifications_required.length +
      analysis.requirements.experience_required.length +
      analysis.requirements.compliance_requirements.length;
    if (reqTotal === 0 && analysis.opportunity.summary.length > 0) {
      analysis.requirements.technical = analysis.opportunity.summary.slice(0, 6);
    }

    // Platform-owned deterministic scoring (never accept AI numeric scores)
    const computedScores = postParseProcessing(company_profile ?? ({} as CompanyProfile), analysis);

    // Add scorecard to bid brief for downstream rendering (narrative still AI-owned)
    analysis.bid_brief = {
      ...(analysis.bid_brief ?? {}),
      scorecard: {
        overall_match_score: computedScores.overall_match_score,
        readiness_level: computedScores.readiness_level,
      },
    };

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Backend secrets are not configured");
    }

    const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const insertPayload = {
      source: "manual_upload",
      title: analysis?.opportunity?.title || "Untitled Opportunity (Manual RFP Upload)",
      solicitation_id: analysis?.opportunity?.solicitation_id ?? null,
      agency: analysis?.opportunity?.agency ?? null,
      sub_agency: analysis?.opportunity?.sub_agency ?? null,
      due_date: analysis?.opportunity?.due_date ?? null,
      naics_codes: analysis?.opportunity?.naics_codes ?? [],
      set_aside: analysis?.opportunity?.set_aside ?? [],
      contract_type: analysis?.opportunity?.contract_type ?? null,
      estimated_value: analysis?.opportunity?.estimated_value ?? null,
      place_of_performance: analysis?.opportunity?.place_of_performance ?? null,
      summary: analysis?.opportunity?.summary ?? [],
      requirements: analysis?.requirements ?? null,
      evaluation_criteria: analysis?.evaluation_criteria ?? [],
      match_analysis: analysis?.match_analysis ?? null,
      scores: computedScores,
      partner_recommendations: analysis?.partner_recommendations ?? null,
      bid_brief: analysis?.bid_brief ?? null,
      raw_rfp_text: rfp_text,
    };

    const { data: row, error: dbError } = await db
      .from("opportunities")
      .insert(insertPayload)
      .select("id")
      .maybeSingle();

    if (dbError) {
      console.error("DB insert error:", dbError);
      throw new Error("Failed to persist opportunity");
    }

    return new Response(JSON.stringify({ id: row?.id, analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-rfp error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
