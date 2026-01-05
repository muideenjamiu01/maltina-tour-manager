'use client'
import { useState } from 'react';

import { X, ChevronRight, Calendar, Filter, TrendingDown } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus, School } from '../../../admin/week2-pipeline-data';

type PipelineType = 'tour' | 'competition';

interface StageData {
  name: string;
  count: number;
  conversionRate?: number;
  dropOff?: number;
  topReasons?: string[];
}

interface FilterState {
  campaign: string;
  cycle: string;
  dateRange: string;
  includeRejected: boolean;
  compareMode: boolean;
  selectedStages: string[];
}

export default function PipelineFunnel() {
  const { setScreen } = useScreen();
  const [pipelineType, setPipelineType] = useState<PipelineType>('tour');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<{
    title: string;
    subtitle: string;
    schools: School[];
    breadcrumb: string[];
  } | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    campaign: 'Campaign 2025',
    cycle: 'Cycle 1',
    dateRange: 'Last 30 days',
    includeRejected: true,
    compareMode: false,
    selectedStages: []
  });

  // Tour Pipeline Stages (locked order)
  const tourStages: StageData[] = [
    {
      name: 'Nominated',
      count: getSchoolsByStatus('Nominated').length,
      conversionRate: 100,
      dropOff: 0,
      topReasons: []
    },
    {
      name: 'Interest Confirmed',
      count: getSchoolsByStatus('Interest Confirmed').length,
      conversionRate: 84,
      dropOff: 72,
      topReasons: ['No response', 'Duplicate']
    },
    {
      name: 'Approved for RECEE',
      count: getSchoolsByStatus('Approved for RECEE').length,
      conversionRate: 70,
      dropOff: 63,
      topReasons: ['Criteria fail', 'Location']
    },
    {
      name: 'RECEE Passed',
      count: getSchoolsByStatus('RECEE Completed – Passed').length,
      conversionRate: 64,
      dropOff: 26,
      topReasons: ['Infrastructure', 'Safety']
    },
    {
      name: 'Booking Open',
      count: getSchoolsByStatus('Booking Open (Link Sent)').length,
      conversionRate: 64,
      dropOff: 0,
      topReasons: []
    },
    {
      name: 'Booked',
      count: getSchoolsByStatus('Booked').length,
      conversionRate: 52,
      dropOff: 55,
      topReasons: ['No slots available', 'Schedule conflict']
    }
  ];

  // Competition Pipeline Stages (sample)
  const competitionStages: StageData[] = [
    { name: 'Designs Submitted', count: 1000, conversionRate: 100, dropOff: 0, topReasons: [] },
    { name: 'Assigned to Scoring', count: 850, conversionRate: 85, dropOff: 0, topReasons: [] },
    { name: 'Scoring Complete', count: 680, conversionRate: 68, dropOff: 0, topReasons: [] },
    { name: 'Finalists Selected', count: 16, conversionRate: 2, dropOff: 0, topReasons: [] },
    { name: 'Public Vote Open', count: 16, conversionRate: 2, dropOff: 0, topReasons: [] },
    { name: 'Winner Announced', count: 4, conversionRate: 0.4, dropOff: 0, topReasons: [] }
  ];

  // Competition detailed metrics
  const competitionMetrics = {
    // Scoring breakdown
    totalDesigns: 1000,
    assignedToScoring: 850,
    notAssigned: 150,
    scored: 680,
    notScored: 170,
    
    // Judge allocation
    totalJudges: 25,
    designsPerJudge: 40,
    judgesWithFullAllocation: 17,
    judgesWithCapacity: 8,
    availableSlots: 320,
    
    // Finalists by zone (4 zones × 4 finalists = 16)
    finalistsByZone: {
      'South West': { selected: 4, total: 4 },
      'South South': { selected: 4, total: 4 },
      'North Central': { selected: 4, total: 4 },
      'North East': { selected: 4, total: 4 }
    },
    
    // Public votes by zone
    totalVotes: 45680,
    votesByZone: {
      'South West': 12450,
      'South South': 11230,
      'North Central': 13100,
      'North East': 8900
    }
  };

  const currentStages = pipelineType === 'tour' ? tourStages : competitionStages;

  // Calculate KPIs
  const tourKPIs = {
    totalInPipeline: tourStages[0].count,
    conversionToBooked: Math.round((tourStages[5].count / tourStages[0].count) * 100),
    dropOffsTotal: tourStages.reduce((sum, stage) => sum + (stage.dropOff || 0), 0),
    biggestDropStage: 'Interest Confirmed → Approved for RECEE'
  };

  const competitionKPIs = {
    designsSubmitted: competitionStages[0].count,
    reachingSemiFinals: Math.round((competitionStages[2].count / competitionStages[0].count) * 100),
    avgJudgeScore: 7.8,
    dropOffsTotal: competitionStages.reduce((sum, stage) => sum + (stage.dropOff || 0), 0)
  };

  const handleKPIClick = (kpiName: string) => {
    setDrawerContent({
      title: kpiName,
      subtitle: `${filters.campaign} - ${filters.cycle}`,
      schools: SCHOOLS.slice(0, 10),
      breadcrumb: ['Campaign 2025', 'Cycle 1', 'Tour Pipeline', kpiName]
    });
    setDrawerOpen(true);
  };

  const handleStageClick = (stage: StageData) => {
    setDrawerContent({
      title: `Stage: ${stage.name}`,
      subtitle: `${stage.count} schools`,
      schools: SCHOOLS.slice(0, stage.count > 10 ? 10 : stage.count),
      breadcrumb: ['Campaign 2025', 'Cycle 1', 'Tour Pipeline', stage.name]
    });
    setDrawerOpen(true);
  };

  const handleSchoolClick = (schoolId: string) => {
    setScreen('OPS-SCH06 School Case File');
  };

  const clearFilters = () => {
    setFilters({
      campaign: 'Campaign 2025',
      cycle: 'Cycle 1',
      dateRange: 'Last 30 days',
      includeRejected: true,
      compareMode: false,
      selectedStages: []
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <select
              value={filters.campaign}
              onChange={(e) => setFilters({ ...filters, campaign: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option>Campaign 2025</option>
              <option>Campaign 2024</option>
            </select>

            <select
              value={filters.cycle}
              onChange={(e) => setFilters({ ...filters, cycle: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option>Cycle 1</option>
              <option>Cycle 2</option>
              <option>Cycle 3</option>
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>All time</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-[#9E9E9E] hover:text-[#2B2B2B] transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.includeRejected}
                onChange={(e) => setFilters({ ...filters, includeRejected: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-sm text-[#2B2B2B]">Include Rejected</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.compareMode}
                onChange={(e) => setFilters({ ...filters, compareMode: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-sm text-[#2B2B2B]">Vs Previous Cycle</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Pipeline Funnel Report
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Conversion rates and drop-off analysis
          </p>
        </div>

        {/* Pipeline Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#E5E7EB]">
          <button
            onClick={() => setPipelineType('tour')}
            className={`px-6 py-3 text-[14px] leading-[20px] font-medium border-b-2 transition-colors ${
              pipelineType === 'tour'
                ? 'border-[#F5A623] text-[#F5A623]'
                : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
            }`}
          >
            Tour Pipeline
          </button>
          <button
            onClick={() => setPipelineType('competition')}
            className={`px-6 py-3 text-[14px] leading-[20px] font-medium border-b-2 transition-colors ${
              pipelineType === 'competition'
                ? 'border-[#F5A623] text-[#F5A623]'
                : 'border-transparent text-[#9E9E9E] hover:text-[#2B2B2B]'
            }`}
          >
            Competition Pipeline
          </button>
        </div>

        {/* KPI Strip */}
        {pipelineType === 'tour' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => handleKPIClick('Total in Pipeline')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Total in Pipeline
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                {tourKPIs.totalInPipeline}
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Conversion to Booked')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Conversion to Booked
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                {tourKPIs.conversionToBooked}%
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Drop-offs Total')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Drop-offs Total
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
                {tourKPIs.dropOffsTotal}
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Biggest Drop Stage')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Biggest Drop Stage
              </div>
              <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                {tourKPIs.biggestDropStage}
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => handleKPIClick('Designs Submitted')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Designs Submitted
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                {competitionKPIs.designsSubmitted}
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Reaching Semi-finals')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                % Reaching Semi-final
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                {competitionKPIs.reachingSemiFinals}%
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Avg Judge Score')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Avg Judge Score
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                {competitionKPIs.avgJudgeScore}
              </div>
            </button>

            <button
              onClick={() => handleKPIClick('Drop-offs Total')}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors text-left"
            >
              <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                Drop-offs Total
              </div>
              <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
                {competitionKPIs.dropOffsTotal}
              </div>
            </button>
          </div>
        )}

        {/* Horizontal Stage Flow */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6 overflow-x-auto">
          <h2 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-6">
            Stage Flow
          </h2>
          <div className="flex gap-4 pb-2 min-w-max md:min-w-0">
            {currentStages.map((stage, idx) => (
              <div key={idx} className="flex items-center">
                {/* Stage Card */}
                <button
                  onClick={() => handleStageClick(stage)}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-all min-w-[160px]"
                >
                  {/* Stage Name */}
                  <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    {stage.name}
                  </div>

                  {/* Count */}
                  <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B] mb-2">
                    {stage.count}
                  </div>

                  {/* Conversion Rate */}
                  {stage.conversionRate !== undefined && (
                    <div className="text-[12px] leading-[16px] text-[#9E9E9E] mb-2">
                      {stage.conversionRate}% conversion
                    </div>
                  )}

                  {/* Mini Bar */}
                  <div className="w-full bg-[#F2F1EE] rounded-full h-1.5">
                    <div
                      className="bg-[#F5A623] h-1.5 rounded-full"
                      style={{ width: `${stage.conversionRate || 0}%` }}
                    />
                  </div>

                  {/* Drop-off */}
                  {stage.dropOff !== undefined && stage.dropOff > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                      <div className="text-[12px] leading-[16px] text-[#8C1D18] flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        {stage.dropOff} dropped
                      </div>
                      {stage.topReasons && stage.topReasons.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {stage.topReasons.map((reason, ridx) => (
                            <span
                              key={ridx}
                              className="px-2 py-0.5 bg-[#FDE8E7] text-[10px] text-[#8C1D18] rounded"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </button>

                {/* Connector */}
                {idx < currentStages.length - 1 && (
                  <div className="flex items-center justify-center w-8">
                    <ChevronRight className="w-5 h-5 text-[#E5E7EB]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Drop-offs and Rejections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pipelineType === 'tour' ? (
            <>
              {/* Panel A: Drop-offs by Stage */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                  Drop-offs by Stage
                </h3>
                <div className="space-y-3">
                  {currentStages
                    .filter(stage => stage.dropOff && stage.dropOff > 0)
                    .map((stage, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleStageClick(stage)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F2F1EE] transition-colors text-left"
                      >
                        <span className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {stage.name}
                        </span>
                        <span className="text-[14px] leading-[20px] font-medium text-[#8C1D18]">
                          {stage.dropOff}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Panel B: Top Reasons */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                  Top Reasons
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                      Nomination
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        No response (45)
                      </span>
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        Duplicate (27)
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                      Criteria
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        Location (38)
                      </span>
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        School type (25)
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                      RECEE Fail
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        Infrastructure (16)
                      </span>
                      <span className="px-3 py-1 bg-[#F2F1EE] text-[12px] text-[#2B2B2B] rounded-full">
                        Safety (10)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Competition Panel 1: Scoring Status */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                  Design Scoring Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] leading-[20px] text-[#2B2B2B]">
                        Assigned to Scoring
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                        {competitionMetrics.assignedToScoring} ({Math.round((competitionMetrics.assignedToScoring / competitionMetrics.totalDesigns) * 100)}%)
                      </span>
                    </div>
                    <div className="pl-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          ✅ Scored
                        </span>
                        <span className="text-[12px] leading-[16px] font-medium text-[#2F6B3C]">
                          {competitionMetrics.scored} ({Math.round((competitionMetrics.scored / competitionMetrics.assignedToScoring) * 100)}%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          ⏳ Not Scored
                        </span>
                        <span className="text-[12px] leading-[16px] font-medium text-[#F5A623]">
                          {competitionMetrics.notScored} ({Math.round((competitionMetrics.notScored / competitionMetrics.assignedToScoring) * 100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] leading-[20px] text-[#2B2B2B]">
                        Not Assigned
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-[#8C1D18]">
                        {competitionMetrics.notAssigned} ({Math.round((competitionMetrics.notAssigned / competitionMetrics.totalDesigns) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competition Panel 2: Judge Allocation */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                  Judge Allocation
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                      Total Judges
                    </span>
                    <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                      {competitionMetrics.totalJudges}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                      Designs per Judge (setting)
                    </span>
                    <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                      {competitionMetrics.designsPerJudge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                      Expected Capacity
                    </span>
                    <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                      {competitionMetrics.totalJudges * competitionMetrics.designsPerJudge} designs
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                        Judges with Full Allocation
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                        {competitionMetrics.judgesWithFullAllocation}/{competitionMetrics.totalJudges}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] leading-[16px] text-[#9E9E9E]">
                        Judges with Capacity
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-[#2F6B3C]">
                        {competitionMetrics.judgesWithCapacity} ({competitionMetrics.availableSlots} slots)
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                    <button className="w-full px-4 py-2 text-[12px] border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors">
                      Filter: Judges with Capacity
                    </button>
                    <button className="w-full px-4 py-2 text-[12px] border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors">
                      Filter: Designs Not Assigned
                    </button>
                    <button className="w-full px-4 py-2 text-[12px] bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors">
                      🎲 Bulk Random Allocate
                    </button>
                    <div className="text-[10px] text-[#9E9E9E] mt-2">
                      Blind assignment randomized by age, state, school
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Competition-specific panels */}
        {pipelineType === 'competition' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Finalists by Zone */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                Finalist Selection (16 Total)
              </h3>
              <div className="space-y-3">
                {Object.entries(competitionMetrics.finalistsByZone).map(([zone, data]) => (
                  <div key={zone} className="flex items-center justify-between">
                    <span className="text-[14px] leading-[20px] text-[#2B2B2B]">
                      {zone}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                        {data.selected}/{data.total}
                      </span>
                      {data.selected === data.total && (
                        <span className="text-[#2F6B3C]">✅</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-[#E5E7EB]">
                  <div className="text-[12px] leading-[16px] text-[#2F6B3C]">
                    ✅ All zones complete
                  </div>
                </div>
              </div>
            </div>

            {/* Public Vote Distribution */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                Public Vote Tracking
              </h3>
              <div className="mb-4">
                <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-1">
                  Total Votes
                </div>
                <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
                  {competitionMetrics.totalVotes.toLocaleString()}
                </div>
              </div>
              <div className="space-y-3">
                {Object.entries(competitionMetrics.votesByZone).map(([zone, votes]) => {
                  const percentage = Math.round((votes / competitionMetrics.totalVotes) * 100);
                  return (
                    <div key={zone}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] leading-[16px] text-[#2B2B2B]">
                          {zone}
                        </span>
                        <span className="text-[12px] leading-[16px] font-medium text-[#2B2B2B]">
                          {votes.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#F2F1EE] rounded-full h-2">
                        <div
                          className="bg-[#F5A623] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Drawer */}
      {drawerOpen && drawerContent && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                    {drawerContent.title}
                  </h2>
                  <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
                    {drawerContent.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-[#F2F1EE] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#9E9E9E]" />
                </button>
              </div>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] leading-[16px] text-[#9E9E9E]">
                {drawerContent.breadcrumb.map((crumb, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span>{crumb}</span>
                    {idx < drawerContent.breadcrumb.length - 1 && (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* School List */}
            <div className="p-6">
              <div className="space-y-2">
                {drawerContent.schools.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => handleSchoolClick(school.id)}
                    className="w-full p-4 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#F5A623] transition-colors text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-[14px] leading-[20px] font-medium text-[#2B2B2B] mb-1">
                          {school.name}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {school.lga}, {school.state}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-[#F2F1EE] text-[10px] text-[#2B2B2B] rounded">
                        {school.currentStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] leading-[16px]">
                      <span className="text-[#9E9E9E]">
                        {school.daysInCurrentStage} days in stage
                      </span>
                      <span className="text-[#9E9E9E]">
                        Last: {new Date(school.timeline[school.timeline.length - 1]?.date || '').toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}