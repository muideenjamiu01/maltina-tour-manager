"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock, Mail, Calendar, FileText, Shield } from 'lucide-react';

interface TimelineEvent {
  date: string;
  time: string;
  status: string;
  actor: string;
  action: string;
  reason?: string;
  note?: string;
}

interface CriteriaCheck {
  rule: string;
  result: 'pass' | 'fail';
  value?: string;
  threshold?: string;
}
type SystemRecommendation = 'approve' | 'reject';

export default function SchoolCaseFile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'timeline' | 'criteria' | 'recee' | 'communications'>('timeline');
  const [showOverrideModal, setShowOverrideModal] = useState(false);

  // Sample school data
  const school = {
    name: 'Victory High School',
    id: 'SCH-2025-0234',
    currentStatus: 'Rejected – Criteria',
    state: 'Lagos',
    lga: 'Surulere',
    address: '45 Herbert Macaulay Way, Surulere',
    type: 'Public Secondary',
    ownership: 'Government',
    capacity: 850,
    principalName: 'Mrs. Adesola Ogunlade',
    principalPhone: '+234 803 456 7890',
    principalEmail: 'principal@victoryhigh.edu.ng'
  };

  const timeline: TimelineEvent[] = [
    {
      date: '23 Dec 2025',
      time: '14:30',
      status: 'Rejected – Criteria',
      actor: 'System (Criteria Engine)',
      action: 'School automatically rejected',
      reason: 'Location not eligible',
      note: 'LGA not in approved list for Campaign 2025'
    },
    {
      date: '23 Dec 2025',
      time: '10:15',
      status: 'Interest Confirmed',
      actor: 'Mrs. A. Ogunlade (Principal)',
      action: 'Interest confirmed via email link'
    },
    {
      date: '22 Dec 2025',
      time: '16:45',
      status: 'Interest Confirmed',
      actor: 'System',
      action: 'Interest confirmation email sent'
    },
    {
      date: '20 Dec 2025',
      time: '11:20',
      status: 'Nominated',
      actor: 'T. Adebayo (Tour Manager)',
      action: 'School nominated for campaign'
    }
  ];

  const criteriaChecks: CriteriaCheck[] = [
    { rule: 'School Type', result: 'pass', value: 'Public Secondary', threshold: 'Public or Private Secondary' },
    { rule: 'Ownership', result: 'pass', value: 'Government', threshold: 'Government or Private' },
    { rule: 'Student Capacity', result: 'pass', value: '850', threshold: 'Minimum 500' },
    { rule: 'Location (LGA)', result: 'fail', value: 'Surulere', threshold: 'Approved LGAs only' },
    { rule: 'Infrastructure (Estimate)', result: 'pass', value: 'Adequate', threshold: 'Basic facilities required' }
  ];

  const communications = [
    { date: '22 Dec 2025', type: 'Email', subject: 'Interest Confirmation Invitation', status: 'Opened', recipient: 'Principal' },
    { date: '20 Dec 2025', type: 'SMS', subject: 'Nomination notification', status: 'Delivered', recipient: 'Principal' }
  ];

  const systemRecommendation: SystemRecommendation = 'reject'; // 'approve' or 'reject'

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'criteria', label: 'Criteria', icon: CheckCircle },
    { id: 'recee', label: 'RECEE', icon: FileText },
    { id: 'communications', label: 'Comms', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Mobile-First Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => router.push('/admin/tour/today-control-room')}
              className="flex items-center gap-2 text-[#F5A623] hover:text-[#E09615] mb-3"
            >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to List</span>
          </button>
          
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl text-[#2B2B2B] truncate">{school.name}</h1>
              <p className="text-sm text-[#9E9E9E]">{school.id}</p>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              school.currentStatus.includes('Rejected') ? 'bg-[#8C1D18] text-white' :
              school.currentStatus.includes('Approved') ? 'bg-[#2F6B3C] text-white' :
              'bg-[#D4A017] text-white'
            }`}>
              {school.currentStatus}
            </div>
          </div>
        </div>
      </div>

      {/* School Info Card */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6 mb-4">
          <h3 className="text-[#2B2B2B] mb-4">School Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-[#9E9E9E] mb-1">Location</div>
              <div className="text-[#2B2B2B]">{school.lga}, {school.state}</div>
              <div className="text-xs text-[#9E9E9E] mt-1">{school.address}</div>
            </div>
            <div>
              <div className="text-[#9E9E9E] mb-1">Type & Ownership</div>
              <div className="text-[#2B2B2B]">{school.type}</div>
              <div className="text-xs text-[#9E9E9E] mt-1">{school.ownership}</div>
            </div>
            <div>
              <div className="text-[#9E9E9E] mb-1">Capacity</div>
              <div className="text-[#2B2B2B]">{school.capacity} students</div>
            </div>
            <div>
              <div className="text-[#9E9E9E] mb-1">Principal</div>
              <div className="text-[#2B2B2B]">{school.principalName}</div>
              <div className="text-xs text-[#9E9E9E] mt-1">{school.principalPhone}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="flex border-b border-[#E5E7EB] overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#F5A623] border-b-2 border-[#F5A623] -mb-px'
                      : 'text-[#9E9E9E] hover:text-[#2B2B2B]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <h3 className="text-[#2B2B2B] mb-4">Status History</h3>
                {timeline.map((event, idx) => (
                  <div key={idx} className="relative pl-8 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {idx < timeline.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-[#E5E7EB]" />
                    )}
                    
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                      event.status.includes('Rejected') ? 'bg-[#8C1D18] border-[#8C1D18]' :
                      event.status.includes('Approved') || event.status.includes('Confirmed') ? 'bg-[#2F6B3C] border-[#2F6B3C]' :
                      'bg-[#D4A017] border-[#D4A017]'
                    }`} />

                    <div className="bg-[#F9FAFB] rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="text-sm text-[#2B2B2B]">{event.status}</div>
                        <div className="text-xs text-[#9E9E9E]">{event.date} • {event.time}</div>
                      </div>
                      
                      <div className="text-sm text-[#9E9E9E] mb-1">{event.action}</div>
                      <div className="text-xs text-[#9E9E9E]">By: {event.actor}</div>
                      
                      {event.reason && (
                        <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
                          <div className="text-xs text-[#9E9E9E] mb-1">Reason:</div>
                          <div className="text-sm text-[#8C1D18]">{event.reason}</div>
                        </div>
                      )}
                      
                      {event.note && (
                        <div className="mt-2 text-xs text-[#9E9E9E] italic">
                          Note: {event.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Criteria Tab */}
            {activeTab === 'criteria' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#2B2B2B]">Criteria Validation Results</h3>
                 {/* <div className={`px-3 py-1 rounded-full text-xs ${
                    systemRecommendation === 'approve' ? 'bg-[#2F6B3C] text-white' : 'bg-[#8C1D18] text-white'
                  }`}>
                    System: {systemRecommendation === 'approve' ? 'Approve' : 'Reject'}
                  </div> */}
                </div>

                <div className="space-y-3">
                  {criteriaChecks.map((check, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="text-sm text-[#2B2B2B] mb-1">{check.rule}</div>
                          <div className="text-xs text-[#9E9E9E]">
                            Required: {check.threshold}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {check.result === 'pass' ? (
                            <CheckCircle className="w-5 h-5 text-[#2F6B3C]" />
                          ) : (
                            <XCircle className="w-5 h-5 text-[#8C1D18]" />
                          )}
                          <span className={`text-sm ${check.result === 'pass' ? 'text-[#2F6B3C]' : 'text-[#8C1D18]'}`}>
                            {check.result === 'pass' ? 'Pass' : 'Fail'}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-[#2B2B2B]">
                        Actual: <strong>{check.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Override Action */}
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
                      <div className="text-sm text-[#2B2B2B]">
                        Tour Manager can override system recommendation. Override requires reason and will be audited.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOverrideModal(true)}
                    className="w-full px-4 py-3 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors"
                  >
                    Override Decision
                  </button>
                </div>
              </div>
            )}

            {/* RECEE Tab */}
            {activeTab === 'recee' && (
              <div className="text-center py-8 text-[#9E9E9E]">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>RECEE not yet scheduled for this school</p>
              </div>
            )}

            {/* Communications Tab */}
            {activeTab === 'communications' && (
              <div className="space-y-3">
                <h3 className="text-[#2B2B2B] mb-4">Communication Log</h3>
                {communications.map((comm, idx) => (
                  <div key={idx} className="bg-[#F9FAFB] rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#9E9E9E]" />
                        <div>
                          <div className="text-sm text-[#2B2B2B]">{comm.subject}</div>
                          <div className="text-xs text-[#9E9E9E]">To: {comm.recipient}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        comm.status === 'Opened' ? 'bg-[#2F6B3C] text-white' :
                        comm.status === 'Delivered' ? 'bg-[#D4A017] text-white' :
                        'bg-[#C7C7C7] text-white'
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#9E9E9E]">{comm.date} • {comm.type}</div>
                  </div>
                ))}
                
                <button className="w-full px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors mt-4">
                  Resend Interest Confirmation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg text-[#2B2B2B] mb-4">Override System Decision</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#2B2B2B] mb-2">New Decision *</label>
                <select className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <option value="approve">Approve for RECEE</option>
                  <option value="reject">Reject</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2B2B2B] mb-2">Reason *</label>
                <select className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <option value="">Select reason...</option>
                  <option value="exception">Strategic exception</option>
                  <option value="pilot">Pilot program inclusion</option>
                  <option value="correction">Data correction needed</option>
                  <option value="other">Other (specify below)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2B2B2B] mb-2">Notes *</label>
                <textarea
                  rows={3}
                  placeholder="Provide detailed justification for override..."
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-[#2B2B2B]">
                    This override will be logged with your name, timestamp, and reason. It will appear in audit reports.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowOverrideModal(false);
                  // Handle override
                }}
                className="flex-1 px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors"
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
