import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, Building2, Shield, Zap, RefreshCw, 
  Upload, ChevronRight, ChevronLeft, Search, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "SAM.gov", icon: Building2 },
  { id: 2, label: "Company", icon: Building2 },
  { id: 3, label: "Certifications", icon: Shield },
  { id: 4, label: "Capabilities", icon: Zap },
  { id: 5, label: "Review", icon: CheckCircle },
];

const setAsideOptions = [
  { id: "sb", label: "Small Business (SB)" },
  { id: "8a", label: "8(a) Business Development" },
  { id: "wosb", label: "Women-Owned (WOSB)" },
  { id: "sdvosb", label: "Service-Disabled Veteran (SDVOSB)" },
  { id: "hubzone", label: "HUBZone" },
  { id: "edwosb", label: "Economically Disadvantaged (EDWOSB)" },
];

const certificationOptions = [
  { id: "fedramp", label: "FedRAMP", levels: ["Low", "Moderate", "High"] },
  { id: "cmmc", label: "CMMC", levels: ["Level 1", "Level 2", "Level 3"] },
  { id: "iso27001", label: "ISO 27001" },
  { id: "iso9001", label: "ISO 9001" },
  { id: "soc2", label: "SOC 2 Type II" },
];

const naicsOptions = [
  { code: "541512", label: "Computer Systems Design" },
  { code: "541511", label: "Custom Computer Programming" },
  { code: "541519", label: "Other Computer Related Services" },
  { code: "541330", label: "Engineering Services" },
  { code: "541611", label: "Administrative Management Consulting" },
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uei, setUei] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const [companyData, setCompanyData] = useState({
    legalName: "",
    dba: "",
    cageCode: "",
    address: "",
    website: "",
    yearEstablished: "",
    employeeCount: "",
  });

  const [selectedSetAsides, setSelectedSetAsides] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedNaics, setSelectedNaics] = useState<string[]>(["541512"]);
  const [keywords, setKeywords] = useState<string[]>(["Cloud Migration", "Zero Trust", "DevSecOps"]);
  const [newKeyword, setNewKeyword] = useState("");

  const handleConnectSam = async () => {
    if (!uei || uei.length !== 12) {
      toast.error("Please enter a valid 12-character UEI");
      return;
    }
    setIsConnecting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setIsConnected(true);
    setCompanyData({
      legalName: "TechGov Solutions LLC",
      dba: "TechGov",
      cageCode: "7ABC1",
      address: "1234 Tech Drive, Suite 500, Arlington, VA 22201",
      website: "https://techgov.com",
      yearEstablished: "2018",
      employeeCount: "11-50",
    });
    toast.success("Successfully connected to SAM.gov!");
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    toast.success("Profile setup complete!");
    navigate("/dashboard");
  };

  const toggleSetAside = (id: string) => {
    setSelectedSetAsides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleCert = (id: string) => {
    setSelectedCerts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const profileCompleteness = Math.round(((isConnected ? 1 : 0) + (selectedSetAsides.length > 0 ? 1 : 0) + (selectedNaics.length > 0 ? 1 : 0) + (keywords.length > 0 ? 1 : 0)) / 4 * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > step.id 
                    ? "bg-green-500 text-white" 
                    : currentStep === step.id 
                      ? "bg-white text-blue-700 ring-4 ring-blue-300" 
                      : "bg-white/30 text-white/70"
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? "text-white" : "text-white/50"
                }`}>
                  {step.label}
                </span>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-3 rounded ${
                    currentStep > step.id ? "bg-green-500" : "bg-white/20"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[28px] shadow-2xl p-8">
          {/* Step 1: SAM.gov Connection */}
          {currentStep === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect to SAM.gov</h2>
              <p className="text-slate-500 mb-8">Import your company data automatically</p>

              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                    Unique Entity ID (UEI)
                  </label>
                  <Input
                    value={uei}
                    onChange={(e) => setUei(e.target.value.toUpperCase())}
                    placeholder="Enter your 12-character UEI"
                    className="font-mono text-center text-lg h-14"
                    maxLength={12}
                    disabled={isConnected}
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Find your UEI at <a href="https://sam.gov" className="text-blue-600 hover:underline" target="_blank">SAM.gov</a>
                  </p>
                </div>

                {!isConnected ? (
                  <Button
                    onClick={handleConnectSam}
                    disabled={isConnecting || uei.length !== 12}
                    className="w-full h-12 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#1e3a8a] hover:to-[#2563eb]"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Building2 className="h-5 w-5 mr-2" />
                        Connect to SAM.gov
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-green-800">Connected Successfully!</p>
                      <p className="text-sm text-green-600">{companyData.legalName}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 border-t" />
                    <span className="text-sm text-slate-400">OR</span>
                    <div className="flex-1 border-t" />
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Don't have a UEI? Enter manually →
                  </button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Zap, label: "Save Time", desc: "Auto-import" },
                    { icon: CheckCircle, label: "Accurate Data", desc: "Verified info" },
                    { icon: RefreshCw, label: "Auto-Sync", desc: "Stay updated" },
                  ].map((benefit, idx) => (
                    <div key={idx} className="text-center p-3 bg-slate-50 rounded-xl">
                      <benefit.icon className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                      <p className="text-sm font-medium text-slate-900">{benefit.label}</p>
                      <p className="text-xs text-slate-500">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Information</h2>
              <p className="text-slate-500 mb-6">Verify and complete your company details</p>

              {isConnected && (
                <Badge className="bg-green-100 text-green-700 mb-4">
                  <CheckCircle className="h-3 w-3 mr-1" /> Imported from SAM.gov
                </Badge>
              )}

              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  "Legal Business Name": companyData.legalName,
                  "DBA": companyData.dba,
                  "CAGE Code": companyData.cageCode,
                  "Website": companyData.website,
                  "Year Established": companyData.yearEstablished,
                  "Employee Count": companyData.employeeCount,
                }).map(([label, value]) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                    <Input value={value} className="bg-slate-50" readOnly={isConnected} />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <Input value={companyData.address} className="bg-slate-50" readOnly={isConnected} />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600">Drag & drop or click to upload</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Certifications */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Certifications & Set-Asides</h2>
              <p className="text-slate-500 mb-6">Select all that apply to your business</p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Set-Aside Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {setAsideOptions.map(option => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedSetAsides.includes(option.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Checkbox
                        checked={selectedSetAsides.includes(option.id)}
                        onCheckedChange={() => toggleSetAside(option.id)}
                      />
                      <span className="text-sm text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Compliance Certifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {certificationOptions.map(cert => (
                    <label
                      key={cert.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedCerts.includes(cert.id)
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Checkbox
                        checked={selectedCerts.includes(cert.id)}
                        onCheckedChange={() => toggleCert(cert.id)}
                      />
                      <span className="text-sm text-slate-700">{cert.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Capabilities */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Core Capabilities</h2>
              <p className="text-slate-500 mb-6">Help us match you with the right opportunities</p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Primary NAICS Codes</h3>
                <div className="space-y-2">
                  {naicsOptions.map(naics => (
                    <label
                      key={naics.code}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedNaics.includes(naics.code)
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Checkbox
                        checked={selectedNaics.includes(naics.code)}
                        onCheckedChange={() => {
                          setSelectedNaics(prev =>
                            prev.includes(naics.code)
                              ? prev.filter(n => n !== naics.code)
                              : [...prev, naics.code]
                          );
                        }}
                      />
                      <span className="text-sm">
                        <span className="font-mono text-slate-500 mr-2">{naics.code}</span>
                        <span className="text-slate-700">{naics.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Service Keywords (for AI matching)</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword..."
                    onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button onClick={addKeyword} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map(keyword => (
                    <Badge
                      key={keyword}
                      className="bg-blue-100 text-blue-700 px-3 py-1 cursor-pointer hover:bg-blue-200"
                      onClick={() => removeKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Geographic Coverage</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <span className="text-sm text-slate-700">CONUS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm text-slate-700">OCONUS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm text-slate-700">Specific regions</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Profile</h2>
              <p className="text-slate-500 mb-6">Make sure everything looks correct</p>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-900">Company Information</h3>
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  </div>
                  <p className="text-sm text-slate-600">{companyData.legalName}</p>
                  <p className="text-sm text-slate-500">{companyData.address}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-900">Set-Asides & Certifications</h3>
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedSetAsides.map(id => (
                      <Badge key={id} variant="outline" className="text-xs">
                        {setAsideOptions.find(o => o.id === id)?.label}
                      </Badge>
                    ))}
                    {selectedCerts.map(id => (
                      <Badge key={id} className="bg-green-100 text-green-700 text-xs">
                        {certificationOptions.find(c => c.id === id)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-900">Capabilities</h3>
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {keywords.map(keyword => (
                      <Badge key={keyword} className="bg-blue-100 text-blue-700 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-900">Profile Completeness</span>
                  <span className="font-bold text-blue-700">{profileCompleteness}%</span>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
                <p className="text-sm text-blue-600 mt-2">Add past performance to reach 100%</p>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full h-14 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white text-lg font-semibold"
              >
                Complete Setup
                <CheckCircle className="h-5 w-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-slate-500 mt-4">
                You can always update this information in Settings
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "invisible" : ""}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {currentStep < 5 && (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                disabled={currentStep === 1 && !isConnected}
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
