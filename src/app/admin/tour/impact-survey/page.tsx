'use client'
import { useState } from 'react';
import { Search, Filter, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface SurveyData {
  id: string;
  school: string;
  tour: string;
  preScore: number;
  postScore: number;
  improvementPercent: number;
  status: 'completed' | 'in-progress' | 'pending';
  topic: string;
  date: string;
  participantsCount: number;
}

export default function ImpactSurvey() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterTour, setFilterTour] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const surveyData: SurveyData[] = [
    {
      id: 'SRV-001',
      school: "King's College Lagos",
      tour: 'Lagos Island School Tour Wave 1',
      preScore: 3.2,
      postScore: 4.5,
      improvementPercent: 40.6,
      status: 'completed',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-02-15',
      participantsCount: 856
    },
    {
      id: 'SRV-002',
      school: 'Green Valley Secondary School',
      tour: 'Ikeja Schools Activation',
      preScore: 2.8,
      postScore: 4.3,
      improvementPercent: 53.6,
      status: 'completed',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-02-18',
      participantsCount: 650
    },
    {
      id: 'SRV-003',
      school: 'Unity Primary School',
      tour: 'Surulere Primary Schools Drive',
      preScore: 3.5,
      postScore: 4.6,
      improvementPercent: 31.4,
      status: 'completed',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-02-20',
      participantsCount: 420
    },
    {
      id: 'SRV-004',
      school: 'Bright Future Academy',
      tour: 'Kano Municipal Education Tour',
      preScore: 2.9,
      postScore: 4.4,
      improvementPercent: 51.7,
      status: 'completed',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-02-22',
      participantsCount: 580
    },
    {
      id: 'SRV-005',
      school: 'Excellence International School',
      tour: 'Lekki Schools Engagement',
      preScore: 3.4,
      postScore: 4.7,
      improvementPercent: 38.2,
      status: 'completed',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-02-25',
      participantsCount: 720
    },
    {
      id: 'SRV-006',
      school: 'Capital Heights School',
      tour: 'Abuja Central Schools Wave 1',
      preScore: 3.1,
      postScore: 4.2,
      improvementPercent: 35.5,
      status: 'in-progress',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-03-02',
      participantsCount: 780
    },
    {
      id: 'SRV-007',
      school: 'Sunrise Academy Wuse',
      tour: 'Wuse District Education Drive',
      preScore: 0,
      postScore: 0,
      improvementPercent: 0,
      status: 'pending',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-03-05',
      participantsCount: 550
    },
    {
      id: 'SRV-008',
      school: 'International School Lagos',
      tour: 'Victoria Island Premium Schools',
      preScore: 0,
      postScore: 0,
      improvementPercent: 0,
      status: 'pending',
      topic: 'Brand Awareness & Product Knowledge',
      date: '2025-03-08',
      participantsCount: 920
    }
  ];

  // Filter survey data
  const filteredSurveys = surveyData.filter(survey => {
    const matchesSearch = survey.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         survey.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         survey.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = filterSchool === 'all' || survey.school === filterSchool;
    const matchesTour = filterTour === 'all' || survey.tour === filterTour;
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'february' && survey.date.includes('2025-02')) ||
      (filterDate === 'march' && survey.date.includes('2025-03'));
    return matchesSearch && matchesSchool && matchesTour && matchesDate;
  });

  // Calculate metrics
  const completedSurveys = filteredSurveys.filter(s => s.status === 'completed');
  const avgPreScore = completedSurveys.length > 0 
    ? completedSurveys.reduce((sum, s) => sum + s.preScore, 0) / completedSurveys.length 
    : 0;
  const avgPostScore = completedSurveys.length > 0 
    ? completedSurveys.reduce((sum, s) => sum + s.postScore, 0) / completedSurveys.length 
    : 0;
  const avgImprovement = completedSurveys.length > 0
    ? completedSurveys.reduce((sum, s) => sum + s.improvementPercent, 0) / completedSurveys.length
    : 0;

  const getStatusBadge = (status: SurveyData['status']) => {
    const config = {
      'completed': { bg: 'bg-[#FEF3E2]', text: 'text-[#FF8500]', label: 'Completed' },
      'in-progress': { bg: 'bg-[#FFF7ED]', text: 'text-[#FFBC3A]', label: 'In Progress' },
      'pending': { bg: 'bg-[#F2F1EE]', text: 'text-[#9E9E9E]', label: 'Pending' }
    };
    const statusConfig = config[status];
    return (
      <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded text-[11px]`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Impact Survey"
        subtitle="Track pre-survey and post-survey scores with improvement metrics"
        screenCode="TOUR-03"
        actions={
          <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Analysis
          </button>
        }
      />

      <div className="w-[1440px] mx-auto px-8 py-6">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Avg Pre-Survey Score</span>
              <BarChart3 className="w-4 h-4 text-[#9E9E9E]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{avgPreScore.toFixed(1)}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Out of 5.0</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Avg Post-Survey Score</span>
              <BarChart3 className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">{avgPostScore.toFixed(1)}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Out of 5.0</div>
          </div>

          <div className="bg-[#FEF3E2] border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#FF8500] font-bold">Average Improvement</span>
              <TrendingUp className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">+{avgImprovement.toFixed(1)}%</div>
            <div className="text-[11px] text-[#FF8500] mt-1">Score increase</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Completed Surveys</span>
              <BarChart3 className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{completedSurveys.length}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Out of {filteredSurveys.length} total</div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="mb-6 bg-white border border-[#E5E7EB] rounded-lg p-5">
          <div className="text-[13px] text-[#FF8500] font-bold mb-4">PRE-SURVEY VS POST-SURVEY COMPARISON</div>
          <div className="space-y-4">
            {completedSurveys.slice(0, 5).map((survey) => (
              <div key={survey.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#2B2B2B]">{survey.school}</span>
                  <span className="text-[11px] text-[#9E9E9E]">{survey.tour}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#9E9E9E]">Pre-Score</span>
                      <span className="text-[12px] text-[#2B2B2B]">{survey.preScore.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#9E9E9E]" 
                        style={{ width: `${(survey.preScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#FF8500]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#9E9E9E]">Post-Score</span>
                      <span className="text-[12px] text-[#FF8500]">{survey.postScore.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF8500]" 
                        style={{ width: `${(survey.postScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-[13px] text-[#FF8500] font-bold">
                      +{survey.improvementPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
              placeholder="Search schools or tours..."
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
            />
          </div>

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
            value={filterSchool}
            onChange={(e) => setFilterSchool(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Schools</option>
            {Array.from(new Set(surveyData.map(s => s.school))).map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>

          <select
            value={filterTour}
            onChange={(e) => setFilterTour(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Tours</option>
            {Array.from(new Set(surveyData.map(s => s.tour))).map(tour => (
              <option key={tour} value={tour}>{tour}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredSurveys.length} survey results
        </div>

        {/* Survey Data Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">School</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Tour</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Pre-Score</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Post-Score</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Improvement %</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSurveys.map((survey, index) => (
                <tr key={survey.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{survey.school}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{survey.participantsCount} participants</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{survey.tour}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{survey.date}</div>
                  </td>
                  <td className="px-4 py-4">
                    {survey.preScore > 0 ? (
                      <div>
                        <div className="text-[14px] text-[#2B2B2B]">{survey.preScore.toFixed(1)}</div>
                        <div className="text-[11px] text-[#9E9E9E]">out of 5.0</div>
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#9E9E9E]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {survey.postScore > 0 ? (
                      <div>
                        <div className="text-[14px] text-[#FF8500]">{survey.postScore.toFixed(1)}</div>
                        <div className="text-[11px] text-[#9E9E9E]">out of 5.0</div>
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#9E9E9E]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {survey.improvementPercent > 0 ? (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#FF8500]" />
                        <span className="text-[14px] text-[#FF8500] font-bold">
                          +{survey.improvementPercent.toFixed(1)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#9E9E9E]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(survey.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSurveys.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No survey data found</p>
          </div>
        )}
      </div>
    </div>
  );
}
