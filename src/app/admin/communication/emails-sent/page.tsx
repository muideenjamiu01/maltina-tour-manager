import { AdminHeader } from '@/components/admin/admin-header';

export default function EmailsSentPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Emails Sent"
        subtitle="View email history and delivery status"
        showFilters={true}
        screenCode="ADM-COM02"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">245</div>
              <p className="text-sm text-[#9E9E9E]">Total Sent</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">98%</div>
              <p className="text-sm text-[#9E9E9E]">Delivery Rate</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">5</div>
              <p className="text-sm text-[#9E9E9E]">Failed</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              Email History
            </h3>
            <p className="text-[#9E9E9E]">
              Email history interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
