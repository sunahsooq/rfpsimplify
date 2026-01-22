import { createContext, useContext, useState, type ReactNode } from "react";

export type SocioEconomicStatus = 
  | "Small Business" 
  | "8(a)" 
  | "WOSB" 
  | "SDVOSB" 
  | "HUBZone";

export type CompanyData = {
  legalBusinessName: string;
  uei: string;
  cageCode: string;
  primaryNaics: string;
  socioEconomicStatuses: SocioEconomicStatus[];
};

type CompanyContextType = {
  company: CompanyData;
  updateCompany: (data: Partial<CompanyData>) => void;
  maskedUei: string;
};

const defaultCompany: CompanyData = {
  legalBusinessName: "Acme Federal Solutions",
  uei: "JQNC9KQPXYZ1",
  cageCode: "7ABC1",
  primaryNaics: "541512",
  socioEconomicStatuses: ["Small Business", "8(a)", "WOSB"],
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(defaultCompany);

  const updateCompany = (data: Partial<CompanyData>) => {
    setCompany((prev) => ({ ...prev, ...data }));
  };

  const maskedUei = company.uei.length >= 4 
    ? `****${company.uei.slice(-4)}` 
    : company.uei;

  return (
    <CompanyContext.Provider value={{ company, updateCompany, maskedUei }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
