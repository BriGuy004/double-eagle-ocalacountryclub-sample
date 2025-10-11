import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Golf", path: "/golf" },
  { name: "Dining", path: "/dining" },
  { name: "Hotels", path: "/hotels" },
  { name: "Lifestyle", path: "/lifestyle" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Shopping", path: "/shopping" },
  { name: "Travel", path: "/travel" }
];

interface CategoryNavProps {
  selectedCategory: string;
}

export const CategoryNav = ({ selectedCategory }: CategoryNavProps) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-[73px] md:top-[88px] z-20">
      <div className="container mx-auto px-0 md:px-6 py-3">
        {/* Desktop: Regular flex */}
        <div className="hidden md:flex items-center gap-3 justify-center flex-wrap">
          {CATEGORIES.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.path)}
              className="font-semibold px-6 py-2 transition-all touch-active"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Mobile: Horizontal scroll with arrows */}
        <div className="md:hidden relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-lg touch-active"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 py-1"
          >
            {CATEGORIES.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.path)}
                className="font-semibold px-4 py-2 text-sm whitespace-nowrap flex-shrink-0 min-w-[80px] touch-active"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-lg touch-active"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
