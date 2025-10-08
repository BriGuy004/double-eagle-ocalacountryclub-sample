-- Rename offers back to brands temporarily
ALTER TABLE public.offers RENAME TO brands;

-- Now create offers table fresh with all correct fields
CREATE TABLE public.offers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id text NOT NULL,
  name text NOT NULL,
  logo_url text NOT NULL,
  hero_image_url text NOT NULL,
  offer_card_url text,
  primary_color text NOT NULL,
  primary_glow_color text NOT NULL,
  accent_color text NOT NULL,
  category text NOT NULL DEFAULT 'Golf',
  city text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  full_address text,
  website text,
  redemption_info text,
  description text,
  is_active boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT offers_category_check CHECK (category IN ('Golf', 'Hotels', 'Dining', 'Entertainment', 'Lifestyle'))
);

-- Copy all data from brands to offers
INSERT INTO public.offers (
  id, club_id, name, logo_url, hero_image_url, offer_card_url,
  primary_color, primary_glow_color, accent_color,
  category, city, state, full_address, website, redemption_info, description,
  is_active, created_at, updated_at
)
SELECT 
  id, club_id, name, logo_url, hero_image_url, offer_card_url,
  primary_color, primary_glow_color, accent_color,
  category, city, state, full_address, website, redemption_info, description,
  is_active, created_at, updated_at
FROM public.brands;

-- Drop the old brands table
DROP TABLE public.brands CASCADE;

-- Enable RLS on offers
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can manage offers" 
ON public.offers 
FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Offers are viewable by everyone" 
ON public.offers 
FOR SELECT 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_offers_updated_at
BEFORE UPDATE ON public.offers
FOR EACH ROW
EXECUTE FUNCTION public.update_brands_updated_at();