import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Volume2, VolumeX, X } from "lucide-react";

interface Scene {
  title: string;
  content: string;
  highlight?: { label: string; value: string };
  subtitle?: string;
}

interface AiVideoBriefingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity?: {
    title: string;
    agency: string;
    value: string;
    dueDate: string;
    setAside: string;
    location: string;
    certs: string[];
  };
}

const defaultScenes: Scene[] = [
  {
    title: "Opportunity Overview",
    content: "This is a Cloud Infrastructure Modernization opportunity with the Department of Energy, valued between $5M and $10M.",
    highlight: { label: "Match Score", value: "87%" },
    subtitle: "DE-SOL-0012847",
  },
  {
    title: "Contract Details",
    content: "This is a Firm Fixed Price contract under the OASIS+ vehicle. The base period is 3 years with 2 option years.",
    highlight: { label: "Contract Type", value: "FFP" },
    subtitle: "Base + 2 Options",
  },
  {
    title: "Set-Aside Status",
    content: "This opportunity is set aside for Small Business concerns. Your company qualifies for this set-aside designation.",
    highlight: { label: "Set-Aside", value: "Small Business" },
    subtitle: "You Qualify ✓",
  },
  {
    title: "Required Certifications",
    content: "Two critical certifications are required: FedRAMP High and CMMC Level 2. You currently have a gap in FedRAMP High.",
    highlight: { label: "Gap Alert", value: "FedRAMP High" },
    subtitle: "Partner recommended",
  },
  {
    title: "Key Dates",
    content: "Proposals are due February 15, 2025. That gives you 45 days to prepare. Q&A deadline is January 30.",
    highlight: { label: "Days Left", value: "45" },
    subtitle: "Due Feb 15, 2025",
  },
  {
    title: "Place of Performance",
    content: "Work will be performed at DOE Headquarters in Washington, DC. Some remote work may be permitted for cleared personnel.",
    highlight: { label: "Location", value: "Washington, DC" },
    subtitle: "DOE HQ",
  },
];

export function AiVideoBriefingModal({ open, onOpenChange, opportunity }: AiVideoBriefingModalProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const scenes = defaultScenes;
  const sceneDuration = 5000; // 5 seconds per scene
  const totalDuration = scenes.length * sceneDuration;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100;
          if (newProgress >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          // Update scene based on progress
          const newScene = Math.floor(newProgress / sceneDuration);
          if (newScene !== currentScene && newScene < scenes.length) {
            setCurrentScene(newScene);
          }
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentScene, scenes.length, totalDuration, sceneDuration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const scene = scenes[currentScene];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <DialogTitle className="text-lg text-white">AI Opportunity Briefing</DialogTitle>
              <Badge className="bg-primary/20 text-primary border-0">NEW</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Player Area */}
        <div className="p-6">
          <div className="flex gap-6 items-start">
            {/* Animated Avatar */}
            <div className="relative flex-shrink-0">
              <div 
                className={`h-24 w-24 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                <span className="text-4xl">🤖</span>
              </div>
              {isPlaying && (
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-success rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full animate-ping" />
                </div>
              )}
            </div>

            {/* Scene Content */}
            <div className="flex-1 min-h-[140px]">
              <h3 className="text-xl font-bold text-white mb-2">{scene.title}</h3>
              <p className="text-slate-300 mb-4">{scene.content}</p>
              
              {scene.highlight && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-lg">
                  <span className="text-sm text-slate-300">{scene.highlight.label}:</span>
                  <span className="text-lg font-bold text-primary">{scene.highlight.value}</span>
                </div>
              )}
              
              {scene.subtitle && (
                <p className="text-sm text-slate-400 mt-2">{scene.subtitle}</p>
              )}
            </div>
          </div>

          {/* Scene Indicators */}
          <div className="flex justify-center gap-2 mt-6 mb-4">
            {scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentScene(idx);
                  setProgress(idx * sceneDuration);
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentScene 
                    ? 'bg-primary w-6' 
                    : idx < currentScene 
                      ? 'bg-primary/50' 
                      : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-slate-700 rounded-full mb-4">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${(progress / totalDuration) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-slate-800"
                onClick={handleRestart}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 text-white hover:bg-slate-800"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-slate-800"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <span className="text-sm text-slate-400">
              {formatTime(progress)} / {formatTime(totalDuration)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            <span className="font-medium text-white">{opportunity?.title || "Cloud Infrastructure Modernization"}</span>
            <span className="mx-2">•</span>
            <span>{opportunity?.agency || "Department of Energy"}</span>
          </div>
          <Badge className="bg-slate-700 text-slate-300 border-0">
            Powered by Claude AI
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
