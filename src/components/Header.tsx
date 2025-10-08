import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { MobileNav } from "@/components/MobileNav";
import { Menu, LogOut, User as UserIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBrand } from "@/contexts/BrandContext";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isSearching?: boolean;
}

export const Header = ({ searchQuery = "", onSearchChange, isSearching = false }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentBrand } = useBrand();
  const { user, signOut } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  
  return (
    <>
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      
      <header className="w-full border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 py-2">
          {isMobile ? (
            /* Mobile Layout */
            <div className="space-y-3">
              {/* Top Row: Hamburger + Logo */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </button>
                
                <img 
                  src={currentBrand?.logo_url || "/lovable-uploads/ocala-logo.png"} 
                  alt={currentBrand?.name || "Country Club"} 
                  className="h-10 w-auto"
                />
                
                <div style={{ width: "44px" }} /> {/* Spacer for centering */}
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
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="inline-block">
                  <img 
                    src={currentBrand?.logo_url || "/lovable-uploads/ocala-logo.png"} 
                    alt={currentBrand?.name || "Country Club"} 
                    className="h-24 w-auto cursor-pointer"
                  />
                </a>
              </div>

              {/* Search Bar */}
              {onSearchChange && (
                <div className="flex items-center flex-1 mx-8">
                  <SearchBar 
                    value={searchQuery}
                    onChange={onSearchChange}
                    isSearching={isSearching}
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/member-dashboard')}
                      className="bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      Member Account
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/auth')}
                    className="bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};