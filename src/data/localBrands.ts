// Local brand data - edit this file directly to manage brands
// Run syncBrandsToSupabase() to upload to database later

export interface LocalBrand {
  club_id: string;
  name: string;
  logo_url: string;
  hero_image_url: string;
  offer_card_url?: string;
  primary_color: string;
  primary_glow_color: string;
  accent_color: string;
  is_active: boolean;
  category: string;
  state: string;
  city: string;
  full_address?: string;
  website?: string;
  redemption_info?: string;
  description?: string;
}

export const localBrands: LocalBrand[] = [
  {
    club_id: "ocala",
    name: "The Country Club of Ocala",
    logo_url: "/lovable-uploads/ocala-logo.png",
    hero_image_url: "/lovable-uploads/ocala-golf-course.png",
    offer_card_url: "/lovable-uploads/ocala-golf-course.png",
    primary_color: "38 70% 15%",
    primary_glow_color: "38 70% 25%",
    accent_color: "45 85% 50%",
    is_active: true,
    category: "Golf",
    state: "FL",
    city: "Ocala",
    full_address: "6823 SE 12th Cir, Ocala, FL 34480",
    website: "https://www.thecountryclubofocala.com",
    redemption_info: "Show member card at pro shop",
    description: "Premier golf club in Ocala"
  },
  // Add more brands here as needed
];
