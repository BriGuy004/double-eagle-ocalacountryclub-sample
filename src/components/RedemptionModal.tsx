import { useState, useEffect } from "react";
import { X, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { useBrand } from "@/contexts/BrandContext";

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  title: string;
  image: string;
  category: "Golf" | "Hotels" | "Dining" | "Lifestyle" | "Entertainment";
  offerId?: string;
  discountAmount?: number;
  discountPercent?: number;
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
  const { getBrandById } = useBrand();
  
  const brandData = offerId ? getBrandById(offerId) : null;
  
  const instructions = getRedemptionInstructions(category);
  const terms = brandData?.redemption_info || getTerms();

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
            {brandData?.city && brandData?.state && (
              <p className="text-base md:text-lg text-[#94a3b8]">
                {brandData.city}, {brandData.state}, United States
              </p>
            )}
            <p className="text-base md:text-lg text-[#94a3b8] line-clamp-4 leading-relaxed">
              {title}
            </p>
          </div>

          {/* Full Address if available */}
          {brandData?.full_address && (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-white font-semibold mb-2">{brand}</h3>
              <p className="text-[#94a3b8] text-sm md:text-base whitespace-pre-line">
                {brandData.full_address}
              </p>
            </div>
          )}

          {/* Description if available */}
          {brandData?.description && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="space-y-4 text-[#94a3b8]">
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {brandData.description}
                </p>
              </div>
            </div>
          )}

          {/* Logo and Website */}
          {(brandData?.logo_url || brandData?.website) && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              {brandData.logo_url && (
                <img 
                  src={brandData.logo_url}
                  alt={`${brand} Logo`}
                  className="h-16 md:h-20 w-auto opacity-60 brightness-150"
                  style={{ filter: "brightness(1.5) grayscale(20%)" }}
                />
              )}
              {brandData.website && (
                <a 
                  href={brandData.website.startsWith('http') ? brandData.website : `https://${brandData.website}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-[#e67e3c] hover:text-[#d56d2f] underline inline-block touch-active"
                  style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
                >
                  Club website
                </a>
              )}
            </div>
          )}

          {/* Redemption Code */}
          <div className="bg-card/50 rounded-lg p-4 md:p-6">
            <p className="text-sm md:text-base text-[#94a3b8] text-center mb-2 md:mb-4">
              Your Redemption Code
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <code className="text-2xl md:text-[40px] font-bold text-[#e67e3c] tracking-wider">
                {redemptionCode}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all text-white touch-active"
                onClick={handleCopyCode}
                aria-label="Copy code to clipboard"
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                {copied ? (
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 md:h-6 md:w-6" />
                )}
              </Button>
            </div>

            {/* CTA based on category */}
            {instructions.type === "button" && (
              <Button
                size="lg"
                variant="orange"
                className="w-full text-base md:text-lg py-4 md:py-6 font-semibold touch-active"
                style={{ minHeight: "52px" }}
                onClick={() => window.open(instructions.url, '_blank')}
              >
                {instructions.text}
              </Button>
            )}
            
            {instructions.type === "link" && (
              <a
                href={instructions.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  size="lg"
                  variant="orange"
                  className="w-full text-base md:text-lg py-4 md:py-6 font-semibold touch-active"
                  style={{ minHeight: "52px" }}
                >
                  {instructions.text}
                </Button>
              </a>
            )}
            
            {instructions.type === "text" && (
              <p className="text-center text-sm md:text-base text-[#94a3b8] px-2">
                {instructions.text}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => setShowTerms(!showTerms)}
              className="w-full text-left text-sm md:text-base font-semibold text-[#94a3b8] hover:text-white transition-colors touch-active"
              style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
            >
              {showTerms ? "Hide" : "View"} Terms & Conditions
            </button>
            
            {showTerms && (
              <div className="bg-card/30 rounded-lg p-4 md:p-6">
                <p className="text-xs md:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line">
                  {terms}
                </p>
              </div>
            )}
          </div>

          {/* Redeem Button */}
          {!isRedeemed && (
            <Button
              size="lg"
              onClick={handleRedeem}
              className="w-full bg-primary hover:bg-primary/90 text-base md:text-lg py-4 md:py-6 font-semibold transition-all touch-active"
              style={{ minHeight: "52px" }}
            >
              Redeem This Offer
            </Button>
          )}
          
          {isRedeemed && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 md:p-6 text-center">
              <div className="flex items-center justify-center gap-2 md:gap-3 text-green-400">
                <Check className="h-5 w-5 md:h-6 md:w-6" />
                <p className="text-base md:text-lg font-semibold">Offer Redeemed!</p>
              </div>
              <p className="text-xs md:text-sm text-green-400/80 mt-2">
                Check your dashboard for details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
