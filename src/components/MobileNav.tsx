import { X, Home, Trophy, Building2, Utensils, ShoppingBag, User, Music, Plane, ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBrand } from "@/contexts/BrandContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Golf", path: "/golf", icon: Trophy },
  { name: "Dining", path: "/dining", icon: Utensils },
  { name: "Shopping", path: "/shopping", icon: ShoppingCart },
  { name: "Entertainment", path: "/entertainment", icon: Music },
  { name: "Hotels", path: "/hotels", icon: Building2 },
  { name: "Lifestyle", path: "/lifestyle", icon: ShoppingBag },
  { name: "Travel", path: "/travel", icon: Plane },
];

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentBrand } = useBrand();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-gradient-to-b from-[#1a2332] to-[#0f1729] z-50 shadow-2xl animate-in slide-in-from-left duration-300">
        <div className="flex flex-col h-full">
          {/* Header with dynamic brand */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              {currentBrand ? (
                <img 
                  src={currentBrand.logo_url} 
                  alt={currentBrand.name}
                  className="h-16 w-auto"
                />
              ) : (
                <div className="h-16 w-16 bg-primary/20 rounded animate-pulse" />
              )}
              
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            {currentBrand && (
              <p className="text-sm text-white/70 font-medium">
                {currentBrand.name}
              </p>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}

            <div className="border-t border-white/10 my-4" />

            <button
              onClick={() => handleNavigation("/member-dashboard")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Member Account</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};
