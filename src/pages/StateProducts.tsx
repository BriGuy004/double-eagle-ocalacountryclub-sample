import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { SortFilter } from "@/components/SortFilter";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";

// Sample state-specific products - you can expand this
const stateProducts = {
  minnesota: [
    {
      brand: "Mall of America",
      title: "Exclusive Member Discounts",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop",
      ],
      tags: ["Popular", "Local"],
      category: "Lifestyle" as const
    },
    {
      brand: "Target Center",
      title: "Premium Seating Access",
      images: [
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
      ],
      tags: ["Popular", "Entertainment"],
      category: "Lifestyle" as const
    },
  ],
  texas: [
    {
      brand: "Dallas Cowboys",
      title: "Season Ticket Discounts",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=300&h=200&fit=crop",
      ],
      tags: ["Popular", "Sports"],
      category: "Lifestyle" as const
    },
  ],
  colorado: [
    {
      brand: "Aspen Ski Resort",
      title: "Member Lift Tickets",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=200&fit=crop",
      ],
      tags: ["Popular", "Recreation"],
      category: "Lifestyle" as const
    },
  ],
  california: [
    {
      brand: "Napa Valley Tours",
      title: "Wine Tasting Experiences",
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
      ],
      tags: ["Premium", "Dining"],
      category: "Dining" as const
    },
  ],
  newyork: [
    {
      brand: "Broadway Shows",
      title: "Member Ticket Access",
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop",
      ],
      tags: ["Premium", "Entertainment"],
      category: "Lifestyle" as const
    },
  ],
  florida: [
    {
      brand: "Disney World",
      title: "VIP Park Access",
      images: [
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=200&fit=crop",
      ],
      tags: ["Popular", "Family"],
      category: "Lifestyle" as const
    },
  ],
};

const StateProducts = () => {
  const { state } = useParams<{ state: string }>();
  const [selectedLocation, setSelectedLocation] = useState(state || "minnesota");
  const [selectedSort, setSelectedSort] = useState("Popular");
  const [selectedCategory, setSelectedCategory] = useState("Lifestyle");
  
  const stateKey = state?.toLowerCase() || "minnesota";
  const products = stateProducts[stateKey as keyof typeof stateProducts] || [];
  const stateName = state?.charAt(0).toUpperCase() + state?.slice(1) || "Minnesota";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div className="flex justify-center mb-8">
            <LocationSelector 
              selectedLocation={stateName}
              onLocationChange={setSelectedLocation}
            />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex justify-start mb-8">
          <SortFilter 
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* State Products Grid */}        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              brand={product.brand}
              title={product.title}
              images={product.images}
              tags={product.tags}
              description={product.title}
              category={product.category}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StateProducts;