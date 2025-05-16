import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import FAQPage from "./pages/FAQ";
import Plans from "./pages/Plans";
import Features from "./pages/Features";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ServerStatusPage from "./pages/ServerStatus";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import About from "./pages/About";
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import PlansManager from "./admin/pages/PlansManager";
import FeaturesManager from "./admin/pages/FeaturesManager";
import TestimonialsManager from "./admin/pages/TestimonialsManager";
import FAQManager from "./admin/pages/FAQManager";
import BlogManager from "./admin/pages/BlogManager";
import MediaManager from "./admin/pages/MediaManager";
import PrivacyPolicyManager from "./admin/pages/PrivacyPolicyManager";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/features" element={<Features />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/server-status" element={<ServerStatusPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="plans" element={<PlansManager />} />
                  <Route path="features" element={<FeaturesManager />} />
                  <Route path="testimonials" element={<TestimonialsManager />} />
                  <Route path="faqs" element={<FAQManager />} />
                  <Route path="blog" element={<BlogManager />} />
                  <Route path="media" element={<MediaManager />} />
                  <Route path="privacy-policy" element={<PrivacyPolicyManager />} />
                  <Route path="settings" element={<div className="text-white">Settings - Coming Soon</div>} />
                </Route>
              </Route>
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
