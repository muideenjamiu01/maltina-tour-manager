"use client"

import React from 'react'
import { X } from 'lucide-react'

type Role = {
  id: string
  name: string
  type?: string
}

export default function CreateCustomRoleModal({
  show,
  onClose,
  roles,
}: {
  show: boolean
  onClose: () => void
  roles: Role[]
}) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[600px] mx-4">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[16px] font-[600] text-[#2B2B2B]">Create Custom Role</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-[500] text-[#2B2B2B] mb-2">Role Name</label>
              <input
                type="text"
                placeholder="e.g., Regional Coordinator"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[500] text-[#2B2B2B] mb-2">Description</label>
              <textarea
                placeholder="Describe the role's purpose and responsibilities"
                rows={3}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] resize-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-[500] text-[#2B2B2B] mb-2">Clone Permissions From</label>
              <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623]">
                <option value="">Start with no permissions</option>
                {roles?.filter(r => r.type === 'system').map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <p className="text-[11px] text-[#9E9E9E] mt-1">You can customize permissions after creating the role</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-[13px]"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[13px] font-[500]">
            Create Role
          </button>
        </div>
      </div>
    </div>
  )
}
