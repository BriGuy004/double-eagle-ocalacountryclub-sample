// Centralized offers data for all clubs
import { arcisClubs } from "@/data/allClubs";

type ProductCategory = "Golf" | "Dining" | "Hotels" | "Lifestyle" | "Entertainment";

export interface Offer {
  offerId: string;
  clubId: string;
  brand: string;
  title: string;
  description: string;
  discount: string;
  images: string[];
  tags: string[];
  category: ProductCategory;
  city: string;
  state: string;
  majorCity: string;
}

// Golf offer variations
const golfDiscounts = [
  "Complimentary Round",
  "20% Off Guest Rates",
  "Reciprocal Play Access",
  "50% Off Twilight Rounds",
  "Free Cart with Round",
  "Member Guest Rates",
];

// Dining offer variations
const diningDiscounts = [
  "20% Off Dining",
  "Complimentary Appetizer",
  "15% Off Restaurant",
  "Free Dessert with Entrée",
  "Happy Hour Pricing",
  "10% Off All Food",
];

// Entertainment offer variations
const entertainmentDiscounts = [
  "Access to Member Events",
  "Complimentary Practice Facility",
  "20% Off Pro Shop",
  "Free Tennis Court Time",
  "Fitness Center Access",
  "Pool & Amenities Access",
];

// Default club image
const defaultClubImage = "/lovable-uploads/golf-course-main.png";

// Club-specific images mapping
const clubImages: Record<string, string> = {
  "ancala-country-club": "/lovable-uploads/ancala-country-club.png",
  "tatum-ranch-golf-club": "/lovable-uploads/tatum-ranch-golf-club.png",
  "clubs-at-arrowhead-arizona": "/lovable-uploads/clubs-at-arrowhead.png",
};

// Generate all offers from clubs
export const getAllOffers = (): Offer[] => {
  const offers: Offer[] = [];

  arcisClubs.forEach((club) => {
    // Get club-specific image or use default
    const clubImage = clubImages[club.id] || defaultClubImage;
    
    // Golf offer
    offers.push({
      offerId: `${club.id}-golf`,
      clubId: club.id,
      brand: club.name,
      title: `${club.name} - Golf Access`,
      description: `Exclusive golf benefits at ${club.name} in ${club.city}, ${club.state}`,
      discount: golfDiscounts[Math.floor(Math.random() * golfDiscounts.length)],
      images: [clubImage],
      tags: ["Golf", "Private Club", club.category],
      category: "Golf",
      city: club.city,
      state: club.state,
      majorCity: club.majorCity,
    });

    // Dining offer
    offers.push({
      offerId: `${club.id}-dining`,
      clubId: club.id,
      brand: club.name,
      title: `${club.name} - Dining`,
      description: `Fine dining privileges at ${club.name} in ${club.city}, ${club.state}`,
      discount: diningDiscounts[Math.floor(Math.random() * diningDiscounts.length)],
      images: [clubImage],
      tags: ["Dining", "Restaurant", club.category],
      category: "Dining",
      city: club.city,
      state: club.state,
      majorCity: club.majorCity,
    });

    // Entertainment offer
    offers.push({
      offerId: `${club.id}-entertainment`,
      clubId: club.id,
      brand: club.name,
      title: `${club.name} - Club Amenities`,
      description: `Full amenity access at ${club.name} in ${club.city}, ${club.state}`,
      discount: entertainmentDiscounts[Math.floor(Math.random() * entertainmentDiscounts.length)],
      images: [clubImage],
      tags: ["Entertainment", "Amenities", club.category],
      category: "Entertainment",
      city: club.city,
      state: club.state,
      majorCity: club.majorCity,
    });
  });

  return offers;
};

export const getOfferById = (offerId: string): Offer | undefined => {
  return getAllOffers().find(offer => offer.offerId === offerId);
};
