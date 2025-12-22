import { AdminHeader } from '@/components/admin/admin-header';

export default function AttendanceTrackingPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Attendance Tracking"
        subtitle="Monitor student and facilitator attendance"
        showFilters={true}
        screenCode="ADM-TDC02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Attendance Records
            </h3>
            <p className="text-[#9E9E9E]">
              Attendance tracking interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
