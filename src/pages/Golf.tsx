import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategoryNav } from "@/components/CategoryNav";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useUser } from "@/contexts/UserContext";
import { useBrand } from "@/contexts/BrandContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";

// Helper: Check if offer was created in last 14 days
const isOfferNew = (createdAt: string | null) => {
  if (!createdAt) return false;
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  return new Date(createdAt) > fourteenDaysAgo;
};

const Golf = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const { currentBrand } = useBrand();

  // Fetch offers from Supabase with refetch interval to catch updates
  const { data: offers = [] } = useQuery({
    queryKey: ['offers', 'Golf'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Golf');
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds to catch admin updates
    staleTime: 0 // Consider data immediately stale
  });

  // Transform Supabase data to match expected format
  const allGolfOffers = offers.map(offer => ({
    offerId: offer.club_id,
    clubId: offer.club_id,
    brand: offer.name,
    title: offer.description || `${offer.name} - Golf Access`,
    description: offer.description || `Exclusive golf benefits at ${offer.name}`,
    discount: "Reciprocal Play Access",
    images: [offer.offer_card_url || offer.hero_image_url].filter(Boolean),
    tags: ["Golf", "Private Club", offer.city && offer.state ? `${offer.city}, ${offer.state}` : ''].filter(Boolean),
    category: "Golf" as const,
    city: offer.city,
    state: offer.state,
    majorCity: offer.city,
    isNew: isOfferNew(offer.created_at)
  }));
  
  // Filter out the home club's golf offer
  const filteredGolfOffers = currentBrand 
    ? allGolfOffers.filter(offer => offer.clubId !== currentBrand.club_id)
    : allGolfOffers;
  
  // Calculate available cities dynamically from actual offers
  const citiesByState = useMemo(() => {
    const cityStateMap: Record<string, Set<string>> = {};
    
    filteredGolfOffers.forEach(offer => {
      if (offer.city && offer.state) {
        if (!cityStateMap[offer.state]) {
          cityStateMap[offer.state] = new Set();
        }
        cityStateMap[offer.state].add(offer.city);
      }
    });
    
    // Convert Sets to sorted arrays
    const result: Record<string, string[]> = {};
    Object.entries(cityStateMap).forEach(([state, cities]) => {
      result[state] = Array.from(cities).sort();
    });
    
    return result;
  }, [filteredGolfOffers]);
  
  // Filter by selected location (majorCity)
  const locationProducts = selectedLocation === "All Cities" 
    ? filteredGolfOffers 
    : filteredGolfOffers.filter(offer => offer.majorCity === selectedLocation);

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
      
      <CategoryNav selectedCategory="Golf" />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex justify-center mb-8">
          <LocationSelector 
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            citiesByState={citiesByState}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-xl md:text-2xl text-white mb-2">No results found</p>
            <p className="text-sm md:text-base text-[#94a3b8]">Try different keywords or adjust filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 animate-fade-in">
            {filteredProducts.map((offer) => (
            <ProductCard
              key={offer.offerId}
              brand={offer.brand}
              title={offer.title}
              images={offer.images}
              tags={offer.tags}
              description={offer.description}
              offerId={offer.offerId}
              category="Golf"
            />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Golf;