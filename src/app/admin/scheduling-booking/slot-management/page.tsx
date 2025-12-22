import { AdminHeader } from '@/components/admin/admin-header';

export default function SlotManagementPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Slot Management"
        subtitle="Configure and manage tour time slots"
        showFilters={true}
        screenCode="ADM-BOK03"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Available Time Slots
            </h3>
            <p className="text-[#9E9E9E]">
              Slot management interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
