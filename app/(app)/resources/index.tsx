import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Download, FileText, Video, Headphones, ExternalLink } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'guides', name: 'Guides' },
    { id: 'videos', name: 'Videos' },
    { id: 'podcasts', name: 'Podcasts' },
    { id: 'templates', name: 'Templates' },
  ];

  const resources = [
    {
      id: '1',
      title: 'Goal Setting Workbook',
      type: 'guides',
      format: 'PDF',
      size: '2.4 MB',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
      description: 'A comprehensive workbook to help you set and track meaningful goals.',
      downloads: 1234,
    },
    {
      id: '2',
      title: 'Productivity Masterclass',
      type: 'videos',
      duration: '45 mins',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      description: 'Learn essential productivity techniques from industry experts.',
      views: 5678,
    },
    {
      id: '3',
      title: 'Success Habits Podcast',
      type: 'podcasts',
      duration: '32 mins',
      image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
      description: 'Weekly discussions about building successful habits and routines.',
      listens: 3456,
    },
  ];

  const filteredResources = resources.filter(resource => 
    (activeCategory === 'all' || resource.type === activeCategory) &&
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'guides':
        return FileText;
      case 'videos':
        return Video;
      case 'podcasts':
        return Headphones;
      default:
        return FileText;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search resources..."
          leftIcon={<Search size={20} color="#6B7280" />}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  activeCategory === category.id && styles.activeCategoryButtonText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {filteredResources.map(resource => {
          const Icon = getIcon(resource.type);
          return (
            <TouchableOpacity key={resource.id} style={styles.resourceCard}>
              <Image source={{ uri: resource.image }} style={styles.resourceImage} />
              <View style={styles.resourceContent}>
                <View style={styles.resourceHeader}>
                  <View style={styles.typeBadge}>
                    <Icon size={14} color="#4B5563" />
                    <Text style={styles.typeBadgeText}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Text>
                  </View>
                  {resource.format && (
                    <View style={styles.formatBadge}>
                      <Text style={styles.formatBadgeText}>{resource.format}</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                
                <View style={styles.resourceMeta}>
                  {resource.duration ? (
                    <Text style={styles.metaText}>{resource.duration}</Text>
                  ) : resource.size ? (
                    <Text style={styles.metaText}>{resource.size}</Text>
                  ) : null}
                  
                  <TouchableOpacity style={styles.actionButton}>
                    {resource.type === 'guides' ? (
                      <>
                        <Download size={16} color="#3B82F6" />
                        <Text style={styles.actionButtonText}>Download</Text>
                      </>
                    ) : (
                      <>
                        <ExternalLink size={16} color="#3B82F6" />
                        <Text style={styles.actionButtonText}>Open</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
  content: {
    flex: 1,
    padding: 16,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceImage: {
    width: '100%',
    height: 160,
  },
  resourceContent: {
    padding: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  typeBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 6,
  },
  formatBadge: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  formatBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3B82F6',
  },
  resourceTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  resourceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 6,
  },
});