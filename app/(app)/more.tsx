import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { 
  Book, 
  Lightbulb, 
  FolderArchive, 
  Bell, 
  Shield, 
  CircleHelp as HelpCircle, 
  Star,
  LogOut,
  Settings
} from 'lucide-react-native';

export default function More() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  const menuItems = [
    {
      title: 'Content',
      items: [
        { 
          label: 'Lessons', 
          icon: Book, 
          color: '#8B5CF6', 
          onPress: () => router.push('/lessons') 
        },
        { 
          label: 'Tips', 
          icon: Lightbulb, 
          color: '#F59E0B', 
          onPress: () => router.push('/tips') 
        },
        { 
          label: 'Resources', 
          icon: FolderArchive, 
          color: '#10B981', 
          onPress: () => router.push('/resources') 
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          label: 'Settings',
          icon: Settings,
          color: '#6B7280',
          onPress: () => router.push('/settings')
        },
        { 
          label: 'Notifications', 
          icon: Bell, 
          color: '#EF4444', 
          onPress: () => router.push('/notifications')
        },
        { 
          label: 'Privacy', 
          icon: Shield, 
          color: '#3B82F6', 
          onPress: () => router.push('/privacy')
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { 
          label: 'Help Center', 
          icon: HelpCircle, 
          color: '#8B5CF6', 
          onPress: () => router.push('/help')
        },
        { 
          label: 'Rate App', 
          icon: Star, 
          color: '#F59E0B', 
          onPress: () => {} 
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.itemsRow}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                    <item.icon size={24} color={item.color} />
                  </View>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    marginBottom: 12,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  menuItem: {
    flex: 1,
    minWidth: 100,
    maxWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuItemLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
});