-- Create table for reverse visibility (who can see YOUR course)
CREATE TABLE IF NOT EXISTS club_visibility_restrictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id TEXT NOT NULL,
  restricted_club_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(club_id, restricted_club_id)
);

-- Add RLS policies
ALTER TABLE club_visibility_restrictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Club admins can manage their visibility restrictions"
  ON club_visibility_restrictions
  FOR ALL
  USING (
    club_id IN (
      SELECT club_id FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('club_admin', 'admin')
    )
  );

CREATE INDEX IF NOT EXISTS idx_visibility_restrictions_club 
  ON club_visibility_restrictions(club_id);
CREATE INDEX IF NOT EXISTS idx_visibility_restrictions_restricted 
  ON club_visibility_restrictions(restricted_club_id);