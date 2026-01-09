'use client'
import { useState, useEffect } from 'react';
import { Search, Plus, Filter, MapPin, Clock, AlertCircle, ChevronRight, X, Check, Mail, Calendar, User } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface School {
  id: string;
  name: string;
  code: string;
  state: string;
  lga: string;
  ward: string;
  address: string;
  type: 'nursery' | 'primary' | 'secondary';
  ownership: 'public' | 'private' | 'private_low_cost';
  stage: 'nomination' | 'interest' | 'recee' | 'booking' | 'tour_done' | 'closed';
  status: string;
  lastActivity: string;
  daysInStage: number;
  studentCount: number;
  lat?: number;
  lng?: number;
  stuck?: boolean;
}

interface FilterState {
  search: string;
  types: string[];
  ownerships: string[];
  stages: string[];
  statuses: string[];
  state: string;
  lga: string;
  ward: string;
  proximityLat?: number;
  proximityLng?: number;
  proximityRadius: number;
}

export default function SchoolDirectory() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    ownerships: [],
    stages: [],
    statuses: [],
    state: '',
    lga: '',
    ward: '',
    proximityRadius: 10
  });

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'stuck' | 'nearest' | 'stage'>('newest');
  const [savedFilters, setSavedFilters] = useState<string[]>(['Pending Nominations', 'Stuck Schools', 'Lagos Only']);
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');

  // Parse URL params on mount (for click-through from reports)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlState = params.get('state');
    const urlLga = params.get('lga');
    const urlWard = params.get('ward');
    const urlStage = params.get('stage');
    const urlStatus = params.get('status');

    if (urlState || urlLga || urlWard || urlStage || urlStatus) {
      setFilters(prev => ({
        ...prev,
        state: urlState || '',
        lga: urlLga || '',
        ward: urlWard || '',
        stages: urlStage ? [urlStage] : [],
        statuses: urlStatus ? [urlStatus] : []
      }));
    }
  }, []);

  const schools: School[] = [
    {
      id: 'SCH-001',
      name: 'King\'s College Lagos',
      code: 'KCL-2025',
      state: 'Lagos',
      lga: 'Lagos Island',
      ward: 'Ward 5',
      address: '23 King\'s College Road, Lagos Island',
      type: 'secondary',
      ownership: 'public',
      stage: 'nomination',
      status: 'Pending Review',
      lastActivity: '2025-01-22',
      daysInStage: 2,
      studentCount: 1250,
      lat: 6.4541,
      lng: 3.3947,
      stuck: false
    },
    {
      id: 'SCH-002',
      name: 'Queen\'s College Yaba',
      code: 'QCY-2025',
      state: 'Lagos',
      lga: 'Yaba',
      ward: 'Ward 3',
      address: '45 Queen\'s Drive, Yaba',
      type: 'secondary',
      ownership: 'public',
      stage: 'interest',
      status: 'Form Completed',
      lastActivity: '2025-01-20',
      daysInStage: 5,
      studentCount: 980,
      lat: 6.5104,
      lng: 3.3711,
      stuck: false
    },
    {
      id: 'SCH-003',
      name: 'Holy Child College Ikoyi',
      code: 'HCC-2025',
      state: 'Lagos',
      lga: 'Ikoyi',
      ward: 'Ward 2',
      address: '12 Marina Street, Ikoyi',
      type: 'secondary',
      ownership: 'private',
      stage: 'recee',
      status: 'Scheduled',
      lastActivity: '2025-01-18',
      daysInStage: 8,
      studentCount: 750,
      lat: 6.4550,
      lng: 3.4249,
      stuck: false
    },
    {
      id: 'SCH-004',
      name: 'Community Primary School Gwagwalada',
      code: 'CPS-2025',
      state: 'Abuja',
      lga: 'Gwagwalada',
      ward: 'Ward 1',
      address: 'Plot 45 Gwagwalada Main',
      type: 'primary',
      ownership: 'public',
      stage: 'nomination',
      status: 'Pending Review',
      lastActivity: '2025-01-10',
      daysInStage: 12,
      studentCount: 1500,
      lat: 8.9428,
      lng: 7.0840,
      stuck: true
    },
    {
      id: 'SCH-005',
      name: 'Federal Government College Enugu',
      code: 'FGC-2025',
      state: 'Enugu',
      lga: 'Enugu North',
      ward: 'Ward 7',
      address: 'Independence Layout, Enugu',
      type: 'secondary',
      ownership: 'public',
      stage: 'booking',
      status: 'Invited',
      lastActivity: '2025-01-21',
      daysInStage: 3,
      studentCount: 1350,
      lat: 6.4410,
      lng: 7.4989,
      stuck: false
    },
    {
      id: 'SCH-006',
      name: 'Little Angels Nursery & Primary',
      code: 'LAN-2025',
      state: 'Lagos',
      lga: 'Surulere',
      ward: 'Ward 4',
      address: '78 Adeniran Ogunsanya, Surulere',
      type: 'primary',
      ownership: 'private_low_cost',
      stage: 'interest',
      status: 'Pending',
      lastActivity: '2025-01-15',
      daysInStage: 7,
      studentCount: 320,
      lat: 6.4969,
      lng: 3.3539,
      stuck: true
    },
    {
      id: 'SCH-007',
      name: 'St. Patrick\'s College Calabar',
      code: 'SPC-2025',
      state: 'Cross River',
      lga: 'Calabar Municipal',
      ward: 'Ward 6',
      address: 'Calabar Road, Calabar',
      type: 'secondary',
      ownership: 'private',
      stage: 'tour_done',
      status: 'Completed',
      lastActivity: '2025-01-19',
      daysInStage: 0,
      studentCount: 890,
      lat: 4.9758,
      lng: 8.3417,
      stuck: false
    },
    {
      id: 'SCH-008',
      name: 'Government Secondary School Kano',
      code: 'GSS-2025',
      state: 'Kano',
      lga: 'Kano Municipal',
      ward: 'Ward 9',
      address: 'Kofar Mata, Kano',
      type: 'secondary',
      ownership: 'public',
      stage: 'recee',
      status: 'Completed',
      lastActivity: '2025-01-17',
      daysInStage: 5,
      studentCount: 1820,
      lat: 12.0022,
      lng: 8.5919,
      stuck: false
    }
  ];

  const states = Array.from(new Set(schools.map(s => s.state))).sort();
  const lgas = filters.state ? Array.from(new Set(schools.filter(s => s.state === filters.state).map(s => s.lga))).sort() : [];
  const wards = filters.lga ? Array.from(new Set(schools.filter(s => s.lga === filters.lga).map(s => s.ward))).sort() : [];

  // Filter schools
  const filteredSchools = schools.filter(school => {
    const matchesSearch = 
      school.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      school.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      school.address.toLowerCase().includes(filters.search.toLowerCase()) ||
      school.lga.toLowerCase().includes(filters.search.toLowerCase()) ||
      school.ward.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType = filters.types.length === 0 || filters.types.includes(school.type);
    const matchesOwnership = filters.ownerships.length === 0 || filters.ownerships.includes(school.ownership);
    const matchesStage = filters.stages.length === 0 || filters.stages.includes(school.stage);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(school.status);
    const matchesState = !filters.state || school.state === filters.state;
    const matchesLga = !filters.lga || school.lga === filters.lga;
    const matchesWard = !filters.ward || school.ward === filters.ward;

    return matchesSearch && matchesType && matchesOwnership && matchesStage && matchesStatus && matchesState && matchesLga && matchesWard;
  });

  // Sort schools
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.lastActivity.localeCompare(a.lastActivity);
      case 'oldest':
        return a.lastActivity.localeCompare(b.lastActivity);
      case 'stuck':
        return b.daysInStage - a.daysInStage;
      case 'stage':
        return a.stage.localeCompare(b.stage);
      default:
        return 0;
    }
  });

  const handleToggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      return {
        ...prev,
        [category]: current.includes(value) 
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      types: [],
      ownerships: [],
      stages: [],
      statuses: [],
      state: '',
      lga: '',
      ward: '',
      proximityRadius: 10
    });
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      nomination: 'bg-[#FEF3E2] text-[#FF8500]',
      interest: 'bg-[#FEF3E2] text-[#FFBC3A]',
      recee: 'bg-[#FEF3E2] text-[#FF8500]',
      booking: 'bg-[#FEF3E2] text-[#FF8500]',
      tour_done: 'bg-[#FEF3E2] text-[#FF8500]',
      closed: 'bg-[#E5E7EB] text-[#9E9E9E]'
    };
    return colors[stage] || 'bg-[#E5E7EB] text-[#9E9E9E]';
  };

  const activeFilterCount = 
    filters.types.length + 
    filters.ownerships.length + 
    filters.stages.length + 
    filters.statuses.length + 
    (filters.state ? 1 : 0) + 
    (filters.lga ? 1 : 0) + 
    (filters.ward ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="School Directory"
        subtitle="Find, filter, and manage schools in the tour pipeline"
        screenCode="OPS-SCH01"
        actions={
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add School
          </button>
        }
      />

      <div className="w-[1440px] mx-auto px-8 py-6 flex gap-6">
        {/* Left Filter Rail */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6 space-y-4">
            {/* Saved Filters */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-[#2B2B2B]">Saved Filters</h3>
              </div>
              <div className="space-y-2">
                {savedFilters.map((filter, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-3 py-2 text-[12px] text-[#2B2B2B] hover:bg-[#FEF3E2] rounded transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="bg-[#FEF3E2] border border-[#F5A623]/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-medium text-[#2B2B2B]">
                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                  </span>
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] text-[#F5A623] hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* School Type */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-[13px] font-semibold text-[#2B2B2B] mb-3">School Type</h3>
              <div className="space-y-2">
                {['nursery', 'primary', 'secondary'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => handleToggleFilter('types', type)}
                      className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
                    />
                    <span className="text-[13px] text-[#2B2B2B] capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ownership */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-[13px] font-semibold text-[#2B2B2B] mb-3">Ownership</h3>
              <div className="space-y-2">
                {[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'private_low_cost', label: 'Private Low Cost' }
                ].map(own => (
                  <label key={own.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.ownerships.includes(own.value)}
                      onChange={() => handleToggleFilter('ownerships', own.value)}
                      className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
                    />
                    <span className="text-[13px] text-[#2B2B2B]">{own.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pipeline Stage */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-[13px] font-semibold text-[#2B2B2B] mb-3">Pipeline Stage</h3>
              <div className="space-y-2">
                {[
                  { value: 'nomination', label: 'Nomination' },
                  { value: 'interest', label: 'Interest' },
                  { value: 'recee', label: 'RECEE' },
                  { value: 'booking', label: 'Booking' },
                  { value: 'tour_done', label: 'Tour Done' },
                  { value: 'closed', label: 'Closed' }
                ].map(stage => (
                  <label key={stage.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.stages.includes(stage.value)}
                      onChange={() => handleToggleFilter('stages', stage.value)}
                      className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
                    />
                    <span className="text-[13px] text-[#2B2B2B]">{stage.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Geography */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-[13px] font-semibold text-[#2B2B2B] mb-3">Geography</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#9E9E9E] mb-1">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value, lga: '', ward: '' })}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                {filters.state && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#9E9E9E] mb-1">LGA</label>
                    <select
                      value={filters.lga}
                      onChange={(e) => setFilters({ ...filters, lga: e.target.value, ward: '' })}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                    >
                      <option value="">All LGAs</option>
                      {lgas.map(lga => (
                        <option key={lga} value={lga}>{lga}</option>
                      ))}
                    </select>
                  </div>
                )}
                {filters.lga && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#9E9E9E] mb-1">Ward</label>
                    <select
                      value={filters.ward}
                      onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                    >
                      <option value="">All Wards</option>
                      {wards.map(ward => (
                        <option key={ward} value={ward}>{ward}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Proximity Search */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-[13px] font-semibold text-[#2B2B2B] mb-3">Proximity Search</h3>
              <p className="text-[11px] text-[#9E9E9E] mb-3">Find schools near a location</p>
              <button className="w-full px-3 py-2 border border-[#F5A623] text-[#F5A623] rounded text-[12px] hover:bg-[#FEF3E2] transition-colors">
                <MapPin className="w-3 h-3 inline mr-1" />
                Set Location
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Sort Bar */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                <input
                  type="text"
                  placeholder="Search schools by name, code, address, LGA, ward..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[14px]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#9E9E9E]">
                Showing {sortedSchools.length} of {schools.length} schools
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#9E9E9E]">Sort:</span>
                {['newest', 'oldest', 'stuck', 'stage'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort as any)}
                    className={`px-3 py-1 rounded text-[12px] transition-colors ${
                      sortBy === sort
                        ? 'bg-[#F5A623] text-white'
                        : 'bg-[#F2F1EE] text-[#2B2B2B] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {sort === 'newest' && 'Newest'}
                    {sort === 'oldest' && 'Oldest'}
                    {sort === 'stuck' && 'Most Stuck'}
                    {sort === 'stage' && 'By Stage'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* School List */}
          <div className="space-y-3">
            {sortedSchools.map(school => (
              <div
                key={school.id}
                className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[15px] font-semibold text-[#2B2B2B]">
                            {school.name}
                          </h3>
                          {school.stuck && (
                            <span className="px-2 py-0.5 bg-[#FDE8E7] text-[#8C1D18] rounded text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              STUCK
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[12px] text-[#9E9E9E] mb-2">
                          <span className="font-mono">{school.code}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {school.state}, {school.lga}, {school.ward}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="px-2 py-1 bg-[#F2F1EE] text-[#2B2B2B] rounded capitalize">
                            {school.type}
                          </span>
                          <span className="px-2 py-1 bg-[#F2F1EE] text-[#2B2B2B] rounded capitalize">
                            {school.ownership.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded ${getStageColor(school.stage)}`}>
                            {school.stage.replace('_', ' ').toUpperCase()} - {school.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-[#9E9E9E]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {school.daysInStage} days in stage
                      </span>
                      <span>•</span>
                      <span>Last activity: {school.lastActivity}</span>
                      <span>•</span>
                      <span>{school.studentCount.toLocaleString()} students</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {school.stage === 'nomination' && school.status === 'Pending Review' && (
                      <>
                        <button className="px-3 py-1.5 bg-[#FF8500] text-white rounded text-[12px] hover:bg-[#E07700] transition-colors flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Approve
                        </button>
                        <button className="px-3 py-1.5 border border-[#8C1D18] text-[#8C1D18] rounded text-[12px] hover:bg-[#FDE8E7] transition-colors flex items-center gap-1">
                          <X className="w-3 h-3" />
                          Reject
                        </button>
                      </>
                    )}
                    {school.stage === 'interest' && school.status === 'Pending' && (
                      <button className="px-3 py-1.5 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09612] transition-colors flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Send Invite
                      </button>
                    )}
                    {school.stage === 'recee' && school.status === 'Completed' && (
                      <button className="px-3 py-1.5 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09612] transition-colors flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Assign RECEE
                      </button>
                    )}
                    {school.stage === 'booking' && school.status === 'Invited' && (
                      <button className="px-3 py-1.5 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09612] transition-colors flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Send Reminder
                      </button>
                    )}
                    <a
                      href={`/ops-sch02?id=${school.id}`}
                      className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded text-[12px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-1"
                    >
                      View School
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {sortedSchools.length === 0 && (
              <div className="text-center py-12 bg-white border border-[#E5E7EB] rounded-lg">
                <Search className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[14px] text-[#9E9E9E]">No schools found matching your filters</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-3 text-[13px] text-[#F5A623] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
