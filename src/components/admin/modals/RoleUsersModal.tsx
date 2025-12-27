"use client"

import { X, ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { RoleUser } from "./mockRoleUsers"

type Props = {
  roleName: string
  users: RoleUser[]
  onClose: () => void
  onBack: () => void
}

export function RoleUsersModal({
  roleName,
  users,
  onClose,
  onBack,
}: Props) {
  return (
    <Modal>
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between border-b pb-4">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mt-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Users – {roleName}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage users assigned to this role
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* ===== Search ===== */}
      <div className="mt-6">
        <Input
          placeholder="Search users"
          className="h-12 w-full border-gray-300 bg-white"
        />
      </div>

      {/* ===== Table ===== */}
      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">User</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Last Login</th>
              <th className="px-6 py-3 text-left font-medium">
                Date Assigned
              </th>
              <th className="px-6 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {u.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {u.email}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <Badge
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs",
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {u.status}
                  </Badge>
                </td>

                {/* Last Login */}
                <td className="px-6 py-4 text-gray-600">
                  {u.lastLogin}
                </td>

                {/* Assigned */}
                <td className="px-6 py-4 text-gray-600">
                  {u.assignedDate}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    {/* Edit */}
                    <button
                      className="text-gray-400 hover:text-[#F5A623]"
                      title="Edit user"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    <button
                      className="text-gray-400 hover:text-red-500"
                      title="Remove user"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
        {children}
      </div>
    </div>
  )
}
