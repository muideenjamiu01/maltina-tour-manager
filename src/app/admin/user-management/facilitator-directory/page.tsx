import { AdminHeader } from '@/components/admin/admin-header';

export default function FacilitatorDirectoryPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Facilitator Directory"
        subtitle="Manage tour facilitators and assignments"
        showFilters={true}
        screenCode="ADM-USR02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Active Facilitators
            </h3>
            <p className="text-[#9E9E9E]">
              Facilitator directory interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
