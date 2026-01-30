import { Progress } from "@/components/ui/progress";

type Props = {
  completeness: number;
  sectionsComplete: number;
  sectionsTotal: number;
};

export function ProfileCompletenessCard({ completeness, sectionsComplete, sectionsTotal }: Props) {
  const incomplete = sectionsTotal - sectionsComplete;
  
  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm opacity-90">Profile Completeness</p>
          <p className="text-3xl font-extrabold mt-1">{completeness}%</p>
          <p className="text-sm opacity-80 mt-2">
            Complete {incomplete} more sections to improve match accuracy
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
            <p className="text-xl font-bold">{sectionsComplete}</p>
            <p className="text-xs opacity-80">Sections Done</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
            <p className="text-xl font-bold text-accent">{incomplete}</p>
            <p className="text-xs opacity-80">Incomplete</p>
          </div>
        </div>
      </div>
      <Progress 
        value={completeness} 
        className="mt-4 h-2 bg-white/20" 
      />
    </div>
  );
}
