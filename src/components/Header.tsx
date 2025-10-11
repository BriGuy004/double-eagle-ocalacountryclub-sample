import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { MobileNav } from "@/components/MobileNav";
import { Menu, User, Bell, MapPin, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBrand } from "@/contexts/BrandContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isSearching?: boolean;
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  cities?: string[];
}

export const Header = ({ 
  searchQuery = "", 
  onSearchChange, 
  isSearching = false,
  selectedCity = "All Cities",
  onCityChange,
  cities = []
}: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentBrand } = useBrand();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Fallback if brand isn't loaded yet
  if (!currentBrand) {
    return (
      <header className="w-full border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <header className="w-full border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 py-3">
          {isMobile ? (
            /* Mobile Layout */
            <div className="space-y-3">
              {/* Top Row: Hamburger + Club Name + Notification */}
              <div className="flex items-center justify-between gap-3">
                {/* Hamburger Menu */}
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </button>

              {/* Club Name - Centered, Dynamic Size */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <h1
                  className="text-center font-bold tracking-tight text-white leading-tight"
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                  }}
                >
                  {currentBrand.name}
                </h1>
                
                {/* City Selector - Mobile */}
                {onCityChange && cities.length > 0 && (
                  <Select value={selectedCity} onValueChange={onCityChange}>
                    <SelectTrigger className="w-auto min-w-[120px] h-8 text-xs bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <MapPin className="h-3 w-3 mr-1" />
                      <SelectValue />
                      <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="All Cities">All Cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Notification Bell */}
                <button
                  onClick={() => navigate("/notifications")}
                  className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all relative flex-shrink-0"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Bell className="h-5 w-5 text-white" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
                </button>
              </div>

              {/* Logo - Centered below name */}
              <div className="flex justify-center">
                <a href="/" className="inline-block">
                  <img src={currentBrand.logo_url} alt={currentBrand.name} className="h-12 w-auto cursor-pointer" />
                </a>
              </div>

              {/* Search Bar - Full Width */}
              {onSearchChange && <SearchBar value={searchQuery} onChange={onSearchChange} isSearching={isSearching} />}
            </div>
          ) : (
            /* Desktop Layout */
            <div className="flex items-center justify-between gap-6">
              {/* Logo - Fixed Width */}
              <div className="flex items-center flex-shrink-0" style={{ width: "80px" }}>
                <a href="/" className="inline-block">
                  <img
                    src={currentBrand.logo_url}
                    alt={currentBrand.name}
                    className="h-16 w-auto cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>

              {/* Club Name + City Selector - Centered */}
              <div className="flex-1 flex items-center justify-center gap-4 px-4">
                <h1
                  className="font-bold tracking-tight text-white text-center leading-tight"
                  style={{
                    fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentBrand.name}
                </h1>
                
                {/* City Selector - Desktop */}
                {onCityChange && cities.length > 0 && (
                  <Select value={selectedCity} onValueChange={onCityChange}>
                    <SelectTrigger className="w-auto min-w-[140px] h-9 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue />
                      <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="All Cities">All Cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Right Side Actions - Fixed Width */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Notifications */}
                <button
                  onClick={() => navigate("/notifications")}
                  className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Bell className="h-5 w-5 text-white" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background" />
                </button>

                {/* Member Account Button */}
                <Button
                  size="default"
                  onClick={() => navigate("/member-dashboard")}
                  className="font-semibold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--accent-foreground))",
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar - Below header on desktop if present */}
        {!isMobile && onSearchChange && (
          <div className="container mx-auto px-4 md:px-6 pb-3">
            <div className="max-w-2xl mx-auto">
              <SearchBar value={searchQuery} onChange={onSearchChange} isSearching={isSearching} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
