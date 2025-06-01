/*
  # Add shared_goals column to partnerships table

  1. Changes
    - Add shared_goals JSONB column to partnerships table
    - Set default empty array value
    - Update existing partnerships with sample shared goals data

  2. Security
    - No changes to RLS policies needed
*/

-- Add shared_goals column if it doesn't exist
ALTER TABLE partnerships ADD COLUMN IF NOT EXISTS shared_goals JSONB DEFAULT '[]';

-- Update existing partnerships with sample shared goals data
UPDATE partnerships
SET shared_goals = '[
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
WHERE shared_goals IS NULL OR shared_goals = '[]';