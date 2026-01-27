import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap,
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCw,
  X,
  Edit2,
  Clock
} from "lucide-react";

const parsedFields = [
  { label: "Title", value: "Cloud Infrastructure Modernization Services", confidence: 95, original: null },
  { label: "Solicitation ID", value: "DE-SOL-0012847", confidence: 98, original: null },
  { label: "Agency", value: "Department of Energy", confidence: 92, original: null },
  { label: "Set-Aside", value: "Small Business", confidence: 85, original: "SB Set-aside" },
  { label: "NAICS Codes", value: "541512, 541519", confidence: 78, original: null },
  { label: "Due Date", value: "March 15, 2025", confidence: 90, original: null },
  { label: "Est. Value", value: "$5M - $10M", confidence: 72, original: "$5-10 Million" },
  { label: "Contract Type", value: "FFP", confidence: 88, original: null },
  { label: "Place of Performance", value: "Washington, DC", confidence: 82, original: null },
];

const validationChecklist = [
  { id: "title", label: "Title is accurate", checked: true },
  { id: "sol_id", label: "Solicitation ID correct", checked: true },
  { id: "agency", label: "Agency identified", checked: true },
  { id: "naics", label: "NAICS codes verified", checked: false },
  { id: "setaside", label: "Set-aside confirmed", checked: false },
  { id: "dates", label: "Dates are correct", checked: true },
  { id: "value", label: "Value range reasonable", checked: false },
];

const auditTrail = [
  { action: "Parsed from SAM.gov", time: "2 hours ago", user: "System" },
  { action: "Auto-flagged: Low confidence on value field", time: "2 hours ago", user: "System" },
  { action: "Review started", time: "5 min ago", user: "Admin" },
];

export default function AdminRFPReview() {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(validationChecklist);
  const [notes, setNotes] = useState("");

  const toggleCheck = (itemId: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* Admin Nav */}
      <nav className="bg-admin-surface border-b border-admin-border px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-white">rfpSimplify</span>
              <Badge className="bg-admin-accent/20 text-admin-accent border-admin-accent/30 ml-2">
                ADMIN
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin/qa-queue" className="text-gray-400 hover:text-white transition-colors">QA Queue</Link>
              <Link to={`/admin/rfp-review/${id}`} className="text-white font-medium">RFP Review</Link>
            </div>
          </div>
          <Badge variant="outline" className="border-success/50 text-success">
            Production
          </Badge>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Sub Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin/qa-queue" className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Queue
            </Link>
            <h1 className="text-2xl font-bold text-white">Cloud Infrastructure Modernization Services</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-400">DE-SOL-0012847</span>
              <Badge className="bg-warning/20 text-warning">Confidence: 82%</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">1 of 23</span>
            <Button size="sm" variant="outline" className="border-admin-border text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-admin-border text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Raw Source */}
          <Card className="bg-admin-surface border-admin-border">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                📄 Raw Source
              </h2>
              <div className="bg-admin-bg rounded-lg p-4 font-mono text-sm text-gray-300 max-h-[600px] overflow-y-auto">
                <p className="mb-2">
                  <span className="text-success">SOLICITATION NUMBER:</span> DE-SOL-0012847
                </p>
                <p className="mb-2">
                  <span className="text-success">TITLE:</span> Cloud Infrastructure Modernization Services
                </p>
                <p className="mb-2">
                  <span className="text-success">AGENCY:</span> Department of Energy
                </p>
                <p className="mb-2">
                  <span className="text-warning">SET-ASIDE:</span> SB Set-aside
                </p>
                <p className="mb-2">
                  <span className="text-success">NAICS:</span> 541512
                </p>
                <p className="mb-2">
                  <span className="text-success">RESPONSE DATE:</span> 03/15/2025
                </p>
                <p className="mb-4">
                  <span className="text-destructive">ESTIMATED VALUE:</span> $5-10 Million
                </p>
                <p className="text-gray-400 text-xs mb-2">DESCRIPTION:</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  The Department of Energy is seeking qualified small business contractors to provide cloud infrastructure modernization services. The scope includes migration of legacy applications to cloud platforms, implementation of DevSecOps practices, and ongoing maintenance and support services...
                </p>
              </div>
              <Badge className="mt-3 bg-primary/20 text-primary">SAM.gov</Badge>
            </CardContent>
          </Card>

          {/* Center: Parsed Fields */}
          <Card className="bg-admin-surface border-admin-border">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                ✏️ Parsed Fields
              </h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {parsedFields.map((field, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">{field.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${
                          field.confidence >= 90 ? 'text-success' : 
                          field.confidence >= 75 ? 'text-warning' : 
                          'text-destructive'
                        }`}>
                          {field.confidence}%
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit2 className="h-3 w-3 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                    <Input 
                      value={field.value}
                      readOnly
                      className="bg-admin-bg border-admin-border text-white"
                    />
                    {field.original && (
                      <p className="text-xs text-warning mt-1">
                        Original: {field.original} → Corrected
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right: Actions */}
          <div className="space-y-6">
            {/* Validation Checklist */}
            <Card className="bg-admin-surface border-admin-border">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold text-white mb-4">Validation Checklist</h2>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={item.checked}
                        onCheckedChange={() => toggleCheck(item.id)}
                      />
                      <span className={`text-sm ${item.checked ? 'text-success' : 'text-gray-400'}`}>
                        {item.checked ? '☑️' : '☐'} {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Actions */}
            <Card className="bg-admin-surface border-admin-border">
              <CardContent className="p-4 space-y-3">
                <h2 className="text-lg font-bold text-white mb-2">Review Actions</h2>
                <Button className="w-full bg-success hover:bg-success/80 text-white">
                  <Check className="h-4 w-4 mr-2" />
                  Approve & Publish
                </Button>
                <Button className="w-full bg-warning hover:bg-warning/80 text-black">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Flag for Re-parse
                </Button>
                <Button className="w-full bg-destructive hover:bg-destructive/80 text-white">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="w-full border-admin-border text-gray-400">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Skip to Next
                </Button>
              </CardContent>
            </Card>

            {/* Review Notes */}
            <Card className="bg-admin-surface border-admin-border">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">Review Notes</h2>
                <Textarea 
                  placeholder="Add notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-admin-bg border-admin-border text-white min-h-[80px]"
                />
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Card className="bg-admin-surface border-admin-border">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold text-white mb-3">Audit Trail</h2>
                <div className="space-y-2">
                  {auditTrail.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Clock className="h-3 w-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-300">{item.action}</p>
                        <p className="text-gray-500">{item.time} • {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Shortcuts */}
            <Card className="bg-admin-surface border-admin-border">
              <CardContent className="p-4">
                <h2 className="text-sm font-bold text-white mb-2">Keyboard Shortcuts</h2>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                  <span>⌘A: Approve</span>
                  <span>⌘R: Reject</span>
                  <span>⌘F: Flag</span>
                  <span>→: Next</span>
                  <span>←: Previous</span>
                  <span>⌘S: Save Draft</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
