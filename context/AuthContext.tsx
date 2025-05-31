import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/utils/supabase';

// Define types
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, email: string, password: string) => Promise<void>;
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
            username: '',
            created_at: session.user.created_at,
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

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { data: { user: authUser }, error: signInError } = await supabase.auth
        .signInWithPassword({
          email: username,
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

  const register = async (name: string, username: string, email: string, password: string) => {
  setIsLoading(true);
  try {
    const {
      data: { user: authUser },
      error: signUpError,
    } = await supabase.auth.signUp({ email, password });

    if (signUpError) throw signUpError;

    if (!authUser) throw new Error('No user returned from signUp.');

    // Insert user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authUser.id, // or use 'user_id' if your table is set up that way
          name,
          username,
          email,
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // Insert default dashboard_data (optional)
    const { error: dashboardError } = await supabase
      .from('dashboard_data')
      .insert([{ id: authUser.id }]); // use 'user_id' if needed

    if (dashboardError) console.warn('Optional: failed to insert dashboard data', dashboardError.message);

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