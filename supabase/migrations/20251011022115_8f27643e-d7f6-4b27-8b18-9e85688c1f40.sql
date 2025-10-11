-- ==========================================
-- FIX club_offer_visibility policies
-- ==========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Club admins can manage their visibility settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can view their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can insert their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can update their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can delete their settings" ON club_offer_visibility;

-- Create new permissive policies that actually work
CREATE POLICY "Enable read access for club admins"
  ON club_offer_visibility
  FOR SELECT
  TO authenticated
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Enable insert for club admins"
  ON club_offer_visibility
  FOR INSERT
  TO authenticated
  WITH CHECK (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Enable update for club admins"
  ON club_offer_visibility
  FOR UPDATE
  TO authenticated
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Enable delete for club admins"
  ON club_offer_visibility
  FOR DELETE
  TO authenticated
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- ==========================================
-- FIX club_visibility_restrictions policies
-- ==========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Club admins can manage their visibility restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Club admins can view their restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Club admins can insert their restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Club admins can delete their restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Club admins can update their restrictions" ON club_visibility_restrictions;

-- Create new permissive policies
CREATE POLICY "Enable read access for club admins on restrictions"
  ON club_visibility_restrictions
  FOR SELECT
  TO authenticated
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Enable insert for club admins on restrictions"
  ON club_visibility_restrictions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Enable delete for club admins on restrictions"
  ON club_visibility_restrictions
  FOR DELETE
  TO authenticated
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );