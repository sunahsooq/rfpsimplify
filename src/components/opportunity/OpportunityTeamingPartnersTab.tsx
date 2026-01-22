import { useMemo } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePartners } from "@/contexts/PartnerContext";

type FitLevel = "high" | "medium" | "low";

const fitBadgeClass: Record<FitLevel, string> = {
  high: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  low: "bg-muted/50 text-muted-foreground",
};

const fitLabel: Record<FitLevel, string> = {
  high: "High Fit",
  medium: "Medium Fit",
  low: "Potential",
};

export function OpportunityTeamingPartnersTab({ gaps }: { gaps?: string[] | null }) {
  const { partners } = usePartners();

  const recommendations = useMemo(() => {
    const gapText = (gaps ?? []).join(" ").toLowerCase();
    if (!gapText) return [];

    return partners
      .map((p) => {
        const matchedCaps = p.capabilities.filter((cap) => gapText.includes(cap.toLowerCase()));
        const score = matchedCaps.length;
        const fit: FitLevel = score >= 2 ? "high" : score === 1 ? "medium" : "low";
        return {
          name: p.name,
          fit,
          capabilities: matchedCaps.length ? matchedCaps.slice(0, 3) : p.capabilities.slice(0, 3),
          rationale: matchedCaps.length
            ? `Matches gaps via: ${matchedCaps.slice(0, 2).join(", ")}`
            : "Potential complementary capabilities; review for fit.",
          score,
        };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [gaps, partners]);

  if (!recommendations.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base text-muted-foreground">
          No partner recommendations available for this opportunity yet.
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
        {recommendations.map((partner) => (
          <div
            key={partner.name}
            className="rounded-2xl bg-card p-5 shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
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
            <div className="mb-4 border-t border-border" />

            {/* Rationale */}
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{partner.rationale}</p>

            {/* CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-primary to-primary/70 text-sm font-medium text-primary-foreground shadow-card transition-all hover:scale-[1.01] hover:shadow-glow"
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
