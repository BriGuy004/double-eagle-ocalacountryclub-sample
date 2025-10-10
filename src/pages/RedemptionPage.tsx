import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function RedemptionPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch offer data from Supabase
  useEffect(() => {
    const fetchOffer = async () => {
      if (!offerId) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .eq('club_id', offerId)
          .single();

        if (error) {
          console.error('Error fetching offer:', error);
          toast.error("Could not load offer details");
          return;
        }

        setOffer(data);
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error("Failed to load offer");
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [offerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Offer Not Found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // 4-image carousel starting with the same image from the offer card
  const images = [
    offer.offer_card_url,    // Image 1 - Same as offer card
    offer.image_2_url,       // Image 2 - Additional carousel image
    offer.image_3_url,       // Image 3 - Additional carousel image
    offer.image_4_url,       // Image 4 - Additional carousel image
  ].filter(Boolean); // Removes any null/undefined images

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
            className="flex items-center gap-2 text-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Image Carousel - NO TEXT OVERLAY */}
        <div className="relative mb-8">
          <div className="relative h-96 md:h-[500px] bg-muted rounded-xl overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`${offer.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
            
            {/* Image indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Brand Name (repeated below image for clarity) */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {offer.name}
          </h2>
          <p className="text-xl text-muted-foreground mt-2">
            {offer.city && offer.state ? `${offer.city}, ${offer.state}` : offer.city || offer.state || ''}
          </p>
        </div>

        {/* Two-Column Layout: Logo + Visit Website LEFT, Description RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 mb-8">
          {/* LEFT COLUMN: Logo, Address, Visit Website Button */}
          <div className="space-y-6">
            {/* Logo Box */}
            <div className="bg-white rounded-lg p-6 border border-border flex items-center justify-center min-h-[200px]">
              <img
                src={offer.logo_url}
                alt={`${offer.name} logo`}
                className="max-w-full max-h-[180px] object-contain"
              />
            </div>

            {/* Address */}
            {offer.full_address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-foreground">
                  <p className="font-medium mb-1">Address:</p>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {offer.full_address}
                  </p>
                </div>
              </div>
            )}

            {/* Visit Website Button - RIGHT BELOW ADDRESS */}
            {offer.website && (
              <Button 
                size="lg" 
                variant="outline"
                className="w-full px-6 py-6 text-lg font-semibold"
                onClick={() => window.open(offer.website.startsWith('http') ? offer.website : `https://${offer.website}`, '_blank')}
              >
                Visit Website
              </Button>
            )}
          </div>

          {/* RIGHT COLUMN: Description & Redemption Info */}
          <div className="space-y-6">
            {/* Description */}
            {offer.description && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">About</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {offer.description}
                </p>
              </div>
            )}

            {/* Redemption Info */}
            {offer.redemption_info && (
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">How to Redeem</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {offer.redemption_info}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Book Now Button - LARGE & CENTERED AT BOTTOM */}
        <div className="flex justify-center mt-12">
          <Button 
            size="lg" 
            className="px-16 py-8 text-2xl font-bold min-w-[300px] rounded-xl"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
