import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/BrandContext";
import { CategoryNav } from "@/components/CategoryNav";

export default function Home() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  const [selectedCategory] = useState("Golf");

  // This would come from your UserContext - replace with actual user name
  const memberName = "Justin";

  // Get club colors for buttons
  const primaryColor = currentBrand?.primary_color || "38 70% 15%";
  const accentColor = currentBrand?.accent_color || "45 85% 50%";

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Category Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Top Row: Logo, Centered Club Name, and Account */}
          <div className="grid grid-cols-3 items-center py-4 border-b border-white/5">
            {/* Left: Logo */}
            <div className="flex items-center">
              {currentBrand?.logo_url && (
                <img src={currentBrand.logo_url} alt={currentBrand.name} className="h-12 md:h-14 object-contain" />
              )}
            </div>

            {/* Center: Club Name */}
            <div className="text-center">
              <h1 className="text-white font-bold text-base md:text-lg">
                {currentBrand?.name || "The Country Club of Ocala - Hampton Golf"}
              </h1>
            </div>

            {/* Right: Notifications & Account */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/member-dashboard")}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              <Button
                variant="default"
                style={{ backgroundColor: `hsl(${accentColor})` }}
                className="hover:opacity-90 text-white"
                onClick={() => navigate("/member-dashboard")}
              >
                Account
              </Button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="py-2">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Button
                size="sm"
                onClick={() => navigate("/golf")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Golf
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/lifestyle")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Lifestyle
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/dining")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Dining
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/entertainment")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Entertainment
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/hotels")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Hotels
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/travel")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Travel
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/shopping")}
                style={{
                  backgroundColor: `hsl(${primaryColor})`,
                  color: "white",
                }}
                className="hover:opacity-90 font-medium px-3 md:px-5 py-2 text-sm"
              >
                Shopping
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src={currentBrand?.hero_image_url || "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&h=800&fit=crop"}
          alt="Golf course"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center px-4">
          <h1 
            className="font-bold tracking-tight text-white leading-tight mb-4"
            style={{ 
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Welcome, {memberName}!
          </h1>
          <p 
            className="text-white/90 text-lg md:text-xl"
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 1px 5px rgba(0,0,0,0.3)'
            }}
          >
            {currentBrand.name}
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav 
        selectedCategory={selectedCategory}
      />

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">
          Select a category above to explore available offers
        </p>
      </div>
    </div>
  );
}
