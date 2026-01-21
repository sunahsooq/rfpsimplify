import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type FitLevel = "high" | "medium";

interface Partner {
  name: string;
  fit: FitLevel;
  capabilities: string[];
  rationale: string;
}

const partners: Partner[] = [
  {
    name: "CyberShield Solutions",
    fit: "high",
    capabilities: [
      "GSA Schedule 70 holder",
      "FedRAMP Moderate authorized",
      "Cloud migration expertise",
    ],
    rationale: "Covers your GSA and FedRAMP gaps. Strong incumbent relationships.",
  },
  {
    name: "FedCloud Partners",
    fit: "medium",
    capabilities: [
      "GSA Schedule holder",
      "Hybrid cloud experience",
      "AWS GovCloud certified",
    ],
    rationale: "Solid GSA vehicle access. Limited DOE past performance.",
  },
  {
    name: "SecureTeaming Inc",
    fit: "high",
    capabilities: [
      "CMMC compliance specialists",
      "DOE references",
      "Security assessments",
    ],
    rationale: "Strong DOE relationships and compliance expertise.",
  },
  {
    name: "Innovation GovTech",
    fit: "medium",
    capabilities: [
      "DevSecOps capabilities",
      "Past performance with VA/DOE",
      "Agile delivery",
    ],
    rationale: "Good technical fit. May need additional vehicle access.",
  },
];

const fitBadgeClass: Record<FitLevel, string> = {
  high: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
};

const fitLabel: Record<FitLevel, string> = {
  high: "High Fit",
  medium: "Medium Fit",
};

export function OpportunityTeamingPartnersTab() {
  if (partners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base text-muted-foreground">
          No high-fit partners identified yet. Try adjusting your company profile.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Teaming Partner Matches</h2>

      {/* Intro */}
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        Recommended partners based on complementary capabilities for this solicitation. Focus on
        GSA Schedule 70 holders and FedRAMP-authorized providers to address key gaps.
      </p>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="rounded-xl bg-[#2a334f] p-5 shadow-card transition-transform hover:scale-[1.01] hover:shadow-glow"
          >
            {/* Header: Name + Badge */}
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${fitBadgeClass[partner.fit]}`}
              >
                {fitLabel[partner.fit]}
              </span>
            </div>

            {/* Capabilities */}
            <ul className="mb-3 space-y-1.5">
              {partner.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {cap}
                </li>
              ))}
            </ul>

            {/* Rationale */}
            <p className="mb-4 text-xs italic text-muted-foreground">{partner.rationale}</p>

            {/* CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-sm font-medium text-white shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Outreach Email
            </Button>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs italic text-muted-foreground">
        Partner recommendations are AI-generated based on capability gaps and vehicle requirements.
        Verify all certifications before outreach.
      </p>
    </div>
  );
}
