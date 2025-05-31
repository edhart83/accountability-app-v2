import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';
import CourseCard from '@/components/courses/CourseCard';

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
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
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