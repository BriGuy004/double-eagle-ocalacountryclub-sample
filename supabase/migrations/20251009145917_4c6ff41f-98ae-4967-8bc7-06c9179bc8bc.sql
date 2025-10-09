-- Add unique constraint on offers.club_id first
ALTER TABLE public.offers ADD CONSTRAINT offers_club_id_unique UNIQUE (club_id);

-- Add club_id to user_roles to associate club admins with their club
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS club_id TEXT REFERENCES public.offers(club_id) ON DELETE CASCADE;

-- Create club_offer_visibility table to track which offers are visible to which clubs
CREATE TABLE IF NOT EXISTS public.club_offer_visibility (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id TEXT NOT NULL REFERENCES public.offers(club_id) ON DELETE CASCADE,
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  max_reciprocal_access INTEGER, -- For golf courses, how many members from other clubs can access
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(club_id, offer_id)
);

-- Enable RLS on club_offer_visibility
ALTER TABLE public.club_offer_visibility ENABLE ROW LEVEL SECURITY;

-- Club admins can view visibility settings for their own club
CREATE POLICY "Club admins can view their club's visibility settings"
ON public.club_offer_visibility
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'club_admin'
      AND club_id = club_offer_visibility.club_id
  )
);

-- Club admins can update visibility settings for their own club
CREATE POLICY "Club admins can update their club's visibility settings"
ON public.club_offer_visibility
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'club_admin'
      AND club_id = club_offer_visibility.club_id
  )
);

-- Club admins can insert visibility settings for their own club
CREATE POLICY "Club admins can insert their club's visibility settings"
ON public.club_offer_visibility
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'club_admin'
      AND club_id = club_offer_visibility.club_id
  )
);

-- Admins can manage all visibility settings
CREATE POLICY "Admins can manage all visibility settings"
ON public.club_offer_visibility
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to check if user is club admin for a specific club
CREATE OR REPLACE FUNCTION public.is_club_admin(_user_id uuid, _club_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'club_admin'
      AND club_id = _club_id
  )
$$;

-- Add updated_at trigger for club_offer_visibility
CREATE TRIGGER update_club_offer_visibility_updated_at
BEFORE UPDATE ON public.club_offer_visibility
FOR EACH ROW
EXECUTE FUNCTION public.update_brands_updated_at();