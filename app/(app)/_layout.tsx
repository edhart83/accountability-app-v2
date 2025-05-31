import { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Tabs } from 'expo-router';
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
      {isDesktop && (
        <Sidebar 
          routes={routes} 
          activeRoute={pathname.split('/')[2] || 'dashboard'} 
          onLogout={handleLogout}
          isMoreOpen={isMoreOpen}
          setIsMoreOpen={setIsMoreOpen}
        />
      )}
      {!isDesktop && (
        <MobileHeader 
          routes={routes}
          activeRoute={pathname.split('/')[2] || 'dashboard'}
        />
      )}
      <View style={isDesktop ? styles.desktopContent : styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : styles.tabBar,
            ...((!isDesktop) && {
              tabBarActiveTintColor: '#3B82F6',
              tabBarInactiveTintColor: '#6B7280',
              tabBarShowLabel: false,
              tabBarItemStyle: styles.tabBarItem,
            }),
          }}
        >
          <Tabs.Screen
            name="dashboard/index"
            options={{
              ...((!isDesktop) && {
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Home size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }),
            }}
          />
          <Tabs.Screen
            name="goals"
            options={{
              ...((!isDesktop) && {
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Target size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }),
            }}
          />
          <Tabs.Screen
            name="courses"
            options={{
              ...((!isDesktop) && {
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Blocks size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }),
            }}
          />
          <Tabs.Screen
            name="partners/index"
            options={{
              ...((!isDesktop) && {
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    <Users size={24} color={color} />
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }),
            }}
          />
          <Tabs.Screen
            name="more/index"
            options={{
              ...((!isDesktop) && {
                tabBarIcon: ({ color, focused }) => (
                  <View style={styles.tabIconContainer}>
                    {isMoreOpen ? (
                      <X size={24} color={color} />
                    ) : (
                      <Menu size={24} color={color} />
                    )}
                    {focused && <View style={styles.activeIndicator} />}
                  </View>
                ),
              }),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  desktopContent: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarItem: {
    height: 48,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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