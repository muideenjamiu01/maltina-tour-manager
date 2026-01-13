'use client'
import { useState } from 'react';
import { Search, Calendar, Send, Plus, UserPlus, Download, FileText, X, Clock, AlertTriangle, CheckCircle, MoreVertical, Mail, Move, Trash2, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

interface BookingSchool {
  id: string;
  name: string;
  cluster: string;
  bookingDate: string | null;
  status: 'booking-open' | 'booked-school' | 'booked-manual' | 'expired' | 'cancelled' | 'rescheduled';
  deadline: string;
  bookingSource: 'School' | 'Manual' | 'System';
  lastEmailSent: string;
  reminderCount: number;
  updatedBy: string;
  state: string;
  lga: string;
  history: Array<{
    event: string;
    actor: string;
    timestamp: string;
    reason?: string;
  }>;
}

interface ClusterBlock {
  cluster: string;
  date: string;
  schoolsTotal: number;
  booked: number;
  pending: number;
  schools: BookingSchool[];
}

const SAMPLE_SCHOOLS: BookingSchool[] = [
  {
    id: 'SCH001',
    name: 'Kings Academy',
    cluster: 'Lagos Cluster 1',
    bookingDate: '2026-01-15',
    status: 'booked-school',
    deadline: '2026-01-10',
    bookingSource: 'School',
    lastEmailSent: '2025-12-20',
    reminderCount: 1,
    updatedBy: 'System',
    state: 'Lagos',
    lga: 'Ikeja',
    history: [
      { event: 'Invite sent', actor: 'T. Adebayo', timestamp: '2025-12-18 10:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-20 09:00 AM' },
      { event: 'Booking confirmed', actor: 'School Principal', timestamp: '2025-12-20 02:30 PM' }
    ]
  },
  {
    id: 'SCH002',
    name: 'St. Augustine College',
    cluster: 'Lagos Cluster 1',
    bookingDate: null,
    status: 'booking-open',
    deadline: '2026-01-10',
    bookingSource: 'School',
    lastEmailSent: '2025-12-22',
    reminderCount: 2,
    updatedBy: 'System',
    state: 'Lagos',
    lga: 'Eti-Osa',
    history: [
      { event: 'Invite sent', actor: 'T. Adebayo', timestamp: '2025-12-18 10:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-20 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-22 09:00 AM' }
    ]
  },
  {
    id: 'SCH003',
    name: 'Grace International School',
    cluster: 'FCT Cluster 2',
    bookingDate: '2026-01-16',
    status: 'booked-manual',
    deadline: '2026-01-12',
    bookingSource: 'Manual',
    lastEmailSent: '2025-12-21',
    reminderCount: 1,
    updatedBy: 'C. Okafor',
    state: 'FCT',
    lga: 'Abuja Municipal',
    history: [
      { event: 'Invite sent', actor: 'C. Okafor', timestamp: '2025-12-18 11:00 AM' },
      { event: 'Manual booking', actor: 'C. Okafor', timestamp: '2025-12-21 03:00 PM', reason: 'School principal requested by phone' }
    ]
  },
  {
    id: 'SCH004',
    name: 'Victory High School',
    cluster: 'FCT Cluster 2',
    bookingDate: '2026-01-16',
    status: 'booked-school',
    deadline: '2026-01-12',
    bookingSource: 'School',
    lastEmailSent: '2025-12-19',
    reminderCount: 0,
    updatedBy: 'System',
    state: 'FCT',
    lga: 'Abuja Municipal',
    history: [
      { event: 'Invite sent', actor: 'C. Okafor', timestamp: '2025-12-18 11:00 AM' },
      { event: 'Booking confirmed', actor: 'School Principal', timestamp: '2025-12-19 04:00 PM' }
    ]
  },
  {
    id: 'SCH005',
    name: 'Royal International School',
    cluster: 'FCT Cluster 2',
    bookingDate: null,
    status: 'booking-open',
    deadline: '2025-12-26',
    bookingSource: 'School',
    lastEmailSent: '2025-12-23',
    reminderCount: 3,
    updatedBy: 'System',
    state: 'FCT',
    lga: 'Abuja Municipal',
    history: [
      { event: 'Invite sent', actor: 'C. Okafor', timestamp: '2025-12-18 11:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-20 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-22 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-23 09:00 AM' }
    ]
  },
  {
    id: 'SCH006',
    name: 'Unity Secondary School',
    cluster: 'Anambra Cluster 3',
    bookingDate: null,
    status: 'expired',
    deadline: '2025-12-22',
    bookingSource: 'School',
    lastEmailSent: '2025-12-21',
    reminderCount: 2,
    updatedBy: 'System',
    state: 'Anambra',
    lga: 'Onitsha North',
    history: [
      { event: 'Invite sent', actor: 'A. Musa', timestamp: '2025-12-15 10:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-18 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-21 09:00 AM' },
      { event: 'Booking expired', actor: 'System', timestamp: '2025-12-22 11:59 PM' }
    ]
  },
  {
    id: 'SCH007',
    name: 'Excel Academy',
    cluster: 'Rivers Cluster 4',
    bookingDate: '2026-01-18',
    status: 'booked-school',
    deadline: '2026-01-14',
    bookingSource: 'School',
    lastEmailSent: '2025-12-19',
    reminderCount: 0,
    updatedBy: 'System',
    state: 'Rivers',
    lga: 'Port Harcourt',
    history: [
      { event: 'Invite sent', actor: 'M. Ibrahim', timestamp: '2025-12-18 09:00 AM' },
      { event: 'Booking confirmed', actor: 'School Principal', timestamp: '2025-12-19 11:00 AM' }
    ]
  },
  {
    id: 'SCH008',
    name: 'Bright Future Academy',
    cluster: 'Rivers Cluster 4',
    bookingDate: '2026-01-17',
    status: 'cancelled',
    deadline: '2026-01-14',
    bookingSource: 'School',
    lastEmailSent: '2025-12-23',
    reminderCount: 1,
    updatedBy: 'M. Ibrahim',
    state: 'Rivers',
    lga: 'Port Harcourt',
    history: [
      { event: 'Invite sent', actor: 'M. Ibrahim', timestamp: '2025-12-18 09:00 AM' },
      { event: 'Booking confirmed', actor: 'School Principal', timestamp: '2025-12-19 03:00 PM' },
      { event: 'Booking cancelled', actor: 'M. Ibrahim', timestamp: '2025-12-23 10:00 AM', reason: 'School conflict with exam schedule' },
      { event: 'Rescheduling email sent', actor: 'System', timestamp: '2025-12-23 10:05 AM' }
    ]
  },
  {
    id: 'SCH009',
    name: 'Wisdom Gate College',
    cluster: 'Anambra Cluster 3',
    bookingDate: '2026-01-17',
    status: 'booked-school',
    deadline: '2026-01-13',
    bookingSource: 'School',
    lastEmailSent: '2025-12-20',
    reminderCount: 1,
    updatedBy: 'System',
    state: 'Anambra',
    lga: 'Awka',
    history: [
      { event: 'Invite sent', actor: 'A. Musa', timestamp: '2025-12-18 10:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-20 09:00 AM' },
      { event: 'Booking confirmed', actor: 'School Principal', timestamp: '2025-12-20 01:00 PM' }
    ]
  },
  {
    id: 'SCH010',
    name: 'Peace Memorial School',
    cluster: 'Lagos Cluster 1',
    bookingDate: null,
    status: 'booking-open',
    deadline: '2025-12-26',
    bookingSource: 'School',
    lastEmailSent: '2025-12-24',
    reminderCount: 4,
    updatedBy: 'System',
    state: 'Lagos',
    lga: 'Surulere',
    history: [
      { event: 'Invite sent', actor: 'T. Adebayo', timestamp: '2025-12-18 10:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-20 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-21 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-23 09:00 AM' },
      { event: 'Reminder sent', actor: 'System', timestamp: '2025-12-24 09:00 AM' }
    ]
  }
];

export default function BookingCommandCentre() {
 
  const [dateRange, setDateRange] = useState('next-30-days');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [manualBookingSchoolId, setManualBookingSchoolId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    cluster: '',
    state: '',
    lga: '',
    status: [] as string[],
    invitedNotBookedOnly: false
  });

  // Calculate KPIs
  const kpis = {
    bookedFuture: SAMPLE_SCHOOLS.filter(s => s.status === 'booked-school' || s.status === 'booked-manual').length,
    invitedNotBooked: SAMPLE_SCHOOLS.filter(s => s.status === 'booking-open').length,
    expiring48h: SAMPLE_SCHOOLS.filter(s => {
      const deadline = new Date(s.deadline);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      const hours = diff / (1000 * 60 * 60);
      return hours > 0 && hours <= 48 && s.status === 'booking-open';
    }).length,
    expired: SAMPLE_SCHOOLS.filter(s => s.status === 'expired').length,
    manuallyBooked: SAMPLE_SCHOOLS.filter(s => s.status === 'booked-manual').length,
    cancelled: SAMPLE_SCHOOLS.filter(s => s.status === 'cancelled').length
  };

  // Build cluster blocks for calendar
  const clusterBlocks: ClusterBlock[] = [
    {
      cluster: 'Lagos Cluster 1',
      date: '2026-01-15',
      schoolsTotal: 4,
      booked: 1,
      pending: 3,
      schools: SAMPLE_SCHOOLS.filter(s => s.cluster === 'Lagos Cluster 1')
    },
    {
      cluster: 'FCT Cluster 2',
      date: '2026-01-16',
      schoolsTotal: 3,
      booked: 2,
      pending: 1,
      schools: SAMPLE_SCHOOLS.filter(s => s.cluster === 'FCT Cluster 2')
    },
    {
      cluster: 'Anambra Cluster 3',
      date: '2026-01-17',
      schoolsTotal: 2,
      booked: 1,
      pending: 1,
      schools: SAMPLE_SCHOOLS.filter(s => s.cluster === 'Anambra Cluster 3')
    },
    {
      cluster: 'Rivers Cluster 4',
      date: '2026-01-18',
      schoolsTotal: 2,
      booked: 1,
      pending: 1,
      schools: SAMPLE_SCHOOLS.filter(s => s.cluster === 'Rivers Cluster 4')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booking-open': return 'bg-[#FFF7ED] text-[#F5A623]';
      case 'booked-school': return 'bg-[#FEF3E2] text-[#FF8500]';
      case 'booked-manual': return 'bg-[#FEF3E2] text-[#FF8500]';
      case 'expired': return 'bg-[#FDE8E7] text-[#8C1D18]';
      case 'cancelled': return 'bg-[#F2F1EE] text-[#9E9E9E]';
      case 'rescheduled': return 'bg-[#FFF4E6] text-[#D4A017]';
      default: return 'bg-[#F2F1EE] text-[#9E9E9E]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'booking-open': return 'Booking Open';
      case 'booked-school': return 'Booked by School';
      case 'booked-manual': return 'Booked Manually';
      case 'expired': return 'Expired';
      case 'cancelled': return 'Cancelled';
      case 'rescheduled': return 'Rescheduled';
      default: return status;
    }
  };

  const getClusterRiskColor = (booked: number, pending: number) => {
    if (pending === 0) return 'border-[#FF8500] bg-[#FEF3E2]';

    const schools = SAMPLE_SCHOOLS.filter(s => 
      clusterBlocks.find(cb => cb.booked === booked && cb.pending === pending)?.schools.includes(s)
    );
    
    const hasExpiringSoon = schools.some(s => {
      const deadline = new Date(s.deadline);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      const hours = diff / (1000 * 60 * 60);
      return hours > 0 && hours <= 48 && s.status === 'booking-open';
    });

    if (hasExpiringSoon) return 'border-[#8C1D18] bg-[#FDE8E7]';
    return 'border-[#D4A017] bg-[#FFF4E6]';
  };

  const filterSchools = (schools: BookingSchool[]) => {
    let filtered = schools;

    // Filter by selected cluster from calendar button
    if (selectedCluster) {
      filtered = filtered.filter(s => s.cluster === selectedCluster);
    }

    // Filter by cluster dropdown
    if (filters.cluster) {
      filtered = filtered.filter(s => s.cluster === filters.cluster);
    }

    // Filter by state dropdown
    if (filters.state) {
      filtered = filtered.filter(s => s.state === filters.state);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.lga.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by invited but not booked only checkbox
    if (filters.invitedNotBookedOnly) {
      filtered = filtered.filter(s => s.status === 'booking-open');
    }

    return filtered;
  };

  const filteredSchools = filterSchools(SAMPLE_SCHOOLS);

  const handleManualBooking = (schoolId: string) => {
    setManualBookingSchoolId(schoolId);
    setShowManualBooking(true);
  };

  const confirmManualBooking = () => {
    console.log('Manual booking confirmed for:', manualBookingSchoolId);
    setShowManualBooking(false);
    setManualBookingSchoolId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Command Header (Sticky) */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
            {/* Left: Date Range */}
            <div className="flex gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              >
                <option value="next-30-days">Today → +30 days</option>
                <option value="this-week">This week</option>
                <option value="next-week">Next week</option>
                <option value="expiring-soon">Expiring soon</option>
              </select>
            </div>

            {/* Center: Search */}
            <div className="flex-1 relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school, cluster, supervisor, LGA…"
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>

            {/* Right: Actions */}
            <div className="flex gap-2 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Schools</span>
              </button>
              <button className="flex-1 lg:flex-none px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send Link</span>
              </button>
              <button
                onClick={() => setShowManualBooking(true)}
                className="flex-1 lg:flex-none px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Manual Booking</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[12px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-1">
              <Download className="w-3 h-3" />
              Export CSV
            </button>
            <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[12px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[140px] z-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <select
              value={filters.cluster}
              onChange={(e) => setFilters({ ...filters, cluster: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All Clusters</option>
              <option value="Lagos Cluster 1">Lagos Cluster 1</option>
              <option value="FCT Cluster 2">FCT Cluster 2</option>
              <option value="Anambra Cluster 3">Anambra Cluster 3</option>
              <option value="Rivers Cluster 4">Rivers Cluster 4</option>
            </select>

            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value, lga: '' })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All States</option>
              <option value="Lagos">Lagos</option>
              <option value="FCT">FCT</option>
              <option value="Anambra">Anambra</option>
              <option value="Rivers">Rivers</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.invitedNotBookedOnly}
                onChange={(e) => setFilters({ ...filters, invitedNotBookedOnly: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-[14px] text-[#2B2B2B]">Invited but not booked only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Booking Command Centre
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Monitor, chase, book, move, and explain bookings
          </p>
        </div>

        {/* Risk + History Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Booked (Future)
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#FF8500]">
              {kpis.bookedFuture}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              confirmed
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Invited, Not Booked
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {kpis.invitedNotBooked}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              pending
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Expiring in 48h
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#D4A017]">
              {kpis.expiring48h}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              urgent
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Expired
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
              {kpis.expired}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              missed
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Manually Booked
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {kpis.manuallyBooked}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              by TM
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Cancelled
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#9E9E9E]">
              {kpis.cancelled}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              rescheduled
            </div>
          </button>
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calendar View */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h2 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                Weekly Calendar
              </h2>
              <div className="space-y-3">
                {clusterBlocks.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCluster(block.cluster)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                      selectedCluster === block.cluster
                        ? 'border-[#F5A623] bg-[#FFF7ED]'
                        : getClusterRiskColor(block.booked, block.pending)
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] leading-[14px] font-medium text-[#9E9E9E] mb-1">
                          {new Date(block.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-[13px] leading-[18px] font-semibold text-[#2B2B2B] truncate">
                          {block.cluster}
                        </div>
                      </div>
                      {block.pending > 0 && (
                        <AlertTriangle className="w-4 h-4 text-[#D4A017] flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] leading-[14px]">
                      <div className="bg-white/50 px-2 py-1.5 rounded">
                        <span className="text-[#9E9E9E] text-[10px]">Schools:</span> <span className="text-[#2B2B2B] font-medium">{block.schoolsTotal}</span>
                      </div>
                      <div className="bg-white/50 px-2 py-1.5 rounded">
                        <span className="text-[#9E9E9E] text-[10px]">Booked:</span> <span className="text-[#FF8500] font-medium">{block.booked}</span>
                      </div>
                      <div className="bg-white/50 px-2 py-1.5 rounded">
                        <span className="text-[#9E9E9E] text-[10px]">Pending:</span> <span className="text-[#F5A623] font-medium">{block.pending}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: School Booking Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">School</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Status</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Deadline</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Reminders</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchools.map((school) => (
                      <>
                        <tr
                          key={school.id}
                          className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                        >
                          <td className="px-4 py-3">
                            <input type="checkbox" className="w-4 h-4" />
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium">
                              {school.name}
                            </div>
                            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                              {school.cluster}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-[10px] ${getStatusColor(school.status)}`}>
                              {getStatusLabel(school.status)}
                            </span>
                            <div className="text-[10px] text-[#9E9E9E] mt-1">
                              {school.bookingSource}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[12px] leading-[16px] text-[#2B2B2B]">
                              {new Date(school.deadline).toLocaleDateString()}
                            </div>
                            {(() => {
                              const deadline = new Date(school.deadline);
                              const now = new Date();
                              const diff = deadline.getTime() - now.getTime();
                              const hours = Math.floor(diff / (1000 * 60 * 60));
                              if (hours > 0 && hours <= 48) {
                                return (
                                  <div className="text-[10px] text-[#8C1D18] flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3" />
                                    {hours}h left
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-[#9E9E9E]" />
                              <span className="text-[12px] leading-[16px] text-[#2B2B2B]">
                                {school.reminderCount}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#9E9E9E]">
                              Last: {new Date(school.lastEmailSent).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setExpandedRow(expandedRow === school.id ? null : school.id)}
                                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                                title="View history"
                              >
                                {expandedRow === school.id ? (
                                  <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
                                )}
                              </button>
                              <button
                                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                                title="Send reminder"
                              >
                                <Send className="w-4 h-4 text-[#9E9E9E]" />
                              </button>
                              <button
                                onClick={() => handleManualBooking(school.id)}
                                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                                title="Manual booking"
                              >
                                <UserPlus className="w-4 h-4 text-[#9E9E9E]" />
                              </button>
                              <button
                                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                                title="More actions"
                              >
                                <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded History Row */}
                        {expandedRow === school.id && (
                          <tr className="bg-[#F2F1EE]">
                            <td colSpan={6} className="px-4 py-4">
                              <div className="pl-8">
                                <h4 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-3">
                                  Booking History
                                </h4>
                                <div className="space-y-2">
                                  {school.history.map((event, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-[12px]">
                                      <div className="w-2 h-2 bg-[#F5A623] rounded-full mt-1.5 flex-shrink-0" />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[#2B2B2B] font-medium">{event.event}</span>
                                          <span className="text-[#9E9E9E]">•</span>
                                          <span className="text-[#9E9E9E]">{event.actor}</span>
                                          <span className="text-[#9E9E9E]">•</span>
                                          <span className="text-[#9E9E9E]">{event.timestamp}</span>
                                        </div>
                                        {event.reason && (
                                          <div className="text-[#9E9E9E] mt-1">
                                            Reason: {event.reason}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Booking Modal */})
      {showManualBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                Manual Booking
              </h3>
              <button
                onClick={() => setShowManualBooking(false)}
                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  School
                </label>
                <input
                  type="text"
                  value={SAMPLE_SCHOOLS.find(s => s.id === manualBookingSchoolId)?.name || 'Select school'}
                  disabled
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-[#F2F1EE] text-[#9E9E9E]"
                />
              </div>

              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  Booking Date *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  Time Slot *
                </label>
                <select className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
                  <option>09:00 AM - 12:00 PM</option>
                  <option>01:00 PM - 04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  Reason for Manual Booking *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., School principal requested by phone"
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowManualBooking(false)}
                  className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmManualBooking}
                  className="flex-1 px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Bar (shows when schools selected) */}
      {selectedSchools.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white rounded-lg px-6 py-4 shadow-2xl z-40">
          <div className="flex items-center gap-6">
            <div className="text-[14px] leading-[20px]">
              {selectedSchools.length} selected
            </div>
            <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors">
              Bulk Send Reminder
            </button>
            <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors">
              Bulk Move to Cluster
            </button>
            <button className="px-4 py-2 border border-white/20 text-white rounded-lg text-[14px] hover:bg-white/10 transition-colors">
              Bulk Remove
            </button>
            <button
              onClick={() => setSelectedSchools([])}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}