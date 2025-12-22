import { AdminHeader } from '@/components/admin/admin-header';

export default function AssignmentPlannerPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Assignment Planner"
        subtitle="Plan and manage school tour assignments"
        showFilters={true}
        screenCode="ADM-SCH04"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Tour Assignments
            </h3>
            <p className="text-[#9E9E9E]">
              Assignment planner interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
