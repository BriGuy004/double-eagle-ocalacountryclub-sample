// Centralized offers data for bookmark functionality
import { golfProductsByCity } from "@/pages/Golf";
import { diningProductsByCity } from "@/pages/Dining";
import { entertainmentProductsByCity } from "@/pages/Entertainment";
import { hotelProductsByCity } from "@/pages/Hotels";

type ProductCategory = "Golf" | "Dining" | "Hotels" | "Lifestyle" | "Entertainment";

export interface Offer {
  offerId: string;
  brand: string;
  title: string;
  images: string[];
  tags: string[];
  category: ProductCategory;
  city: string;
}

// Aggregate all offers from different categories
export const getAllOffers = (): Offer[] => {
  const offers: Offer[] = [];

  // Add golf offers
  Object.entries(golfProductsByCity).forEach(([city, products]) => {
    products.forEach((product: any) => {
      offers.push({
        offerId: product.offerId || `golf-${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        brand: product.brand,
        title: product.title,
        images: product.images,
        tags: product.tags,
        category: "Golf",
        city: city,
      });
    });
  });

  // Add dining offers
  Object.entries(diningProductsByCity).forEach(([city, products]) => {
    products.forEach((product: any) => {
      offers.push({
        offerId: `dining-${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        brand: product.brand,
        title: product.title,
        images: product.images,
        tags: product.tags,
        category: "Dining",
        city: city,
      });
    });
  });

  // Add entertainment offers
  Object.entries(entertainmentProductsByCity).forEach(([city, products]) => {
    products.forEach((product: any) => {
      offers.push({
        offerId: `entertainment-${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        brand: product.brand,
        title: product.title,
        images: product.images,
        tags: product.tags,
        category: "Entertainment",
        city: city,
      });
    });
  });

  // Add hotel offers
  Object.entries(hotelProductsByCity).forEach(([city, products]) => {
    products.forEach((product: any) => {
      offers.push({
        offerId: product.offerId || product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        brand: product.brand,
        title: product.title,
        images: product.images,
        tags: product.tags,
        category: "Hotels",
        city: city,
      });
    });
  });

  return offers;
};

export const getOfferById = (offerId: string): Offer | undefined => {
  return getAllOffers().find(offer => offer.offerId === offerId);
};
