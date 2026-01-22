export type CompanyForScoring = {
  primary_naics: string;
  secondary_naics: string[];
  certifications: string[];
  capabilities: string[];
  past_performance_tags: string[];
  location?: string | null;
};

export type RfpForScoring = {
  naics_codes: string[];
  required_certifications: string[];
  technical_requirements: string[];
  experience_requirements: string[];
  compliance_requirements: string[];
  place_of_performance?: string | null;
};

export type ComputedScores = {
  naics_alignment_score: number;
  certification_alignment_score: number;
  capability_alignment_score: number;
  past_performance_alignment_score: number;
  overall_match_score: number;
  readiness_level: "Low" | "Medium" | "High";
};

const clamp0to100 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function computeNaicsScore(company: CompanyForScoring, rfp: RfpForScoring) {
  if (!rfp.naics_codes?.length) return 70;
  if (rfp.naics_codes.includes(company.primary_naics)) return 100;
  const overlap = (company.secondary_naics ?? []).filter((n) => rfp.naics_codes.includes(n));
  return overlap.length ? 75 : 40;
}

export function computeCertificationScore(company: CompanyForScoring, rfp: RfpForScoring) {
  if (!rfp.required_certifications?.length) return 70;
  const matched = rfp.required_certifications.filter((c) => (company.certifications ?? []).includes(c));
  return clamp0to100((matched.length / rfp.required_certifications.length) * 100);
}

export function computeCapabilityScore(company: CompanyForScoring, rfp: RfpForScoring) {
  if (!rfp.technical_requirements?.length) return 60;
  const matches = rfp.technical_requirements.filter((req) =>
    (company.capabilities ?? []).some((cap) => req.toLowerCase().includes(cap.toLowerCase())),
  );
  return clamp0to100(Math.min(100, (matches.length / rfp.technical_requirements.length) * 100));
}

export function computePastPerformanceScore(company: CompanyForScoring, rfp: RfpForScoring) {
  if (!company.past_performance_tags?.length) return 50;
  const haystack = (rfp.experience_requirements ?? []).join(" ").toLowerCase();
  const matches = company.past_performance_tags.filter((tag) => haystack.includes(tag.toLowerCase()));
  return matches.length ? 75 : 55;
}

export function computeOverallScore(scores: {
  naics: number;
  certifications: number;
  capabilities: number;
  past_performance: number;
}) {
  return clamp0to100(
    scores.naics * 0.2 +
      scores.certifications * 0.3 +
      scores.capabilities * 0.2 +
      scores.past_performance * 0.2 +
      10,
  );
}

export function computeReadiness(overall: number): ComputedScores["readiness_level"] {
  if (overall >= 75) return "High";
  if (overall >= 55) return "Medium";
  return "Low";
}

export function postParseProcessing(company: CompanyForScoring, rfp: RfpForScoring): ComputedScores {
  const subscores = {
    naics: computeNaicsScore(company, rfp),
    certifications: computeCertificationScore(company, rfp),
    capabilities: computeCapabilityScore(company, rfp),
    past_performance: computePastPerformanceScore(company, rfp),
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
