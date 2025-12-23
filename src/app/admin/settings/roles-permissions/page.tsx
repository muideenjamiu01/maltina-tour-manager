'use client';
import { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { CreateRoleModal } from '@/components/admin/roles/create-role-modal';

export default function FacilitatorDirectoryPage() {
    const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      <AdminHeader
        title="Roles & Permissions"
        subtitle="Manage system roles, permissions, and user access control"
        showFilters={true}
        screenCode="ADM-SEC01"
      />

      <div className="flex-1 overflow-auto p-8 space-y-6">

        {/* Security Banner */}
        <div className="rounded-lg bg-[#8B1D18] px-6 py-4 text-white flex justify-between items-center">
          <div>
            <p className="font-semibold">Logged in as: Campaign Manager</p>
            <p className="text-sm opacity-90">
              Full campaign oversight • Strategic management access
            </p>
          </div>
          <span className="text-sm font-medium">Security Level: Maximum</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Roles List */}
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center justify-between mb-4">
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
              {[
                {
                  name: 'Campaign Manager',
                  desc: 'Full campaign oversight and strategic management',
                  users: 2,
                },
                {
                  name: 'Tour Manager',
                  desc: 'Operational tour management with account creation rights',
                  users: 8,
                  active: true,
                },
                {
                  name: 'RECCE Officer',
                  desc: 'School inspection and verification operations',
                  users: 24,
                },
              ].map((role) => (
                <div
                  key={role.name}
                  className={`rounded-md border p-3 cursor-pointer ${
                    role.active
                      ? 'border-[#F59E0B] bg-[#FFFBEB]'
                      : 'border-[#E5E7EB] bg-white'
                  }`}
                >
                  <p className="font-medium text-[#2B2B2B]">{role.name}</p>
                  <p className="text-xs text-[#9E9E9E]">{role.desc}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    👥 {role.users} users
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Role Details */}
          <div className="lg:col-span-2 rounded-lg border border-[#E5E7EB] bg-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2B2B2B]">
                  Tour Manager
                </h3>
                <p className="text-sm text-[#9E9E9E]">
                  Operational tour management with account creation rights
                </p>
              </div>
              <button className="rounded-md border border-[#E5E7EB] px-3 py-1.5 text-sm">
                Edit
              </button>
            </div>

            {/* Account Privilege */}
            <div className="mb-6 rounded-md bg-[#FFFBEB] border border-[#FDE68A] p-4 text-sm">
              🔒 <strong>Account creation privilege</strong>
              <p className="text-[#92400E] mt-1">
                Can create other Tour Manager accounts and Tour Team members
              </p>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <div className="rounded-md border border-[#E5E7EB] p-4">
                <p className="font-medium mb-2">Campaign Management</p>
                <ul className="text-sm text-[#4B5563] space-y-1">
                  <li>✔ View Campaign Years</li>
                  <li>✔ Edit Campaign Settings</li>
                </ul> 
              </div>

              <div className="rounded-md border border-[#E5E7EB] p-4">
                <p className="font-medium mb-2">Pipeline Operations</p>
                <ul className="text-sm text-[#4B5563] space-y-1">
                  <li>✔ Assign Facilitators</li>
                  <li>✔ Monitor Tour Progress</li>
                  <li>✔ Update Visit Status</li>
                  <li>✔ Generate Reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
      <CreateRoleModal
        open={showCreateRoleModal}
        onClose={() => setShowCreateRoleModal(false)}
      />
    </div>
  );
}
