"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Role } from "./mockRoles"

type Props = {
  role: Role
  userCount: number
  onClose: () => void
  onViewUsers: () => void
}

export function RoleDetailsModal({
  role,
  userCount,
  onClose,
  onViewUsers,
}: Props) {
  return (
    <Modal>
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {role.name}
          </h3>
          <p className="text-sm text-gray-500">
            {role.desc}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {role.type}
          </Badge>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="rounded-xl border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Users</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {userCount}
          </p>
        </div>

        <div className="rounded-xl border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Permissions</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {role.permissions.length}
          </p>
        </div>
      </div>

      {/* ===== Permissions ===== */}
      <div className="mt-8 space-y-3">
        <p className="text-sm font-semibold text-gray-700">
          Permissions
        </p>

        <div className="grid grid-cols-2 gap-3">
          {role.permissions.map((permission) => (
            <div
              key={permission}
              className="rounded-lg border bg-white px-4 py-2 text-sm text-gray-700"
            >
              {permission}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div className="mt-10 flex justify-end gap-4">
        <Button variant="outline" className="h-12 px-6" onClick={onClose}>
          Close
        </Button>

        <Button
          className="h-12 bg-[#F5A623] px-8 font-semibold text-white"
          onClick={onViewUsers}
        >
          View Users
        </Button>
      </div>
    </Modal>
  )
}

/* ============================
   Modal Wrapper
============================ */

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
        {children}
      </div>
    </div>
  )
}
