'use client'
import { useState } from 'react';
import { Check, X, Mail, AlertTriangle, Filter, Download, Search, ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus, School } from '../../week2-pipeline-data';
import { ActionModal } from '../../../../types/nomination-review.types';

const REJECTION_REASONS = [
  'Duplicate nomination',
  'School already in campaign',
  'Invalid school type',
  'Outside campaign zone',
  'Insufficient information',
  'School declined participation',
  'Other (specify in notes)'
];

export default function NominationReview() {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionModal, setActionModal] = useState<ActionModal | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');

  const [filters, setFilters] = useState({
    state: '',
    lga: '',
    nominatorType: '',
    dateRange: 'all'
  });

  // Get nominated schools
  const nominatedSchools = getSchoolsByStatus('Nominated');

  // Filter schools
  const filteredSchools = nominatedSchools.filter(school => {
    if (searchQuery && !school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.state && school.state !== filters.state) {
      return false;
    }
    if (filters.lga && school.lga !== filters.lga) {
      return false;
    }
    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSchools(filteredSchools.map(s => s.id));
    } else {
      setSelectedSchools([]);
    }
  };

  const handleSelectSchool = (schoolId: string, checked: boolean) => {
    if (checked) {
      setSelectedSchools([...selectedSchools, schoolId]);
    } else {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  const handleApprove = (school: School) => {
    setActionModal({ type: 'approve', schools: [school] });
  };

  const handleReject = (school: School) => {
    setActionModal({ type: 'reject', schools: [school] });
  };

  const handleBulkApprove = () => {
    const schools = filteredSchools.filter(s => selectedSchools.includes(s.id));
    setActionModal({ type: 'bulk-approve', schools });
  };

  const handleBulkReject = () => {
    const schools = filteredSchools.filter(s => selectedSchools.includes(s.id));
    setActionModal({ type: 'bulk-reject', schools });
  };

  const confirmAction = () => {
    if (!actionModal) return;

    const action = actionModal.type.includes('approve') ? 'approved' : 'rejected';
    console.log(`${action} ${actionModal.schools.length} school(s)`);
    if (action === 'rejected') {
      console.log('Reason:', rejectionReason);
      console.log('Notes:', rejectionNotes);
    }
    
    // Reset
    setActionModal(null);
    setRejectionReason('');
    setRejectionNotes('');
    setSelectedSchools([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          {/* Row 1: Search + Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-3">
            {/* Search */}
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

            {/* Actions */}
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

          {/* Row 2: Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
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

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            Nomination Review
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Review and approve schools for interest invitation
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Pending Review
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {nominatedSchools.length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Selected
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {selectedSchools.length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Avg Review Time
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              2.3
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              days
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Consensus Rate
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#FF8500]">
              87%
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedSchools.length === filteredSchools.length && filteredSchools.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    School
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Nominated By
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Nominated Date
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Days Pending
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Actions
                  </th>
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
                        <input
                          type="checkbox"
                          checked={selectedSchools.includes(school.id)}
                          onChange={(e) => handleSelectSchool(school.id, e.target.checked)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium">
                          {school.name}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {school.id}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {school.lga}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {school.state}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {school.nominatedBy || 'Public Nominator'}
                        </div>
                        <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                          {school.nominatorEmail || 'nominator@email.com'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {school.timeline && school.timeline[0]?.date 
                            ? new Date(school.timeline[0].date).toLocaleDateString() 
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[14px] leading-[20px] text-[#2B2B2B]">
                          {school.daysInCurrentStage} days
                        </div>
                        {school.daysInCurrentStage > 7 && (
                          <div className="text-[10px] text-[#D4A017] flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3" />
                            overdue
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedRow(expandedRow === school.id ? null : school.id)}
                            className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                            title="View details"
                          >
                            {expandedRow === school.id ? (
                              <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
                            )}
                          </button>
                          <button
                            onClick={() => handleApprove(school)}
                            className="p-1.5 bg-[#FF8500] text-white rounded hover:bg-[#E07600] transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(school)}
                            className="p-1.5 bg-[#8C1D18] text-white rounded hover:bg-[#6F1713] transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setScreen('OPS-SCH06 School Case File')}
                            className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
                            title="More actions"
                          >
                            <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedRow === school.id && (
                      <tr className="bg-[#F2F1EE]">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="pl-8">
                            <h4 className="text-[14px] leading-[20px] font-semibold text-[#2B2B2B] mb-3">
                              Nomination Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-[12px]">
                              <div>
                                <div className="text-[#9E9E9E] mb-1">School Type</div>
                                <div className="text-[#2B2B2B]">{school.type || 'Secondary School'}</div>
                              </div>
                              <div>
                                <div className="text-[#9E9E9E] mb-1">Student Population</div>
                                <div className="text-[#2B2B2B]">{school.studentCount || 'Not provided'}</div>
                              </div>
                              <div>
                                <div className="text-[#9E9E9E] mb-1">Address</div>
                                <div className="text-[#2B2B2B]">{school.address || 'Address not provided'}</div>
                              </div>
                              <div>
                                <div className="text-[#9E9E9E] mb-1">Contact Phone</div>
                                <div className="text-[#2B2B2B]">{school.phone || 'Not provided'}</div>
                              </div>
                              <div className="col-span-2">
                                <div className="text-[#9E9E9E] mb-1">Nomination Source</div>
                                <div className="text-[#2B2B2B]">
                                  {school.nominationSource || 'Public nomination form'}
                                </div>
                              </div>
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

      {/* Bulk Action Bar */}
      {selectedSchools.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white rounded-lg px-6 py-4 shadow-2xl z-40">
          <div className="flex items-center gap-6">
            <div className="text-[14px] leading-[20px]">
              {selectedSchools.length} selected
            </div>
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 bg-[#FF8500] text-white rounded-lg text-[14px] hover:bg-[#E07600] transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Bulk Approve
            </button>
            <button
              onClick={handleBulkReject}
              className="px-4 py-2 bg-[#8C1D18] text-white rounded-lg text-[14px] hover:bg-[#6F1713] transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Bulk Reject
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

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                {actionModal.type.includes('approve') ? 'Approve Nomination(s)' : 'Reject Nomination(s)'}
              </h3>
              <button
                onClick={() => setActionModal(null)}
                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-[14px] leading-[20px] text-[#9E9E9E] mb-2">
                {actionModal.type.includes('approve') 
                  ? 'This will send interest invitation emails to:' 
                  : 'This will reject and archive:'}
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {actionModal.schools.map(school => (
                  <div key={school.id} className="text-[12px] leading-[16px] text-[#2B2B2B] py-1 px-2 bg-[#F2F1EE] rounded">
                    {school.name} - {school.lga}, {school.state}
                  </div>
                ))}
              </div>
            </div>

            {actionModal.type.includes('reject') && (
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
                    {REJECTION_REASONS.map(reason => (
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

            {actionModal.type.includes('approve') && (
              <div className="mb-4 p-3 bg-[#FFF7ED] rounded-lg">
                <div className="text-[12px] leading-[16px] text-[#F5A623] flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">Email will be sent</div>
                    <div>Schools will receive FORM-INT-01 School Interest Form link via email</div>
                  </div>
                </div>
              </div>
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
                disabled={actionModal.type.includes('reject') && !rejectionReason}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionModal.type.includes('approve')
                    ? 'bg-[#FF8500] hover:bg-[#E07600]'
                    : 'bg-[#8C1D18] hover:bg-[#6F1713] disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {actionModal.type.includes('approve') ? 'Approve & Send Email' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}