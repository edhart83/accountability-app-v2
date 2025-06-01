/*
  # Add Partnership Data

  1. Changes
    - Create auth user for partnerships
    - Add partner profiles with images
    - Create active partnerships with meeting schedules
    - Add shared goals data

  2. Security
    - Maintain RLS policies
    - Ensure proper foreign key relationships
*/

-- First create the auth user
INSERT INTO auth.users (id, email)
VALUES (
  '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
  'demo@example.com'
) ON CONFLICT (id) DO NOTHING;

-- Now we can safely insert the partner profiles
INSERT INTO profiles (id, name, interests, bio, goals_completed, days_active, success_rate, image_url)
VALUES
  (
    '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
    'David Wilson',
    ARRAY['running', 'learning react'],
    'Passionate about fitness and technology. Certified personal trainer with 5 years of experience.',
    15,
    60,
    '92%',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  );

-- Insert partnership data
INSERT INTO partnerships (
  id,
  user_id,
  partner_id,
  status,
  next_meeting,
  shared_goals,
  created_at,
  updated_at
)
VALUES
  (
    gen_random_uuid(),
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
    ]',
    NOW(),
    NOW()
  );