import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterDrawer } from "@/components/FilterDrawer";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";

export const hotelProductsByCity = {
  "Rochester": [
    {
      brand: "Mayo Clinic Hotel",
      title: "Extended stay packages",
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"
      ],
      tags: ["Rochester Special", "Medical"]
    },
    {
      brand: "Hampton Inn Rochester",
      title: "Business traveler rates",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop"
      ],
      tags: ["Business"]
    },
    {
      brand: "Rochester Plaza Hotel",
      title: "Weekend getaway packages",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
      ],
      tags: ["Weekend Special"]
    }
  ],
  "Edina": [
    {
      brand: "Westin Edina Galleria",
      title: "Shopping package deals",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop"
      ],
      tags: ["Edina Exclusive", "Shopping"]
    },
    {
      brand: "Homewood Suites Edina",
      title: "Extended stay amenities",
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop"
      ],
      tags: ["Family Friendly"]
    },
    {
      brand: "Country Inn Edina",
      title: "Complimentary breakfast upgrade",
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop"
      ],
      tags: ["Breakfast Included"]
    }
  ],
  "Minneapolis": [
    {
      brand: "Four Seasons Minneapolis",
      title: "City skyline suites",
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"
      ],
      tags: ["Minneapolis Exclusive", "Luxury"]
    },
    {
      brand: "The Grand Hotel",
      title: "Historic downtown experience",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop"
      ],
      tags: ["Historic", "Downtown"]
    },
    {
      brand: "Millennium Hotel",
      title: "Convention center packages",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
      ],
      tags: ["Convention"]
    }
  ],
  "Wayzata": [
    {
      brand: "Hotel Minnetonka",
      title: "Lakefront luxury suites",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop"
      ],
      tags: ["Wayzata Special", "Lakefront"]
    },
    {
      brand: "Lake Minnetonka B&B",
      title: "Romantic weekend packages",
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop"
      ],
      tags: ["Romantic", "B&B"]
    },
    {
      brand: "Wayzata Bay Resort",
      title: "Marina access included",
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop"
      ],
      tags: ["Marina Access"]
    }
  ],
  "Milwaukee": [
    {
      brand: "St. Kate - The Arts Hotel",
      title: "A Place to Remember",
      images: [
        "/lovable-uploads/st-kate-hotel.jpeg",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
      ],
      tags: ["Milwaukee Exclusive", "Arts & Culture", "Luxury"]
    }
  ],
  "Houston": [
    {
      brand: "Placeholder Hotel - Houston",
      title: "Coming soon to Houston",
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop"
      ],
      tags: ["Houston", "Coming Soon"]
    }
  ],
  "Knoxville": [
    {
      brand: "The Tennessean Hotel",
      title: "Personal Luxury Hotel",
      images: [
        "/lovable-uploads/tennessean-hotel.png",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
      ],
      tags: ["Knoxville Exclusive", "Luxury", "Historic"],
      description: "In a building dating from the 1982 World's Fair, this polished, modern hotel is a 7-minute walk from restaurants and shops in Market Square, 1 mile from Interstate 40 and 37 miles from Great Smoky Mountains National Park.\n\nThe unfussy rooms provide flat-screen TVs and free Wi-Fi, in addition to coffeemakers, minifridges and pillow-top mattresses. Some offer city views. Suites add sofabeds; 1-bedroom suites have separate living rooms. An upgraded suite features a fireplace, a piano and butler service. Room service is available 24 hours.\n\nThere's an elegant restaurant/bar with an old-world vibe, plus an indoor pool and a gym.",
      website: "https://www.thetennesseanhotel.com/"
    }
  ],
  "Ocala": [
    {
      brand: "The Equestrian Hotel",
      title: "Premier Equestrian Resort",
      images: [
        "/lovable-uploads/equestrian-hero.png",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
      ],
      tags: ["Ocala Exclusive", "Luxury", "Equestrian"],
      description: "The Equestrian Hotel offers a world-class resort experience in the heart of horse country. Enjoy luxurious accommodations, fine dining, and easy access to equestrian facilities and events.",
      website: "https://equestrianhotel.com/"
    }
  ]
};

const Hotels = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const isMobile = useIsMobile();

  // Get products for the selected location only
  const locationProducts = (hotelProductsByCity[selectedLocation as keyof typeof hotelProductsByCity] || []).map(p => ({
    ...p,
    category: "Hotels" as const,
    city: selectedLocation,
    offerId: p.brand.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
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
              availableCategories={["All", "Hotels"]}
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
            availableCategories={["All", "Hotels"]}
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
              offerId={product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}
              category="Hotels"
            />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Hotels;