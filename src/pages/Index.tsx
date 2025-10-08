import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

// Premium lifestyle brands data organized by city
const lifestyleProductsByCity = {
  "Rochester": [
    {
      brand: "Ferragamo",
      title: "Preferred Pricing",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
      ],
      tags: ["Popular", "Rochester"],
      offerId: "ferragamo-lifestyle"
    },
    {
      brand: "Mister Car Wash",
      title: "22% Off Unlimited Platinum Wash Club",
      images: [
        "/lovable-uploads/mister-car-wash.png"
      ],
      tags: ["Popular", "Rochester"],
      offerId: "mister-car-wash-lifestyle"
    }
  ],
  "Edina": [
    {
      brand: "Tumi",
      title: "Up to 40% off online purchases",
      images: [
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop"
      ],
      tags: ["Popular", "Edina"],
      offerId: "tumi-lifestyle"
    }
  ],
  "Minneapolis": [
    {
      brand: "BMW",
      title: "Up to $3000 off select models",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"
      ],
      tags: ["Popular", "Minneapolis"],
      offerId: "bmw-lifestyle"
    }
  ],
  "Wayzata": [
    {
      brand: "Maui Jim",
      title: "Up to 35% off",
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop"
      ],
      tags: ["Popular", "Wayzata"],
      offerId: "maui-jim-lifestyle"
    }
  ],
  "Milwaukee": [
    {
      brand: "Placeholder Lifestyle - Milwaukee",
      title: "Coming soon to Milwaukee",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
      ],
      tags: ["Milwaukee", "Coming Soon"],
      offerId: "placeholder-lifestyle-milwaukee"
    }
  ],
  "Houston": [
    {
      brand: "Placeholder Lifestyle - Houston",
      title: "Coming soon to Houston",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
      ],
      tags: ["Houston", "Coming Soon"],
      offerId: "placeholder-lifestyle-houston"
    }
  ]
};

const Index = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("Lifestyle");
  const isMobile = useIsMobile();
  const [lifestyleOffers, setLifestyleOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lifestyle offers from database
  useEffect(() => {
    const fetchLifestyleOffers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Lifestyle');

      if (error) {
        console.error('Error fetching lifestyle offers:', error);
        setLifestyleOffers([]);
      } else {
        setLifestyleOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchLifestyleOffers();
  }, []);

  // Filter offers by selected location and convert to product format
  const locationProducts = lifestyleOffers
    .filter(offer => offer.city === selectedLocation)
    .map(offer => ({
      brand: offer.name,
      title: offer.description || `Exclusive offer at ${offer.name}`,
      images: [
        offer.offer_card_url || offer.hero_image_url,
        offer.hero_image_url,
        offer.logo_url
      ].filter(Boolean),
      tags: [offer.city, offer.state].filter(Boolean),
      category: "Lifestyle" as const,
      city: offer.city,
      offerId: offer.club_id
    }));

  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    selectedCategories,
    toggleCategory,
    selectedCity,
    setSelectedCity,
    sortBy,
    setSortBy,
    filteredProducts,
    clearFilters,
    hasActiveFilters
  } = useProductFilters(locationProducts);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearching={isSearching}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Filter Panel */}
        {isMobile ? (
          <div className="mb-6">
            <FilterDrawer
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              availableCategories={["All", "Lifestyle"]}
            />
          </div>
        ) : (
          <FilterPanel
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            resultsCount={filteredProducts.length}
            availableCategories={["All", "Lifestyle"]}
          />
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-xl md:text-2xl text-white mb-2">Loading offers...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-xl md:text-2xl text-white mb-2">No results found</p>
            <p className="text-sm md:text-base text-[#94a3b8]">Try different keywords or adjust filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
            {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              brand={product.brand}
              title={product.title}
              images={product.images}
              tags={product.tags}
              description={product.title}
              offerId={product.offerId}
              category="Lifestyle"
            />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
