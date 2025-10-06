import { useState } from "react";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { SortFilter } from "@/components/SortFilter";
import { ProductCard } from "@/components/ProductCard";
import { CategorySelector } from "@/components/CategorySelector";
import { getClubsByMajorCity } from "@/data/arcisClubs";

// Sample products generator based on selected city
const generateCityProducts = (majorCity: string) => {
  if (majorCity === "All Cities") {
    return [
      {
        brand: "Lifetime Fitness",
        title: "Premium Membership - 30% Off",
        images: [
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
        ],
        tags: ["Popular", "Wellness"]
      },
      {
        brand: "Four Seasons Hotel",
        title: "Member Rates - 25% Off",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
        ],
        tags: ["Luxury", "Hotels"]
      }
    ];
  }

  const clubs = getClubsByMajorCity(majorCity);
  
  // Generate reciprocal golf benefits for clubs in this city
  const golfBenefits = clubs.map(club => ({
    brand: club.name,
    title: "Reciprocal Play - Member Rate",
    images: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
    ],
    tags: ["Reciprocal", club.city],
    city: club.city,
    state: club.stateAbbrev
  }));

  // Add local lifestyle benefits
  const lifestyleBenefits = [
    {
      brand: `${majorCity} Fitness Center`,
      title: "Premium Membership - 30% Off",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      ],
      tags: ["Popular", "Wellness"],
      city: majorCity,
      state: clubs[0]?.stateAbbrev
    },
    {
      brand: `${majorCity} Spa & Wellness`,
      title: "Spa Services - 20% Off",
      images: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop",
      ],
      tags: ["Luxury", "Spa"],
      city: majorCity,
      state: clubs[0]?.stateAbbrev
    }
  ];

  return [...golfBenefits, ...lifestyleBenefits];
};

const CityProducts = () => {
  const [selectedLocation, setSelectedLocation] = useState("All Cities");
  const [selectedSort, setSelectedSort] = useState("Popular");
  const [selectedCategory, setSelectedCategory] = useState("Lifestyle");
  
  const products = generateCityProducts(selectedLocation);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div className="flex justify-center mb-8">
            <LocationSelector 
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <SortFilter 
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
          <p className="text-muted-foreground">
            Showing {products.length} offers
            {selectedLocation !== "All Cities" && ` in ${selectedLocation}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              brand={product.brand}
              title={product.title}
              images={product.images}
              tags={product.tags}
              description={product.title}
              category="Lifestyle"
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No offers found in {selectedLocation}.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CityProducts;
