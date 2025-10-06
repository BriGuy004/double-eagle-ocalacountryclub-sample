import { useState } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";

// Golf offers data organized by city
export const golfProductsByCity = {
    "Milwaukee": [
      {
        brand: "The Wisconsin Country Club - Concert Golf Partners",
        title: "6200 Good Hope Rd, Milwaukee, WI 53223",
        images: [
          "/lovable-uploads/wisconsin-country-club.jpeg",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Milwaukee"],
        offerId: "wisconsin-country-club"
      }
    ],
    "Houston": [
      {
        brand: "Northgate Country Club - Concert Golf Properties",
        title: "Houston, TX, United States",
        images: [
          "/lovable-uploads/northgate-country-club-v2.png",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Houston"],
        offerId: "northgate-country-club"
      },
      {
        brand: "Walden Golf Club - Concert Golf Partners",
        title: "Montgomery, TX, United States",
        images: [
          "/lovable-uploads/walden-golf-club.png",
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Montgomery"],
        offerId: "walden-golf-club"
      }
    ],
    "Knoxville": [
      {
        brand: "Tennessee National Golf Club – Hampton Golf",
        title: "Loudon, United States",
        images: [
          "/lovable-uploads/tennessee-national-golf-club.png",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Knoxville"],
        offerId: "tennessee-national-golf-club"
      }
    ],
    "Duluth": [
      {
        brand: "Northland Country Club – Hampton Golf",
        title: "Duluth, MN, United States",
        images: [
          "/lovable-uploads/northland-country-club.png",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Duluth"],
        offerId: "northland-country-club"
      }
    ],
    "Naples": [
      {
        brand: "Golf Club of The Everglades – Concert Golf Partners",
        title: "Naples, FL, United States",
        images: [
          "/lovable-uploads/golf-club-everglades.png",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Naples"],
        offerId: "golf-club-everglades"
      }
    ],
    "Ponte Vedra Beach": [
      {
        brand: "Marsh Landing Country Club – Concert Golf Partners",
        title: "Ponte Vedra Beach, FL, United States",
        images: [
          "https://images.unsplash.com/photo-1592919505780-303950717480?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Ponte Vedra Beach"],
        offerId: "marsh-landing-country-club"
      }
    ],
    "Kissimmee": [
      {
        brand: "Stonegate Golf Club – Hampton Golf",
        title: "Kissimmee, FL, United States",
        images: [
          "/lovable-uploads/stonegate-golf-club.png",
          "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Kissimmee"],
        offerId: "stonegate-golf-club"
      }
    ],
    "Fernandina Beach": [
      {
        brand: "The Golf Club Of Amelia Island – Concert Golf Partners",
        title: "Fernandina Beach, FL, United States",
        images: [
          "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=300&h=200&fit=crop"
        ],
        tags: ["Championship", "Fernandina Beach"],
        offerId: "golf-club-amelia-island"
      }
    ]
};

const Golf = () => {
  const [selectedLocation, setSelectedLocation] = useState("Milwaukee");
  const isMobile = useIsMobile();

  // Get products for the selected location only
  const locationProducts = (golfProductsByCity[selectedLocation as keyof typeof golfProductsByCity] || []).map(p => ({
    ...p,
    category: "Golf" as const,
    city: selectedLocation
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
            {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${selectedLocation}-${index}`}
              brand={product.brand}
              title={product.title}
              images={product.images}
              tags={product.tags}
              description={product.title}
              offerId={product.offerId}
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