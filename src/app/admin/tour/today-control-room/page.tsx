'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { useScreen } from '../contexts/ScreenContext';
import { Search, Filter, Download, FileText, X, AlertTriangle, Users, Calendar, Clock, CheckCircle, XCircle, Activity, FileBarChart, MessageSquare, ExternalLink } from 'lucide-react';

interface TourSchool {
  id: string;
  name: string;
  ward: string;
  lga: string;
  state: string;
  cluster: string;
  type: string;
  ownership: string;
  supervisor: string;
  startTime: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'not-completed' | 'at-risk';
  activitiesDone: number;
  activitiesTotal: number;
  impactDone: number;
  impactTotal: number;
  teacherSurveyDone: number;
  teacherSurveyTotal: number;
  hasMismatch: boolean;
  tourData: {
    totalChildren: number;
    male: number;
    female: number;
    teachers: number;
    packagesDistributed: number;
    receeExpected: {
      totalChildren: number;
      male: number;
      female: number;
      teachers: number;
      packages: number;
    };
  };
  discrepancies: Array<{
    who: string;
    timestamp: string;
    type: string;
    reason: string;
    note: string;
  }>;
}

const SAMPLE_SCHOOLS: TourSchool[] = [
  {
    id: 'SCH001',
    name: 'Kings Academy',
    ward: 'Ikeja Ward A',
    lga: 'Ikeja',
    state: 'Lagos',
    cluster: 'Lagos Cluster 1',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'T. Adebayo',
    startTime: '08:00 AM',
    status: 'not-started',
    activitiesDone: 0,
    activitiesTotal: 5,
    impactDone: 0,
    impactTotal: 100,
    teacherSurveyDone: 0,
    teacherSurveyTotal: 12,
    hasMismatch: false,
    tourData: {
      totalChildren: 0,
      male: 0,
      female: 0,
      teachers: 0,
      packagesDistributed: 0,
      receeExpected: { totalChildren: 650, male: 340, female: 310, teachers: 12, packages: 650 }
    },
    discrepancies: []
  },
  {
    id: 'SCH002',
    name: 'St. Augustine College',
    ward: 'Victoria Island',
    lga: 'Eti-Osa',
    state: 'Lagos',
    cluster: 'Lagos Cluster 1',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'T. Adebayo',
    startTime: '08:30 AM',
    status: 'not-started',
    activitiesDone: 0,
    activitiesTotal: 5,
    impactDone: 0,
    impactTotal: 100,
    teacherSurveyDone: 0,
    teacherSurveyTotal: 15,
    hasMismatch: false,
    tourData: {
      totalChildren: 0,
      male: 0,
      female: 0,
      teachers: 0,
      packagesDistributed: 0,
      receeExpected: { totalChildren: 780, male: 390, female: 390, teachers: 15, packages: 780 }
    },
    discrepancies: []
  },
  {
    id: 'SCH003',
    name: 'Grace International School',
    ward: 'Gwarinpa',
    lga: 'Abuja Municipal',
    state: 'FCT',
    cluster: 'FCT Cluster 2',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'C. Okafor',
    startTime: '09:00 AM',
    status: 'in-progress',
    activitiesDone: 2,
    activitiesTotal: 5,
    impactDone: 45,
    impactTotal: 100,
    teacherSurveyDone: 5,
    teacherSurveyTotal: 10,
    hasMismatch: false,
    tourData: {
      totalChildren: 520,
      male: 270,
      female: 250,
      teachers: 10,
      packagesDistributed: 520,
      receeExpected: { totalChildren: 550, male: 285, female: 265, teachers: 10, packages: 550 }
    },
    discrepancies: []
  },
  {
    id: 'SCH004',
    name: 'Victory High School',
    ward: 'Wuse II',
    lga: 'Abuja Municipal',
    state: 'FCT',
    cluster: 'FCT Cluster 2',
    type: 'Secondary',
    ownership: 'Public',
    supervisor: 'C. Okafor',
    startTime: '10:00 AM',
    status: 'in-progress',
    activitiesDone: 4,
    activitiesTotal: 5,
    impactDone: 85,
    impactTotal: 100,
    teacherSurveyDone: 8,
    teacherSurveyTotal: 8,
    hasMismatch: true,
    tourData: {
      totalChildren: 420,
      male: 210,
      female: 210,
      teachers: 8,
      packagesDistributed: 420,
      receeExpected: { totalChildren: 680, male: 340, female: 340, teachers: 8, packages: 680 }
    },
    discrepancies: [
      {
        who: 'T. Supervisor',
        timestamp: '2025-12-24 11:30 AM',
        type: 'Lower attendance',
        reason: 'Exam period',
        note: 'School confirmed only SS1 and SS2 students available due to ongoing SS3 mock exams'
      }
    ]
  },
  {
    id: 'SCH005',
    name: 'Royal International School',
    ward: 'Asokoro',
    lga: 'Abuja Municipal',
    state: 'FCT',
    cluster: 'FCT Cluster 2',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'C. Okafor',
    startTime: '11:00 AM',
    status: 'completed',
    activitiesDone: 5,
    activitiesTotal: 5,
    impactDone: 100,
    impactTotal: 100,
    teacherSurveyDone: 12,
    teacherSurveyTotal: 12,
    hasMismatch: false,
    tourData: {
      totalChildren: 580,
      male: 290,
      female: 290,
      teachers: 12,
      packagesDistributed: 580,
      receeExpected: { totalChildren: 600, male: 300, female: 300, teachers: 12, packages: 600 }
    },
    discrepancies: []
  },
  {
    id: 'SCH006',
    name: 'Unity Secondary School',
    ward: 'Onitsha Urban',
    lga: 'Onitsha North',
    state: 'Anambra',
    cluster: 'Anambra Cluster 3',
    type: 'Secondary',
    ownership: 'Public',
    supervisor: 'A. Musa',
    startTime: '09:30 AM',
    status: 'not-completed',
    activitiesDone: 2,
    activitiesTotal: 5,
    impactDone: 30,
    impactTotal: 100,
    teacherSurveyDone: 0,
    teacherSurveyTotal: 10,
    hasMismatch: false,
    tourData: {
      totalChildren: 250,
      male: 130,
      female: 120,
      teachers: 10,
      packagesDistributed: 250,
      receeExpected: { totalChildren: 720, male: 360, female: 360, teachers: 10, packages: 720 }
    },
    discrepancies: [
      {
        who: 'A. Supervisor',
        timestamp: '2025-12-24 12:00 PM',
        type: 'Equipment failure',
        reason: 'Technical issue',
        note: 'Generator failure - school power cut. Postponed activities to next cycle.'
      }
    ]
  },
  {
    id: 'SCH007',
    name: 'Excel Academy',
    ward: 'GRA',
    lga: 'Port Harcourt',
    state: 'Rivers',
    cluster: 'Rivers Cluster 4',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'M. Ibrahim',
    startTime: '08:00 AM',
    status: 'in-progress',
    activitiesDone: 1,
    activitiesTotal: 5,
    impactDone: 20,
    impactTotal: 100,
    teacherSurveyDone: 3,
    teacherSurveyTotal: 14,
    hasMismatch: false,
    tourData: {
      totalChildren: 180,
      male: 90,
      female: 90,
      teachers: 14,
      packagesDistributed: 180,
      receeExpected: { totalChildren: 800, male: 400, female: 400, teachers: 14, packages: 800 }
    },
    discrepancies: []
  },
  {
    id: 'SCH008',
    name: 'Bright Future Academy',
    ward: 'Trans Amadi',
    lga: 'Port Harcourt',
    state: 'Rivers',
    cluster: 'Rivers Cluster 4',
    type: 'Secondary',
    ownership: 'Private',
    supervisor: 'M. Ibrahim',
    startTime: '14:00 PM',
    status: 'not-started',
    activitiesDone: 0,
    activitiesTotal: 5,
    impactDone: 0,
    impactTotal: 100,
    teacherSurveyDone: 0,
    teacherSurveyTotal: 9,
    hasMismatch: false,
    tourData: {
      totalChildren: 0,
      male: 0,
      female: 0,
      teachers: 0,
      packagesDistributed: 0,
      receeExpected: { totalChildren: 450, male: 230, female: 220, teachers: 9, packages: 450 }
    },
    discrepancies: []
  }
];
export default function TodayControlRoom() {
  //const { setScreen } = useScreen();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<TourSchool | null>(SAMPLE_SCHOOLS[3]);
  const [activeTab, setActiveTab] = useState<'all' | 'at-risk' | 'in-progress' | 'completed' | 'not-completed' | 'activated-today'>('all');
  const [showDiscrepancyForm, setShowDiscrepancyForm] = useState(false);

  const [filters, setFilters] = useState({
    state: '',
    lga: '',
    ward: '',
    cluster: '',
    status: [] as string[],
    scheduledToday: true,
    activatedToday: false
  });

  // Calculate KPIs
  const kpis = {
    scheduledToday: SAMPLE_SCHOOLS.length,
    activatedToday: 1,
    notStarted: SAMPLE_SCHOOLS.filter(s => s.status === 'not-started').length,
    inProgress: SAMPLE_SCHOOLS.filter(s => s.status === 'in-progress').length,
    completed: SAMPLE_SCHOOLS.filter(s => s.status === 'completed').length,
    notCompleted: SAMPLE_SCHOOLS.filter(s => s.status === 'not-completed').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-[#F2F1EE] text-[#9E9E9E]';
      case 'in-progress': return 'bg-[#FFF7ED] text-[#F5A623]';
      case 'completed': return 'bg-[#E8F5E9] text-[#2F6B3C]';
      case 'not-completed': return 'bg-[#FDE8E7] text-[#8C1D18]';
      case 'at-risk': return 'bg-[#FFF4E6] text-[#D4A017]';
      default: return 'bg-[#F2F1EE] text-[#9E9E9E]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'not-completed': return 'Not Completed';
      case 'at-risk': return 'At Risk';
      default: return status;
    }
  };

  const filterSchools = (schools: TourSchool[]) => {
    let filtered = schools;

    if (activeTab !== 'all') {
      if (activeTab === 'activated-today') {
        filtered = filtered.filter(s => s.id === 'SCH007');
      } else if (activeTab === 'at-risk') {
        filtered = filtered.filter(s => s.hasMismatch || s.status === 'not-completed');
      } else {
        filtered = filtered.filter(s => s.status === activeTab);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.lga.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.cluster.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredSchools = filterSchools(SAMPLE_SCHOOLS);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          {/* Search + Filters Row */}
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school, address, supervisor, cluster…"
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>

            {/* Filter Dropdowns */}
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value, lga: '', ward: '' })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All States</option>
              <option value="Lagos">Lagos</option>
              <option value="FCT">FCT</option>
              <option value="Anambra">Anambra</option>
              <option value="Rivers">Rivers</option>
            </select>

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

            {/* Buttons */}
            <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors flex items-center gap-2 whitespace-nowrap">
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Generate Daily Report</span>
            </button>

            <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>

          {/* Toggles Row */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.scheduledToday}
                onChange={(e) => setFilters({ ...filters, scheduledToday: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-[14px] text-[#2B2B2B]">Scheduled today</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.activatedToday}
                onChange={(e) => setFilters({ ...filters, activatedToday: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-[14px] text-[#2B2B2B]">Activated today</span>
            </label>

            <button
              onClick={() => setFilters({ state: '', lga: '', ward: '', cluster: '', status: [], scheduledToday: true, activatedToday: false })}
              className="text-[14px] text-[#F5A623] hover:underline ml-auto"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Today Control Room
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Wednesday, December 24, 2025 • Real-time tour operations
          </p>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Scheduled Today
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {kpis.scheduledToday}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              schools
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Activated Today
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {kpis.activatedToday}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
              not scheduled
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Not Started
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#9E9E9E]">
              {kpis.notStarted}
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              In Progress
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {kpis.inProgress}
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Completed
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2F6B3C]">
              {kpis.completed}
            </div>
          </button>

          <button className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Not Completed
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
              {kpis.notCompleted}
            </div>
          </button>
        </div>

        {/* Activation Context Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Tour Supervisor
                </div>
                <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                  T. Adebayo
                </div>
              </div>
              <div>
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Activation Time
                </div>
                <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                  08:00 AM - 04:00 PM
                </div>
              </div>
              <div>
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Analysts Active
                </div>
                <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                  4
                </div>
              </div>
              <div>
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Impact Surveys
                </div>
                <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                  280/800
                </div>
              </div>
              <div>
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Activities
                </div>
                <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                  14/40
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors">
                Open Tour Session
              </button>
              <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors">
                View Activity Log
              </button>
            </div>
          </div>
        </div>

        {/* Split View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: School List (65% = 2 cols) */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-[#E5E7EB] overflow-x-auto">
              {[
                { key: 'all', label: 'All' },
                { key: 'at-risk', label: 'At Risk' },
                { key: 'in-progress', label: 'In Progress' },
                { key: 'completed', label: 'Completed' },
                { key: 'not-completed', label: 'Not Completed' },
                { key: 'activated-today', label: 'Activated Today' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 text-[14px] leading-[20px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-[#F5A623] text-[#F5A623]'
                      : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* School Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Status</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">School</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Location</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Cluster</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Supervisor</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Start</th>
                      <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchools.map((school) => (
                      <tr
                        key={school.id}
                        onClick={() => setSelectedSchool(school)}
                        className={`border-b border-[#E5E7EB] cursor-pointer hover:bg-[#FFFDF8] transition-colors ${
                          selectedSchool?.id === school.id ? 'bg-[#FFF7ED]' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-[10px] ${getStatusColor(school.status)}`}>
                            {getStatusLabel(school.status)}
                          </span>
                          {school.hasMismatch && (
                            <AlertTriangle className="w-3 h-3 text-[#8C1D18] ml-1 inline" />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[14px] leading-[20px] text-[#2B2B2B]">{school.name}</div>
                          <div className="text-[12px] leading-[16px] text-[#9E9E9E]">{school.type} • {school.ownership}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                            {school.ward}, {school.lga}<br />{school.state}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[12px] leading-[16px] text-[#9E9E9E]">{school.cluster}</td>
                        <td className="px-4 py-3 text-[12px] leading-[16px] text-[#9E9E9E]">{school.supervisor}</td>
                        <td className="px-4 py-3 text-[12px] leading-[16px] text-[#9E9E9E]">{school.startTime}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-[12px] leading-[16px]">
                            <span title="Activities">🎯 {school.activitiesDone}/{school.activitiesTotal}</span>
                            <span title="Impact Surveys">📊 {school.impactDone}/{school.impactTotal}</span>
                            <span title="Teacher Surveys">👨‍🏫 {school.teacherSurveyDone}/{school.teacherSurveyTotal}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: School Detail Panel (35% = 1 col) */}
          {selectedSchool && (
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 sticky top-[120px]">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                      {selectedSchool.name}
                    </h2>
                    <span className={`px-2 py-1 rounded text-[10px] ${getStatusColor(selectedSchool.status)}`}>
                      {getStatusLabel(selectedSchool.status)}
                    </span>
                  </div>
                  <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-3">
                    {selectedSchool.ward}, {selectedSchool.lga}, {selectedSchool.state}
                  </div>
                  <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-4">
                    Cluster: {selectedSchool.cluster}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        
                        router.push('/admin/reports-analytics/school-case-file');
                      }}
                      className="flex-1 px-3 py-2 bg-[#F5A623] text-white rounded-lg text-[12px] hover:bg-[#E09615] transition-colors"
                    >
                      Open Case File
                    </button>
                    <button className="flex-1 px-3 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[12px] hover:bg-[#F2F1EE] transition-colors">
                      Tour Tracker
                    </button>
                  </div>
                </div>

                {/* Tour Summary */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-4">
                    Tour Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-1">Total Children</div>
                      <div className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {selectedSchool.tourData.totalChildren}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E]">
                        Expected: {selectedSchool.tourData.receeExpected.totalChildren}
                      </div>
                      {selectedSchool.tourData.totalChildren < selectedSchool.tourData.receeExpected.totalChildren && (
                        <span className="text-[10px] text-[#8C1D18]">⚠ Mismatch</span>
                      )}
                    </div>
                    <div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-1">Male</div>
                      <div className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {selectedSchool.tourData.male}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E]">
                        Expected: {selectedSchool.tourData.receeExpected.male}
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-1">Female</div>
                      <div className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {selectedSchool.tourData.female}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E]">
                        Expected: {selectedSchool.tourData.receeExpected.female}
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-1">Teachers</div>
                      <div className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {selectedSchool.tourData.teachers}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E]">
                        Expected: {selectedSchool.tourData.receeExpected.teachers}
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-1">Packages</div>
                      <div className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {selectedSchool.tourData.packagesDistributed}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E]">
                        Expected: {selectedSchool.tourData.receeExpected.packages}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-4">
                    Activities
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Facilitator Present</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.activitiesDone}/{selectedSchool.activitiesTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Attendance Done</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.activitiesDone}/{selectedSchool.activitiesTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Performance Done</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.activitiesDone}/{selectedSchool.activitiesTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Impact Surveys */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-4">
                    Impact Surveys
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Target Children</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.impactTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Pre Complete</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.impactDone}/{selectedSchool.impactTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Post Complete</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.impactDone}/{selectedSchool.impactTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#9E9E9E]">Complete Pairs</span>
                      <span className="text-[#2B2B2B]">{selectedSchool.impactDone}/{selectedSchool.impactTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Teacher Survey */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-4">
                    Teacher Survey
                  </h3>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#9E9E9E]">Completed</span>
                    <span className="text-[#2B2B2B]">{selectedSchool.teacherSurveyDone}/{selectedSchool.teacherSurveyTotal}</span>
                  </div>
                </div>

                {/* Discrepancy Comments */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B]">
                      Discrepancies
                    </h3>
                    <button
                      onClick={() => setShowDiscrepancyForm(!showDiscrepancyForm)}
                      className="px-3 py-1 border border-[#E5E7EB] text-[12px] text-[#2B2B2B] rounded hover:bg-[#F2F1EE] transition-colors"
                    >
                      {showDiscrepancyForm ? 'Cancel' : 'Explain'}
                    </button>
                  </div>

                  {showDiscrepancyForm && (
                    <div className="mb-4 p-3 bg-[#F2F1EE] rounded-lg space-y-3">
                      <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] bg-white">
                        <option>Select discrepancy type</option>
                        <option>Lower attendance</option>
                        <option>Equipment failure</option>
                        <option>Weather delay</option>
                        <option>Other</option>
                      </select>
                      <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] bg-white">
                        <option>Select reason</option>
                        <option>Exam period</option>
                        <option>Technical issue</option>
                        <option>School event</option>
                        <option>Other</option>
                      </select>
                      <textarea
                        placeholder="Additional notes..."
                        rows={3}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-[12px] resize-none"
                      />
                      <button className="w-full px-3 py-2 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09615] transition-colors">
                        Save Discrepancy
                      </button>
                    </div>
                  )}

                  {/* Discrepancy Timeline */}
                  <div className="space-y-3">
                    {selectedSchool.discrepancies.map((disc, idx) => (
                      <div key={idx} className="p-3 bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-[12px] font-medium text-[#2B2B2B]">{disc.type}</div>
                          <div className="text-[10px] text-[#9E9E9E]">{disc.timestamp}</div>
                        </div>
                        <div className="text-[12px] text-[#9E9E9E] mb-1">
                          <span className="font-medium">{disc.who}</span> • {disc.reason}
                        </div>
                        <div className="text-[12px] text-[#2B2B2B]">{disc.note}</div>
                      </div>
                    ))}
                    {selectedSchool.discrepancies.length === 0 && (
                      <div className="text-[12px] text-[#9E9E9E] text-center py-4">
                        No discrepancies reported
                      </div>
                    )}
                  </div>
                </div>

                {/* Go to Module Links */}
                <div>
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'RECEE Inspection', screen: 'ADM-REC01 RECEE Management' },
                      { label: 'Booking Details', screen: 'PLNB01 Booking Tracker' },
                      { label: 'Notifications Log', screen: 'ADM-COM02 Emails Sent' },
                      { label: 'Survey Responses', screen: 'ADM-FORM03 Survey Analytics' },
                      { label: 'School Case File', screen: 'OPS-SCH06 School Case File' }
                    ].map((link, idx) => (
                      <button
                        key={idx}
                        
                        className="w-full flex items-center justify-between px-3 py-2 border border-[#E5E7EB] rounded-lg hover:border-[#F5A623] transition-colors text-left"
                      >
                        <span className="text-[12px] text-[#2B2B2B]">{link.label}</span>
                        <ExternalLink className="w-3 h-3 text-[#9E9E9E]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
