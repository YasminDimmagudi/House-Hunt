import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Profile from "@/pages/profile/Profile";
import { AuthProvider } from "@/context/AuthContext";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Properties = lazy(() => import("./pages/Properties"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const OwnerDashboard = lazy(() => import("./pages/OwnerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PropertyManagement = lazy(() => import("./pages/services/PropertyManagement"));
const TenantScreening = lazy(() => import("./pages/services/TenantScreening"));
const Maintenance = lazy(() => import("./pages/services/Maintenance"));
const LegalSupport = lazy(() => import("./pages/services/LegalSupport"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Profile pages

const Inquiries = lazy(() => import("./pages/profile/Inquiries"));
const AccountSettings = lazy(() => import("./pages/profile/AccountSettings"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Suspense fallback={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-white text-xl">Loading...</div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/services/property-management" element={<PropertyManagement />} />
                    <Route path="/services/tenant-screening" element={<TenantScreening />} />
                    <Route path="/services/maintenance" element={<Maintenance />} />
                    <Route path="/services/legal-support" element={<LegalSupport />} />
                    
                    {/* Profile routes */}
                    
                    <Route path="/profile/inquiries" element={<Inquiries />} />
                    <Route path="/profile/settings" element={<AccountSettings />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
