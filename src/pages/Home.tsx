import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/BrandContext";

export default function Home() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  
  // This would come from your UserContext - replace with actual user name
  const memberName = "Justin";

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Category Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Top Row: Logo and Account */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              {currentBrand?.logo_url && (
                <img 
                  src={currentBrand.logo_url}
                  alt={currentBrand.name}
                  className="h-12 md:h-14 object-contain"
                />
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/member-dashboard')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              <Button 
                variant="default"
                className="bg-[hsl(50,35%,40%)] hover:bg-[hsl(50,35%,35%)] text-white"
                onClick={() => navigate('/member-dashboard')}
              >
                Account
              </Button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="py-3">
            <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/golf')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Golf
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/hotels')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Hotels
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dining')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Dining
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/entertainment')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Entertainment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/shopping')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Shopping
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/travel')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Travel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/lifestyle')}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 md:px-6"
              >
                Lifestyle
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: currentBrand?.hero_image_url 
              ? `url(${currentBrand.hero_image_url})`
              : 'url("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&h=800&fit=crop")',
            filter: 'brightness(0.5)'
          }}
        />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32 text-center">
          <p className="text-sm md:text-base text-primary/90 font-medium mb-4 tracking-wider uppercase">
            {currentBrand?.name || "The Country Club of Ocala"}
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Welcome, {memberName}!
          </h1>

          <Button 
            size="lg"
            onClick={() => navigate('/lifestyle')}
            className="bg-[hsl(50,35%,40%)] hover:bg-[hsl(50,35%,35%)] text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
            Explore Benefits
            <svg 
              className="ml-2 h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </Button>
        </div>
      </section>
    </div>
  );
}