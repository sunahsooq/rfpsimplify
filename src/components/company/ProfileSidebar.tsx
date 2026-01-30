import { cn } from "@/lib/utils";
import { 
  Building2, 
  MapPin, 
  FileText, 
  Hash, 
  ShieldCheck, 
  Trophy, 
  Building, 
  Users, 
  Wrench, 
  Truck, 
  Lock, 
  Handshake, 
  Briefcase, 
  Tag 
} from "lucide-react";

export type ProfileSection = 
  | "company-info"
  | "places-of-performance"
  | "naics-codes"
  | "psc-codes"
  | "certifications"
  | "past-performance"
  | "agency-experience"
  | "key-personnel"
  | "technical-capabilities"
  | "contract-vehicles"
  | "security-clearances"
  | "teaming-preferences"
  | "labor-categories"
  | "keywords";

type SectionConfig = {
  id: ProfileSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  incomplete?: boolean;
};

const sections: SectionConfig[] = [
  { id: "company-info", label: "Company Info", icon: Building2 },
  { id: "places-of-performance", label: "Places of Performance", icon: MapPin, incomplete: true },
  { id: "naics-codes", label: "NAICS Codes", icon: FileText },
  { id: "psc-codes", label: "PSC Codes", icon: Hash, incomplete: true },
  { id: "certifications", label: "Certifications", icon: ShieldCheck },
  { id: "past-performance", label: "Past Performance", icon: Trophy },
  { id: "agency-experience", label: "Agency Experience", icon: Building },
  { id: "key-personnel", label: "Key Personnel", icon: Users },
  { id: "technical-capabilities", label: "Technical Capabilities", icon: Wrench },
  { id: "contract-vehicles", label: "Contract Vehicles", icon: Truck },
  { id: "security-clearances", label: "Security Clearances", icon: Lock },
  { id: "teaming-preferences", label: "Teaming Preferences", icon: Handshake, incomplete: true },
  { id: "labor-categories", label: "Labor Categories", icon: Briefcase, incomplete: true },
  { id: "keywords", label: "Keywords", icon: Tag, incomplete: true },
];

type Props = {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
  incompleteSections?: ProfileSection[];
};

export function ProfileSidebar({ activeSection, onSectionChange, incompleteSections = [] }: Props) {
  return (
    <div className="w-64 shrink-0">
      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isIncomplete = incompleteSections.includes(section.id) || section.incomplete;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{section.label}</span>
              {isIncomplete && !isActive && (
                <span className="ml-auto h-2 w-2 rounded-full bg-warning shrink-0" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-6 p-3 rounded-xl bg-warning/10 border border-warning/30">
        <p className="text-xs text-warning font-medium flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-warning" />
          = Incomplete sections
        </p>
      </div>
    </div>
  );
}
