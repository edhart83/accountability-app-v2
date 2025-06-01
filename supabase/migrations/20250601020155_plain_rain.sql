/*
  # Fix Partnerships Schema and Data

  1. Changes
    - Drop and recreate partnerships table with correct schema
    - Add proper indexes and constraints
    - Insert correct sample data
    - Update RLS policies

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing partnerships table
DROP TABLE IF EXISTS partnerships CASCADE;

-- Create new partnerships table
CREATE TABLE partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  next_meeting TIMESTAMPTZ,
  shared_goals JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, partner_id)
);

-- Enable RLS
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX partnerships_user_id_idx ON partnerships(user_id);
CREATE INDEX partnerships_partner_id_idx ON partnerships(partner_id);
CREATE INDEX partnerships_status_idx ON partnerships(status);

-- Create policies
CREATE POLICY "Users can view their own partnerships"
  ON partnerships FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR auth.uid() = partner_id
  );

CREATE POLICY "Users can create partnership requests"
  ON partnerships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update partnerships they're part of"
  ON partnerships FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR auth.uid() = partner_id
  );

-- Insert sample data with valid user IDs
DO $$
DECLARE
  demo_user_id UUID := auth.uid();
BEGIN
  -- Only insert if we have a valid user
  IF demo_user_id IS NOT NULL THEN
    INSERT INTO partnerships (
      user_id,
      partner_id,
      status,
      next_meeting,
      shared_goals
    )
    VALUES (
      demo_user_id,
      (SELECT id FROM auth.users WHERE email = 'ed1@test.com' LIMIT 1),
      'active',
      NOW() + INTERVAL '1 day' + INTERVAL '3 hours',
      '[
        {
          "id": "sg1",
          "title": "Complete React Native Course",
          "progress": 0.65,
          "due_date": "2025-05-15"
        },
        {
          "id": "sg2", 
          "title": "Run 5km Three Times a Week",
          "progress": 0.33,
          "due_date": "2025-05-30"
        }
      ]'
    );
  END IF;
END $$;