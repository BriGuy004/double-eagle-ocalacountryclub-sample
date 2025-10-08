import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useUser } from "@/contexts/UserContext";

const Shopping = () => {
  const { selectedLocation, setSelectedLocation } = useUser();
  const [selectedSort, setSelectedSort] = useState("Popular");

  // Shopping offers data organized by city
  const shoppingProductsByCity = {
    "Rochester": [
      {
        brand: "Target",
        title: "Everyday essentials and more - 15% off",
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Popular", "Rochester"],
        offerId: "target-roch"
      },
      {
        brand: "Best Buy",
        title: "Electronics and tech - 15% off",
        images: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Electronics", "Tech"],
        offerId: "bestbuy-roch"
      },
      {
        brand: "Barnes & Noble",
        title: "Books and coffee - 20% off",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop"
        ],
        tags: ["Books", "Rochester"],
        offerId: "barnes-noble-roch"
      }
    ],
    "Edina": [
      {
        brand: "Nordstrom",
        title: "Premium fashion and accessories - 20% off",
        images: [
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
        ],
        tags: ["Edina", "Premium"],
        offerId: "nordstrom-edina"
      },
      {
        brand: "Williams Sonoma",
        title: "Premium kitchenware and home goods - 20% off",
        images: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Edina", "Premium"],
        offerId: "williams-sonoma-edina"
      },
      {
        brand: "Lululemon",
        title: "Athletic wear and accessories - 15% off",
        images: [
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1506629905607-24cccc48e0bf?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Athletic", "Edina"],
        offerId: "lululemon-edina"
      }
    ],
    "Minneapolis": [
      {
        brand: "Target",
        title: "Everyday essentials and more - 15% off",
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Popular", "Minneapolis"],
        offerId: "target-mn"
      },
      {
        brand: "Macy's",
        title: "Fashion and home goods - 20% off",
        images: [
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
        ],
        tags: ["Fashion", "Home"],
        offerId: "macys-mn"
      },
      {
        brand: "Apple Store",
        title: "Latest Apple products - 10% off",
        images: [
          "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
        ],
        tags: ["Apple", "Tech"],
        offerId: "apple-mn"
      }
    ],
    "Wayzata": [
      {
        brand: "Whole Foods Market",
        title: "Organic groceries and prepared foods - 15% off",
        images: [
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop"
        ],
        tags: ["Organic", "Wayzata"],
        offerId: "whole-foods-wayzata"
      },
      {
        brand: "REI Co-op",
        title: "Outdoor gear and apparel - 20% off",
        images: [
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1506629905607-24cccc48e0bf?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
        ],
        tags: ["Outdoor", "Gear"],
        offerId: "rei-wayzata"
      },
      {
        brand: "Pottery Barn",
        title: "Home furnishings and decor - 25% off",
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
        ],
        tags: ["Home Decor", "Premium"],
        offerId: "pottery-barn-wayzata"
      }
    ],
    "Milwaukee": [
      {
        brand: "Placeholder Shopping - Milwaukee",
        title: "Coming soon to Milwaukee",
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop"
        ],
        tags: ["Milwaukee", "Coming Soon"],
        offerId: "placeholder-milwaukee"
      }
    ],
    "Houston": [
      {
        brand: "Placeholder Shopping - Houston",
        title: "Coming soon to Houston",
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop"
        ],
        tags: ["Houston", "Coming Soon"],
        offerId: "placeholder-houston"
      }
    ]
  };

  // Get products based on selected location
  const getProductsForLocation = (location: string) => {
    if (location === "All Cities") {
      return Object.values(shoppingProductsByCity).flat();
    }
    return shoppingProductsByCity[location as keyof typeof shoppingProductsByCity] || [];
  };

  const currentProducts = getProductsForLocation(selectedLocation);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {currentProducts.length === 0 ? (
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