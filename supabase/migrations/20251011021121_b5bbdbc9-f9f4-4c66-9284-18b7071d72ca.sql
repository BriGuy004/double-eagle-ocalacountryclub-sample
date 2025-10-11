-- Drop existing table if it has issues
DROP TABLE IF EXISTS club_visibility_restrictions CASCADE;

-- Create fresh table
CREATE TABLE club_visibility_restrictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id TEXT NOT NULL,
  restricted_club_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(club_id, restricted_club_id)
);

-- Enable RLS
ALTER TABLE club_visibility_restrictions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Club admins can manage their visibility restrictions" ON club_visibility_restrictions;

-- Create permissive policy for club admins
CREATE POLICY "Club admins can view their restrictions"
  ON club_visibility_restrictions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_visibility_restrictions.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

CREATE POLICY "Club admins can insert their restrictions"
  ON club_visibility_restrictions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_visibility_restrictions.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

CREATE POLICY "Club admins can delete their restrictions"
  ON club_visibility_restrictions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.club_id = club_visibility_restrictions.club_id
      AND user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('club_admin', 'admin')
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_visibility_restrictions_club 
  ON club_visibility_restrictions(club_id);
CREATE INDEX IF NOT EXISTS idx_visibility_restrictions_restricted 
  ON club_visibility_restrictions(restricted_club_id);

-- Grant permissions
GRANT ALL ON club_visibility_restrictions TO authenticated;