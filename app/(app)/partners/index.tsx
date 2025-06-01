import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/context/AuthContext';
import { Search, Calendar, MessageCircle, UserPlus } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';

interface Partner {
  id: string;
  name: string;
  interests: string[];
  image_url: string;
  next_meeting: string;
}

interface PartnerRequest {
  id: string;
  sender: {
    id: string;
    name: string;
    interests: string[];
    image_url: string;
  };
  requested_at: string;
}

export default function Partners() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('myPartners');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPartners();
      fetchPartnerRequests();
    }
  }, [user]);

  const fetchPartners = async () => {
    try {
          partner_id,
          next_meeting
        `)
        .eq('user_id', user?.id)
        .eq('status', 'active');

      if (error) throw error;
      
      // Fetch partner profiles
      if (data) {
        const partnerIds = data.map(p => p.partner_id);
        const { data: partnerProfiles, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', partnerIds);

        if (profileError) throw profileError;

        const partnersWithProfiles = data.map(partnership => {
          const profile = partnerProfiles?.find(p => p.id === partnership.partner_id);
          return {
            id: partnership.partner_id,
            name: profile?.name || 'Unknown Partner',
            interests: profile?.interests || [],
            image_url: profile?.image_url,
            next_meeting: partnership.next_meeting
          };
        });

        setPartners(partnersWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const fetchPartnerRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('partnerships')
        .select(`
          id,
          user_id,
          created_at
        `)
        .eq('partner_id', user?.id)
        .eq('status', 'pending');

      if (error) throw error;
      
      // Fetch sender profiles
      if (data) {
        const senderIds = data.map(p => p.user_id);
        const { data: senderProfiles, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', senderIds);

        if (profileError) throw profileError;

        const requestsWithProfiles = data.map(request => {
          const profile = senderProfiles?.find(p => p.id === request.user_id);
          return {
            id: request.id,
            sender: {
              id: request.user_id,
              name: profile?.name || 'Unknown User',
              interests: profile?.interests || [],
              image_url: profile?.image_url
            },
            requested_at: request.created_at
          };
        });

        setRequests(requestsWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching partner requests:', error);
    } finally {
      setIsLoading(false);
    }

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('partnerships')
        .update({ status: 'active' })
        .eq('id', requestId);

      if (error) throw error;
      await fetchPartners();
      await fetchPartnerRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('partnerships')
        .delete()
        .eq('id', requestId);

      if (error) throw error;
      await fetchPartnerRequests();
    } catch (error) {
      console.error('Error declining request:', error);
    }
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
      
      <ScrollView style={styles.content}>
        {activeTab === 'myPartners' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Partners</Text>
              {partners.map(partner => (
                <TouchableOpacity
                  key={partner.id}
                  style={styles.partnerCard}
                  onPress={() => router.push(`/partners/${partner.id}`)}
                >
                  <Image 
                    source={{ uri: partner.image_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }} 
                    style={styles.partnerImage} 
                  />
                  <View style={styles.partnerDetails}>
                    <Text style={styles.partnerName}>{partner.name}</Text>
                    <View style={styles.goalTags}>
                      {partner.interests?.map((interest, idx) => (
                        <View key={idx} style={styles.goalTag}>
                          <Text style={styles.goalTagText}>{interest}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.nextMeeting}>
                    <Calendar size={14} color="#4B5563" />
                    <Text style={styles.nextMeetingText}>
                      {new Date(partner.next_meeting).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {requests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Partner Requests</Text>
                {requests.map(request => (
                  <TouchableOpacity 
                    key={request.id} 
                    style={styles.requestCard}
                    onPress={() => router.push(`/partners/${request.sender.id}`)}
                  >
                    <Image 
                      source={{ uri: request.sender.image_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }} 
                      style={styles.partnerImage} 
                    />
                    <View style={styles.requestDetails}>
                      <Text style={styles.partnerName}>{request.sender.name}</Text>
                      <Text style={styles.requestDate}>
                        Requested {new Date(request.requested_at).toLocaleDateString()}
                      </Text>
                      <View style={styles.goalTags}>
                        {request.sender.interests?.map((interest, idx) => (
                          <View key={idx} style={styles.goalTag}>
                            <Text style={styles.goalTagText}>{interest}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={styles.requestActions}>
                      <TouchableOpacity 
                        style={styles.declineButton}
                        onPress={() => handleDeclineRequest(request.id)}
                      >
                        <Text style={styles.declineText}>Decline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.acceptButton}
                        onPress={() => handleAcceptRequest(request.id)}
                      >
                        <Text style={styles.acceptText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.section}>
            {isLoading ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Loading partners...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Find Partners</Text>
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No potential partners found at the moment.
                  </Text>
                  <TouchableOpacity style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    color: '#4B5563',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    '@media (max-width: 768px)': {
      padding: 12,
    },
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    '@media (max-width: 768px)': {
      fontSize: 16,
      marginBottom: 12,
    },
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
    '@media (max-width: 768px)': {
      fontSize: 14,
      marginBottom: 16,
      lineHeight: 20,
    },
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: 10,
      marginBottom: 8,
    },
  },
  partnerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    '@media (max-width: 768px)': {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  },
  partnerDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    '@media (max-width: 768px)': {
      marginLeft: 10,
      marginRight: 8,
    },
  },
  partnerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    '@media (max-width: 768px)': {
      fontSize: 14,
      marginBottom: 2,
    },
  },
  goalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      marginTop: 4,
    },
  },
  goalTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    '@media (max-width: 768px)': {
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginRight: 6,
      marginBottom: 2,
    },
  },
  goalTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    '@media (max-width: 768px)': {
      fontSize: 11,
    },
  },
  nextMeeting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    '@media (max-width: 768px)': {
      paddingHorizontal: 6,
      paddingVertical: 3,
    },
  },
  nextMeetingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 4,
    '@media (max-width: 768px)': {
      fontSize: 11,
      marginLeft: 3,
    },
  },
  connectButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
      padding: 10,
      marginBottom: 8,
    },
  },
  requestActions: {
    flexDirection: 'column',
    gap: 8,
    '@media (max-width: 768px)': {
      gap: 6,
    },
  },
  declineButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    '@media (max-width: 768px)': {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
  },
  declineText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    '@media (max-width: 768px)': {
      fontSize: 12,
    },
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    '@media (max-width: 768px)': {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
  },
  acceptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    '@media (max-width: 768px)': {
      fontSize: 12,
    },
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginTop: 16,
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  refreshButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});