import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Shield, Eye, Users, Bell, Globe, Lock } from 'lucide-react-native';

export default function Privacy() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Privacy & Security</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Account Privacy</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Eye size={20} color="#4B5563" />
              <Text style={styles.settingLabel}>Profile Visibility</Text>
            </View>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>Public</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Users size={20} color="#4B5563" />
              <Text style={styles.settingLabel}>Who Can Send You Partner Requests</Text>
            </View>
            <TouchableOpacity style={styles.settingValue}>
              <Text style={styles.settingValueText}>Everyone</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={24} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Activity & Visibility</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={20} color="#4B5563" />
              <View>
                <Text style={styles.settingLabel}>Show Activity Status</Text>
                <Text style={styles.settingDescription}>
                  Let others see when you're active on the platform
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#D1D5DB"
              value={true}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={20} color="#4B5563" />
              <View>
                <Text style={styles.settingLabel}>Private Goals</Text>
                <Text style={styles.settingDescription}>
                  Keep your goals visible only to you and your partners
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#D1D5DB"
              value={false}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={24} color="#10B981" />
            <Text style={styles.sectionTitle}>Security</Text>
          </View>

          <TouchableOpacity style={styles.securityItem}>
            <Text style={styles.securityItemTitle}>Change Password</Text>
            <Text style={styles.securityItemDescription}>
              It's a good idea to use a strong password that you're not using elsewhere
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.securityItem}>
            <Text style={styles.securityItemTitle}>Two-Factor Authentication</Text>
            <Text style={styles.securityItemDescription}>
              Add an extra layer of security to your account
            </Text>
            <View style={styles.securityBadge}>
              <Text style={styles.securityBadgeText}>Recommended</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.securityItem}>
            <Text style={styles.securityItemTitle}>Active Sessions</Text>
            <Text style={styles.securityItemDescription}>
              Review and manage your active login sessions
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginLeft: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    marginTop: 4,
  },
  settingValue: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  settingValueText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  securityItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  securityItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  securityItemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  securityBadge: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  securityBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
  },
  dangerButton: {
    margin: 16,
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
  },
});