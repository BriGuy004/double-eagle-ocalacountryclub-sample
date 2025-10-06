import { useState, useEffect } from "react";
import { X, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import wisconsinLogo from "@/assets/wisconsin-country-club-logo.png";
import northgateLogo from "@/assets/northgate-logo.png";
import stKateLogo from "@/assets/st-kate-logo.png";
import tennesseeNationalLogo from "@/assets/tennessee-national-logo.png";
import northlandLogo from "@/assets/northland-country-club-logo.png";

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  title: string;
  image: string;
  category: "Golf" | "Hotels" | "Dining" | "Lifestyle" | "Entertainment";
  offerId?: string;
  discountAmount?: number; // e.g., 50 for "$50 saved"
  discountPercent?: number; // e.g., 20 for "20% off"
}

const generateRedemptionCode = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `LTN-${randomNum}`;
};

const getRedemptionInstructions = (category: string) => {
  switch (category) {
    case "Golf":
      return { type: "button", text: "Reserve Tee Time", url: "https://example.com/reserve" };
    case "Hotels":
      return { type: "link", text: "Book Online", url: "https://example.com/book" };
    case "Dining":
      return { type: "text", text: "Show this code at checkout" };
    default:
      return { type: "text", text: "Show this code at checkout" };
  }
};

const getTerms = () => {
  return "Valid for new reservations only. Cannot be combined with other offers. Subject to availability. Blackout dates may apply. Offer expires 90 days from redemption date. Not valid on prior purchases.";
};

