export type RfpAnalysis = {
  opportunity: {
    title: string | null;
    solicitation_id: string | null;
    agency: string | null;
    sub_agency: string | null;
    due_date: string | null;
    naics_codes: string[];
    set_aside: string[];
    contract_type: string | null;
    estimated_value: string | null;
    place_of_performance: string | null;
    summary: string[];
  };

  requirements: {
    technical: string[];
    certifications_required: string[];
    experience_required: string[];
    compliance_requirements: string[];
  };

  evaluation_criteria: string[];

  match_analysis: {
    strengths: string[];
    gaps: string[];
    risk_flags: string[];
  };

  scores: {
    naics_alignment_score: number;
    certification_alignment_score: number;
    capability_alignment_score: number;
    past_performance_alignment_score: number;
    overall_match_score: number;
    readiness_level: "Low" | "Medium" | "High";
  };

  partner_recommendations: Array<{
    partner_type: "Prime" | "Sub";
    gap_filled: string | null;
    ideal_partner_profile: string | null;
    reason: string | null;
  }>;

  bid_brief: {
    win_themes: string[];
    why_us: string[];
    proposed_team_strategy: string | null;
    financial_snapshot: {
      estimated_contract_value: string | null;
      expected_margin: string | null;
      probability_of_win: string | null;
    };
    go_no_go_recommendation: "Go" | "No-Go" | "Conditional Go";
    justification: string | null;
  };
};
