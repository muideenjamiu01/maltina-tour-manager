import { AdminHeader } from '@/components/admin/admin-header';

export default function ReceeControlPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="RECEE Control"
        subtitle="Manage RECEE inspection scheduling and coordination"
        showFilters={true}
        screenCode="ADM-REC01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">4</div>
              <p className="text-sm text-[#9E9E9E]">Active Inspections</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">12</div>
              <p className="text-sm text-[#9E9E9E]">Scheduled</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">18</div>
              <p className="text-sm text-[#9E9E9E]">Completed</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Inspection Schedule
            </h3>
            <p className="text-[#9E9E9E]">
              RECEE control interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
