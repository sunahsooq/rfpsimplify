import { CheckCircle2, FileText, ClipboardList, Paperclip } from "lucide-react";

type Props = {
  technical?: string[];
  certificationsRequired?: string[];
  experienceRequired?: string[];
  complianceRequirements?: string[];
  evaluationCriteria?: string[];
};

export function OpportunityRequirementsTab({
  technical,
  certificationsRequired,
  experienceRequired,
  complianceRequirements,
  evaluationCriteria,
}: Props) {
  const rows = [
    ...(technical?.slice(0, 6) ?? []),
    ...(certificationsRequired?.slice(0, 4).map((c) => `Certification: ${c}`) ?? []),
    ...(experienceRequired?.slice(0, 4).map((e) => `Experience: ${e}`) ?? []),
    ...(complianceRequirements?.slice(0, 4).map((c) => `Compliance: ${c}`) ?? []),
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Main Heading */}
      <header>
        <h2 className="mb-4 text-[20px] font-bold text-foreground">
          Key Requirements &amp; Evaluation Criteria
        </h2>
        <p className="text-[15px] leading-relaxed text-slate-200">
          Key requirements and evaluation drivers extracted from the solicitation text.
        </p>
      </header>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      {/* Major Factors Section */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Key Requirements</h3>
        <div className="space-y-3">
          {(rows.length ? rows : ["No requirements extracted."]).map((text) => (
            <div
              key={text}
              className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#334155]" />

      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Evaluation Criteria</h3>
        <div className="space-y-3">
          {(evaluationCriteria?.length ? evaluationCriteria.slice(0, 8) : ["No evaluation criteria extracted."]).map((c) => (
            <div key={c} className="flex gap-3 rounded-lg border border-[#334155] bg-background/5 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <p className="text-sm font-semibold text-foreground">{c}</p>
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
