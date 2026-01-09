'use client'
import { useState } from 'react';
import { Search, Download, MessageSquare, Eye, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

interface SMSSent {
  id: string;
  templateName: string;
  messagePreview: string;
  recipient: string;
  recipientType: 'school' | 'facilitator' | 'inspector' | 'admin';
  status: 'delivered' | 'pending' | 'failed' | 'undelivered';
  sentDate: string;
  deliveredDate: string | null;
  sentBy: string;
  cost: number;
}

export default function SMSSent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRecipientType, setFilterRecipientType] = useState('all');
  const [sortColumn, setSortColumn] = useState<'sentDate' | 'recipient' | 'templateName'>('sentDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const smsSent: SMSSent[] = [
    {
      id: 'SMS-SENT-001',
      templateName: 'Tour Confirmation',
      messagePreview: 'Hello Mrs. Adeyemi, your Maltina School Tour is confirmed for 2025-02-15...',
      recipient: '+234 803 XXX 4521',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-20 09:15',
      deliveredDate: '2025-01-20 09:15',
      sentBy: 'Chioma Okonkwo',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-002',
      templateName: 'RECEE Reminder 24hrs',
      messagePreview: 'Reminder: RECEE inspection for Government College Ikorodu tomorrow...',
      recipient: '+234 805 XXX 7832',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-21 08:30',
      deliveredDate: '2025-01-21 08:31',
      sentBy: 'Emeka Nwankwo',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-003',
      templateName: 'Booking Link',
      messagePreview: 'Dear Mr. Okafor, book your Maltina School Tour slot now: https://...',
      recipient: '+234 806 XXX 2198',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-19 14:00',
      deliveredDate: '2025-01-19 14:01',
      sentBy: 'Adebayo Johnson',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-004',
      templateName: 'Facilitator Assignment Alert',
      messagePreview: 'Hi John, you are assigned to King\'s College on 2025-02-12...',
      recipient: '+234 807 XXX 5643',
      recipientType: 'facilitator',
      status: 'delivered',
      sentDate: '2025-01-18 11:20',
      deliveredDate: '2025-01-18 11:21',
      sentBy: 'Chioma Okonkwo',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-005',
      templateName: 'Registration Approved',
      messagePreview: 'Congratulations! Community Secondary School has been approved...',
      recipient: '+234 809 XXX 3421',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-22 10:00',
      deliveredDate: '2025-01-22 10:01',
      sentBy: 'Fatima Abubakar',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-006',
      templateName: 'Tour Confirmation',
      messagePreview: 'Hello Dr. Ibrahim, your Maltina School Tour is confirmed...',
      recipient: '+234 810 XXX 8765',
      recipientType: 'school',
      status: 'failed',
      sentDate: '2025-01-20 09:15',
      deliveredDate: null,
      sentBy: 'Chioma Okonkwo',
      cost: 0
    },
    {
      id: 'SMS-SENT-007',
      templateName: 'RECEE Reminder 24hrs',
      messagePreview: 'Reminder: RECEE inspection for St. Mary\'s School tomorrow...',
      recipient: '+234 811 XXX 4532',
      recipientType: 'school',
      status: 'pending',
      sentDate: '2025-01-22 15:30',
      deliveredDate: null,
      sentBy: 'Emeka Nwankwo',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-008',
      templateName: 'Urgent Tour Cancellation',
      messagePreview: 'URGENT: Maltina School Tour at Federal Girls College on 2025-02-10...',
      recipient: '+234 812 XXX 6789',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-17 16:45',
      deliveredDate: '2025-01-17 16:46',
      sentBy: 'Blessing Okafor',
      cost: 2.5
    },
    {
      id: 'SMS-SENT-009',
      templateName: 'Booking Link',
      messagePreview: 'Dear Mrs. Eze, book your Maltina School Tour slot now...',
      recipient: '+234 813 XXX 2345',
      recipientType: 'school',
      status: 'delivered',
      sentDate: '2025-01-19 14:00',
      deliveredDate: '2025-01-19 14:01',
      sentBy: 'Adebayo Johnson',
      cost: 2.5
    }
  ];

  // Filter and sort
  const filteredSMS = smsSent
    .filter(sms => {
      const matchesSearch = 
        sms.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sms.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sms.messagePreview.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || sms.status === filterStatus;
      const matchesRecipientType = filterRecipientType === 'all' || sms.recipientType === filterRecipientType;

      return matchesSearch && matchesStatus && matchesRecipientType;
    })
    .sort((a, b) => {
      let aValue: any = '';
      let bValue: any = '';

      if (sortColumn === 'sentDate') {
        aValue = a.sentDate;
        bValue = b.sentDate;
      } else if (sortColumn === 'recipient') {
        aValue = a.recipient;
        bValue = b.recipient;
      } else if (sortColumn === 'templateName') {
        aValue = a.templateName;
        bValue = b.templateName;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Summary stats
  const totalSent = smsSent.length;
  const delivered = smsSent.filter(s => s.status === 'delivered').length;
  const pending = smsSent.filter(s => s.status === 'pending').length;
  const failed = smsSent.filter(s => s.status === 'failed').length;
  const totalCost = smsSent.reduce((sum, sms) => sum + sms.cost, 0);
  const deliveryRate = totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(1) : '0.0';

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

  const getStatusBadge = (status: SMSSent['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <div className="flex items-center gap-1.5 text-[#2F6B3C]">
            <CheckCircle className="w-4 h-4" />
            <span className="text-[13px]">Delivered</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1.5 text-[#D4A017]">
            <Clock className="w-4 h-4" />
            <span className="text-[13px]">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1.5 text-[#8C1D18]">
            <XCircle className="w-4 h-4" />
            <span className="text-[13px]">Failed</span>
          </div>
        );
      case 'undelivered':
        return (
          <div className="flex items-center gap-1.5 text-[#8C1D18]">
            <XCircle className="w-4 h-4" />
            <span className="text-[13px]">Undelivered</span>
          </div>
        );
    }
  };

  const getRecipientTypeBadge = (type: SMSSent['recipientType']) => {
    const colors: Record<string, string> = {
      school: 'bg-[#F5A623] text-white',
      facilitator: 'bg-[#2F6B3C] text-white',
      inspector: 'bg-[#D4A017] text-white',
      admin: 'bg-[#9E9E9E] text-white'
    };

    return (
      <span className={`px-2 py-0.5 rounded text-[11px] ${colors[type]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="SMS Sent"
        subtitle="View history and track delivery status of all sent SMS messages"
       
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Sent</span>
              <MessageSquare className="w-4 h-4 text-[#2B2B2B]" />
            </div>
            <div className="text-[24px] text-[#2B2B2B]">{totalSent}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Delivered</span>
              <CheckCircle className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[24px] text-[#2F6B3C]">{delivered}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Pending</span>
              <Clock className="w-4 h-4 text-[#D4A017]" />
            </div>
            <div className="text-[24px] text-[#D4A017]">{pending}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Delivery Rate</span>
              <CheckCircle className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[24px] text-[#2F6B3C]">{deliveryRate}%</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Cost</span>
              <MessageSquare className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[24px] text-[#F5A623]">₦{totalCost.toFixed(2)}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Search */}
            <div className="col-span-5">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Search SMS</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                <input
                  type="text"
                  placeholder="Search by recipient, template, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-span-3">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="undelivered">Undelivered</option>
              </select>
            </div>

            {/* Recipient Type Filter */}
            <div className="col-span-3">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Recipient Type</label>
              <select
                value={filterRecipientType}
                onChange={(e) => setFilterRecipientType(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="school">School</option>
                <option value="facilitator">Facilitator</option>
                <option value="inspector">Inspector</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="col-span-1 flex items-end">
              <button className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <div className="text-[14px] text-[#9E9E9E]">
            Showing {filteredSMS.length} of {totalSent} SMS messages
          </div>
        </div>

        {/* SMS Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('sentDate')}
                  >
                    Sent Date <SortIcon column="sentDate" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('templateName')}
                  >
                    Template <SortIcon column="templateName" />
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Message Preview
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-[12px] text-[#9E9E9E] cursor-pointer hover:text-[#F5A623] transition-colors"
                    onClick={() => handleSort('recipient')}
                  >
                    Recipient <SortIcon column="recipient" />
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Cost
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#9E9E9E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSMS.map((sms) => (
                  <tr 
                    key={sms.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B]">{sms.sentDate}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[14px] text-[#2B2B2B]">{sms.templateName}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[12px] text-[#9E9E9E] max-w-[200px] truncate">{sms.messagePreview}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B]">{sms.recipient}</div>
                    </td>
                    <td className="px-4 py-3">
                      {getRecipientTypeBadge(sms.recipientType)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(sms.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#2B2B2B]">₦{sms.cost.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-[#9E9E9E] hover:text-[#F5A623]" />
                        </button>
                        
                        {sms.status === 'failed' && (
                          <button 
                            className="p-1.5 hover:bg-[#F9FAFB] rounded transition-colors"
                            title="Retry Send"
                          >
                            <RefreshCw className="w-4 h-4 text-[#9E9E9E] hover:text-[#F5A623]" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div className="text-[12px] text-[#9E9E9E]">
            <strong className="text-[#2B2B2B]">SMS Sent Log:</strong> This screen shows all SMS messages that have been sent from the system. Each SMS is created when you use "Send" in SMS Templates and select an audience. Track delivery status and costs. Failed messages can be retried from this screen. SMS costs are approximately ₦2.50 per message.
          </div>
        </div>
      </div>
    </div>
  );
}
