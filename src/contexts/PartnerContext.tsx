import { createContext, useContext, useState, type ReactNode } from "react";
import type { SocioEconomicStatus } from "./CompanyContext";

export type Certification = "FedRAMP" | "CMMC" | "ISO 27001" | "SOC 2" | "GSA Schedule";

export type Partner = {
  id: string;
  name: string;
  tagline: string;
  certifications: Certification[];
  socioEconomicStatuses: SocioEconomicStatus[];
  capabilities: string[];
  naicsCodes: string[];
  pastPerformanceAgencies: string[];
  contactEmail: string;
};

const mockPartners: Partner[] = [
  {
    id: "cybershield",
    name: "CyberShield Solutions",
    tagline: "Enterprise security for the federal mission",
    certifications: ["FedRAMP", "CMMC", "ISO 27001"],
    socioEconomicStatuses: ["Small Business", "SDVOSB"],
    capabilities: ["Cybersecurity", "Zero Trust", "Continuous Monitoring", "FISMA/RMF"],
    naicsCodes: ["541512", "541519"],
    pastPerformanceAgencies: ["DOE", "DHS", "DoD"],
    contactEmail: "partnerships@cybershield.com",
  },
  {
    id: "fedcloud",
    name: "FedCloud Partners",
    tagline: "Cloud migration specialists for government",
    certifications: ["FedRAMP", "SOC 2"],
    socioEconomicStatuses: ["Small Business", "8(a)"],
    capabilities: ["Cloud Migration", "AWS GovCloud", "Azure Government", "Hybrid Cloud"],
    naicsCodes: ["541512", "518210"],
    pastPerformanceAgencies: ["DOE", "GSA", "VA"],
    contactEmail: "teaming@fedcloud.io",
  },
  {
    id: "secureteaming",
    name: "SecureTeaming Inc",
    tagline: "Compliance-first security solutions",
    certifications: ["CMMC", "ISO 27001", "SOC 2"],
    socioEconomicStatuses: ["WOSB"],
    capabilities: ["Security Assessments", "Compliance Consulting", "Risk Management"],
    naicsCodes: ["541512", "541611"],
    pastPerformanceAgencies: ["Treasury", "DoD"],
    contactEmail: "partners@secureteaming.com",
  },
  {
    id: "innovationgovtech",
    name: "Innovation GovTech",
    tagline: "Modern development for mission impact",
    certifications: ["SOC 2", "ISO 27001"],
    socioEconomicStatuses: ["Small Business", "HUBZone"],
    capabilities: ["DevSecOps", "Agile Development", "Application Modernization", "AI/ML"],
    naicsCodes: ["541512", "541511"],
    pastPerformanceAgencies: ["VA", "HHS"],
    contactEmail: "teaming@innovationgovtech.com",
  },
  {
    id: "datadriven",
    name: "DataDriven Federal",
    tagline: "Analytics and data platforms for agencies",
    certifications: ["FedRAMP", "SOC 2"],
    socioEconomicStatuses: ["8(a)", "SDVOSB"],
    capabilities: ["Data Analytics", "Business Intelligence", "Data Engineering", "Visualization"],
    naicsCodes: ["541512", "518210"],
    pastPerformanceAgencies: ["GSA", "DOE", "Commerce"],
    contactEmail: "partnerships@datadrivenfed.com",
  },
  {
    id: "missioncloud",
    name: "MissionCloud Systems",
    tagline: "Secure infrastructure for critical missions",
    certifications: ["FedRAMP", "CMMC", "GSA Schedule"],
    socioEconomicStatuses: ["Small Business"],
    capabilities: ["Infrastructure", "Managed Services", "Cloud Operations", "Security Operations"],
    naicsCodes: ["541512", "541513"],
    pastPerformanceAgencies: ["DoD", "DHS", "DOJ"],
    contactEmail: "teaming@missioncloud.gov",
  },
];

type PartnerContextType = {
  partners: Partner[];
  getRecommendedPartners: (
    companyGaps: Certification[],
    requiredCerts: Certification[],
    agency?: string
  ) => Array<Partner & { fitScore: number; fitLevel: "high" | "medium" | "low"; matchReasons: string[] }>;
};

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [partners] = useState<Partner[]>(mockPartners);

  const getRecommendedPartners = (
    companyGaps: Certification[],
    requiredCerts: Certification[],
    agency?: string
  ) => {
    return partners
      .map((partner) => {
        let score = 0;
        const matchReasons: string[] = [];

        // Check if partner fills certification gaps
        const filledGaps = companyGaps.filter((gap) => partner.certifications.includes(gap));
        if (filledGaps.length > 0) {
          score += filledGaps.length * 25;
          matchReasons.push(`Fills ${filledGaps.join(", ")} gaps`);
        }

        // Check if partner has required certs
        const hasRequiredCerts = requiredCerts.filter((cert) => partner.certifications.includes(cert));
        if (hasRequiredCerts.length > 0) {
          score += hasRequiredCerts.length * 15;
          matchReasons.push(`Has ${hasRequiredCerts.join(", ")}`);
        }

        // Check agency experience
        if (agency && partner.pastPerformanceAgencies.includes(agency)) {
          score += 20;
          matchReasons.push(`${agency} past performance`);
        }

        // Bonus for diverse certifications
        if (partner.certifications.length >= 3) {
          score += 10;
        }

        const fitLevel: "high" | "medium" | "low" =
          score >= 50 ? "high" : score >= 25 ? "medium" : "low";

        return { ...partner, fitScore: score, fitLevel, matchReasons };
      })
      .filter((p) => p.fitScore > 0)
      .sort((a, b) => b.fitScore - a.fitScore);
  };

  return (
    <PartnerContext.Provider value={{ partners, getRecommendedPartners }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartners() {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartners must be used within a PartnerProvider");
  }
  return context;
}
