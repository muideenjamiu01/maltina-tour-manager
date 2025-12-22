import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminHomePage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Home"
        subtitle="Maltina Tour administration overview"
        showFilters={false}
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-[#2B2B2B] mb-4">
              Welcome to Maltina Tour Admin
            </h2>
            <p className="text-[#9E9E9E]">
              Use the sidebar navigation to manage your tour operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}