export const RedemptionModal = ({
  isOpen,
  onClose,
  brand,
  title,
  image,
  category,
  offerId = "",
  discountAmount = 0,
  discountPercent,
}: RedemptionModalProps) => {
  const [redemptionCode] = useState(generateRedemptionCode());
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { redeemOffer } = useUser();
  
  const instructions = getRedemptionInstructions(category);
  const terms = getTerms();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const modalElement = document.getElementById("redemption-modal");
      if (modalElement) {
        const focusableElements = modalElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };

        document.addEventListener("keydown", handleTab);
        firstElement?.focus();

        return () => document.removeEventListener("keydown", handleTab);
      }
    }
  }, [isOpen]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(redemptionCode);
      setCopied(true);
      toast({
        title: "Code copied!",
        description: "Redemption code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  const handleRedeem = () => {
    setIsRedeemed(true);
    
    // Update the dashboard with the redemption
    redeemOffer({
      brand,
      title,
      discountAmount,
      category
    });
    
    toast({
      title: "Offer redeemed!",
      description: `You saved $${discountAmount}! Check your dashboard.`,
    });
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        id="redemption-modal"
        className={`relative w-full ${
          isMobile 
            ? "h-full rounded-none flex flex-col" 
            : "max-w-[700px] max-h-[90vh] rounded-2xl flex flex-col"
        } bg-[#1a2332] shadow-2xl ${
          isMobile ? "animate-slide-up" : "animate-scale-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 active:bg-white/30 transition-all duration-200 touch-active"
          aria-label="Close modal"
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Business Image Header */}
        <div className={`w-full overflow-hidden flex-shrink-0 ${isMobile ? "h-[200px]" : "h-[300px]"}`}>
          <img
            src={image}
            alt={brand}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Modal Content - Scrollable */}
        <div 
          className={`${isMobile ? "p-4 pb-8" : "p-6 md:p-8"} space-y-4 md:space-y-6 overflow-y-auto flex-1`}
        >
          {/* Business Details */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-[32px] font-bold text-white">{brand}</h2>
            <p className="text-base md:text-lg text-[#94a3b8] line-clamp-4 leading-relaxed">
              {title}
            </p>
          </div>

          {/* Golf Course Details - Wisconsin Country Club */}
          {category === "Golf" && brand.includes("Wisconsin Country Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Located just outside of the city, The Wisconsin Country Club is home to one of the most challenging and beautiful 18-hole golf courses in the area. It's Harry Smead/David Gill design features tree-lined fairways, intricately contoured greens, and well-positioned bunkering.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Tucked in the northwest corner of Milwaukee, this track is ideal for both the casual and serious golfer. The 6,802 yard, 18-hole course was built in 1954 and was considered one of the best in the area.
                </p>
              </div>
              
              <div className="space-y-4">
                <img 
                  src={wisconsinLogo}
                  alt="Wisconsin Country Club Logo"
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
                <a 
                  href="https://links2golf.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Walden Golf Club */}
          {category === "Golf" && brand.includes("Walden Golf Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Walden Golf Club on beautiful Lake Conroe, opened in 1976. Previously, Golf Digest ranked Walden Golf Club as the best course in the Houston area, and the 5th best in the state of Texas. In addition, GOLF Magazine once ranked the par 5, 11th hole as one of the top 500 holes in the world. Due to its prestige, Walden has hosted significant events over the years including the TGA South Amateur Championship, Women's Texas Cup, and PGA Korn Ferry Tour Qualifying School.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Holes 11 – 13, situated on a peninsula, are notoriously challenging and commonly referred to as the "Walden Triangle," a nod to the Bermuda Triangle.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Walden's magnificent course was also designed by von Hagge along with Bruce Develin and has earned a distinguished reputations as being one of the top private golf courses in the state of Texas.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm md:text-base font-semibold text-white">Walden on Lake Conroe</p>
                  <p className="text-xs md:text-sm text-[#94a3b8]">CAFE ON THE GREEN</p>
                </div>
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>13101 Walden Rd</li>
                  <li>Montgomery, TX</li>
                  <li>United States</li>
                  <li>77356</li>
                </ul>
                <a 
                  href="https://waldengolfclub.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Northgate Country Club */}
          {category === "Golf" && brand.includes("Northgate Country Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Established in 1983, Northgate Country Club is considered North Houston's premier golf club and the centerpiece of the upscale Northgate Forest community. Northgate features 18 holes of Championship Golf designed by Bruce Devlin and Robert von Hagge, an executive 5-hole course aptly named the "Fast-Five".
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Northgate Country Club is a Par 71 measuring 6,827 yards.
                </p>
              </div>
              
              <div className="space-y-4">
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>17110 Northgate Forest Drive</li>
                  <li>Houston, TX</li>
                  <li>United States</li>
                  <li>77068</li>
                </ul>
                <img 
                  src={northgateLogo}
                  alt="Northgate Country Club Logo"
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
                <a 
                  href="https://northgatecc.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Tennessee National Golf Club */}
          {category === "Golf" && brand.includes("Tennessee National Golf Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Tennessee National Golf Club is ranked by Golf Digest as one of the Top 10 golf courses in Tennessee. With five holes playing to or from the water, beautiful views of Watts Bar Lake are not hard to find. This, in addition to 13 water features and stacked sod bunkers reminiscent of Scottish links, make Tennessee National retreat reminiscent different from other courses in the southeast. With five sets of tees, generous landing areas, and a delightfully walkable layout, the Greg Norman Signature course is uniquely playable, yet challenging to accomplished golfers.
                </p>
              </div>
              
              <div className="space-y-4">
                <img 
                  src={tennesseeNationalLogo}
                  alt="Tennessee National Golf Club Logo"
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>8301 Tennessee National Drive</li>
                  <li>Loudon, TN</li>
                  <li>United States</li>
                  <li>37774</li>
                </ul>
                <a 
                  href="https://tennesseenationalgolf.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Northland Country Club */}
          {category === "Golf" && brand.includes("Northland Country Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Experience the thrill and nostalgia of playing on a Donald Ross designed championship 18-hole golf course.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Northland Country Club is recognized as one of the top 5 golf courses in Minnesota and one of the top Classic Golf Courses in the United States. The wooded, gently rolling course, with amazing views of Lake Superior, is tough enough for low handicappers, yet is still eminently enjoyable for higher handicappers.
                </p>
              </div>
              
              <div className="space-y-4">
                <img 
                  src={northlandLogo}
                  alt="Northland Country Club Logo"
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>3901 E Superior St</li>
                  <li>Duluth, MN</li>
                  <li>United States</li>
                  <li>55804</li>
                </ul>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Golf Club of The Everglades */}
          {category === "Golf" && brand.includes("Golf Club of The Everglades") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Golf Club of The Everglades has been a distinctive part of Southwest Florida's golf landscape for more than 15 years.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  As a private, Members-only Club that is one of the most exclusive and respected in Naples, FL.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  The Golf Course is an eighteen-hole 7,352 yard, par 72 design by master Golf Course architect Rees Jones. Distinguished as one of the finest walkable designs in the State, it offers one of the top practice facilities anywhere coupled with golf instruction for every level. Golf Club of The Everglades offers a first-class golf experience in a relaxed setting that is in keeping with the rich tradition and ambiance of the Club.
                </p>
              </div>
              
              <div className="space-y-4">
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>8835 Vanderbilt Beach Road Extension</li>
                  <li>Naples, FL</li>
                  <li>United States</li>
                  <li>34120</li>
                </ul>
                <a 
                  href="https://www.evergladesclub.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Golf Course Details - Stonegate Golf Club */}
          {category === "Golf" && brand.includes("Stonegate Golf Club") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Nestled amid 3,300 acres of pristine wetlands and woodlands, Stonegate Golf Club at Solivita is a stunning location for golfers and their guests. Stonegate is proud to be the best golf club in the Kissimmee region and part of Stonegate's uniqueness comes from nature.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  The club property features 100-year old-oak hammocks, a relative rarity in the State of Florida. Then, there's the Florida-famous lush greenery that offers year-round beauty throughout the grounds. Another feature that's distinctly 'Florida' are the peaceful waterways and streams. All this represents the best of what Florida has to offer in terms of natural resources and their wild, untamed beauty.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Stonegate Golf Club is a 36-hole combination that provides a challenging variety of shot-making opportunities for residents and visitors alike.
                </p>
              </div>
              
              <div className="space-y-4">
                <ul className="space-y-1 text-sm md:text-base text-[#94a3b8]">
                  <li>404 Village Drive</li>
                  <li>Kissimmee, FL</li>
                  <li>United States</li>
                  <li>32034</li>
                </ul>
                <a 
                  href="https://www.stonegategolfclub.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              </div>
            </div>
          )}

          {/* Hotel Details - St. Kate - The Arts Hotel */}
          {category === "Hotels" && brand.includes("St. Kate") && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed">
                  Set in the lively, artsy East Town neighborhood, this refined, art-filled hotel is a mile from the Milwaukee Art Museum and a 5-minute walk from the nearest tram stop.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Featuring unique artwork, the polished rooms provide free Wi-Fi, flat-screen TVs and minifridges, along with ukuleles, record players and art supplies. Suites add living rooms. Upgraded 2-bedroom suites have dining rooms and additional bathrooms. Room service is available 24/7.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Amenities include a pizzeria, a cafe and 2 bars, plus art galleries. There's a gym and more than 11,000 sq ft of meeting space. Parking and breakfast are available for a surcharge.
                </p>
              </div>
              
              <div className="space-y-4">
                <img 
                  src={stKateLogo}
                  alt="St. Kate - The Arts Hotel Logo"
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
                <a 
                  href="https://www.saintkatearts.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Hotel website
                </a>
              </div>
            </div>
          )}

          {/* Redemption Code Box */}
          <div className="bg-[#253447] rounded-xl p-4 md:p-6 border border-white/10 space-y-3 md:space-y-4">
            <p className="text-center text-xs md:text-sm font-medium text-[#94a3b8]">
              Your Redemption Code
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <div className="bg-[#e67e3c] px-4 md:px-6 py-3 rounded-lg">
                <code className="text-2xl md:text-[32px] font-mono font-bold text-white tracking-wider block text-center">
                  {redemptionCode}
                </code>
              </div>
              <Button
                onClick={handleCopyCode}
                variant="outline"
                className="h-12 w-full sm:w-12 border-white/20 bg-white/5 hover:bg-white/10 active:bg-white/20 text-white touch-active"
                style={{ minHeight: "48px" }}
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Redemption Instructions */}
          <div className="bg-[#253447] rounded-xl p-4 md:p-6 border border-white/10">
            {instructions.type === "text" && (
              <p className="text-center text-sm md:text-base text-white font-medium">
                {instructions.text}
              </p>
            )}
            {(instructions.type === "link" || instructions.type === "button") && (
              <div className="text-center">
                <a
                  href={instructions.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-[#e67e3c] hover:bg-[#d56d2f] active:bg-[#c55d1f] text-white font-semibold px-6 md:px-8 touch-active" style={{ minHeight: "48px" }}>
                    {instructions.text}
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-white/10 pt-4">
            <button
              onClick={() => setShowTerms(!showTerms)}
              className="text-xs md:text-sm text-[#94a3b8] hover:text-white transition-colors touch-active"
              style={{ minHeight: "44px" }}
            >
              {showTerms ? "Hide Terms" : "View Terms & Conditions"}
            </button>
            {showTerms && (
              <p className="mt-3 text-xs text-[#94a3b8] leading-relaxed">
                {terms}
              </p>
            )}
          </div>

          {/* Redeem Now Button - Hidden for Golf category */}
          {category !== "Golf" && (
            <Button
              onClick={handleRedeem}
              disabled={isRedeemed}
              className={`w-full py-6 md:py-7 text-base md:text-lg font-bold transition-all duration-300 touch-active ${
                isRedeemed
                  ? "bg-green-600 hover:bg-green-600 active:bg-green-700"
                  : "bg-[#e67e3c] hover:bg-[#d56d2f] active:bg-[#c55d1f]"
              }`}
              style={{ minHeight: "56px" }}
            >
              {isRedeemed ? (
                <span className="flex items-center justify-center gap-2 animate-bounce">
                  <Check className="h-6 w-6" />
                  Redeemed!
                </span>
              ) : (
                "Redeem Now"
              )}
            </Button>
          )}
          
          {/* Safe area padding for mobile */}
          {isMobile && <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />}
        </div>
      </div>
    </div>
  );
};
