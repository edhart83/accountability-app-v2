/*
  # Add Instructor Profile Images

  1. Changes
    - Adds instructor_image_url column to courses table
    - Updates existing courses with professional instructor profile images
    - Uses high-quality Pexels images for consistency

  2. Purpose
    - Enhances course display with instructor photos
    - Maintains professional appearance
    - Improves user experience
*/

-- Add instructor_image_url column if it doesn't exist
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_image_url TEXT;

-- Update existing courses with instructor profile images
UPDATE courses 
SET instructor_image_url = CASE id
  WHEN '21f5e518-1f74-410c-ada1-7d6f2fb54bb9' THEN 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'  -- Dr. Sarah Johnson
  WHEN 'c2f5e518-1f74-410c-ada1-7d6f2fb54bc1' THEN 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'  -- Michael Brown
  WHEN 'c3f5e518-1f74-410c-ada1-7d6f2fb54bc2' THEN 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'  -- Emma Chen
  WHEN 'c4f5e518-1f74-410c-ada1-7d6f2fb54bc3' THEN 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'    -- David Wilson
  WHEN 'c5f5e518-1f74-410c-ada1-7d6f2fb54bc4' THEN 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'    -- Sarah Thompson
END;