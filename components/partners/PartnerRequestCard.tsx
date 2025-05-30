import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, Check, X } from 'lucide-react-native';

interface RequestProps {
  id: string;
  name: string;
  goals: string[];
  image: string;
  requestDate: string;
}

interface PartnerRequestCardProps {
  request: RequestProps;
}

const PartnerRequestCard: React.FC<PartnerRequestCardProps> = ({ request }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: request.image }} style={styles.requestImage} />
        <View style={styles.requestInfo}>
          <Text style={styles.requestName}>{request.name}</Text>
          <View style={styles.requestDate}>
            <Clock size={12} color="#6B7280" style={styles.dateIcon} />
            <Text style={styles.dateText}>Requested {request.requestDate}</Text>
          </View>
          <View style={styles.goalTags}>
            {request.goals.map((goal, idx) => (
              <View key={idx} style={styles.goalTag}>
                <Text style={styles.goalTagText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.declineButton}>
          <X size={20} color="#EF4444" />
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <Check size={20} color="#FFFFFF" />
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
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
  requestImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  requestInfo: {
    marginLeft: 16,
    flex: 1,
  },
  requestName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  requestDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  declineText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 4,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});

export default PartnerRequestCard;