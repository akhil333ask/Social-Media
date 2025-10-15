// src/context/AuthContext.tsx

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/supabase'; 
import { Session } from '@supabase/supabase-js';

// Define the shape of the context value
interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
}

// Create the context with a default value.
// The typo 'Auth-Context-Type' has been fixed to 'AuthContextType'.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChange is the most reliable way to manage session state.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false); 
      }
    );

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    isLoading,
  };

  // We only render the children once the initial loading is complete.
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context.
// Added a check to ensure the context is used within a provider.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};