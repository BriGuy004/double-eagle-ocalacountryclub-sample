import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  discountText?: string;
  isNew?: boolean; // Optional prop to mark offers as new
}

export const ProductCard = ({
  brand,
  title,
  images,
  tags,
  offerId,
  category = "Lifestyle",
  discountAmount,
  discountPercent,
  discountText,
  isNew = false,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const isCurrentlyBookmarked = offerId ? isBookmarked(offerId) : false;

  // Track if user has viewed this offer
  const [hasViewed, setHasViewed] = useState(false);

  // Check if offer has been viewed on mount
  useEffect(() => {
    if (offerId) {
      const viewedOffers = JSON.parse(localStorage.getItem("viewedOffers") || "[]");
      setHasViewed(viewedOffers.includes(offerId));
    }
  }, [offerId]);

  const handleCardClick = () => {
    if (offerId) {
      // Mark offer as viewed
      const viewedOffers = JSON.parse(localStorage.getItem("viewedOffers") || "[]");
      if (!viewedOffers.includes(offerId)) {
        viewedOffers.push(offerId);
        localStorage.setItem("viewedOffers", JSON.stringify(viewedOffers));
        setHasViewed(true);
      }

      navigate(`/redemption/${offerId}`);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (offerId) {
      toggleBookmark(offerId);
    }
  };

  // Extract city and state from tags (for Golf category)
  const cityState = tags.find((tag) => tag.includes(",")) || "";

  // Format discount display
  const displayDiscountText = discountText || (discountPercent ? `${discountPercent}% off` : discountAmount ? `$${discountAmount} off` : title);

  const isGolfCategory = category === "Golf";

  // Show NEW badge if offer is new AND user hasn't viewed it
  const showNewBadge = isNew && !hasViewed;

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 transition-all duration-300 hover:border-primary/30 hover:shadow-xl active:scale-[0.98]"
      onClick={handleCardClick}
    >
      {/* Image Container - Mobile optimized aspect ratio */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={images[0]}
          alt={brand}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* NEW Badge - Top Left (only if new and not viewed) - Smaller on mobile */}
        {showNewBadge && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-accent/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg z-10">
            <span className="text-xs font-bold text-accent-foreground tracking-wide">NEW</span>
          </div>
        )}

        {/* Member Exclusive Badge - Smaller on mobile */}
        <div className={`absolute top-2 ${showNewBadge ? 'right-2 md:right-3' : 'left-2 md:left-3'} md:top-3 bg-primary/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg`}>
          <span className="text-xs font-bold text-white tracking-wide">MEMBER EXCLUSIVE</span>
        </div>

        {/* Bookmark Heart - Touch-friendly */}
        <button
          onClick={handleBookmarkClick}
          aria-label={isCurrentlyBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-2 md:p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 active:scale-95"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isCurrentlyBookmarked ? "fill-primary text-primary scale-110" : "text-white hover:text-primary"
            }`}
          />
        </button>
      </div>

      {/* Card Content - Better mobile padding */}
      <div className="p-4 md:p-5">
        {isGolfCategory ? (
          // GOLF LAYOUT: Brand name + City/State stacked
          <div className="mb-3 md:mb-4 min-h-[60px] md:min-h-[68px]">
            <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            {cityState && <p className="text-sm text-muted-foreground font-medium">{cityState}</p>}
          </div>
        ) : (
          // OTHER CATEGORIES LAYOUT: Brand name left, Offer Text right
          <div className="flex items-start justify-between mb-3 md:mb-4 gap-2 md:gap-3 min-h-[60px] md:min-h-[68px]">
            <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            <div className="flex-shrink-0 bg-transparent border-2 border-white rounded-lg px-2 py-1.5 md:px-3 md:py-2 min-w-[90px] md:min-w-[100px] max-w-[120px] md:max-w-[140px] flex items-center justify-center group-hover:border-primary transition-all duration-300">
              <p className="text-xs font-bold text-white text-center leading-tight">{displayDiscountText}</p>
            </div>
          </div>
        )}

        {/* View Offer Button - Touch-friendly */}
        <Button
          aria-label={`View offer for ${brand}`}
          variant="default"
          className="w-full font-semibold rounded-xl py-5 md:py-6 text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] pointer-events-none"
          style={{ minHeight: "48px" }}
        >
          View Offer
        </Button>
      </div>
    </div>
  );
};
