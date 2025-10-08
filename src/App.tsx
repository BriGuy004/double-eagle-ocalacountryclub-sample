import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { BrandProvider } from "@/contexts/BrandContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import StateProducts from "./pages/StateProducts";
import CityProducts from "./pages/CityProducts";
import Hotels from "./pages/Hotels";
import Dining from "./pages/Dining";
import Entertainment from "./pages/Entertainment";
import Travel from "./pages/Travel";
import Shopping from "./pages/Shopping";
import Golf from "./pages/Golf";
import MemberDashboard from "./pages/MemberDashboard";
import RedemptionPage from "./pages/RedemptionPage";
import BrandAdmin from "./pages/BrandAdmin";
import GolfAdmin from "./pages/admin/GolfAdmin";
import HotelsAdmin from "./pages/admin/HotelsAdmin";
import DiningAdmin from "./pages/admin/DiningAdmin";
import EntertainmentAdmin from "./pages/admin/EntertainmentAdmin";
import LifestyleAdmin from "./pages/admin/LifestyleAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandProvider>
        <UserProvider>
          <BookmarkProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lifestyle" element={<Index />} />
                <Route path="/state/:state" element={<StateProducts />} />
                <Route path="/state/:state/city/:city" element={<CityProducts />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/golf" element={<Golf />} />
                <Route path="/member-dashboard" element={<MemberDashboard />} />
                <Route path="/redeem/:offerId" element={<RedemptionPage />} />
                <Route path="/admin/brands" element={<BrandAdmin />} />
                <Route path="/admin/golf" element={<GolfAdmin />} />
                <Route path="/admin/hotels" element={<HotelsAdmin />} />
                <Route path="/admin/dining" element={<DiningAdmin />} />
                <Route path="/admin/entertainment" element={<EntertainmentAdmin />} />
                <Route path="/admin/lifestyle" element={<LifestyleAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BookmarkProvider>
        </UserProvider>
      </BrandProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
