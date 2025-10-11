-- Create table for golf course availability slots
CREATE TABLE IF NOT EXISTS golf_course_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  offer_id UUID NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  price_override NUMERIC(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(offer_id, available_date, start_time)
);

-- Add RLS policies
ALTER TABLE golf_course_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Club admins can manage their availability"
  ON golf_course_availability
  FOR ALL
  USING (
    offer_id IN (
      SELECT id FROM offers 
      WHERE club_id IN (
        SELECT club_id FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role IN ('club_admin', 'admin')
      )
    )
  );

CREATE POLICY "Everyone can view availability"
  ON golf_course_availability
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_availability_offer ON golf_course_availability(offer_id);
CREATE INDEX IF NOT EXISTS idx_availability_date ON golf_course_availability(available_date);