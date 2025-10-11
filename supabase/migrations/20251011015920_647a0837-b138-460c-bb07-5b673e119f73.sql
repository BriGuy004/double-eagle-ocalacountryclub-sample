-- Add missing columns to offers table
ALTER TABLE offers 
  ADD COLUMN IF NOT EXISTS guest_play_price TEXT,
  ADD COLUMN IF NOT EXISTS available_days TEXT,
  ADD COLUMN IF NOT EXISTS available_times TEXT,
  ADD COLUMN IF NOT EXISTS availability_notes TEXT,
  ADD COLUMN IF NOT EXISTS last_availability_update TIMESTAMP WITH TIME ZONE;