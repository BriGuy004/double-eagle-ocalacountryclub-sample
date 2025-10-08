-- Allow anyone to insert and update offers for brand management
-- This enables the admin brand sync functionality
CREATE POLICY "Allow brand management operations"
ON public.offers
FOR ALL
TO anon
USING (true)
WITH CHECK (true);