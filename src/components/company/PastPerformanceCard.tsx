import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, Pencil, Trash2, Shield } from "lucide-react";
import type { PastPerformance } from "@/hooks/useCompanyProfile";

type Props = {
  performance: PastPerformance;
  onDelete: (id: string) => void;
};

const cparsColors: Record<string, string> = {
  Exceptional: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Very Good": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Satisfactory: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Marginal: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Unsatisfactory: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Completed: "bg-blue-500/20 text-blue-400",
  Terminated: "bg-red-500/20 text-red-400",
};

export function PastPerformanceCard({ performance: pp, onDelete }: Props) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const referenceContact = pp.reference_contact as { name?: string; title?: string; email?: string; phone?: string } | null;

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-5">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-foreground truncate">{pp.contract_name}</h3>
              <Badge variant="outline" className={statusColors[pp.status] || "bg-muted text-muted-foreground"}>
                {pp.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {pp.agency_or_client}
              </span>
              {pp.contract_number && (
                <>
                  <span>•</span>
                  <span>{pp.contract_number}</span>
                </>
              )}
            </div>
          </div>

          {/* CPARS Rating Badge */}
          {pp.cpars_rating && (
            <Badge variant="outline" className={`${cparsColors[pp.cpars_rating] || "bg-muted"} shrink-0`}>
              {pp.cpars_rating}
            </Badge>
          )}
        </div>

        {/* Contract Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Role</p>
            <p className="font-medium text-foreground">
              {pp.role}
              {pp.work_share_percentage && (
                <span className="text-muted-foreground ml-1">({pp.work_share_percentage}%)</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Contract Type</p>
            <p className="font-medium text-foreground">{pp.contract_type}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Value</p>
            <p className="font-medium text-foreground">{pp.contract_value_range}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Period</p>
            <p className="font-medium text-foreground">
              {formatDate(pp.pop_start_date)} — {formatDate(pp.pop_end_date)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Client Type</p>
            <p className="font-medium text-foreground flex items-center gap-1">
              {pp.client_type}
              {pp.client_type === "Federal" && <Shield className="h-3 w-3 text-primary" />}
            </p>
          </div>
        </div>

        {/* Scope Description */}
        {pp.scope_description && (
          <div className="mb-4">
            <p className="text-muted-foreground text-xs mb-1">Scope of Work</p>
            <p className="text-sm text-foreground/80">{pp.scope_description}</p>
          </div>
        )}

        {/* Scope Tags */}
        {pp.scope_tags && pp.scope_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pp.scope_tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Reference Contact & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {referenceContact?.name ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {referenceContact.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{referenceContact.name}</p>
                <p className="text-xs text-muted-foreground">{referenceContact.title}</p>
              </div>
              <div className="flex gap-1 ml-2">
                {referenceContact.email && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <a href={`mailto:${referenceContact.email}`}>
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
                {referenceContact.phone && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <a href={`tel:${referenceContact.phone}`}>
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">No reference contact</span>
          )}
          
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(pp.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
