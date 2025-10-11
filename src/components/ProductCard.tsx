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
      className="group cursor-pointer rounded-2xl overflow-hidden bg-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-full"
      onClick={handleCardClick}
    >
      {/* Full Bleed Image with Overlaid Content */}
      <div className="relative aspect-[4/3] w-full">
        <img
          src={images[0]}
          alt={brand}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

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

        {/* Text overlaid on image at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {isGolfCategory ? (
            // GOLF LAYOUT: Brand name + City/State stacked
            <>
              <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">
                {brand}
              </h3>
              {cityState && (
                <p className="text-white/80 text-sm font-medium">
                  {cityState}
                </p>
              )}
            </>
          ) : (
            // OTHER CATEGORIES: Brand name + Offer text
            <>
              <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">
                {brand}
              </h3>
              <p className="text-white/80 text-sm">
                {discountText}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
