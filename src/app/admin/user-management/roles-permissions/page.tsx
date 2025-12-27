'use client'

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { CreateRoleModal } from '@/components/admin/modals/create-role-modal'

/* =====================
   Types & Data
===================== */

type PermissionGroup = {
  category: string
  items: string[]
}

type Role = {
  id: string
  name: string
  desc: string
  users: number
  canCreateAccounts: boolean
  accountNote?: string
  permissions: PermissionGroup[]
}

const ROLES: Role[] = [
  {
    id: 'campaign-manager',
    name: 'Campaign Manager',
    desc: 'Full campaign oversight and strategic management',
    users: 2,
    canCreateAccounts: true,
    accountNote: 'Can create all role accounts across the system',
    permissions: [
      {
        category: 'Campaign Management',
        items: [
          'View Campaign Years',
          'Edit Campaign Settings',
          'Publish Campaigns',
        ],
      },
      {
        category: 'Reporting & Analytics',
        items: ['View Reports', 'Export Data', 'View Dashboards'],
      },
    ],
  },
  {
    id: 'tour-manager',
    name: 'Tour Manager',
    desc: 'Operational tour management with account creation rights',
    users: 8,
    canCreateAccounts: true,
    accountNote:
      'Can create other Tour Manager accounts and Tour Team members',
    permissions: [
      {
        category: 'Campaign Management',
        items: ['View Campaign Years'],
      },
      {
        category: 'Pipeline Operations',
        items: [
          'Assign Facilitators',
          'Monitor Tour Progress',
          'Update Visit Status',
          'Generate Reports',
        ],
      },
    ],
  },
  {
    id: 'recce-officer',
    name: 'RECCE Officer',
    desc: 'School inspection and verification operations',
    users: 24,
    canCreateAccounts: false,
    permissions: [
      {
        category: 'Inspection Operations',
        items: [
          'Submit Inspection',
          'Edit Inspection',
          'Upload Evidence',
        ],
      },
      {
        category: 'School Access',
        items: ['View Assigned Schools'],
      },
    ],
  },
]

/* =====================
   Component
===================== */

export default function FacilitatorDirectoryPage() {
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES[1]) // default

  return (
    <div className="flex h-screen flex-col bg-[#FAFAFA]">
      <AdminHeader
        title="Roles & Permissions"
        subtitle="Manage system roles, permissions, and user access control"
        showFilters
        screenCode="ADM-SEC01"
      />

      <div className="flex-1 overflow-auto p-8 space-y-6">

        {/* Security Banner */}
        <div className="flex items-center justify-between rounded-lg bg-[#8B1D18] px-6 py-4 text-white">
          <div>
            <p className="font-semibold">
              Logged in as: {selectedRole.name}
            </p>
            <p className="text-sm opacity-90">
              {selectedRole.desc}
            </p>
          </div>
          <span className="text-sm font-medium">
            Security Level: {selectedRole.canCreateAccounts ? 'Maximum' : 'Standard'}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { label: 'Total Roles', value: '8', sub: '7 system • 1 custom' },
            { label: 'Total Users', value: '327', sub: 'Across all roles' },
            { label: 'Permission Categories', value: '9', sub: 'System-wide modules' },
            { label: 'Account Creation', value: '1', sub: 'Roles with privilege' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[#E5E7EB] bg-white p-4"
            >
              <p className="text-sm text-[#9E9E9E]">{stat.label}</p>
              <p className="text-2xl font-semibold text-[#2B2B2B]">
                {stat.value}
              </p>
              <p className="text-xs text-[#9E9E9E]">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ROLES LIST */}
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-[#2B2B2B]">System Roles</h3>
              <button
                onClick={() => setShowCreateRoleModal(true)}
                className="rounded-md bg-[#F59E0B] px-4 py-2 text-sm text-white"
              >
                + Create Role
              </button>
            </div>

            <input
              placeholder="Search roles..."
              className="mb-4 w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
            />

            <div className="space-y-2">
              {ROLES.map((role) => {
                const isActive = selectedRole.id === role.id

                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full rounded-md border p-3 text-left transition ${
                      isActive
                        ? 'border-[#F59E0B] bg-[#FFFBEB]'
                        : 'border-[#E5E7EB] bg-white hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-[#2B2B2B]">
                      {role.name}
                    </p>
                    <p className="text-xs text-[#9E9E9E]">
                      {role.desc}
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">
                      👥 {role.users} users
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ROLE DETAILS */}
          <div className="lg:col-span-2 rounded-lg border border-[#E5E7EB] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#2B2B2B]">
                  {selectedRole.name}
                </h3>
                <p className="text-sm text-[#9E9E9E]">
                  {selectedRole.desc}
                </p>
              </div>
              <button className="rounded-md border border-[#E5E7EB] px-3 py-1.5 text-sm">
                Edit
              </button>
            </div>

            {/* Account Privilege */}
            {selectedRole.canCreateAccounts && (
              <div className="mb-6 rounded-md border border-[#FDE68A] bg-[#FFFBEB] p-4 text-sm">
                🔒 <strong>Account creation privilege</strong>
                <p className="mt-1 text-[#92400E]">
                  {selectedRole.accountNote}
                </p>
              </div>
            )}

            {/* Permissions */}
            <div className="space-y-4">
              {selectedRole.permissions.map((group) => (
                <div
                  key={group.category}
                  className="rounded-md border border-[#E5E7EB] p-4"
                >
                  <p className="mb-2 font-medium">
                    {group.category}
                  </p>
                  <ul className="space-y-1 text-sm text-[#4B5563]">
                    {group.items.map((perm) => (
                      <li key={perm}>✔ {perm}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateRoleModal
        open={showCreateRoleModal}
        onClose={() => setShowCreateRoleModal(false)}
      />
    </div>
  )
}
