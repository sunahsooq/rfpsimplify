import { ExternalLink, User } from "lucide-react";

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
  { label: "Q&A Repository", href: "#" },
  { label: "Amendments", href: "#" },
];

export function OpportunityOverviewTab({ data }: { data: OpportunityOverviewData }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <section className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Summary</p>
        <p className="text-sm text-muted-foreground">
          {data.agency} is seeking a contractor to modernize and secure cloud infrastructure, improve operational
          resilience, and accelerate delivery across mission systems. This is a demo overview to mirror the MVP layout
          and visual density.
        </p>
      </section>

      {/* Metadata chips */}
      <section className="flex flex-wrap gap-2">
        {[`Agency: ${data.agency}`, `Contract: ${data.contractType}`, `Set-Aside: ${data.setAside}`, `Est. Value: ${data.estValue}`].map(
          (chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              {chip}
            </span>
          ),
        )}
      </section>

      {/* Key dates */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[18px] font-bold text-foreground">Key Dates</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">RFP Released</p>
            <p className="mt-1 text-sm font-semibold text-foreground">Jan 22, 2026</p>
          </div>

          <div className="rounded-xl border border-border bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">Q&A Closes</p>
            <p className="mt-1 text-sm font-semibold text-foreground">Feb 05, 2026</p>
          </div>

          <div className="rounded-xl border border-border bg-background/5 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">Proposal Due</p>
            <p className={"mt-1 text-sm font-semibold " + (data.urgent ? "text-urgent" : "text-foreground")}>{data.due}</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Fit checklist */}
      <section className="space-y-3">
        <h2 className="text-[18px] font-bold text-foreground">Fit Checklist</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Clear alignment with cloud modernization scope",
            "Past performance includes FedRAMP / zero trust work",
            "Team can deliver within the procurement timeline",
            "Set-aside eligibility confirmed (8(a))",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-border bg-background/5 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">{item}</p>
              <p className="mt-1 text-xs text-muted-foreground">Check internally; tune narrative to evaluation criteria.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="pt-2">
        <h2 className="mt-8 text-[18px] font-bold text-foreground">Quick Links</h2>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {quickLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center justify-between gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/80"
            >
              <span className="group-hover:underline group-hover:decoration-primary group-hover:decoration-2 group-hover:underline-offset-4">
                {l.label}
              </span>
              {l.external ? <ExternalLink className="h-4 w-4 text-muted-foreground" /> : null}
            </a>
          ))}
        </div>
      </section>

      {/* Point of contact */}
      <section className="pt-2">
        <h2 className="mt-8 text-[18px] font-bold text-foreground">Point of Contact</h2>

        <div className="mt-3 rounded-xl border border-border bg-background/5 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-muted-foreground">Contracting Officer</p>
              <p className="mt-1 truncate text-sm font-semibold text-foreground">Jane Doe (jane.doe@doe.gov)</p>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="font-semibold text-foreground">(555) 123-4567</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Email: </span>
                  <span className="font-semibold text-foreground">jane.doe@doe.gov</span>
                </div>
                <div className="text-sm sm:col-span-2">
                  <span className="text-muted-foreground">Submission Portal: </span>
                  <a href="#" className="font-semibold text-primary hover:underline">
                    https://doe.procure.gov
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
