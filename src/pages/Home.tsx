import { useState } from "react";
import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Navigation - moved below header */}
      <div className="container mx-auto px-6 py-4">
        <div className="text-center">
          <CategorySelector 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>
      
      {/* Main Photo with Welcome Text Overlay */}
      <section className="container mx-auto px-6">
        <div className="relative max-w-full mx-auto">
          <img 
            src="/lovable-uploads/golf-course-main.png" 
            alt="Beautiful golf course with water feature and reflections" 
            className="w-full h-[600px] object-cover rounded-xl shadow-luxury"
          />
          {/* Welcome text overlay - positioned near top */}
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <h1 className="text-6xl font-normal text-white drop-shadow-lg">Welcome, Lindsay!</h1>
          </div>
        </div>
      </section>
      
      {/* Additional Home Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Discover exclusive member benefits and premium lifestyle experiences.
          </p>
          
        </div>
      </main>
    </div>
  );
};

export default Home;