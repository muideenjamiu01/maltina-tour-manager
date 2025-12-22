import { AdminHeader } from '@/components/admin/admin-header';

export default function CalendarViewPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Calendar View"
        subtitle="View and manage tour schedules in calendar format"
        showFilters={true}
        screenCode="ADM-BOK02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Tour Calendar
            </h3>
            <p className="text-[#9E9E9E]">
              Calendar view interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
