'use client'
import React, { useState } from 'react';
import { Plus, Search, Bell, Calendar, Zap, Clock, Users, Mail, MessageSquare, ChevronRight, Play, Pause, Edit2, Copy, Trash2, AlertCircle, CheckCircle, XCircle, Filter, TrendingUp } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

interface NotificationRule {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  triggerType: 'event' | 'schedule' | 'condition';
  scope: 'campaign' | 'cycle' | 'pipeline' | 'activity';
  scopeTarget: string;
  trigger: {
    event?: string;
    schedule?: string;
    condition?: string;
  };
  channels: ('email' | 'sms' | 'push')[];
  templates: {
    email?: string;
    sms?: string;
  };
  recipients: {
    type: 'role' | 'user' | 'custom';
    targets: string[];
  };
  timing: {
    immediate: boolean;
    delay?: string;
    beforeDeadline?: string;
  };
  statistics: {
    triggered: number;
    sent: number;
    delivered: number;
    opened: number;
  };
  createdBy: string;
  createdDate: string;
  lastTriggered?: string;
}

interface Nudge {
  id: string;
  name: string;
  type: 'reminder' | 'warning' | 'deadline' | 'action-required';
  status: 'active' | 'paused';
  targetRole: string;
  condition: string;
  frequency: string;
  channels: ('email' | 'sms' | 'push')[];
  template: string;
  activeCount: number;
  totalSent: number;
}

