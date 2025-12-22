import { AdminHeader } from '@/components/admin/admin-header';

export default function InspectionReportsPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Inspection Reports"
        subtitle="View and manage RECEE inspection reports"
        showFilters={true}
        screenCode="ADM-REC02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Recent Reports
            </h3>
            <p className="text-[#9E9E9E]">
              Inspection reports interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
