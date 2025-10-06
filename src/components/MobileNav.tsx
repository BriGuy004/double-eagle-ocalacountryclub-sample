import { X, Home, Trophy, Hotel, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Golf", path: "/golf", icon: Trophy },
  { name: "Hotels", path: "/hotels", icon: Hotel },
  { name: "Dining", path: "/dining", icon: UtensilsCrossed },
  { name: "Lifestyle", path: "/", icon: ShoppingBag },
  { name: "Member Account", path: "/member-dashboard", icon: User }
];

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <nav 
        className="fixed top-0 left-0 h-full w-[280px] bg-[#1a2332] z-50 shadow-2xl animate-slide-in-right"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img 
            src="/lovable-uploads/lantana-logo.png" 
            alt="Lantana Golf Club" 
            className="h-16 w-auto"
          />
        </div>

        {/* Nav Links */}
        <div className="py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors active:scale-95 ${
                  isActive 
                    ? "bg-[#e67e3c] text-white" 
                    : "text-white hover:bg-white/10"
                }`}
                style={{ minHeight: "56px" }}
              >
                <Icon className="h-6 w-6" />
                <span className="text-lg font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
