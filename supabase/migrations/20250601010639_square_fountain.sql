/*
  # Fix Partnerships Table Schema

  1. Changes
    - Drop and recreate partnerships table with correct schema
    - Add proper foreign key relationships
    - Add RLS policies
    - Insert sample data

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

-- Create policies
CREATE POLICY "Users can view their own partnerships"
  ON partnerships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = partner_id);

CREATE POLICY "Users can create partnership requests"
  ON partnerships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own partnerships"
  ON partnerships FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = partner_id);

-- Insert sample data for testing
INSERT INTO partnerships (
  user_id,
  partner_id,
  status,
  next_meeting,
  shared_goals
)
VALUES (
  '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
  '31f5e518-1f74-410c-ada1-7d6f2fb54001',
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