export default function NotificationAutomation() {
  const [activeTab, setActiveTab] = useState<'automation' | 'nudges' | 'analytics'>('automation');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterScope, setFilterScope] = useState('all');
  const [showCreateRuleModal, setShowCreateRuleModal] = useState(false);
  const [showCreateNudgeModal, setShowCreateNudgeModal] = useState(false);

  const notificationRules: NotificationRule[] = [
    {
      id: 'RULE-001',
      name: 'Campaign Start Announcement',
      status: 'active',
      triggerType: 'event',
      scope: 'campaign',
      scopeTarget: 'All Campaigns',
      trigger: {
        event: 'Campaign Status Changed to Active'
      },
      channels: ['email', 'sms'],
      templates: {
        email: 'TEMP-EMAIL-001',
        sms: 'TEMP-SMS-001'
      },
      recipients: {
        type: 'role',
        targets: ['RECEE Officer', 'Tour Coordinator', 'Campaign Manager']
      },
      timing: {
        immediate: true
      },
      statistics: {
        triggered: 3,
        sent: 156,
        delivered: 154,
        opened: 142
      },
      createdBy: 'Admin User',
      createdDate: '2025-01-10',
      lastTriggered: '2025-12-23'
    },
    {
      id: 'RULE-002',
      name: 'Cycle Activation Notice',
      status: 'active',
      triggerType: 'event',
      scope: 'cycle',
      scopeTarget: 'All Cycles',
      trigger: {
        event: 'Cycle Becomes Active'
      },
      channels: ['email', 'push'],
      templates: {
        email: 'TEMP-EMAIL-007'
      },
      recipients: {
        type: 'role',
        targets: ['RECEE Officer', 'Tour Supervisor']
      },
      timing: {
        immediate: true
      },
      statistics: {
        triggered: 8,
        sent: 312,
        delivered: 308,
        opened: 289
      },
      createdBy: 'Campaign Manager',
      createdDate: '2025-01-15',
      lastTriggered: '2025-12-20'
    },
    {
      id: 'RULE-003',
      name: 'RECEE Deadline - 3 Days Warning',
      status: 'active',
      triggerType: 'schedule',
      scope: 'activity',
      scopeTarget: 'RECEE Inspection Submission',
      trigger: {
        schedule: '3 days before deadline'
      },
      channels: ['email', 'sms'],
      templates: {
        email: 'TEMP-EMAIL-012',
        sms: 'TEMP-SMS-005'
      },
      recipients: {
        type: 'role',
        targets: ['RECEE Officer']
      },
      timing: {
        immediate: false,
        beforeDeadline: '3 days'
      },
      statistics: {
        triggered: 24,
        sent: 576,
        delivered: 572,
        opened: 503
      },
      createdBy: 'Admin User',
      createdDate: '2025-02-01',
      lastTriggered: '2025-12-22'
    },
    {
      id: 'RULE-004',
      name: 'School Assignment Notification',
      status: 'active',
      triggerType: 'event',
      scope: 'activity',
      scopeTarget: 'School Assignment',
      trigger: {
        event: 'Schools Assigned to Officer'
      },
      channels: ['email', 'sms', 'push'],
      templates: {
        email: 'TEMP-EMAIL-003',
        sms: 'TEMP-SMS-002'
      },
      recipients: {
        type: 'custom',
        targets: ['Assigned Officer']
      },
      timing: {
        immediate: true
      },
      statistics: {
        triggered: 156,
        sent: 156,
        delivered: 156,
        opened: 148
      },
      createdBy: 'Campaign Manager',
      createdDate: '2025-01-20',
      lastTriggered: '2025-12-23'
    },
    {
      id: 'RULE-005',
      name: 'Tour Booking Confirmation',
      status: 'active',
      triggerType: 'event',
      scope: 'pipeline',
      scopeTarget: 'Tour Pipeline - Booking Stage',
      trigger: {
        event: 'School Moved to Booked'
      },
      channels: ['email', 'sms'],
      templates: {
        email: 'TEMP-EMAIL-015',
        sms: 'TEMP-SMS-007'
      },
      recipients: {
        type: 'custom',
        targets: ['School Contact', 'Tour Supervisor']
      },
      timing: {
        immediate: true
      },
      statistics: {
        triggered: 423,
        sent: 846,
        delivered: 842,
        opened: 789
      },
      createdBy: 'Tour Coordinator',
      createdDate: '2025-02-10',
      lastTriggered: '2025-12-23'
    },
    {
      id: 'RULE-006',
      name: 'Competition Entry Deadline - 1 Day',
      status: 'active',
      triggerType: 'schedule',
      scope: 'pipeline',
      scopeTarget: 'Competition Pipeline',
      trigger: {
        schedule: '1 day before deadline'
      },
      channels: ['email', 'sms'],
      templates: {
        email: 'TEMP-EMAIL-018',
        sms: 'TEMP-SMS-009'
      },
      recipients: {
        type: 'custom',
        targets: ['Schools with No Submission']
      },
      timing: {
        immediate: false,
        beforeDeadline: '1 day'
      },
      statistics: {
        triggered: 12,
        sent: 2184,
        delivered: 2167,
        opened: 1923
      },
      createdBy: 'Campaign Manager',
      createdDate: '2025-03-01',
      lastTriggered: '2025-12-21'
    },
    {
      id: 'RULE-007',
      name: 'Cycle Close Warning - 7 Days',
      status: 'paused',
      triggerType: 'schedule',
      scope: 'cycle',
      scopeTarget: 'Active Cycles',
      trigger: {
        schedule: '7 days before cycle end'
      },
      channels: ['email'],
      templates: {
        email: 'TEMP-EMAIL-020'
      },
      recipients: {
        type: 'role',
        targets: ['Campaign Manager', 'Tour Coordinator']
      },
      timing: {
        immediate: false,
        beforeDeadline: '7 days'
      },
      statistics: {
        triggered: 4,
        sent: 24,
        delivered: 24,
        opened: 22
      },
      createdBy: 'Admin User',
      createdDate: '2025-03-15',
      lastTriggered: '2025-11-28'
    },
    {
      id: 'RULE-008',
      name: 'Pending RECEE Inspections',
      status: 'active',
      triggerType: 'condition',
      scope: 'activity',
      scopeTarget: 'RECEE Inspection',
      trigger: {
        condition: 'Inspection Pending > 5 days'
      },
      channels: ['email', 'push'],
      templates: {
        email: 'TEMP-EMAIL-014'
      },
      recipients: {
        type: 'role',
        targets: ['RECEE Officer', 'Field Supervisor']
      },
      timing: {
        immediate: false,
        delay: 'Check daily at 9:00 AM'
      },
      statistics: {
        triggered: 45,
        sent: 89,
        delivered: 89,
        opened: 76
      },
      createdBy: 'Field Supervisor',
      createdDate: '2025-04-01',
      lastTriggered: '2025-12-23'
    }
  ];

  const nudges: Nudge[] = [
    {
      id: 'NUDGE-001',
      name: 'Incomplete RECEE Reports',
      type: 'action-required',
      status: 'active',
      targetRole: 'RECEE Officer',
      condition: 'Has assigned schools with no inspection report',
      frequency: 'Daily at 8:00 AM',
      channels: ['email', 'push'],
      template: 'TEMP-EMAIL-025',
      activeCount: 12,
      totalSent: 156
    },
    {
      id: 'NUDGE-002',
      name: 'Pending Tour Confirmations',
      type: 'reminder',
      status: 'active',
      targetRole: 'Tour Supervisor',
      condition: 'Has schools in Confirmed status > 3 days',
      frequency: 'Every 2 days',
      channels: ['email', 'sms'],
      template: 'TEMP-EMAIL-026',
      activeCount: 8,
      totalSent: 94
    },
    {
      id: 'NUDGE-003',
      name: 'Unassigned Schools Alert',
      type: 'warning',
      status: 'active',
      targetRole: 'Campaign Manager',
      condition: 'Active cycle has unassigned schools',
      frequency: 'Daily at 10:00 AM',
      channels: ['email', 'push'],
      template: 'TEMP-EMAIL-027',
      activeCount: 3,
      totalSent: 21
    },
    {
      id: 'NUDGE-004',
      name: 'Approaching Submission Deadline',
      type: 'deadline',
      status: 'active',
      targetRole: 'RECEE Officer',
      condition: 'Deadline within 48 hours and incomplete tasks',
      frequency: 'Every 12 hours',
      channels: ['email', 'sms', 'push'],
      template: 'TEMP-EMAIL-028',
      activeCount: 18,
      totalSent: 267
    },
    {
      id: 'NUDGE-005',
      name: 'Competition Entries Not Judged',
      type: 'action-required',
      status: 'active',
      targetRole: 'Competition Judge',
      condition: 'Has assigned entries pending > 2 days',
      frequency: 'Daily at 6:00 PM',
      channels: ['email'],
      template: 'TEMP-EMAIL-029',
      activeCount: 24,
      totalSent: 312
    },
    {
      id: 'NUDGE-006',
      name: 'Low Response Rate Warning',
      type: 'warning',
      status: 'paused',
      targetRole: 'Tour Coordinator',
      condition: 'School response rate < 30% in cluster',
      frequency: 'Weekly on Monday',
      channels: ['email'],
      template: 'TEMP-EMAIL-030',
      activeCount: 0,
      totalSent: 45
    }
  ];

  const filteredRules = notificationRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.scopeTarget.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus;
    const matchesScope = filterScope === 'all' || rule.scope === filterScope;
    return matchesSearch && matchesStatus && matchesScope;
  });

  const filteredNudges = nudges.filter(nudge => {
    const matchesSearch = nudge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nudge.targetRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || nudge.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: 'active' | 'paused' | 'draft') => {
    const config = {
      active: { bg: 'bg-[#2F6B3C]', text: 'Active' },
      paused: { bg: 'bg-[#D4A017]', text: 'Paused' },
      draft: { bg: 'bg-[#9E9E9E]', text: 'Draft' }
    };
    const statusConfig = config[status];
    return (
      <span className={`${statusConfig.bg} text-white px-2 py-1 rounded text-[11px]`}>
        {statusConfig.text}
      </span>
    );
  };

  const getScopeIcon = (scope: string) => {
    const icons = {
      campaign: Calendar,
      cycle: Clock,
      pipeline: TrendingUp,
      activity: Zap
    };
    return icons[scope as keyof typeof icons] || Bell;
  };

  const getTriggerTypeIcon = (type: string) => {
    const icons = {
      event: Zap,
      schedule: Clock,
      condition: Filter
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNudgeTypeColor = (type: string) => {
    const colors = {
      'action-required': '#8C1D18',
      'warning': '#D4A017',
      'deadline': '#F5A623',
      'reminder': '#2F6B3C'
    };
    return colors[type as keyof typeof colors] || '#9E9E9E';
  };

  // Calculate analytics
  const totalRules = notificationRules.length;
  const activeRules = notificationRules.filter(r => r.status === 'active').length;
  const totalSent = notificationRules.reduce((sum, r) => sum + r.statistics.sent, 0);
  const totalDelivered = notificationRules.reduce((sum, r) => sum + r.statistics.delivered, 0);
  const deliveryRate = totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0;
  const totalOpened = notificationRules.reduce((sum, r) => sum + r.statistics.opened, 0);
  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Notification Automation"
        subtitle="Configure automated notifications, triggers, and nudges for campaigns and activities"
       
        actions={
          <div className="flex items-center gap-3">
            <button 
              onClick={() => activeTab === 'automation' ? setShowCreateRuleModal(true) : setShowCreateNudgeModal(true)}
              className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {activeTab === 'automation' ? 'Create Rule' : 'Create Nudge'}
            </button>
          </div>
        }
      />

      <div className="px-8">
        <div className="max-w-[1200px] mx-auto py-8">
        {/* Summary Statistics */}
        <div className="mb-6 grid grid-cols-5 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Rules</span>
              <Bell className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalRules}</div>
            <div className="text-[11px] text-[#2F6B3C] mt-1">{activeRules} active</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Active Nudges</span>
              <AlertCircle className="w-4 h-4 text-[#D4A017]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{nudges.filter(n => n.status === 'active').length}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">
              {nudges.reduce((sum, n) => sum + n.activeCount, 0)} pending
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Sent</span>
              <Mail className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[24px] text-[#2B2B2B]">{totalSent.toLocaleString()}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">This month</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Delivery Rate</span>
              <CheckCircle className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{deliveryRate}%</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{totalDelivered.toLocaleString()} delivered</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Open Rate</span>
              <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{openRate}%</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{totalOpened.toLocaleString()} opened</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('automation')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'automation'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <Zap className="w-4 h-4" />
              Automation Rules
              <span className="px-2 py-0.5 bg-[#2F6B3C] text-white rounded-full text-[11px]">
                {activeRules}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('nudges')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'nudges'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Nudges & Reminders
              <span className="px-2 py-0.5 bg-[#D4A017] text-white rounded-full text-[11px]">
                {nudges.reduce((sum, n) => sum + n.activeCount, 0)}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'border-[#F5A623] text-[#F5A623]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>

        {/* AUTOMATION RULES TAB */}
        {activeTab === 'automation' && (
          <>
            {/* Search and Filters */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search automation rules..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <select
                value={filterScope}
                onChange={(e) => setFilterScope(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Scopes</option>
                <option value="campaign">Campaign</option>
                <option value="cycle">Cycle</option>
                <option value="pipeline">Pipeline</option>
                <option value="activity">Activity</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredRules.length} automation rules
            </div>

            {/* Rules Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Rule Name</th>
                    <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Scope</th>
                    <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Trigger</th>
                    <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Recipients</th>
                    <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Channels</th>
                    <th className="px-4 py-3 text-center text-[12px] text-[#2B2B2B]">Status</th>
                    <th className="px-4 py-3 text-right text-[12px] text-[#2B2B2B]">Performance</th>
                    <th className="px-4 py-3 text-center text-[12px] text-[#2B2B2B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((rule) => {
                    const ScopeIcon = getScopeIcon(rule.scope);
                    const TriggerIcon = getTriggerTypeIcon(rule.triggerType);
                    const deliveryRate = rule.statistics.sent > 0 
                      ? Math.round((rule.statistics.delivered / rule.statistics.sent) * 100)
                      : 0;

                    return (
                      <tr key={rule.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-[14px] text-[#2B2B2B] mb-1">{rule.name}</div>
                            <div className="text-[11px] text-[#9E9E9E]">
                              Last triggered: {rule.lastTriggered || 'Never'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <ScopeIcon className="w-4 h-4 text-[#F5A623]" />
                            <div>
                              <div className="text-[13px] text-[#2B2B2B] capitalize">{rule.scope}</div>
                              <div className="text-[11px] text-[#9E9E9E]">{rule.scopeTarget}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <TriggerIcon className="w-4 h-4 text-[#9E9E9E]" />
                            <div>
                              <div className="text-[13px] text-[#2B2B2B] capitalize">{rule.triggerType}</div>
                              <div className="text-[11px] text-[#9E9E9E]">
                                {rule.trigger.event || rule.trigger.schedule || rule.trigger.condition}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-[13px] text-[#2B2B2B] capitalize">{rule.recipients.type}</div>
                          <div className="text-[11px] text-[#9E9E9E]">
                            {rule.recipients.targets.slice(0, 2).join(', ')}
                            {rule.recipients.targets.length > 2 && ` +${rule.recipients.targets.length - 2}`}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            {rule.channels.includes('email') && (
                              <div className="p-1 bg-[#F5A623] bg-opacity-10 rounded" title="Email">
                                <Mail className="w-3 h-3 text-[#F5A623]" />
                              </div>
                            )}
                            {rule.channels.includes('sms') && (
                              <div className="p-1 bg-[#2F6B3C] bg-opacity-10 rounded" title="SMS">
                                <MessageSquare className="w-3 h-3 text-[#2F6B3C]" />
                              </div>
                            )}
                            {rule.channels.includes('push') && (
                              <div className="p-1 bg-[#D4A017] bg-opacity-10 rounded" title="Push">
                                <Bell className="w-3 h-3 text-[#D4A017]" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {getStatusBadge(rule.status)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="text-[13px] text-[#2B2B2B]">
                            {deliveryRate}% delivered
                          </div>
                          <div className="text-[11px] text-[#9E9E9E]">
                            {rule.statistics.sent.toLocaleString()} sent
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              className="p-1.5 text-[#9E9E9E] hover:bg-[#F9FAFB] rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-[#9E9E9E] hover:bg-[#F9FAFB] rounded transition-colors"
                              title="Clone"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            {rule.status === 'active' ? (
                              <button 
                                className="p-1.5 text-[#D4A017] hover:bg-[#FFF4E6] rounded transition-colors"
                                title="Pause"
                              >
                                <Pause className="w-4 h-4" />
                              </button>
                            ) : (
                              <button 
                                className="p-1.5 text-[#2F6B3C] hover:bg-[#F0F9F4] rounded transition-colors"
                                title="Activate"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* NUDGES TAB */}
        {activeTab === 'nudges' && (
          <>
            {/* Search and Filters */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search nudges..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredNudges.length} nudges • {filteredNudges.reduce((sum, n) => sum + n.activeCount, 0)} pending actions
            </div>

            {/* Nudges Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredNudges.map((nudge) => (
                <div 
                  key={nudge.id}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="px-2 py-1 rounded text-[11px] text-white capitalize"
                          style={{ backgroundColor: getNudgeTypeColor(nudge.type) }}
                        >
                          {nudge.type.replace('-', ' ')}
                        </span>
                        {getStatusBadge(nudge.status)}
                      </div>
                      <h3 className="text-[14px] text-[#2B2B2B] mb-1">{nudge.name}</h3>
                      <div className="text-[12px] text-[#9E9E9E]">
                        Target: {nudge.targetRole}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-[12px]">
                      <Filter className="w-4 h-4 text-[#9E9E9E] flex-shrink-0 mt-0.5" />
                      <div className="text-[#9E9E9E]">{nudge.condition}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <Clock className="w-4 h-4 text-[#9E9E9E]" />
                      <div className="text-[#9E9E9E]">{nudge.frequency}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {nudge.channels.map((channel) => (
                        <div 
                          key={channel}
                          className="px-2 py-1 bg-[#F9FAFB] rounded text-[11px] text-[#2B2B2B] capitalize"
                        >
                          {channel}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-[18px] text-[#F5A623]">{nudge.activeCount}</div>
                        <div className="text-[11px] text-[#9E9E9E]">Active</div>
                      </div>
                      <div>
                        <div className="text-[18px] text-[#2B2B2B]">{nudge.totalSent}</div>
                        <div className="text-[11px] text-[#9E9E9E]">Total Sent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-[#9E9E9E] hover:bg-[#F9FAFB] rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {nudge.status === 'active' ? (
                        <button className="p-1.5 text-[#D4A017] hover:bg-[#FFF4E6] rounded transition-colors">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1.5 text-[#2F6B3C] hover:bg-[#F0F9F4] rounded transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-center">
              <TrendingUp className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
              <h3 className="text-[16px] text-[#2B2B2B] mb-2">Detailed Analytics Coming Soon</h3>
              <p className="text-[13px] text-[#9E9E9E]">
                View comprehensive notification performance metrics, delivery rates, and engagement analytics
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
