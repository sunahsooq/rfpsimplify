import { useParams } from "react-router-dom";
import { Shield, CheckCircle, Building2, MapPin, Users, Calendar, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/Logo";

export default function PartnerInvitation() {
  const { inviteId } = useParams();

  // Mock invitation data
  const invitation = {
    id: inviteId,
    invitingCompany: {
      name: "TechGov Solutions LLC",
      initials: "TG",
      location: "Arlington, VA",
      industry: "IT Services",
      size: "45 employees",
      verified: true,
    },
    opportunity: {
      title: "Cloud Infrastructure Modernization Services",
      agency: "Department of Energy",
      solicitationId: "DE-SOL-0012847",
      contractType: "FFP",
      value: "$5M - $10M",
      setAside: "Small Business",
      dueDate: "2026-03-15",
      daysLeft: 45,
    },
    capabilities: ["FedRAMP Authorization", "Cloud Migration", "AWS GovCloud", "CMMC Level 2"],
    message: "Your FedRAMP High authorization and DoD cloud experience makes you an ideal partner for this DOE opportunity. We believe a teaming arrangement would significantly strengthen our proposal.",
  };

  const getDueDateColor = (daysLeft: number) => {
    if (daysLeft < 7) return "text-red-600 bg-red-50";
    if (daysLeft < 14) return "text-orange-600 bg-orange-50";
    return "text-slate-600 bg-slate-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="w-full max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-1.5">
            Partner Invitation
          </Badge>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Shield className="h-4 w-4" />
            Secure
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <CheckCircle className="h-4 w-4" />
            Verified Business
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Building2 className="h-4 w-4" />
            SAM.gov Data
          </div>
        </div>

        {/* Main Invitation Card */}
        <div className="bg-white rounded-[28px] shadow-2xl p-10">
          {/* Inviting Company */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {invitation.invitingCompany.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{invitation.invitingCompany.name}</h2>
                {invitation.invitingCompany.verified && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-500">
                {invitation.invitingCompany.location} • {invitation.invitingCompany.industry} • {invitation.invitingCompany.size}
              </p>
              <p className="text-sm text-slate-600 mt-1 italic">
                Invited you to team on an opportunity
              </p>
            </div>
          </div>

          {/* Opportunity Summary */}
          <div className="bg-blue-50 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-slate-900 mb-2">{invitation.opportunity.title}</h3>
            <p className="text-sm text-slate-600 mb-3">
              {invitation.opportunity.agency} • {invitation.opportunity.solicitationId}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-blue-100 text-blue-700">{invitation.opportunity.contractType}</Badge>
              <Badge className="bg-purple-100 text-purple-700">{invitation.opportunity.value}</Badge>
              <Badge className="bg-green-100 text-green-700">{invitation.opportunity.setAside}</Badge>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${getDueDateColor(invitation.opportunity.daysLeft)}`}>
              <Calendar className="h-4 w-4" />
              Due: {new Date(invitation.opportunity.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="ml-1">({invitation.opportunity.daysLeft} days remaining)</span>
            </div>
          </div>

          {/* Capabilities Needed */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Capabilities Needed</h4>
            <div className="flex flex-wrap gap-2">
              {invitation.capabilities.map((cap, index) => (
                <Badge key={index} className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1">
                  {cap}
                </Badge>
              ))}
            </div>
          </div>

          {/* Why You Were Invited */}
          <div className="bg-slate-50 rounded-xl p-5 mb-8 border-l-4 border-blue-400">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700 italic">"{invitation.message}"</p>
            </div>
          </div>

          {/* Response Options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button className="h-12 bg-gradient-to-r from-[#16a34a] to-[#22c55e] hover:from-[#15803d] hover:to-[#16a34a] text-white rounded-xl font-semibold">
              <CheckCircle className="h-5 w-5 mr-2" />
              Interested
            </Button>
            <Button className="h-12 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white rounded-xl font-semibold">
              <MessageSquare className="h-5 w-5 mr-2" />
              Need More Info
            </Button>
            <Button variant="outline" className="h-12 rounded-xl font-semibold border-slate-300">
              <X className="h-5 w-5 mr-2" />
              Not Interested
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-xs text-slate-400">
            Your response is only shared with {invitation.invitingCompany.name}. We never share your information without consent.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm mb-2">
            Powered by <span className="font-semibold">rfpSimplify</span>
          </p>
          <a href="/signup" className="text-white hover:text-white/90 text-sm font-medium underline underline-offset-4">
            Join rfpSimplify to discover more teaming opportunities →
          </a>
        </div>
      </div>
    </div>
  );
}
