import { create } from 'zustand';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}

interface UserState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  
  // Auth methods
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  
  // Initialize auth state
  initializeAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => {
  const supabase = createClientComponentClient();

  return {
    user: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,

    setUser: (user) => {
      set({ 
        user, 
        isAuthenticated: !!user 
      });
    },

    setProfile: (profile) => {
      set({ profile });
    },

    setLoading: (isLoading) => {
      set({ isLoading });
    },

    signOut: async () => {
      try {
        await supabase.auth.signOut();
        set({ 
          user: null, 
          profile: null, 
          isAuthenticated: false 
        });
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },

    updateProfile: async (updates) => {
      const { user } = get();
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;
        
        set({ profile: data });
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    },

    initializeAuth: async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          set({ 
            user: session.user, 
            isAuthenticated: true 
          });

          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          set({ profile });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        set({ isLoading: false });
      }
    },
  };
});

// Set up auth state listener
if (typeof window !== 'undefined') {
  const supabase = createClientComponentClient();
  
  supabase.auth.onAuthStateChange(async (event, session) => {
    const { setUser, setProfile } = useUserStore.getState();
    
    if (session?.user) {
      setUser(session.user);
      
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setProfile(profile);
    } else {
      setUser(null);
      setProfile(null);
    }
  });
}
