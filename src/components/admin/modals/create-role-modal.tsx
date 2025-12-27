'use client';

type CreateRoleModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateRoleModal({ open, onClose }: CreateRoleModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="text-xl font-semibold text-[#2B2B2B]">
            Create Custom Role
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-8 py-6 space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Role Name
            </label>
            <input
              placeholder="e.g., Regional Coordinator"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-base
                         focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the role’s purpose and responsibilities"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-base
                         focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Clone Permissions From
            </label>
            <select
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-base"
            >
              <option>Start with no permissions</option>
              <option>Campaign Manager</option>
              <option>Tour Manager</option>
              <option>RECCE Officer</option>
            </select>
            <p className="mt-2 text-sm text-[#9E9E9E]">
              You can customize permissions after creating the role
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E5E7EB] px-6 py-3 text-base"
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-[#F59E0B] px-6 py-3 text-base font-semibold text-white hover:bg-[#e58e09]"
          >
            Create Role
          </button>
        </div>

      </div>
    </div>
  );
}
