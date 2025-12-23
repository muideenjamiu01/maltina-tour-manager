'use client';

type CreateRoleModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateRoleModal({ open, onClose }: CreateRoleModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-[#2B2B2B]">
            Create Custom Role
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Role Name
            </label>
            <input
              placeholder="e.g., Regional Coordinator"
              className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:ring-1 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe the role’s purpose and responsibilities"
              className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:ring-1 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Clone Permissions From
            </label>
            <select className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm bg-white">
              <option>Start with no permissions</option>
              <option>Campaign Manager</option>
              <option>Tour Manager</option>
              <option>RECCE Officer</option>
            </select>
            <p className="mt-1 text-xs text-[#9E9E9E]">
              You can customize permissions after creating the role
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-[#E5E7EB] px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#F59E0B] px-4 py-2 text-sm text-white"
          >
            Create Role
          </button>
        </div>

      </div>
    </div>
  );
}
