'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

export function AuthWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
} 