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
  
  const categoryColor = categoryColors[category];
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

  const handleViewOffer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a2332] border border-white/10 transition-all duration-300 ease-in-out md:hover:-translate-y-2 md:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] touch-active"
        onClick={handleCardClick}
      >
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={images[0]}
          alt={`${brand} - ${title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Badge - top-left */}
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            className="uppercase text-xs font-bold px-3 py-1"
            style={{ backgroundColor: categoryColor }}
          >
            {category}
          </Badge>
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

      {/* Card Content Area */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{brand} – {title}</h3>
        <p className="text-base text-[#94a3b8]">
          {tags.join(", ")}
        </p>
        
        <Button 
          aria-label={`View offer for ${brand}`}
          variant="default"
          className="w-full font-semibold rounded-lg py-6 transition-all duration-200 touch-active"
          style={{ minHeight: "48px" }}
          onClick={handleViewOffer}
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