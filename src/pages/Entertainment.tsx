import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

export const entertainmentProductsByCity = {
  "Rochester": [
    {
      brand: "Bowlocity",
      title: "25% Off Birthday Packages",
      images: [
        "/lovable-uploads/bowlocity.png",
        "https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      ],
      tags: ["Rochester Special", "Bowling", "Birthday"]
    },
    {
      brand: "Rochester Civic Theatre",
      title: "Season ticket discounts",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
      ],
      tags: ["Rochester Special", "Theatre"]
    },
    {
      brand: "Mayo Civic Center",
      title: "Premium event seating",
      images: [
        "https://images.unsplash.com/photo-1489599904472-af11e067b4c7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
      ],
      tags: ["Events"]
    },
    {
      brand: "Silver Lake Cinema",
      title: "VIP movie experiences",
      images: [
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop"
      ],
      tags: ["Cinema"]
    }
  ],
  "Edina": [
    {
      brand: "Edina Cinema",
      title: "Luxury recliner seating",
      images: [
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1489599904472-af11e067b4c7?w=300&h=200&fit=crop"
      ],
      tags: ["Edina Exclusive", "Luxury"]
    },
    {
      brand: "Country Club Golf",
      title: "Member tournament access",
      images: [
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop"
      ],
      tags: ["Golf"]
    },
    {
      brand: "Edina Art Center",
      title: "Private gallery events",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop"
      ],
      tags: ["Art"]
    }
  ],
  "Minneapolis": [
    {
      brand: "Guthrie Theater",
      title: "Behind-the-scenes tours",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
      ],
      tags: ["Minneapolis Exclusive", "Theatre"]
    },
    {
      brand: "Target Center",
      title: "VIP sports packages",
      images: [
        "https://images.unsplash.com/photo-1489599904472-af11e067b4c7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
      ],
      tags: ["Sports"]
    },
    {
      brand: "Walker Art Center",
      title: "Curator-led experiences",
      images: [
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop"
      ],
      tags: ["Art", "Culture"]
    }
  ],
  "Wayzata": [
    {
      brand: "Lake Minnetonka Cruises",
      title: "Private yacht charters",
      images: [
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1489599904472-af11e067b4c7?w=300&h=200&fit=crop"
      ],
      tags: ["Wayzata Special", "Boating"]
    },
    {
      brand: "Wayzata Country Club",
      title: "Lake access & amenities",
      images: [
        "https://images.unsplash.com/photo-1507676184842-0d0b51a19c60?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop"
      ],
      tags: ["Country Club"]
    },
    {
      brand: "Wayzata Bay Theater",
      title: "Lakeside performances",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=200&fit=crop"
      ],
      tags: ["Lakeside"]
    }
  ],
  "Milwaukee": [
    {
      brand: "Placeholder Entertainment - Milwaukee",
      title: "Coming soon to Milwaukee",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
      ],
      tags: ["Milwaukee", "Coming Soon"]
    }
  ],
  "Houston": [
    {
      brand: "Placeholder Entertainment - Houston",
      title: "Coming soon to Houston",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
      ],
      tags: ["Houston", "Coming Soon"]
    }
  ]
};

const Entertainment = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const [entertainmentOffers, setEntertainmentOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch entertainment offers from database
  useEffect(() => {
    const fetchEntertainmentOffers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Entertainment');

      if (error) {
        console.error('Error fetching entertainment offers:', error);
        setEntertainmentOffers([]);
      } else {
        setEntertainmentOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchEntertainmentOffers();
  }, []);

  // Get products based on selected location
  const currentProducts = useMemo(() => {
    const products = selectedLocation === "All Cities"
      ? entertainmentOffers
      : entertainmentOffers.filter(offer => offer.city === selectedLocation);
    
    return products.map(offer => ({
      brand: offer.name,
      title: offer.description || `Exclusive offer at ${offer.name}`,
      images: [offer.offer_card_url || offer.hero_image_url].filter(Boolean),
      tags: ["Entertainment", offer.city, offer.state].filter(Boolean),
      category: "Entertainment" as const,
      city: offer.city,
      state: offer.state,
      majorCity: offer.city,
      offerId: offer.id
    }));
  }, [selectedLocation, entertainmentOffers]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory="Entertainment"
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

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading offers...</p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No entertainment offers found for {selectedLocation}</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, index) => (
              <ProductCard
                key={`${selectedLocation}-${index}`}
                brand={product.brand}
                title={product.title}
                images={product.images}
                tags={product.tags}
                description={product.title}
                offerId={product.offerId}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Entertainment;