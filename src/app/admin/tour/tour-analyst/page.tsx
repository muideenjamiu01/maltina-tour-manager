'use client'
import { useState } from 'react';
import { Search, Filter, Download, Eye, FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface AnalystReport {
  id: string;
  reportName: string;
  tour: string;
  analyst: string;
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  completionPercent: number;
  lastUpdated: string;
  dueDate: string;
  school: string;
  findings: string;
  recommendations: string;
}

export default function TourAnalyst() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnalyst, setFilterAnalyst] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const analystReports: AnalystReport[] = [
    {
      id: 'RPT-001',
      reportName: 'Lagos Island Tour Analysis Report',
      tour: 'Lagos Island School Tour Wave 1',
      analyst: 'Dr. Adebayo Johnson',
      status: 'completed',
      completionPercent: 100,
      lastUpdated: '2025-02-16',
      dueDate: '2025-02-18',
      school: "King's College Lagos",
      findings: 'Excellent student engagement with 95% positive response rate. Brand recall increased by 42%.',
      recommendations: 'Continue similar format for future tours. Consider adding more interactive elements.'
    },
    {
      id: 'RPT-002',
      reportName: 'Ikeja Schools Impact Assessment',
      tour: 'Ikeja Schools Activation',
      analyst: 'Mrs. Chioma Okonkwo',
      status: 'completed',
      completionPercent: 100,
      lastUpdated: '2025-02-19',
      dueDate: '2025-02-21',
      school: 'Green Valley Secondary School',
      findings: 'Strong facilitator performance. Students showed high interest in nutrition education.',
      recommendations: 'Expand nutrition content. Provide follow-up materials to teachers.'
    },
    {
      id: 'RPT-003',
      reportName: 'Surulere Primary Schools Evaluation',
      tour: 'Surulere Primary Schools Drive',
      analyst: 'Mr. Emeka Nwankwo',
      status: 'completed',
      completionPercent: 100,
      lastUpdated: '2025-02-21',
      dueDate: '2025-02-23',
      school: 'Unity Primary School',
      findings: 'Age-appropriate content well received. Younger students needed more visual aids.',
      recommendations: 'Develop age-specific materials. Include more games and activities.'
    },
    {
      id: 'RPT-004',
      reportName: 'Kano Municipal Tour Insights',
      tour: 'Kano Municipal Education Tour',
      analyst: 'Dr. Fatima Abubakar',
      status: 'completed',
      completionPercent: 100,
      lastUpdated: '2025-02-23',
      dueDate: '2025-02-25',
      school: 'Bright Future Academy',
      findings: 'Cultural sensitivity appreciated. Students responded well to localized approach.',
      recommendations: 'Maintain cultural adaptation strategy. Train more local facilitators.'
    },
    {
      id: 'RPT-005',
      reportName: 'Lekki Schools Performance Report',
      tour: 'Lekki Schools Engagement',
      analyst: 'Mrs. Blessing Okafor',
      status: 'in-progress',
      completionPercent: 75,
      lastUpdated: '2025-02-26',
      dueDate: '2025-02-28',
      school: 'Excellence International School',
      findings: 'Data collection ongoing. Preliminary results show positive engagement.',
      recommendations: 'Pending final analysis.'
    },
    {
      id: 'RPT-006',
      reportName: 'Abuja Central Wave 1 Analysis',
      tour: 'Abuja Central Schools Wave 1',
      analyst: 'Dr. Ibrahim Musa',
      status: 'in-progress',
      completionPercent: 60,
      lastUpdated: '2025-03-03',
      dueDate: '2025-03-05',
      school: 'Capital Heights School',
      findings: 'Initial observations recorded. Survey data being compiled.',
      recommendations: 'Analysis in progress.'
    },
    {
      id: 'RPT-007',
      reportName: 'Wuse District Tour Evaluation',
      tour: 'Wuse District Education Drive',
      analyst: 'Mrs. Aisha Bello',
      status: 'pending',
      completionPercent: 0,
      lastUpdated: '2025-03-05',
      dueDate: '2025-03-08',
      school: 'Sunrise Academy Wuse',
      findings: 'Tour scheduled. Report to be initiated after tour completion.',
      recommendations: 'N/A'
    },
    {
      id: 'RPT-008',
      reportName: 'Victoria Island Premium Analysis',
      tour: 'Victoria Island Premium Schools',
      analyst: 'Dr. Adebayo Johnson',
      status: 'pending',
      completionPercent: 0,
      lastUpdated: '2025-03-08',
      dueDate: '2025-03-11',
      school: 'International School Lagos',
      findings: 'Tour scheduled. Report pending.',
      recommendations: 'N/A'
    },
    {
      id: 'RPT-009',
      reportName: 'Mainland Schools Q1 Report',
      tour: 'Mainland Schools Initiative',
      analyst: 'Mr. Tunde Adewale',
      status: 'overdue',
      completionPercent: 45,
      lastUpdated: '2025-02-20',
      dueDate: '2025-02-24',
      school: 'Multiple Schools',
      findings: 'Partial data collected. Analysis delayed due to data gaps.',
      recommendations: 'Require additional time for comprehensive analysis.'
    }
  ];

  // Filter reports
  const filteredReports = analystReports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.analyst.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAnalyst = filterAnalyst === 'all' || report.analyst === filterAnalyst;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'february' && report.lastUpdated.includes('2025-02')) ||
      (filterDate === 'march' && report.lastUpdated.includes('2025-03'));
    return matchesSearch && matchesAnalyst && matchesStatus && matchesDate;
  });

  // Calculate summary metrics
  const totalReports = filteredReports.length;
  const completedReports = filteredReports.filter(r => r.status === 'completed').length;
  const pendingReports = filteredReports.filter(r => r.status === 'pending').length;
  const overdueReports = filteredReports.filter(r => r.status === 'overdue').length;

  const getStatusConfig = (status: AnalystReport['status']) => {
    const config = {
      'completed': { bg: 'bg-[#FEF3E2]', text: 'text-[#FF8500]', label: 'Completed', icon: CheckCircle },
      'in-progress': { bg: 'bg-[#FFF7ED]', text: 'text-[#FFBC3A]', label: 'In Progress', icon: Clock },
      'pending': { bg: 'bg-[#F2F1EE]', text: 'text-[#9E9E9E]', label: 'Pending', icon: FileText },
      'overdue': { bg: 'bg-[#FDE8E7]', text: 'text-[#8C1D18]', label: 'Overdue', icon: AlertCircle }
    };
    return config[status];
  };

  const getStatusBadge = (status: AnalystReport['status']) => {
    const statusConfig = getStatusConfig(status);
    const Icon = statusConfig.icon;
    return (
      <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded text-[11px] flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Tour Analyst"
        subtitle="Track analyst reports with completion status and progress"
        screenCode="TOUR-05"
        actions={
          <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Reports
          </button>
        }
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Reports</span>
              <FileText className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalReports}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">All analyst reports</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Completed</span>
              <CheckCircle className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">{completedReports}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{totalReports > 0 ? ((completedReports / totalReports) * 100).toFixed(0) : 0}% completion rate</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Pending</span>
              <Clock className="w-4 h-4 text-[#9E9E9E]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{pendingReports}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Awaiting start</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Overdue</span>
              <AlertCircle className="w-4 h-4 text-[#8C1D18]" />
            </div>
            <div className="text-[28px] text-[#8C1D18]">{overdueReports}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Requires attention</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, tours, or analysts..."
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
            />
          </div>

          <select
            value={filterAnalyst}
            onChange={(e) => setFilterAnalyst(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Analysts</option>
            {Array.from(new Set(analystReports.map(r => r.analyst))).map(analyst => (
              <option key={analyst} value={analyst}>{analyst}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
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
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredReports.length} reports
        </div>

        {/* Reports Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Report Name</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Tour</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Analyst</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Status</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Completion %</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Last Updated</th>
                <th className="px-4 py-3 text-right text-[11px] text-[#FF8500] font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={report.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{report.reportName}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{report.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{report.tour}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{report.school}</div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{report.analyst}</td>
                  <td className="px-4 py-4">{getStatusBadge(report.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px]">
                        <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              report.status === 'completed' 
                                ? 'bg-[#FF8500]' 
                                : report.status === 'in-progress'
                                ? 'bg-[#FFBC3A]'
                                : report.status === 'overdue'
                                ? 'bg-[#8C1D18]'
                                : 'bg-[#E5E7EB]'
                            }`}
                            style={{ width: `${report.completionPercent}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-[13px] text-[#2B2B2B] w-10">{report.completionPercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{report.lastUpdated}</div>
                    <div className="text-[11px] text-[#9E9E9E]">Due: {report.dueDate}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 text-[#FF8500] hover:bg-[#FFF4E6] rounded transition-colors"
                        title="View Report"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-[#FF8500] hover:bg-[#FFF4E6] rounded transition-colors"
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No reports found</p>
          </div>
        )}
      </div>
    </div>
  );
}
