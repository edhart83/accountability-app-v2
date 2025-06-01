/*
  # Create Application Tables

  1. Tables Created:
    - profiles
      - User profile information
      - Stores achievements and stats
      - Added image_url, email, and achievements columns
    
    - dashboard_data
      - User dashboard statistics
      - Overall progress tracking
      - Recent activity storage
    
    - goals
      - User goals with progress tracking
      - Category and status management
    
    - courses
      - Course catalog and content
      - Progress tracking
    
    - partnerships
      - Partner relationships
      - Request management

  2. Security
    - Row Level Security (RLS) enabled on all tables
    - Policies for authenticated user access
    - Added policies for viewing partner profiles
*/

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  image_url TEXT,
  interests TEXT[],
  bio TEXT,
  achievements JSONB DEFAULT '[]',
  goals_completed INT DEFAULT 0,
  days_active INT DEFAULT 0,
  success_rate TEXT DEFAULT '0%',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create dashboard_data table
CREATE TABLE dashboard_data (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  active_goals_count INT DEFAULT 0,
  overall_progress NUMERIC DEFAULT 0.0,
  recent_activity JSONB DEFAULT '[]',
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'in-progress',
  due_date DATE NOT NULL,
  progress NUMERIC DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  lessons_count INT NOT NULL,
  duration TEXT NOT NULL,
  rating NUMERIC DEFAULT 0.0,
  progress NUMERIC DEFAULT 0.0,
  instructor_name TEXT NOT NULL,
  instructor_title TEXT,
  description TEXT,
  syllabus JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partnerships table
CREATE TABLE partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, partner_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view partner profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT partner_id FROM partnerships 
      WHERE (user_id = auth.uid() OR partner_id = auth.uid())
      AND status = 'accepted'
    )
    OR
    id IN (
      SELECT user_id FROM partnerships 
      WHERE (user_id = auth.uid() OR partner_id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Dashboard Data
CREATE POLICY "Users can view their own dashboard"
  ON dashboard_data FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own dashboard"
  ON dashboard_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Goals
CREATE POLICY "Users can view their own goals"
  ON goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals"
  ON goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Courses
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Partnerships
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