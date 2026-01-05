'use client'
import { useState } from 'react';
import { Check, X, AlertTriangle, ExternalLink, Search, Filter, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus, School } from '../../week2-pipeline-data';
import { RECEEResult, ActionModal } from '../../../../types/recee-approvals.types';

const OVERRIDE_REASONS = [
  'Minor issues can be resolved before tour',
  'School committed to immediate repairs',
  'Strategic importance to campaign',
  'Officer assessment too stringent',
  'Additional verification completed',
  'Other (specify in notes)'
];

const MOCK_RECEE_RESULTS: RECEEResult[] = [
  {
    id: 'REC001',
    school: SCHOOLS[0],
    officer: 'Adebayo Ogunlesi',
    inspectionDate: '2025-12-20',
    recommendation: 'PASS',
    overallScore: 85,
    criticalIssues: [],
    observations: 'Excellent facilities. School meets all safety requirements.',
    photos: 12
  },
  {
    id: 'REC002',
    school: SCHOOLS[1],
    officer: 'Chioma Nwosu',
    inspectionDate: '2025-12-21',
    recommendation: 'FAIL',
    overallScore: 45,
    criticalIssues: ['Inadequate assembly space', 'Safety hazards in playground'],
    observations: 'School does not meet minimum requirements for large group activities.',
    photos: 8
  },
  {
    id: 'REC003',
    school: SCHOOLS[2],
    officer: 'Ibrahim Musa',
    inspectionDate: '2025-12-22',
    recommendation: 'PASS',
    overallScore: 78,
    criticalIssues: [],
    observations: 'Good facilities with minor improvements needed.',
    photos: 10
  }
];

