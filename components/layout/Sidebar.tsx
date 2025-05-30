import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Menu, X } from 'lucide-react-native';

interface RouteItem {
  name: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

interface SidebarProps {
  routes: RouteItem[];
  activeRoute: string;
  onLogout: () => void;
  isMoreOpen: boolean;
  setIsMoreOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, activeRoute, onLogout, isMoreOpen, setIsMoreOpen }) => {
  const router = useRouter();

  return (
    <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Accountable</Text>
      </View>

      <ScrollView style={styles.routesContainer}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.routeItem,
              activeRoute === route.name && styles.activeRouteItem,
            ]}
            onPress={() => router.push(`/(app)/${route.name}`)}
          >
            <route.icon
              size={24}
              color={activeRoute === route.name ? '#3B82F6' : '#6B7280'}
            />
            <Text
              style={[
                styles.routeLabel,
                activeRoute === route.name && styles.activeRouteLabel,
              ]}
            >
              {route.label}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={[
            styles.routeItem,
            activeRoute === 'more' && styles.activeRouteItem,
          ]}
          onPress={() => {
            setIsMoreOpen(!isMoreOpen);
            router.push('/(app)/more');
          }}
        >
          {isMoreOpen ? (
            <X size={24} color={activeRoute === 'more' ? '#3B82F6' : '#6B7280'} />
          ) : (
            <Menu size={24} color={activeRoute === 'more' ? '#3B82F6' : '#6B7280'} />
          )}
          <Text
            style={[
              styles.routeLabel,
              activeRoute === 'more' && styles.activeRouteLabel,
            ]}
          >
            More
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
            style={styles.userAvatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    flexDirection: 'column',
    height: '100%',
  },
  logoContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  routesContainer: {
    flex: 1,
    padding: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeRouteItem: {
    backgroundColor: '#EBF5FF',
  },
  routeLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 16,
  },
  activeRouteLabel: {
    color: '#3B82F6',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 8,
  },
});

export default Sidebar;