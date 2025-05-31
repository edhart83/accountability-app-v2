import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Lightbulb, BookmarkPlus, MessageSquare, Heart } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';

export default function Tips() {
  const [searchQuery, setSearchQuery] = useState('');

  const tips = [
    {
      id: '1',
      title: 'Start Small, Think Big',
      content: 'Break down your larger goals into smaller, manageable tasks. This makes progress more visible and motivation easier to maintain.',
      author: {
        name: 'Sarah Johnson',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        role: 'Productivity Coach'
      },
      likes: 245,
      comments: 18,
      bookmarks: 56,
    },
    {
      id: '2',
      title: 'The 2-Minute Rule',
      content: 'If a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up and becoming overwhelming.',
      author: {
        name: 'David Wilson',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        role: 'Time Management Expert'
      },
      likes: 189,
      comments: 12,
      bookmarks: 43,
    },
    {
      id: '3',
      title: 'Celebrate Small Wins',
      content: 'Acknowledge and celebrate your progress, no matter how small. This builds momentum and maintains motivation for longer-term goals.',
      author: {
        name: 'Emily Chen',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        role: 'Life Coach'
      },
      likes: 312,
      comments: 24,
      bookmarks: 78,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Daily Tips</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tips..."
          leftIcon={<Search size={20} color="#6B7280" />}
        />
      </View>

      <ScrollView style={styles.content}>
        {tips.map(tip => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.authorInfo}>
                <Image source={{ uri: tip.author.image }} style={styles.authorImage} />
                <View>
                  <Text style={styles.authorName}>{tip.author.name}</Text>
                  <Text style={styles.authorRole}>{tip.author.role}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <BookmarkPlus size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.tipContent}>
              <View style={styles.tipIconContainer}>
                <Lightbulb size={24} color="#3B82F6" />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.content}</Text>
            </View>

            <View style={styles.tipActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={20} color="#6B7280" />
                <Text style={styles.actionText}>{tip.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageSquare size={20} color="#6B7280" />
                <Text style={styles.actionText}>{tip.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  content: {
    flex: 1,
    padding: 16,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  authorRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  bookmarkButton: {
    padding: 8,
  },
  tipContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    textAlign: 'center',
  },
  tipActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
});