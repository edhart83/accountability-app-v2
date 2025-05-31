import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Trash2,
  ChevronRight 
} from 'lucide-react-native';

export default function Settings() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: true,
    goalReminders: true,
    partnerMessages: true,
    weeklyReports: true,
  });
  
  const [darkMode, setDarkMode] = useState(false);

  const toggleSwitch = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          label: 'Personal Information',
          icon: User,
          action: 'navigate',
          color: '#3B82F6',
        },
        {
          label: 'Notification Preferences',
          icon: Bell,
          action: 'navigate',
          color: '#EF4444',
        },
        {
          label: 'Privacy & Security',
          icon: Shield,
          action: 'navigate',
          color: '#10B981',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          label: 'Dark Mode',
          icon: Moon,
          action: 'switch',
          value: darkMode,
          onToggle: () => setDarkMode(!darkMode),
          color: '#6B7280',
        },
        {
          label: 'Language',
          icon: Globe,
          action: 'navigate',
          value: 'English',
          color: '#8B5CF6',
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          label: 'Delete Account',
          icon: Trash2,
          action: 'button',
          color: '#EF4444',
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => item.action === 'navigate' ? {} : null}
        disabled={item.action === 'switch'}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          <item.icon size={24} color={item.color} />
        </View>
        
        <Text style={styles.settingLabel}>{item.label}</Text>
        
        {item.action === 'navigate' && (
          <>
            {item.value ? (
              <Text style={styles.settingValue}>{item.value}</Text>
            ) : null}
            <ChevronRight size={20} color="#9CA3AF" />
          </>
        )}
        
        {item.action === 'switch' && (
          <Switch
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={item.value ? "#3B82F6" : "#F9FAFB"}
            ios_backgroundColor="#D1D5DB"
            onValueChange={item.onToggle}
            value={item.value}
          />
        )}
        
        {item.action === 'button' && (
          <Text style={[styles.actionText, { color: item.color }]}>Delete</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item)}
                </View>
              ))}
            </View>
          </View>
        ))}
        
        <Text style={styles.versionInfo}>
          Version 1.0.0
        </Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  versionInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginVertical: 32,
  },
});