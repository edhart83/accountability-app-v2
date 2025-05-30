import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';
import ProgressBar from '@/components/ui/ProgressBar';

const GoalSummary = () => {
  // Sample data
  const goals = [
    {
      id: '1',
      title: 'Complete React Native Course',
      dueDate: '2025-05-15',
      progress: 0.65,
    },
    {
      id: '2',
      title: 'Run 5km Three Times a Week',
      dueDate: '2025-05-30',
      progress: 0.33,
    },
    {
      id: '3',
      title: 'Read 10 Books This Year',
      dueDate: '2025-12-31',
      progress: 0.2,
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    // Calculate days until due date
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return 'Tomorrow';
    if (daysDiff < 0) return 'Overdue';
    if (daysDiff < 7) return `${daysDiff} days left`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {goals.map(goal => (
        <TouchableOpacity key={goal.id} style={styles.goalItem}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle} numberOfLines={1}>{goal.title}</Text>
            <View style={styles.dueDateContainer}>
              <Calendar size={12} color="#6B7280" style={styles.dueDateIcon} />
              <Text style={styles.dueDate}>{formatDate(goal.dueDate)}</Text>
            </View>
          </View>
          
          <View style={styles.progressRow}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${goal.progress * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(goal.progress * 100)}%</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  goalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  dueDateIcon: {
    marginRight: 4,
  },
  dueDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    width: 32,
  },
});

export default GoalSummary;