/*
  # Add Instructor Images

  1. Changes
    - Updates instructor image URLs for all courses
    - Uses high-quality professional headshots from Pexels
    - Maintains consistent image quality and style

  2. Purpose
    - Enhances course display with instructor photos
    - Improves user experience with visual instructor profiles
*/

UPDATE courses 
SET instructor_image_url = CASE id
  WHEN '21f5e518-1f74-410c-ada1-7d6f2fb54bb9' THEN 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'  -- Dr. Sarah Johnson
  WHEN 'c2f5e518-1f74-410c-ada1-7d6f2fb54bc1' THEN 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'  -- Michael Brown
  WHEN 'c3f5e518-1f74-410c-ada1-7d6f2fb54bc2' THEN 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'  -- Emma Chen
  WHEN 'c4f5e518-1f74-410c-ada1-7d6f2fb54bc3' THEN 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'    -- David Wilson
  WHEN 'c5f5e518-1f74-410c-ada1-7d6f2fb54bc4' THEN 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'    -- Sarah Thompson
END;