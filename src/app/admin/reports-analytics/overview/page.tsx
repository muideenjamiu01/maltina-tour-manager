import { AdminHeader } from '@/components/admin/admin-header';

export default function ReportsAnalyticsPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Reports & Analytics"
        subtitle="View comprehensive reports and analytics"
        showFilters={true}
        screenCode="ADM-REP01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">12</div>
              <p className="text-sm text-[#9E9E9E]">Total Schools</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">450</div>
              <p className="text-sm text-[#9E9E9E]">Students Toured</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">28</div>
              <p className="text-sm text-[#9E9E9E]">Facilitators</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">92%</div>
              <p className="text-sm text-[#9E9E9E]">Satisfaction Rate</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Analytics Dashboard
            </h3>
            <p className="text-[#9E9E9E]">
              Reports and analytics interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
