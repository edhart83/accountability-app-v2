import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Target, CheckCircle, Edit2 } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

export default function GoalDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // In a real app, this would fetch from an API or database
  const goal = {
    id: '1',
    title: 'Complete React Native Course',
    description: 'Master React Native development by completing the comprehensive course, including building real-world applications and understanding best practices.',
    category: 'Learning',
    dueDate: '2025-05-15',
    progress: 0.65,
    status: 'in-progress',
    milestones: [
      { id: '1', title: 'Complete Basic Concepts', completed: true },
      { id: '2', title: 'Build First App', completed: true },
      { id: '3', title: 'Learn Navigation', completed: true },
      { id: '4', title: 'State Management', completed: false },
      { id: '5', title: 'Final Project', completed: false },
    ],
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Goal Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit2 size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.goalHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{goal.category}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>

          <Text style={styles.goalTitle}>{goal.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Calendar size={16} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>Due {formatDate(goal.dueDate)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                {Math.round(goal.progress * 100)}% Complete
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <ProgressBar progress={goal.progress} height={8} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{goal.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {goal.milestones.map((milestone) => (
            <View key={milestone.id} style={styles.milestone}>
              <View style={[
                styles.milestoneCheckbox,
                milestone.completed && styles.milestoneCheckboxCompleted
              ]}>
                {milestone.completed && <CheckCircle size={16} color="#FFFFFF" />}
              </View>
              <Text style={[
                styles.milestoneText,
                milestone.completed && styles.milestoneTextCompleted
              ]}>
                {milestone.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: getStatusColor() }]}
        >
          <Target size={20} color="#FFFFFF" style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>
            {goal.status === 'completed' ? 'Completed' : 'Update Progress'}
          </Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  goalHeader: {
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
  goalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  progressSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  milestoneCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneCheckboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  milestoneText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  milestoneTextCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});