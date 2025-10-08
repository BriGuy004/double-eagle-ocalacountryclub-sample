-- Create function to atomically switch active brand
CREATE OR REPLACE FUNCTION public.set_active_brand(p_club_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Atomically deactivate all brands and activate the selected one
  UPDATE public.offers
  SET is_active = (club_id = p_club_id)
  WHERE TRUE;
END;
$$;