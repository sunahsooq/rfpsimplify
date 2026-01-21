import { CheckCircle2 } from "lucide-react";

export function OpportunityRequirementsTab() {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-[20px] font-bold text-foreground">Key Requirements &amp; Evaluation Criteria</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          The Government will evaluate proposals based on technical approach, past performance, and price. Primary
          evaluation factors include demonstrated experience with FedRAMP migrations and CMMC Level 2 compliance.
        </p>
      </header>

      <section className="space-y-3">
        {[
          {
            title: "Technical Approach (40% weight)",
            detail: "Detailed migration plan, security controls, performance SLAs",
          },
          {
            title: "Past Performance (30%)",
            detail: "Relevant DOE or similar agency contracts within last 5 years",
          },
          {
            title: "Management Approach (15%)",
            detail: "Staffing plan, risk mitigation",
          },
          {
            title: "Price (15%)",
            detail: "Best value tradeoff",
          },
        ].map((row) => (
          <div key={row.title} className="flex gap-3 rounded-xl border border-border bg-background/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{row.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="h-px w-full bg-border" />

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Section L/M Highlights</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Section L</p>
            <p className="mt-1 text-sm font-semibold text-foreground">Instructions to Offerors</p>
            <p className="mt-1 text-sm text-muted-foreground">50 pages max, due Feb 15</p>
          </div>
          <div className="rounded-xl border border-border bg-background/5 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Section M</p>
            <p className="mt-1 text-sm font-semibold text-foreground">Evaluation Criteria</p>
            <p className="mt-1 text-sm text-muted-foreground">Tradeoff source selection</p>
          </div>
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        Extracted from solicitation DE-SOL-0012847. Always verify official document.
      </p>
    </div>
  );
}
