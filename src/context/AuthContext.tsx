import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, AdminUser } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isInitialized = false;

    const initializeAuth = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (!isInitialized) {
            console.warn('Auth initialization timeout - setting loading to false');
            setLoading(false);
          }
        }, 5000); // 5 second timeout

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchAdminUser(session.user.id);
        }
        
        isInitialized = true;
        clearTimeout(timeoutId);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        isInitialized = true;
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      console.log('🔄 Auth state changed:', event, session?.user?.email || 'No user');
      console.log('📊 Current loading state:', loading);
      
      // Clear timeout if auth state changes
      if (timeoutId) {
        clearTimeout(timeoutId);
        console.log('⏰ Cleared timeout');
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('👤 User found, fetching admin data...');
        await fetchAdminUser(session.user.id);
      } else {
        console.log('🚪 No user, clearing admin data...');
        setAdminUser(null);
      }
      
      isInitialized = true;
      setLoading(false);
      console.log('✅ Auth state change completed, loading set to false');
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      subscription.unsubscribe();
    };
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching admin user:', error);
        return;
      }

      setAdminUser(data);
    } catch (error) {
      console.error('Error fetching admin user:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    try {
      console.log('🔄 Starting sign out process...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Error signing out:', error);
        return;
      }
      console.log('✅ Sign out completed successfully');
      // Don't manually set state - let onAuthStateChange handle it
    } catch (error) {
      console.error('❌ Error during sign out:', error);
    }
  };

  const value = {
    user,
    adminUser,
    session,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 