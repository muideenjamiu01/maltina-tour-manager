import { AdminHeader } from '@/components/admin/admin-header';

export default function UserDirectoryPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="User Directory"
        subtitle="Manage system users and their roles"
        showFilters={true}
        screenCode="ADM-USR01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">45</div>
              <p className="text-sm text-[#9E9E9E]">Total Users</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">12</div>
              <p className="text-sm text-[#9E9E9E]">Admins</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">28</div>
              <p className="text-sm text-[#9E9E9E]">Facilitators</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <div className="text-2xl font-bold text-[#2B2B2B]">5</div>
              <p className="text-sm text-[#9E9E9E]">Inspectors</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              User List
            </h3>
            <p className="text-[#9E9E9E]">
              User directory interface will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
