'use client'
import { useState } from 'react';
import { Check, X, AlertCircle, CheckCircle, XCircle, Filter, Download, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus, School } from '../../week2-pipeline-data';
import { CriteriaCheck, ActionModal } from '../../../../types/interest-criteria.types';

const CRITERIA_REJECTION_REASONS = [
  'Student count below minimum (500)',
  'Student count above maximum (1000)',
  'School type not eligible (Primary/Tertiary)',
  'Location outside campaign zone',
  'Duplicate school in system',
  'Incomplete interest form data',
  'School ownership not eligible',
  'Other (specify in notes)'
];

export default function InterestCriteria() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<ActionModal | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [overrideReason, setOverrideReason] = useState('');

  const [filters, setFilters] = useState({
    state: '',
    autoDecision: '', // 'pass', 'fail', 'all'
    criteriaIssue: ''
  });

  // Get schools with confirmed interest
  const interestSchools = getSchoolsByStatus('Interest Confirmed');

  // Mock criteria validation
  const validateCriteria = (school: School): CriteriaCheck[] => {
    const studentCount = school.studentCount || 750;
    const schoolType = school.type || 'Secondary';
    const location = school.state;

    return [
      {
        name: 'Student Count',
        status: studentCount >= 500 && studentCount <= 1000 ? 'pass' : 'fail',
        value: studentCount.toString(),
        requirement: '500 - 1,000 students'
      },
      {
        name: 'School Type',
        status: schoolType === 'Secondary' ? 'pass' : 'fail',
        value: schoolType,
        requirement: 'Secondary School only'
      },
      {
        name: 'Location Eligibility',
        status: ['Lagos', 'FCT', 'Anambra', 'Rivers'].includes(location) ? 'pass' : 'fail',
        value: `${school.lga}, ${location}`,
        requirement: 'Lagos, FCT, Anambra, or Rivers'
      },
      {
        name: 'Ownership',
        status: 'pass',
        value: 'Public',
        requirement: 'Public or Private'
      }
    ];
  };

  const getAutoDecision = (checks: CriteriaCheck[]): 'pass' | 'fail' => {
    return checks.every(c => c.status === 'pass') ? 'pass' : 'fail';
  };

  // Filter schools
  const filteredSchools = interestSchools.filter(school => {
    if (searchQuery && !school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.state && school.state !== filters.state) {
      return false;
    }
    if (filters.autoDecision) {
      const checks = validateCriteria(school);
      const decision = getAutoDecision(checks);
      if (filters.autoDecision !== decision) {
        return false;
      }
    }
    return true;
  });

  const handleApprove = (school: School) => {
    setActionModal({ type: 'approve', school });
  };

  const handleReject = (school: School) => {
    setActionModal({ type: 'reject', school });
  };

  const handleOverride = (school: School) => {
    setActionModal({ type: 'override', school });
  };

  const confirmAction = () => {
    if (!actionModal) return;

    console.log(`${actionModal.type} school:`, actionModal.school.id);
    if (actionModal.type === 'reject') {
      console.log('Reason:', rejectionReason);
      console.log('Notes:', rejectionNotes);
    }
    if (actionModal.type === 'override') {
      console.log('Override reason:', overrideReason);
    }

    setActionModal(null);
    setRejectionReason('');
    setRejectionNotes('');
    setOverrideReason('');
  };

  // Calculate summary
  const summary = {
    total: interestSchools.length,
    autoPass: interestSchools.filter(s => getAutoDecision(validateCriteria(s)) === 'pass').length,
    autoFail: interestSchools.filter(s => getAutoDecision(validateCriteria(s)) === 'fail').length,
    pendingReview: interestSchools.length
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

            <select
              value={filters.autoDecision}
              onChange={(e) => setFilters({ ...filters, autoDecision: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="">All Decisions</option>
              <option value="pass">Auto-Pass</option>
              <option value="fail">Auto-Fail</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Interest & Criteria Validation
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Auto-validate criteria and approve schools for RECEE
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
              Auto Pass
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#FF8500]">
              {summary.autoPass}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              {Math.round((summary.autoPass / summary.total) * 100)}%
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Auto-Fail
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#8C1D18]">
              {summary.autoFail}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              {Math.round((summary.autoFail / summary.total) * 100)}%
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Manual Override
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              0
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div className="text-[14px] text-[#2B2B2B]">
              <div className="font-medium mb-1">Auto-Validation Active</div>
              <div className="text-[#9E9E9E]">
                Schools are automatically checked against criteria. You can override failed checks with justification.
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    School
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Auto Decision
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Criteria Summary
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => {
                  const checks = validateCriteria(school);
                  const autoDecision = getAutoDecision(checks);
                  const failedChecks = checks.filter(c => c.status === 'fail');

                  return (
                    <>
                      <tr
                        key={school.id}
                        className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium">
                            {school.name}
                          </div>
                          <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                            {school.lga}, {school.state}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {autoDecision === 'pass' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FEF3E2] text-[#FF8500] rounded text-[10px]">
                              <CheckCircle className="w-3 h-3" />
                              AUTO-PASS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FDE8E7] text-[#8C1D18] rounded text-[10px]">
                              <XCircle className="w-3 h-3" />
                              AUTO-FAIL
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[12px] leading-[16px]">
                            {failedChecks.length === 0 ? (
                              <span className="text-[#FF8500]">✓ All checks passed</span>
                            ) : (
                              <span className="text-[#8C1D18]">
                                ✗ {failedChecks.length} check(s) failed
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => setExpandedRow(expandedRow === school.id ? null : school.id)}
                            className="text-[10px] text-[#F5A623] hover:underline mt-1 flex items-center gap-1"
                          >
                            {expandedRow === school.id ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            View details
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {autoDecision === 'pass' ? (
                              <button
                                onClick={() => handleApprove(school)}
                                className="px-3 py-1.5 bg-[#FF8500] text-white rounded text-[12px] hover:bg-[#E07600] transition-colors"
                              >
                                Approve for RECEE
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleReject(school)}
                                  className="px-3 py-1.5 bg-[#8C1D18] text-white rounded text-[12px] hover:bg-[#6F1713] transition-colors"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleOverride(school)}
                                  className="px-3 py-1.5 border border-[#F5A623] text-[#F5A623] rounded text-[12px] hover:bg-[#FFF7ED] transition-colors"
                                >
                                  Override
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Criteria Details */}
                      {expandedRow === school.id && (
                        <tr className="bg-[#F2F1EE]">
                          <td colSpan={4} className="px-4 py-4">
                            <div className="pl-8">
                              <h4 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-3">
                                Criteria Validation Details
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {checks.map((check, idx) => (
                                  <div key={idx} className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                                    <div className="flex items-start justify-between mb-2">
                                      <span className="text-[12px] font-medium text-[#9E9E9E]">
                                        {check.name}
                                      </span>
                                      {check.status === 'pass' ? (
                                        <CheckCircle className="w-4 h-4 text-[#FF8500]" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-[#8C1D18]" />
                                      )}
                                    </div>
                                    <div className="text-[14px] text-[#2B2B2B] mb-1">
                                      {check.value}
                                    </div>
                                    <div className="text-[10px] text-[#9E9E9E]">
                                      Required: {check.requirement}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
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
                {actionModal.type === 'approve' && 'Approve for RECEE'}
                {actionModal.type === 'reject' && 'Reject School'}
                {actionModal.type === 'override' && 'Manual Override'}
              </h3>
              <button
                onClick={() => setActionModal(null)}
                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium mb-1">
                {actionModal.school.name}
              </div>
              <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                {actionModal.school.lga}, {actionModal.school.state}
              </div>
            </div>

            {actionModal.type === 'approve' && (
              <div className="mb-4 p-3 bg-[#FEF3E2] rounded-lg">
                <div className="text-[12px] leading-[16px] text-[#FF8500]">
                  This school will be moved to "Approved for RECEE" and will appear in the RECEE scheduling queue.
                </div>
              </div>
            )}

            {actionModal.type === 'reject' && (
              <>
                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Rejection Reason *
                  </label>
                  <select
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">Select reason...</option>
                    {CRITERIA_REJECTION_REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={rejectionNotes}
                    onChange={(e) => setRejectionNotes(e.target.value)}
                    rows={3}
                    placeholder="Add context or additional details..."
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  />
                </div>
              </>
            )}

            {actionModal.type === 'override' && (
              <>
                <div className="mb-4 p-3 bg-[#FFF7ED] rounded-lg">
                  <div className="text-[12px] leading-[16px] text-[#F5A623] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Manual Override Required</div>
                      <div>This school failed auto-validation. Please provide justification for override.</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Override Justification *
                  </label>
                  <textarea
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    rows={4}
                    placeholder="Explain why this school should be approved despite failing criteria checks..."
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
                  (actionModal.type === 'reject' && !rejectionReason) ||
                  (actionModal.type === 'override' && !overrideReason)
                }
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionModal.type === 'approve'
                    ? 'bg-[#FF8500] hover:bg-[#E07600]'
                    : actionModal.type === 'reject'
                    ? 'bg-[#8C1D18] hover:bg-[#6F1713] disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'bg-[#F5A623] hover:bg-[#E09615] disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {actionModal.type === 'approve' && 'Approve'}
                {actionModal.type === 'reject' && 'Reject'}
                {actionModal.type === 'override' && 'Override & Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}