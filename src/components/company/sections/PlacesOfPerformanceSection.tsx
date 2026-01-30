import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, X, Info } from "lucide-react";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", 
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", 
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", 
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming", "Guam", "US Virgin Islands"
];

type Props = {
  selectedStates: string[];
  onSave: (states: string[]) => void;
};

export function PlacesOfPerformanceSection({ selectedStates, onSave }: Props) {
  const [states, setStates] = useState<string[]>(selectedStates);
  const [selectedState, setSelectedState] = useState<string>("");

  const handleAdd = () => {
    if (selectedState && !states.includes(selectedState)) {
      const newStates = [...states, selectedState];
      setStates(newStates);
      onSave(newStates);
      setSelectedState("");
    }
  };

  const handleRemove = (state: string) => {
    const newStates = states.filter((s) => s !== state);
    setStates(newStates);
    onSave(newStates);
  };

  const handleNationwide = () => {
    setStates(US_STATES);
    onSave(US_STATES);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Places of Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a state..." />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.filter((s) => !states.includes(s)).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!selectedState}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <Badge 
              key={state} 
              variant="secondary" 
              className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 gap-2"
            >
              {state}
              <button onClick={() => handleRemove(state)} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {states.length < US_STATES.length && (
            <button
              onClick={handleNationwide}
              className="border-2 border-dashed border-muted-foreground/30 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Nationwide (All States)
            </button>
          )}
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Info className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground">
            💡 Adding more states increases your match pool. Currently matching against{" "}
            <strong className="text-foreground">{states.length} states</strong>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
