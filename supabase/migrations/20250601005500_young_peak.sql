/*
  # Add Partnership Data

  1. New Data
    - Adds sample partnership data for user
    - Includes partner details and meeting schedules
    - Sets up active partnerships and requests

  2. Purpose
    - Provides realistic partnership data for testing
    - Demonstrates partnership relationships and statuses
*/

-- Insert partner profiles
INSERT INTO profiles (id, name, interests, bio, goals_completed, days_active, success_rate)
VALUES
  (
    '31f5e518-1f74-410c-ada1-7d6f2fb54001',
    'David Wilson',
    ARRAY['running', 'learning react'],
    'Passionate about fitness and technology',
    15,
    60,
    '92%'
  ),
  (
    '31f5e518-1f74-410c-ada1-7d6f2fb54002',
    'Sarah Johnson',
    ARRAY['weight training', 'spanish'],
    'Fitness enthusiast and language learning advocate',
    12,
    45,
    '88%'
  );

-- Insert partnerships
INSERT INTO partnerships (
  id,
  user_id,
  partner_id,
  status,
  next_meeting,
  created_at,
  updated_at
)
VALUES
  (
    'partnership-uuid-1',
    '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
    '31f5e518-1f74-410c-ada1-7d6f2fb54001',
    'active',
    (NOW() + INTERVAL '1 day' + INTERVAL '3 hours'),
    NOW(),
    NOW()
  ),
  (
    'partnership-uuid-2',
    '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
    '31f5e518-1f74-410c-ada1-7d6f2fb54002',
    'active',
    (NOW() + INTERVAL '3 days' + INTERVAL '5 hours' + INTERVAL '30 minutes'),
    NOW(),
    NOW()
  );