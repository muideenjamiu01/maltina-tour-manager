"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import clsx from "clsx"
import { useState } from "react"
import {
  UserPlus,
  Upload,
  Download,
} from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

const inputClass =
  "h-12 border border-gray-200 bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-0"

const roles = [
  { name: "Campaign Manager", dot: "bg-orange-400" },
  { name: "RECEE Officer", dot: "bg-green-500" },
  { name: "Tour Coordinator", dot: "bg-yellow-400" },
]

export function CreateUserAccountModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<"manual" | "bulk">("manual")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-2xl p-0 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="border-b px-10 py-6">
          <h2 className="text-xl font-semibold">Create User Account</h2>
          <p className="text-sm text-gray-500">
            Add new users and assign roles
          </p>
        </div>

        {/* ================= MODE SELECT ================= */}
        <div className="px-10 pt-6">
          <div className="grid grid-cols-2 gap-4">

            {/* Manual Entry */}
            <button
              onClick={() => setMode("manual")}
              className={clsx(
                "flex items-center gap-4 rounded-xl border p-5 text-left transition",
                mode === "manual"
                  ? "border-[#F5A623] bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#F5A623]">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Manual Entry</p>
                <p className="text-sm text-gray-500">
                  Create a single user account
                </p>
              </div>
            </button>

            {/* Bulk Upload */}
            <button
              onClick={() => setMode("bulk")}
              className={clsx(
                "flex items-center gap-4 rounded-xl border p-5 text-left transition",
                mode === "bulk"
                  ? "border-[#F5A623] bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#F5A623]">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Bulk Upload</p>
                <p className="text-sm text-gray-500">
                  Upload CSV/Excel file
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-10 py-8 max-h-[65vh] overflow-y-auto">

          {/* -------- MANUAL ENTRY -------- */}
          {mode === "manual" && (
            <div className="space-y-8">

              {/* Personal Info */}
              <div>
                <p className="mb-4 font-semibold">Personal Information</p>

                <div className="grid grid-cols-2 gap-6">
                  <Input placeholder="First Name *" className={inputClass} />
                  <Input placeholder="Last Name *" className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <Input placeholder="Email Address *" className={inputClass} />
                  <Input
                    placeholder="Phone Number (Optional)"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Assign Roles */}
              <div>
                <p className="mb-4 font-semibold">Assign Roles *</p>

                <div className="space-y-3">
  {roles.map((role) => (
    <label
      key={role.name}
      className="
        flex items-center gap-4
        rounded-lg border border-gray-200
        px-4 py-3 cursor-pointer
        hover:bg-gray-50
      "
    >
      <Checkbox
        className="
          h-4 w-4 shrink-0
          rounded-[4px]
          border border-gray-400
          data-[state=checked]:border-[#F5A623]
          data-[state=checked]:bg-[#F5A623]
          data-[state=checked]:text-white
          focus-visible:ring-2
          focus-visible:ring-[#F5A623]
          focus-visible:ring-offset-2
        "
      />

      <div className="flex items-center gap-3">
        <span
          className={clsx(
            "h-2.5 w-2.5 rounded-full",
            role.dot
          )}
        />
        <span className="text-sm font-medium text-gray-800">
          {role.name}
        </span>
      </div>
    </label>
  ))}
</div>

              </div>

              <p className="text-xs text-gray-400">
                Account invitation will be valid for 7 days.
              </p>
            </div>
          )}

          {/* -------- BULK UPLOAD -------- */}
          {mode === "bulk" && (
            <div className="space-y-8">

              {/* Download Template */}
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">
                    Download CSV Template First
                  </p>
                  <p className="text-sm text-green-700">
                    Use our template to ensure your data is formatted correctly
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="border-green-400 text-green-700 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>

              {/* Upload Box */}
              <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
                <p className="font-medium text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  CSV or Excel file (max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 border-t px-10 py-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          {mode === "manual" ? (
            <Button className="bg-[#F5A623] hover:bg-[#e0941f] text-white">
              Create Account & Send Invite
            </Button>
          ) : (
            <Button disabled>
              Upload & Create Accounts
            </Button>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}
