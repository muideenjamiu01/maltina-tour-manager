'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, setAuthTokens, clearAuthTokens } from '@/lib/api/axios-instance';
import { AUTH_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '@/types/user.types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await apiClient.get<User>(AUTH_ENDPOINTS.PROFILE);
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      clearAuthTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );

      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      setAuthTokens({ accessToken, refreshToken });
      
      // Set user state
      setUser(user);

      // Redirect based on role
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        data
      );

      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      setAuthTokens({ accessToken, refreshToken });
      
      // Set user state
      setUser(user);

      // Redirect to appropriate dashboard
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (optional - for token blacklisting)
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear local state and tokens
      clearAuthTokens();
      setUser(null);
      router.push('/login');
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.REFRESH,
        { refreshToken: refreshTokenValue }
      );

      const { user, accessToken, refreshToken: newRefreshToken } = response.data;

      // Update tokens
      setAuthTokens({ accessToken, refreshToken: newRefreshToken });
      
      // Update user state
      setUser(user);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Force logout on refresh failure
      await logout();
    }
  };

  const getRedirectPath = (role: string): string => {
    switch (role) {
      case 'super_admin':
      case 'admin':
        return '/admin/dashboard';
      case 'facilitator':
      case 'inspector':
        return '/admin/home';
      default:
        return '/user/dashboard';
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}