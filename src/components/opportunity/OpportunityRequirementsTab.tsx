import { CheckCircle2, FileText, ClipboardList, Paperclip } from "lucide-react";

export function OpportunityRequirementsTab() {
  return (
    <div className="space-y-6">
      {/* Main Heading */}
      <header>
        <h2 className="mb-4 text-[20px] font-bold text-foreground">
          Key Requirements &amp; Evaluation Criteria
        </h2>
        <p className="text-[15px] leading-relaxed text-slate-200">
          The Government will evaluate proposals using a best-value tradeoff source selection. Technical
          capability and past performance are significantly more important than price. The evaluation will
          focus on demonstrated experience with FedRAMP-authorized cloud migrations and CMMC Level 2
          compliance.
        </p>
      </header>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Major Factors Section */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Major Factors</h3>
        <div className="space-y-3">
          {[
            {
              title: "Technical Approach (40%)",
              detail:
                "Detailed migration strategy, security controls, performance SLAs, innovation differentiation",
            },
            {
              title: "Past Performance (30%)",
              detail:
                "3+ relevant contracts in last 5 years, similar scope/scale to DOE cloud modernization",
            },
            {
              title: "Management Approach (15%)",
              detail: "Staffing plan, key personnel, risk mitigation strategy",
            },
            {
              title: "Price (15%)",
              detail: "Realistic, competitive, best-value determination",
            },
          ].map((row) => (
            <div
              key={row.title}
              className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{row.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Solicitation Instructions Section */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Solicitation Instructions</h3>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Section L */}
          <div className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Section L
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">Instructions to Offerors</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                50-page limit, electronic submission via portal, proposal due Feb 15, 2026
              </p>
            </div>
          </div>

          {/* Section M */}
          <div className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4">
            <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Section M
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">Evaluation Criteria</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Tradeoff source selection, non-price factors significantly more important than price
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4">
            <Paperclip className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Attachments
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">Supporting Documents</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Performance Work Statement (PWS), Q&amp;A amendments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Disclaimer */}
      <p className="text-xs italic text-muted-foreground">
        Summarized from solicitation DE-SOL-0012847. Always refer to the official documents on SAM.gov.
      </p>
    </div>
  );
}
