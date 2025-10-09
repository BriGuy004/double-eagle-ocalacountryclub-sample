import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

const Shopping = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const [shoppingOffers, setShoppingOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch shopping offers from database with auto-refresh
  useEffect(() => {
    const fetchShoppingOffers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('category', 'Shopping');

      if (error) {
        console.error('Error fetching shopping offers:', error);
        setShoppingOffers([]);
      } else {
        setShoppingOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchShoppingOffers();
    
    // Refresh every 5 seconds to catch admin updates
    const interval = setInterval(fetchShoppingOffers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get products based on selected location
  const currentProducts = useMemo(() => {
    const products = selectedLocation === "All Cities"
      ? shoppingOffers
      : shoppingOffers.filter(offer => offer.city === selectedLocation);
    
    return products.map(offer => ({
      brand: offer.name,
      title: offer.description || `Exclusive offer at ${offer.name}`,
      images: [offer.offer_card_url || offer.hero_image_url].filter(Boolean),
      tags: ["Shopping", offer.city, offer.state].filter(Boolean),
      category: "Shopping" as const,
      city: offer.city,
      state: offer.state,
      majorCity: offer.city,
      offerId: offer.id
    }));
  }, [selectedLocation, shoppingOffers]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory="Shopping"
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
            <p className="text-xl text-muted-foreground">No shopping offers found for {selectedLocation}</p>
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

export default Shopping;