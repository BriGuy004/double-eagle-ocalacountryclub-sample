import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { MobileNav } from "@/components/MobileNav";
import { Menu, User, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBrand } from "@/contexts/BrandContext";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isSearching?: boolean;
}

export const Header = ({ 
  searchQuery = "", 
  onSearchChange, 
  isSearching = false 
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
        <div className="container mx-auto px-4 md:px-6 py-2">
          {isMobile ? (
            /* Mobile Layout */
            <div className="space-y-3">
              {/* Top Row: Hamburger + Logo + Notification */}
              <div className="flex items-center justify-between">
                {/* Hamburger Menu with Brand Color on Hover */}
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all relative"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </button>
                
                {/* Brand Logo */}
                <a href="/" className="inline-block">
                  <img 
                    src={currentBrand.logo_url} 
                    alt={currentBrand.name} 
                    className="h-10 w-auto cursor-pointer"
                  />
                </a>
                
                {/* Quick Actions */}
                <button
                  onClick={() => navigate('/notifications')}
                  className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all relative"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Bell className="h-5 w-5 text-white" />
                  {/* Notification Badge with Brand Color */}
                  <span 
                    className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                </button>
              </div>
              
              {/* Search Bar - Full Width */}
              {onSearchChange && (
                <SearchBar 
                  value={searchQuery}
                  onChange={onSearchChange}
                  isSearching={isSearching}
                />
              )}
            </div>
          ) : (
            /* Desktop Layout */
            <div className="flex items-center justify-between gap-8">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
                <a href="/" className="inline-block">
                  <img 
                    src={currentBrand.logo_url} 
                    alt={currentBrand.name} 
                    className="h-20 w-auto cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
              
              {/* Search Bar */}
              {onSearchChange && (
                <div className="flex items-center flex-1 max-w-xl">
                  <SearchBar 
                    value={searchQuery}
                    onChange={onSearchChange}
                    isSearching={isSearching}
                  />
                </div>
              )}
              
              {/* Right Side Actions */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                {/* Notifications */}
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Bell className="h-5 w-5 text-white" />
                  <span 
                    className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                </button>
                
                {/* Member Account Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/member-dashboard')}
                  className="text-white font-semibold border-0 hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: 'hsl(50, 35%, 40%)'
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
