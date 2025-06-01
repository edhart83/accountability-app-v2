import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { ArrowLeft, Clock, BookOpen, Star, Play, CircleCheck as CheckCircle } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

interface Course {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  lessons_count: number;
  duration: string;
  rating: number;
  progress: number;
  instructor_name: string;
  instructor_title: string;
  instructor_image_url: string;
  syllabus: any;
}

export default function CourseDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Course not found');

      setCourse(data);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Course Not Found</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={[styles.content, styles.centerContent]}>
          <Text style={styles.errorText}>{error || 'This course does not exist.'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: course.image_url }} style={styles.courseImage} />
        
        <View style={styles.courseInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          
          <Text style={styles.courseTitle}>{course.title}</Text>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <BookOpen size={16} color="#6B7280" />
              <Text style={styles.statText}>{course.lessons_count} Lessons</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.statText}>{course.duration}</Text>
            </View>
            <View style={styles.stat}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.statText}>{course.rating}</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressText}>{Math.round(course.progress * 100)}% Complete</Text>
            <ProgressBar progress={course.progress} />
          </View>

          <View style={styles.instructorSection}>
            <Image source={{ uri: course.instructor_image_url }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{course.instructor_name}</Text>
              <Text style={styles.instructorTitle}>{course.instructor_title}</Text>
            </View>
          </View>

          <Text style={styles.description}>{course.description}</Text>
        </View>

        <View style={styles.syllabusSection}>
          <Text style={styles.syllabusTitle}>Course Syllabus</Text>
          
          {course.syllabus?.map((module: any, index: number) => (
            <View key={module.id} style={styles.module}>
              <View style={styles.moduleHeader}>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>
                    {index + 1}. {module.title}
                  </Text>
                  <Text style={styles.moduleDuration}>{module.duration}</Text>
                </View>
                {module.completed && (
                  <CheckCircle size={20} color="#10B981" />
                )}
              </View>

              <View style={styles.lessons}>
                {module.lessons.map((lesson: any) => (
                  <TouchableOpacity key={lesson.id} style={styles.lesson}>
                    <View style={styles.lessonLeft}>
                      <View style={[
                        styles.lessonStatus,
                        lesson.completed && styles.lessonStatusCompleted
                      ]}>
                        {lesson.completed ? (
                          <CheckCircle size={16} color="#FFFFFF" />
                        ) : (
                          <Play size={16} color="#6B7280" />
                        )}
                      </View>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    </View>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton}>
          <Play size={20} color="#FFFFFF" />
          <Text style={styles.continueButtonText}>Continue Learning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  courseImage: {
    width: '100%',
    height: 200,
  },
  courseInfo: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    textTransform: 'capitalize',
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  instructorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  instructorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  instructorTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  syllabusSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  syllabusTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  module: {
    marginBottom: 24,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  moduleDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  lessons: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonStatusCompleted: {
    backgroundColor: '#10B981',
  },
  lessonTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  lessonDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});