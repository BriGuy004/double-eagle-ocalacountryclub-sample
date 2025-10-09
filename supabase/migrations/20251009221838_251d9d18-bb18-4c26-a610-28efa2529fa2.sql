-- Add additional image columns to offers table for carousel
ALTER TABLE public.offers 
ADD COLUMN IF NOT EXISTS image_2_url text,
ADD COLUMN IF NOT EXISTS image_3_url text,
ADD COLUMN IF NOT EXISTS image_4_url text;