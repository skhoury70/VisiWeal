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

CREATE TABLE subscribers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_drafts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_campaigns (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  draft_id BIGINT REFERENCES newsletter_drafts(id),
  subject TEXT NOT NULL,
  recipient_count INT NOT NULL DEFAULT 0,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
