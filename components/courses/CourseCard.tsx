import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Clock, Star } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

interface CourseProps {
  id: string;
  title: string;
  category: string;
  image_url: string;
  lessons_count: number;
  duration: string;
  rating: number;
  progress: number;
}

interface CourseCardProps {
  course: CourseProps;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const router = useRouter();

  const handlePress = () => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isTablet && styles.cardTablet]} 
      onPress={handlePress}
    >
      <Image source={{ uri: course.image_url || 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg' }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        
        <View style={styles.courseStats}>
          <View style={styles.courseStat}>
            <BookOpen size={14} color="#6B7280" style={styles.courseStatIcon} />
            <Text style={styles.courseStatText}>{course.lessons_count} Lessons</Text>
          </View>
          <View style={styles.courseStat}>
            <Clock size={14} color="#6B7280" style={styles.courseStatIcon} />
            <Text style={styles.courseStatText}>{course.duration}</Text>
          </View>
          <View style={styles.courseStat}>
            <Star size={14} color="#F59E0B" style={styles.courseStatIcon} />
            <Text style={styles.courseStatText}>{course.rating}</Text>
          </View>
        </View>
        
        {course.progress > 0 ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>{Math.round(course.progress * 100)}% Complete</Text>
              <Text style={styles.continueText}>Continue</Text>
            </View>
            <ProgressBar progress={course.progress} />
          </View>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <Text style={styles.startButtonText}>Start Course</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTablet: {
    width: '48%',
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  courseStatIcon: {
    marginRight: 4,
  },
  courseStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  continueText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  startButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default CourseCard;