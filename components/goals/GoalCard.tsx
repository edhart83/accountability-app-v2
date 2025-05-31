import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Calendar } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

interface GoalProps {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'missed';
}

interface GoalCardProps {
  goal: GoalProps;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const router = useRouter();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = () => {
    switch (goal.status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#3B82F6';
      case 'missed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = () => {
    switch (goal.status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'missed':
        return 'Missed';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isTablet && styles.cardTablet]}
      onPress={() => router.push(`/goals/${goal.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{goal.category}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <Text style={styles.title}>{goal.title}</Text>
      
      <View style={styles.dateContainer}>
        <Calendar size={16} color="#6B7280" style={styles.dateIcon} />
        <Text style={styles.dateText}>Due {formatDate(goal.dueDate)}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{Math.round(goal.progress * 100)}% Complete</Text>
        <ProgressBar 
          progress={goal.progress} 
          progressColor={getStatusColor()}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => router.push(`/goals/${goal.id}`)}
      >
        <Text style={styles.detailsText}>View Details</Text>
        <ChevronRight size={16} color="#3B82F6" />
      </TouchableOpacity>
    </TouchableOpacity>
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTablet: {
    width: '48%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateIcon: {
    marginRight: 6,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 4,
  },
});

export default GoalCard;