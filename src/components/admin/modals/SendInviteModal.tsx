"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SendInviteModalProps {
  open: boolean
  onClose: () => void
}

export function SendInviteModal({ open, onClose }: SendInviteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl p-0">
        {/* ===== Header ===== */}
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-xl font-semibold text-[#2B2B2B]">
            Send Invitation
          </DialogTitle>
          <p className="mt-1 text-sm text-gray-500">
            Invite a new user to the platform
          </p>
        </DialogHeader>

        {/* ===== Body ===== */}
        <div className="space-y-6 px-8 py-6">
          {/* Email */}
        <div className="space-y-3">
  <label className="block text-base font-medium text-[#2B2B2B]">
    Email Address
  </label>

  <Input
    placeholder="user@example.com"
    className="
      h-12
      text-base
      border border-gray-300
      focus:border-[#F5A623]
      focus:outline-none
      focus:ring-0
      focus-visible:ring-0
    "
  />
</div>


          {/* Role */}
        <div className="space-y-3">
  <label className="block text-base font-medium text-[#2B2B2B]">
    Assign Role
  </label>

  <Select>
    <SelectTrigger
      className="
        h-12
        text-base
        border border-gray-300
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus:border-[#F5A623]
      "
    >
      <SelectValue placeholder="Select role" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="recee">RECEE Officer</SelectItem>
      <SelectItem value="campaign">Campaign Manager</SelectItem>
      <SelectItem value="tour">Tour Coordinator</SelectItem>
    </SelectContent>
  </Select>
</div>

          {/* Info box */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            The invitation will expire in <strong>7 days</strong>. The user
            will receive an email with a secure link to set up their account.
          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className="flex justify-end gap-3 border-t px-8 py-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#F5A623] px-6 text-white hover:bg-[#e0941f]">
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
