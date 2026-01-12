'use client'
import { useState } from 'react';

import { ArrowLeft, Calendar, Clock, Mail, MapPin, User, Edit, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function SchoolBookingDetail_Desktop() {
  //const { setScreen } = useScreen();
  const [activeTab, setActiveTab] = useState<'booking' | 'emails' | 'audit'>('booking');
  const [showManualBookModal, setShowManualBookModal] = useState(false);
  const [showChangeBookingModal, setShowChangeBookingModal] = useState(false);

  const emailLogs = [
    {
      id: '1',
      type: 'Booking Invitation',
      sentTo: 'principal@greenfield.edu.ng',
      sentAt: 'Jan 15, 2025 10:30 AM',
      status: 'Delivered',
      openedAt: 'Jan 15, 2025 2:45 PM'
    },
    {
      id: '2',
      type: 'Booking Confirmed',
      sentTo: 'principal@greenfield.edu.ng',
      sentAt: 'Jan 16, 2025 9:15 AM',
      status: 'Delivered',
      openedAt: 'Jan 16, 2025 9:20 AM'
    }
  ];

  const auditTrail = [
    {
      id: '1',
      action: 'Booking Confirmed',
      user: 'System (School)',
      timestamp: 'Jan 16, 2025 9:15 AM',
      details: 'School confirmed booking via magic link'
    },
    {
      id: '2',
      action: 'Booking Email Sent',
      user: 'System',
      timestamp: 'Jan 15, 2025 10:30 AM',
      details: 'Booking invitation email sent'
    },
    {
      id: '3',
      action: 'Added to Booking Scope',
      user: 'John Doe',
      timestamp: 'Jan 14, 2025 3:00 PM',
      details: 'School approved for campaign visit'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <button
       
        className="flex items-center gap-2 text-[#FF8500] hover:text-[#E67700] mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Booking Tracker</span>
      </button>

      <div className="mb-6">
        <h1 className="text-[#1F2937] mb-2">School Booking Detail</h1>
        <p className="text-[#4B5563]">Greenfield Primary School</p>
      </div>

      {/* School Info Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-[#1F2937] mb-1">Greenfield Primary School</h2>
            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
              <MapPin className="w-4 h-4" />
              Lagos State, Ikeja LGA • Lagos Central A
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm bg-[#D1FAE5] text-[#065F46]">
            <CheckCircle className="w-4 h-4" />
            Booked
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div>
            <div className="text-sm text-[#4B5563] mb-1">Contact Person</div>
            <div className="text-[#1F2937]">Mrs. Oluwaseun Adebayo</div>
          </div>
          <div>
            <div className="text-sm text-[#4B5563] mb-1">Email</div>
            <div className="text-[#1F2937]">principal@greenfield.edu.ng</div>
          </div>
          <div>
            <div className="text-sm text-[#4B5563] mb-1">Phone</div>
            <div className="text-[#1F2937]">+234 803 123 4567</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg">
        <div className="border-b border-[#E5E7EB] flex">
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-6 py-3 text-sm transition-colors ${
              activeTab === 'booking'
                ? 'text-[#FF8500] border-b-2 border-[#FF8500]'
                : 'text-[#4B5563] hover:text-[#1F2937]'
            }`}
          >
            Booking
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`px-6 py-3 text-sm transition-colors ${
              activeTab === 'emails'
                ? 'text-[#FF8500] border-b-2 border-[#FF8500]'
                : 'text-[#4B5563] hover:text-[#1F2937]'
            }`}
          >
            Email Log
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-3 text-sm transition-colors ${
              activeTab === 'audit'
                ? 'text-[#FF8500] border-b-2 border-[#FF8500]'
                : 'text-[#4B5563] hover:text-[#1F2937]'
            }`}
          >
            Audit Trail
          </button>
        </div>

        <div className="p-6">
          {/* Booking Tab */}
          {activeTab === 'booking' && (
            <div>
              {/* Current Booking */}
              <div className="mb-6">
                <h3 className="text-[#1F2937] mb-4">Current Booking</h3>
                
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-[#FF8500]" />
                      </div>
                      <div>
                        <div className="text-sm text-[#4B5563] mb-1">Visit Date</div>
                        <div className="text-[#1F2937]">Monday, January 20, 2025</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#FF8500]" />
                      </div>
                      <div>
                        <div className="text-sm text-[#4B5563] mb-1">Visit Time</div>
                        <div className="text-[#1F2937]">9:00 AM - 11:00 AM</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <div className="text-sm text-[#4B5563] mb-1">Booked At</div>
                    <div className="text-[#1F2937]">January 16, 2025 at 9:15 AM</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowChangeBookingModal(true)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-3"
                >
                  <Edit className="w-5 h-5 text-[#FF8500]" />
                  <div className="text-left">
                    <div className="text-[#1F2937]">Change Booking</div>
                    <div className="text-sm text-[#4B5563]">Modify the scheduled visit date/time</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-3">
                  <Send className="w-5 h-5 text-[#FF8500]" />
                  <div className="text-left">
                    <div className="text-[#1F2937]">Resend Confirmation Email</div>
                    <div className="text-sm text-[#4B5563]">Send booking details to school again</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowManualBookModal(true)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5 text-[#FF8500]" />
                  <div className="text-left">
                    <div className="text-[#1F2937]">Manually Book</div>
                    <div className="text-sm text-[#4B5563]">Create a booking without magic link</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Email Log Tab */}
          {activeTab === 'emails' && (
            <div>
              <h3 className="text-[#1F2937] mb-4">Email Communication History</h3>
              
              <div className="space-y-3">
                {emailLogs.map((email) => (
                  <div key={email.id} className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#FF8500] mt-0.5" />
                        <div>
                          <div className="text-[#1F2937] mb-1">{email.type}</div>
                          <div className="text-sm text-[#4B5563]">To: {email.sentTo}</div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-[#D1FAE5] text-[#065F46] rounded">
                        {email.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#4B5563]">Sent: </span>
                        <span className="text-[#1F2937]">{email.sentAt}</span>
                      </div>
                      <div>
                        <span className="text-[#4B5563]">Opened: </span>
                        <span className="text-[#1F2937]">{email.openedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Trail Tab */}
          {activeTab === 'audit' && (
            <div>
              <h3 className="text-[#1F2937] mb-4">Activity History</h3>
              
              <div className="space-y-3">
                {auditTrail.map((entry) => (
                  <div key={entry.id} className="border-l-2 border-[#FF8500] pl-4 py-2">
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-[#1F2937]">{entry.action}</div>
                      <div className="text-sm text-[#4B5563]">{entry.timestamp}</div>
                    </div>
                    <div className="text-sm text-[#4B5563] mb-1">{entry.details}</div>
                    <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                      <User className="w-3 h-3" />
                      {entry.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Manual Book Modal */}
      {showManualBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-lg p-6 max-w-[600px] w-full">
            <h2 className="text-[#1F2937] mb-4">Manually Book Visit</h2>
            
            <p className="text-sm text-[#4B5563] mb-6">
              Create a booking for this school without using the magic link system.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#FF8500] mb-1.5">Visit Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#FF8500] mb-1.5">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#FF8500] mb-1.5">End Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#FF8500] mb-1.5">Notes (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20 resize-none"
                  placeholder="Add any notes about this manual booking..."
                />
              </div>
            </div>

            <div className="bg-[#FFF7ED] border border-[#FFBC3A] rounded-lg p-3 mb-6">
              <p className="text-xs text-[#1F2937]">
                <strong>Note:</strong> A confirmation email will be sent to the school with the booking details.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowManualBookModal(false)}
                className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#4B5563] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowManualBookModal(false)}
                className="flex-1 px-6 py-3 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Booking Modal */}
      {showChangeBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-lg p-6 max-w-[600px] w-full">
            <h2 className="text-[#1F2937] mb-4">Change Booking</h2>
            
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-[#DC2626] mb-1"><strong>Important</strong></p>
                <p className="text-[#1F2937]">
                  Changing this booking will send an automated email to the school notifying them of the change.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#FF8500] mb-1.5">New Visit Date</label>
                <input
                  type="date"
                  defaultValue="2025-01-20"
                  className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#FF8500] mb-1.5">New Start Time</label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#FF8500] mb-1.5">New End Time</label>
                  <input
                    type="time"
                    defaultValue="11:00"
                    className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#FF8500] mb-1.5">Reason for Change</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-[#FF8500] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8500]/20 resize-none"
                  placeholder="Explain why the booking is being changed..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowChangeBookingModal(false)}
                className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#4B5563] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangeBookingModal(false)}
                className="flex-1 px-6 py-3 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors"
              >
                Update Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
