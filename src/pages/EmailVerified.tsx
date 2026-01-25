import { useNavigate } from "react-router-dom";
import { CheckCircle, Building2, Award, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

export default function EmailVerified() {
  const navigate = useNavigate();
  const userEmail = "sarah.chen@techsolutions.com"; // Replace with actual user email from auth

  const nextSteps = [
    {
      icon: Building2,
      title: "Connect SAM.gov",
      description: "Import your company registration data automatically",
    },
    {
      icon: Award,
      title: "Add Certifications",
      description: "Highlight your 8(a), WOSB, HUBZone, and other certs",
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description: "Find matching contracts from SAM.gov and more",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg" />
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-2xl p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#16a34a] to-[#22c55e] rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-14 w-14 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Email Verified!
          </h1>
          <p className="text-center text-gray-500 mb-8">
            {userEmail}
          </p>

          {/* What's Next Section */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              What's Next
            </h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <Button
            onClick={() => navigate("/company")}
            className="w-full h-12 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white rounded-xl font-semibold shadow-lg mb-4"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-center text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            skip to dashboard →
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-8">
          Welcome to the GovCon community
        </p>
      </div>
    </div>
  );
}
