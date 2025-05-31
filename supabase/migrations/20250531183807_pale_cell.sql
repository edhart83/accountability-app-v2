/*
  # Add Sample Dashboard Data

  1. Sample Data Added
    - Dashboard data with realistic statistics
    - Recent activity entries
    - Goals with progress
    - Partnership information

  2. Data Structure
    - Follows existing schema
    - Uses realistic timestamps and values
    - Maintains referential integrity
*/

-- Insert sample profile data
INSERT INTO profiles (id, name, interests, bio, goals_completed, days_active, success_rate)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'John Doe',
  ARRAY['productivity', 'fitness', 'learning'],
  'Passionate about personal development and helping others achieve their goals.',
  12,
  45,
  '87%'
);

-- Insert sample dashboard data
INSERT INTO dashboard_data (id, active_goals_count, overall_progress, stats, recent_activity)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  3,
  0.72,
  '{
    "streak": 7,
    "points": 345,
    "level": 5,
    "achievements": ["7-Day Streak", "Goal Master", "Early Bird"]
  }',
  '[
    {
      "id": "1",
      "type": "goal_completed",
      "title": "Completed Morning Meditation goal",
      "time": "2 hours ago"
    },
    {
      "id": "2",
      "type": "goal_created",
      "title": "Created a new goal Learn Spanish",
      "time": "5 hours ago"
    },
    {
      "id": "3",
      "type": "achievement",
      "title": "Earned 7-Day Streak badge",
      "time": "Yesterday"
    },
    {
      "id": "4",
      "type": "session_completed",
      "title": "Completed Time Management course",
      "time": "2 days ago"
    },
    {
      "id": "5",
      "type": "partner_match",
      "title": "Matched with David as accountability partner",
      "time": "3 days ago"
    }
  ]'
);

-- Insert sample goals
INSERT INTO goals (id, user_id, title, category, description, status, due_date, progress)
VALUES
  (
    'goal1-uuid',
    '123e4567-e89b-12d3-a456-426614174000',
    'Complete React Native Course',
    'Learning',
    'Master React Native development through comprehensive course',
    'in-progress',
    '2025-05-15',
    0.65
  ),
  (
    'goal2-uuid',
    '123e4567-e89b-12d3-a456-426614174000',
    'Run 5km Three Times a Week',
    'Health',
    'Build running habit for better fitness',
    'in-progress',
    '2025-05-30',
    0.33
  ),
  (
    'goal3-uuid',
    '123e4567-e89b-12d3-a456-426614174000',
    'Read 10 Books This Year',
    'Personal',
    'Expand knowledge through reading',
    'in-progress',
    '2025-12-31',
    0.20
  );

-- Insert sample partnership
INSERT INTO partnerships (id, user_id, partner_id, status)
VALUES (
  'partnership1-uuid',
  '123e4567-e89b-12d3-a456-426614174000',
  '123e4567-e89b-12d3-a456-426614174001',
  'active'
);