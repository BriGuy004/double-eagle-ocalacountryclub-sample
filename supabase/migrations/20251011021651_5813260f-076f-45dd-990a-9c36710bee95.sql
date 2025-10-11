-- Check and fix club_offer_visibility policies
DROP POLICY IF EXISTS "Club admins can manage their visibility settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can view their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can insert their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can update their settings" ON club_offer_visibility;
DROP POLICY IF EXISTS "Club admins can delete their settings" ON club_offer_visibility;

-- Create separate policies for each operation
CREATE POLICY "Club admins can view their settings"
  ON club_offer_visibility
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_offer_visibility.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

CREATE POLICY "Club admins can insert their settings"
  ON club_offer_visibility
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_offer_visibility.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

CREATE POLICY "Club admins can update their settings"
  ON club_offer_visibility
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_offer_visibility.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

CREATE POLICY "Club admins can delete their settings"
  ON club_offer_visibility
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_offer_visibility.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

-- Grant permissions
GRANT ALL ON club_offer_visibility TO authenticated;