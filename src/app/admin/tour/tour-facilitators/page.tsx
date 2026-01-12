'use client'
import { useState } from 'react';
import { Search, Filter, UserPlus, Eye, Users, Star, X } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface Facilitator {
  id: string;
  name: string;
  assignedTours: number;
  attendanceRate: number;
  averageRating: number;
  status: 'active' | 'on-leave' | 'inactive';
  toursPresent: number;
  toursAbsent: number;
  toursPartial: number;
  specialization: string;
  totalChildrenHandled: number;
  lastTour: string;
}

export default function TourFacilitators() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTour, setFilterTour] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(null);

  const facilitators: Facilitator[] = [
    {
      id: 'FAC-001',
      name: 'Amaka Obi',
      assignedTours: 12,
      attendanceRate: 95.8,
      averageRating: 4.8,
      status: 'active',
      toursPresent: 11,
      toursAbsent: 0,
      toursPartial: 1,
      specialization: 'Lead Facilitator',
      totalChildrenHandled: 2580,
      lastTour: '2025-02-25'
    },
    {
      id: 'FAC-002',
      name: 'Chinedu Eze',
      assignedTours: 10,
      attendanceRate: 100,
      averageRating: 4.6,
      status: 'active',
      toursPresent: 10,
      toursAbsent: 0,
      toursPartial: 0,
      specialization: 'Co-Facilitator',
      totalChildrenHandled: 2150,
      lastTour: '2025-02-22'
    },
    {
      id: 'FAC-003',
      name: 'Funke Adeleke',
      assignedTours: 14,
      attendanceRate: 92.9,
      averageRating: 4.9,
      status: 'active',
      toursPresent: 13,
      toursAbsent: 1,
      toursPartial: 0,
      specialization: 'Lead Facilitator',
      totalChildrenHandled: 3120,
      lastTour: '2025-02-20'
    },
    {
      id: 'FAC-004',
      name: 'Emeka Nwankwo',
      assignedTours: 8,
      attendanceRate: 75.0,
      averageRating: 4.3,
      status: 'active',
      toursPresent: 6,
      toursAbsent: 2,
      toursPartial: 0,
      specialization: 'Support Facilitator',
      totalChildrenHandled: 1420,
      lastTour: '2025-02-18'
    },
    {
      id: 'FAC-005',
      name: 'Blessing Okafor',
      assignedTours: 11,
      attendanceRate: 90.9,
      averageRating: 4.7,
      status: 'active',
      toursPresent: 10,
      toursAbsent: 0,
      toursPartial: 1,
      specialization: 'Lead Facilitator',
      totalChildrenHandled: 2490,
      lastTour: '2025-02-24'
    },
    {
      id: 'FAC-006',
      name: 'Ibrahim Musa',
      assignedTours: 9,
      attendanceRate: 88.9,
      averageRating: 4.5,
      status: 'active',
      toursPresent: 8,
      toursAbsent: 1,
      toursPartial: 0,
      specialization: 'Co-Facilitator',
      totalChildrenHandled: 1980,
      lastTour: '2025-02-21'
    },
    {
      id: 'FAC-007',
      name: 'Aisha Bello',
      assignedTours: 6,
      attendanceRate: 83.3,
      averageRating: 4.3,
      status: 'on-leave',
      toursPresent: 5,
      toursAbsent: 0,
      toursPartial: 1,
      specialization: 'Lead Facilitator',
      totalChildrenHandled: 1350,
      lastTour: '2025-02-15'
    },
    {
      id: 'FAC-008',
      name: 'Tunde Adewale',
      assignedTours: 13,
      attendanceRate: 100,
      averageRating: 4.8,
      status: 'active',
      toursPresent: 13,
      toursAbsent: 0,
      toursPartial: 0,
      specialization: 'Co-Facilitator',
      totalChildrenHandled: 2940,
      lastTour: '2025-02-23'
    },
    {
      id: 'FAC-009',
      name: 'Fatima Abubakar',
      assignedTours: 15,
      attendanceRate: 93.3,
      averageRating: 4.9,
      status: 'active',
      toursPresent: 14,
      toursAbsent: 1,
      toursPartial: 0,
      specialization: 'Lead Facilitator',
      totalChildrenHandled: 3480,
      lastTour: '2025-02-25'
    },
    {
      id: 'FAC-010',
      name: 'Yusuf Mohammed',
      assignedTours: 7,
      attendanceRate: 85.7,
      averageRating: 4.6,
      status: 'active',
      toursPresent: 6,
      toursAbsent: 0,
      toursPartial: 1,
      specialization: 'Co-Facilitator',
      totalChildrenHandled: 1620,
      lastTour: '2025-02-19'
    }
  ];

  // Filter facilitators
  const filteredFacilitators = facilitators.filter(facilitator => {
    const matchesSearch = facilitator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facilitator.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || facilitator.status === filterStatus;
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'february' && facilitator.lastTour.includes('2025-02')) ||
      (filterDate === 'march' && facilitator.lastTour.includes('2025-03'));
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: Facilitator['status']) => {
    const config = {
      'active': { bg: 'bg-[#FEF3E2]', text: 'text-[#FF8500]', label: 'Active' },
      'on-leave': { bg: 'bg-[#FFF7ED]', text: 'text-[#FFBC3A]', label: 'On Leave' },
      'inactive': { bg: 'bg-[#F2F1EE]', text: 'text-[#9E9E9E]', label: 'Inactive' }
    };
    const statusConfig = config[status];
    return (
      <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded text-[11px]`}>
        {statusConfig.label}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating)
                ? 'fill-[#FFBC3A] text-[#FFBC3A]'
                : star - 0.5 <= rating
                ? 'fill-[#FFBC3A]/50 text-[#FFBC3A]'
                : 'fill-none text-[#E5E7EB]'
            }`}
          />
        ))}
        <span className="ml-1 text-[13px] text-[#2B2B2B]">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getAttendanceIndicator = (facilitator: Facilitator) => {
    if (facilitator.toursAbsent === 0 && facilitator.toursPartial === 0) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#FF8500]" />
          <span className="text-[11px] text-[#9E9E9E]">Full Attendance</span>
        </div>
      );
    } else if (facilitator.toursAbsent > 0) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#8C1D18]" />
          <span className="text-[11px] text-[#9E9E9E]">{facilitator.toursAbsent} Absent</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#FFBC3A]" />
          <span className="text-[11px] text-[#9E9E9E]">{facilitator.toursPartial} Partial</span>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Tour Facilitators"
        subtitle="Manage facilitators with attendance tracking and performance ratings"
        screenCode="TOUR-02"
        actions={
          <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Facilitator
          </button>
        }
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facilitators..."
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
            />
          </div>

          <select
            value={filterTour}
            onChange={(e) => setFilterTour(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Tours</option>
            <option value="lagos">Lagos Tours</option>
            <option value="abuja">Abuja Tours</option>
            <option value="kano">Kano Tours</option>
          </select>

          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="february">February 2025</option>
            <option value="march">March 2025</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredFacilitators.length} facilitators
        </div>

        {/* Facilitators Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Name</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Assigned Tours</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Attendance %</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Average Rating</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Attendance</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Status</th>
                <th className="px-4 py-3 text-right text-[11px] text-[#FF8500] font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilitators.map((facilitator, index) => (
                <tr key={facilitator.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{facilitator.name}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{facilitator.id} · {facilitator.specialization}</div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">
                    {facilitator.assignedTours}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-[#2B2B2B]">{facilitator.attendanceRate.toFixed(1)}%</div>
                    <div className="w-24 h-1.5 bg-[#F2F1EE] rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full ${
                          facilitator.attendanceRate >= 90 
                            ? 'bg-[#FF8500]' 
                            : facilitator.attendanceRate >= 75 
                            ? 'bg-[#FFBC3A]' 
                            : 'bg-[#8C1D18]'
                        }`}
                        style={{ width: `${facilitator.attendanceRate}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {renderStars(facilitator.averageRating)}
                  </td>
                  <td className="px-4 py-4">
                    {getAttendanceIndicator(facilitator)}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(facilitator.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedFacilitator(facilitator)}
                        className="p-1.5 text-[#FF8500] hover:bg-[#FFF4E6] rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFacilitators.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No facilitators found</p>
          </div>
        )}
      </div>

      {/* Side Panel for Facilitator Details */}
      {selectedFacilitator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="w-[480px] h-full bg-white shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-[16px] text-[#2B2B2B]">Facilitator Performance</h3>
                <p className="text-[12px] text-[#9E9E9E] mt-0.5">{selectedFacilitator.name}</p>
              </div>
              <button
                onClick={() => setSelectedFacilitator(null)}
                className="p-2 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Facilitator ID</div>
                    <div className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.id}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Specialization</div>
                    <div className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.specialization}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Status</div>
                    <div className="mt-1">{getStatusBadge(selectedFacilitator.status)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Last Tour</div>
                    <div className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.lastTour}</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-[13px] text-[#FF8500] font-bold mb-3">PERFORMANCE METRICS</h4>
                <div className="space-y-3">
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-[#9E9E9E]">Assigned Tours</span>
                      <span className="text-[18px] text-[#2B2B2B]">{selectedFacilitator.assignedTours}</span>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-[#9E9E9E]">Attendance Rate</span>
                      <span className="text-[18px] text-[#FF8500]">{selectedFacilitator.attendanceRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF8500]" 
                        style={{ width: `${selectedFacilitator.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-[#9E9E9E]">Average Rating</span>
                      <div>{renderStars(selectedFacilitator.averageRating)}</div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-[#9E9E9E]">Children Handled</span>
                      <span className="text-[18px] text-[#2B2B2B]">{selectedFacilitator.totalChildrenHandled.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Breakdown */}
              <div>
                <h4 className="text-[13px] text-[#FF8500] font-bold mb-3">ATTENDANCE BREAKDOWN</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF8500]" />
                      <span className="text-[13px] text-[#2B2B2B]">Present</span>
                    </div>
                    <span className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.toursPresent} tours</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#8C1D18]" />
                      <span className="text-[13px] text-[#2B2B2B]">Absent</span>
                    </div>
                    <span className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.toursAbsent} tours</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FFBC3A]" />
                      <span className="text-[13px] text-[#2B2B2B]">Partially Present</span>
                    </div>
                    <span className="text-[13px] text-[#2B2B2B]">{selectedFacilitator.toursPartial} tours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
