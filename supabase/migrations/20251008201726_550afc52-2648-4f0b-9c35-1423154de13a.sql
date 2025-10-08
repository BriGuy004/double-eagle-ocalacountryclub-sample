-- Create storage bucket for brand images
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-images', 'brand-images', true);

-- Allow authenticated users to upload brand images
CREATE POLICY "Authenticated users can upload brand images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'brand-images');

-- Allow authenticated users to update their brand images
CREATE POLICY "Authenticated users can update brand images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'brand-images');

-- Allow everyone to view brand images (public bucket)
CREATE POLICY "Anyone can view brand images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'brand-images');

-- Allow authenticated users to delete brand images
CREATE POLICY "Authenticated users can delete brand images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'brand-images');