import { AdminHeader } from '@/components/admin/admin-header';

export default function TourDayControlPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Tour Day Control"
        subtitle="Real-time tour monitoring and control"
        showFilters={true}
        screenCode="ADM-TDC01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#8C1D18] animate-pulse"></div>
            <span className="text-sm font-semibold text-[#8C1D18] ">LIVE</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">5</div>
              <p className="text-sm text-[#9E9E9E]">Active Tours</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">120</div>
              <p className="text-sm text-[#9E9E9E]">Students on Tour</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">8</div>
              <p className="text-sm text-[#9E9E9E]">Active Facilitators</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Live Tour Tracking
            </h3>
            <p className="text-[#9E9E9E]">
              Tour day control interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
