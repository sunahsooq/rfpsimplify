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
      "GSA IT Schedule 70 holder",
      "FedRAMP Moderate authorized",
      "CMMC Level 2 expertise",
    ],
    rationale: "Covers your GSA and FedRAMP gaps. Strong DOE references and incumbent relationships.",
  },
  {
    name: "FedCloud Partners",
    fit: "high",
    capabilities: [
      "Hybrid cloud migration specialists",
      "DOE past performance (3 contracts)",
      "AWS GovCloud certified",
    ],
    rationale: "Deep DOE experience with cloud modernization. Excellent technical alignment.",
  },
  {
    name: "SecureTeaming Inc",
    fit: "medium",
    capabilities: [
      "Security compliance specialists",
      "FISMA/RMF assessments",
      "Continuous monitoring solutions",
    ],
    rationale: "Strong compliance expertise. Limited cloud migration experience.",
  },
  {
    name: "Innovation GovTech",
    fit: "medium",
    capabilities: [
      "DevSecOps capabilities",
      "Innovation differentiators",
      "Agile delivery methodology",
    ],
    rationale: "Modern development practices. May need additional vehicle access.",
  },
];

const fitBadgeClass: Record<FitLevel, string> = {
  high: "bg-[#22c55e]/15 text-[#22c55e]",
  medium: "bg-[#f59e0b]/15 text-[#f59e0b]",
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
          No high-fit partners identified for this opportunity yet. Update your profile for better matches.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Teaming Partner Recommendations</h2>

      {/* Intro */}
      <p className="mb-6 text-sm leading-relaxed text-[#e2e8f0] md:text-base" style={{ lineHeight: 1.6 }}>
        High-fit partners to address key gaps (GSA Schedule 70, FedRAMP authorization). Recommendations
        based on complementary capabilities, past performance, and certification match.
      </p>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="rounded-2xl bg-[#2a334f] p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
          >
            {/* Header: Name + Badge */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${fitBadgeClass[partner.fit]}`}
              >
                {fitLabel[partner.fit]}
              </span>
            </div>

            {/* Capabilities */}
            <ul className="mb-4 space-y-2">
              {partner.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {cap}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="mb-4 border-t border-[#334155]" />

            {/* Rationale */}
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{partner.rationale}</p>

            {/* CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-sm font-medium text-white shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
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
