import { AdminHeader } from '@/components/admin/admin-header';

export default function EmailTemplatesPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Email Templates"
        subtitle="Create and manage email templates"
        showFilters={true}
        screenCode="ADM-COM01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Template Library
            </h3>
            <p className="text-[#9E9E9E]">
              Email templates interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
