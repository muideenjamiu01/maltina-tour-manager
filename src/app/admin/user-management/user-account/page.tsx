"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Send, UserPlus ,Shield, Mail, Search } from "lucide-react"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import clsx from "clsx"

import { CreateRoleModal } from "@/components/admin/modals/header-create-role-modal"
import { SendInviteModal } from "@/components/admin/modals/SendInviteModal"
import { CreateUserAccountModal } from "@/components/admin/modals/CreateUserAccountModal"

import { RoleDetailsModal } from "@/components/admin/modals/RoleDetailsModal"
import { RoleUsersModal } from "@/components/admin/modals/RoleUsersModal"

import { ROLES, Role } from "@/components/admin/modals/mockRoles"
import { ROLE_USERS } from "@/components/admin/modals/mockRoleUsers"

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("roles")

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showRoleDetails, setShowRoleDetails] = useState(false)
  const [showRoleUsers, setShowRoleUsers] = useState(false)

  const [openCreateRole, setOpenCreateRole] = useState(false)
  const [openSendInvite, setOpenSendInvite] = useState(false)
  const [openCreateUser, setOpenCreateUser] = useState(false)

  /* =======================
     Role Modal Flow
  ======================= */

  const openRoleDetails = (role: Role) => {
    setSelectedRole(role)
    setShowRoleUsers(false)
    setShowRoleDetails(true)
  }

  const openRoleUsers = () => {
    setShowRoleDetails(false)
    setShowRoleUsers(true)
  }

  const closeAllRoleModals = () => {
    setSelectedRole(null)
    setShowRoleDetails(false)
    setShowRoleUsers(false)
  }
const tabs = [
  { key: "roles", label: "Roles & Permissions", icon: Shield },
  { key: "invites", label: "Invitations", icon: Mail, badge: 2 },
  { key: "create", label: "Create Account", icon: UserPlus },
];
  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] text-[16px]">
      {/* ================= HEADER ================= */}
      <AdminHeader
        title="User Account"
        subtitle="Manage user roles, permissions, and account invitations"
        screenCode="ADM-USR01"
        showFilters={false}
        actionButton={
          activeTab === "roles" ? (
            <Button
              onClick={() => setOpenCreateRole(true)}
              className="h-12 rounded-lg bg-[#F5A623] px-6 text-lg font-semibold text-white"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Role
            </Button>
          ) : activeTab === "invites" ? (
            <Button
              onClick={() => setOpenSendInvite(true)}
              className="h-12 rounded-lg bg-[#F5A623] px-6 text-lg font-semibold text-white"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Invite
            </Button>
          ) : (
            <Button
              onClick={() => setOpenCreateUser(true)}
              className="h-12 rounded-lg bg-[#F5A623] px-6 text-lg font-semibold text-white"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </Button>
          )
        }
      />

      {/* ================= GLOBAL MODALS ================= */}
      <CreateRoleModal open={openCreateRole} onClose={() => setOpenCreateRole(false)} />
      <SendInviteModal open={openSendInvite} onClose={() => setOpenSendInvite(false)} />
      <CreateUserAccountModal open={openCreateUser} onClose={() => setOpenCreateUser(false)} />

      {/* ================= CONTENT ================= */}
     <div className="flex-1 py-10">
  <div className="rounded-2xl border bg-white p-10">
          <Tabs defaultValue="roles" onValueChange={setActiveTab} className="space-y-10">

            {/* ================= TABS ================= */}
           <div className="w-full border-b">
  <TabsList className="h-14 bg-transparent p-0">
  {tabs.map((tab) => {
    const Icon = tab.icon;

    return (
      <TabsTrigger
        key={tab.key}
        value={tab.key}
        className={clsx(
          "h-14 px-8 text-lg font-semibold text-gray-500",
          "flex items-center gap-3",
          "data-[state=active]:text-[#F5A623]"
        )}
      >
        <Icon className="h-5 w-5" />

        <span>{tab.label}</span>

        {tab.badge && (
          <Badge className="ml-2 rounded-sm bg-[#F5A623] text-white">
            {tab.badge}
          </Badge>
        )}
      </TabsTrigger>
    );
  })}
</TabsList>

            </div>

            {/* ================= ROLES ================= */}
            <TabsContent value="roles" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
  {/* Search Input */}
  <div className="relative w-full md:max-w-xl">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <Input
      placeholder="Search roles..."
      className="h-12 w-full border border-gray-200 pl-10 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>

  {/* Type Filter */}
  <select className="h-12 rounded-lg border border-gray-300 px-5 text-base">
    <option>All Types</option>
    <option>System</option>
    <option>Custom</option>
  </select>
