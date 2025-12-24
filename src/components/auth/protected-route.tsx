'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  allowedRoles = ['admin', 'super-admin']
}: ProtectedRouteProps) {
  // Temporarily disabled for development - no authentication required
  // TODO: Re-enable when endpoints are integrated
  return <>{children}</>;

  /* 
  // Original authentication logic - commented out for development
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return; // Still checking authentication status
    }

    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      router.push(redirectTo);
      return;
    }

    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // User doesn't have the required role
      router.push('/unauthorized');
      return;
    }

    // User is authenticated and has the required role
    setShouldRender(true);
  }, [isAuthenticated, isLoading, user, router, redirectTo, allowedRoles]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9E9E9E]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user shouldn't have access
  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
  */
}