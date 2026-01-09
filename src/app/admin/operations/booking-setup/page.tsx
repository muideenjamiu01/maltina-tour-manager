'use client'
import { useState } from 'react';
import { Search, Filter, Download, Mail, Calendar, MoreVertical, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  schoolName: string;
  cluster: string;
  state: string;
  lga: string;
  status: 'Not Sent' | 'Sent' | 'Viewed' | 'Booked' | 'Link Expired' | 'Changed by Admin' | 'Cancelled' | 'Needs Help';
  lastEmailSent: string;
  bookingDeadline: string;
  bookingDate: string;
  updatedBy: string;
}

export default function BookingTracker_Desktop() {
 
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showActions, setShowActions] = useState<string | null>(null);

  const bookings: Booking[] = [
    {
      id: '1',
      schoolName: 'Greenfield Primary School',
      cluster: 'Lagos Central A',
      state: 'Lagos',
      lga: 'Ikeja',
      status: 'Booked',
      lastEmailSent: 'Jan 15, 2025',
      bookingDeadline: 'Jan 18, 2025',
      bookingDate: 'Jan 20, 2025',
      updatedBy: 'System'
    },
    {
      id: '2',
      schoolName: 'St. Mary\'s Secondary School',
      cluster: 'Lagos Central A',
      state: 'Lagos',
      lga: 'Surulere',
      status: 'Sent',
      lastEmailSent: 'Jan 15, 2025',
      bookingDeadline: 'Jan 18, 2025',
      bookingDate: '-',
      updatedBy: 'Admin'
    },
    {
      id: '3',
      schoolName: 'Victory College',
      cluster: 'Lagos East B',
      state: 'Lagos',
      lga: 'Lekki',
      status: 'Viewed',
      lastEmailSent: 'Jan 14, 2025',
      bookingDeadline: 'Jan 17, 2025',
      bookingDate: '-',
      updatedBy: 'System'
    },
    {
      id: '4',
      schoolName: 'Hope Academy',
      cluster: 'Lagos Central A',
      state: 'Lagos',
      lga: 'Yaba',
      status: 'Not Sent',
      lastEmailSent: '-',
      bookingDeadline: 'Jan 18, 2025',
      bookingDate: '-',
      updatedBy: '-'
    },
    {
      id: '5',
      schoolName: 'Excellence International',
      cluster: 'Lagos East B',
      state: 'Lagos',
      lga: 'Ajah',
      status: 'Needs Help',
      lastEmailSent: 'Jan 13, 2025',
      bookingDeadline: 'Jan 17, 2025',
      bookingDate: '-',
      updatedBy: 'John Doe'
    },
  ];

  const stats = {
    totalInScope: 127,
    booked: 45,
    notBooked: 82,
    expiringSoon: 12
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: any }> = {
      'Not Sent': { bg: 'bg-[#F3F4F6]', text: 'text-[#6B7280]', icon: Clock },
      'Sent': { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]', icon: Mail },
      'Viewed': { bg: 'bg-[#FFF7ED]', text: 'text-[#FF8500]', icon: AlertCircle },
      'Booked': { bg: 'bg-[#D1FAE5]', text: 'text-[#065F46]', icon: CheckCircle },
      'Link Expired': { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', icon: XCircle },
      'Changed by Admin': { bg: 'bg-[#E0E7FF]', text: 'text-[#3730A3]', icon: Calendar },
      'Cancelled': { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', icon: XCircle },
      'Needs Help': { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', icon: AlertCircle }
    };

    const style = styles[status] || styles['Not Sent'];
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#1F2937] mb-2">Booking Tracker</h1>
        <p className="text-[#4B5563]">Manage school visit bookings and track status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#4B5563] mb-1">Total in Scope</div>
          <div className="text-2xl text-[#1F2937]">{stats.totalInScope}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#4B5563] mb-1">Booked</div>
          <div className="text-2xl text-[#10B981]">{stats.booked}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#4B5563] mb-1">Not Booked</div>
          <div className="text-2xl text-[#F59E0B]">{stats.notBooked}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#4B5563] mb-1">Expiring Soon</div>
          <div className="text-2xl text-[#DC2626]">{stats.expiringSoon}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by school name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-2"
          >
            <Filter className="w-5 h-5 text-[#4B5563]" />
            Filters
          </button>

          <button className="px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#4B5563]" />
            Export
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#E5E7EB]">
            <div>
              <label className="block text-sm text-[#FF8500] mb-1.5">Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
              >
                <option value="all">All Statuses</option>
                <option value="not-sent">Not Sent</option>
                <option value="sent">Sent</option>
                <option value="viewed">Viewed</option>
                <option value="booked">Booked</option>
                <option value="needs-help">Needs Help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#FF8500] mb-1.5">State</label>
              <select className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20">
                <option>All States</option>
                <option>Lagos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#FF8500] mb-1.5">Cluster</label>
              <select className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20">
                <option>All Clusters</option>
                <option>Lagos Central A</option>
                <option>Lagos East B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#FF8500] mb-1.5">Deadline</label>
              <select className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20">
                <option>All Dates</option>
                <option>This Week</option>
                <option>Next Week</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">School Name</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Cluster</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">State / LGA</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Status</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Last Email</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Deadline</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Booking Date</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Updated By</th>
                <th className="text-left px-4 py-3 text-sm text-[#4B5563]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#F9FAFB]">
                  <td className="px-4 py-3">
                    <button
                     
                      className="text-[#FF8500] hover:text-[#E67700]"
                    >
                      {booking.schoolName}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.cluster}</td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.state} / {booking.lga}</td>
                  <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.lastEmailSent}</td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.bookingDeadline}</td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.bookingDate}</td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">{booking.updatedBy}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === booking.id ? null : booking.id)}
                        className="p-1 hover:bg-[#F9FAFB] rounded"
                      >
                        <MoreVertical className="w-5 h-5 text-[#4B5563]" />
                      </button>
                      
                      {showActions === booking.id && (
                        <div className="absolute right-0 top-8 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-10 min-w-[200px]">
                          <button className="w-full px-4 py-2 text-left text-sm text-[#4B5563] hover:bg-[#F9FAFB]">
                            View Details
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-[#4B5563] hover:bg-[#F9FAFB]">
                            Send Booking Email
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-[#4B5563] hover:bg-[#F9FAFB]">
                            Resend Email
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-[#4B5563] hover:bg-[#F9FAFB]">
                            Manually Book
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-[#4B5563] hover:bg-[#F9FAFB]">
                            Change Booking
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-[#F59E0B] hover:bg-[#F9FAFB]">
                            Mark "Needs Help"
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
