import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import Index from "./pages/Index";
import Cotton from "./pages/Cotton";
import DesignerFabrics from "./pages/DesignerFabrics";
import FestivalCollection from "./pages/FestivalCollection";
import BilimoraFabricShop from "./pages/BilimoraFabricShop";
import KapadDukanBilimora from "./pages/KapadDukanBilimora";
import KapdaBazarBilimora from "./pages/KapdaBazarBilimora";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && 'status' in error && (error as any).status >= 400 && (error as any).status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <GoogleAnalytics />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cotton" element={<Cotton />} />
              <Route path="/designer-fabrics" element={<DesignerFabrics />} />
              <Route path="/festival-collection" element={<FestivalCollection />} />
              <Route path="/bilimora-fabric-shop" element={<BilimoraFabricShop />} />
              <Route path="/kapad-dukan-bilimora" element={<KapadDukanBilimora />} />
              <Route path="/kapda-bazar-bilimora" element={<KapdaBazarBilimora />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
