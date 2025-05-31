import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/context/AuthContext';
import { Check, Target, Medal, Clock, User } from 'lucide-react-native';

interface Activity {
  id: string;
  type: string;
  title: string;
  time: string;
  icon: any;
  iconColor: string;
  iconBgColor: string;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'goal_completed':
        return { icon: Check, color: '#10B981', bgColor: '#D1FAE5' };
      case 'goal_created':
        return { icon: Target, color: '#3B82F6', bgColor: '#DBEAFE' };
      case 'achievement':
        return { icon: Medal, color: '#F59E0B', bgColor: '#FEF3C7' };
      case 'session_completed':
        return { icon: Clock, color: '#8B5CF6', bgColor: '#EDE9FE' };
      case 'partner_match':
        return { icon: User, color: '#EC4899', bgColor: '#FCE7F3' };
      default:
        return { icon: Clock, color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    try {
      const { data: dashboardData, error } = await supabase
        .from('dashboard_data')
        .select('recent_activity')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (dashboardData?.recent_activity) {
        const formattedActivities = dashboardData.recent_activity.map((activity: any) => {
          const { icon, color, bgColor } = getActivityIcon(activity.type);
          return {
            ...activity,
            icon,
            iconColor: color,
            iconBgColor: bgColor,
          };
        });
        setActivities(formattedActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {activities.map(activity => (
        <View key={activity.id} style={styles.activityItem}>
          <View 
            style={[
              styles.iconContainer, 
              { backgroundColor: activity.iconBgColor }
            ]}
          >
            <activity.icon size={16} color={activity.iconColor} />
          </View>
          
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});

export default RecentActivity;