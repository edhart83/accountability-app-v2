/*
  # Add Course Images

  1. Changes
    - Adds more courses with appropriate images
    - Each course has a unique, relevant image from Pexels
    - Images are high-quality and professional

  2. Purpose
    - Provides visual variety in course listings
    - Enhances user experience with relevant imagery
    - Maintains professional appearance
*/

INSERT INTO courses (
  id,
  title,
  category,
  image_url,
  description,
  lessons_count,
  duration,
  rating,
  progress,
  instructor_name,
  instructor_title,
  syllabus
) VALUES 
(
  'c2f5e518-1f74-410c-ada1-7d6f2fb54bc1',
  'Goal Setting for Success',
  'productivity',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  'Master the art of setting and achieving meaningful goals. Learn proven strategies for goal setting, tracking, and maintaining motivation throughout your journey.',
  6,
  '1h 30m',
  4.6,
  0,
  'Michael Brown',
  'Success Coach',
  '[
    {
      "id": "1",
      "title": "Goal Setting Fundamentals",
      "duration": "30m",
      "completed": false,
      "lessons": [
        {
          "id": "1.1",
          "title": "SMART Goals Framework",
          "duration": "15m",
          "completed": false
        },
        {
          "id": "1.2",
          "title": "Vision and Goal Alignment",
          "duration": "15m",
          "completed": false
        }
      ]
    }
  ]'
),
(
  'c3f5e518-1f74-410c-ada1-7d6f2fb54bc2',
  'Mindfulness for Better Focus',
  'mindfulness',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
  'Enhance your focus and productivity through mindfulness practices. Learn techniques to stay present, reduce stress, and improve your mental clarity.',
  10,
  '3h 15m',
  4.9,
  0.6,
  'Emma Chen',
  'Mindfulness Coach',
  '[
    {
      "id": "1",
      "title": "Introduction to Mindfulness",
      "duration": "45m",
      "completed": true,
      "lessons": [
        {
          "id": "1.1",
          "title": "What is Mindfulness?",
          "duration": "15m",
          "completed": true
        }
      ]
    }
  ]'
),
(
  'c4f5e518-1f74-410c-ada1-7d6f2fb54bc3',
  'Time Management Mastery',
  'productivity',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
  'Learn essential time management techniques to boost your productivity and achieve more in less time.',
  8,
  '2h 30m',
  4.7,
  0,
  'David Wilson',
  'Productivity Expert',
  '[
    {
      "id": "1",
      "title": "Time Management Basics",
      "duration": "30m",
      "completed": false,
      "lessons": [
        {
          "id": "1.1",
          "title": "Understanding Time Management",
          "duration": "15m",
          "completed": false
        }
      ]
    }
  ]'
),
(
  'c5f5e518-1f74-410c-ada1-7d6f2fb54bc4',
  'Stress Management Techniques',
  'mindfulness',
  'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg',
  'Discover effective strategies for managing stress and maintaining balance in your daily life.',
  7,
  '2h 15m',
  4.8,
  0,
  'Sarah Thompson',
  'Wellness Coach',
  '[
    {
      "id": "1",
      "title": "Understanding Stress",
      "duration": "30m",
      "completed": false,
      "lessons": [
        {
          "id": "1.1",
          "title": "What is Stress?",
          "duration": "15m",
          "completed": false
        }
      ]
    }
  ]'
);