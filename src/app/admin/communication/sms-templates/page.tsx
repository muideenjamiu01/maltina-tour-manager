import { AdminHeader } from '@/components/admin/admin-header';

export default function SmsTemplatesPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="SMS Templates"
        subtitle="Create and manage SMS templates"
        showFilters={true}
        screenCode="ADM-COM03"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              SMS Template Library
            </h3>
            <p className="text-[#9E9E9E]">
              SMS templates interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
