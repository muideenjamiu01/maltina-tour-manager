'use client'
import { useState } from 'react';
import { Search, Download, Calendar, Database, User, ArrowRight, RotateCcw } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

export default function DataChanges() {
  const [filterEntity, setFilterEntity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dataChanges = [
    {
      id: '1',
      timestamp: '2025-01-15 14:45:23',
      user: 'Adebayo Johnson',
      role: 'Super Administrator',
      entity: 'Campaign',
      recordId: 'CAMP-2025-Q1',
      recordName: '2025 Q1 Lagos-Ogun',
      action: 'Created',
      field: null,
      oldValue: null,
      newValue: 'Campaign Year 2025 Q1',
      changeType: 'create'
    },
    {
      id: '2',
      timestamp: '2025-01-15 14:30:18',
      user: 'Ibrahim Yusuf',
      role: 'State Coordinator',
      entity: 'School',
      recordId: 'SCH-LAG-1234',
      recordName: 'Ikeja Primary School',
      action: 'Updated',
      field: 'status',
      oldValue: 'Pending Approval',
      newValue: 'Approved',
      changeType: 'update'
    },
    {
      id: '3',
      timestamp: '2025-01-15 14:15:42',
      user: 'Grace Oladele',
      role: 'Administrator',
      entity: 'Role',
      recordId: 'ROLE-SC',
      recordName: 'State Coordinator',
      action: 'Updated',
      field: 'permissions.tour-day.intervene',
      oldValue: 'false',
      newValue: 'true',
      changeType: 'update'
    },
    {
      id: '4',
      timestamp: '2025-01-15 14:00:55',
      user: 'Chioma Okonkwo',
      role: 'State Coordinator',
      entity: 'Facilitator',
      recordId: 'FAC-0245',
      recordName: 'Ahmed Musa',
      action: 'Updated',
      field: 'assignment',
      oldValue: 'Unassigned',
      newValue: 'Surulere Community School',
      changeType: 'update'
    },
    {
      id: '5',
      timestamp: '2025-01-15 13:45:33',
      user: 'Michael Eze',
      role: 'Administrator',
      entity: 'School',
      recordId: 'SCH-LAG-5678',
      recordName: 'Yaba Secondary School',
      action: 'Updated',
      field: 'contact.phone',
      oldValue: '080-1234-5678',
      newValue: '08012345678',
      changeType: 'update'
    },
    {
      id: '6',
      timestamp: '2025-01-15 13:30:12',
      user: 'Ibrahim Yusuf',
      role: 'State Coordinator',
      entity: 'Cluster',
      recordId: 'CLU-LAG-001',
      recordName: 'Lagos Mainland Cluster A',
      action: 'Updated',
      field: 'tour_date',
      oldValue: '2025-02-15',
      newValue: '2025-02-20',
      changeType: 'update'
    },
    {
      id: '7',
      timestamp: '2025-01-15 13:15:27',
      user: 'Grace Oladele',
      role: 'Administrator',
      entity: 'User',
      recordId: 'USR-0089',
      recordName: 'john.doe@maltina.com',
      action: 'Deleted',
      field: null,
      oldValue: 'Active User Account',
      newValue: null,
      changeType: 'delete'
    },
    {
      id: '8',
      timestamp: '2025-01-15 13:00:08',
      user: 'Adebayo Johnson',
      role: 'Super Administrator',
      entity: 'SLA Policy',
      recordId: 'SLA-SESSION',
      recordName: 'Session Token',
      action: 'Updated',
      field: 'duration',
      oldValue: '12 hours',
      newValue: '8 hours',
      changeType: 'update'
    },
    {
      id: '9',
      timestamp: '2025-01-15 12:45:19',
      user: 'Ibrahim Yusuf',
      role: 'State Coordinator',
      entity: 'Facilitator',
      recordId: 'BULK-UPLOAD-45',
      recordName: 'Bulk Upload (45 records)',
      action: 'Created',
      field: null,
      oldValue: null,
      newValue: '45 facilitators imported',
      changeType: 'bulk-create'
    },
    {
      id: '10',
      timestamp: '2025-01-15 12:30:33',
      user: 'Chioma Okonkwo',
      role: 'State Coordinator',
      entity: 'School',
      recordId: 'SCH-ABJ-3456',
      recordName: 'Garki Community School',
      action: 'Updated',
      field: 'enrollment',
      oldValue: '450',
      newValue: '475',
      changeType: 'update'
    },
  ];

  const stats = [
    { label: 'Changes (24h)', value: '387', color: '#2B2B2B' },
    { label: 'Updates', value: '312', color: '#F5A623' },
    { label: 'Creates', value: '63', color: '#2F6B3C' },
    { label: 'Deletes', value: '12', color: '#8C1D18' },
  ];

  const entityTypes = [
    { value: 'all', label: 'All Entities', count: 387 },
    { value: 'school', label: 'Schools', count: 156 },
    { value: 'facilitator', label: 'Facilitators', count: 89 },
    { value: 'campaign', label: 'Campaigns', count: 23 },
    { value: 'cluster', label: 'Clusters', count: 45 },
    { value: 'user', label: 'Users', count: 34 },
    { value: 'role', label: 'Roles', count: 12 },
    { value: 'settings', label: 'Settings', count: 28 },
  ];

  const getChangeTypeBadge = (type: string) => {
    switch (type) {
      case 'create':
        return { bg: 'bg-[#2F6B3C]', text: 'Created' };
      case 'update':
        return { bg: 'bg-[#F5A623]', text: 'Updated' };
      case 'delete':
        return { bg: 'bg-[#8C1D18]', text: 'Deleted' };
      case 'bulk-create':
        return { bg: 'bg-[#2F6B3C]', text: 'Bulk Create' };
      default:
        return { bg: 'bg-[#C7C7C7]', text: 'Unknown' };
    }
  };

  const filteredChanges = dataChanges.filter(change => {
    // Filter by entity
    if (filterEntity !== 'all' && change.entity.toLowerCase() !== filterEntity) {
      return false;
    }
    
    // Filter by search query (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchableFields = [
        change.recordName,
        change.user,
        change.entity,
        change.field || '',
        change.recordId,
      ];
      
      return searchableFields.some(field => 
        field.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader 
        title="Data Changes"
        subtitle="Track all data modifications and field-level changes"
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-[13px] text-[#9E9E9E]">{stat.label}</span>
              </div>
              <div className="text-[32px]" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
              <input
                type="text"
                placeholder="Search by record name, field, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            {/* Entity Filter */}
            <select
              value={filterEntity}
              onChange={(e) => setFilterEntity(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            >
              {entityTypes.map(entity => (
                <option key={entity.value} value={entity.value}>
                  {entity.label} ({entity.count})
                </option>
              ))}
            </select>

            {/* Date Range */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-[13px]">
              <Calendar className="w-4 h-4 text-[#9E9E9E]" />
              Last 24 Hours
            </button>

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[13px]">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Data Changes Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Recent Data Changes</h2>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              Showing {filteredChanges.length} of {dataChanges.length} changes
            </p>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {filteredChanges.map((change) => {
              const changeBadge = getChangeTypeBadge(change.changeType);
              
              return (
                <div key={change.id} className="px-6 py-4 hover:bg-[#FFFDF8] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Timestamp & User */}
                      <div className="min-w-[200px]">
                        <div className="text-[13px] text-[#9E9E9E] mb-1">{change.timestamp}</div>
                        <div className="flex items-center gap-2 text-[13px] text-[#2B2B2B]">
                          <User className="w-3.5 h-3.5 text-[#9E9E9E]" />
                          {change.user}
                        </div>
                        <div className="text-[11px] text-[#9E9E9E] ml-5">{change.role}</div>
                      </div>

                      {/* Change Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs text-white ${changeBadge.bg}`}>
                            {changeBadge.text}
                          </span>
                          <span className="text-[13px] text-[#9E9E9E]">
                            {change.entity} • {change.recordName}
                          </span>
                        </div>

                        {/* Field Change (if applicable) */}
                        {change.field && (
                          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div className="flex-1">
                              <div className="text-[11px] text-[#9E9E9E] mb-1">Field: <code className="text-[#2B2B2B] font-mono">{change.field}</code></div>
                              <div className="flex items-center gap-3">
                                <div className="flex-1">
                                  <div className="text-[11px] text-[#9E9E9E] mb-0.5">Before</div>
                                  <div className="px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[12px] text-[#8C1D18]">
                                    {change.oldValue || <span className="text-[#9E9E9E]">—</span>}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#9E9E9E] flex-shrink-0 mt-4" />
                                <div className="flex-1">
                                  <div className="text-[11px] text-[#9E9E9E] mb-0.5">After</div>
                                  <div className="px-2 py-1 bg-white border border-[#E5E7EB] rounded text-[12px] text-[#2F6B3C]">
                                    {change.newValue || <span className="text-[#9E9E9E]">—</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Create/Delete Details */}
                        {!change.field && (
                          <div className="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div className="text-[13px] text-[#2B2B2B]">
                              {change.changeType === 'create' || change.changeType === 'bulk-create' 
                                ? change.newValue 
                                : change.oldValue}
                            </div>
                          </div>
                        )}

                        {/* Record ID */}
                        <div className="mt-2 text-[11px] text-[#9E9E9E]">
                          Record ID: <code className="font-mono">{change.recordId}</code>
                        </div>
                      </div>
                    </div>

                    {/* Rollback Button (if applicable) */}
                    {change.changeType === 'update' && (
                      <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-[12px] text-[#9E9E9E]">
                        <RotateCcw className="w-3.5 h-3.5" />
                        Revert
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
            <p className="text-[12px] text-[#9E9E9E]">Showing 1-10 of {dataChanges.length} changes</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] hover:bg-white transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09615] transition-colors">
                1
              </button>
              <button className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] hover:bg-white transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] hover:bg-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start gap-3">
          <Database className="w-5 h-5 text-[#9E9E9E] flex-shrink-0" />
          <div className="text-[12px] text-[#9E9E9E]">
            All data changes are tracked at the field level with before/after values. Changes can be reverted within 30 days. Bulk operations are logged separately for review.
          </div>
        </div>
      </div>
    </div>
  );
}
