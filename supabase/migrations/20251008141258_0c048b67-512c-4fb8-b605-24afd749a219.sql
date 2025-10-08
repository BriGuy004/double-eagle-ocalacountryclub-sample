-- Create brands table for white-label configuration
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  primary_glow_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read brands (public marketplace)
CREATE POLICY "Brands are viewable by everyone"
ON public.brands
FOR SELECT
USING (true);

-- Only authenticated users can manage brands (we'll add admin role later)
CREATE POLICY "Authenticated users can manage brands"
ON public.brands
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_brands_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_brands_timestamp
BEFORE UPDATE ON public.brands
FOR EACH ROW
EXECUTE FUNCTION public.update_brands_updated_at();

-- Insert default Ocala brand
INSERT INTO public.brands (club_id, name, logo_url, hero_image_url, primary_color, primary_glow_color, accent_color, is_active)
VALUES (
  'ocala',
  'The Country Club of Ocala',
  '/lovable-uploads/ocala-logo.png',
  '/lovable-uploads/ocala-golf-course.png',
  '38 70% 15%',
  '38 70% 25%',
  '45 85% 50%',
  true
);