import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, MessageCircle, Clock } from 'lucide-react-native';

interface PartnerProps {
  id: string;
  name: string;
  goals: string[];
  image: string;
  nextMeeting: string;
}

interface PartnerCardProps {
  partner: PartnerProps;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: partner.image }} style={styles.partnerImage} />
        <View style={styles.partnerInfo}>
          <Text style={styles.partnerName}>{partner.name}</Text>
          <View style={styles.goalTags}>
            {partner.goals.map((goal, idx) => (
              <View key={idx} style={styles.goalTag}>
                <Text style={styles.goalTagText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.meetingSection}>
        <View style={styles.meetingInfo}>
          <Calendar size={16} color="#6B7280" style={styles.meetingIcon} />
          <Text style={styles.meetingText}>Next meeting: {partner.nextMeeting}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Clock size={16} color="#3B82F6" style={styles.scheduleIcon} />
            <Text style={styles.scheduleText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  partnerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  partnerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  partnerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
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
    marginBottom: 4,
  },
  goalTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  meetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingIcon: {
    marginRight: 8,
  },
  meetingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
    marginRight: 4,
  },
  scheduleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
});

export default PartnerCard;