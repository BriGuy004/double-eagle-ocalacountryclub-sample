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
      className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 transition-all duration-500 ease-out hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(218,165,32,0.15)] active:scale-[0.98]"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={images[0]}
          alt={brand}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* NEW Badge - Top Left (only if new and not viewed) */}
        {showNewBadge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 rounded-full shadow-lg animate-pulse">
            <span className="text-xs font-bold text-white tracking-wider">NEW</span>
          </div>
        )}

        {/* Bookmark Heart - Top Right */}
        <button
          onClick={handleBookmarkClick}
          aria-label={isCurrentlyBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isCurrentlyBookmarked ? "fill-primary text-primary scale-110" : "text-white hover:text-primary"
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {isGolfCategory ? (
          // GOLF LAYOUT: Brand name + City/State stacked
          <div className="mb-4 min-h-[68px]">
            <h4 className="text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            {cityState && <p className="text-sm text-muted-foreground font-medium">{cityState}</p>}
          </div>
        ) : (
          // OTHER CATEGORIES LAYOUT: Brand name left, Discount right
          <div className="flex items-start justify-between mb-4 gap-3 min-h-[68px]">
            <h4 className="text-xl font-bold text-white line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            <div className="flex-shrink-0 bg-transparent border-2 border-white rounded-lg px-3 py-2 min-w-[100px] max-w-[140px] flex items-center justify-center group-hover:border-primary transition-all duration-300">
              <p className="text-xs font-bold text-white text-center leading-tight">{displayDiscountText}</p>
            </div>
          </div>
        )}

        {/* View Offer Button */}
        <Button
          aria-label={`View offer for ${brand}`}
          className="w-full font-semibold rounded-xl py-6 text-base transition-all duration-300 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/20 group-hover:scale-[1.02] active:scale-[0.98] pointer-events-none"
          style={{ minHeight: "48px" }}
        >
          View Offer
        </Button>
      </div>
    </div>
  );
};
