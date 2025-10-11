-- Fix RLS policies to properly handle admin vs club_admin roles
-- Admins should access ALL clubs, club_admins only their own

-- ==========================================
-- FIX club_offer_visibility policies
-- ==========================================

DROP POLICY IF EXISTS "Enable read access for club admins" ON club_offer_visibility;
DROP POLICY IF EXISTS "Enable insert for club admins" ON club_offer_visibility;
DROP POLICY IF EXISTS "Enable update for club admins" ON club_offer_visibility;
DROP POLICY IF EXISTS "Enable delete for club admins" ON club_offer_visibility;

CREATE POLICY "Admins and club admins can read settings"
  ON club_offer_visibility
  FOR SELECT
  TO authenticated
  USING (
    -- Admins can see everything
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    -- Club admins can only see their club's settings
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

CREATE POLICY "Admins and club admins can insert settings"
  ON club_offer_visibility
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Admins can insert for any club
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    -- Club admins can only insert for their club
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

CREATE POLICY "Admins and club admins can update settings"
  ON club_offer_visibility
  FOR UPDATE
  TO authenticated
  USING (
    -- Admins can update anything
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    -- Club admins can only update their club
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  )
  WITH CHECK (
    -- Same check for the new values
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

CREATE POLICY "Admins and club admins can delete settings"
  ON club_offer_visibility
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

-- ==========================================
-- FIX club_visibility_restrictions policies
-- ==========================================

DROP POLICY IF EXISTS "Enable read access for club admins on restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Enable insert for club admins on restrictions" ON club_visibility_restrictions;
DROP POLICY IF EXISTS "Enable delete for club admins on restrictions" ON club_visibility_restrictions;

CREATE POLICY "Admins and club admins can read restrictions"
  ON club_visibility_restrictions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

CREATE POLICY "Admins and club admins can insert restrictions"
  ON club_visibility_restrictions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );

CREATE POLICY "Admins and club admins can delete restrictions"
  ON club_visibility_restrictions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    OR
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'club_admin'
    )
  );