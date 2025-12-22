import { AdminHeader } from '@/components/admin/admin-header';

export default function TargetsProgressPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Targets & Progress"
        subtitle="Track campaign targets and achievement progress"
        showFilters={true}
        screenCode="ADM-CAM02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">12</div>
              <p className="text-sm text-[#9E9E9E]">Target Schools</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">8</div>
              <p className="text-sm text-[#9E9E9E]">Completed</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">4</div>
              <p className="text-sm text-[#9E9E9E]">In Progress</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">67%</div>
              <p className="text-sm text-[#9E9E9E]">Achievement Rate</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Progress Tracking
            </h3>
            <p className="text-[#9E9E9E]">
              Targets and progress tracking interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
