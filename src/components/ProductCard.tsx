import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RedemptionModal } from "@/components/RedemptionModal";
import { useBookmarks } from "@/contexts/BookmarkContext";

interface ProductCardProps {
  brand: string;
  title: string;
  images: string[];
  tags: string[];
  description?: string;
  offerId?: string;
  category?: "Golf" | "Hotels" | "Dining" | "Lifestyle" | "Entertainment";
  discountAmount?: number; // e.g., 50 for "$50 off"
  discountPercent?: number; // e.g., 20 for "20% off"
}

const categoryColors = {
  Golf: "#10b981",
  Hotels: "#3b82f6",
  Dining: "#ef4444",
  Lifestyle: "#a855f7",
  Entertainment: "#f59e0b"
};

export const ProductCard = ({ brand, title, images, tags, offerId, category = "Lifestyle", discountAmount, discountPercent }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const isCurrentlyBookmarked = offerId ? isBookmarked(offerId) : false;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (offerId) {
      toggleBookmark(offerId);
    }
  };

  // Extract city and state from tags
  const location = tags.join(", ");

  return (
    <>
      <div 
        className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a2332] border border-white/10 transition-all duration-300 ease-in-out md:hover:-translate-y-2 md:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] touch-active"
        onClick={handleCardClick}
      >
        {/* Image Container with text overlay */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={images[0]}
            alt={`${brand} - ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          
          {/* Text overlay on image */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {brand} – {title}
            </h3>
            <p className="text-base md:text-lg text-white/90">
              {location}
            </p>
          </div>
          
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

        {/* Card Content - Just the button */}
        <div className="p-6">
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

    <RedemptionModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      brand={brand}
      title={title}
      image={images[0]}
      category={category}
      offerId={offerId}
      discountAmount={discountAmount}
      discountPercent={discountPercent}
    />
    </>
  );
};