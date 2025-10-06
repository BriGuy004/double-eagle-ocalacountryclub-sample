import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// Sample redemption data - in a real app this would come from a database
const redemptionData = {
  // LIFESTYLE
  "ferragamo-lifestyle": { brand: "Ferragamo", title: "Preferred Pricing", description: "Experience luxury Italian fashion with Ferragamo's exclusive preferred pricing for members. Discover timeless elegance in footwear, accessories, and ready-to-wear collections.", images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop"], offer: "Preferred Pricing on select items", terms: "Valid on full-price items only. Cannot be combined with other offers." },
  "tumi-lifestyle": { brand: "Tumi", title: "Up to 40% off online purchases", description: "Shop premium travel and business accessories from Tumi. Known for exceptional durability and innovative design, perfect for the modern traveler.", images: ["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop"], offer: "Up to 40% off online purchases", terms: "Valid on tumi.com. Excludes sale items and collaborations." },
  "bmw-lifestyle": { brand: "BMW", title: "Up to $3000 off select models", description: "Experience the ultimate driving machine with exclusive member pricing on select BMW models. Luxury, performance, and innovation combined.", images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&h=600&fit=crop"], offer: "Up to $3000 off select models", terms: "Valid on new vehicle purchases only. See dealer for details." },
  "brooks-brothers-lifestyle": { brand: "Brooks Brothers", title: "15% off", description: "Since 1818, Brooks Brothers has defined American style. Enjoy classic elegance and timeless sophistication with our member discount.", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop"], offer: "15% off all purchases", terms: "Valid in-store and online. Excludes sale items." },
  "mercedes-benz-lifestyle": { brand: "Mercedes-Benz", title: "Preferred Pricing", description: "Discover the pinnacle of automotive luxury with Mercedes-Benz preferred pricing. Engineering excellence meets sophisticated design.", images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"], offer: "Preferred Pricing on select models", terms: "Valid on new vehicle purchases. Contact dealer for details." },
  "maui-jim-lifestyle": { brand: "Maui Jim", title: "Up to 35% off", description: "Protect your eyes with the world's best polarized sunglasses. Maui Jim combines cutting-edge technology with Hawaiian-inspired style.", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop"], offer: "Up to 35% off", terms: "Valid on select styles. See store for details." },

  // SHOPPING
  "target-roch": { brand: "Target", title: "15% off everyday essentials", description: "Your one-stop shop for everything you need. From home goods to electronics, Target has it all at great prices.", images: ["https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"], offer: "15% off everyday essentials", terms: "Excludes groceries and electronics. Valid in-store only." },
  "bestbuy-roch": { brand: "Best Buy", title: "15% off electronics and tech", description: "Discover the latest in technology and electronics at Best Buy. Expert advice and competitive pricing on all your tech needs.", images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"], offer: "15% off electronics and tech", terms: "Excludes Apple products and gaming consoles." },
  "barnes-noble-roch": { brand: "Barnes & Noble", title: "20% off books and coffee", description: "Lose yourself in a good book at Barnes & Noble. Browse thousands of titles while enjoying premium coffee.", images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"], offer: "20% off books and coffee", terms: "Valid on in-store purchases. Excludes textbooks." },
  "nordstrom-edina": { brand: "Nordstrom", title: "20% off fashion and accessories", description: "Experience luxury shopping at Nordstrom. Premium fashion, accessories, and exceptional customer service.", images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"], offer: "20% off fashion and accessories", terms: "Valid on regular-price items. See store for exclusions." },
  "williams-sonoma-edina": { brand: "Williams Sonoma", title: "20% off kitchenware", description: "Elevate your cooking with premium kitchenware from Williams Sonoma. Quality tools for the home chef.", images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"], offer: "20% off premium kitchenware", terms: "Valid in-store and online. Excludes furniture." },
  "lululemon-edina": { brand: "Lululemon", title: "15% off athletic wear", description: "Premium athletic wear designed for yoga, running, and training. Technical fabrics that perform and last.", images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop"], offer: "15% off athletic wear and accessories", terms: "Valid on full-price items only." },
  "target-mn": { brand: "Target", title: "15% off everyday essentials", description: "Your one-stop shop for everything you need. From home goods to electronics, Target has it all at great prices.", images: ["https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"], offer: "15% off everyday essentials", terms: "Excludes groceries and electronics. Valid in-store only." },
  "macys-mn": { brand: "Macy's", title: "20% off fashion and home goods", description: "Shop the latest trends in fashion and home decor at Macy's. Quality brands at competitive prices.", images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"], offer: "20% off fashion and home goods", terms: "Valid on regular-price items. Some exclusions apply." },
  "apple-mn": { brand: "Apple Store", title: "10% off Apple products", description: "Discover the latest Apple products. iPhone, iPad, Mac, and more with expert support and service.", images: ["https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&h=600&fit=crop"], offer: "10% off latest Apple products", terms: "Excludes iPhone Pro models and new releases." },
  "whole-foods-wayzata": { brand: "Whole Foods Market", title: "15% off organic groceries", description: "Premium organic groceries and prepared foods. Quality ingredients for healthy living.", images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"], offer: "15% off organic groceries", terms: "Valid on Whole Foods brand items." },
  "rei-wayzata": { brand: "REI Co-op", title: "20% off outdoor gear", description: "Your adventure starts here. Premium outdoor gear and apparel from trusted brands.", images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop"], offer: "20% off outdoor gear and apparel", terms: "Valid for REI members. Some exclusions apply." },
  "pottery-barn-wayzata": { brand: "Pottery Barn", title: "25% off home furnishings", description: "Transform your home with premium furniture and decor from Pottery Barn. Timeless style and quality craftsmanship.", images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"], offer: "25% off home furnishings and decor", terms: "Excludes sale items and outdoor furniture." },

  // GOLF
  "rochester-gc": { brand: "Rochester Golf & Country Club", title: "25% off championship golf", description: "Experience championship golf at Rochester Golf & Country Club. Pristine fairways and challenging greens await.", images: ["https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop"], offer: "25% off green fees", terms: "Valid weekdays only. Tee time required." },
  "eastwood-gc": { brand: "Eastwood Golf Club", title: "20% off public course access", description: "Enjoy quality golf at Eastwood Golf Club. Well-maintained course with friendly atmosphere.", images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"], offer: "20% off green fees", terms: "Valid all week. Cart rental not included." },
  "maple-valley-gc": { brand: "Maple Valley Golf Course", title: "20% off scenic course", description: "Play on our beautiful 18-hole scenic course. Natural beauty meets challenging golf.", images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"], offer: "20% off green fees", terms: "Valid weekdays. Cart included." },
  "interlachen-edina": { brand: "Interlachen Country Club", title: "20% off historic club", description: "Golf at the historic Interlachen Country Club. Rich tradition and championship-caliber course.", images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"], offer: "20% off guest fees", terms: "Member accompaniment required." },
  "edina-cc": { brand: "Edina Country Club", title: "25% off premium golf", description: "Experience premium golf at Edina Country Club. Exceptional course conditions and amenities.", images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"], offer: "25% off guest fees", terms: "Member accompaniment required. Advance booking required." },
  "braemar-gc": { brand: "Braemar Golf Course", title: "20% off links style", description: "Championship links-style golf at Braemar. Challenging layout with stunning views.", images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"], offer: "20% off green fees", terms: "Valid all week. Cart rental additional." },
  "hazeltine-mn": { brand: "Hazeltine National Golf Club", title: "25% off championship course", description: "Play where champions play. Hazeltine National Golf Club has hosted major championships.", images: ["https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop"], offer: "25% off guest fees", terms: "Member accompaniment required. Limited availability." },
  "minikahda-mn": { brand: "Minikahda Club", title: "20% off premium experience", description: "Historic golf club offering premium golf experience. One of Minnesota's finest courses.", images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"], offer: "20% off guest fees", terms: "Member accompaniment required." },
  "minneapolis-gc": { brand: "Minneapolis Golf Club", title: "20% off classic design", description: "Classic golf course design with modern conditioning. A true Minneapolis landmark.", images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"], offer: "20% off guest fees", terms: "Member accompaniment required. Weekday only." },
  "wayzata-cc": { brand: "Wayzata Country Club", title: "20% off lakeside golf", description: "Beautiful lakeside golf at Wayzata Country Club. Scenic views and excellent conditions.", images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"], offer: "20% off guest fees", terms: "Member accompaniment required." },
  "golden-valley-gc": { brand: "Golden Valley Golf Club", title: "20% off championship course", description: "Championship 18-hole course in Golden Valley. Well-maintained with challenging layout.", images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"], offer: "20% off green fees", terms: "Valid all week. Advanced booking recommended." },
  "lake-minnetonka-golf": { brand: "Lake Minnetonka Golf", title: "25% off waterfront experience", description: "Spectacular waterfront golf experience. Stunning lake views from every hole.", images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"], offer: "25% off green fees", terms: "Valid weekdays. Cart included." },
  "wisconsin-country-club": { 
    brand: "The Wisconsin Country Club - Concert Golf Partners", 
    title: "RECIPROCAL", 
    description: "Located just outside of the city, The Wisconsin Country Club is home to one of the most challenging and beautiful 18-hole golf courses in the area. It's Harry Smead/David Gill design features tree-lined fairways, intricately contoured greens, and well-positioned bunkering.\n\nTucked in the northwest corner of Milwaukee, this track is ideal for both the casual and serious golfer. The 6,802 yard, 18-hole course was built in 1954 and was considered one of the best in the area.", 
    images: [
      "/lovable-uploads/wisconsin-country-club.jpeg", 
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"
    ], 
    offer: "Milwaukee, WI, United States", 
    terms: "6200 W. Good Hope Rd.\nMilwaukee, WI\nUnited States\n53233\n\nClub website: links2golf.com" 
  },
  "tennessee-national-golf-club": { 
    brand: "Tennessee National Golf Club – Hampton Golf", 
    title: "RECIPROCAL", 
    description: "Tennessee National Golf Club is ranked by Golf Digest as one of the Top 10 golf courses in Tennessee. With five holes playing to or from the water, beautiful views of Watts Bar Lake are not hard to find. This, in addition to 13 water features and stacked sod bunkers reminiscent of Scottish links, make Tennessee National retreat reminiscent different from other courses in the southeast. With five sets of tees, generous landing areas, and a delightfully walkable layout, the Greg Norman Signature course is uniquely playable, yet challenging to accomplished golfers.", 
    images: [
      "/lovable-uploads/tennessee-national-golf-club.png",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ], 
    offer: "Loudon, TN, United States", 
    terms: "8301 Tennessee National Drive\nLoudon, TN\nUnited States\n37774\n\nClub website: tennesseenationalgolf.com" 
  },
  "northland-country-club": { 
    brand: "Northland Country Club – Hampton Golf", 
    title: "RECIPROCAL", 
    description: "Experience the thrill and nostalgia of playing on a Donald Ross designed championship 18-hole golf course.\n\nNorthland Country Club is recognized as one of the top 5 golf courses in Minnesota and one of the top Classic Golf Courses in the United States. The wooded, gently rolling course, with amazing views of Lake Superior, is tough enough for low handicappers, yet is still eminently enjoyable for higher handicappers.", 
    images: [
      "/lovable-uploads/northland-country-club.png",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ], 
    offer: "Duluth, MN, United States", 
    terms: "3901 E Superior St\nDuluth, MN\nUnited States\n55804\n\nClub website" 
  },

  // DINING
  "chester-s-kitchen-bar": { brand: "Chester's Kitchen & Bar", title: "20% off dinner entrees", description: "Experience Rochester's finest dining at Chester's Kitchen & Bar. Our farm-to-table approach combines local ingredients with innovative culinary techniques.", images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"], offer: "20% off dinner entrees", terms: "Valid Sunday-Thursday." },
  "newt-s": { brand: "Newt's", title: "Complimentary appetizer with entree", description: "A beloved Rochester institution since 1987, Newt's offers classic American cuisine with a contemporary twist.", images: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop"], offer: "Complimentary appetizer with entree", terms: "Valid with entree purchase." },
  "prairie-mill-restaurant": { brand: "Prairie Mill Restaurant", title: "15% off weekend brunch", description: "Located in a beautifully restored historic mill, Prairie Mill Restaurant offers an unforgettable dining experience.", images: ["https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop"], offer: "15% off weekend brunch", terms: "Valid weekends 9am-2pm." },
  "salut-bar-americain": { brand: "Salut Bar Americain", title: "Wine pairing dinner discount", description: "Experience French-inspired cuisine with American flair at Salut Bar Americain.", images: ["https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&h=600&fit=crop"], offer: "Wine pairing dinner discount", terms: "All day Sunday." },
  "the-edina-grill": { brand: "The Edina Grill", title: "Buy one entree, get 50% off second", description: "The Edina Grill has been serving the community with fresh, quality meals.", images: ["https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop"], offer: "Buy one entree, get 50% off second", terms: "Valid Monday-Wednesday." },
  "spoon-and-stable": { brand: "Spoon and Stable", title: "Chef's tasting menu - 25% off", description: "Spoon and Stable offers an elevated dining experience in Minneapolis.", images: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop"], offer: "Chef's tasting menu - 25% off", terms: "Valid Tuesday-Thursday evenings." },
  "6smith": { brand: "6Smith", title: "Lakeside dining experience", description: "6Smith offers unparalleled lakeside dining on Lake Minnetonka.", images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"], offer: "Lakeside dining experience", terms: "Outdoor seating weather dependent." },

  // HOTELS  
  "mayo-clinic-hotel": { brand: "Mayo Clinic Hotel", title: "Extended stay packages", description: "Mayo Clinic Hotel provides comfortable accommodations for medical visitors.", images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop"], offer: "Extended stay packages", terms: "Valid for 7+ nights." },
  "westin-edina-galleria": { brand: "Westin Edina Galleria", title: "Shopping package deals", description: "Connected to Galleria shopping center with luxury accommodations.", images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop"], offer: "Shopping package deals", terms: "Includes gift cards." },
  "four-seasons-minneapolis": { brand: "Four Seasons Minneapolis", title: "City skyline suites", description: "Four Seasons Minneapolis offers luxury suites with city views.", images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop"], offer: "City skyline suites", terms: "Subject to availability." },
  "hotel-minnetonka": { brand: "Hotel Minnetonka", title: "Lakefront luxury suites", description: "Hotel Minnetonka offers luxury on Lake Minnetonka shores.", images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop"], offer: "Lakefront luxury suites", terms: "Lake view subject to availability." },
  "st-kate-the-arts-hotel": { 
    brand: "St. Kate - The Arts Hotel", 
    title: "A Place to Remember", 
    description: "Set in the lively, artsy East Town neighborhood, this refined, art-filled hotel is a mile from the Milwaukee Art Museum and a 5-minute walk from the nearest tram stop.\n\nFeaturing unique artwork, the polished rooms provide free Wi-Fi, flat-screen TVs and minifridges, along with ukuleles, record players and art supplies. Suites add living rooms. Upgraded 2-bedroom suites have dining rooms and additional bathrooms. Room service is available 24/7.\n\nAmenities include a pizzeria, a cafe and 2 bars, plus art galleries. There's a gym and more than 11,000 sq ft of meeting space. Parking and breakfast are available for a surcharge.", 
    images: [
      "/lovable-uploads/st-kate-hotel.jpeg",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
    ], 
    offer: "A Place to Remember", 
    terms: "Valid for new reservations only. Cannot be combined with other offers. Subject to availability." 
  },

  // ENTERTAINMENT
  "rochester-civic-theatre": { brand: "Rochester Civic Theatre", title: "Season ticket discounts", description: "Rochester Civic Theatre has been entertaining audiences for decades.", images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"], offer: "Season ticket discounts", terms: "Valid for 2024-2025 season." },
  "edina-cinema": { brand: "Edina Cinema", title: "Luxury recliner seating", description: "Edina Cinema provides the ultimate movie experience.", images: ["https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop"], offer: "Luxury recliner seating", terms: "Available all showtimes." },
  "guthrie-theater": { brand: "Guthrie Theater", title: "Behind-the-scenes tours", description: "The Guthrie Theater offers exclusive behind-the-scenes tours.", images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"], offer: "Behind-the-scenes tours", terms: "Available Wednesday and Saturday." },
  "lake-minnetonka-cruises": { brand: "Lake Minnetonka Cruises", title: "Private yacht charters", description: "Lake Minnetonka Cruises offers private yacht charters.", images: ["https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop"], offer: "Private yacht charters", terms: "Available May-October." },

  // TRAVEL
  "rochester-regional-airport": { brand: "Rochester Regional Airport", title: "Charter flight packages", description: "Rochester Regional Airport offers convenient charter services.", images: ["https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop"], offer: "Charter flight packages", terms: "Subject to aircraft availability." },
  "msp-private-terminals": { brand: "MSP Private Terminals", title: "VIP airport services", description: "MSP Private Terminals offers exclusive VIP services.", images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"], offer: "VIP airport services", terms: "Available for all flights." },
  "northwest-airlines-lounge": { brand: "Northwest Airlines Lounge", title: "First class upgrade deals", description: "Northwest Airlines Lounge offers exclusive first-class upgrades.", images: ["https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop"], offer: "First class upgrade deals", terms: "Subject to availability." },
  "lake-minnetonka-seaplanes": { brand: "Lake Minnetonka Seaplanes", title: "Scenic flight tours", description: "Lake Minnetonka Seaplanes offers unique scenic flight tours.", images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"], offer: "Scenic flight tours", terms: "Weather dependent May-October." }
};

export default function RedemptionPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const offer = offerId ? redemptionData[offerId as keyof typeof redemptionData] : null;

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % offer.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + offer.images.length) % offer.images.length);
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Image Carousel */}
        <div className="relative mb-8">
          <div className="relative h-96 md:h-[500px] bg-muted rounded-xl overflow-hidden">
            <img
              src={offer.images[currentImageIndex]}
              alt={`${offer.brand} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {offer.images.length > 1 && (
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
            {offer.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {offer.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Brand and Offer Info */}
        <div className="space-y-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {offer.brand}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              {offer.offer}
            </h2>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {offer.description}
            </p>
          </div>

          {/* Terms */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Terms & Conditions</h3>
            <p className="text-sm text-muted-foreground">{offer.terms}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Button 
            size="lg" 
            className="px-8 py-3 text-lg font-semibold min-w-[160px]"
          >
            Redeem
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-3 text-lg font-semibold min-w-[160px]"
          >
            Get Promo Code
          </Button>
        </div>
      </div>
    </div>
  );
}
