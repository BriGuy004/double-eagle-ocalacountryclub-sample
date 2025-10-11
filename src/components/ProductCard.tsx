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
  offerText?: string;
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
  offerText,
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

  const cityState = tags.find((tag) => tag.includes(",")) || "";
  const discountText = offerText || 
    (discountPercent ? `${discountPercent}% off` : 
    discountAmount ? `$${discountAmount} off` : 
    title);

  const isGolfCategory = category === "Golf";

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2332] to-[#0f1729] border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 active:scale-[0.98] h-full flex flex-col"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted flex-shrink-0">
        <img
          src={images[0]}
          alt={brand}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bookmark Heart - Top Right */}
        <button
          onClick={handleBookmarkClick}
          aria-label={isCurrentlyBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 active:scale-95"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isCurrentlyBookmarked ? "fill-red-500 text-red-500 scale-110" : "text-white hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Card Content - FIXED COLORS */}
      <div className="p-4 md:p-5 flex flex-col flex-1 bg-gradient-to-b from-[#1a2332] to-[#151f2e]">
        {isGolfCategory ? (
          // GOLF LAYOUT: Brand name + City/State stacked
          <div className="mb-3 md:mb-4 flex-1">
            <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            {cityState && (
              <p className="text-sm text-white/60 font-medium">
                {cityState}
              </p>
            )}
          </div>
        ) : (
          // OTHER CATEGORIES: Brand name + Offer box
          <div className="flex items-start justify-between mb-3 md:mb-4 gap-3 flex-1">
            <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-300">
              {brand}
            </h4>
            
            {/* Offer Badge - Better Colors */}
            <div className="flex-shrink-0 bg-primary/20 border-2 border-primary rounded-lg px-3 py-2 min-w-[100px] max-w-[140px] flex items-center justify-center">
              <p className="text-xs font-bold text-primary text-center leading-tight">
                {discountText}
              </p>
            </div>
          </div>
        )}

        {/* View Offer Button - Better Contrast */}
        <Button
          aria-label={`View offer for ${brand}`}
          className="w-full font-semibold rounded-xl py-5 md:py-6 text-sm md:text-base transition-all duration-300 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] pointer-events-none mt-auto"
          style={{ minHeight: "48px" }}
        >
          View Offer
        </Button>
      </div>
    </div>
  );
};
