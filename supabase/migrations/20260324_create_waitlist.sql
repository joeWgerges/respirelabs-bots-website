-- Waitlist signups table for RespireLabs app launch
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text,
  interest text[] DEFAULT '{}',
  hear_about text,
  source text DEFAULT 'launch-page',
  lang text DEFAULT 'en' CHECK (lang IN ('en', 'de', 'pl')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the signup form)
CREATE POLICY "anon_insert" ON waitlist_signups
  FOR INSERT TO anon WITH CHECK (true);

-- Block anonymous reads (privacy protection)
CREATE POLICY "anon_no_select" ON waitlist_signups
  FOR SELECT TO anon USING (false);

-- Counter function (security definer bypasses RLS for the count)
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS integer AS $$
  SELECT count(*)::integer FROM waitlist_signups;
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE waitlist_signups;
