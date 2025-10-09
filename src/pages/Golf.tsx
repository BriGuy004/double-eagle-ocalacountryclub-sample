import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { useBrand } from "@/contexts/BrandContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Golf = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const { currentBrand } = useBrand();
  const isMobile = useIsMobile();

  // Fetch offers from Supabase
  const { data: offers = [] } = useQuery({
    queryKey: ['offers', 'Golf'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Golf');
      
      if (error) throw error;
      return data;
    }
  });

  // Transform Supabase data to match expected format
  const allGolfOffers = offers.map(offer => ({
    offerId: offer.id,
    clubId: offer.club_id,
    brand: offer.name,
    title: `${offer.name} - Golf Access`,
    description: offer.description || `Exclusive golf benefits at ${offer.name}`,
    discount: "Reciprocal Play Access",
    images: [offer.offer_card_url || offer.hero_image_url],
    tags: ["Golf", "Private Club", offer.category],
    category: "Golf" as const,
    city: offer.city,
    state: offer.state,
    majorCity: offer.city
  }));
  
  // Filter out the home club's golf offer
  const filteredGolfOffers = currentBrand 
    ? allGolfOffers.filter(offer => offer.clubId !== currentBrand.club_id)
    : allGolfOffers;
  
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
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory="Golf"
              onCategoryChange={() => {}}
            />
          </div>
          <div className="flex justify-center mb-8">
            <LocationSelector 
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-xl md:text-2xl text-white mb-2">No results found</p>
            <p className="text-sm md:text-base text-[#94a3b8]">Try different keywords or adjust filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
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