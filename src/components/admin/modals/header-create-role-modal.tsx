"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"

interface CreateRoleModalProps {
  open: boolean
  onClose: () => void
}

const PERMISSIONS = [
  "Campaign Management",
  "School Directory Access",
  "RECEE Operations",
  "Tour Scheduling",
  "Competition Management",
  "Form Builder",
]

export function CreateRoleModal({ open, onClose }: CreateRoleModalProps) {
  const [roleColor, setRoleColor] = useState("#F5A623")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl p-0">
        {/* ===== Header ===== */}
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-2xl font-semibold text-[#2B2B2B]">
            Create Custom Role
          </DialogTitle>
          <p className="mt-1 text-base text-gray-500">
            Define a new role with specific permissions
          </p>
        </DialogHeader>

        {/* ===== Body ===== */}
        <div className="space-y-8 px-8 py-8">
          {/* Role Name */}
        <div>
  <label className="block text-lg font-medium text-[#2B2B2B] mb-2">
    Role Name
  </label>

  <Input
    placeholder="e.g. Regional Coordinator"
    className="h-12 text-base border border-gray-300 focus:border-[#F5A623] focus:ring-[#F5A623]"
  />
</div>

          {/* Description */}
         <div>
  <label className="block text-lg font-medium text-[#2B2B2B] mb-2">
    Description
  </label>

  <Input
    placeholder="Describe the role’s responsibilities"
    className="h-12 text-base border border-gray-300 focus:border-[#F5A623] focus:ring-[#F5A623]"
  />
</div>
          {/* Role Color (CUSTOM PICKER) */}
          <div className="space-y-3">
            <label className="text-lg font-medium text-[#2B2B2B]">
              Role Color
            </label>

            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-md border border-gray-300"
                    style={{ backgroundColor: roleColor }}
                  />
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  align="start"
                  className="w-auto p-3"
                >
                  <HexColorPicker
                    color={roleColor}
                    onChange={setRoleColor}
                  />
                </PopoverContent>
              </Popover>

              <span className="text-sm text-gray-500">
                Click to pick a color
              </span>
            </div>
          </div>

          {/* Permissions */}
         <div className="space-y-4">
  <label className="block text-lg font-medium text-[#2B2B2B]">
    Permissions
  </label>

  <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-h-56 overflow-y-auto rounded-xl border border-gray-300 bg-gray-50 p-5">
    {PERMISSIONS.map((perm) => (
      <label
        key={perm}
        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white transition-colors"
      >
        <Checkbox
          className="
            h-5 w-5
            rounded-none
            border border-gray-400
            data-[state=checked]:bg-[#F5A623]
            data-[state=checked]:border-[#F5A623]
          "
        />

        <span className="text-sm font-medium text-gray-700">
          {perm}
        </span>
      </label>
    ))}
  </div>
</div>

        </div>

        {/* ===== Footer ===== */}
        <div className="flex justify-end gap-4 border-t px-8 py-5">
          <Button
            variant="outline"
            className="h-10 px-6"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="h-10 bg-[#F5A623] px-8 text-white hover:bg-[#e0941f]">
            Create Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
