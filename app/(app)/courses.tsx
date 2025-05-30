import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, BookOpen, Clock, Star, ChevronRight } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';
import ProgressBar from '@/components/ui/ProgressBar';

export default function Courses() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Sample data
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'health', name: 'Health' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'career', name: 'Career' },
  ];

  const courses = [
    {
      id: '1',
      title: 'Building Effective Accountability Systems',
      category: 'productivity',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      lessons: 8,
      duration: '2h 45m',
      rating: 4.8,
      progress: 0.25,
    },
    {
      id: '2',
      title: 'Goal Setting for Success',
      category: 'productivity',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      lessons: 6,
      duration: '1h 30m',
      rating: 4.6,
      progress: 0,
    },
    {
      id: '3',
      title: 'Mindfulness for Better Focus',
      category: 'mindfulness',
      image: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
      lessons: 10,
      duration: '3h 15m',
      rating: 4.9,
      progress: 0.6,
    },
    {
      id: '4',
      title: 'Building Healthy Habits',
      category: 'health',
      image: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg',
      lessons: 12,
      duration: '4h 10m',
      rating: 4.7,
      progress: 0,
    },
    {
      id: '5',
      title: 'Career Growth Strategies',
      category: 'career',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      lessons: 8,
      duration: '2h 20m',
      rating: 4.5,
      progress: 0,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = category === 'all' || course.category === category;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCourseCard = (course) => {
    const isInProgress = course.progress > 0;

    return (
      <TouchableOpacity key={course.id} style={[styles.courseCard, isTablet && styles.courseCardTablet]}>
        <Image source={{ uri: course.image }} style={styles.courseImage} />
        <View style={styles.courseContent}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          
          <View style={styles.courseStats}>
            <View style={styles.courseStat}>
              <BookOpen size={14} color="#6B7280" style={styles.courseStatIcon} />
              <Text style={styles.courseStatText}>{course.lessons} Lessons</Text>
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
          
          {isInProgress ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>{Math.round(course.progress * 100)}% Complete</Text>
                <Text style={styles.continueText}>Continue</Text>
              </View>
              <ProgressBar progress={course.progress} />
            </View>
          ) : (
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Course</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search courses..."
          leftIcon={<Search size={20} color="#6B7280" />}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryButton, category === cat.id && styles.activeCategoryButton]}
              onPress={() => setCategory(cat.id)}
            >
              <Text 
                style={[styles.categoryButtonText, category === cat.id && styles.activeCategoryButtonText]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.coursesContainer,
          isTablet && styles.coursesContainerTablet
        ]}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => renderCourseCard(course))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No courses found</Text>
            <Text style={styles.emptyStateDescription}>
              Try adjusting your search or category filters
            </Text>
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#EBF5FF',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeCategoryButtonText: {
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  coursesContainer: {
    padding: 16,
  },
  coursesContainerTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
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
  courseCardTablet: {
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
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});