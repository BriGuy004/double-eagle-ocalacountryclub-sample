import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { getAllOffers } from "@/data/allOffers";

const Golf = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const isMobile = useIsMobile();

  // Get all golf offers from the centralized data
  const allGolfOffers = getAllOffers().filter(offer => offer.category === "Golf");
  
  // Filter by selected location (majorCity)
  const locationProducts = selectedLocation === "All Cities" 
    ? allGolfOffers 
    : allGolfOffers.filter(offer => offer.majorCity === selectedLocation);

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
              availableCategories={["All", "Golf"]}
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
            availableCategories={["All", "Golf"]}
          />
        )}

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