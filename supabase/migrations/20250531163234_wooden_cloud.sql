/*
  # Fix profiles table schema

  1. Changes
    - Drop and recreate profiles table with correct schema
    - Add proper RLS policies
    - Update foreign key references

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
*/

-- Drop dependent tables first to avoid foreign key conflicts
DROP TABLE IF EXISTS dashboard_data CASCADE;
DROP TABLE IF EXISTS partnerships CASCADE;
DROP TABLE IF EXISTS partner_requests CASCADE;

-- Drop and recreate profiles table
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  image_url TEXT,
  bio TEXT,
  interests TEXT[],
  goals_completed INT DEFAULT 0,
  days_active INT DEFAULT 0,
  success_rate TEXT DEFAULT '0%',
  achievements JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate dependent tables
CREATE TABLE dashboard_data (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak INT DEFAULT 0,
  active_goals_count INT DEFAULT 0,
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  overall_progress NUMERIC DEFAULT 0.0,
  recent_activity JSONB DEFAULT '[]',
  next_partner_meeting TIMESTAMPTZ,
  partner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  next_meeting TIMESTAMPTZ,
  shared_goals JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user1_id, user2_id)
);

CREATE TABLE partner_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (sender_id, receiver_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Dashboard Data policies
CREATE POLICY "Users can view their own dashboard data"
  ON dashboard_data FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own dashboard data"
  ON dashboard_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own dashboard data"
  ON dashboard_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Partnership policies
CREATE POLICY "Users can view their own partnerships"
  ON partnerships FOR SELECT
  TO authenticated
  USING (auth.uid() IN (user1_id, user2_id));

CREATE POLICY "Users can update their own partnerships"
  ON partnerships FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (user1_id, user2_id));

-- Partner request policies
CREATE POLICY "Users can view their own partner requests"
  ON partner_requests FOR SELECT
  TO authenticated
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can create partner requests"
  ON partner_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own partner requests"
  ON partner_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (sender_id, receiver_id));