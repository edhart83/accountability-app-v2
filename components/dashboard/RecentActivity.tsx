import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, Target, Medal, Clock, User } from 'lucide-react-native';

const RecentActivity = () => {
  // Sample data
  const activities = [
    {
      id: '1',
      type: 'goal_completed',
      title: 'Completed "Morning Meditation" goal',
      time: '2 hours ago',
      icon: Check,
      iconColor: '#10B981',
      iconBgColor: '#D1FAE5',
    },
    {
      id: '2',
      type: 'goal_created',
      title: 'Created a new goal "Learn Spanish"',
      time: '5 hours ago',
      icon: Target,
      iconColor: '#3B82F6',
      iconBgColor: '#DBEAFE',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "7-Day Streak" badge',
      time: 'Yesterday',
      icon: Medal,
      iconColor: '#F59E0B',
      iconBgColor: '#FEF3C7',
    },
    {
      id: '4',
      type: 'session_completed',
      title: 'Completed "Time Management" course',
      time: '2 days ago',
      icon: Clock,
      iconColor: '#8B5CF6',
      iconBgColor: '#EDE9FE',
    },
    {
      id: '5',
      type: 'partner_match',
      title: 'Matched with David as accountability partner',
      time: '3 days ago',
      icon: User,
      iconColor: '#EC4899',
      iconBgColor: '#FCE7F3',
    },
  ];

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