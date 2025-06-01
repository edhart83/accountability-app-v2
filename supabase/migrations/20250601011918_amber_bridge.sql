/*
  # Fix Partnerships Schema and Policies

  1. Changes
    - Add missing columns to partnerships table
    - Update RLS policies for proper access control
    - Add indexes for better query performance

  2. Security
    - Enable RLS on partnerships table
    - Add policies for authenticated users
*/

-- Drop existing partnerships table
DROP TABLE IF EXISTS partnerships CASCADE;

-- Create new partnerships table with all required fields
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

CREATE POLICY "Users can delete partnerships they're part of"
  ON partnerships FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR auth.uid() = partner_id
  );