import { AdminHeader } from '@/components/admin/admin-header';

export default function CampaignYearsPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Campaign Years"
        subtitle="Manage campaign years and academic schedules"
        showFilters={true}
        screenCode="ADM-C01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Current Campaign: 2024/2025
            </h3>
            <p className="text-[#9E9E9E]">
              Campaign year management interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}