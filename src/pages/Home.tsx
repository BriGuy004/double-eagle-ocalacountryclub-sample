import { useState } from "react";
import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { useBrand } from "@/contexts/BrandContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

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
      
      {/* Featured Benefits Section with Brand Colors */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Exclusive Member Benefits
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover premium lifestyle experiences curated for {currentBrand.name} members.
          </p>
        </div>
        
        {/* Quick Stats Cards with Brand Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card 
            className="border-2 hover:shadow-xl transition-all cursor-pointer"
            style={{
              borderColor: 'var(--color-primary)'
            }}
          >
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  opacity: 0.9
                }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
              <p className="text-muted-foreground">Premium Partners</p>
            </CardContent>
          </Card>
          
          <Card 
            className="border-2 hover:shadow-xl transition-all cursor-pointer"
            style={{
              borderColor: 'var(--color-primary-glow)'
            }}
          >
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-primary-glow)',
                  opacity: 0.9
                }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">$2,500</h3>
              <p className="text-muted-foreground">Average Annual Savings</p>
            </CardContent>
          </Card>
          
          <Card 
            className="border-2 hover:shadow-xl transition-all cursor-pointer"
            style={{
              borderColor: 'var(--color-accent)'
            }}
          >
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  opacity: 0.9
                }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-muted-foreground">Concierge Support</p>
            </CardContent>
          </Card>
        </div>
        
        {/* CTA Section with Brand Colors */}
        <div 
          className="rounded-xl p-12 text-center"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-glow) 100%)`
          }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Benefits?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Browse our exclusive marketplace of premium offers, or start by exploring guest play opportunities at our reciprocal network.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="bg-white text-primary font-semibold hover:bg-white/90"
            >
              Browse Marketplace
            </Button>
            <Button 
              size="lg"
              className="bg-white/20 text-white font-semibold border-2 border-white hover:bg-white/30"
            >
              View Guest Play
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;