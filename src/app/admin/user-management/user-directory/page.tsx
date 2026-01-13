'use client'
import { useState } from 'react';
import { Search, Plus, Download, Mail, Edit2, Shield, CheckCircle, XCircle, Clock, AlertTriangle, MoreVertical, RefreshCw, Lock, Unlock } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"
import { CreateUserAccountModal } from "@/components/admin/modals/CreateUserAccountModal"
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast'
import { Role, User } from '@/types/user-directory.types';

export default function UserDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterAccountStatus, setFilterAccountStatus] = useState('all');
  const [filterActivationStatus, setFilterActivationStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState<'name' | 'email' | 'dateCreated' | 'lastLogin'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const allRoles = [
    'Super Administrator',
    'Campaign Manager',
    'Operations Lead',
    'Inspector',
    'Agency Coordinator',
    'Data Analyst',
    'Content Manager',
    'Regional Manager'
  ];
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

  const users: User[] = [
    {
      id: 'U001',
      name: 'Adebayo Johnson',
      email: 'adebayo.j@maltina.com',
      roles: ['Super Administrator'],
      accountStatus: 'active',
      activationStatus: 'activated',
      dateCreated: '2024-01-15',
      lastLogin: '2025-01-22 14:23',
      createdBy: 'System'
    },
    {
      id: 'U002',
      name: 'Chioma Okonkwo',
      email: 'chioma.o@maltina.com',
      roles: ['Campaign Manager', 'Operations Lead'],
      accountStatus: 'active',
      activationStatus: 'activated',
      dateCreated: '2024-02-10',
      lastLogin: '2025-01-22 09:15',
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'U003',
      name: 'Emeka Nwankwo',
      email: 'emeka.n@maltina.com',
      roles: ['Inspector', 'Regional Manager'],
      accountStatus: 'active',
      activationStatus: 'activated',
      dateCreated: '2024-03-05',
      lastLogin: '2025-01-21 16:45',
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'U004',
      name: 'Fatima Abubakar',
      email: 'fatima.a@maltina.com',
      roles: ['Agency Coordinator'],
      accountStatus: 'active',
      activationStatus: 'pending',
      dateCreated: '2025-01-20',
      lastLogin: null,
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'U005',
      name: 'Oluwaseun Adeleke',
      email: 'oluwaseun.a@maltina.com',
      roles: ['Data Analyst', 'Content Manager'],
      accountStatus: 'active',
      activationStatus: 'activated',
      dateCreated: '2024-06-12',
      lastLogin: '2025-01-22 11:30',
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'U006',
      name: 'Ngozi Eze',
      email: 'ngozi.e@maltina.com',
      roles: ['Inspector'],
      accountStatus: 'inactive',
      activationStatus: 'activated',
      dateCreated: '2024-05-20',
      lastLogin: '2024-12-15 08:20',
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'U007',
      name: 'Ibrahim Yusuf',
      email: 'ibrahim.y@maltina.com',
      roles: ['Regional Manager'],
      accountStatus: 'active',
      activationStatus: 'pending',
      dateCreated: '2025-01-22',
      lastLogin: null,
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'U008',
      name: 'Blessing Okafor',
      email: 'blessing.o@maltina.com',
      roles: ['Agency Coordinator', 'Operations Lead'],
      accountStatus: 'active',
      activationStatus: 'activated',
      dateCreated: '2024-04-18',
      lastLogin: '2025-01-22 13:50',
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'U009',
      name: 'Tunde Bakare',
      email: 'tunde.b@maltina.com',
      roles: ['Content Manager'],
      accountStatus: 'active',
      activationStatus: 'pending',
      dateCreated: '2025-01-19',
      lastLogin: null,
      createdBy: 'Oluwaseun Adeleke'
    },
    {
      id: 'U010',
      name: 'Amina Mohammed',
      email: 'amina.m@maltina.com',
      roles: ['Inspector'],
      accountStatus: 'inactive',
      activationStatus: 'activated',
      dateCreated: '2024-08-22',
      lastLogin: '2024-11-30 14:10',
      createdBy: 'Emeka Nwankwo'
    }
  ];

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.roles.includes(filterRole);
      const matchesAccountStatus = filterAccountStatus === 'all' || user.accountStatus === filterAccountStatus;
      const matchesActivationStatus = filterActivationStatus === 'all' || user.activationStatus === filterActivationStatus;

      return matchesSearch && matchesRole && matchesAccountStatus && matchesActivationStatus;
    })
    .sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      if (sortColumn === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortColumn === 'email') {
        aValue = a.email;
        bValue = b.email;
      } else if (sortColumn === 'dateCreated') {
        aValue = a.dateCreated;
        bValue = b.dateCreated;
      } else if (sortColumn === 'lastLogin') {
        aValue = a.lastLogin || '';
        bValue = b.lastLogin || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calculate summary stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.accountStatus === 'active').length;
  const pendingActivation = users.filter(u => u.activationStatus === 'pending').length;
  const inactiveUsers = users.filter(u => u.accountStatus === 'inactive').length;

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: typeof sortColumn }) => {
    if (sortColumn !== column) return null;
    return (
      <span className="ml-1 text-[#F5A623]">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const handleResendActivationEmail = (user: User) => {
    toast.success(`Activation email resent to ${user.email}`, {
      description: 'The user will receive a new activation link within a few minutes.',
    });
    setSelectedUser(null);
  };

  const handleResetPassword = (user: User) => {
    toast.success(`Password reset email sent to ${user.email}`, {
      description: 'The user will receive instructions to reset their password.',
    });
    setSelectedUser(null);
  };

  const handleToggleAccountStatus = (user: User) => {
    const newStatus = user.accountStatus === 'active' ? 'inactive' : 'active';
    toast.success(`Account ${newStatus === 'active' ? 'activated' : 'deactivated'}`, {
      description: `${user.name}'s account has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="User Directory"
        subtitle="Manage system users, roles, and account access"
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Users</span>
              <Shield className="w-4 h-4 text-[#2B2B2B]" />
            </div>
            <div className="text-[24px] text-[#2B2B2B]">{totalUsers}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Active Accounts</span>
              <CheckCircle className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[24px] text-[#2F6B3C]">{activeUsers}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Pending Activation</span>
              <Clock className="w-4 h-4 text-[#D4A017]" />
            </div>
            <div className="text-[24px] text-[#D4A017]">{pendingActivation}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Inactive Accounts</span>
              <XCircle className="w-4 h-4 text-[#8C1D18]" />
            </div>
            <div className="text-[24px] text-[#8C1D18]">{inactiveUsers}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Search */}
            <div className="col-span-4">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Search Users</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="col-span-3">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {allRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Account Status Filter */}
            <div className="col-span-2">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Account Status</label>
              <select
                value={filterAccountStatus}
                onChange={(e) => setFilterAccountStatus(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Activation Status Filter */}
            <div className="col-span-2">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Activation</label>
              <select
                value={filterActivationStatus}
                onChange={(e) => setFilterActivationStatus(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="activated">Activated</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="col-span-1 flex items-end">
              <button className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Create User Button */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[14px] text-[#9E9E9E]">
            Showing {filteredUsers.length} of {totalUsers} users
          </div>
         <button 
                onClick={() => setShowCreateAccountModal(true)}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
              >
                Create Account
              </button>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    User <SortIcon column="name" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    Email <SortIcon column="email" />
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Roles
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Account Status
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Activation
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('dateCreated')}
                  >
                    Created <SortIcon column="dateCreated" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('lastLogin')}
                  >
                    Last Login <SortIcon column="lastLogin" />
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-[14px] text-[#2B2B2B]">{user.name}</div>
                      <div className="text-[12px] text-[#9E9E9E]">{user.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[14px] text-[#2B2B2B]">{user.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map(role => (
                          <span 
                            key={role}
                            className="px-2 py-0.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[11px] text-[#2B2B2B]"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {user.accountStatus === 'active' ? (
                        <div className="flex items-center gap-1.5 text-[#2F6B3C]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-[13px]">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#8C1D18]">
                          <XCircle className="w-4 h-4" />
                          <span className="text-[13px]">Inactive</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {user.activationStatus === 'activated' ? (
                        <div className="flex items-center gap-1.5 text-[#2F6B3C]">
                          <Lock className="w-4 h-4" />
                          <span className="text-[13px]">Activated</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#D4A017]">
                          <Clock className="w-4 h-4" />
                          <span className="text-[13px]">Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B]">{user.dateCreated}</div>
                      <div className="text-[11px] text-[#9E9E9E]">by {user.createdBy}</div>
                    </td>
                    <td className="px-4 py-3">
                      {user.lastLogin ? (
                        <div className="text-[13px] text-[#2B2B2B]">{user.lastLogin}</div>
                      ) : (
                        <div className="text-[13px] text-[#9E9E9E] italic">Never</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4 text-[#9E9E9E] hover:text-[#F5A623]" />
                        </button>
                        
                        {user.activationStatus === 'pending' && (
                          <button 
                            className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                            title="Resend Activation Email"
                            onClick={() => handleResendActivationEmail(user)}
                          >
                            <Mail className="w-4 h-4 text-[#9E9E9E] hover:text-[#F5A623]" />
                          </button>
                        )}

                        {user.accountStatus === 'active' ? (
                          <button 
                            className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                            title="Deactivate Account"
                            onClick={() => handleToggleAccountStatus(user)}
                          >
                            <Unlock className="w-4 h-4 text-[#9E9E9E] hover:text-[#8C1D18]" />
                          </button>
                        ) : (
                          <button 
                            className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                            title="Activate Account"
                            onClick={() => handleToggleAccountStatus(user)}
                          >
                            <Lock className="w-4 h-4 text-[#9E9E9E] hover:text-[#2F6B3C]" />
                          </button>
                        )}

                        <button 
                          className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        >
                          <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {selectedUser === user.id && (
                        <div className="absolute right-4 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#9E9E9E]" />
                            Manage Roles
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
                            onClick={() => handleResetPassword(user)}
                          >
                            <RefreshCw className="w-4 h-4 text-[#9E9E9E]" />
                            Reset Password
                          </button>
                          <button className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#9E9E9E]" />
                            View Activity Log
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
          <div className="text-[12px] text-[#9E9E9E]">
            <strong className="text-[#2B2B2B]">Account Creation Process:</strong> When you create a new user, an activation email is automatically sent with a secure link to set their password and configure 2FA. Users must complete this process within 7 days. Pending activation accounts can log in but have limited access until 2FA is configured.
          </div>
        </div>
      </div>

      {/* Create User Account Modal */}
       <CreateUserAccountModal
        isOpen={showCreateAccountModal}
        onClose={() => setShowCreateAccountModal(false)}
        availableRoles={roles.map(r => ({ id: r.id, name: r.name, color: r.color }))} 
        onCreateUser={(userData) => {
          console.log('Creating user:', userData);
          toast.success('User created', {
            description: `User account created: ${userData.email}`,
          })
        }}
        onBulkUpload={(file) => {
          console.log('Bulk uploading:', file.name);
          toast.success('Bulk upload', {
            description: `Processing bulk upload: ${file.name}`,
          })
        }}
      />
    </div>
  );
}