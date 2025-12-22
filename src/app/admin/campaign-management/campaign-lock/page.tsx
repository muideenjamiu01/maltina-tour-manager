import { AdminHeader } from '@/components/admin/admin-header';

export default function CampaignLockPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Campaign Lock"
        subtitle="Control campaign editing and finalization"
        showFilters={true}
        screenCode="ADM-CAM03"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Campaign Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2B2B2B]">Campaign 2025</p>
                  <p className="text-sm text-[#9E9E9E]">Currently Active</p>
                </div>
                <div className="px-3 py-1 rounded-md bg-[#F5A623] text-white text-sm">
                  Unlocked
                </div>
              </div>
              <p className="text-[#9E9E9E]">
                Campaign lock controls will be implemented here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
