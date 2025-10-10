-- Add discount_text column to offers table for non-golf categories
ALTER TABLE public.offers
ADD COLUMN discount_text TEXT;