import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';
import { ChevronRight, Award, Star, Trophy, Calendar } from 'lucide-react-native';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GoalSummary from '@/components/dashboard/GoalSummary';

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Sample data
  const stats = [
    { title: 'Streak', value: '7 days', icon: Calendar },
    { title: 'Goals', value: '3 active', icon: Trophy },
    { title: 'Points', value: '345', icon: Star },
    { title: 'Level', value: '5', icon: Award },
  ];

  const renderStats = () => {
    return stats.map((stat, index) => (
      <View key={index} style={styles.statCard}>
        <stat.icon size={24} color="#8B5CF6" style={styles.statIcon} />
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statTitle}>{stat.title}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.username}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" }} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.progressSection, isTablet && styles.tabletRow]}>
          <View style={[styles.overallProgress, isTablet && styles.tabletHalf]}>
            <Text style={styles.sectionTitle}>Overall Progress</Text>
            <View style={styles.progressContainer}>
              <View style={[
                styles.progressIndicator,
                { width: isDesktop ? 180 : 150, height: isDesktop ? 180 : 150 }
              ]}>
                <Text style={styles.progressPercentage}>72%</Text>
                <Text style={styles.progressLabel}>Complete</Text>
              </View>
            </View>
          </View>

          <View style={[styles.statsContainer, isTablet && styles.tabletHalf]}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              {renderStats()}
            </View>
          </View>
        </View>

        <View style={[styles.goalsSection, isTablet && styles.tabletRow]}>
          <View style={[styles.activeGoals, isTablet && styles.tabletHalf]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Goals</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View all</Text>
                <ChevronRight size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <GoalSummary />
          </View>

          <View style={[styles.recentActivity, isTablet && styles.tabletHalf]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View all</Text>
                <ChevronRight size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <RecentActivity />
          </View>
        </View>

        <View style={styles.partnerSection}>
          <Text style={styles.sectionTitle}>Accountability Partner</Text>
          <TouchableOpacity style={styles.partnerCard}>
            <Image 
              source={{ uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }} 
              style={styles.partnerImage} 
            />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>David Wilson</Text>
              <Text style={styles.partnerStatus}>Next meeting: Tomorrow, 3:00 PM</Text>
            </View>
            <View style={styles.nextMeetingIndicator}>
              <Calendar size={14} color="#4B5563" style={styles.clockIcon} />
              <Text style={styles.nextMeetingText}>24h</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: 48,
    height: 48,
  },
  progressSection: {
    marginBottom: 24,
  },
  tabletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabletHalf: {
    width: '48%',
  },
  overallProgress: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative',
  },
  progressIndicator: {
    borderRadius: 90,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1F2937',
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  goalsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 4,
  },
  activeGoals: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recentActivity: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  partnerSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
  },
  partnerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  partnerStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  nextMeetingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clockIcon: {
    marginRight: 4,
  },
  nextMeetingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
});