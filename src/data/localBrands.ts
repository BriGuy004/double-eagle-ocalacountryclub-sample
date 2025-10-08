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
  {
    club_id: "riverhall",
    name: "River Hall Country Club",
    logo_url: "/lovable-uploads/riverhall-logo.png",
    hero_image_url: "/lovable-uploads/riverhall-hero.png",
    offer_card_url: "/lovable-uploads/riverhall-hero.png",
    primary_color: "0 0% 100%",
    primary_glow_color: "0 0% 95%",
    accent_color: "203 100% 37%",
    is_active: false,
    category: "Golf",
    state: "FL",
    city: "Alva",
    full_address: "Alva, FL",
    website: "https://www.riverhallcc.com/",
    redemption_info: "Show member card at pro shop",
    description: "Championship golf course in Alva"
  },
  {
    club_id: "southernhills",
    name: "Southern Hills Plantation Club",
    logo_url: "/lovable-uploads/southernhills-logo.png",
    hero_image_url: "/lovable-uploads/southernhills-hero.png",
    offer_card_url: "/lovable-uploads/southernhills-hero.png",
    primary_color: "25 50% 40%",
    primary_glow_color: "25 50% 50%",
    accent_color: "45 65% 55%",
    is_active: false,
    category: "Golf",
    state: "FL",
    city: "Brooksville",
    full_address: "Brooksville, FL",
    website: "https://www.southernhillsplantationclub.com/",
    redemption_info: "Show member card at pro shop",
    description: "Pete Dye Signature design, Top 100 Residential Courses in US, dramatic elevation changes"
  },
  {
    club_id: "palencia",
    name: "The Palencia Club",
    logo_url: "/lovable-uploads/palencia-logo.png",
    hero_image_url: "/lovable-uploads/palencia-hero.png",
    offer_card_url: "/lovable-uploads/palencia-hero.png",
    primary_color: "210 45% 35%",
    primary_glow_color: "210 45% 45%",
    accent_color: "30 60% 50%",
    is_active: false,
    category: "Golf",
    state: "FL",
    city: "St. Augustine",
    full_address: "St. Augustine, FL",
    website: "https://www.palenciaclub.com/",
    redemption_info: "Show member card at pro shop",
    description: "Arthur Hills design, opened 2002, along Intracoastal Waterway, 7,071 yards"
  },
  {
    club_id: "verandah",
    name: "Verandah Club",
    logo_url: "/lovable-uploads/verandah-logo.png",
    hero_image_url: "/lovable-uploads/verandah-hero.png",
    offer_card_url: "/lovable-uploads/verandah-hero.png",
    primary_color: "25 55% 45%",
    primary_glow_color: "25 55% 55%",
    accent_color: "140 40% 40%",
    is_active: false,
    category: "Golf",
    state: "FL",
    city: "Fort Myers",
    full_address: "Fort Myers, FL",
    website: "https://www.verandahgolfclub.com/",
    redemption_info: "Show member card at pro shop",
    description: "36 holes - Jack Nicklaus/Jack Nicklaus II (Whispering Oak) and Bob Cupp (Old Orange), along Orange River"
  },
  {
    club_id: "northland",
    name: "Northland Country Club",
    logo_url: "/lovable-uploads/northland-logo.png",
    hero_image_url: "/lovable-uploads/northland-hero.png",
    offer_card_url: "/lovable-uploads/northland-hero.png",
    primary_color: "210 60% 30%",
    primary_glow_color: "210 60% 40%",
    accent_color: "145 35% 35%",
    is_active: false,
    category: "Golf",
    state: "MN",
    city: "Duluth",
    full_address: "Duluth, MN",
    website: "https://www.northlandcountryclub.com/",
    redemption_info: "Show member card at pro shop",
    description: "Donald Ross design, Top 5 courses in Minnesota, Top 100 Classic Courses in US, Lake Superior views"
  }
];
