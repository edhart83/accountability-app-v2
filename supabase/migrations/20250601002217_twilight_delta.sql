/*
  # Add Course Data

  1. New Data
    - Adds sample course data with detailed information
    - Includes course title, description, category, lessons, duration, etc.
    - Sets up instructor information and syllabus structure

  2. Purpose
    - Provides realistic course data for testing and development
    - Demonstrates proper course structure and relationships
*/

INSERT INTO courses (
  id,
  title,
  category,
  description,
  lessons_count,
  duration,
  rating,
  progress,
  instructor_name,
  instructor_title,
  syllabus
) VALUES (
  '21f5e518-1f74-410c-ada1-7d6f2fb54bb9',
  'Building Effective Accountability Systems',
  'productivity',
  'Learn how to build and maintain effective accountability systems that drive results and foster personal growth. This comprehensive course covers everything from setting up tracking mechanisms to maintaining long-term motivation.',
  8,
  '2h 45m',
  4.8,
  0.25,
  'Dr. Sarah Johnson',
  'Productivity Expert',
  '[
    {
      "id": "1",
      "title": "Introduction to Accountability",
      "duration": "20m",
      "completed": true,
      "lessons": [
        {
          "id": "1.1",
          "title": "Why Accountability Matters",
          "duration": "8m",
          "completed": true
        },
        {
          "id": "1.2",
          "title": "Key Components of Effective Systems",
          "duration": "12m",
          "completed": true
        }
      ]
    },
    {
      "id": "2",
      "title": "Setting Up Your System",
      "duration": "45m",
      "completed": false,
      "lessons": [
        {
          "id": "2.1",
          "title": "Choosing the Right Tools",
          "duration": "15m",
          "completed": true
        },
        {
          "id": "2.2",
          "title": "Creating Tracking Mechanisms",
          "duration": "15m",
          "completed": false
        },
        {
          "id": "2.3",
          "title": "Setting Up Review Cycles",
          "duration": "15m",
          "completed": false
        }
      ]
    },
    {
      "id": "3",
      "title": "Maintaining Momentum",
      "duration": "35m",
      "completed": false,
      "lessons": [
        {
          "id": "3.1",
          "title": "Dealing with Setbacks",
          "duration": "12m",
          "completed": false
        },
        {
          "id": "3.2",
          "title": "Adjusting Your System",
          "duration": "13m",
          "completed": false
        },
        {
          "id": "3.3",
          "title": "Long-term Sustainability",
          "duration": "10m",
          "completed": false
        }
      ]
    }
  ]'
);