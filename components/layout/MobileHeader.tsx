import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu } from 'lucide-react-native';

interface RouteItem {
  name: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

interface MobileHeaderProps {
  routes: RouteItem[];
  activeRoute: string;
  onMenuPress: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ activeRoute, onMenuPress }) => {
  const router = useRouter();
  
  // Get the title based on the active route
  const getTitle = () => {
    switch (activeRoute) {
      case 'dashboard':
        return 'Dashboard';
      case 'goals':
        return 'Goals';
      case 'courses':
        return 'Courses';
      case 'partners':
        return 'Partners';
      case 'more':
        return 'More';
      default:
        return 'Accountable';
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{getTitle()}</Text>
      </View>
      
      <TouchableOpacity style={styles.profileButton}>
        <Image 
          source={{ uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" }} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuButton: {
    padding: 8,
  },
  titleContainer: {
    // Removed flex: 1 to prevent unnecessary space expansion
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
});

export default MobileHeader;