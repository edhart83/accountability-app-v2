/*
  # Add Partnership Data with Existence Check

  1. Changes
    - Add partnership data with proper existence checks
    - Include shared goals and next meeting time
    - Set correct status and metadata

  2. Security
    - Maintains RLS policies
    - Checks for existing records before insert
*/

-- First check if the user exists and only proceed if they don't
DO $$
BEGIN
  -- Only proceed if the user doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = '21f5e518-1f74-410c-ada1-7d6f2fb54bb9'
  ) THEN
    -- Insert the profile
    INSERT INTO profiles (
      id,
      name,
      interests,
      bio,
      goals_completed,
      days_active,
      success_rate,
      image_url
    ) VALUES (
      '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
      'David Wilson',
      ARRAY['running', 'learning react'],
      'Passionate about fitness and technology. Certified personal trainer with 5 years of experience.',
      15,
      60,
      '92%',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    );
  END IF;

  -- Insert partnership if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM partnerships 
    WHERE user_id = '21f5e518-1f74-410c-ada1-7d6f2fb54bb9'
    AND partner_id = '31f5e518-1f74-410c-ada1-7d6f2fb54001'
  ) THEN
    INSERT INTO partnerships (
      id,
      user_id,
      partner_id,
      status,
      next_meeting,
      shared_goals,
      created_at,
      updated_at
    ) VALUES (
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
  END IF;
END $$;