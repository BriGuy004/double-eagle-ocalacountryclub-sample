-- Fix search_path for the update function with CASCADE
DROP TRIGGER IF EXISTS update_brands_timestamp ON public.brands;
DROP FUNCTION IF EXISTS public.update_brands_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_brands_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_brands_timestamp
BEFORE UPDATE ON public.brands
FOR EACH ROW
EXECUTE FUNCTION public.update_brands_updated_at();