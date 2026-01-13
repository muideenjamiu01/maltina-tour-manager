'use client';

import { useState, createContext, useContext } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar/admin-sidebar';
import { ProtectedRoute } from '@/components/auth/protected-route';

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
      <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
        <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
              onClick={() => setSidebarOpen(false)} 
            />
          )}
          
          <AdminSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="flex-1 flex flex-col min-w-0 overflow-y-scroll">
            {children}
          </main>
        </div>
      </SidebarContext.Provider>
    </ProtectedRoute>
  );
}