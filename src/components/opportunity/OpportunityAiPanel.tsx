import { useState } from "react";
import { ChevronDown, SendHorizontal, Sparkles, AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Tone = "primary" | "warning" | "success" | "neutral";

const bubbleToneClass: Record<Tone, string> = {
  primary: "border-l-4 border-l-primary bg-secondary",
  warning: "border-l-4 border-l-warning bg-warning/10",
  success: "border-l-4 border-l-success bg-success/10",
  neutral: "border-l-4 border-l-muted-foreground bg-secondary",
};

const messages = [
  {
    tone: "primary" as const,
    text: "Readiness: 45%. Primary gaps include FedRAMP authorization and GSA Schedule access.",
  },
  {
    tone: "warning" as const,
    icon: true,
    text: "Vehicle Alert: GSA IT Schedule required. Consider teaming.",
  },
  {
    tone: "success" as const,
    text: "Estimated P(win): 65% → 78% with strong FedRAMP partner.",
  },
  {
    tone: "neutral" as const,
    text: "Incumbent: Booz Allen. Differentiate on innovation and delivery speed.",
  },
];

export function OpportunityAiPanel({ variant }: { variant: "desktop" | "mobile" }) {
  const [openMobile, setOpenMobile] = useState(false);

  const PanelBody = (
    <div className="rounded-2xl border border-border bg-nav shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#334155] px-5 py-4">
        <div>
          <p className="text-sm font-bold text-primary">rfpSimplify AI</p>
          <p className="mt-1 text-xs text-muted-foreground">Analyzing DE-SOL-0012847</p>
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 p-4">
        {messages.map((m) => (
          <div
            key={m.text}
            className={`rounded-lg p-3 text-sm leading-relaxed ${bubbleToneClass[m.tone]}`}
          >
            <div className="flex items-start gap-2">
              {m.icon && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />}
              <span className="text-foreground">{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-[#334155] p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask about this opportunity…"
            className="h-10 rounded-lg border-border bg-card text-sm text-foreground placeholder:text-muted-foreground"
          />
          <Button size="icon" className="h-10 w-10 shrink-0 rounded-lg">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          AI recommendations are advisory. Verify official solicitation documents.
        </p>
      </div>
    </div>
  );

  return variant === "desktop" ? (
    <aside>
      <div className="sticky top-24">{PanelBody}</div>
    </aside>
  ) : (
    <Collapsible open={openMobile} onOpenChange={setOpenMobile}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl border border-border bg-nav px-4 py-3 text-left shadow-card"
        >
          <div>
            <p className="text-sm font-bold text-primary">rfpSimplify AI</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Tap to view insights</p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${openMobile ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">{PanelBody}</CollapsibleContent>
    </Collapsible>
  );
}
