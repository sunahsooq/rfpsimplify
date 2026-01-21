import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/company" element={<Company />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/partners/discover" element={<PartnerDiscovery />} />
          <Route path="/partners/my" element={<MyPartners />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/brief/:opportunityId" element={<BidBrief />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
