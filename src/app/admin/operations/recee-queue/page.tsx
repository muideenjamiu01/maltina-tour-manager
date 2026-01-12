'use client'
import { useState } from 'react';
import { Calendar, User, Send, Search, Filter, Download, Clock, MapPin } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus, School } from '../../week2-pipeline-data';

interface ScheduleModal {
  school: School;
}

const RECEE_OFFICERS = [
  { id: 'RO001', name: 'Adebayo Ogunlesi', capacity: 5, assigned: 3, available: 2 },
  { id: 'RO002', name: 'Chioma Nwosu', capacity: 5, assigned: 5, available: 0 },
  { id: 'RO003', name: 'Ibrahim Musa', capacity: 5, assigned: 2, available: 3 },
  { id: 'RO004', name: 'Amina Bello', capacity: 5, assigned: 4, available: 1 },
  { id: 'RO005', name: 'Tunde Adeyemi', capacity: 5, assigned: 1, available: 4 }
];

export default function RECEEQueue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleModal, setScheduleModal] = useState<ScheduleModal | null>(null);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const [scheduleForm, setScheduleForm] = useState({
    officerId: '',
    inspectionDate: '',
    inspectionTime: '09:00',
    notes: ''
  });

  const [filters, setFilters] = useState({
    state: '',
    priority: '', // 'urgent', 'normal'
    officerAvailability: false
  });

  // Get schools approved for RECEE
  const receeSchools = getSchoolsByStatus('Approved for RECEE');

  // Calculate days in current stage (mock)
  const getSchoolWithDays = (school: School) => ({
    ...school,
    daysInCurrentStage: Math.floor(Math.random() * 10) + 1
  });

  // Filter schools
  const filteredSchools = receeSchools
    .map(getSchoolWithDays)
    .filter(school => {
      if (searchQuery && !school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.state && school.state !== filters.state) {
        return false;
      }
      if (filters.officerAvailability) {
        const hasAvailableOfficer = RECEE_OFFICERS.some(o => o.available > 0);
        if (!hasAvailableOfficer) return false;
      }
      return true;
    });

  const handleSchedule = (school: School) => {
    setScheduleModal({ school });
    setScheduleForm({
      officerId: '',
      inspectionDate: '',
      inspectionTime: '09:00',
      notes: ''
    });
  };

  const confirmSchedule = () => {
    if (!scheduleModal) return;

    console.log('Scheduling RECEE:', {
      school: scheduleModal.school.id,
      ...scheduleForm
    });

    // Reset
    setScheduleModal(null);
    setScheduleForm({
      officerId: '',
      inspectionDate: '',
      inspectionTime: '09:00',
      notes: ''
    });
  };

  const handleBulkAssign = () => {
    console.log('Bulk assigning schools:', selectedSchools);
    // In production, open bulk assignment modal
  };

  const selectedOfficer = RECEE_OFFICERS.find(o => o.id === scheduleForm.officerId);

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
              <button
                onClick={handleBulkAssign}
                disabled={selectedSchools.length === 0}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg text-[14px] hover:bg-[#E09615] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Bulk Assign
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

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.officerAvailability}
                onChange={(e) => setFilters({ ...filters, officerAvailability: e.target.checked })}
                className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded"
              />
              <span className="text-[14px] text-[#2B2B2B]">Show only officers with capacity</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B] mb-1">
            RECEE Queue & Scheduling
          </h1>
          <p className="text-[14px] leading-[20px] text-[#9E9E9E]">
            Assign RECEE officers and schedule inspections
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              In Queue
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#F5A623]">
              {receeSchools.length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Total Officers
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {RECEE_OFFICERS.length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Available Officers
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2F6B3C]">
              {RECEE_OFFICERS.filter(o => o.available > 0).length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Total Capacity
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              {RECEE_OFFICERS.reduce((sum, o) => sum + o.available, 0)}
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              slots available
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
              Avg Wait Time
            </div>
            <div className="text-[24px] leading-[28px] font-bold text-[#2B2B2B]">
              3.2
            </div>
            <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
              days
            </div>
          </div>
        </div>

        {/* Officer Capacity Panel */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
            Officer Capacity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECEE_OFFICERS.map(officer => (
              <div
                key={officer.id}
                className={`p-4 rounded-lg border-2 ${
                  officer.available > 0
                    ? 'border-[#2F6B3C] bg-[#E8F5E9]'
                    : 'border-[#E5E7EB] bg-[#F2F1EE]'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[14px] leading-[20px] font-medium text-[#2B2B2B]">
                      {officer.name}
                    </div>
                    <div className="text-[12px] leading-[16px] text-[#9E9E9E]">
                      {officer.id}
                    </div>
                  </div>
                  {officer.available > 0 && (
                    <span className="px-2 py-1 bg-[#2F6B3C] text-white rounded text-[10px]">
                      AVAILABLE
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-[#9E9E9E]">Capacity:</span>
                    <span className="text-[#2B2B2B] font-medium">{officer.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9E9E]">Assigned:</span>
                    <span className="text-[#2B2B2B] font-medium">{officer.assigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9E9E9E]">Available:</span>
                    <span className={`font-medium ${officer.available > 0 ? 'text-[#2F6B3C]' : 'text-[#8C1D18]'}`}>
                      {officer.available}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schools Queue Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSchools(filteredSchools.map(s => s.id));
                        } else {
                          setSelectedSchools([]);
                        }
                      }}
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
                    Days in Queue
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#9E9E9E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr
                    key={school.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSchools.includes(school.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSchools([...selectedSchools, school.id]);
                          } else {
                            setSelectedSchools(selectedSchools.filter(id => id !== school.id));
                          }
                        }}
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
                        {school.daysInCurrentStage} days
                      </div>
                      {school.daysInCurrentStage > 5 && (
                        <div className="text-[10px] text-[#D4A017] flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          overdue
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] ${
                        school.daysInCurrentStage > 5
                          ? 'bg-[#FDE8E7] text-[#8C1D18]'
                          : 'bg-[#F2F1EE] text-[#9E9E9E]'
                      }`}>
                        {school.daysInCurrentStage > 5 ? 'URGENT' : 'NORMAL'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleSchedule(school)}
                        className="px-3 py-1.5 bg-[#F5A623] text-white rounded text-[12px] hover:bg-[#E09615] transition-colors"
                      >
                        Schedule RECEE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 border border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                Schedule RECEE Inspection
              </h3>
              <button
                onClick={() => setScheduleModal(null)}
                className="p-1 hover:bg-[#F2F1EE] rounded transition-colors"
              >
                ×
              </button>
            </div>

            {/* School Info */}
            <div className="mb-4 p-3 bg-[#F2F1EE] rounded-lg">
              <div className="text-[14px] leading-[20px] text-[#2B2B2B] font-medium mb-1">
                {scheduleModal.school.name}
              </div>
              <div className="text-[12px] leading-[16px] text-[#9E9E9E] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {scheduleModal.school.lga}, {scheduleModal.school.state}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  RECEE Officer *
                </label>
                <select
                  value={scheduleForm.officerId}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, officerId: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                >
                  <option value="">Select officer...</option>
                  {RECEE_OFFICERS.map(officer => (
                    <option key={officer.id} value={officer.id} disabled={officer.available === 0}>
                      {officer.name} - {officer.available > 0 ? `${officer.available} slots available` : 'No capacity'}
                    </option>
                  ))}
                </select>
                {selectedOfficer && (
                  <div className="mt-2 text-[10px] text-[#9E9E9E]">
                    Capacity: {selectedOfficer.assigned}/{selectedOfficer.capacity} assigned
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Inspection Date *
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.inspectionDate}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, inspectionDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                    Time
                  </label>
                  <select
                    value={scheduleForm.inspectionTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, inspectionTime: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] leading-[16px] font-medium text-[#9E9E9E] mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                  rows={3}
                  placeholder="Special instructions or notes for the officer..."
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                />
              </div>

              {/* Email notification info */}
              <div className="p-3 bg-[#FFF7ED] rounded-lg">
                <div className="text-[12px] leading-[16px] text-[#F5A623] flex items-start gap-2">
                  <Send className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">Email Notification</div>
                    <div>Officer will receive inspection assignment with FORM-REC-01 link and school details</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setScheduleModal(null)}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSchedule}
                disabled={!scheduleForm.officerId || !scheduleForm.inspectionDate}
                className="flex-1 px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule & Notify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
