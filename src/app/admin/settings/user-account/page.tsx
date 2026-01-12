'use client';
import { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
//import { CreateRoleModal } from '@/components/admin/modals/create-role-modal';

export default function UserAccountManagementPage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'invites' | 'create'>('roles');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      <AdminHeader
        title="User Account"
        subtitle="Manage user roles, permissions, and account invitations"
        showFilters={true}
        screenCode="ADM-SEC01"
      />

      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-6 border-b">
          {[
            { key: 'roles', label: 'Roles & Permissions' },
            { key: 'invites', label: 'Invitations' },
            { key: 'create', label: 'Create Account' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.key
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#6B7280]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ROLES & PERMISSIONS */}
        {activeTab === 'roles' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Roles', value: '8', sub: '7 system • 1 custom' },
                { label: 'Total Users', value: '327', sub: 'Across all roles' },
                { label: 'Permission Categories', value: '9', sub: 'System-wide modules' },
                { label: 'Account Creation', value: '1', sub: 'Roles with privilege' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border bg-white p-4">
                  <p className="text-sm text-[#9E9E9E]">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-[#9E9E9E]">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Roles List */}
              <div className="rounded-lg border bg-white p-4">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">System Roles</h3>
                  <button
                    onClick={() => setShowCreateRoleModal(true)}
                    className="rounded-md bg-[#F59E0B] px-4 py-2 text-sm text-white"
                  >
                    + Create Role
                  </button>
                </div>

                <input
                  placeholder="Search roles..."
                  className="mb-4 w-full rounded-md border px-3 py-2 text-sm"
                />

                <div className="space-y-2">
                  {[{ name: 'Campaign Manager', users: 2 }, { name: 'Tour Manager', users: 8, active: true }, { name: 'RECCE Officer', users: 24 }].map((role) => (
                    <div
                      key={role.name}
                      className={`rounded-md border p-3 cursor-pointer ${role.active ? 'border-[#F59E0B] bg-[#FFFBEB]' : ''}`}
                    >
                      <p className="font-medium">{role.name}</p>
                      <p className="text-xs text-[#6B7280]">👥 {role.users} users</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Details */}
              <div className="lg:col-span-2 rounded-lg border bg-white p-6">
                <h3 className="text-lg font-semibold">Tour Manager</h3>
                <p className="text-sm text-[#9E9E9E] mb-4">Operational tour management with account creation rights</p>

                <div className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] p-4 text-sm mb-6">
                  🔒 <strong>Account creation privilege</strong>
                  <p className="mt-1">Can create Tour Team members</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* INVITATIONS */}
        {activeTab === 'invites' && (
          <div className="rounded-lg border bg-white p-6">
            <div className="flex justify-between mb-4">
              <input className="w-full max-w-md rounded-md border px-3 py-2 text-sm" placeholder="Search invites..." />
              <button className="rounded-md bg-[#F59E0B] px-4 py-2 text-sm text-white">Send Invite</button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>john.smith@maltina.com</span>
                <span className="text-yellow-600">Pending</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>sarah.jones@agency.com</span>
                <span className="text-green-600">Accepted</span>
              </div>
            </div>
          </div>
        )}

        {/* CREATE ACCOUNT */}
        {activeTab === 'create' && (
          <div className="mx-auto max-w-xl rounded-lg border bg-white p-6">
            <h3 className="font-semibold mb-4">Create User Account Manually</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="First Name" />
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Last Name" />
            </div>

            <input className="mb-3 w-full rounded-md border px-3 py-2 text-sm" placeholder="Email Address" />
            <input className="mb-3 w-full rounded-md border px-3 py-2 text-sm" placeholder="Phone Number" />

            <select className="mb-4 w-full rounded-md border px-3 py-2 text-sm">
              <option>Select role</option>
              <option>Campaign Manager</option>
              <option>Tour Manager</option>
            </select>

            <div className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] p-3 text-sm mb-4">
              A temporary password will be generated and sent to the user’s email.
            </div>

            <div className="flex justify-end gap-2">
              <button className="rounded-md border px-4 py-2">Cancel</button>
              <button className="rounded-md bg-[#F59E0B] px-4 py-2 text-white">Create Account</button>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}
