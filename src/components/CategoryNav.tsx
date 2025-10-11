import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Golf", path: "/golf" },
  { name: "Dining", path: "/dining" },
  { name: "Shopping", path: "/shopping" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Hotels", path: "/hotels" },
  { name: "Lifestyle", path: "/lifestyle" },
  { name: "Travel", path: "/travel" }
];

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange?: (category: string) => void;
}

export const CategoryNav = ({ selectedCategory, onCategoryChange }: CategoryNavProps) => {
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

  const handleCategoryChange = (categoryName: string, path: string) => {
    if (onCategoryChange) {
      // If callback provided, use it (for Home page)
      onCategoryChange(categoryName);
    } else {
      // Otherwise navigate to the category page
      navigate(path);
    }
  };

  return (
    <div className="relative w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-[73px] md:top-[88px] z-20">
      <div className="container mx-auto px-0 md:px-6 py-3">
        {/* Desktop: Regular flex */}
        <div className="hidden md:flex items-center gap-3 justify-center flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name, category.path)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? 'bg-primary text-black'
                  : 'bg-transparent text-white/70 hover:text-white'
              }`}
            >
              {category.name}
            </button>
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
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name, category.path)}
                className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all active:scale-95 ${
                  selectedCategory === category.name
                    ? 'bg-primary text-black'
                    : 'bg-transparent text-white/70 hover:text-white'
                }`}
                style={{ minHeight: '44px' }}
              >
                {category.name}
              </button>
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
