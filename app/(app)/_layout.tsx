import { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePathname, useRouter, Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Chrome as Home, Target, Blocks, Users, Menu } from 'lucide-react-native';
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
    { name: 'more', label: 'More', icon: Menu },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isDesktop && (
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
      )}
      {!isDesktop && (
        <View style={styles.mobileLayout}>
          <MobileHeader 
            routes={routes}
            activeRoute={pathname.split('/')[2] || 'dashboard'}
          />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: [styles.tabBar],
              tabBarActiveTintColor: '#3B82F6',
              tabBarInactiveTintColor: '#9CA3AF',
              tabBarShowLabel: true,
              tabBarItemStyle: styles.tabBarItem,
            }}
          >
            <Tabs.Screen
              name="dashboard/index"
              options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Home size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="goals"
              options={{
                tabBarLabel: 'Goals',
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Target size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="courses"
              options={{
                tabBarLabel: 'Courses',
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Blocks size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="partners/index"
              options={{
                tabBarLabel: 'Partners',
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Users size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="more/index"
              options={{
                tabBarLabel: 'More',
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Menu size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }}
            />
          </Tabs>
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
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabBarItem: {
    height: 48,
    paddingTop: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    marginBottom: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
  },
});