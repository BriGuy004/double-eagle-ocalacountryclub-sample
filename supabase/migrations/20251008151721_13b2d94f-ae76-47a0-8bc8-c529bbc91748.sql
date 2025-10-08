-- Rename brands table to offers and add new fields
ALTER TABLE public.brands RENAME TO offers;

-- Add new columns for offer management
ALTER TABLE public.offers
ADD COLUMN category text NOT NULL DEFAULT 'Golf',
ADD COLUMN city text NOT NULL DEFAULT '',
ADD COLUMN state text NOT NULL DEFAULT '',
ADD COLUMN full_address text,
ADD COLUMN website text,
ADD COLUMN redemption_info text,
ADD COLUMN description text;

-- Add check constraint for category
ALTER TABLE public.offers
ADD CONSTRAINT offers_category_check 
CHECK (category IN ('Golf', 'Hotels', 'Dining', 'Entertainment', 'Lifestyle'));

-- Update RLS policies to use new table name
DROP POLICY IF EXISTS "Authenticated users can manage brands" ON public.offers;
DROP POLICY IF EXISTS "Brands are viewable by everyone" ON public.offers;

CREATE POLICY "Authenticated users can manage offers" 
ON public.offers 
FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Offers are viewable by everyone" 
ON public.offers 
FOR SELECT 
USING (true);