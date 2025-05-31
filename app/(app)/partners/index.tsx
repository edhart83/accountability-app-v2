import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Search, Calendar, MessageCircle } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';

export default function Partners() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('myPartners');

  // Sample suggested partners data
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
      
      <ScrollView style={styles.content}>
        {activeTab === 'myPartners' ? (
          <>
            <Text style={styles.sectionTitle}>Your Partners</Text>
            {partners.map(partner => (
              <TouchableOpacity 
                key={partner.id} 
                style={styles.partnerCard}
                onPress={() => router.push(`/partners/${partner.id}`)}
              >
                <View style={styles.partnerInfo}>
                  <Image source={{ uri: partner.image }} style={styles.partnerImage} />
                  <View style={styles.partnerDetails}>
                    <Text style={styles.partnerName}>{partner.name}</Text>
                    <View style={styles.goalTags}>
                      {partner.goals.map((goal, idx) => (
                        <View key={idx} style={styles.goalTag}>
                          <Text style={styles.goalTagText}>{goal}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.meetingInfo}>
                      <Calendar size={14} color="#6B7280" style={styles.meetingIcon} />
                      <Text style={styles.meetingText}>Next meeting: {partner.nextMeeting}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.messageButton}>
                    <MessageCircle size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scheduleButton}>
                    <Calendar size={16} color="#3B82F6" style={styles.scheduleIcon} />
                    <Text style={styles.scheduleText}>Schedule</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

            {requests.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, styles.requestsTitle]}>Partner Requests</Text>
                {requests.map(request => (
                  <View key={request.id} style={styles.requestCard}>
                    <View style={styles.requestInfo}>
                      <Image source={{ uri: request.image }} style={styles.partnerImage} />
                      <View style={styles.requestDetails}>
                        <Text style={styles.partnerName}>{request.name}</Text>
                        <Text style={styles.requestDate}>Requested {request.requestDate}</Text>
                        <View style={styles.goalTags}>
                          {request.goals.map((goal, idx) => (
                            <View key={idx} style={styles.goalTag}>
                              <Text style={styles.goalTagText}>{goal}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                    <View style={styles.requestActions}>
                      <TouchableOpacity style={styles.declineButton}>
                        <Text style={styles.declineText}>Decline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Suggested Partners</Text>
            <Text style={styles.sectionDescription}>
              Based on your goals and interests, we've found people who might be great accountability partners for you.
            </Text>
            {suggestions.map(partner => (
          <TouchableOpacity 
            key={partner.id} 
            style={styles.partnerCard}
            onPress={() => router.push(`/partners/${partner.id}`)}
          >
            <View style={styles.partnerInfo}>
              <Image source={{ uri: partner.image }} style={styles.partnerImage} />
              <View style={styles.partnerDetails}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <Text style={styles.compatibilityText}>{partner.compatibility}</Text>
                <View style={styles.goalTags}>
                  {partner.goals.map((goal, idx) => (
                    <View key={idx} style={styles.goalTag}>
                      <Text style={styles.goalTagText}>{goal}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
          </>
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
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  requestsTitle: {
    marginTop: 24,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  partnerCard: {
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
  partnerInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  partnerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  compatibilityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 8,
  },
  goalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  goalTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  goalTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingIcon: {
    marginRight: 6,
  },
  meetingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  messageButton: {
    backgroundColor: '#3B82F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  scheduleIcon: {
    marginRight: 6,
  },
  scheduleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  requestCard: {
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
  requestInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  requestDetails: {
    flex: 1,
  },
  requestDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  declineButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  declineText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  connectButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  connectButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});