import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, BookOpen, Star, Play, CircleCheck as CheckCircle } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

export default function CourseDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // In a real app, this would fetch from an API or database
  const course = {
    id: '1',
    title: 'Building Effective Accountability Systems',
    category: 'productivity',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    lessons: 8,
    duration: '2h 45m',
    rating: 4.8,
    progress: 0.25,
    description: 'Learn how to build and maintain effective accountability systems that drive results and foster personal growth. This comprehensive course covers everything from setting up tracking mechanisms to maintaining long-term motivation.',
    instructor: {
      name: 'Dr. Sarah Johnson',
      title: 'Productivity Expert',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'
    },
    syllabus: [
      {
        id: '1',
        title: 'Introduction to Accountability',
        duration: '20m',
        completed: true,
        lessons: [
          { id: '1.1', title: 'Why Accountability Matters', duration: '8m', completed: true },
          { id: '1.2', title: 'Key Components of Effective Systems', duration: '12m', completed: true }
        ]
      },
      {
        id: '2',
        title: 'Setting Up Your System',
        duration: '45m',
        completed: false,
        lessons: [
          { id: '2.1', title: 'Choosing the Right Tools', duration: '15m', completed: true },
          { id: '2.2', title: 'Creating Tracking Mechanisms', duration: '15m', completed: false },
          { id: '2.3', title: 'Setting Up Review Cycles', duration: '15m', completed: false }
        ]
      },
      {
        id: '3',
        title: 'Maintaining Momentum',
        duration: '35m',
        completed: false,
        lessons: [
          { id: '3.1', title: 'Dealing with Setbacks', duration: '12m', completed: false },
          { id: '3.2', title: 'Adjusting Your System', duration: '13m', completed: false },
          { id: '3.3', title: 'Long-term Sustainability', duration: '10m', completed: false }
        ]
      }
    ]
  };

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
        <Image source={{ uri: course.image }} style={styles.courseImage} />
        
        <View style={styles.courseInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          
          <Text style={styles.courseTitle}>{course.title}</Text>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <BookOpen size={16} color="#6B7280" />
              <Text style={styles.statText}>{course.lessons} Lessons</Text>
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
            <Image source={{ uri: course.instructor.image }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{course.instructor.name}</Text>
              <Text style={styles.instructorTitle}>{course.instructor.title}</Text>
            </View>
          </View>

          <Text style={styles.description}>{course.description}</Text>
        </View>

        <View style={styles.syllabusSection}>
          <Text style={styles.syllabusTitle}>Course Syllabus</Text>
          
          {course.syllabus.map((module, index) => (
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
                {module.lessons.map(lesson => (
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