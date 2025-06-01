/*
  # Add image_url column to courses table

  1. Changes
    - Add image_url column to courses table
    - Update existing course with image URL
*/

-- Add image_url column to courses table
ALTER TABLE courses ADD COLUMN image_url TEXT;

-- Update existing course with image URL
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
WHERE id = '21f5e518-1f74-410c-ada1-7d6f2fb54bb9';