-- Run this SQL in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql/new

CREATE TABLE bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  services TEXT[] DEFAULT '{}',
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  hear_about TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  meet_link TEXT DEFAULT '',
  event_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, time_slot)
);
