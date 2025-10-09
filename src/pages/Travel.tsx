import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { supabase } from "@/integrations/supabase/client";

const travelProductsByCity = {
  "Rochester": [
    {
      brand: "Rochester Regional Airport",
      title: "Charter flight packages",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1569629942951-4f83e5b73e5a?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Rochester Special", "Charter"]
    },
    {
      brand: "Mayo Medical Tourism",
      title: "Comprehensive travel packages",
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
      ],
      tags: ["Medical"]
    },
    {
      brand: "Rochester Car Service",
      title: "Premium transportation",
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
      ],
      tags: ["Transportation"]
    }
  ],
  "Edina": [
    {
      brand: "MSP Private Terminals",
      title: "VIP airport services",
      images: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Edina Exclusive", "VIP"]
    },
    {
      brand: "Luxury Coach Lines",
      title: "Casino & resort packages",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
      ],
      tags: ["Resort Packages"]
    },
    {
      brand: "Edina Travel Concierge",
      title: "Personalized itineraries",
      images: [
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Concierge"]
    }
  ],
  "Minneapolis": [
    {
      brand: "Northwest Airlines Lounge",
      title: "First class upgrade deals",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1569629942951-4f83e5b73e5a?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Minneapolis Exclusive", "First Class"]
    },
    {
      brand: "Twin Cities Tours",
      title: "Urban exploration packages",
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
      ],
      tags: ["City Tours"]
    },
    {
      brand: "Metro Transit VIP",
      title: "Premium commuter services",
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
      ],
      tags: ["Commuter"]
    }
  ],
  "Wayzata": [
    {
      brand: "Lake Minnetonka Seaplanes",
      title: "Scenic flight tours",
      images: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Wayzata Special", "Scenic"]
    },
    {
      brand: "Marina Yacht Charters",
      title: "Lake cruising experiences",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
      ],
      tags: ["Yacht Charter"]
    },
    {
      brand: "Wayzata Limousine",
      title: "Luxury ground transport",
      images: [
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop"
      ],
      tags: ["Luxury Transport"]
    }
  ],
  "Milwaukee": [
    {
      brand: "Placeholder Travel - Milwaukee",
      title: "Coming soon to Milwaukee",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop"
      ],
      tags: ["Milwaukee", "Coming Soon"]
    }
  ],
  "Houston": [
    {
      brand: "Placeholder Travel - Houston",
      title: "Coming soon to Houston",
      images: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop"
      ],
      tags: ["Houston", "Coming Soon"]
    }
  ]
};

const Travel = () => {
  const [selectedLocation, setSelectedLocation] = useState("All Cities");
  const [travelOffers, setTravelOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch travel offers from database
  useEffect(() => {
    const fetchTravelOffers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Travel');

      if (error) {
        console.error('Error fetching travel offers:', error);
        setTravelOffers([]);
      } else {
        setTravelOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchTravelOffers();
  }, []);

  // Get products based on selected location
  const currentProducts = useMemo(() => {
    const products = selectedLocation === "All Cities"
      ? travelOffers
      : travelOffers.filter(offer => offer.city === selectedLocation);
    
    return products.map(offer => ({
      brand: offer.name,
      title: offer.description || `Exclusive offer at ${offer.name}`,
      images: [offer.offer_card_url || offer.hero_image_url].filter(Boolean),
      tags: ["Travel", offer.city, offer.state].filter(Boolean),
      category: "Travel" as const,
      city: offer.city,
      state: offer.state,
      majorCity: offer.city,
      offerId: offer.id
    }));
  }, [selectedLocation, travelOffers]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory="Travel"
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
            <p className="text-xl text-muted-foreground">No travel offers found for {selectedLocation}</p>
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

export default Travel;