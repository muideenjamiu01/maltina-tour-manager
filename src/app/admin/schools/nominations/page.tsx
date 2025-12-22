import { AdminHeader } from '@/components/admin/admin-header';

export default function NominationsPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Nominations"
        subtitle="Track and manage school nominations"
        showFilters={true}
        screenCode="ADM-SCH02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">8</div>
              <p className="text-sm text-[#9E9E9E]">Pending Review</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">24</div>
              <p className="text-sm text-[#9E9E9E]">Approved</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">3</div>
              <p className="text-sm text-[#9E9E9E]">Rejected</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Recent Nominations
            </h3>
            <p className="text-[#9E9E9E]">
              Nominations management interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
