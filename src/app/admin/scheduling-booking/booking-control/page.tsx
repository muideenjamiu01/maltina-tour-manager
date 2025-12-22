import { AdminHeader } from '@/components/admin/admin-header';

export default function BookingControlPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Booking Control"
        subtitle="Manage tour bookings and availability"
        showFilters={true}
        screenCode="ADM-BOK01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">24</div>
              <p className="text-sm text-[#9E9E9E]">Total Bookings</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">18</div>
              <p className="text-sm text-[#9E9E9E]">Confirmed</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">6</div>
              <p className="text-sm text-[#9E9E9E]">Pending</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Recent Bookings
            </h3>
            <p className="text-[#9E9E9E]">
              Booking control interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
