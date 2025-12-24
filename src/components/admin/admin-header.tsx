'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Menu, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showFilters?: boolean;
  screenCode?: string;
  actions?: React.ReactNode;
  onToggleSidebar?: () => void;
}

export function AdminHeader({
  title,
  subtitle,
  showFilters = true,
  screenCode,
  actions,
  onToggleSidebar,
}: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    // Confirm logout action
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      try {
        // Close the dropdown first
        setShowUserMenu(false);
        
        // Call the logout function from auth context
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
        // Fallback: manual cleanup and redirect
        localStorage.clear();
        sessionStorage.clear();
        router.push('/login');
      }
    }
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    router.push('/admin/profile');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    router.push('/admin/settings');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <div className="bg-white border-b border-[#E5E7EB] flex-shrink-0">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 hover:bg-[#F2F1EE] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-[#2B2B2B]" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl lg:text-2xl text-[#2B2B2B]">{title}</h1>
              {screenCode && (
                <span className="px-2 py-1 bg-[#F2F1EE] text-[#9E9E9E] text-xs rounded">
                  {screenCode}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-[#9E9E9E] mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {actions && actions}
          
          {showFilters && (
            <>
              <select className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#2B2B2B] bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
                <option>Campaign 2025</option>
                <option>Campaign 2024</option>
                <option>Campaign 2023</option>
              </select>
              <select className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#2B2B2B] bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
                <option>All States</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </>
          )}

          <button className="p-2 hover:bg-[#F2F1EE] rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-[#9E9E9E]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#8C1D18] rounded-full"></span>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#F2F1EE] rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-[#F5A623] rounded-full flex items-center justify-center">
                <span className="text-sm text-white">
                  {user?.firstName ? user.firstName[0] + (user.lastName?.[0] || '') : 'TM'}
                </span>
              </div>
              <div className="text-sm text-[#2B2B2B] hidden sm:block">
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Tour Manager'}
              </div>
              <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button 
                    onClick={handleProfile}
                    className="w-full px-4 py-2 text-left text-sm text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
                  >
                    <User className="w-4 h-4 text-[#9E9E9E]" />
                    Profile
                  </button>
                  <button 
                    onClick={handleSettings}
                    className="w-full px-4 py-2 text-left text-sm text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4 text-[#9E9E9E]" />
                    Settings
                  </button>
                  <div className="border-t border-[#E5E7EB] my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-[#8C1D18] hover:bg-[#FFF0F0] transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}