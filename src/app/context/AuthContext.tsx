'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthToken, useAuthActions } from '@convex-dev/auth/react';
import { api } from '../../../convex/_generated/api';
import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from 'convex/react';

// Define the type for our auth context
type AuthContextType = {
  user: Doc<'users'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children, user }: { children: ReactNode, user?: Doc<'users'> }) {
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthToken();

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Update loading state when auth state changes
  useEffect(() => {
    if (token !== undefined) {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    
  }, [user]);

  // Provide the auth context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 