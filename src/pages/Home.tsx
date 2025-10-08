import { useState } from "react";
import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { useBrand } from "@/contexts/BrandContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const { currentBrand, isLoading } = useBrand();

  // Better loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your club...</p>
        </div>
      </div>
    );
  }

  if (!currentBrand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-2">No club data available</p>
          <p className="text-muted-foreground">Please contact support</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="text-center">
          <CategorySelector 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>
      
      {/* Hero Section with Brand Colors */}
      <section className="container mx-auto px-6">
        <div className="relative max-w-full mx-auto">
          {/* Image with brand-colored overlay gradient */}
          <div className="relative rounded-xl overflow-hidden shadow-luxury">
            <img 
              src={currentBrand.hero_image_url} 
              alt={`${currentBrand.name} - Beautiful golf course`} 
              className="w-full h-[600px] object-cover"
            />
            {/* Brand-colored gradient overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, var(--color-primary) 100%)`
              }}
            />
          </div>
          
          {/* Welcome text overlay with brand accent */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 space-y-4">
            <div 
              className="px-6 py-2 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: 'var(--color-primary)',
                opacity: 0.9
              }}
            >
              <p className="text-sm font-semibold text-white uppercase tracking-wider">
                {currentBrand.name}
              </p>
            </div>
            <h1 className="text-6xl font-normal text-white drop-shadow-lg">
              Welcome, Justin!
            </h1>
            <Button 
              size="lg"
              className="mt-4 text-white font-semibold shadow-xl"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary-glow)'
              }}
            >
              Explore Benefits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;