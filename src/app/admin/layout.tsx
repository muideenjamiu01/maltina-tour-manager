import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/sidebar/admin-sidebar';

export const metadata: Metadata = {
  title: 'Maltina Tour - Admin Dashboard',
  description: 'Administrative control panel for Maltina Tour management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}