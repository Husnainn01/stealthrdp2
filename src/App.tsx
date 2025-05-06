import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import FAQPage from "./pages/FAQ";
import Plans from "./pages/Plans";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import PlansManager from "./admin/pages/PlansManager";
import FeaturesManager from "./admin/pages/FeaturesManager";
import TestimonialsManager from "./admin/pages/TestimonialsManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/features" element={<Features />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            {/* Add more admin routes as they are developed */}
            <Route path="plans" element={<PlansManager />} />
            <Route path="features" element={<FeaturesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="blog" element={<div className="text-white">Blog Management - Coming Soon</div>} />
            <Route path="media" element={<div className="text-white">Media Library - Coming Soon</div>} />
            <Route path="settings" element={<div className="text-white">Settings - Coming Soon</div>} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
