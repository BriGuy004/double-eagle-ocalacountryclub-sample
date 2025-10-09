-- Add club_admin role to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'club_admin';