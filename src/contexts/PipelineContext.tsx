import { createContext, useContext, useState, type ReactNode } from "react";

export type PipelineStage = "Identify" | "Qualify" | "Pursuit" | "Bid Submitted" | "Won" | "Lost";

export type PipelineItem = {
  id: string;
  opportunityName: string;
  agency: string;
  estimatedValue: string;
  pWin: number;
  stage: PipelineStage;
  owner: string;
};

type PipelineContextType = {
  items: PipelineItem[];
  addToPipeline: (item: Omit<PipelineItem, "pWin" | "stage" | "owner">) => void;
  updateStage: (id: string, stage: PipelineStage) => void;
  updatePWin: (id: string, pWin: number) => void;
  isInPipeline: (id: string) => boolean;
  removeFromPipeline: (id: string) => void;
};

const defaultPipelineItems: PipelineItem[] = [
  {
    id: "cloud-infra-modernization",
    opportunityName: "Cloud Infrastructure Modernization",
    agency: "DOE",
    estimatedValue: "$4.2M",
    pWin: 65,
    stage: "Qualify",
    owner: "Current User",
  },
  {
    id: "zero-trust-network-upgrade",
    opportunityName: "Zero Trust Network Upgrade",
    agency: "DHS",
    estimatedValue: "$3.8M",
    pWin: 55,
    stage: "Pursuit",
    owner: "Current User",
  },
  {
    id: "cybersecurity-monitoring",
    opportunityName: "Cybersecurity Monitoring Services",
    agency: "DoD",
    estimatedValue: "$5.5M",
    pWin: 80,
    stage: "Bid Submitted",
    owner: "Current User",
  },
  {
    id: "enterprise-sso-integration",
    opportunityName: "Enterprise SSO Integration",
    agency: "Treasury",
    estimatedValue: "$1.8M",
    pWin: 90,
    stage: "Won",
    owner: "Current User",
  },
];

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PipelineItem[]>(defaultPipelineItems);

  const addToPipeline = (item: Omit<PipelineItem, "pWin" | "stage" | "owner">) => {
    if (items.some((i) => i.id === item.id)) return;
    
    setItems((prev) => [
      ...prev,
      {
        ...item,
        pWin: 50,
        stage: "Identify",
        owner: "Current User",
      },
    ]);
  };

  const updateStage = (id: string, stage: PipelineStage) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stage } : item))
    );
  };

  const updatePWin = (id: string, pWin: number) => {
    const clampedPWin = Math.max(0, Math.min(100, pWin));
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pWin: clampedPWin } : item))
    );
  };

  const isInPipeline = (id: string) => items.some((i) => i.id === id);

  const removeFromPipeline = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PipelineContext.Provider
      value={{ items, addToPipeline, updateStage, updatePWin, isInPipeline, removeFromPipeline }}
    >
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error("usePipeline must be used within a PipelineProvider");
  }
  return context;
}
