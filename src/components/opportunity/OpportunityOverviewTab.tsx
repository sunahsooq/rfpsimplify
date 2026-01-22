import { CheckCircle2, AlertTriangle, ExternalLink, User } from "lucide-react";
import { OpportunityCompanyMatch } from "./OpportunityCompanyMatch";

type Stage = "Identified" | "Qualified" | "Pursuing" | "Submitted";

export type OpportunityOverviewData = {
  title: string;
  agency: string;
  match: number;
  stage: Stage;
  due: string;
  urgent: boolean;
  estValue: string;
  contractType: string;
  setAside: string;
};

const quickLinks: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "SAM.gov Notice", href: "#", external: true },
  { label: "Performance Work Statement (PWS)", href: "#" },
  { label: "Q&A Amendments", href: "#" },
  { label: "Attachments", href: "#" },
];

const fitChecklist = [
  { label: "Relevant past performance", status: "pass" },
  { label: "FedRAMP Authorization", status: "warn" },
  { label: "GSA Schedule", status: "warn" },
  { label: "CMMC alignment", status: "pass" },
  { label: "Technical capability match", status: "pass" },
] as const;

export function OpportunityOverviewTab({ data }: { data: OpportunityOverviewData }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <section>
        <p className="text-[15px] leading-relaxed text-slate-200">
          DOE seeks a contractor to modernize its legacy cloud infrastructure, migrate mission-critical
          systems to FedRAMP-authorized environments, and enhance cybersecurity posture across enterprise
          platforms. This is a best-value procurement emphasizing technical capability and risk mitigation.
        </p>
      </section>

      {/* Summary chips */}
      <section className="flex flex-wrap gap-2">
        {[
          { label: "Solicitation", value: "DE-SOL-0012847" },
          { label: "NAICS", value: "541512" },
          { label: "PSC", value: "D302" },
          { label: "Place of Performance", value: "CONUS" },
        ].map((chip) => (
          <span
            key={chip.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium"
          >
            <span className="text-muted-foreground">{chip.label}:</span>
            <span className="font-semibold text-foreground">{chip.value}</span>
          </span>
        ))}
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Key Dates */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Key Dates</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#334155] bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Proposal Due
            </p>
            <p className={"mt-1 text-sm font-bold " + (data.urgent ? "text-red-500" : "text-foreground")}>
              {data.due}
            </p>
          </div>

          <div className="rounded-lg border border-[#334155] bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Q&A Deadline
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">Jan 28, 2026</p>
          </div>

          <div className="rounded-lg border border-[#334155] bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Anticipated Award
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">May 2026</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Company Fit Analysis - Dynamic based on company context */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Your Company Fit</h2>
        <OpportunityCompanyMatch 
          opportunityNaics="541512" 
          opportunitySetAside={data.setAside} 
        />
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Capability Fit Snapshot */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Capability Fit Snapshot</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {fitChecklist.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-[#334155] bg-background/5 px-3 py-2.5"
            >
              {item.status === "pass" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              )}
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Quick Links */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Quick Links</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group flex items-center justify-between gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-[#2a334f] hover:text-foreground"
            >
              <span className="group-hover:underline group-hover:decoration-primary group-hover:underline-offset-2">
                {l.label}
              </span>
              {l.external && <ExternalLink className="h-3.5 w-3.5 shrink-0" />}
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Point of Contact */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Point of Contact</h2>

        <div className="rounded-lg border border-[#334155] bg-background/5 p-4">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Contracting Officer
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">Jane Mitchell</p>
              </div>

              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-muted-foreground">Email: </span>
                  <span className="font-medium text-foreground">jane.mitchell@doe.gov</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Submission Portal: </span>
                  <a href="#" className="font-medium text-primary hover:underline">
                    DOE Acquisition Portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
