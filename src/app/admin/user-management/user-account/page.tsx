'use client'
import { useState } from 'react';
import { Plus, Search, Shield, UserPlus, Mail, Clock, CheckCircle, XCircle, RefreshCw, Trash2, Edit, Eye, Copy, AlertCircle, Users, UserCheck, ArrowLeft, X } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"
import { CreateUserAccountModal } from "@/components/admin/modals/CreateUserAccountModal"

import type { Role, Invite, RoleUser } from '@/types/user-account.types'

// Toast notification type and hook
interface Toast {
  id: string;
  title: string;
  description: string;
  variant: 'default' | 'destructive';
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: { title: string; description: string; variant?: 'default' | 'destructive' }) => {
    const id = `toast-${Date.now()}`;
    const newToast: Toast = { id, title, description, variant };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toast, toasts, setToasts };
};

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'invites' | 'create-account'>('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showViewRoleModal, setShowViewRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [showRoleUsersModal, setShowRoleUsersModal] = useState(false);
  const { toast, toasts, setToasts } = useToast();


  const roles: Role[] = [
    {
      id: 'ROLE-002',
      name: 'Campaign Manager',
      type: 'system',
      description: 'Manages campaigns, cycles, and competitions',
      color: '#F5A623',
      userCount: 5,
      permissions: [
        'View Campaigns',
        'Create Campaigns',
        'Edit Campaigns',
        'Lock/Unlock Campaigns',
        'Manage Competitions',
        'View Reports'
      ],
      createdBy: 'System',
      createdDate: '2024-01-01'
    },
    {
      id: 'ROLE-003',
      name: 'RECEE Officer',
      type: 'system',
      description: 'Conducts school inspections and submissions',
      color: '#2F6B3C',
      userCount: 24,
      permissions: [
        'View Assigned Schools',
        'Submit Inspection Reports',
        'Upload Photos',
        'Approve/Reject Schools',
        'View History'
      ],
      createdBy: 'System',
      createdDate: '2024-01-01'
    },
    {
      id: 'ROLE-004',
      name: 'Tour Coordinator',
      type: 'custom',
      description: 'Coordinates tour logistics and bookings',
      color: '#D4A017',
      userCount: 8,
      permissions: [
        'View Booking Status',
        'Manage Clusters',
        'Assign Dates',
        'View Tour Calendar',
        'Contact Schools'
      ],
      createdBy: 'Admin User',
      createdDate: '2025-06-15'
    },
    {
      id: 'ROLE-005',
      name: 'Data Analyst',
      type: 'custom',
      description: 'Read-only access to reports and analytics',
      color: '#9E9E9E',
      userCount: 3,
      permissions: [
        'View All Reports',
        'Export Data',
        'View Campaign KPIs',
        'View Competition Analytics'
      ],
      createdBy: 'Admin User',
      createdDate: '2025-08-20'
    },
    {
      id: 'ROLE-006',
      name: 'Competition Judge',
      type: 'custom',
      description: 'Reviews and scores competition entries',
      color: '#F5A623',
      userCount: 12,
      permissions: [
        'View Assigned Entries',
        'Score Submissions',
        'Add Comments',
        'Submit Judgements'
      ],
      createdBy: 'Campaign Manager',
      createdDate: '2025-11-10'
    }
  ];

  const invites: Invite[] = [
    {
      id: 'INV-001',
      email: 'john.smith@maltina.com',
      role: 'Campaign Manager',
      roleColor: '#F5A623',
      status: 'pending',
      sentBy: 'Admin User',
      sentDate: '2025-12-20',
      expiresDate: '2025-12-27',
      inviteLink: 'https://admin.maltina.com/invite/abc123'
    },
    {
      id: 'INV-002',
      email: 'sarah.jones@agency.com',
      role: 'RECEE Officer',
      roleColor: '#2F6B3C',
      status: 'accepted',
      sentBy: 'Admin User',
      sentDate: '2025-12-15',
      expiresDate: '2025-12-22',
      acceptedDate: '2025-12-16',
      inviteLink: 'https://admin.maltina.com/invite/def456'
    },
    {
      id: 'INV-003',
      email: 'michael.brown@maltina.com',
      role: 'Tour Coordinator',
      roleColor: '#D4A017',
      status: 'pending',
      sentBy: 'Campaign Manager',
      sentDate: '2025-12-18',
      expiresDate: '2025-12-25',
      inviteLink: 'https://admin.maltina.com/invite/ghi789'
    },
    {
      id: 'INV-004',
      email: 'expired.user@example.com',
      role: 'Data Analyst',
      roleColor: '#9E9E9E',
      status: 'expired',
      sentBy: 'Admin User',
      sentDate: '2025-12-01',
      expiresDate: '2025-12-08',
      inviteLink: 'https://admin.maltina.com/invite/jkl012'
    },
    {
      id: 'INV-005',
      email: 'revoked.user@example.com',
      role: 'Competition Judge',
      roleColor: '#F5A623',
      status: 'revoked',
      sentBy: 'Campaign Manager',
      sentDate: '2025-12-10',
      expiresDate: '2025-12-17',
      inviteLink: 'https://admin.maltina.com/invite/mno345'
    }
  ];

  const roleUsers: RoleUser[] = [
    {
      id: 'USER-001',
      name: 'John Smith',
      email: 'john.smith@maltina.com',
      status: 'active',
      lastLogin: '2025-12-20 10:30 AM',
      dateAssigned: '2024-01-01'
    },
    {
      id: 'USER-002',
      name: 'Sarah Jones',
      email: 'sarah.jones@agency.com',
      status: 'active',
      lastLogin: '2025-12-16 03:45 PM',
      dateAssigned: '2024-01-01'
    },
    {
      id: 'USER-003',
      name: 'Michael Brown',
      email: 'michael.brown@maltina.com',
      status: 'active',
      lastLogin: '2025-12-18 09:15 AM',
      dateAssigned: '2025-06-15'
    },
    {
      id: 'USER-004',
      name: 'Expired User',
      email: 'expired.user@example.com',
      status: 'inactive',
      lastLogin: '2025-12-01 08:00 AM',
      dateAssigned: '2025-08-20'
    },
    {
      id: 'USER-005',
      name: 'Revoked User',
      email: 'revoked.user@example.com',
      status: 'inactive',
      lastLogin: '2025-12-10 05:30 PM',
      dateAssigned: '2025-11-10'
    }
  ];

  // Filter roles
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || role.type === filterType;
    return matchesSearch && matchesType;
  });

  // Filter invites
  const filteredInvites = invites.filter(invite => {
    const matchesSearch = invite.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invite.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invite.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Invite['status']) => {
    const config = {
      pending: { bg: 'bg-[#D4A017]', text: 'Pending', icon: Clock },
      accepted: { bg: 'bg-[#2F6B3C]', text: 'Accepted', icon: CheckCircle },
      expired: { bg: 'bg-[#9E9E9E]', text: 'Expired', icon: XCircle },
      revoked: { bg: 'bg-[#8C1D18]', text: 'Revoked', icon: XCircle }
    };
    
    const statusConfig = config[status];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`${statusConfig.bg} text-white px-2 py-1 rounded text-[11px] flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {statusConfig.text}
      </span>
    );
  };

  const handleResendInvite = (invite: Invite) => {
    toast({
      title: 'Invite resent',
      description: `Resending invite to ${invite.email}`,
      variant: 'default',
    })
  };

  const handleRevokeInvite = (invite: Invite) => {
    toast({
      title: 'Invite revoked',
      description: `Invitation revoked for ${invite.email}`,
      variant: 'destructive',
    })
  };

  const handleCopyInviteLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied',
      description: 'Invite link copied to clipboard',
      variant: 'default',
    })
  };


  return (
     <div className="min-h-screen bg-white">
      <AdminHeader 
        title="User Account"
        subtitle="Manage user roles, permissions, and account invitations"
        // screenCode="ADM-U02"
        actions={
          <div className="flex items-center gap-2">
            {activeTab === 'roles' && (
              <button 
                onClick={() => setShowCreateRoleModal(true)}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Role
              </button>
            )}
            {activeTab === 'invites' && (
              <button 
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Send Invite
              </button>
            )}
            {activeTab === 'create-account' && (
              <button 
                onClick={() => setShowCreateAccountModal(true)}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Create Account
              </button>
            )}
          </div>
        }
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('roles')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'roles'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <Shield className="w-4 h-4" />
              Roles & Permissions
            </button>
            <button
              onClick={() => setActiveTab('invites')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'invites'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <Mail className="w-4 h-4" />
              Invitations
              <span className="px-2 py-0.5 bg-[#D4A017] text-white rounded-full text-[11px]">
                {invites.filter(i => i.status === 'pending').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('create-account')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'create-account'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </button>
          </div>
        </div>

        {/* ROLES TAB */}
        {activeTab === 'roles' && (
          <>
            {/* Search and Filters */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="system">System Roles</option>
                <option value="custom">Custom Roles</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredRoles.length} roles
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-3 gap-4">
              {filteredRoles.map((role) => (
                <div 
                  key={role.id}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedRole(role);
                    setShowViewRoleModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: role.color + '20' }}
                      >
                        <Shield className="w-5 h-5" style={{ color: role.color }} />
                      </div>
                      <div>
                        <h3 className="text-[14px] text-[#2B2B2B]">{role.name}</h3>
                        <div className="text-[11px] text-[#9E9E9E] capitalize">{role.type}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[12px] text-[#9E9E9E] mb-4 line-clamp-2">{role.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#9E9E9E]">
                      <Users className="w-4 h-4" />
                      {role.userCount} users
                    </div>
                    <div className="text-[11px] text-[#9E9E9E]">
                      {role.permissions.length} permissions
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No roles found</p>
              </div>
            )}
          </>
        )}

        {/* INVITES TAB */}
        {activeTab === 'invites' && (
          <>
            {/* Search and Filters */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invites..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="expired">Expired</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredInvites.length} invitations
            </div>

            {/* Invites Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Sent By</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Sent Date</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Expires</th>
                    <th className="px-4 py-3 text-right text-[11px] text-[#9E9E9E] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvites.map((invite, index) => (
                    <tr key={invite.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{invite.email}</td>
                      <td className="px-4 py-4">
                        <span 
                          className="px-2 py-1 rounded text-[11px] text-white"
                          style={{ backgroundColor: invite.roleColor }}
                        >
                          {invite.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(invite.status)}</td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{invite.sentBy}</td>
                      <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{invite.sentDate}</td>
                      <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{invite.expiresDate}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {invite.status === 'pending' && (
                            <>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyInviteLink(invite.inviteLink);
                                }}
                                className="p-1.5 text-[#9E9E9E] hover:bg-[#F9FAFB] rounded transition-colors"
                                title="Copy Link"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResendInvite(invite);
                                }}
                                className="p-1.5 text-[#F5A623] hover:bg-[#FFF4E6] rounded transition-colors"
                                title="Resend"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRevokeInvite(invite);
                                }}
                                className="p-1.5 text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                                title="Revoke"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {invite.status === 'expired' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResendInvite(invite);
                              }}
                              className="px-3 py-1 text-[12px] text-[#F5A623] hover:bg-[#FFF4E6] rounded transition-colors"
                            >
                              Resend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvites.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No invitations found</p>
              </div>
            )}
          </>
        )}

        {/* CREATE ACCOUNT TAB */}
        {activeTab === 'create-account' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-[16px] text-[#2B2B2B] mb-4">Create User Account Manually</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="john.doe@maltina.com"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Assign Role</label>
                  <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                    <option value="">Select role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-[#FFF4E6] border border-[#F5A623] rounded-lg flex items-start gap-2 text-[12px] text-[#2B2B2B]">
                  <AlertCircle className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                  <div>
                    A temporary password will be generated and sent to the user's email. They will be required to change it on first login.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors">
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">Create Custom Role</h2>
                <p className="text-[13px] text-[#9E9E9E]">Define a new role with specific permissions</p>
              </div>
              <button 
                onClick={() => setShowCreateRoleModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Role Name</label>
                <input
                  type="text"
                  placeholder="e.g. Regional Coordinator"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Description</label>
                <textarea
                  placeholder="Describe the role's responsibilities"
                  rows={3}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Role Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#F5A623"
                    className="w-12 h-10 rounded border border-[#E5E7EB] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#9E9E9E]">Choose a color for the role badge</span>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-4">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Permissions</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {[
                    'Campaign Management',
                    'School Directory Access',
                    'RECEE Operations',
                    'Tour Scheduling',
                    'Competition Management',
                    'Form Builder',
                    'Communication Center',
                    'User Management',
                    'Report Access',
                    'Data Export'
                  ].map((permission) => (
                    <label key={permission} className="flex items-center gap-2 p-2 hover:bg-[#F9FAFB] rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#F5A623]"
                      />
                      <span className="text-[13px] text-[#2B2B2B]">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <button 
                onClick={() => setShowCreateRoleModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors">
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">Send Invitation</h2>
                <p className="text-[13px] text-[#9E9E9E]">Invite a new user to the platform</p>
              </div>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Assign Role</label>
                <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[12px] text-[#9E9E9E]">
                The invitation will expire in 7 days. The user will receive an email with a secure link to set up their account.
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Role Modal */}
      {showViewRoleModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedRole.color + '20' }}
                >
                  <Shield className="w-6 h-6" style={{ color: selectedRole.color }} />
                </div>
                <div>
                  <h2 className="text-[18px] text-[#2B2B2B]">{selectedRole.name}</h2>
                  <p className="text-[13px] text-[#9E9E9E] capitalize">{selectedRole.type} Role</p>
                </div>
              </div>
              <button 
                onClick={() => setShowViewRoleModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] text-[#9E9E9E] mb-1.5">DESCRIPTION</label>
                <p className="text-[13px] text-[#2B2B2B]">{selectedRole.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#9E9E9E] mb-1.5">TOTAL USERS</label>
                  <p className="text-[20px] text-[#2B2B2B]">{selectedRole.userCount}</p>
                </div>
                <div>
                  <label className="block text-[11px] text-[#9E9E9E] mb-1.5">PERMISSIONS</label>
                  <p className="text-[20px] text-[#2B2B2B]">{selectedRole.permissions.length}</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#9E9E9E] mb-2">PERMISSIONS LIST</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRole.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-[#F9FAFB] rounded-lg">
                      <UserCheck className="w-4 h-4 text-[#2F6B3C]" />
                      <span className="text-[12px] text-[#2B2B2B]">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRole.type === 'custom' && (
                <div className="text-[12px] text-[#9E9E9E] pt-3 border-t border-[#E5E7EB]">
                  Created by {selectedRole.createdBy} on {selectedRole.createdDate}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between">
              <div>
                {selectedRole.type === 'custom' && (
                  <button className="px-4 py-2 bg-[#8C1D18] text-white rounded-lg hover:bg-[#6F1713] transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Role
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setShowViewRoleModal(false);
                    setShowRoleUsersModal(true);
                  }}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  View Users ({selectedRole.userCount})
                </button>
                <button 
                  onClick={() => setShowViewRoleModal(false)}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
                >
                  Close
                </button>
                {selectedRole.type === 'custom' && (
                  <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Role
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Users Modal */}
      {showRoleUsersModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => {
                      setShowRoleUsersModal(false);
                      setShowViewRoleModal(true);
                    }}
                    className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#9E9E9E]" />
                  </button>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: selectedRole.color + '20' }}
                  >
                    <Shield className="w-5 h-5" style={{ color: selectedRole.color }} />
                  </div>
                  <div>
                    <h2 className="text-[18px] text-[#2B2B2B]">{selectedRole.name}</h2>
                    <p className="text-[13px] text-[#9E9E9E]">{selectedRole.userCount} users assigned to this role</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowRoleUsersModal(false);
                  setSelectedRole(null);
                }}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">User</th>
                      <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Last Login</th>
                      <th className="px-4 py-3 text-left text-[11px] text-[#9E9E9E] uppercase">Date Assigned</th>
                      <th className="px-4 py-3 text-right text-[11px] text-[#9E9E9E] uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleUsers.map((user, index) => (
                      <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                        <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{user.name}</td>
                        <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{user.email}</td>
                        <td className="px-4 py-4">
                          {user.status === 'active' ? (
                            <span className="px-2 py-1 bg-[#2F6B3C] text-white rounded text-[11px] flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-[#9E9E9E] text-white rounded text-[11px] flex items-center gap-1 w-fit">
                              <XCircle className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{user.lastLogin}</td>
                        <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{user.dateAssigned}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              className="p-1.5 text-[#9E9E9E] hover:bg-[#F9FAFB] rounded transition-colors"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                              title="Remove Role"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {roleUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[14px] text-[#9E9E9E]">No users assigned to this role</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between sticky bottom-0 bg-white">
              <div className="text-[13px] text-[#9E9E9E]">
                Showing {roleUsers.length} users
              </div>
              <button 
                onClick={() => {
                  setShowRoleUsersModal(false);
                  setShowViewRoleModal(true);
                }}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Back to Role Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Account Modal */}
      <CreateUserAccountModal
        isOpen={showCreateAccountModal}
        onClose={() => setShowCreateAccountModal(false)}
        availableRoles={roles.map(r => ({ id: r.id, name: r.name, color: r.color }))} 
        onCreateUser={(userData) => {
          console.log('Creating user:', userData);
          toast({
            title: 'User created',
            description: `User account created: ${userData.email}`,
            variant: 'default',
          })
        }}
        onBulkUpload={(file) => {
          console.log('Bulk uploading:', file.name);
          toast({
            title: 'Bulk upload',
            description: `Processing bulk upload: ${file.name}`,
            variant: 'default',
          })
        }}
      />

      {/* Toast Notifications - Uniform UI */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right transition-all ${
              notification.variant === 'destructive'
                ? 'bg-[#8C1D18] border-[#6F1713] text-white'
                : 'bg-[#2F6B3C] border-[#265A2F] text-white'
            }`}
          >
            {notification.variant === 'destructive' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[13px]">{notification.title}</p>
              <p className="text-[12px] opacity-90 mt-0.5">{notification.description}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== notification.id))}
              className="flex-shrink-0 hover:opacity-75 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}