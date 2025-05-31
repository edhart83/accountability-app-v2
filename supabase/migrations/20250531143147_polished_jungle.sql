/*
  # Initial Schema Setup

  1. Tables Created
    - profiles
      - User profile information
      - Linked to auth.users
      - Stores user stats and achievements
    
    - dashboard_data
      - User dashboard statistics
      - Overall progress tracking
      - Recent activity storage
    
    - goals
      - User goals with progress tracking
      - Milestone management
      - Category organization
    
    - courses
      - Course catalog
      - Lesson structure
      - Progress tracking
    
    - user_courses
      - User course enrollment
      - Progress tracking per user
    
    - partnerships
      - Accountability partner relationships
      - Meeting scheduling
    
    - partner_requests
      - Partnership request management
      - Request status tracking

  2. Security
    - Row Level Security (RLS) enabled on all tables
    - Policies set for proper data access control
    - User-specific data protection
*/

-- Create profiles table
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

-- Create dashboard_data table
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

-- Create goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  due_date DATE NOT NULL,
  progress NUMERIC DEFAULT 0.0,
  status TEXT DEFAULT 'in-progress',
  milestones JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  lessons_count INT NOT NULL,
  duration TEXT NOT NULL,
  rating NUMERIC DEFAULT 0.0,
  description TEXT,
  instructor_name TEXT NOT NULL,
  instructor_title TEXT,
  instructor_image_url TEXT,
  syllabus JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_courses table
CREATE TABLE user_courses (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress NUMERIC DEFAULT 0.0,
  status TEXT DEFAULT 'not-started',
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, course_id)
);

-- Create partnerships table
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

-- Create partner_requests table
CREATE TABLE partner_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (sender_id, receiver_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Dashboard Data
CREATE POLICY "Users can view their own dashboard data"
  ON dashboard_data FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own dashboard data"
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

CREATE POLICY "Users can delete their own goals"
  ON goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Courses
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- User Courses
CREATE POLICY "Users can view their own course progress"
  ON user_courses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own course progress"
  ON user_courses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Partnerships
CREATE POLICY "Users can view their own partnerships"
  ON partnerships FOR SELECT
  TO authenticated
  USING (auth.uid() IN (user1_id, user2_id));

CREATE POLICY "Users can update their own partnerships"
  ON partnerships FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (user1_id, user2_id));

-- Partner Requests
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