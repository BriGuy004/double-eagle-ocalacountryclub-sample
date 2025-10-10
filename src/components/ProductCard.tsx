import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  brand: string;
  title: string;
  images: string[];
  tags: string[];
  description?: string;
  offerId?: string;
  category?: "Golf" | "Hotels" | "Dining" | "Lifestyle" | "Entertainment" | "Shopping" | "Travel";
  discountAmount?: number;
  discountPercent?: number;
}

export const ProductCard = ({ 
  brand, 
  title, 
  images, 
  tags, 
  offerId, 
  category = "Lifestyle", 
  discountAmount, 
  discountPercent 
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const isCurrentlyBookmarked = offerId ? isBookmarked(offerId) : false;

  const handleCardClick = () => {
    if (offerId) {
      navigate(`/redemption/${offerId}`);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (offerId) {
      toggleBookmark(offerId);
    }
  };

  // Extract city and state from tags (should be like "Minneapolis, MN")
  const cityState = tags.find(tag => tag.includes(',')) || '';

  return (
    <div 
      className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a2332] border border-white/10 transition-all duration-300 ease-in-out md:hover:-translate-y-2 md:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] touch-active"
      onClick={handleCardClick}
    >
      {/* Image Container - NO TEXT OVERLAY */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={images[0]}
          alt={brand}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Bookmark Heart - top-right */}
        <button
          onClick={handleBookmarkClick}
          aria-label={isCurrentlyBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-200 ${
              isCurrentlyBookmarked ? 'fill-primary text-primary' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Card Content - Brand name CLOSER + BIGGER */}
      <div className="p-4 space-y-3">
        {/* Brand name - BIGGER & CLOSER */}
        <div>
          <h4 className="text-2xl font-bold text-white line-clamp-2 mb-1">
            {brand}
          </h4>
          {cityState && (
            <p className="text-base text-muted-foreground">
              {cityState}
            </p>
          )}
        </div>
        
        {/* View Offer Button */}
        <Button 
          aria-label={`View offer for ${brand}`}
          variant="orange"
          className="w-full font-semibold rounded-lg py-6 text-lg transition-all duration-200 touch-active"
          style={{ minHeight: "48px" }}
          onClick={handleCardClick}
        >
          View Offer
        </Button>
      </div>
    </div>
  );
};
