import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, MessageCircle, Target, Award, Clock } from 'lucide-react-native';

export default function PartnerDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Sample partner data
  const partnersData = {
    '1': {
      id: '1',
      name: 'David Wilson',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Passionate about personal development and helping others achieve their goals. Certified life coach with 5 years of experience in productivity coaching.',
      goals: ['Running', 'Learning React'],
      achievements: [
        { id: '1', title: '30-Day Streak', icon: Clock },
        { id: '2', title: 'Goal Master', icon: Target },
        { id: '3', title: 'Top Mentor', icon: Award },
      ],
      nextMeeting: 'Tomorrow, 3:00 PM',
      stats: {
        goalsCompleted: 12,
        daysActive: 45,
        successRate: '87%'
      },
      sharedGoals: [
        {
          id: '1',
          title: 'Complete React Native Course',
          progress: 0.65,
          dueDate: '2025-05-15'
        },
        {
          id: '2',
          title: 'Run 5km Three Times a Week',
          progress: 0.33,
          dueDate: '2025-05-30'
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Fitness enthusiast and language learning advocate. Dedicated to helping others achieve their health and educational goals.',
      goals: ['Weight Training', 'Spanish'],
      achievements: [
        { id: '1', title: 'Fitness Pro', icon: Target },
        { id: '2', title: 'Language Master', icon: Award },
        { id: '3', title: 'Top Motivator', icon: Clock },
      ],
      nextMeeting: 'Friday, 5:30 PM',
      stats: {
        goalsCompleted: 15,
        daysActive: 60,
        successRate: '92%'
      },
      sharedGoals: [
        {
          id: '1',
          title: 'Advanced Spanish Fluency',
          progress: 0.45,
          dueDate: '2025-06-30'
        },
        {
          id: '2',
          title: 'Complete Strength Training Program',
          progress: 0.70,
          dueDate: '2025-04-15'
        }
      ]
    }
  };

  const partner = partnersData[id as string];

  if (!partner) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Partner Not Found</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={[styles.content, styles.centerContent]}>
          <Text style={styles.errorText}>This partner profile does not exist.</Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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
        <Text style={styles.headerTitle}>Partner Profile</Text>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image source={{ uri: partner.image }} style={styles.profileImage} />
          <Text style={styles.name}>{partner.name}</Text>
          <View style={styles.goalTags}>
            {partner.goals.map((goal, idx) => (
              <View key={idx} style={styles.goalTag}>
                <Text style={styles.goalTagText}>{goal}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.bio}>{partner.bio}</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{partner.stats.goalsCompleted}</Text>
            <Text style={styles.statLabel}>Goals Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{partner.stats.daysActive}</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{partner.stats.successRate}</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {partner.achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <achievement.icon size={24} color="#3B82F6" />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sharedGoalsSection}>
          <Text style={styles.sectionTitle}>Shared Goals</Text>
          {partner.sharedGoals.map((goal) => (
            <View key={goal.id} style={styles.sharedGoalCard}>
              <Text style={styles.sharedGoalTitle}>{goal.title}</Text>
              <View style={styles.sharedGoalInfo}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.sharedGoalDate}>
                  Due {formatDate(goal.dueDate)}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${goal.progress * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {Math.round(goal.progress * 100)}% Complete
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.scheduleButton}>
          <Calendar size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Schedule Meeting</Text>
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  messageButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 12,
  },
  goalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  goalTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  goalTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  achievementsSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  achievementsContainer: {
    paddingRight: 16,
  },
  achievementCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  sharedGoalsSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sharedGoalCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sharedGoalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  sharedGoalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sharedGoalDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  scheduleButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});