'use client'
import { useState } from 'react';
import { ArrowLeft, MapPin, Building, Users, Clock, AlertCircle, Check, X, Mail, Calendar, User, FileText, Download, ExternalLink, Phone, ChevronRight, Link, Copy, Trash2, Eye, Upload } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

type Tab = 'overview' | 'nomination' | 'interest' | 'recee' | 'booking' | 'cluster' | 'tour' | 'audit';

export default function SchoolProfile() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAssignOfficerModal, setShowAssignOfficerModal] = useState(false);

  // Mock school data
  const school = {
    id: 'SCH-001',
    name: "King's College Lagos",
    code: 'KCL-2025',
    state: 'Lagos',
    lga: 'Lagos Island',
    ward: 'Ward 5',
    address: "23 King's College Road, Lagos Island, Lagos State",
    type: 'Secondary',
    ownership: 'Public',
    stage: 'recee',
    status: 'Scheduled',
    daysInStage: 8,
    studentCount: 1250,
    classrooms: 45,
    stuck: false,
    
    // Nomination data
    nomination: {
      source: 'Public Portal',
      submittedDate: '2025-01-15',
      submittedTime: '14:23:45',
      nominator: {
        name: 'Mrs. Adeyemi Olufunke',
        role: 'Principal',
        email: 'principal@kingscollege.edu.ng',
        phone: '0801 234 5678'
      },
      schoolDetails: {
        principalName: 'Mrs. Adeyemi Olufunke',
        principalEmail: 'principal@kingscollege.edu.ng',
        principalPhone: '0801 234 5678',
        alternateContact: 'Mr. John Eze',
        alternatePhone: '0802 345 6789',
        studentPopulation: 1250,
        classrooms: 45,
        assemblyHall: 'Yes',
        spaceCapacity: 800
      },
      approvalStatus: 'approved',
      approvedBy: 'Chioma Okonkwo',
      approvedDate: '2025-01-16',
      possibleDuplicates: [
        {
          id: 'SCH-445',
          name: 'Kings College Lagos',
          address: '23 Kings College Rd, Lagos Island',
          matchScore: 92,
          status: 'active'
        },
        {
          id: 'SCH-789',
          name: "King's Secondary School Lagos",
          address: '45 Marina Street, Lagos',
          matchScore: 78,
          status: 'closed'
        }
      ]
    },

    // Interest data
    interest: {
      inviteSent: true,
      inviteDate: '2025-01-17 09:30:00',
      inviteLink: 'https://maltinatour.ng/interest/KCL2025',
      remindersSent: 2,
      reminders: [
        { date: '2025-01-19 10:00:00', sentBy: 'System Auto-Reminder' },
        { date: '2025-01-20 14:30:00', sentBy: 'Chioma Okonkwo' }
      ],
      lastReminderDate: '2025-01-20',
      formCompleted: true,
      completedDate: '2025-01-21',
      completedTime: '10:15:30',
      confirmedInterest: 'Yes',
      preferredDates: ['2025-03-15', '2025-03-20', '2025-03-25'],
      estimatedChildren: 750,
      additionalNotes: 'We have a large assembly hall and outdoor playground'
    },

    // RECEE data
    recee: {
      status: 'Scheduled',
      queuedDate: '2025-01-18',
      assignedOfficer: {
        name: 'Inspector John Okafor',
        id: 'INS-034',
        phone: '0803 456 7890',
        email: 'john.okafor@maltinatour.ng'
      },
      scheduledDate: '2025-01-25',
      scheduledTime: '10:00 AM',
      completedDate: null,
      outcome: null,
      formData: null,
      photos: [],
      attachments: [],
      notes: '',
      recommendations: null
    },

    // Booking data
    booking: {
      invited: false,
      inviteDate: null,
      inviteLink: null,
      bookingCompleted: false,
      selectedDate: null,
      selectedSlot: null,
      confirmedDate: null,
      reminders: []
    },

    // Cluster data
    cluster: {
      assigned: false,
      clusterId: null,
      clusterName: null,
      assignedDate: null,
      tourManager: null
    },

    // Tour data
    tour: {
      completed: true,
      tourDate: '2025-02-15',
      tourTime: '09:00 AM - 12:00 PM',
      status: 'Completed',
      
      // Tour Summary
      summary: {
        totalChildren: 856,
        maleChildren: 412,
        femaleChildren: 444,
        teachersPresent: 24,
        classroomsUsed: 8,
        duration: '3 hours',
        completedBy: 'Tour Manager: Adebayo Johnson',
        completedDate: '2025-02-15'
      },
      
      // Facilitators
      facilitators: [
        {
          id: 'FAC-001',
          name: 'Amaka Obi',
          role: 'Lead Facilitator',
          assigned: true,
          attendance: 'Present',
          rating: 4.8,
          childrenHandled: 214,
          feedback: 'Excellent engagement with students'
        },
        {
          id: 'FAC-002',
          name: 'Chinedu Eze',
          role: 'Co-Facilitator',
          assigned: true,
          attendance: 'Present',
          rating: 4.6,
          childrenHandled: 206,
          feedback: 'Great energy and enthusiasm'
        },
        {
          id: 'FAC-003',
          name: 'Funke Adeleke',
          role: 'Co-Facilitator',
          assigned: true,
          attendance: 'Present',
          rating: 4.9,
          childrenHandled: 218,
          feedback: 'Outstanding performance'
        },
        {
          id: 'FAC-004',
          name: 'Emeka Nwankwo',
          role: 'Support Facilitator',
          assigned: true,
          attendance: 'Absent',
          rating: null,
          childrenHandled: 0,
          feedback: 'Did not attend'
        }
      ],
      
      // Impact Survey
      impactSurvey: {
        preSurvey: {
          sent: 856,
          completed: 782,
          completionRate: 91.4,
          averageScore: 3.2
        },
        postSurvey: {
          sent: 856,
          completed: 745,
          completionRate: 87.0,
          averageScore: 4.6
        },
        improvement: 1.4
      },
      
      // Teacher Survey
      teacherSurvey: {
        sent: 24,
        completed: 22,
        completionRate: 91.7,
        averageRating: 4.7,
        feedback: [
          {
            teacher: 'Mrs. Adeyemi',
            rating: 5.0,
            comment: 'Excellent program, students were very engaged'
          },
          {
            teacher: 'Mr. Okafor',
            rating: 4.5,
            comment: 'Great initiative, would love to have this again'
          }
        ]
      },
      
      // Tour Analyst
      analyst: {
        assigned: true,
        analystName: 'Dr. Bola Tinubu',
        analystId: 'ANL-012',
        reportCompleted: true,
        reportDate: '2025-02-16',
        reportScore: 8.5,
        recommendations: 'School has excellent facilities and enthusiastic staff. Recommend for future programs.',
        attachments: ['tour_report_KCL_2025.pdf', 'photos_tour_day.zip']
      }
    }
  };

  const timeline = [
    { stage: 'nomination', label: 'Nomination', status: 'completed', date: '2025-01-15' },
    { stage: 'interest', label: 'Interest', status: 'completed', date: '2025-01-21' },
    { stage: 'recee', label: 'RECEE', status: 'active', date: '2025-01-25' },
    { stage: 'booking', label: 'Booking', status: 'pending', date: null },
    { stage: 'tour', label: 'Tour', status: 'pending', date: null }
  ];

  const auditLog = [
    { date: '2025-01-21 10:15', user: 'System', action: 'Interest form completed by school', type: 'system' },
    { date: '2025-01-20 14:30', user: 'Chioma Okonkwo', action: 'Sent interest reminder email', type: 'email' },
    { date: '2025-01-18 09:00', user: 'Emeka Nwankwo', action: 'Assigned RECEE officer: John Okafor', type: 'action' },
    { date: '2025-01-17 11:20', user: 'System', action: 'Interest invitation email sent', type: 'email' },
    { date: '2025-01-16 15:45', user: 'Chioma Okonkwo', action: 'Approved nomination', type: 'action' },
    { date: '2025-01-15 14:23', user: 'System', action: 'Nomination received from public portal', type: 'system' }
  ];

  const getStageColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-[#FF8500] text-white',
      active: 'bg-[#FFBC3A] text-white',
      pending: 'bg-[#E5E7EB] text-[#9E9E9E]'
    };
    return colors[status] || 'bg-[#E5E7EB] text-[#9E9E9E]';
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="School Profile"
        subtitle={school.name}
        screenCode="OPS-SCH02"
        actions={
          <a
            href="/ops-sch01"
            className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </a>
        }
      />

      <div className="w-[1440px] mx-auto px-8 py-6">
        {/* Header Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[20px] leading-[28px] font-semibold text-[#2B2B2B]">
                  {school.name}
                </h2>
                {school.stuck && (
                  <span className="px-3 py-1 bg-[#FDE8E7] text-[#8C1D18] rounded text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    STUCK - {school.daysInStage} days
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-[13px] text-[#9E9E9E] mb-3">
                <span className="font-mono">{school.code}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {school.state}, {school.lga}, {school.ward}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {school.type} · {school.ownership}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {school.studentCount.toLocaleString()} students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded text-[11px] ${
                  school.stage === 'nomination' ? 'bg-[#FEF3E2] text-[#FF8500]' :
                  school.stage === 'interest' ? 'bg-[#FEF3E2] text-[#FFBC3A]' :
                  school.stage === 'recee' ? 'bg-[#FEF3E2] text-[#FF8500]' :
                  school.stage === 'booking' ? 'bg-[#FEF3E2] text-[#FF8500]' :
                  'bg-[#E5E7EB] text-[#9E9E9E]'
                }`}>
                  {school.stage.toUpperCase()} - {school.status}
                </span>
                <span className="text-[11px] text-[#9E9E9E] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {school.daysInStage} days in stage
                </span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex items-center gap-2">
              {school.stage === 'recee' && school.status === 'Scheduled' && (
                <>
                  <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07700] transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Approve for Tour
                  </button>
                  <button className="px-4 py-2 border border-[#8C1D18] text-[#8C1D18] rounded-lg hover:bg-[#FDE8E7] transition-colors flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB] flex">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'nomination', label: 'Nomination' },
              { id: 'interest', label: 'Interest' },
              { id: 'recee', label: 'RECEE' },
              { id: 'booking', label: 'Booking' },
              { id: 'cluster', label: 'Cluster' },
              { id: 'tour', label: 'Tour' },
              { id: 'audit', label: 'History' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-6 py-3 text-[13px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#FFBC3A] border-b-2 border-[#FFBC3A] bg-[#FEF3E2]'
                    : 'text-[#9E9E9E] hover:text-[#2B2B2B] hover:bg-[#F9FAFB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Pipeline Section */}
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                    Pipeline
                  </h3>
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      {timeline.map((item, idx) => (
                        <div key={item.stage} className="flex items-center">
                          <div className="text-center">
                            <div className={`px-6 py-3 rounded-lg ${
                              item.status === 'completed' ? 'bg-[#FEF3E2] text-[#FF8500]' :
                              item.status === 'active' ? 'bg-[#FEF3E2] text-[#FFBC3A]' :
                              'bg-[#E5E7EB] text-[#9E9E9E]'
                            }`}>
                              <div className="font-semibold text-[14px] mb-1">{item.label}</div>
                              <div className="text-[11px]">
                                {item.status === 'completed' && '(Completed)'}
                                {item.status === 'active' && '(In Progress)'}
                                {item.status === 'pending' && ''}
                              </div>
                            </div>
                          </div>
                          {idx < timeline.length - 1 && (
                            <div className="mx-4">
                              <ChevronRight className="w-5 h-5 text-[#C7C7C7]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* At-a-Glance Section */}
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">
                    At-a-glance
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Nomination Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">Nomination</h4>
                      <div className="space-y-3 text-[14px] leading-[20px]">
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Source:</div>
                          <div className="text-[#2B2B2B]">{school.nomination.source}</div>
                        </div>
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Date:</div>
                          <div className="text-[#2B2B2B]">{school.nomination.submittedDate}</div>
                        </div>
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Nominator:</div>
                          <div className="text-[#2B2B2B]">{school.nomination.nominator.name}</div>
                        </div>
                      </div>
                    </div>

                    {/* Interest Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">Interest</h4>
                      <div className="space-y-3 text-[14px] leading-[20px]">
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Email Sent:</div>
                          <div className="text-[#2B2B2B]">Yes</div>
                        </div>
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Form Completed:</div>
                          <div className="text-[#2B2B2B]">Yes</div>
                        </div>
                      </div>
                    </div>

                    {/* Next Action Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">Next Action</h4>
                      <button className="w-full px-6 py-3 bg-[#FFBC3A] text-white rounded-lg hover:bg-[#E09612] transition-colors font-medium text-[14px] leading-[20px] mb-3">
                        Schedule Recee
                      </button>
                      <div className="text-[14px] leading-[20px]">
                        <div className="text-[#9E9E9E] mb-1">Due:</div>
                        <div className="text-[#2B2B2B]">Today</div>
                      </div>
                    </div>

                    {/* Interest Row 2 Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">Interest</h4>
                      <div className="space-y-3 text-[14px] leading-[20px]">
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Email Sent:</div>
                          <div className="text-[#2B2B2B]">Yes</div>
                        </div>
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Form Completed:</div>
                          <div className="text-[#2B2B2B]">Yes</div>
                        </div>
                      </div>
                    </div>

                    {/* Recee Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
                      <h4 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-4">Recee</h4>
                      <div className="space-y-3 text-[14px] leading-[20px]">
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Scheduled:</div>
                          <div className="text-[#2B2B2B]">Yes</div>
                        </div>
                        <div>
                          <div className="text-[#9E9E9E] mb-1">Officer:</div>
                          <div className="text-[#2B2B2B]">{school.recee.assignedOfficer.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Nomination Tab */}
            {activeTab === 'nomination' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      Nomination Details
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      Submitted via {school.nomination.source} on {school.nomination.submittedDate}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#FEF3E2] text-[#FF8500] rounded text-[11px]">
                    APPROVED
                  </span>
                </div>

                {/* Possible Duplicates Panel */}
                {school.nomination.possibleDuplicates.length > 0 && (
                  <div className="bg-[#FEF3E2] border border-[#FFBC3A]/20 rounded-lg p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="w-5 h-5 text-[#FFBC3A] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-1">
                          Possible Duplicate Schools Found
                        </h4>
                        <p className="text-[12px] text-[#9E9E9E]">
                          Similar schools detected. Review and take action to avoid duplicates.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {school.nomination.possibleDuplicates.map((duplicate) => (
                        <div key={duplicate.id} className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="text-[13px] font-medium text-[#2B2B2B]">
                                  {duplicate.name}
                                </h5>
                                <span className={`px-2 py-0.5 rounded text-[10px] ${
                                  duplicate.matchScore >= 90 ? 'bg-[#FDE8E7] text-[#8C1D18]' :
                                  duplicate.matchScore >= 75 ? 'bg-[#FEF3E2] text-[#FFBC3A]' :
                                  'bg-[#F2F1EE] text-[#9E9E9E]'
                                }`}>
                                  {duplicate.matchScore}% match
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                                  duplicate.status === 'active' ? 'bg-[#FEF3E2] text-[#FF8500]' :
                                  'bg-[#E5E7EB] text-[#9E9E9E]'
                                }`}>
                                  {duplicate.status}
                                </span>
                              </div>
                              <div className="text-[12px] text-[#9E9E9E] mb-1">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {duplicate.address}
                              </div>
                              <div className="text-[11px] text-[#9E9E9E] font-mono">
                                ID: {duplicate.id}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-[#FFBC3A] text-white rounded text-[11px] hover:bg-[#E09612] transition-colors">
                              Merge Records
                            </button>
                            <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] rounded text-[11px] hover:bg-[#F2F1EE] transition-colors">
                              Link Schools
                            </button>
                            <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#9E9E9E] rounded text-[11px] hover:bg-[#F2F1EE] transition-colors">
                              Ignore
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* School Information */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">School Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Principal Name</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.principalName}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Principal Email</div>
                      <div className="text-[13px] text-[#2B2B2B] flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {school.nomination.schoolDetails.principalEmail}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Principal Phone</div>
                      <div className="text-[13px] text-[#2B2B2B] flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {school.nomination.schoolDetails.principalPhone}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Alternate Contact</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.alternateContact}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Student Population</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.studentPopulation.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Classrooms</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.classrooms}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Assembly Hall</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.assemblyHall}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Space Capacity</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.schoolDetails.spaceCapacity} children</div>
                    </div>
                  </div>
                </div>

                {/* Nominator Information */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Nominator Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Name</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.nominator.name}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Role</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.nominator.role}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Email</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.nominator.email}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Phone</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.nomination.nominator.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Approval Information */}
                <div className="bg-[#FEF3E2] border border-[#FF8500]/20 rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#FF8500] mb-3">Approval Record</h4>
                  <div className="grid grid-cols-3 gap-4 text-[13px]">
                    <div>
                      <div className="text-[11px] text-[#FF8500]/70 mb-1">Approved By</div>
                      <div className="text-[#2B2B2B]">{school.nomination.approvedBy}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#FF8500]/70 mb-1">Approval Date</div>
                      <div className="text-[#2B2B2B]">{school.nomination.approvedDate}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#FF8500]/70 mb-1">Status</div>
                      <div className="text-[#FF8500] font-medium">Approved</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07700] transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Approve Nomination
                  </button>
                  <button className="px-4 py-2 border border-[#8C1D18] text-[#8C1D18] rounded-lg hover:bg-[#FDE8E7] transition-colors flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Reject Nomination
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Reply to Nominator
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Email Log
                  </button>
                </div>
              </div>
            )}

            {/* Interest Tab */}
            {activeTab === 'interest' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      Interest Confirmation
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      Track school's interest confirmation process
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#FEF3E2] text-[#FF8500] rounded text-[11px]">
                    COMPLETED
                  </span>
                </div>

                {/* Interest Form Link */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[14px] font-semibold text-[#2B2B2B]">Interest Form Link</h4>
                    <span className="px-2 py-1 bg-[#FEF3E2] text-[#FF8500] rounded text-[10px]">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#F2F1EE] px-4 py-3 rounded-lg">
                      <code className="text-[12px] text-[#2B2B2B] font-mono">
                        {school.interest.inviteLink}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyLink(school.interest.inviteLink)}
                      className="px-4 py-3 bg-[#FFBC3A] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button className="px-4 py-3 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Activity History</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FEF3E2] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#FF8500]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] text-[#2B2B2B] mb-1">Form Completed</div>
                        <div className="text-[11px] text-[#9E9E9E]">
                          {school.interest.completedDate} at {school.interest.completedTime}
                        </div>
                      </div>
                    </div>
                    {school.interest.reminders.map((reminder, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-8 h-8 bg-[#FEF3E2] rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-[#FFBC3A]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] text-[#2B2B2B] mb-1">Reminder Sent</div>
                          <div className="text-[11px] text-[#9E9E9E]">
                            {reminder.date} • Sent by: {reminder.sentBy}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FEF3E2] rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-[#FFBC3A]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] text-[#2B2B2B] mb-1">Invitation Sent</div>
                        <div className="text-[11px] text-[#9E9E9E]">
                          {school.interest.inviteDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Responses */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Form Responses</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Confirmed Interest</div>
                      <div className="text-[13px] text-[#FF8500] font-medium">{school.interest.confirmedInterest}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Estimated Children</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.interest.estimatedChildren}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Preferred Tour Dates</div>
                      <div className="flex gap-2 mt-1">
                        {school.interest.preferredDates.map((date, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#F2F1EE] text-[#2B2B2B] rounded text-[12px]">
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Additional Notes</div>
                      <div className="text-[13px] text-[#2B2B2B]">{school.interest.additionalNotes}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#FFBC3A] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Invite
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Reminder
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Mark Exception
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Email Log
                  </button>
                </div>
              </div>
            )}

            {/* RECEE Tab */}
            {activeTab === 'recee' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      RECEE Inspection
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      School reconnaissance and validation
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#FEF3E2] text-[#FFBC3A] rounded text-[11px]">
                    SCHEDULED
                  </span>
                </div>

                {/* Schedule Info */}
                <div className="bg-[#FEF3E2] border border-[#FFBC3A]/20 rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Scheduled Inspection</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Inspector</div>
                      <div className="text-[13px] text-[#2B2B2B] font-medium">
                        {school.recee.assignedOfficer.name}
                      </div>
                      <div className="text-[11px] text-[#9E9E9E]">{school.recee.assignedOfficer.id}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Date</div>
                      <div className="text-[13px] text-[#2B2B2B] font-medium">{school.recee.scheduledDate}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Time</div>
                      <div className="text-[13px] text-[#2B2B2B] font-medium">{school.recee.scheduledTime}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07700] transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Approve for Tour
                  </button>
                  <button className="px-4 py-2 border border-[#8C1D18] text-[#8C1D18] rounded-lg hover:bg-[#FDE8E7] transition-colors flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Reject After RECEE
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Reschedule
                  </button>
                </div>
              </div>
            )}

            {/* Booking Tab */}
            {activeTab === 'booking' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      Booking Management
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      School tour date and time booking
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#E5E7EB] text-[#9E9E9E] rounded text-[11px]">
                    NOT STARTED
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-lg p-8 text-center">
                  <Calendar className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[14px] text-[#9E9E9E] mb-4">
                    Booking process will start after RECEE approval
                  </p>
                </div>
              </div>
            )}

            {/* Cluster Tab */}
            {activeTab === 'cluster' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      Cluster
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      Geographic clustering for tour logistics
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#E5E7EB] text-[#9E9E9E] rounded text-[11px]">
                    NOT ASSIGNED
                  </span>
                </div>

                <div className="border border-[#E5E7EB] rounded-lg p-8 text-center">
                  <MapPin className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[14px] text-[#9E9E9E] mb-4">
                    School will be assigned to a cluster after booking confirmation
                  </p>
                </div>
              </div>
            )}

            {/* Tour Tab */}
            {activeTab === 'tour' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                      Tour Execution
                    </h3>
                    <p className="text-[13px] text-[#9E9E9E]">
                      Complete tour information and results for {school.name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-[11px] ${
                    school.tour.completed 
                      ? 'bg-[#FEF3E2] text-[#FF8500]' 
                      : 'bg-[#E5E7EB] text-[#9E9E9E]'
                  }`}>
                    {school.tour.status.toUpperCase()}
                  </span>
                </div>

                {/* Tour Summary */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Tour Summary</h4>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-[#F2F1EE] p-4 rounded-lg">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Total Children</div>
                      <div className="text-[24px] leading-[32px] font-semibold text-[#2B2B2B]">
                        {school.tour.summary.totalChildren.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#FEF3E2] p-4 rounded-lg">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Male Children</div>
                      <div className="text-[24px] leading-[32px] font-semibold text-[#FF8500]">
                        {school.tour.summary.maleChildren.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#FEF3E2] p-4 rounded-lg">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Female Children</div>
                      <div className="text-[24px] leading-[32px] font-semibold text-[#FFBC3A]">
                        {school.tour.summary.femaleChildren.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#FEF3E2] p-4 rounded-lg">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Teachers Present</div>
                      <div className="text-[24px] leading-[32px] font-semibold text-[#FF8500]">
                        {school.tour.summary.teachersPresent}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Tour Date</div>
                      <div className="text-[#2B2B2B] font-medium">{school.tour.tourDate}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Tour Time</div>
                      <div className="text-[#2B2B2B] font-medium">{school.tour.tourTime}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Classrooms Used</div>
                      <div className="text-[#2B2B2B]">{school.tour.summary.classroomsUsed}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Duration</div>
                      <div className="text-[#2B2B2B]">{school.tour.summary.duration}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Completed By</div>
                      <div className="text-[#2B2B2B]">{school.tour.summary.completedBy}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Completed Date</div>
                      <div className="text-[#2B2B2B]">{school.tour.summary.completedDate}</div>
                    </div>
                  </div>
                </div>

                {/* Facilitators */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Facilitators</h4>
                  <div className="space-y-3">
                    {school.tour.facilitators.map((facilitator) => (
                      <div 
                        key={facilitator.id} 
                        className={`border rounded-lg p-4 ${
                          facilitator.attendance === 'Present' 
                            ? 'border-[#E5E7EB] bg-white' 
                            : 'border-[#FDE8E7] bg-[#FDE8E7]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h5 className="text-[13px] font-medium text-[#2B2B2B]">
                                {facilitator.name}
                              </h5>
                              <span className="px-2 py-0.5 bg-[#F2F1EE] text-[#9E9E9E] rounded text-[10px]">
                                {facilitator.role}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] ${
                                facilitator.attendance === 'Present'
                                  ? 'bg-[#FEF3E2] text-[#FF8500]'
                                  : 'bg-[#FDE8E7] text-[#8C1D18]'
                              }`}>
                                {facilitator.attendance}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#9E9E9E] font-mono mb-2">
                              {facilitator.id}
                            </div>
                          </div>
                          {facilitator.rating && (
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-[#FFBC3A] mb-1">
                                <span className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B]">
                                  {facilitator.rating.toFixed(1)}
                                </span>
                                <span className="text-[20px]">★</span>
                              </div>
                              <div className="text-[10px] text-[#9E9E9E]">Rating</div>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[12px]">
                          <div>
                            <div className="text-[#9E9E9E] mb-0.5">Children Handled</div>
                            <div className="text-[#2B2B2B] font-medium">
                              {facilitator.childrenHandled.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#9E9E9E] mb-0.5">Feedback</div>
                            <div className="text-[#2B2B2B]">{facilitator.feedback}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB] grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Total Assigned</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {school.tour.facilitators.length}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Present</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#FF8500]">
                        {school.tour.facilitators.filter(f => f.attendance === 'Present').length}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Average Rating</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#FFBC3A]">
                        {(school.tour.facilitators
                          .filter(f => f.rating !== null)
                          .reduce((sum, f) => sum + (f.rating || 0), 0) / 
                          school.tour.facilitators.filter(f => f.rating !== null).length
                        ).toFixed(1)} ★
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Survey */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Impact Survey</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Pre-Survey */}
                    <div className="bg-[#F2F1EE] rounded-lg p-4">
                      <h5 className="text-[13px] font-medium text-[#2B2B2B] mb-3">Pre-Survey</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Sent</span>
                          <span className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.impactSurvey.preSurvey.sent.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Completed</span>
                          <span className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.impactSurvey.preSurvey.completed.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Completion Rate</span>
                          <span className="text-[13px] text-[#FF8500] font-semibold">
                            {school.tour.impactSurvey.preSurvey.completionRate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Average Score</span>
                          <span className="text-[16px] leading-[24px] text-[#2B2B2B] font-semibold">
                            {school.tour.impactSurvey.preSurvey.averageScore.toFixed(1)} / 5.0
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post-Survey */}
                    <div className="bg-[#FEF3E2] rounded-lg p-4">
                      <h5 className="text-[13px] font-medium text-[#2B2B2B] mb-3">Post-Survey</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Sent</span>
                          <span className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.impactSurvey.postSurvey.sent.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Completed</span>
                          <span className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.impactSurvey.postSurvey.completed.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Completion Rate</span>
                          <span className="text-[13px] text-[#FF8500] font-semibold">
                            {school.tour.impactSurvey.postSurvey.completionRate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9E9E9E]">Average Score</span>
                          <span className="text-[16px] leading-[24px] text-[#FF8500] font-semibold">
                            {school.tour.impactSurvey.postSurvey.averageScore.toFixed(1)} / 5.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Improvement Indicator */}
                  <div className="mt-4 bg-[#FEF3E2] border border-[#FF8500]/20 rounded-lg p-4 text-center">
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Score Improvement</div>
                    <div className="text-[24px] leading-[32px] font-semibold text-[#FF8500]">
                      +{school.tour.impactSurvey.improvement.toFixed(1)} points
                    </div>
                    <div className="text-[12px] text-[#9E9E9E] mt-1">
                      {((school.tour.impactSurvey.improvement / school.tour.impactSurvey.preSurvey.averageScore) * 100).toFixed(0)}% increase
                    </div>
                  </div>
                </div>

                {/* Teacher Survey */}
                <div className="border border-[#E5E7EB] rounded-lg p-5">
                  <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-4">Teacher Survey</h4>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Sent</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#2B2B2B]">
                        {school.tour.teacherSurvey.sent}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Completed</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#FF8500]">
                        {school.tour.teacherSurvey.completed}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Completion Rate</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#FF8500]">
                        {school.tour.teacherSurvey.completionRate.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] text-[#9E9E9E] mb-1">Average Rating</div>
                      <div className="text-[18px] leading-[24px] font-semibold text-[#FFBC3A]">
                        {school.tour.teacherSurvey.averageRating.toFixed(1)} ★
                      </div>
                    </div>
                  </div>

                  {/* Teacher Feedback */}
                  <div className="space-y-3">
                    <h5 className="text-[12px] font-medium text-[#9E9E9E] uppercase">Sample Feedback</h5>
                    {school.tour.teacherSurvey.feedback.map((item, idx) => (
                      <div key={idx} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-medium text-[#2B2B2B]">{item.teacher}</span>
                          <span className="text-[14px] text-[#FFBC3A]">{item.rating.toFixed(1)} ★</span>
                        </div>
                        <p className="text-[12px] text-[#9E9E9E] italic">"{item.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tour Analyst */}
                <div className={`border rounded-lg p-5 ${
                  school.tour.analyst.reportCompleted 
                    ? 'border-[#FF8500]/20 bg-[#FEF3E2]/30' 
                    : 'border-[#FDE8E7] bg-[#FDE8E7]/30'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#2B2B2B] mb-1">Tour Analyst Report</h4>
                      <p className="text-[11px] text-[#9E9E9E]">
                        Post-tour analysis and recommendations
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded text-[11px] ${
                      school.tour.analyst.reportCompleted
                        ? 'bg-[#FEF3E2] text-[#FF8500]'
                        : 'bg-[#FDE8E7] text-[#8C1D18]'
                    }`}>
                      {school.tour.analyst.reportCompleted ? 'COMPLETED' : 'PENDING'}
                    </span>
                  </div>

                  {school.tour.analyst.reportCompleted ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-[11px] text-[#9E9E9E] mb-1">Analyst</div>
                          <div className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.analyst.analystName}
                          </div>
                          <div className="text-[11px] text-[#9E9E9E] font-mono">
                            {school.tour.analyst.analystId}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-[#9E9E9E] mb-1">Report Date</div>
                          <div className="text-[13px] text-[#2B2B2B] font-medium">
                            {school.tour.analyst.reportDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-[#9E9E9E] mb-1">Report Score</div>
                          <div className="text-[20px] leading-[28px] font-semibold text-[#FF8500]">
                            {school.tour.analyst.reportScore.toFixed(1)} / 10
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-[11px] text-[#9E9E9E] mb-2">Recommendations</div>
                        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 text-[13px] text-[#2B2B2B]">
                          {school.tour.analyst.recommendations}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] text-[#9E9E9E] mb-2">Attachments</div>
                        <div className="flex gap-2">
                          {school.tour.analyst.attachments.map((file, idx) => (
                            <button
                              key={idx}
                              className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[11px] text-[#2B2B2B] hover:bg-[#F2F1EE] transition-colors flex items-center gap-2"
                            >
                              <Download className="w-3 h-3" />
                              {file}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <FileText className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                      <p className="text-[13px] text-[#9E9E9E]">
                        Analyst report pending completion
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Tour Report
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Full Analytics
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Summary
                  </button>
                </div>
              </div>
            )}

            {/* Audit Log Tab */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold text-[#2B2B2B] mb-1">
                    History
                  </h3>
                  <p className="text-[13px] text-[#9E9E9E] mb-4">
                    Complete history of all actions and events
                  </p>
                </div>

                <div className="border border-[#E5E7EB] rounded-lg">
                  {auditLog.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`p-4 flex gap-4 ${idx !== auditLog.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        entry.type === 'system' ? 'bg-[#E5E7EB]' :
                        entry.type === 'email' ? 'bg-[#FEF3E2]' :
                        'bg-[#FEF3E2]'
                      }`}>
                        {entry.type === 'system' && <Clock className="w-4 h-4 text-[#9E9E9E]" />}
                        {entry.type === 'email' && <Mail className="w-4 h-4 text-[#FFBC3A]" />}
                        {entry.type === 'action' && <User className="w-4 h-4 text-[#FF8500]" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] text-[#2B2B2B] mb-1">{entry.action}</div>
                        <div className="text-[11px] text-[#9E9E9E]">
                          {entry.date} • {entry.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}