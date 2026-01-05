'use client'
import { useState } from 'react';
import { Plus, Search, UserPlus, MapPin, Users, Clock, Calendar, Eye, Filter, TrendingUp, CheckCircle, AlertCircle, X, UserCheck } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"


interface Facilitator {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string[];
  status: 'active' | 'inactive';
  totalAssigned: number;
  maxCapacity: number;
  rating: number;
  lastActivity: string;
}

interface School {
  id: string;
  name: string;
  state: string;
  lga: string;
  ward: string;
  tourDate: string;
  studentsExpected: number;
  facilitatorsNeeded: number;
  facilitatorsAssigned: number;
  assignmentStatus: 'unassigned' | 'partially-assigned' | 'fully-assigned';
  assignedFacilitators: {
    id: string;
    name: string;
    role: string;
  }[];
}

interface Assignment {
  id: string;
  schoolName: string;
  schoolId: string;
  facilitatorName: string;
  facilitatorId: string;
  role: string;
  assignedDate: string;
  assignedBy: string;
  tourDate: string;
  status: 'active' | 'cancelled';
}

export default function RECEEManagement() {
  const [activeTab, setActiveTab] = useState<'schools' | 'facilitators' | 'assignments'>('schools');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const facilitators: Facilitator[] = [
    {
      id: 'FAC-001',
      name: 'Amaka Obi',
      email: 'amaka.obi@maltina.com',
      phone: '+234 803 456 7890',
      state: 'Lagos',
      lga: ['Ikeja', 'Surulere', 'Yaba'],
      status: 'active',
      totalAssigned: 8,
      maxCapacity: 12,
      rating: 4.8,
      lastActivity: '2025-12-23'
    },
    {
      id: 'FAC-002',
      name: 'Chinedu Eze',
      email: 'chinedu.eze@maltina.com',
      phone: '+234 805 123 4567',
      state: 'Lagos',
      lga: ['Lekki', 'Ajah', 'Victoria Island'],
      status: 'active',
      totalAssigned: 6,
      maxCapacity: 10,
      rating: 4.6,
      lastActivity: '2025-12-23'
    },
    {
      id: 'FAC-003',
      name: 'Funke Adeleke',
      email: 'funke.adeleke@maltina.com',
      phone: '+234 807 890 1234',
      state: 'Lagos',
      lga: ['Ikeja', 'Agege'],
      status: 'active',
      totalAssigned: 10,
      maxCapacity: 12,
      rating: 4.9,
      lastActivity: '2025-12-22'
    },
    {
      id: 'FAC-004',
      name: 'Ibrahim Musa',
      email: 'ibrahim.musa@maltina.com',
      phone: '+234 809 234 5678',
      state: 'Kano',
      lga: ['Kano Municipal', 'Nassarawa'],
      status: 'active',
      totalAssigned: 4,
      maxCapacity: 10,
      rating: 4.7,
      lastActivity: '2025-12-20'
    },
    {
      id: 'FAC-005',
      name: 'Blessing Okafor',
      email: 'blessing.okafor@maltina.com',
      phone: '+234 802 345 6789',
      state: 'Abuja',
      lga: ['Abuja Municipal', 'Gwagwalada'],
      status: 'inactive',
      totalAssigned: 0,
      maxCapacity: 10,
      rating: 4.5,
      lastActivity: '2025-12-10'
    }
  ];

  const schools: School[] = [
    {
      id: 'SCH-001',
      name: "King's College Lagos",
      state: 'Lagos',
      lga: 'Lagos Island',
      ward: 'Ward 5',
      tourDate: '2025-02-15',
      studentsExpected: 856,
      facilitatorsNeeded: 4,
      facilitatorsAssigned: 3,
      assignmentStatus: 'partially-assigned',
      assignedFacilitators: [
        { id: 'FAC-001', name: 'Amaka Obi', role: 'Lead Facilitator' },
        { id: 'FAC-002', name: 'Chinedu Eze', role: 'Co-Facilitator' },
        { id: 'FAC-003', name: 'Funke Adeleke', role: 'Co-Facilitator' }
      ]
    },
    {
      id: 'SCH-002',
      name: 'Green Valley Secondary School',
      state: 'Lagos',
      lga: 'Ikeja',
      ward: 'Ward 2',
      tourDate: '2025-02-18',
      studentsExpected: 650,
      facilitatorsNeeded: 3,
      facilitatorsAssigned: 0,
      assignmentStatus: 'unassigned',
      assignedFacilitators: []
    },
    {
      id: 'SCH-003',
      name: 'Unity Primary School',
      state: 'Lagos',
      lga: 'Surulere',
      ward: 'Ward 1',
      tourDate: '2025-02-20',
      studentsExpected: 420,
      facilitatorsNeeded: 2,
      facilitatorsAssigned: 2,
      assignmentStatus: 'fully-assigned',
      assignedFacilitators: [
        { id: 'FAC-001', name: 'Amaka Obi', role: 'Lead Facilitator' },
        { id: 'FAC-003', name: 'Funke Adeleke', role: 'Co-Facilitator' }
      ]
    },
    {
      id: 'SCH-004',
      name: 'Bright Future Academy',
      state: 'Kano',
      lga: 'Kano Municipal',
      ward: 'Ward 3',
      tourDate: '2025-02-22',
      studentsExpected: 580,
      facilitatorsNeeded: 3,
      facilitatorsAssigned: 1,
      assignmentStatus: 'partially-assigned',
      assignedFacilitators: [
        { id: 'FAC-004', name: 'Ibrahim Musa', role: 'Lead Facilitator' }
      ]
    },
    {
      id: 'SCH-005',
      name: 'Excellence International School',
      state: 'Lagos',
      lga: 'Lekki',
      ward: 'Ward 4',
      tourDate: '2025-02-25',
      studentsExpected: 720,
      facilitatorsNeeded: 3,
      facilitatorsAssigned: 0,
      assignmentStatus: 'unassigned',
      assignedFacilitators: []
    }
  ];

  const assignments: Assignment[] = [
    {
      id: 'ASG-001',
      schoolName: "King's College Lagos",
      schoolId: 'SCH-001',
      facilitatorName: 'Amaka Obi',
      facilitatorId: 'FAC-001',
      role: 'Lead Facilitator',
      assignedDate: '2025-12-20',
      assignedBy: 'Admin User',
      tourDate: '2025-02-15',
      status: 'active'
    },
    {
      id: 'ASG-002',
      schoolName: "King's College Lagos",
      schoolId: 'SCH-001',
      facilitatorName: 'Chinedu Eze',
      facilitatorId: 'FAC-002',
      role: 'Co-Facilitator',
      assignedDate: '2025-12-20',
      assignedBy: 'Admin User',
      tourDate: '2025-02-15',
      status: 'active'
    },
    {
      id: 'ASG-003',
      schoolName: "King's College Lagos",
      schoolId: 'SCH-001',
      facilitatorName: 'Funke Adeleke',
      facilitatorId: 'FAC-003',
      role: 'Co-Facilitator',
      assignedDate: '2025-12-21',
      assignedBy: 'Admin User',
      tourDate: '2025-02-15',
      status: 'active'
    },
    {
      id: 'ASG-004',
      schoolName: 'Unity Primary School',
      schoolId: 'SCH-003',
      facilitatorName: 'Amaka Obi',
      facilitatorId: 'FAC-001',
      role: 'Lead Facilitator',
      assignedDate: '2025-12-21',
      assignedBy: 'Admin User',
      tourDate: '2025-02-20',
      status: 'active'
    },
    {
      id: 'ASG-005',
      schoolName: 'Unity Primary School',
      schoolId: 'SCH-003',
      facilitatorName: 'Funke Adeleke',
      facilitatorId: 'FAC-003',
      role: 'Co-Facilitator',
      assignedDate: '2025-12-21',
      assignedBy: 'Admin User',
      tourDate: '2025-02-20',
      status: 'active'
    },
    {
      id: 'ASG-006',
      schoolName: 'Bright Future Academy',
      schoolId: 'SCH-004',
      facilitatorName: 'Ibrahim Musa',
      facilitatorId: 'FAC-004',
      role: 'Lead Facilitator',
      assignedDate: '2025-12-22',
      assignedBy: 'Admin User',
      tourDate: '2025-02-22',
      status: 'active'
    }
  ];

  // Filter schools
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'all' || school.state === filterState;
    const matchesStatus = filterStatus === 'all' || school.assignmentStatus === filterStatus;
    return matchesSearch && matchesState && matchesStatus;
  });

  // Filter facilitators
  const filteredFacilitators = facilitators.filter(facilitator => {
    const matchesSearch = facilitator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facilitator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facilitator.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'all' || facilitator.state === filterState;
    const matchesStatus = filterStatus === 'all' || facilitator.status === filterStatus;
    return matchesSearch && matchesState && matchesStatus;
  });

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.facilitatorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getAssignmentStatusBadge = (status: School['assignmentStatus']) => {
    const config = {
      'unassigned': { bg: 'bg-[#FDE8E7]', text: 'text-[#8C1D18]', label: 'Unassigned', icon: AlertCircle },
      'partially-assigned': { bg: 'bg-[#FEF3E2]', text: 'text-[#FF8500]', label: 'Partially Assigned', icon: Clock },
      'fully-assigned': { bg: 'bg-[#E8F5E9]', text: 'text-[#2F6B3C]', label: 'Fully Assigned', icon: CheckCircle }
    };
    
    const statusConfig = config[status];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded text-[11px] flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </span>
    );
  };

  const getCapacityColor = (assigned: number, max: number) => {
    const percentage = (assigned / max) * 100;
    if (percentage >= 90) return 'text-[#8C1D18]';
    if (percentage >= 70) return 'text-[#FF8500]';
    return 'text-[#2F6B3C]';
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Assign Facilitator"
        subtitle="Assign facilitators to schools for tour execution"
        
        actions={null}
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Schools</span>
              <Users className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{schools.length}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Awaiting tours</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Unassigned</span>
              <AlertCircle className="w-4 h-4 text-[#8C1D18]" />
            </div>
            <div className="text-[28px] text-[#8C1D18]">
              {schools.filter(s => s.assignmentStatus === 'unassigned').length}
            </div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Need facilitators</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Partially Assigned</span>
              <Clock className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">
              {schools.filter(s => s.assignmentStatus === 'partially-assigned').length}
            </div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">In progress</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Fully Assigned</span>
              <CheckCircle className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[28px] text-[#2F6B3C]">
              {schools.filter(s => s.assignmentStatus === 'fully-assigned').length}
            </div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Ready for tour</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('schools')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'schools'
                  ? 'border-[#FF8500] text-[#FF8500]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <Users className="w-4 h-4" />
              Schools Needing Assignment
            </button>
            <button
              onClick={() => setActiveTab('facilitators')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'facilitators'
                  ? 'border-[#FF8500] text-[#FF8500]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Available Facilitators
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`pb-3 px-1 border-b-2 transition-colors text-[14px] flex items-center gap-2 ${
                activeTab === 'assignments'
                  ? 'border-[#FF8500] text-[#FF8500]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Assignment History
            </button>
          </div>
        </div>

        {/* SCHOOLS TAB */}
        {activeTab === 'schools' && (
          <>
            {/* Search and Filters */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schools..."
                  className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
                />
              </div>

              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
              >
                <option value="all">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="unassigned">Unassigned</option>
                <option value="partially-assigned">Partially Assigned</option>
                <option value="fully-assigned">Fully Assigned</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredSchools.length} schools
            </div>

            {/* Schools Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">School</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Tour Date</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Students</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Facilitators</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-[11px] text-[#FF8500] font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map((school, index) => (
                    <tr key={school.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#2B2B2B]">{school.name}</div>
                        <div className="text-[11px] text-[#9E9E9E]">{school.id}</div>
                      </td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">
                        {school.state} · {school.lga}
                      </td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{school.tourDate}</td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">
                        {school.studentsExpected.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#2B2B2B]">
                          {school.facilitatorsAssigned} / {school.facilitatorsNeeded}
                        </div>
                        {school.assignedFacilitators.length > 0 && (
                          <div className="text-[11px] text-[#9E9E9E] mt-1">
                            {school.assignedFacilitators.map(f => f.name).join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">{getAssignmentStatusBadge(school.assignmentStatus)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setSelectedSchool(school);
                              setShowAssignModal(true);
                            }}
                            className="px-3 py-1.5 bg-[#FF8500] text-white rounded text-[11px] hover:bg-[#E07600] transition-colors flex items-center gap-1"
                            title="Assign Facilitators"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                          <button 
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

            {filteredSchools.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No schools found</p>
              </div>
            )}
          </>
        )}

        {/* FACILITATORS TAB */}
        {activeTab === 'facilitators' && (
          <>
            {/* Search and Filters */}
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
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
              >
                <option value="all">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Facilitators Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredFacilitators.map((facilitator) => (
                <div 
                  key={facilitator.id}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#FF8500] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[14px] text-[#2B2B2B] mb-1">{facilitator.name}</h3>
                      <div className="text-[12px] text-[#9E9E9E]">{facilitator.id}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[11px] ${
                      facilitator.status === 'active' 
                        ? 'bg-[#E8F5E9] text-[#2F6B3C]' 
                        : 'bg-[#E5E7EB] text-[#9E9E9E]'
                    }`}>
                      {facilitator.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-[12px]">
                    <div className="flex items-center gap-2 text-[#9E9E9E]">
                      <MapPin className="w-3.5 h-3.5" />
                      {facilitator.state} · {facilitator.lga.join(', ')}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9E9E9E]">Rating:</span>
                      <span className="text-[#FFBC3A]">{facilitator.rating.toFixed(1)} ★</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9E9E9E]">Last active:</span>
                      <span className="text-[#2B2B2B]">{facilitator.lastActivity}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#9E9E9E]">Capacity</span>
                      <span className={getCapacityColor(facilitator.totalAssigned, facilitator.maxCapacity)}>
                        {facilitator.totalAssigned} / {facilitator.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                      <div 
                        className="bg-[#FF8500] h-2 rounded-full transition-all"
                        style={{ width: `${(facilitator.totalAssigned / facilitator.maxCapacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button className="w-full px-3 py-2 border border-[#FF8500] text-[#FF8500] rounded text-[12px] hover:bg-[#FFF4E6] transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {filteredFacilitators.length === 0 && (
              <div className="text-center py-12">
                <UserPlus className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No facilitators found</p>
              </div>
            )}
          </>
        )}

        {/* ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          <>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assignments..."
                  className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-3 text-[13px] text-[#9E9E9E]">
              Showing {filteredAssignments.length} assignments
            </div>

            {/* Assignments Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">School</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Facilitator</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Tour Date</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Assigned Date</th>
                    <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Assigned By</th>
                    <th className="px-4 py-3 text-right text-[11px] text-[#FF8500] font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment, index) => (
                    <tr key={assignment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#2B2B2B]">{assignment.schoolName}</div>
                        <div className="text-[11px] text-[#9E9E9E]">{assignment.schoolId}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#2B2B2B]">{assignment.facilitatorName}</div>
                        <div className="text-[11px] text-[#9E9E9E]">{assignment.facilitatorId}</div>
                      </td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{assignment.role}</td>
                      <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{assignment.tourDate}</td>
                      <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{assignment.assignedDate}</td>
                      <td className="px-4 py-4 text-[13px] text-[#9E9E9E]">{assignment.assignedBy}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-1.5 text-[#8C1D18] hover:bg-[#FDE8E7] rounded transition-colors"
                            title="Remove Assignment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAssignments.length === 0 && (
              <div className="text-center py-12">
                <UserCheck className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No assignments found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
