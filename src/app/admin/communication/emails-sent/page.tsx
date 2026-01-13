'use client'
import { useState } from 'react';
import { Mail, Calendar, User, AlertCircle, CheckCircle, XCircle, Search, Filter, Download } from 'lucide-react';

interface EmailLog {
  id: string;
  recipient: string;
  recipientType: 'School' | 'RECEE Officer' | 'Judge' | 'Tour Manager';
  subject: string;
  template: string;
  sentAt: string;
  status: 'delivered' | 'bounced' | 'opened' | 'clicked';
  campaign: string;
  cycle: string;
  triggeredBy: string;
  openedAt?: string;
  clickedAt?: string;
}

const MOCK_EMAILS: EmailLog[] = [
  {
    id: 'EML001',
    recipient: 'principal@gracehighschool.edu.ng',
    recipientType: 'School',
    subject: 'Maltina Tour 2025 - Interest Form',
    template: 'FORM-INT-01 School Interest Invitation',
    sentAt: '2025-12-28 09:15:00',
    status: 'opened',
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    triggeredBy: 'Adebayo Ogunlesi',
    openedAt: '2025-12-28 10:30:00'
  },
  {
    id: 'EML002',
    recipient: 'admin@royalacademy.com',
    recipientType: 'School',
    subject: 'Maltina Tour 2025 - RECEE Booking Confirmation',
    template: 'RECEE Scheduled Notification',
    sentAt: '2025-12-28 09:20:00',
    status: 'delivered',
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    triggeredBy: 'System Auto'
  },
  {
    id: 'EML003',
    recipient: 'recee.officer@maltina.com',
    recipientType: 'RECEE Officer',
    subject: 'New RECEE Assignment - Grace High School',
    template: 'RECEE Officer Assignment',
    sentAt: '2025-12-28 09:25:00',
    status: 'clicked',
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    triggeredBy: 'Chioma Nwosu',
    openedAt: '2025-12-28 09:30:00',
    clickedAt: '2025-12-28 09:35:00'
  },
  {
    id: 'EML004',
    recipient: 'bounced@invalid.email',
    recipientType: 'School',
    subject: 'Maltina Tour 2025 - Booking Link',
    template: 'FORM-BKG-01 Booking Link',
    sentAt: '2025-12-28 09:30:00',
    status: 'bounced',
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    triggeredBy: 'System Auto'
  },
  {
    id: 'EML005',
    recipient: 'judge@competitionpanel.com',
    recipientType: 'Judge',
    subject: 'Design Scoring Assignment - 40 Designs',
    template: 'Judge Assignment Notification',
    sentAt: '2025-12-28 10:00:00',
    status: 'opened',
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    triggeredBy: 'Ibrahim Musa',
    openedAt: '2025-12-28 10:15:00'
  }
];

export default function EmailsSent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    recipientType: '',
    campaign: 'Campaign 2025',
    dateRange: 'today'
  });

  const filteredEmails = MOCK_EMAILS.filter(email => {
    if (searchQuery && !email.recipient.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !email.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.status && email.status !== filters.status) {
      return false;
    }
    if (filters.recipientType && email.recipientType !== filters.recipientType) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-[#E8F5E9] text-[#2F6B3C]';
      case 'opened':
        return 'bg-[#E3F2FD] text-[#1976D2]';
      case 'clicked':
        return 'bg-[#F3E5F5] text-[#7B1FA2]';
      case 'bounced':
        return 'bg-[#FDE8E7] text-[#8C1D18]';
      default:
        return 'bg-[#F2F1EE] text-[#9E9E9E]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'opened':
        return <Mail className="w-4 h-4" />;
      case 'clicked':
        return <CheckCircle className="w-4 h-4" />;
      case 'bounced':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const summary = {
    total: MOCK_EMAILS.length,
    delivered: MOCK_EMAILS.filter(e => e.status === 'delivered').length,
    opened: MOCK_EMAILS.filter(e => e.status === 'opened').length,
    clicked: MOCK_EMAILS.filter(e => e.status === 'clicked').length,
    bounced: MOCK_EMAILS.filter(e => e.status === 'bounced').length,
    openRate: Math.round((MOCK_EMAILS.filter(e => e.status === 'opened' || e.status === 'clicked').length / MOCK_EMAILS.length) * 100)
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-3">
            <div className="flex-1 relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="bounced">Bounced</option>
            </select>

            <select
              value={filters.recipientType}
              onChange={(e) => setFilters({ ...filters, recipientType: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All Recipients</option>
              <option value="School">Schools</option>
              <option value="RECEE Officer">RECEE Officers</option>
              <option value="Judge">Judges</option>
              <option value="Tour Manager">Tour Managers</option>
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Emails Sent
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            All automated email events with delivery tracking
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Total Sent
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {summary.total}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Delivered
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2F6B3C]">
              {summary.delivered}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Opened
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {summary.opened}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Clicked
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {summary.clicked}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Bounced
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
              {summary.bounced}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Open Rate
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {summary.openRate}%
            </div>
          </div>
        </div>

        {/* Email Logs Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Recipient
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Template
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Sent At
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Triggered By
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email) => (
                  <tr
                    key={email.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium">
                        {email.recipient}
                      </div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                        {email.recipientType}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                        {email.subject}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                        {email.template}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                        {new Date(email.sentAt).toLocaleString()}
                      </div>
                      {email.openedAt && (
                        <div className="text-[10px] text-[#9E9E9E] mt-1">
                          Opened: {new Date(email.openedAt).toLocaleString()}
                        </div>
                      )}
                      {email.clickedAt && (
                        <div className="text-[10px] text-[#9E9E9E] mt-1">
                          Clicked: {new Date(email.clickedAt).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] ${getStatusBadge(email.status)}`}>
                        {getStatusIcon(email.status)}
                        {email.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[14px] text-[#2B2B2B]">
                        <User className="w-3 h-3 text-[#9E9E9E]" />
                        {email.triggeredBy}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12 text-[#9E9E9E]">
            No emails found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}
