'use client'
import { useState } from 'react';
import { Search, Download, Calendar, MapPin, Smartphone, Monitor, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Lock } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

export default function LoginHistory() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<'all'|'24h'|'7d'|'30d'>('all');

  // Simple toast for feedback
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

  const loginAttempts = [
    {
      id: '1',
      timestamp: '2025-01-15 14:45:23',
      user: 'Adebayo Johnson',
      email: 'adebayo.j@maltina.com',
      role: 'Super Administrator',
      status: 'success',
      method: '2FA',
      ipAddress: '197.210.55.122',
      location: 'Lagos, Nigeria',
      device: 'Chrome 120 on Windows 10',
      deviceType: 'desktop',
      sessionDuration: '2h 15m',
      sessionActive: true
    },
    {
      id: '2',
      timestamp: '2025-01-15 14:30:15',
      user: 'Unknown',
      email: 'chioma.o@maltina.com',
      role: 'State Coordinator',
      status: 'failed',
      method: 'Password',
      ipAddress: '102.89.23.45',
      location: 'Abuja, Nigeria',
      device: 'Safari on iPhone 14',
      deviceType: 'mobile',
      sessionDuration: null,
      sessionActive: false,
      failReason: 'Invalid password'
    },
    {
      id: '3',
      timestamp: '2025-01-15 14:15:08',
      user: 'Ibrahim Yusuf',
      email: 'ibrahim.y@maltina.com',
      role: 'State Coordinator',
      status: 'success',
      method: '2FA',
      ipAddress: '197.210.55.134',
      location: 'Kano, Nigeria',
      device: 'Chrome 120 on macOS',
      deviceType: 'desktop',
      sessionDuration: '3h 45m',
      sessionActive: true
    },
    {
      id: '4',
      timestamp: '2025-01-15 14:00:42',
      user: 'Grace Oladele',
      email: 'grace.o@maltina.com',
      role: 'Administrator',
      status: 'success',
      method: '2FA',
      ipAddress: '197.210.55.122',
      location: 'Lagos, Nigeria',
      device: 'Firefox 121 on Windows 11',
      deviceType: 'desktop',
      sessionDuration: '1h 30m',
      sessionActive: false
    },
    {
      id: '5',
      timestamp: '2025-01-15 13:58:33',
      user: 'Unknown',
      email: 'test.user@maltina.com',
      role: null,
      status: 'failed',
      method: 'Password',
      ipAddress: '41.203.123.45',
      location: 'Unknown',
      device: 'Chrome 120 on Android',
      deviceType: 'mobile',
      sessionDuration: null,
      sessionActive: false,
      failReason: 'Invalid password (Attempt 3 of 5)'
    },
    {
      id: '6',
      timestamp: '2025-01-15 13:45:19',
      user: 'Michael Eze',
      email: 'michael.e@maltina.com',
      role: 'Administrator',
      status: 'success',
      method: '2FA',
      ipAddress: '102.89.23.67',
      location: 'Port Harcourt, Nigeria',
      device: 'Edge 120 on Windows 10',
      deviceType: 'desktop',
      sessionDuration: '4h 12m',
      sessionActive: false
    },
    {
      id: '7',
      timestamp: '2025-01-15 13:30:12',
      user: 'Unknown',
      email: 'test.user@maltina.com',
      role: null,
      status: 'locked',
      method: 'Password',
      ipAddress: '41.203.123.45',
      location: 'Unknown',
      device: 'Chrome 120 on Android',
      deviceType: 'mobile',
      sessionDuration: null,
      sessionActive: false,
      failReason: 'Account locked - 5 failed attempts'
    },
    {
      id: '8',
      timestamp: '2025-01-15 13:15:33',
      user: 'Chioma Okonkwo',
      email: 'chioma.o@maltina.com',
      role: 'State Coordinator',
      status: 'success',
      method: '2FA',
      ipAddress: '197.210.55.145',
      location: 'Abuja, Nigeria',
      device: 'Safari on MacBook Pro',
      deviceType: 'desktop',
      sessionDuration: '5h 28m',
      sessionActive: false
    },
    {
      id: '9',
      timestamp: '2025-01-15 13:10:27',
      user: 'Unknown',
      email: 'admin@test.com',
      role: null,
      status: 'failed',
      method: '2FA',
      ipAddress: '203.45.123.89',
      location: 'Unknown',
      device: 'Chrome 120 on Linux',
      deviceType: 'desktop',
      sessionDuration: null,
      sessionActive: false,
      failReason: 'Invalid 2FA code'
    },
    {
      id: '10',
      timestamp: '2025-01-15 13:00:08',
      user: 'Ahmed Musa',
      email: 'ahmed.m@maltina.com',
      role: 'RECEE Inspector',
      status: 'success',
      method: '2FA',
      ipAddress: '197.210.55.178',
      location: 'Ibadan, Nigeria',
      device: 'Chrome 120 on Android',
      deviceType: 'mobile',
      sessionDuration: '6h 45m',
      sessionActive: false
    },
  ];

  const stats = [
    { label: 'Successful Logins (24h)', value: '156', icon: CheckCircle, color: '#2F6B3C' },
    { label: 'Failed Attempts', value: '12', icon: XCircle, color: '#D4A017' },
    { label: 'Active Sessions', value: '24', icon: Shield, color: '#F5A623' },
    { label: 'Locked Accounts', value: '1', icon: Lock, color: '#8C1D18' },
  ];

  const recentAlerts = [
    { time: '14:30', message: '3 failed login attempts from IP 102.89.23.45', severity: 'warning' },
    { time: '13:30', message: 'Account locked: test.user@maltina.com (5 failed attempts)', severity: 'critical' },
    { time: '13:10', message: 'Suspicious login attempt from unknown location', severity: 'warning' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return { bg: 'bg-[#2F6B3C]', icon: CheckCircle, text: 'Success' };
      case 'failed':
        return { bg: 'bg-[#D4A017]', icon: XCircle, text: 'Failed' };
      case 'locked':
        return { bg: 'bg-[#8C1D18]', icon: Lock, text: 'Locked' };
      default:
        return { bg: 'bg-[#C7C7C7]', icon: AlertTriangle, text: 'Unknown' };
    }
  };

  const filteredAttempts = loginAttempts.filter(attempt => {
    // status filter
    if (filterStatus !== 'all' && attempt.status !== filterStatus) return false;

    // search filter
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const inUser = String(attempt.user || '').toLowerCase().includes(q);
      const inEmail = String(attempt.email || '').toLowerCase().includes(q);
      const inIp = String(attempt.ipAddress || '').toLowerCase().includes(q);
      const inDevice = String(attempt.device || '').toLowerCase().includes(q);
      if (!(inUser || inEmail || inIp || inDevice)) return false;
    }

    // date range filter
    if (dateRange !== 'all') {
      const eventIso = attempt.timestamp.replace(' ', 'T');
      const eventDate = new Date(eventIso);
      if (isNaN(eventDate.getTime())) return false;
      const now = new Date();
      const cutoff = new Date(now);
      if (dateRange === '24h') cutoff.setHours(now.getHours() - 24);
      else if (dateRange === '7d') cutoff.setDate(now.getDate() - 7);
      else if (dateRange === '30d') cutoff.setDate(now.getDate() - 30);
      if (eventDate < cutoff) return false;
    }

    return true;
  });

  // Export handler
  const handleExport = () => {
    toast({ title: 'Export started', description: 'Preparing login attempts export...' });
    try {
      const headers = ['timestamp','user','email','role','status','method','ipAddress','location','device','sessionDuration'];
      const rows = filteredAttempts.map(a => headers.map(h => {
        const v = (a as any)[h] ?? '';
        return `"${String(v).replace(/"/g, '""')}"`;
      }).join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `login-attempts-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: 'Export completed', description: `${filteredAttempts.length} records exported.` });
    } catch (err) {
      toast({ title: 'Export failed', description: 'Could not create export file.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader 
        title="Login History"
        subtitle="Track all admin authentication attempts and sessions"
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        
        {/* Alert Banner */}
        {recentAlerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {recentAlerts.map((alert, idx) => (
              <div key={idx} className={`p-4 rounded-lg flex items-start gap-3 border ${
                alert.severity === 'critical' 
                  ? 'bg-[#8C1D18]/10 border-[#8C1D18]' 
                  : 'bg-[#D4A017]/10 border-[#D4A017]'
              }`}>
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.severity === 'critical' ? 'text-[#8C1D18]' : 'text-[#D4A017]'
                }`} />
                <div className="flex-1">
                  <div className="text-[13px] font-[500] text-[#2B2B2B]">{alert.message}</div>
                  <div className="text-[11px] text-[#9E9E9E] mt-1">{alert.time} today</div>
                </div>
              </div>
            ))}
          </div>
        )}

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by user, email, or IP address..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            >
              <option value="all">All Status</option>
              <option value="success">Success Only</option>
              <option value="failed">Failed Only</option>
              <option value="locked">Locked Accounts</option>
            </select>

            {/* Date Range */}
            <button
              onClick={() => setDateRange(dateRange === '24h' ? 'all' : '24h')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-[13px] ${dateRange === '24h' ? 'bg-[#F5A623] text-white' : 'border border-[#E5E7EB] hover:bg-[#F2F1EE]'}`}
            >
              <Calendar className="w-4 h-4 text-[#9E9E9E]" />
              {dateRange === '24h' ? 'Past 24 Hours' : 'Last 24 Hours'}
            </button>

            {/* Export */}
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-[13px]">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Login Attempts Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Login Attempts</h2>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              Showing {filteredAttempts.length} of {loginAttempts.length} login attempts
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-[#F2F1EE]">
              <tr>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">User</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Status</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Method</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Location</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Device</th>
                <th className="px-4 py-3 text-left text-[12px] font-[500] text-[#9E9E9E] uppercase">Session</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.map((attempt) => {
                const statusBadge = getStatusBadge(attempt.status);
                const DeviceIcon = attempt.deviceType === 'mobile' ? Smartphone : Monitor;
                
                return (
                  <tr key={attempt.id} className={`border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors ${
                    attempt.status === 'locked' ? 'bg-[#8C1D18]/5' : 
                    attempt.status === 'failed' ? 'bg-[#D4A017]/5' : ''
                  }`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E]">
                        <Clock className="w-3.5 h-3.5" />
                        {attempt.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B] font-[500]">
                        {attempt.user}
                      </div>
                      <div className="text-[11px] text-[#9E9E9E]">{attempt.email}</div>
                      {attempt.role && (
                        <div className="text-[11px] text-[#9E9E9E] mt-0.5">{attempt.role}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <statusBadge.icon className="w-4 h-4" style={{ color: statusBadge.bg.replace('bg-[', '').replace(']', '') }} />
                          <span className={`px-3 py-1 rounded-full text-xs text-white ${statusBadge.bg}`}>
                            {statusBadge.text.toUpperCase()}
                          </span>
                        </div>
                        {attempt.failReason && (
                          <div className="text-[11px] text-[#8C1D18]">{attempt.failReason}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E]">
                        <Shield className="w-3.5 h-3.5" />
                        {attempt.method}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E] mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {attempt.location}
                      </div>
                      <code className="text-[11px] text-[#9E9E9E] font-mono">{attempt.ipAddress}</code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#9E9E9E]">
                        <DeviceIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px]">{attempt.device}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {attempt.sessionDuration ? (
                        <div>
                          <div className="text-[13px] text-[#2B2B2B] font-[500]">
                            {attempt.sessionDuration}
                          </div>
                          {attempt.sessionActive && (
                            <div className="flex items-center gap-1 text-[11px] text-[#2F6B3C] mt-1">
                              <div className="w-2 h-2 bg-[#2F6B3C] rounded-full"></div>
                              Active
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[13px] text-[#9E9E9E]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
            <p className="text-[12px] text-[#9E9E9E]">Showing 1-10 of {loginAttempts.length} attempts</p>
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
          <Shield className="w-5 h-5 text-[#9E9E9E] flex-shrink-0" />
          <div className="text-[12px] text-[#9E9E9E]">
            Login attempts are monitored in real-time. Accounts are automatically locked after 5 failed attempts within 15 minutes. Contact IT support to unlock accounts.
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right transition-all ${t.variant === 'destructive' ? 'bg-[#8C1D18] border-[#6F1713] text-white' : 'bg-[#2F6B3C] border-[#265A2F] text-white'}`}>
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
  );
}
