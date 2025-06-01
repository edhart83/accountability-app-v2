/*
  # Add Course and Instructor Images

  1. Changes
    - Adds instructor profile images for each course instructor
    - Adds course cover images for each course
    - Uses high-quality professional images from Pexels

  2. Purpose
    - Enhances visual appeal of course listings
    - Provides professional instructor photos
    - Maintains consistent image quality across courses
*/

-- Add course cover images
UPDATE courses 
SET image_url = CASE id
  WHEN '21f5e518-1f74-410c-ada1-7d6f2fb54bb9' THEN 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'  -- Accountability Systems
  WHEN 'c2f5e518-1f74-410c-ada1-7d6f2fb54bc1' THEN 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'  -- Goal Setting
  WHEN 'c3f5e518-1f74-410c-ada1-7d6f2fb54bc2' THEN 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg'  -- Mindfulness
  WHEN 'c4f5e518-1f74-410c-ada1-7d6f2fb54bc3' THEN 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'  -- Time Management
  WHEN 'c5f5e518-1f74-410c-ada1-7d6f2fb54bc4' THEN 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg'  -- Stress Management
END;

-- Add instructor profile images
UPDATE courses 
SET instructor_image_url = CASE id
  WHEN '21f5e518-1f74-410c-ada1-7d6f2fb54bb9' THEN 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'  -- Dr. Sarah Johnson
  WHEN 'c2f5e518-1f74-410c-ada1-7d6f2fb54bc1' THEN 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'  -- Michael Brown
  WHEN 'c3f5e518-1f74-410c-ada1-7d6f2fb54bc2' THEN 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'  -- Emma Chen
  WHEN 'c4f5e518-1f74-410c-ada1-7d6f2fb54bc3' THEN 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'    -- David Wilson
  WHEN 'c5f5e518-1f74-410c-ada1-7d6f2fb54bc4' THEN 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'    -- Sarah Thompson
END;