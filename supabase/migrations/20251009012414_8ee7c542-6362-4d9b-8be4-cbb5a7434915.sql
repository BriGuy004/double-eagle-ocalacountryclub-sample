-- Add Shopping and Travel categories to the check constraint
ALTER TABLE public.offers DROP CONSTRAINT IF EXISTS offers_category_check;

ALTER TABLE public.offers ADD CONSTRAINT offers_category_check 
CHECK (category = ANY (ARRAY['Golf'::text, 'Hotels'::text, 'Dining'::text, 'Entertainment'::text, 'Lifestyle'::text, 'Shopping'::text, 'Travel'::text]));

-- Fix Northgate color format
UPDATE public.offers 
SET 
  primary_color = '145 42% 30%',
  primary_glow_color = '145 42% 40%',
  accent_color = '200 50% 45%'
WHERE club_id = 'northgate';