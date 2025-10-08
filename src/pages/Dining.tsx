import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

export const diningProductsByCity = {
  "Rochester": [
    {
      brand: "Chester's Kitchen & Bar",
      title: "20% off dinner entrees",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop"
      ],
      tags: ["Popular", "Local"]
    },
    {
      brand: "Newt's",
      title: "Complimentary appetizer with entree",
      images: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1496412705862-e0fed3f4d6db?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Rochester Special"]
    },
    {
      brand: "Prairie Mill Restaurant",
      title: "15% off weekend brunch",
      images: [
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop"
      ],
      tags: ["Weekend Special"]
    }
  ],
  "Edina": [
    {
      brand: "Salut Bar Americain",
      title: "Wine pairing dinner discount",
      images: [
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Edina Exclusive", "Premium"]
    },
    {
      brand: "The Edina Grill",
      title: "Buy one entree, get 50% off second",
      images: [
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop"
      ],
      tags: ["Family Deal"]
    },
    {
      brand: "Osaka Sushi & Hibachi",
      title: "Free sushi roll with hibachi dinner",
      images: [
        "https://images.unsplash.com/photo-1496412705862-e0fed3f4d6db?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Popular"]
    }
  ],
  "Minneapolis": [
    {
      brand: "Spoon and Stable",
      title: "Chef's tasting menu - 25% off",
      images: [
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1496412705862-e0fed3f4d6db?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Minneapolis Exclusive", "Fine Dining"]
    },
    {
      brand: "The Bachelor Farmer",
      title: "Nordic brunch experience",
      images: [
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop"
      ],
      tags: ["Trending", "Brunch"]
    },
    {
      brand: "Manny's Steakhouse",
      title: "Premium cut selections - 20% off",
      images: [
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Premium"]
    }
  ],
  "Wayzata": [
    {
      brand: "6Smith",
      title: "Lakeside dining experience",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop"
      ],
      tags: ["Wayzata Special", "Lakeside"]
    },
    {
      brand: "Gianni's Steakhouse",
      title: "Wine cellar dinner series",
      images: [
        "https://images.unsplash.com/photo-1496412705862-e0fed3f4d6db?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Exclusive", "Wine"]
    },
    {
      brand: "Lake Effect Cafe",
      title: "Seasonal menu tasting",
      images: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1496412705862-e0fed3f4d6db?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      ],
      tags: ["Seasonal"]
    }
  ],
  "Milwaukee": [
    {
      brand: "Placeholder Restaurant - Milwaukee",
      title: "Coming soon to Milwaukee",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
      ],
      tags: ["Milwaukee", "Coming Soon"]
    }
  ],
  "Houston": [
    {
      brand: "Placeholder Restaurant - Houston",
      title: "Coming soon to Houston",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
      ],
      tags: ["Houston", "Coming Soon"]
    }
  ],
  "Knoxville": [
    {
      brand: "Connor's Steak & Seafood",
      title: "Premium steaks and fresh seafood",
      images: [
        "/lovable-uploads/connors-steak-seafood.png",
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop"
      ],
      tags: ["Knoxville Exclusive", "Steak", "Seafood"]
    }
  ]
};

const Dining = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const isMobile = useIsMobile();
  const [diningOffers, setDiningOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dining offers from database
  useEffect(() => {
    const fetchDiningOffers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Dining');

      if (error) {
        console.error('Error fetching dining offers:', error);
        setDiningOffers([]);
      } else {
        setDiningOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchDiningOffers();
  }, []);

  // Filter offers by selected location and convert to product format
  const locationProducts = diningOffers
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
      category: "Dining" as const,
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
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory="Dining"
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

        {/* Filter Panel - Removed */}

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
              key={`${selectedLocation}-${index}`}
              brand={product.brand}
              title={product.title}
              images={product.images}
              tags={product.tags}
              description={product.title}
              offerId={product.offerId}
              category="Dining"
            />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dining;