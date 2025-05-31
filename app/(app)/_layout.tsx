import { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePathname, useRouter, Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Chrome as Home, Target, Blocks, Users, Menu, X } from 'lucide-react-native';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';

export default function AppLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  // Define routes and their respective icons
  const routes = [
    { name: 'dashboard', label: 'Dashboard', icon: Home },
    { name: 'goals', label: 'Goals', icon: Target },
    { name: 'courses', label: 'Courses', icon: Blocks },
    { name: 'partners', label: 'Partners', icon: Users },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isDesktop ? (
        <View style={styles.desktopLayout}>
          <Sidebar 
             routes={routes} 
             activeRoute={pathname.split('/')[2] || 'dashboard'} 
             onLogout={handleLogout}
             isMoreOpen={isMoreOpen}
             setIsMoreOpen={setIsMoreOpen}
          />
          <View style={styles.desktopContent}>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.mobileLayout}>
          <MobileHeader 
            routes={routes}
            activeRoute={pathname.split('/')[2] || 'dashboard'}
          />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: '#3B82F6',
              tabBarInactiveTintColor: '#6B7280',
              tabBarShowLabel: false,
              tabBarItemStyle: styles.tabBarItem,
              tabBarIcon: ({ color, focused }) => {
                const routeName = pathname.split('/')[2] || 'dashboard';
                let Icon = Home;
                
                switch (routeName) {
                  case 'goals':
                    Icon = Target;
                    break;
                  case 'courses':
                    Icon = Blocks;
                    break;
                  case 'partners':
                    Icon = Users;
                    break;
                  case 'more':
                    Icon = isMoreOpen ? X : Menu;
                    break;
                }
                
                return (
                  <View style={styles.tabIconContainer}>
                    <Icon size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                );
              },
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  desktopContent: {
    flex: 1,
  },
  mobileLayout: {
    flex: 1,
  },
  tabBar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    ...(Platform.OS === 'web' && {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    }),
  },
  tabBarItem: {
    height: 48,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
  },
});