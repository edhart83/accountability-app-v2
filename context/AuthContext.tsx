import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/utils/supabase';

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  interests: string[];
  bio: string;
  goals_completed: number;
  days_active: number;
  success_rate: string;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          // Set basic user info immediately
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: '',
            interests: [],
            bio: '',
            goals_completed: 0,
            days_active: 0,
            success_rate: '0%',
            created_at: session.user.created_at,
            updated_at: session.user.created_at,
          });
          setIsAuthenticated(true);
          
          // Fetch full profile asynchronously
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile) {
                setUser(profile);
              }
            });
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.data?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data: { user: authUser }, error: signInError } = await supabase.auth
        .signInWithPassword({
          email: email,
          password: password,
        });

      if (signInError) throw signInError;

      if (authUser) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profileError) throw profileError;
        setUser(profile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
  setIsLoading(true);
  try {
    const {
      data: { user: authUser },
      error: signUpError,
    } = await supabase.auth.signUp({ email, password });

    if (signUpError) throw signUpError;

    if (!authUser) throw new Error('No user returned from signUp.');

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authUser.id,
          name,
          email,
          interests: [],
          bio: '',
          goals_completed: 0,
          days_active: 0,
          success_rate: '0%',
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // Insert dashboard data with initial stats
    const { error: dashboardError } = await supabase
      .from('dashboard_data')
      .insert([{
        id: authUser.id,
        active_goals_count: 0,
        overall_progress: 0,
        stats: {
          streak: 0,
          points: 0,
          level: 1
        },
        recent_activity: []
      }]);

    if (dashboardError) throw dashboardError;

    setUser(profile);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export { useAuth }