export default function RECEEApprovals() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<ActionModal | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideNotes, setOverrideNotes] = useState('');
  const [reinspectNotes, setReinspectNotes] = useState('');

  const [filters, setFilters] = useState({
    recommendation: '', // 'PASS', 'FAIL', 'REINSPECT'
    state: '',
    scoreRange: '' // 'high', 'medium', 'low'
  });

  // Filter results
  const filteredResults = MOCK_RECEE_RESULTS.filter(result => {
    if (searchQuery && !result.school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.recommendation && result.recommendation !== filters.recommendation) {
      return false;
    }
    if (filters.state && result.school.state !== filters.state) {
      return false;
    }
    return true;
  });

  const handleApprove = (result: RECEEResult) => {
    if (result.recommendation === 'PASS') {
      setActionModal({ type: 'approve-pass', result });
    } else {
      setActionModal({ type: 'approve-fail', result });
    }
  };

  const handleOverride = (result: RECEEResult) => {
    setActionModal({ type: 'override', result });
  };

  const handleReinspect = (result: RECEEResult) => {
    setActionModal({ type: 'reinspect', result });
  };

  const confirmAction = () => {
    if (!actionModal) return;

    console.log(`${actionModal.type}:`, actionModal.result.id);
    if (actionModal.type === 'override') {
      console.log('Override reason:', overrideReason);
      console.log('Override notes:', overrideNotes);
    }
    if (actionModal.type === 'reinspect') {
      console.log('Reinspect notes:', reinspectNotes);
    }

    setActionModal(null);
    setOverrideReason('');
    setOverrideNotes('');
    setReinspectNotes('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-[#2F6B3C]';
    if (score >= 50) return 'text-[#D4A017]';
    return 'text-[#8C1D18]';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'PASS':
        return 'bg-[#E8F5E9] text-[#2F6B3C]';
      case 'FAIL':
        return 'bg-[#FDE8E7] text-[#8C1D18]';
      case 'REINSPECT':
        return 'bg-[#FFF4E6] text-[#D4A017]';
      default:
        return 'bg-[#F2F1EE] text-[#9E9E9E]';
    }
  };

  const summary = {
    total: MOCK_RECEE_RESULTS.length,
    pass: MOCK_RECEE_RESULTS.filter(r => r.recommendation === 'PASS').length,
    fail: MOCK_RECEE_RESULTS.filter(r => r.recommendation === 'FAIL').length,
    reinspect: MOCK_RECEE_RESULTS.filter(r => r.recommendation === 'REINSPECT').length
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-3">
            <div className="flex-1 relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school name..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg text-[14px] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <select
              value={filters.recommendation}
              onChange={(e) => setFilters({ ...filters, recommendation: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All Recommendations</option>
              <option value="PASS">Pass</option>
              <option value="FAIL">Fail</option>
              <option value="REINSPECT">Reinspect</option>
            </select>

            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All States</option>
              <option value="Lagos">Lagos</option>
              <option value="FCT">FCT</option>
              <option value="Anambra">Anambra</option>
              <option value="Rivers">Rivers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            RECEE Approvals
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Review officer recommendations and approve schools for tour
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Pending Review
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {summary.total}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Recommended Pass
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2F6B3C]">
              {summary.pass}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              {Math.round((summary.pass / summary.total) * 100)}%
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Recommended Fail
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
              {summary.fail}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              {Math.round((summary.fail / summary.total) * 100)}%
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Overrides
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              0
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    School
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Officer
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Recommendation
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Critical Issues
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <>
                    <tr
                      key={result.id}
                      className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium">
                          {result.school.name}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {result.school.lga}, {result.school.state}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {result.officer}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {new Date(result.inspectionDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] ${getRecommendationBadge(result.recommendation)}`}>
                          {result.recommendation}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`text-[20px] leading-[28px] font-bold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                        </div>
                        <div className="text-[10px] text-[#9E9E9E]">
                          out of 100
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {result.criticalIssues.length > 0 ? (
                          <div className="flex items-center gap-1 text-[12px] text-[#8C1D18]">
                            <AlertTriangle className="w-3 h-3" />
                            {result.criticalIssues.length} issue(s)
                          </div>
                        ) : (
                          <div className="text-[12px] text-[#2F6B3C]">
                            ✓ None
                          </div>
                        )}
                        <button
                          onClick={() => setExpandedRow(expandedRow === result.id ? null : result.id)}
                          className="text-[10px] text-[#F5A623] hover:underline mt-1 flex items-center gap-1"
                        >
                          {expandedRow === result.id ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                          View details
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {result.recommendation === 'PASS' ? (
                            <>
                              <button
                                onClick={() => handleApprove(result)}
                                className="px-3 py-1.5 bg-[#2F6B3C] text-white rounded text-[12px] hover:bg-[#275A31] transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReinspect(result)}
                                className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded text-[12px] hover:bg-[#F2F1EE] transition-colors"
                              >
                                Reinspect
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleApprove(result)}
                                className="px-3 py-1.5 bg-[#8C1D18] text-white rounded text-[12px] hover:bg-[#6F1713] transition-colors"
                              >
                                Confirm Fail
                              </button>
                              <button
                                onClick={() => handleOverride(result)}
                                className="px-3 py-1.5 border border-[#F5A623] text-[#F5A623] rounded text-[12px] hover:bg-[#FFF7ED] transition-colors"
                              >
                                Override
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedRow === result.id && (
                      <tr className="bg-[#F2F1EE]">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="pl-8">
                            <h4 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-3">
                              Inspection Details
                            </h4>
                            
                            {/* Critical Issues */}
                            {result.criticalIssues.length > 0 && (
                              <div className="mb-4">
                                <div className="text-[12px] font-medium text-[#9E9E9E] mb-2">
                                  Critical Issues
                                </div>
                                <div className="space-y-1">
                                  {result.criticalIssues.map((issue, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-[12px] text-[#8C1D18]">
                                      <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                      {issue}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Observations */}
                            <div className="mb-4">
                              <div className="text-[12px] font-medium text-[#9E9E9E] mb-2">
                                Officer Observations
                              </div>
                              <div className="text-[14px] text-[#2B2B2B] bg-white p-3 rounded-lg border border-[#E5E7EB]">
                                {result.observations}
                              </div>
                            </div>

                            {/* Photos */}
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded text-[12px] hover:bg-white transition-colors flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" />
                                View Inspection Photos ({result.photos})
                              </button>
                              <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded text-[12px] hover:bg-white transition-colors">
                                View Full Report
                              </button>
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

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                {actionModal.type === 'approve-pass' && 'Approve School for Tour'}
                {actionModal.type === 'approve-fail' && 'Confirm RECEE Failure'}
                {actionModal.type === 'override' && 'Override RECEE Failure'}
                {actionModal.type === 'reinspect' && 'Request Re-inspection'}
              </h3>
              <button
                onClick={() => setActionModal(null)}
                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            {/* School Info */}
            <div className="mb-4 p-3 bg-[#F2F1EE] rounded-lg">
              <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium mb-1">
                {actionModal.result.school.name}
              </div>
              <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                Inspected by {actionModal.result.officer} on {new Date(actionModal.result.inspectionDate).toLocaleDateString()}
              </div>
              <div className="text-[12px] leading-[16px] text-[#9E9E9E] mt-1">
                Score: {actionModal.result.overallScore}/100 • {actionModal.result.recommendation}
              </div>
            </div>

            {actionModal.type === 'approve-pass' && (
              <div className="mb-4 p-3 bg-[#E8F5E9] rounded-lg">
                <div className="text-[12px] leading-[16px] text-[#2F6B3C]">
                  This school will be marked as "Approved for Tour" and moved to the booking phase.
                </div>
              </div>
            )}

            {actionModal.type === 'approve-fail' && (
              <div className="mb-4 p-3 bg-[#FDE8E7] rounded-lg">
                <div className="text-[12px] leading-[16px] text-[#8C1D18]">
                  <div className="font-medium mb-1">This will reject the school from the campaign.</div>
                  <div>Reason will be logged: RECEE Failure - {actionModal.result.criticalIssues.join(', ')}</div>
                </div>
              </div>
            )}

            {actionModal.type === 'override' && (
              <>
                <div className="mb-4 p-3 bg-[#FFF7ED] rounded-lg">
                  <div className="text-[12px] leading-[16px] text-[#F5A623] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Override Required</div>
                      <div>Officer recommended FAIL. Provide justification to override and approve.</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Override Reason *
                  </label>
                  <select
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">Select reason...</option>
                    {OVERRIDE_REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Additional Notes *
                  </label>
                  <textarea
                    value={overrideNotes}
                    onChange={(e) => setOverrideNotes(e.target.value)}
                    rows={4}
                    placeholder="Provide detailed justification for override..."
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  />
                </div>
              </>
            )}

            {actionModal.type === 'reinspect' && (
              <>
                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Reinspection Reason *
                  </label>
                  <textarea
                    value={reinspectNotes}
                    onChange={(e) => setReinspectNotes(e.target.value)}
                    rows={4}
                    placeholder="Why is reinspection needed? What should the officer verify?"
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setActionModal(null)}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={
                  (actionModal.type === 'override' && (!overrideReason || !overrideNotes)) ||
                  (actionModal.type === 'reinspect' && !reinspectNotes)
                }
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionModal.type === 'approve-pass'
                    ? 'bg-[#2F6B3C] hover:bg-[#275A31]'
                    : actionModal.type === 'approve-fail'
                    ? 'bg-[#8C1D18] hover:bg-[#6F1713]'
                    : actionModal.type === 'override'
                    ? 'bg-[#F5A623] hover:bg-[#E09615] disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'bg-[#D4A017] hover:bg-[#C59015] disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {actionModal.type === 'approve-pass' && 'Approve for Tour'}
                {actionModal.type === 'approve-fail' && 'Confirm Failure'}
                {actionModal.type === 'override' && 'Override & Approve'}
                {actionModal.type === 'reinspect' && 'Request Reinspection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
