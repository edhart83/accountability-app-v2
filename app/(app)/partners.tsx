import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, UserPlus, Calendar, MessageCircle, Clock } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';
import PartnerCard from '@/components/partners/PartnerCard';
import PartnerRequestCard from '@/components/partners/PartnerRequestCard';

export default function Partners() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('myPartners');

  // Sample data
  const partners = [
    {
      id: '1',
      name: 'David Wilson',
      goals: ['Running', 'Learning React'],
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      nextMeeting: 'Tomorrow, 3:00 PM',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      goals: ['Weight Training', 'Spanish'],
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      nextMeeting: 'Friday, 5:30 PM',
    },
  ];

  const requests = [
    {
      id: '1',
      name: 'Michael Brown',
      goals: ['Running', 'Reading'],
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      requestDate: '2 days ago',
    },
    {
      id: '2',
      name: 'Jennifer Lee',
      goals: ['Meditation', 'Coding'],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      requestDate: '1 week ago',
    },
  ];

  const suggestions = [
    {
      id: '1',
      name: 'James Smith',
      goals: ['Running', 'Reading'],
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      compatibility: '85% match',
    },
    {
      id: '2',
      name: 'Emma Garcia',
      goals: ['Yoga', 'Programming'],
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
      compatibility: '78% match',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      goals: ['Cycling', 'Language Learning'],
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      compatibility: '72% match',
    },
  ];

  const renderTabContent = () => {
    if (activeTab === 'myPartners') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Your Partners</Text>
          {partners.map(partner => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
          
          {requests.length > 0 && (
            <View style={styles.requestsSection}>
              <Text style={styles.sectionTitle}>Partner Requests</Text>
              {requests.map(request => (
                <PartnerRequestCard key={request.id} request={request} />
              ))}
            </View>
          )}
        </View>
      );
    } else if (activeTab === 'findPartners') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Suggested Partners</Text>
          <Text style={styles.sectionDescription}>
            Based on your goals and interests, we've found people who might be great accountability partners for you.
          </Text>
          {suggestions.map(suggestion => (
            <View key={suggestion.id} style={styles.suggestionCard}>
              <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionName}>{suggestion.name}</Text>
                <View style={styles.goalTags}>
                  {suggestion.goals.map((goal, idx) => (
                    <View key={idx} style={styles.goalTag}>
                      <Text style={styles.goalTagText}>{goal}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.compatibilityBadge}>
                  <Text style={styles.compatibilityText}>{suggestion.compatibility}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.connectButton}>
                <UserPlus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Accountability Partners</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search partners..."
          leftIcon={<Search size={20} color="#6B7280" />}
        />
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'myPartners' && styles.activeTab]}
          onPress={() => setActiveTab('myPartners')}
        >
          <Text style={[styles.tabText, activeTab === 'myPartners' && styles.activeTabText]}>
            My Partners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'findPartners' && styles.activeTab]}
          onPress={() => setActiveTab('findPartners')}
        >
          <Text style={[styles.tabText, activeTab === 'findPartners' && styles.activeTabText]}>
            Find Partners
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {renderTabContent()}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  requestsSection: {
    marginTop: 24,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestionImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  suggestionContent: {
    flex: 1,
    marginLeft: 16,
  },
  suggestionName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  goalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goalTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  goalTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  compatibilityBadge: {
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  compatibilityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3B82F6',
  },
  connectButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});