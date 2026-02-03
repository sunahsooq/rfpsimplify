import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { PipelineProvider } from "@/contexts/PipelineContext";
import { PartnerProvider } from "@/contexts/PartnerContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import PipelineNew from "./pages/PipelineNew";
import Company from "./pages/Company";
import SettingsNew from "./pages/SettingsNew";
import PartnerDiscoveryNew from "./pages/PartnerDiscoveryNew";
import PartnerRequests from "./pages/PartnerRequests";
import NotificationsNew from "./pages/NotificationsNew";
import Marketplace from "./pages/Marketplace";
import BidBrief from "./pages/BidBrief";
import NotFound from "./pages/NotFound";
import PasswordReset from "./pages/PasswordReset";
import EmailVerified from "./pages/EmailVerified";
import CRM from "./pages/CRM";
import Recompetes from "./pages/Recompetes";
import MyPartners from "./pages/MyPartners";
import AdminQAQueue from "./pages/AdminQAQueue";
import AdminRFPReview from "./pages/AdminRFPReview";
import PartnerInvitation from "./pages/PartnerInvitation";
import PartnerRequestsInbox from "./pages/PartnerRequestsInbox";
import PartnerConversation from "./pages/PartnerConversation";
import BidBriefShareable from "./pages/BidBriefShareable";
import OnboardingWizard from "./pages/OnboardingWizard";
import SBAPartnerSearch from "./pages/SBAPartnerSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CompanyProvider>
          <PipelineProvider>
            <PartnerProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/forgot-password" element={<PasswordReset />} />
                  <Route path="/email-verified" element={<EmailVerified />} />
                  <Route path="/invitation/:inviteId" element={<PartnerInvitation />} />
                  <Route path="/onboarding" element={<OnboardingWizard />} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                  } />
                  <Route path="/opportunities" element={
                    <ProtectedRoute><Opportunities /></ProtectedRoute>
                  } />
                  <Route path="/opportunity/:id" element={
                    <ProtectedRoute><OpportunityDetail /></ProtectedRoute>
                  } />
                  <Route path="/pipeline" element={
                    <ProtectedRoute><PipelineNew /></ProtectedRoute>
                  } />
                  <Route path="/recompetes" element={
                    <ProtectedRoute><Recompetes /></ProtectedRoute>
                  } />
                  <Route path="/company" element={
                    <ProtectedRoute><Company /></ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute><SettingsNew /></ProtectedRoute>
                  } />
                  <Route path="/partners/discover" element={
                    <ProtectedRoute><PartnerDiscoveryNew /></ProtectedRoute>
                  } />
                  <Route path="/partners/requests" element={
                    <ProtectedRoute><PartnerRequests /></ProtectedRoute>
                  } />
                  <Route path="/partners" element={
                    <ProtectedRoute><MyPartners /></ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute><NotificationsNew /></ProtectedRoute>
                  } />
                  <Route path="/marketplace" element={
                    <ProtectedRoute><Marketplace /></ProtectedRoute>
                  } />
                  <Route path="/crm" element={
                    <ProtectedRoute><CRM /></ProtectedRoute>
                  } />
                  <Route path="/brief/:opportunityId" element={
                    <ProtectedRoute><BidBrief /></ProtectedRoute>
                  } />
                  <Route path="/opportunities/:id/bid-brief" element={
                    <ProtectedRoute><BidBriefShareable /></ProtectedRoute>
                  } />
                  <Route path="/partner-requests" element={
                    <ProtectedRoute><PartnerRequestsInbox /></ProtectedRoute>
                  } />
                  <Route path="/partner-requests/:requestId/conversation" element={
                    <ProtectedRoute><PartnerConversation /></ProtectedRoute>
                  } />
                  <Route path="/partner-search" element={
                    <ProtectedRoute><SBAPartnerSearch /></ProtectedRoute>
                  } />
                  <Route path="/sba-partners" element={
                    <ProtectedRoute><SBAPartnerSearch /></ProtectedRoute>
                  } />

                  {/* Admin routes */}
                  <Route path="/admin/qa-queue" element={
                    <ProtectedRoute><AdminQAQueue /></ProtectedRoute>
                  } />
                  <Route path="/admin/rfp-review/:id" element={
                    <ProtectedRoute><AdminRFPReview /></ProtectedRoute>
                  } />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </PartnerProvider>
          </PipelineProvider>
        </CompanyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
