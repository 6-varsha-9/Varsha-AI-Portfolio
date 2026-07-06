/*
# Portfolio Analytics Tables

Creates tables to track resume downloads and visitor interactions.

1. New Tables
   - `resume_downloads` - Tracks everyone who downloads the resume, with optional visitor info
     - `id` (uuid, primary key)
     - `name` (text, nullable) - visitor's name if provided
     - `company` (text, nullable) - visitor's company
     - `designation` (text, nullable) - visitor's role/title
     - `email` (text, nullable) - visitor's email
     - `linkedin` (text, nullable) - visitor's LinkedIn URL
     - `message` (text, nullable) - optional message
     - `country` (text, nullable) - detected country
     - `device` (text, nullable) - device type
     - `browser` (text, nullable) - browser name
     - `skipped` (boolean) - whether visitor skipped the form
     - `created_at` (timestamptz)

2. Security
   - RLS enabled on all tables
   - Anon + authenticated can INSERT (to track downloads)
   - Only authenticated can SELECT (admin dashboard reads)
   - No update/delete exposed to public
*/

CREATE TABLE IF NOT EXISTS resume_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  company text,
  designation text,
  email text,
  linkedin text,
  message text,
  country text,
  device text,
  browser text,
  skipped boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resume_downloads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_downloads" ON resume_downloads;
CREATE POLICY "anon_insert_downloads" ON resume_downloads FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_downloads" ON resume_downloads;
CREATE POLICY "auth_select_downloads" ON resume_downloads FOR SELECT
TO authenticated USING (true);
