'use client'
import { useState } from 'react';
import { Search, Filter, Download, Calendar, User, Shield, Database, Settings, FileText, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

export default function AuditLog() {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Simple toast implementation for export feedback
  interface Toast { id: string; title: string; description?: string; variant?: 'default' | 'destructive' }
  const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toast = ({ title, description = '', variant = 'default' }: Omit<Toast, 'id'>) => {
      const id = `t-${Date.now()}`;
      setToasts((s) => [...s, { id, title, description, variant }]);
      setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 3000);
    };
    return { toasts, setToasts, toast } as const;
  };
  const { toasts, setToasts, toast } = useToast();
  const [dateRange, setDateRange] = useState<'all' | '24h' | '7d' | '30d'>('all');

  const auditEvents = [
    {
      id: '1',
      timestamp: '2025-01-15 14:45:23',
      user: 'Adebayo Johnson',
      role: 'Super Administrator',
      action: 'Campaign Year Created',
      category: 'campaign',
      details: 'Created campaign year "2025 Q1 Lagos-Ogun"',
      severity: 'info',
      ipAddress: '197.210.55.122',
      changes: { before: null, after: 'Campaign 2025 Q1' }
    },
    {
      id: '2',
      timestamp: '2025-01-15 14:30:15',
      user: 'System',
      role: 'Automated',
      action: 'Failed Login Attempt',
      category: 'security',
      details: 'Failed login for user "chioma.o@maltina.com" - Invalid password',
      severity: 'warning',
      ipAddress: '102.89.23.45',
      changes: null
    },
    {
      id: '3',
      timestamp: '2025-01-15 14:15:08',
      user: 'Ibrahim Yusuf',
      role: 'State Coordinator',
      action: 'School Approved',
      category: 'pipeline',
      details: 'Approved school "Ikeja Primary School" for tour activation',
      severity: 'info',
      ipAddress: '197.210.55.134',
      changes: { before: 'Pending', after: 'Approved' }
    },
    {
      id: '4',
      timestamp: '2025-01-15 14:00:42',
      user: 'Grace Oladele',
      role: 'Administrator',
      action: 'Permission Changed',
      category: 'settings',
      details: 'Updated role permissions for "State Coordinator" role',
      severity: 'critical',
      ipAddress: '197.210.55.122',
      changes: { permission: 'tour-day.intervene', from: false, to: true }
    },
    {
      id: '5',
      timestamp: '2025-01-15 13:45:19',
      user: 'Michael Eze',
      role: 'Administrator',
      action: 'Data Export',
      category: 'reports',
      details: 'Exported nomination data (1,234 records)',
      severity: 'info',
      ipAddress: '102.89.23.67',
      changes: null
    },
    {
      id: '6',
      timestamp: '2025-01-15 13:30:55',
      user: 'System',
      role: 'Automated',
      action: 'Token Expired',
      category: 'security',
      details: 'Inspector token expired for "John Doe" - Auto logged out',
      severity: 'info',
      ipAddress: '102.89.23.89',
      changes: null
    },
    {
      id: '7',
      timestamp: '2025-01-15 13:15:33',
      user: 'Chioma Okonkwo',
      role: 'State Coordinator',
      action: 'Facilitator Assigned',
      category: 'staffing',
      details: 'Assigned facilitator "Ahmed Musa" to school "Surulere Community School"',
      severity: 'info',
      ipAddress: '197.210.55.145',
      changes: { school: 'Surulere Community School', facilitator: 'Ahmed Musa' }
    },
    {
      id: '8',
      timestamp: '2025-01-15 13:00:12',
      user: 'System',
      role: 'Automated',
      action: 'Account Locked',
      category: 'security',
      details: 'Account locked for "test.user@maltina.com" - 5 failed login attempts',
      severity: 'critical',
      ipAddress: '41.203.123.45',
      changes: null
    },
    {
      id: '9',
      timestamp: '2025-01-15 12:45:27',
      user: 'Adebayo Johnson',
      role: 'Super Administrator',
      action: 'SLA Policy Updated',
      category: 'settings',
      details: 'Changed "Session Token" policy from 12 hours to 8 hours',
      severity: 'warning',
      ipAddress: '197.210.55.122',
      changes: { policy: 'Session Token', from: '12 hours', to: '8 hours' }
    },
    {
      id: '10',
      timestamp: '2025-01-15 12:30:08',
      user: 'Ibrahim Yusuf',
      role: 'State Coordinator',
      action: 'Bulk Upload',
      category: 'data',
      details: 'Uploaded 45 facilitators via CSV import',
      severity: 'info',
      ipAddress: '197.210.55.134',
      changes: { records: 45, type: 'facilitators' }
    },
  ];

  const stats = [
    { label: 'Total Events (24h)', value: '1,247', icon: FileText, color: '#2B2B2B' },
    { label: 'Security Events', value: '18', icon: Shield, color: '#D4A017' },
    { label: 'Critical Actions', value: '3', icon: AlertTriangle, color: '#8C1D18' },
    { label: 'Active Sessions', value: '24', icon: User, color: '#2F6B3C' },
  ];

  const categories = [
    { value: 'all', label: 'All Events', count: 1247 },
    { value: 'security', label: 'Security', count: 18 },
    { value: 'campaign', label: 'Campaign', count: 156 },
    { value: 'pipeline', label: 'Pipeline', count: 423 },
    { value: 'staffing', label: 'Staffing', count: 234 },
    { value: 'settings', label: 'Settings', count: 45 },
    { value: 'reports', label: 'Reports', count: 89 },
    { value: 'data', label: 'Data Changes', count: 282 },
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severity' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#8C1D18] text-white';
      case 'warning': return 'bg-[#D4A017] text-white';
      case 'info': return 'bg-[#2F6B3C] text-white';
      default: return 'bg-[#C7C7C7] text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return Shield;
      case 'campaign': return Calendar;
      case 'pipeline': return CheckCircle;
      case 'staffing': return User;
      case 'settings': return Settings;
      case 'reports': return FileText;
      case 'data': return Database;
      default: return FileText;
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    // Type/Severity filters
    if (filterType !== 'all' && event.category !== filterType) return false;
    if (filterSeverity !== 'all' && event.severity !== filterSeverity) return false;

    // Search filter (case-insensitive) across user, action, details, category, ip
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const inUser = event.user?.toLowerCase().includes(q);
      const inAction = event.action?.toLowerCase().includes(q);
      const inDetails = event.details?.toLowerCase().includes(q);
      const inCategory = event.category?.toLowerCase().includes(q);
      const inIp = event.ipAddress?.toLowerCase().includes(q);
      if (!(inUser || inAction || inDetails || inCategory || inIp)) return false;
    }

    // Date range filter
    if (dateRange !== 'all') {
      // event.timestamp format: 'YYYY-MM-DD HH:mm:ss' -> make ISO-like
      const eventIso = event.timestamp.replace(' ', 'T');
      const eventDate = new Date(eventIso);
      const now = new Date();
      let cutoff = new Date(now);
      if (dateRange === '24h') cutoff.setHours(now.getHours() - 24);
      else if (dateRange === '7d') cutoff.setDate(now.getDate() - 7);
      else if (dateRange === '30d') cutoff.setDate(now.getDate() - 30);
      if (isNaN(eventDate.getTime()) || eventDate < cutoff) return false;
    }

    return true;
  });

  // Export handler: create CSV from filteredEvents and trigger download
  const handleExport = () => {
    toast({ title: 'Export started', description: 'Preparing audit log export...' });
    try {
      const headers = ['timestamp', 'user', 'role', 'action', 'category', 'details', 'severity', 'ipAddress'];
      const rows = filteredEvents.map(e => headers.map(h => (e as any)[h] ?? '').map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-export-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: 'Export completed', description: `${filteredEvents.length} records exported.` });
    } catch (err) {
      toast({ title: 'Export failed', description: 'Could not create export file.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader 
        title="Audit Log"
        subtitle="Complete system activity trail and event monitoring"
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
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
                placeholder="Search events, users, or actions..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} ({cat.count})
                </option>
              ))}
            </select>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            >
              {severityLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>

            {/* Date Range */}
            <button
              onClick={() => setDateRange(dateRange === '24h' ? 'all' : '24h')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-[13px] ${
                dateRange === '24h'
                  ? 'bg-[#F5A623] text-white'
                  : 'border border-[#E5E7EB] hover:bg-[#F2F1EE]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              {dateRange === '24h' ? 'Past 24 Hours' : 'Last 24 Hours'}
            </button>

            {/* Export */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[13px]"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Audit Events Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Recent Events</h2>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              Showing {filteredEvents.length} of {auditEvents.length} events
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-[#F2F1EE]">
              <tr>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">User</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Action</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Details</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Category</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => {
                const CategoryIcon = getCategoryIcon(event.category);
                return (
                  <tr key={event.id} className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E]">
                        <Clock className="w-3.5 h-3.5" />
                        {event.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B] font-[500]">{event.user}</div>
                      <div className="text-[11px] text-[#9E9E9E]">{event.role}</div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#2B2B2B] font-[500]">{event.action}</td>
                    <td className="px-4 py-3 text-[13px] text-[#9E9E9E] max-w-[300px]">{event.details}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E]">
                        <CategoryIcon className="w-4 h-4" />
                        {event.category}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-[11px] text-[#9E9E9E] font-mono">{event.ipAddress}</code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
            <p className="text-[12px] text-[#9E9E9E]">Showing 1-10 of 1,247 events</p>
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
                3
              </button>
              <button className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[12px] hover:bg-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#9E9E9E] flex-shrink-0" />
          <div className="text-[12px] text-[#9E9E9E]">
            All system events are logged and retained for 90 days. Critical security events are retained indefinitely for compliance.
          </div>
        </div>

        {/* Toasts */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right transition-all ${
                t.variant === 'destructive' ? 'bg-[#8C1D18] border-[#6F1713] text-white' : 'bg-[#2F6B3C] border-[#265A2F] text-white'
              }`}
            >
              {t.variant === 'destructive' ? (
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[13px]">{t.title}</p>
                {t.description ? <p className="text-[12px] opacity-90 mt-0.5">{t.description}</p> : null}
              </div>
              <button onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))} className="shrink-0 hover:opacity-75 transition-opacity">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
