import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();

  const title = useMemo(() => {
    if (!id) return "Opportunity";
    return id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="mx-auto w-full max-w-[1200px] px-8 pb-10 pt-6">
        <div className="mb-6">
          <Button asChild variant="outline" className="border-primary/40 text-foreground hover:bg-primary/10">
            <Link to="/opportunities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Opportunities
            </Link>
          </Button>
        </div>

        <h1 className="text-[32px] font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">Placeholder detail page for /opportunity/{`{id}`}</p>
      </main>
    </div>
  );
}
