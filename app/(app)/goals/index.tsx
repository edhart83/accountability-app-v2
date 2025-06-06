import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/context/AuthContext';
import { Plus, Filter, Calendar, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react-native';
import GoalCard from '@/components/goals/GoalCard';

interface Goal {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'missed';
}

export default function Goals() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  useEffect(() => {
    if (params?.newGoal) {
      const goal = JSON.parse(params.newGoal as string);
      setGoals(currentGoals => [goal, ...currentGoals]);
      // Clear the newGoal parameter to prevent re-adding on subsequent renders
      router.setParams({ newGoal: undefined });
    }
  }, [params?.newGoal]);

  const filteredGoals = goals.filter(goal => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'in-progress') return goal.status === 'in-progress';
    if (activeFilter === 'completed') return goal.status === 'completed';
    if (activeFilter === 'missed') return goal.status === 'missed';
    return true;
  });

  const renderGoals = () => {
    if (filteredGoals.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No goals found for this filter</Text>
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={styles.emptyStateButtonText}>View all goals</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return filteredGoals.map(goal => (
      <GoalCard key={goal.id} goal={goal} />
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Goals</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/goals/add-goal')}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterSection}>
          <Filter size={16} color="#6B7280" style={styles.filterIcon} />
          <Text style={styles.filterText}>Filter:</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsContainer}
        >
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'all' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterTabText, activeFilter === 'all' && styles.activeFilterTabText]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'in-progress' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('in-progress')}
          >
            <Clock size={16} color={activeFilter === 'in-progress' ? '#3B82F6' : '#6B7280'} style={styles.filterTabIcon} />
            <Text style={[styles.filterTabText, activeFilter === 'in-progress' && styles.activeFilterTabText]}>
              In Progress
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'completed' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('completed')}
          >
            <CheckCircle size={16} color={activeFilter === 'completed' ? '#3B82F6' : '#6B7280'} style={styles.filterTabIcon} />
            <Text style={[styles.filterTabText, activeFilter === 'completed' && styles.activeFilterTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'missed' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('missed')}
          >
            <XCircle size={16} color={activeFilter === 'missed' ? '#3B82F6' : '#6B7280'} style={styles.filterTabIcon} />
            <Text style={[styles.filterTabText, activeFilter === 'missed' && styles.activeFilterTabText]}>
              Missed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.goalsContainer,
          isTablet && styles.goalsContainerTablet
        ]}
        refreshing={isLoading}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading goals...</Text>
          </View>
        ) : renderGoals()}
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
  addButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  filterTabsContainer: {
    paddingRight: 16,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#EBF5FF',
  },
  filterTabIcon: {
    marginRight: 4,
  },
  filterTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  goalsContainer: {
    padding: 16,
  },
  goalsContainerTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});