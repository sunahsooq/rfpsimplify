import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CompanyProvider } from "@/contexts/CompanyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import Pipeline from "./pages/Pipeline";
import Company from "./pages/Company";
import Settings from "./pages/Settings";
import PartnerDiscovery from "./pages/PartnerDiscovery";
import MyPartners from "./pages/MyPartners";
import Marketplace from "./pages/Marketplace";
import Notifications from "./pages/Notifications";
import BidBrief from "./pages/BidBrief";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CompanyProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
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
              <ProtectedRoute><Pipeline /></ProtectedRoute>
            } />
            <Route path="/company" element={
              <ProtectedRoute><Company /></ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute><Settings /></ProtectedRoute>
            } />
            <Route path="/partners/discover" element={
              <ProtectedRoute><PartnerDiscovery /></ProtectedRoute>
            } />
            <Route path="/partners/my" element={
              <ProtectedRoute><MyPartners /></ProtectedRoute>
            } />
            <Route path="/marketplace" element={
              <ProtectedRoute><Marketplace /></ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute><Notifications /></ProtectedRoute>
            } />
            <Route path="/brief/:opportunityId" element={
              <ProtectedRoute><BidBrief /></ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CompanyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
