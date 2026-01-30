import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, X, Info } from "lucide-react";

const SUGGESTED_KEYWORDS = [
  "AWS GovCloud", "Azure Government", "FedRAMP", "Zero Trust", "Kubernetes",
  "DevSecOps", "CI/CD", "Agile", "SAFe", "Microservices", "API Development",
  "Cloud Native", "Containerization", "Machine Learning", "Data Analytics"
];

type Props = {
  keywords: string[];
  onSave: (keywords: string[]) => void;
};

export function KeywordsSection({ keywords = [], onSave }: Partial<Props>) {
  const [tags, setTags] = useState<string[]>(keywords);
  const [newKeyword, setNewKeyword] = useState("");

  const handleAdd = () => {
    if (newKeyword.trim() && !tags.includes(newKeyword.trim())) {
      const newTags = [...tags, newKeyword.trim()];
      setTags(newTags);
      onSave?.(newTags);
      setNewKeyword("");
    }
  };

  const handleRemove = (keyword: string) => {
    const newTags = tags.filter((t) => t !== keyword);
    setTags(newTags);
    onSave?.(newTags);
  };

  const handleAddSuggested = (keyword: string) => {
    if (!tags.includes(keyword)) {
      const newTags = [...tags, keyword];
      setTags(newTags);
      onSave?.(newTags);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5 text-primary" />
          Keywords & Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <Input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Add a keyword..."
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          />
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Current Keywords */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Current Keywords</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 gap-2"
              >
                {tag}
                <button onClick={() => handleRemove(tag)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {tags.length === 0 && (
              <p className="text-sm text-muted-foreground">No keywords added yet</p>
            )}
          </div>
        </div>

        {/* Suggested Keywords */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Suggested Keywords</label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_KEYWORDS.filter((k) => !tags.includes(k)).map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleAddSuggested(keyword)}
                className="text-xs bg-muted text-muted-foreground px-2.5 py-1.5 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                + {keyword}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Info className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Keywords help improve your visibility in partner searches and opportunity matching.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
