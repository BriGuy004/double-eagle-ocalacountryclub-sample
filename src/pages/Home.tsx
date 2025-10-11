import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/BrandContext";
import { CategoryNav } from "@/components/CategoryNav";
import { CityFilter } from "@/components/CityFilter";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState("Golf");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // This would come from your UserContext - replace with actual user name
  const memberName = "Justin";

  // Get club colors for buttons
  const primaryColor = currentBrand?.primary_color || "38 70% 15%";
  const accentColor = currentBrand?.accent_color || "45 85% 50%";

  // Load offers when category OR city changes
  useEffect(() => {
    loadOffers();
  }, [selectedCategory, selectedCity]);

  const loadOffers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("offers")
        .select("*")
        .eq("category", selectedCategory);

      // If a city is selected, filter by it
      if (selectedCity !== "All Cities") {
        const [city, state] = selectedCity.split(", ");
        query = query.eq("city", city).eq("state", state);
      }

      const { data, error } = await query.order("name");

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state if brand isn't loaded yet
  if (!currentBrand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 items-center py-4">
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
        </div>
      </header>

      {/* Sticky Category Navigation */}
      <div className="sticky top-[73px] md:top-[88px] z-30">
        <CategoryNav 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Hero Section - Mobile Optimized */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image */}
        <img 
          src={currentBrand?.hero_image_url || "/default-hero.jpg"}
          alt={currentBrand?.name || "Golf course"}
          className="hero-image-mobile"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 
            className="font-bold tracking-tight text-white leading-tight mb-3"
            style={{ 
              fontSize: 'clamp(2rem, 10vw, 5rem)',
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              maxWidth: '90%'
            }}
          >
            Welcome, Justin!
          </h1>
          
          {currentBrand && (
            <p 
              className="text-white/90 font-medium mt-2"
              style={{ 
                fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}
            >
              {currentBrand.name}
            </p>
          )}
        </div>
      </div>

      {/* Content with City Filter */}
      <div className="container mx-auto px-4 py-6">
        <CityFilter 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          category={selectedCategory}
        />
        
        {/* Show selected filters */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing {selectedCategory} offers</span>
          {selectedCity !== "All Cities" && (
            <span>in <strong className="text-foreground">{selectedCity}</strong></span>
          )}
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No {selectedCategory.toLowerCase()} offers found
              {selectedCity !== "All Cities" && ` in ${selectedCity}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {offers.map(offer => (
              <ProductCard 
                key={offer.id}
                offerId={offer.id}
                brand={offer.name}
                title={offer.name}
                images={[offer.offer_card_url || offer.hero_image_url]}
                tags={[`${offer.city}, ${offer.state}`]}
                category={offer.category}
                offerText={offer.discount_text}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
