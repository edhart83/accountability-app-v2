import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // If authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }

  // If not authenticated and not loading, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  // While checking authentication status, show loading indicator
  return (
    Platform.OS === 'web' ? null : (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
  },
});