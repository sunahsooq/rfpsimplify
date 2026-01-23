import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import type { CompanyProfile } from "@/hooks/useCompanyProfile";

type Capabilities = {
  core_capabilities: string[];
  capability_confidence: "Self" | "AI-extracted" | "Verified";
  capability_statement_url: string | null;
  last_extracted_at: string | null;
};

type Props = {
  profile: CompanyProfile | null;
  onSave: (capabilities: Capabilities) => Promise<void>;
};

export function CapabilitiesTab({ profile, onSave }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [form, setForm] = useState<Capabilities>({
    core_capabilities: [],
    capability_confidence: "Self",
    capability_statement_url: null,
    last_extracted_at: null,
  });

  useEffect(() => {
    if (profile?.capabilities) {
      const caps = profile.capabilities as Capabilities;
      setForm({
        core_capabilities: caps.core_capabilities ?? [],
        capability_confidence: caps.capability_confidence ?? "Self",
        capability_statement_url: caps.capability_statement_url ?? null,
        last_extracted_at: caps.last_extracted_at ?? null,
      });
    }
  }, [profile]);

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    if (form.core_capabilities.includes(tag)) {
      toast.error("Tag already exists");
      return;
    }
    setForm((prev) => ({ ...prev, core_capabilities: [...prev.core_capabilities, tag] }));
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      core_capabilities: prev.core_capabilities.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async () => {
    if (!profile) {
      toast.error("Save Identity first");
      return;
    }
    setIsSaving(true);
    try {
      await onSave(form);
      toast.success("Capabilities saved");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          Capabilities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Core Capabilities Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Core Capabilities</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.core_capabilities.map((tag) => (
              <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="e.g. Cloud Migration"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" variant="secondary" size="icon" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Add normalized capability tags (press Enter or +).</p>
        </div>

        {/* Capability Statement URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Capability Statement URL</label>
          <Input
            type="url"
            value={form.capability_statement_url ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, capability_statement_url: e.target.value || null }))}
            placeholder="https://..."
          />
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} disabled={isSaving || !profile}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save Capabilities"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
