import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { BrandProvider } from "@/contexts/BrandContext";
import Home from "./pages/Home";
import Lifestyle from "./pages/Lifestyle";
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
import ClubAdmin from "./pages/ClubAdmin";
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
                <Route path="/lifestyle" element={<Lifestyle />} />
                <Route path="/state/:state" element={<StateProducts />} />
                <Route path="/state/:state/city/:city" element={<CityProducts />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/golf" element={<Golf />} />
                <Route path="/member-dashboard" element={<MemberDashboard />} />
                <Route path="/redemption/:offerId" element={<RedemptionPage />} />
                <Route path="/admin/golf" element={<BrandAdmin />} />
                <Route path="/admin/lifestyle" element={<BrandAdmin />} />
                <Route path="/admin/hotels" element={<BrandAdmin />} />
                <Route path="/admin/dining" element={<BrandAdmin />} />
                <Route path="/admin/shopping" element={<BrandAdmin />} />
                <Route path="/admin/travel" element={<BrandAdmin />} />
                <Route path="/admin/entertainment" element={<BrandAdmin />} />
                <Route path="/clubadmin" element={<ClubAdmin />} />
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
