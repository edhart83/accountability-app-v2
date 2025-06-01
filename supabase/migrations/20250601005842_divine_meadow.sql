/*
  # Add next_meeting column to partnerships table

  1. Changes
    - Add next_meeting column to partnerships table
    - Update existing partnerships with default meeting times

  2. Security
    - No changes to RLS policies needed
*/

-- Add next_meeting column if it doesn't exist
ALTER TABLE partnerships ADD COLUMN IF NOT EXISTS next_meeting TIMESTAMPTZ;

-- Update existing partnerships with default next meeting times
UPDATE partnerships
SET next_meeting = NOW() + INTERVAL '1 day' + INTERVAL '3 hours'
WHERE next_meeting IS NULL;