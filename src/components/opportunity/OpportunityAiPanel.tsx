import { useMemo, useState } from "react";
import { ChevronDown, SendHorizontal, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Tone = "primary" | "warning" | "success" | "neutral";

const bubbleToneClass: Record<Tone, string> = {
  primary: "border border-primary/60 bg-secondary text-foreground",
  warning: "bg-warning/15 text-warning border border-warning/30",
  success: "bg-success/15 text-success border border-success/30",
  neutral: "bg-secondary text-muted-foreground border border-border",
};

export function OpportunityAiPanel({ variant }: { variant: "desktop" | "mobile" }) {
  const [openMobile, setOpenMobile] = useState(false);

  const messages = useMemo(
    () =>
      [
        {
          tone: "primary" as const,
          text: "Your Readiness: 45%. Primary gaps: FedRAMP authorization and GSA Schedule 70 access.",
        },
        {
          tone: "warning" as const,
          text: "Vehicle Alert: GSA IT Schedule 70 required. Consider teaming partner.",
        },
        {
          tone: "success" as const,
          text: "P(win) Estimate: 65% base → 78% with strong GSA/FedRAMP partner.",
        },
        {
          tone: "neutral" as const,
          text: "Incumbent: Booz Allen (high re-win probability). Differentiate on innovation.",
        },
      ] as const,
    [],
  );

  const PanelBody = (
    <div className="rounded-2xl border border-border bg-nav shadow-card">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <p className="text-sm font-bold text-primary">rfpSimplify AI</p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">Analyzing DE-SOL-0012847</p>
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="space-y-3 p-5">
        {messages.map((m) => (
          <div key={m.text} className={`rounded-xl p-4 text-sm font-medium ${bubbleToneClass[m.tone]}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="border-t border-border p-5">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask about this opportunity…"
            className="h-11 rounded-xl border-border bg-card text-foreground placeholder:text-muted-foreground"
          />
          <Button size="icon" className="h-11 w-11 rounded-xl">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">AI recommendations are advisory. Verify official documents.</p>
      </div>
    </div>
  );

  return (
    <>
      {variant === "desktop" ? (
        <aside>
          <div className="sticky top-[92px]">{PanelBody}</div>
        </aside>
      ) : (
        <div>
          <Collapsible open={openMobile} onOpenChange={setOpenMobile}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-nav px-4 py-3 text-left shadow-card"
              >
                <div>
                  <p className="text-sm font-bold text-primary">rfpSimplify AI</p>
                  <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Tap to view insights</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${openMobile ? "rotate-180" : ""}`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">{PanelBody}</CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </>
  );
}
