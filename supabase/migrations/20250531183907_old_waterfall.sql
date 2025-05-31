/*
  # Insert Sample Dashboard Data

  1. Sample Data Added
    - User profile with realistic stats
    - Dashboard data with progress and activity
    - Goals with varying completion states
    - Recent activity entries
    - Partnership data
    
  2. Data Structure
    - All timestamps use TIMESTAMPTZ
    - Activity data uses JSONB for flexibility
    - Stats include streak, points, and achievements
*/

-- Insert sample profile data
INSERT INTO profiles (id, name, interests, bio, goals_completed, days_active, success_rate, created_at, updated_at)
VALUES (
  auth.uid(),
  'Demo User',
  ARRAY['productivity', 'health', 'learning'],
  'Focused on continuous improvement and personal growth',
  8,
  30,
  '75%',
  NOW(),
  NOW()
);

-- Insert sample dashboard data
INSERT INTO dashboard_data (id, active_goals_count, overall_progress, stats, recent_activity, created_at, updated_at)
VALUES (
  auth.uid(),
  4,
  0.65,
  '{
    "streak": 7,
    "points": 450,
    "level": 4,
    "achievements": [
      "First Goal",
      "Week Warrior",
      "Early Achiever"
    ]
  }',
  '[
    {
      "id": "1",
      "type": "goal_completed",
      "title": "Completed Daily Meditation",
      "time": "2 hours ago"
    },
    {
      "id": "2",
      "type": "goal_created",
      "title": "Started New Fitness Goal",
      "time": "Yesterday"
    },
    {
      "id": "3",
      "type": "achievement",
      "title": "Earned Week Warrior Badge",
      "time": "2 days ago"
    },
    {
      "id": "4",
      "type": "session_completed",
      "title": "Finished Productivity Course",
      "time": "3 days ago"
    }
  ]',
  NOW(),
  NOW()
);

-- Insert sample goals
INSERT INTO goals (user_id, title, category, description, status, due_date, progress, created_at, updated_at)
VALUES
  (
    auth.uid(),
    'Learn Spanish Basics',
    'Learning',
    'Master essential Spanish vocabulary and grammar',
    'in-progress',
    '2025-06-30',
    0.45,
    NOW(),
    NOW()
  ),
  (
    auth.uid(),
    'Daily Meditation Practice',
    'Mindfulness',
    'Establish a consistent meditation routine',
    'in-progress',
    '2025-05-30',
    0.75,
    NOW(),
    NOW()
  ),
  (
    auth.uid(),
    'Complete Web Development Course',
    'Career',
    'Learn modern web development technologies',
    'in-progress',
    '2025-08-15',
    0.30,
    NOW(),
    NOW()
  ),
  (
    auth.uid(),
    'Run 5K Three Times Weekly',
    'Health',
    'Build running endurance and consistency',
    'in-progress',
    '2025-07-01',
    0.60,
    NOW(),
    NOW()
  );