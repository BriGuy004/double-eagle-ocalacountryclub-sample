-- Drop all existing brand-images policies
DROP POLICY IF EXISTS "Authenticated users can upload brand images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update brand images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete brand images" ON storage.objects;

-- The "Anyone can view brand images" policy already exists, so we skip it

-- Allow anyone to upload images to brand-images bucket
CREATE POLICY "Anyone can upload brand images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'brand-images');

-- Allow anyone to update their uploaded images
CREATE POLICY "Anyone can update brand images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'brand-images');

-- Allow anyone to delete brand images
CREATE POLICY "Anyone can delete brand images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'brand-images');