</div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => openRoleDetails(role)}
                    className="rounded-xl border p-6 text-left hover:shadow-md"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-semibold">{role.name}</h4>
                      <Badge variant="outline">{role.type}</Badge>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {role.desc}
                    </p>

                    <div className="mt-4 flex justify-between text-sm text-gray-400">
                      <span>
                        {ROLE_USERS[role.id]?.length ?? 0} users
                      </span>
                      <span>{role.permissions.length} permissions</span>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* ================= INVITES ================= */}
           <TabsContent value="invites" className="space-y-10">
  {/* Filters */}
 <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
  {/* Search Input */}
  <div className="relative w-full md:max-w-xl">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <Input
      placeholder="Search invites..."
      className="h-12 w-full border border-gray-200 pl-10 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>

  {/* Status Filter */}
  <select className="h-12 rounded-lg border border-gray-200 px-4 text-base ">
    <option>All Status</option>
    <option>Pending</option>
    <option>Accepted</option>
    <option>Expired</option>
  </select>
</div>


  <p className="text-base text-gray-500 mb-2">
    Showing 2 invitations
  </p>

  {/* Table */}
  <div className="overflow-hidden rounded-2xl border border-gray-200 gap-2 mb-2">
    <table className="w-full table-fixed text-base gap-2 mb-2">
      <thead className="bg-[#F9FAFB] text-gray-600">
        <tr>
          <th className="w-[28%] px-6 py-4 text-left font-semibold">
            Email
          </th>
          <th className="w-[16%] text-left font-semibold">
            Role
          </th>
          <th className="w-[12%] text-left font-semibold">
            Status
          </th>
          <th className="w-[14%] text-left font-semibold">
            Sent By
          </th>
          <th className="w-[12%] text-left font-semibold">
            Sent Date
          </th>
          <th className="w-[10%] text-left font-semibold">
            Expires
          </th>
          <th className="w-[8%] px-6 text-right font-semibold">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {/* ROW */}
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 truncate">
            john.smith@maltina.com
          </td>

          <td>
            <Badge className=" rounded-none bg-orange-800 text-white">
              Campaign Manager
            </Badge>
          </td>

          <td>
            <Badge className=" rounded-none bg-orange-800 text-white">
              Pending
            </Badge>
          </td>

          <td>Admin User</td>
          <td>2025-12-20</td>
          <td>2025-12-27</td>

          {/* Actions */}
          <td className="px-6">
            <div className="flex justify-end gap-3">
              {/* Copy */}
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                  <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {/* Resend */}
              <button className="text-gray-400 hover:text-[#F5A623]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4v6h6" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20v-6h-6" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 9a8 8 0 0 0-14-5M4 15a8 8 0 0 0 14 5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {/* Cancel */}
              <button className="text-gray-400 hover:text-red-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </td>
        </tr>

        {/* ROW */}
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 truncate">
            sarah.jones@agency.com
          </td>

          <td>
            <Badge className="rounded-none bg-green-100 text-green-800">
              RECEE Officer
            </Badge>
          </td>

          <td>
            <Badge className="rounded-none bg-green-100 text-green-800">
              Accepted
            </Badge>
          </td>

          <td>Admin User</td>
          <td>2025-12-15</td>
          <td>2025-12-22</td>

          <td className="px-6 text-right text-gray-400">
            —
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</TabsContent>


            {/* CREATE ACCOUNT */}
            <TabsContent value="create">
              <div className="mx-auto max-w-2xl space-y-8 rounded-2xl border border-gray-200 p-10">
                <h3 className="text-xl font-semibold">
                  Create User Account Manually
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <Input placeholder="First Name" className="h-12 text-base border border-gray-300" />
                  <Input placeholder="Last Name" className="h-12 text-base border border-gray-300" />
                </div>

                <Input placeholder="Email Address" className="h-12 text-base border border-gray-300" />
                <Input placeholder="Phone Number" className="h-12 text-base border border-gray-300" />

                <select className="h-12 w-full rounded-lg border border-gray-300 px-5 text-base">
                  <option>Select role</option>
                  <option>Campaign Manager</option>
                  <option>RECEE Officer</option>
                  <option>Tour Coordinator</option>
                </select>

                <div className="rounded-lg border border-orange-300 bg-orange-50 p-5 text-base text-orange-800">
                  A temporary password will be generated and sent to the user’s
                  email. They will be required to change it on first login.
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" className="h-12 px-6 text-base">
                    Cancel
                  </Button>
                  <Button className="h-12 bg-[#F5A623] px-8 text-lg font-semibold text-white hover:bg-[#e0941f]">
                    Create Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

 {showRoleDetails && selectedRole && (
  <RoleDetailsModal
    role={selectedRole}
    userCount={ROLE_USERS[selectedRole.id]?.length ?? 0}
    onClose={closeAllRoleModals}
    onViewUsers={() => {
      setShowRoleDetails(false)
      setShowRoleUsers(true)
    }}
  />
)}


{/* ================= ROLE USERS MODAL ================= */}
{showRoleUsers && selectedRole && (
  <RoleUsersModal
    roleName={selectedRole.name}
    users={ROLE_USERS[selectedRole.id] || []}
    onClose={closeAllRoleModals}
    onBack={() => {
      setShowRoleUsers(false)
      setShowRoleDetails(true)
    }}
  />
)}


    </div>
  )
}
