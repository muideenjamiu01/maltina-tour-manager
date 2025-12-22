import { AdminHeader } from '@/components/admin/admin-header';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Settings"
        subtitle="Configure system preferences and settings"
        showFilters={false}
        screenCode="ADM-SET01"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              General Settings
            </h3>
            <p className="text-[#9E9E9E]">
              Settings interface will be implemented here.
            </p>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4">
              System Configuration
            </h3>
            <p className="text-[#9E9E9E]">
              System configuration options will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
