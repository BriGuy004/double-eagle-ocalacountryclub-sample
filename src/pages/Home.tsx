import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/BrandContext";

export default function Home() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();

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
          {/* Top Row: Logo, Club Name, and Account */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              {currentBrand?.logo_url && (
                <img src={currentBrand.logo_url} alt={currentBrand.name} className="h-12 md:h-14 object-contain" />
              )}
              <div className="hidden md:block">
                <p className="text-white/90 font-medium text-sm">{currentBrand?.name || "The Country Club of Ocala"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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

          {/* Category Navigation - SMALLER BUTTONS */}
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

      {/* Hero Section - NO CLUB NAME ON PHOTO */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: currentBrand?.hero_image_url
              ? `url(${currentBrand.hero_image_url})`
              : 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&h=800&fit=crop")',
            filter: "brightness(0.5)",
          }}
        />

        {/* Content - JUST WELCOME MESSAGE */}
        <div className="relative container mx-auto px-4 md:px-6 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">Welcome, {memberName}!</h1>
        </div>
      </section>
    </div>
  );
}
