import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome to your Maltina Tour admin dashboard"
        showFilters={true}
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-[#9E9E9E]">
                  Total Schools
                </h3>
              </div>
              <div className="text-2xl font-bold text-[#2B2B2B]">12</div>
              <p className="text-xs text-[#9E9E9E]">+2 from last month</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-[#9E9E9E]">
                  Active Inspections
                </h3>
              </div>
              <div className="text-2xl font-bold text-[#2B2B2B]">4</div>
              <p className="text-xs text-[#9E9E9E]">+1 from last week</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-[#9E9E9E]">
                  Pending Nominations
                </h3>
              </div>
              <div className="text-2xl font-bold text-[#2B2B2B]">8</div>
              <p className="text-xs text-[#9E9E9E]">-3 from yesterday</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-[#9E9E9E]">
                  Tour Bookings
                </h3>
              </div>
              <div className="text-2xl font-bold text-[#2B2B2B]">24</div>
              <p className="text-xs text-[#9E9E9E]">+5 from last week</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Quick Actions
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <button className="rounded-lg border border-[#E5E7EB] bg-white p-4 text-left hover:bg-[#F2F1EE] transition-colors">
                <h4 className="font-medium text-[#2B2B2B]">Add New School</h4>
                <p className="text-sm text-[#9E9E9E] mt-1">
                  Register a new school for the tour program
                </p>
              </button>

              <button className="rounded-lg border border-[#E5E7EB] bg-white p-4 text-left hover:bg-[#F2F1EE] transition-colors">
                <h4 className="font-medium text-[#2B2B2B]">
                  Schedule Inspection
                </h4>
                <p className="text-sm text-[#9E9E9E] mt-1">
                  Plan a new RECEE inspection visit
                </p>
              </button>

              <button className="rounded-lg border border-[#E5E7EB] bg-white p-4 text-left hover:bg-[#F2F1EE] transition-colors">
                <h4 className="font-medium text-[#2B2B2B]">Generate Report</h4>
                <p className="text-sm text-[#9E9E9E] mt-1">
                  Create analytics and progress reports
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}