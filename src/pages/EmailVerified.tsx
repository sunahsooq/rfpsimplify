import { useNavigate } from "react-router-dom";
import { CheckCircle, Building2, Award, Search, ArrowRight, Link2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/hooks/useAuth";

export default function EmailVerified() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email || "sarah.chen@techsolutions.com";

  const nextSteps = [
    {
      icon: Link2,
      title: "Connect SAM.gov",
      description: "Auto-import your company data",
    },
    {
      icon: Shield,
      title: "Add Certifications",
      description: "8(a), WOSB, SDVOSB, HUBZone",
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description: "Get matched to federal RFPs",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating confetti elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1.1s' }} />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-2xl p-10">
          {/* Success Icon with animation */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#16a34a] to-[#22c55e] rounded-full flex items-center justify-center shadow-lg animate-[pulse_2s_ease-in-out_infinite]">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[28px] font-extrabold text-center text-slate-900 mb-2">
            Email Verified!
          </h1>
          <p className="text-center text-slate-500 mb-8">
            Your email <span className="font-medium text-slate-700">{userEmail}</span> has been successfully verified. You're all set to start using rfpSimplify.
          </p>

          {/* What's Next Section */}
          <div className="bg-slate-50 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="h-4 w-4 text-slate-500" />
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                What's Next
              </h2>
            </div>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <Button
            onClick={() => navigate("/onboarding")}
            className="w-full h-14 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white rounded-xl font-semibold shadow-lg text-base"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-center text-slate-500 hover:text-slate-700 text-sm transition-colors mt-4"
          >
            or <span className="underline">skip to dashboard</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-8">
          Need help?{" "}
          <a href="#" className="text-amber-300 hover:text-amber-200 font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
