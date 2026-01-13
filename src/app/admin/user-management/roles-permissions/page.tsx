'use client'
import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Shield, Users, Edit, Check, X, ChevronRight, Trash2, Copy, Smartphone, Eye, EyeOff, Lock, Unlock, AlertCircle, Loader, BarChart3, Wrench, BookOpen } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header'
import { Toast, Role, PermissionKey, PERMISSION_CATALOG } from '../../../../types/roles-permissions.types';

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState<string | null>('tour-supervisor');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [permissions, setPermissions] = useState(PERMISSION_CATALOG);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, addToast, removeToast } = useToast();
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'tour-supervisor',
      name: 'Tour Supervisor',
      description: 'Field lead for school day — controls the session, manages facilitators, and monitors surveys',
      userCount: 36,
      type: 'system',
      color: '#F5A623',
      pwaName: 'School Tour PWA',
      icon: <Shield className="w-5 h-5" />,
      canCreateAccounts: false,
      summary: 'Control tower for one school session',
    },
    {
      id: 'tour-analyst',
      name: 'Tour Analyst',
      description: 'Data collector locked behind Supervisor start/unlock — fills surveys only',
      userCount: 48,
      type: 'system',
      color: '#2F6B3C',
      pwaName: 'School Tour PWA',
      icon: <BarChart3 className="w-5 h-5" />,
      canCreateAccounts: false,
      summary: 'Survey runner, waits for supervisor activation',
    },
    {
      id: 'recee-officer',
      name: 'RECEE Officer',
      description: 'School inspection and verification — separate lane, approve or reject schools for tour',
      userCount: 24,
      type: 'system',
      color: '#8C1D18',
      pwaName: 'RECEE PWA',
      icon: <Wrench className="w-5 h-5" />,
      canCreateAccounts: false,
      summary: 'Inspections only, separate lane',
    },
    {
      id: 'facilitator',
      name: 'Facilitator',
      description: 'Assigned schools only — read-only access plus messaging to supervisor',
      userCount: 245,
      type: 'system',
      color: '#D4A017',
      pwaName: 'Facilitator PWA',
      icon: <Users className="w-5 h-5" />,
      canCreateAccounts: false,
      summary: 'View assigned schools + messaging',
    },
    {
      id: 'judge',
      name: 'Judge',
      description: 'Competition designs only — totally walled off from tour operations',
      userCount: 12,
      type: 'system',
      color: '#2F6B3C',
      pwaName: 'Judge PWA',
      icon: <BookOpen className="w-5 h-5" />,
      canCreateAccounts: false,
      summary: 'Designs only, no tour access',
    },
  ]);

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/roles-permissions?action=list');
        const result = await response.json();
        
        if (result.success && result.data) {
          // Merge with local UI data (userCount, color, etc.)
          const mergedRoles = roles.map(localRole => {
            const apiRole = result.data.find((r: any) => r.id === localRole.id);
            return apiRole ? { ...localRole, ...apiRole } : localRole;
          });
          setRoles(mergedRoles);
          addToast('Roles loaded successfully', 'success');
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        addToast('Failed to load roles. Using local data.', 'warning');
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate API call - actual call would happen here
    // fetchRoles();
    
    // For now, just use local data
    setIsLoading(false);
  }, []);

  const selectedRoleData = roles.find(r => r.id === selectedRole);
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  const togglePermission = (category: string, permissionId: string) => {
    if (!editMode || !selectedRole) return;

    setPermissions(prev => {
      const roleCopy = { ...prev };
      const rolePermissions = roleCopy[selectedRole as PermissionKey];
      if (!rolePermissions) return prev;

      const categoryCopy = { ...rolePermissions };
      const categoryPermissions = categoryCopy[category as keyof typeof rolePermissions] as any[];
      
      (categoryCopy as any)[category] = categoryPermissions.map((p: any) =>
        p.id === permissionId ? { ...p, enabled: !p.enabled } : p
      );

      return {
        ...roleCopy,
        [selectedRole]: categoryCopy,
      };
    });
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    
    try {
      setIsSaving(true);
      const response = await fetch('/api/roles-permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updatePermissions',
          roleId: selectedRole,
          permissions: permissions[selectedRole as PermissionKey],
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        addToast('Permissions saved successfully!', 'success');
        setEditMode(false);
      } else {
        addToast(result.message || 'Failed to save permissions', 'error');
      }
    } catch (error) {
      console.error('Error saving permissions:', error);
      addToast('An error occurred while saving permissions', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateRole = async (formData: any) => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/roles-permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          role: {
            ...formData,
            userCount: 0,
            type: 'custom',
          },
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setRoles([...roles, result.data]);
        addToast('Role created successfully!', 'success');
        setShowCreateModal(false);
      } else {
        addToast(result.message || 'Failed to create role', 'error');
      }
    } catch (error) {
      console.error('Error creating role:', error);
      addToast('An error occurred while creating the role', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const permissionsByRole = selectedRole ? permissions[selectedRole as PermissionKey] : null;

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.pwaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader
        title="External User Management"
        subtitle="Manage PWA roles, permissions, and field team access control"
       
      />

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-[13px] flex items-center gap-2 animate-in slide-in-from-right shadow-lg ${
              toast.type === 'success' ? 'bg-[#2F6B3C] text-white' :
              toast.type === 'error' ? 'bg-[#8C1D18] text-white' :
              toast.type === 'warning' ? 'bg-[#D4A017] text-white' :
              'bg-[#F5A623] text-white'
            }`}
          >
            {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {toast.type === 'success' && <Check className="w-4 h-4" />}
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        
        {/* Loading State */}
        {isLoading && (
          <div className="mb-6 p-4 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-lg flex items-center gap-3">
            <Loader className="w-5 h-5 text-[#F5A623] animate-spin" />
            <div>
              <div className="text-[13px] font-medium text-[#2B2B2B]">Loading roles...</div>
              <div className="text-[11px] text-[#9E9E9E]">Fetching data from the server</div>
            </div>
          </div>
        )}
        
        {/* Role Banner */}
        <div className="mb-6 p-4 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#F5A623]" />
            <div>
              <div className="text-[13px] font-medium text-[#2B2B2B]">Super Admin: External User Management</div>
              <div className="text-[11px] text-[#9E9E9E] mt-0.5">Create roles, assign permissions, control PWA access</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <Smartphone className="w-4 h-4 text-[#F5A623]" />
            <span className="text-[#9E9E9E]">{roles.length} PWA Roles</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[11px] text-[#9E9E9E] uppercase tracking-wide mb-1">Total Roles</div>
            <div className="text-[24px] font-semibold text-[#2B2B2B]">{roles.length}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">External users</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[11px] text-[#9E9E9E] uppercase tracking-wide mb-1">Total Users</div>
            <div className="text-[24px] font-semibold text-[#2B2B2B]">{totalUsers}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Across all roles</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[11px] text-[#9E9E9E] uppercase tracking-wide mb-1">Tour Supervisors</div>
            <div className="text-[24px] font-semibold text-[#2B2B2B]">36</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Session controllers</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[11px] text-[#9E9E9E] uppercase tracking-wide mb-1">Facilitators</div>
            <div className="text-[24px] font-semibold text-[#2B2B2B]">245</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Field team</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[11px] text-[#9E9E9E] uppercase tracking-wide mb-1">RECEE Officers</div>
            <div className="text-[24px] font-semibold text-[#2B2B2B]">24</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Inspectors</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel: Roles List */}
          <div className="col-span-4">
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <h2 className="text-[15px] font-semibold text-[#2B2B2B]">External Roles</h2>
                  <p className="text-[12px] text-[#9E9E9E] mt-0.5">{roles.length} PWA roles • {totalUsers} users</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[12px]"
                >
                  <Plus className="w-4 h-4" />
                  Create
                </button>
              </div>

              <div className="p-3">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div className="divide-y divide-[#E5E7EB] max-h-[700px] overflow-y-auto">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setEditMode(false);
                      }}
                      className={`px-5 py-4 cursor-pointer transition-all ${
                        selectedRole === role.id 
                          ? 'bg-[#F5A623]/5 border-l-4 border-[#F5A623]' 
                          : 'hover:bg-[#F9FAFB]'
                      }`}
                    >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                         
                          <span className="text-[13px] font-semibold text-[#2B2B2B] truncate">{role.name}</span>
                        </div>
                        <p className="text-[11px] text-[#9E9E9E] mb-2 line-clamp-2">{role.summary}</p>
                        <div className="flex items-center gap-3 text-[11px]">
                          <div className="flex items-center gap-1.5 text-[#9E9E9E]">
                            <Users className="w-3.5 h-3.5" />
                            <span className="font-medium">{role.userCount}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#9E9E9E]">
                            <Smartphone className="w-3.5 h-3.5" />
                            <span className="truncate">{role.pwaName}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-opacity ${
                        selectedRole === role.id ? 'opacity-100 text-[#F5A623]' : 'opacity-0'
                      }`} />
                    </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-8 text-center">
                    <Search className="w-8 h-8 text-[#C7C7C7] mx-auto mb-2" />
                    <p className="text-[13px] text-[#9E9E9E]">No roles found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Role Details & Permissions */}
          <div className="col-span-8">
            {selectedRoleData ? (
              <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                {/* Role Header */}
                <div className="px-6 py-5 border-b border-[#E5E7EB]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[24px]" style={{ backgroundColor: `${selectedRoleData.color}15` }}>
                        {selectedRoleData.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[17px] font-semibold text-[#2B2B2B]">{selectedRoleData.name}</h3>
                         
                        </div>
                        <p className="text-[13px] text-[#9E9E9E] mt-1 mb-2">{selectedRoleData.description}</p>
                        <div className="flex items-center gap-2 text-[12px]">
                          <div className="px-2 py-1 bg-[#F2F1EE] text-[#2B2B2B] rounded">
                            {selectedRoleData.pwaName}
                          </div>
                          <div className="text-[#9E9E9E]">•</div>
                          <div className="text-[#9E9E9E]">{selectedRoleData.summary}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editMode ? (
                        <>
                          <button 
                            onClick={() => setEditMode(false)}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-[12px] disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                          <button 
                            onClick={handleSavePermissions}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-3 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#265A2F] transition-colors text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 px-3 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[12px]"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Permissions
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Role Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[13px]">
                      <Users className="w-4 h-4 text-[#9E9E9E]" />
                      <span className="font-semibold text-[#2B2B2B]">{selectedRoleData.userCount}</span>
                      <span className="text-[#9E9E9E]">users assigned to this role</span>
                    </div>
                  </div>

                  {editMode && (
                    <div className="mt-3 p-3 bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-lg text-[12px] text-[#2B2B2B] flex items-center gap-2">
                      <Unlock className="w-4 h-4 text-[#F5A623]" />
                      <strong>Edit Mode:</strong> Toggle permissions on/off to customize this role's access
                    </div>
                  )}
                </div>

                {/* Permissions */}
                <div className="p-6">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Role Permissions</h4>
                  {permissionsByRole ? (
                    <div className="space-y-4">
                      {Object.entries(permissionsByRole).map(([categoryKey, categoryPermissions]) => {
                        const enabledCount = categoryPermissions.filter((p: any) => p.enabled).length;
                        const totalCount = categoryPermissions.length;

                        return (
                          <div key={categoryKey} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                            <div className="px-4 py-3 bg-[#F9FAFB] flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-medium text-[#2B2B2B] capitalize">
                                  {categoryKey.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#9E9E9E]">
                                  {enabledCount} / {totalCount} enabled
                                </span>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-white">
                              <div className="space-y-2.5">
                                {categoryPermissions.map((permission: any) => (
                                  <div key={permission.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-start gap-2.5 flex-1">
                                      {permission.enabled ? (
                                        <Check className="w-4 h-4 text-[#2F6B3C] flex-shrink-0 mt-0.5" />
                                      ) : (
                                        <X className="w-4 h-4 text-[#C7C7C7] flex-shrink-0 mt-0.5" />
                                      )}
                                      <span className={`text-[12px] ${permission.enabled ? 'text-[#2B2B2B]' : 'text-[#C7C7C7]'}`}>
                                        {permission.name}
                                      </span>
                                    </div>
                                    {editMode && (
                                      <button
                                        onClick={() => togglePermission(categoryKey, permission.id)}
                                        className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                                          permission.enabled
                                            ? 'bg-[#2F6B3C] text-white hover:bg-[#265A2F]'
                                            : 'bg-[#E5E7EB] text-[#9E9E9E] hover:bg-[#D1D5DB]'
                                        }`}
                                      >
                                        {permission.enabled ? 'Enabled' : 'Disabled'}
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#9E9E9E] text-[13px]">
                      No permissions defined for this role
                    </div>
                  )}

                  {/* View Users Button */}
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#F5A623] text-[#F5A623] rounded-lg hover:bg-[#F5A623]/5 transition-colors text-[13px] font-medium">
                      <Users className="w-4 h-4" />
                      View {selectedRoleData.userCount} Users with this Role
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-lg h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-[#C7C7C7] mx-auto mb-4" />
                  <p className="text-[13px] text-[#9E9E9E]">Select a role to view details and permissions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Custom Role Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B]">Create Custom External Role</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  disabled={isSaving}
                  className="p-1 hover:bg-[#F2F1EE] rounded transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-[#9E9E9E]" />
                </button>
              </div>
              <CreateRoleForm onSubmit={handleCreateRole} onCancel={() => setShowCreateModal(false)} isLoading={isSaving} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Create Role Form Component
interface CreateRoleFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function CreateRoleForm({ onSubmit, onCancel, isLoading = false }: CreateRoleFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pwaName: '',
    cloneFrom: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a role name');
      return;
    }
    
    if (!formData.pwaName) {
      alert('Please select a PWA application');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-6 py-5 space-y-4">
        <div>
          <label className="block text-[12px] font-medium text-[#2B2B2B] mb-2">Role Name</label>
          <input
            type="text"
            placeholder="e.g., Regional Tour Coordinator"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623]"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#2B2B2B] mb-2">Description</label>
          <textarea
            placeholder="Describe the role's purpose and responsibilities"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] resize-none disabled:opacity-50"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#2B2B2B] mb-2">PWA Access</label>
          <select 
            value={formData.pwaName}
            onChange={(e) => setFormData({ ...formData, pwaName: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="">Select PWA application</option>
            <option value="School Tour PWA">School Tour PWA</option>
            <option value="RECEE PWA">RECEE PWA</option>
            <option value="Facilitator PWA">Facilitator PWA</option>
            <option value="Judge PWA">Judge PWA</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#2B2B2B] mb-2">Clone Permissions From</label>
          <select 
            value={formData.cloneFrom}
            onChange={(e) => setFormData({ ...formData, cloneFrom: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="">Start with no permissions</option>
            <option value="tour-supervisor">Tour Supervisor</option>
            <option value="tour-analyst">Tour Analyst</option>
            <option value="recee-officer">RECEE Officer</option>
            <option value="facilitator">Facilitator</option>
            <option value="judge">Judge</option>
          </select>
          <p className="text-[11px] text-[#9E9E9E] mt-1">You can customize permissions after creating the role</p>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3 sticky bottom-0 bg-white">
        <button 
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-[13px] disabled:opacity-50"
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[13px] font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Creating...' : 'Create Role & Assign Permissions'}
        </button>
      </div>
    </form>
  );
}