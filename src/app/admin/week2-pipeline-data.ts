// WEEK 2 LOCKED STATUS CONTRACT (18 STATES - NON-NEGOTIABLE)
export type SchoolStatus =
  | 'In Database (Unnominated)'
  | 'Nominated'
  | 'Rejected – Nomination'
  | 'Interest Requested (Invite Sent)'
  | 'Interest Confirmed'
  | 'Rejected – Criteria'
  | 'Approved for RECEE'
  | 'RECEE Scheduled'
  | 'RECEE Completed – Passed'
  | 'RECEE Completed – Failed'
  | 'Approved for Tour'
  | 'Clustered (Assigned to Cluster)'
  | 'Booking Setup Complete (Dates/Slots Ready)'
  | 'Booking Open (Link Sent)'
  | 'Booked'
  | 'Ready for Tour'
  | 'Cancelled';

// LOCKED REJECTION REASONS (ENUMS)
export const REJECTION_REASONS = {
  'Rejected – Nomination': [
    'Duplicate school',
    'Invalid or incomplete data',
    'Outside campaign scope',
    'Other'
  ],
  'Rejected – Criteria': [
    'School type not eligible',
    'Location not eligible',
    'Capacity below threshold',
    'Ownership not eligible',
    'Other'
  ],
  'RECEE Completed – Failed': [
    'Infrastructure unsuitable',
    'Safety concerns',
    'Access constraints',
    'Other'
  ]
} as const;

// SCHOOL DATA INTERFACE
export interface School {
  id: string;
  name: string;
  state: string;
  lga: string;
  type: 'Public' | 'Private';
  ownership: 'Government' | 'Private' | 'Mission';
  capacity: number;
  status: SchoolStatus;
  
  // Metadata
  nominatedBy?: string;
  nominatedDate?: string;
  lastUpdate: string;
  
  // Decision tracking
  decisions: Decision[];
  
  // Cluster assignment
  clusterId?: string;
  clusterName?: string;
  
  // Booking data
  bookingDate?: string;
  bookingSlot?: string;
  bookingConfirmedDate?: string;
  
  // RECEE data
  receeOfficer?: string;
  receeScheduledDate?: string;
  receeCompletedDate?: string;
  
  // Criteria validation
  criteriaResults?: CriteriaResult[];
  
  // Communication log
  emailEvents: EmailEvent[];
}

export interface Decision {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  fromStatus?: SchoolStatus;
  toStatus: SchoolStatus;
  reason?: string;
  note?: string;
}

export interface CriteriaResult {
  rule: string;
  result: 'Pass' | 'Fail';
  details?: string;
}

export interface EmailEvent {
  id: string;
  timestamp: string;
  channel: 'Email' | 'SMS';
  recipient: string;
  template: string;
  status: 'Queued' | 'Sent' | 'Failed';
  subject?: string;
}

// SAMPLE DATA - 20 SCHOOLS COVERING ALL 18 STATES
export const SCHOOLS: School[] = [
  // 1. In Database (Unnominated)
  {
    id: 'SCH001',
    name: 'Greenfield Secondary School',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Public',
    ownership: 'Government',
    capacity: 850,
    status: 'In Database (Unnominated)',
    lastUpdate: '2025-12-10T08:00:00Z',
    decisions: [],
    emailEvents: []
  },
  
  // 2. Nominated (awaiting decision)
  {
    id: 'SCH002',
    name: 'St. Augustine College',
    state: 'Lagos',
    lga: 'Surulere',
    type: 'Private',
    ownership: 'Mission',
    capacity: 720,
    status: 'Nominated',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-14T10:30:00Z',
    lastUpdate: '2025-12-14T10:30:00Z',
    decisions: [
      {
        id: 'D001',
        timestamp: '2025-12-14T10:30:00Z',
        actor: 'T. Adebayo',
        action: 'Nominated school for campaign',
        toStatus: 'Nominated'
      }
    ],
    emailEvents: [
      {
        id: 'E001',
        timestamp: '2025-12-14T10:31:00Z',
        channel: 'Email',
        recipient: 'principal@staugustine.edu.ng',
        template: 'Nomination Received',
        status: 'Sent',
        subject: 'Your school has been nominated for Maltina Tour'
      }
    ]
  },
  
  // 3. Rejected – Nomination (duplicate)
  {
    id: 'SCH003',
    name: 'Unity Secondary School',
    state: 'Ogun',
    lga: 'Abeokuta South',
    type: 'Public',
    ownership: 'Government',
    capacity: 650,
    status: 'Rejected – Nomination',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-12T14:00:00Z',
    lastUpdate: '2025-12-13T09:15:00Z',
    decisions: [
      {
        id: 'D002',
        timestamp: '2025-12-12T14:00:00Z',
        actor: 'C. Okafor',
        action: 'Nominated school',
        toStatus: 'Nominated'
      },
      {
        id: 'D003',
        timestamp: '2025-12-13T09:15:00Z',
        actor: 'T. Adebayo',
        action: 'Rejected nomination',
        fromStatus: 'Nominated',
        toStatus: 'Rejected – Nomination',
        reason: 'Duplicate school',
        note: 'School already nominated under different name'
      }
    ],
    emailEvents: []
  },
  
  // 4. Interest Requested (Invite Sent) - no response
  {
    id: 'SCH004',
    name: 'Bright Future Academy',
    state: 'Lagos',
    lga: 'Lekki',
    type: 'Private',
    ownership: 'Private',
    capacity: 580,
    status: 'Interest Requested (Invite Sent)',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-16T11:00:00Z',
    lastUpdate: '2025-12-17T08:30:00Z',
    decisions: [
      {
        id: 'D004',
        timestamp: '2025-12-16T11:00:00Z',
        actor: 'A. Musa',
        action: 'Nominated school',
        toStatus: 'Nominated'
      },
      {
        id: 'D005',
        timestamp: '2025-12-17T08:30:00Z',
        actor: 'T. Adebayo',
        action: 'Sent interest invite',
        fromStatus: 'Nominated',
        toStatus: 'Interest Requested (Invite Sent)'
      }
    ],
    emailEvents: [
      {
        id: 'E002',
        timestamp: '2025-12-17T08:31:00Z',
        channel: 'Email',
        recipient: 'info@brightfuture.edu.ng',
        template: 'Interest Invite Sent',
        status: 'Sent',
        subject: 'Express your interest in Maltina School Tour'
      }
    ]
  },
  
  // 5. Interest Confirmed, Criteria Failed (auto)
  {
    id: 'SCH005',
    name: 'Wisdom College',
    state: 'Oyo',
    lga: 'Ibadan North',
    type: 'Private',
    ownership: 'Private',
    capacity: 280,
    status: 'Interest Confirmed',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-15T09:00:00Z',
    lastUpdate: '2025-12-18T14:20:00Z',
    decisions: [
      {
        id: 'D006',
        timestamp: '2025-12-15T09:00:00Z',
        actor: 'T. Adebayo',
        action: 'Nominated school',
        toStatus: 'Nominated'
      },
      {
        id: 'D007',
        timestamp: '2025-12-16T10:00:00Z',
        actor: 'T. Adebayo',
        action: 'Sent interest invite',
        fromStatus: 'Nominated',
        toStatus: 'Interest Requested (Invite Sent)'
      },
      {
        id: 'D008',
        timestamp: '2025-12-18T14:20:00Z',
        actor: 'System',
        action: 'School confirmed interest',
        fromStatus: 'Interest Requested (Invite Sent)',
        toStatus: 'Interest Confirmed'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Fail', details: 'Current capacity: 280' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E003',
        timestamp: '2025-12-18T14:21:00Z',
        channel: 'Email',
        recipient: 'admin@wisdomcollege.edu.ng',
        template: 'Interest Confirmation',
        status: 'Sent',
        subject: 'Thank you for confirming interest'
      }
    ]
  },
  
  // 6. Interest Confirmed, Criteria Passed (pending approval)
  {
    id: 'SCH006',
    name: 'Kings Academy',
    state: 'Rivers',
    lga: 'Port Harcourt',
    type: 'Private',
    ownership: 'Private',
    capacity: 680,
    status: 'Interest Confirmed',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-14T08:00:00Z',
    lastUpdate: '2025-12-19T10:00:00Z',
    decisions: [
      {
        id: 'D009',
        timestamp: '2025-12-14T08:00:00Z',
        actor: 'C. Okafor',
        action: 'Nominated school',
        toStatus: 'Nominated'
      },
      {
        id: 'D010',
        timestamp: '2025-12-15T09:00:00Z',
        actor: 'T. Adebayo',
        action: 'Sent interest invite',
        fromStatus: 'Nominated',
        toStatus: 'Interest Requested (Invite Sent)'
      },
      {
        id: 'D011',
        timestamp: '2025-12-19T10:00:00Z',
        actor: 'System',
        action: 'School confirmed interest',
        fromStatus: 'Interest Requested (Invite Sent)',
        toStatus: 'Interest Confirmed'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E004',
        timestamp: '2025-12-19T10:01:00Z',
        channel: 'Email',
        recipient: 'info@kingsacademy.edu.ng',
        template: 'Interest Confirmation',
        status: 'Sent'
      }
    ]
  },
  
  // 7. Rejected – Criteria
  {
    id: 'SCH007',
    name: 'Little Stars Montessori',
    state: 'Lagos',
    lga: 'Victoria Island',
    type: 'Private',
    ownership: 'Private',
    capacity: 180,
    status: 'Rejected – Criteria',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-11T10:00:00Z',
    lastUpdate: '2025-12-17T15:30:00Z',
    decisions: [
      {
        id: 'D012',
        timestamp: '2025-12-11T10:00:00Z',
        actor: 'A. Musa',
        action: 'Nominated school',
        toStatus: 'Nominated'
      },
      {
        id: 'D013',
        timestamp: '2025-12-12T09:00:00Z',
        actor: 'T. Adebayo',
        action: 'Sent interest invite',
        fromStatus: 'Nominated',
        toStatus: 'Interest Requested (Invite Sent)'
      },
      {
        id: 'D014',
        timestamp: '2025-12-16T11:00:00Z',
        actor: 'System',
        action: 'School confirmed interest',
        fromStatus: 'Interest Requested (Invite Sent)',
        toStatus: 'Interest Confirmed'
      },
      {
        id: 'D015',
        timestamp: '2025-12-17T15:30:00Z',
        actor: 'T. Adebayo',
        action: 'Rejected at criteria',
        fromStatus: 'Interest Confirmed',
        toStatus: 'Rejected – Criteria',
        reason: 'Capacity below threshold',
        note: 'School has only 180 students, minimum required is 500'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Fail', details: 'Current capacity: 180' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 8. Approved for RECEE (not scheduled)
  {
    id: 'SCH008',
    name: 'Victory High School',
    state: 'Kano',
    lga: 'Kano Municipal',
    type: 'Public',
    ownership: 'Government',
    capacity: 920,
    status: 'Approved for RECEE',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-13T10:00:00Z',
    lastUpdate: '2025-12-18T16:00:00Z',
    decisions: [
      {
        id: 'D016',
        timestamp: '2025-12-18T16:00:00Z',
        actor: 'T. Adebayo',
        action: 'Approved for RECEE',
        fromStatus: 'Interest Confirmed',
        toStatus: 'Approved for RECEE'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 9. RECEE Scheduled
  {
    id: 'SCH009',
    name: 'Grace International School',
    state: 'Abuja',
    lga: 'Wuse',
    type: 'Private',
    ownership: 'Private',
    capacity: 780,
    status: 'RECEE Scheduled',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-12T09:00:00Z',
    lastUpdate: '2025-12-19T11:00:00Z',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-27T10:00:00Z',
    decisions: [
      {
        id: 'D017',
        timestamp: '2025-12-19T11:00:00Z',
        actor: 'T. Adebayo',
        action: 'RECEE scheduled',
        fromStatus: 'Approved for RECEE',
        toStatus: 'RECEE Scheduled',
        note: 'Assigned to O. Johnson for Dec 27'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E005',
        timestamp: '2025-12-19T11:01:00Z',
        channel: 'Email',
        recipient: 'admin@graceintl.edu.ng',
        template: 'RECEE Visit Scheduled',
        status: 'Sent',
        subject: 'RECEE inspection scheduled for Dec 27'
      }
    ]
  },
  
  // 10. RECEE Completed – Passed
  {
    id: 'SCH010',
    name: 'Premier College',
    state: 'Lagos',
    lga: 'Yaba',
    type: 'Private',
    ownership: 'Private',
    capacity: 650,
    status: 'RECEE Completed – Passed',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-10T08:00:00Z',
    lastUpdate: '2025-12-20T14:30:00Z',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-19T10:00:00Z',
    receeCompletedDate: '2025-12-19T15:30:00Z',
    decisions: [
      {
        id: 'D018',
        timestamp: '2025-12-20T14:30:00Z',
        actor: 'T. Adebayo',
        action: 'Approved RECEE result',
        fromStatus: 'RECEE Scheduled',
        toStatus: 'RECEE Completed – Passed',
        note: 'Excellent infrastructure and safety standards'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 11. RECEE Completed – Failed
  {
    id: 'SCH011',
    name: 'New Horizons Academy',
    state: 'Ogun',
    lga: 'Ifo',
    type: 'Private',
    ownership: 'Private',
    capacity: 520,
    status: 'RECEE Completed – Failed',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-11T09:00:00Z',
    lastUpdate: '2025-12-19T16:00:00Z',
    receeOfficer: 'D. Adewale',
    receeScheduledDate: '2025-12-18T11:00:00Z',
    receeCompletedDate: '2025-12-18T14:30:00Z',
    decisions: [
      {
        id: 'D019',
        timestamp: '2025-12-19T16:00:00Z',
        actor: 'T. Adebayo',
        action: 'RECEE result: Failed',
        fromStatus: 'RECEE Scheduled',
        toStatus: 'RECEE Completed – Failed',
        reason: 'Infrastructure unsuitable',
        note: 'Outdoor space insufficient for tour activities'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 12. Approved for Tour (not clustered)
  {
    id: 'SCH012',
    name: 'Hope Academy',
    state: 'Oyo',
    lga: 'Ogbomoso',
    type: 'Public',
    ownership: 'Government',
    capacity: 880,
    status: 'Approved for Tour',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-09T10:00:00Z',
    lastUpdate: '2025-12-18T10:00:00Z',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-15T09:00:00Z',
    receeCompletedDate: '2025-12-15T14:00:00Z',
    decisions: [
      {
        id: 'D020',
        timestamp: '2025-12-18T10:00:00Z',
        actor: 'T. Adebayo',
        action: 'Approved for tour',
        fromStatus: 'RECEE Completed – Passed',
        toStatus: 'Approved for Tour'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 13. Clustered (Assigned to Cluster)
  {
    id: 'SCH013',
    name: 'Excellence Academy',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Private',
    ownership: 'Private',
    capacity: 720,
    status: 'Clustered (Assigned to Cluster)',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-08T11:00:00Z',
    lastUpdate: '2025-12-19T09:00:00Z',
    clusterId: 'CLU001',
    clusterName: 'Lagos Central - Week 3',
    receeOfficer: 'D. Adewale',
    receeScheduledDate: '2025-12-14T10:00:00Z',
    receeCompletedDate: '2025-12-14T15:00:00Z',
    decisions: [
      {
        id: 'D021',
        timestamp: '2025-12-19T09:00:00Z',
        actor: 'T. Adebayo',
        action: 'Assigned to cluster',
        fromStatus: 'Approved for Tour',
        toStatus: 'Clustered (Assigned to Cluster)',
        note: 'Assigned to Lagos Central - Week 3'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 14. Booking Setup Complete
  {
    id: 'SCH014',
    name: 'Prime College',
    state: 'Lagos',
    lga: 'Surulere',
    type: 'Private',
    ownership: 'Private',
    capacity: 690,
    status: 'Booking Setup Complete (Dates/Slots Ready)',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-07T09:00:00Z',
    lastUpdate: '2025-12-20T10:00:00Z',
    clusterId: 'CLU001',
    clusterName: 'Lagos Central - Week 3',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-13T11:00:00Z',
    receeCompletedDate: '2025-12-13T16:00:00Z',
    decisions: [
      {
        id: 'D022',
        timestamp: '2025-12-20T10:00:00Z',
        actor: 'T. Adebayo',
        action: 'Booking setup completed',
        fromStatus: 'Clustered (Assigned to Cluster)',
        toStatus: 'Booking Setup Complete (Dates/Slots Ready)',
        note: 'Dates and slots configured for Jan 15-20'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 15. Booking Open (Link Sent)
  {
    id: 'SCH015',
    name: 'Star College',
    state: 'Lagos',
    lga: 'Lekki',
    type: 'Private',
    ownership: 'Private',
    capacity: 640,
    status: 'Booking Open (Link Sent)',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-06T10:00:00Z',
    lastUpdate: '2025-12-21T09:00:00Z',
    clusterId: 'CLU002',
    clusterName: 'Lagos East - Week 3',
    receeOfficer: 'D. Adewale',
    receeScheduledDate: '2025-12-12T10:00:00Z',
    receeCompletedDate: '2025-12-12T15:00:00Z',
    decisions: [
      {
        id: 'D023',
        timestamp: '2025-12-21T09:00:00Z',
        actor: 'T. Adebayo',
        action: 'Sent booking link',
        fromStatus: 'Booking Setup Complete (Dates/Slots Ready)',
        toStatus: 'Booking Open (Link Sent)'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E006',
        timestamp: '2025-12-21T09:01:00Z',
        channel: 'Email',
        recipient: 'info@starcollege.edu.ng',
        template: 'Booking Link Sent',
        status: 'Sent',
        subject: 'Book your Maltina Tour slot now'
      }
    ]
  },
  
  // 16. Booked
  {
    id: 'SCH016',
    name: 'Royal International School',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Private',
    ownership: 'Private',
    capacity: 710,
    status: 'Booked',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-05T08:00:00Z',
    lastUpdate: '2025-12-22T11:30:00Z',
    clusterId: 'CLU001',
    clusterName: 'Lagos Central - Week 3',
    bookingDate: '2026-01-16',
    bookingSlot: '09:00 AM - 12:00 PM',
    bookingConfirmedDate: '2025-12-22T11:30:00Z',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-11T09:00:00Z',
    receeCompletedDate: '2025-12-11T14:00:00Z',
    decisions: [
      {
        id: 'D024',
        timestamp: '2025-12-22T11:30:00Z',
        actor: 'System',
        action: 'School booked slot',
        fromStatus: 'Booking Open (Link Sent)',
        toStatus: 'Booked',
        note: 'Booked slot: Jan 16, 2026 @ 09:00 AM - 12:00 PM'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E007',
        timestamp: '2025-12-22T11:31:00Z',
        channel: 'Email',
        recipient: 'admin@royalintl.edu.ng',
        template: 'Booking Confirmation Sent',
        status: 'Sent',
        subject: 'Your Maltina Tour booking is confirmed'
      }
    ]
  },
  
  // 17. Ready for Tour
  {
    id: 'SCH017',
    name: 'Ivy League Academy',
    state: 'Lagos',
    lga: 'Victoria Island',
    type: 'Private',
    ownership: 'Private',
    capacity: 590,
    status: 'Ready for Tour',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-04T09:00:00Z',
    lastUpdate: '2025-12-22T15:00:00Z',
    clusterId: 'CLU001',
    clusterName: 'Lagos Central - Week 3',
    bookingDate: '2026-01-15',
    bookingSlot: '10:00 AM - 01:00 PM',
    bookingConfirmedDate: '2025-12-21T14:00:00Z',
    receeOfficer: 'D. Adewale',
    receeScheduledDate: '2025-12-10T10:00:00Z',
    receeCompletedDate: '2025-12-10T15:00:00Z',
    decisions: [
      {
        id: 'D025',
        timestamp: '2025-12-22T15:00:00Z',
        actor: 'T. Adebayo',
        action: 'Marked as ready for tour',
        fromStatus: 'Booked',
        toStatus: 'Ready for Tour',
        note: 'All pre-tour checklist items completed'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E008',
        timestamp: '2025-12-22T15:01:00Z',
        channel: 'Email',
        recipient: 'principal@ivyleague.edu.ng',
        template: 'Tour Readiness Confirmed',
        status: 'Sent',
        subject: 'Your school is ready for Maltina Tour'
      }
    ]
  },
  
  // 18. Cancelled (after booking)
  {
    id: 'SCH018',
    name: 'Heritage Secondary School',
    state: 'Ogun',
    lga: 'Abeokuta North',
    type: 'Public',
    ownership: 'Government',
    capacity: 750,
    status: 'Cancelled',
    nominatedBy: 'C. Okafor',
    nominatedDate: '2025-12-03T10:00:00Z',
    lastUpdate: '2025-12-21T16:00:00Z',
    clusterId: 'CLU003',
    clusterName: 'Ogun Central - Week 4',
    bookingDate: '2026-01-20',
    bookingSlot: '09:00 AM - 12:00 PM',
    bookingConfirmedDate: '2025-12-19T10:00:00Z',
    receeOfficer: 'O. Johnson',
    receeScheduledDate: '2025-12-09T11:00:00Z',
    receeCompletedDate: '2025-12-09T16:00:00Z',
    decisions: [
      {
        id: 'D026',
        timestamp: '2025-12-21T16:00:00Z',
        actor: 'T. Adebayo',
        action: 'Booking cancelled',
        fromStatus: 'Booked',
        toStatus: 'Cancelled',
        reason: 'School request',
        note: 'School requested cancellation due to exam schedule conflict'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E009',
        timestamp: '2025-12-21T16:01:00Z',
        channel: 'Email',
        recipient: 'admin@heritage.edu.ng',
        template: 'Booking Cancellation Confirmed',
        status: 'Sent',
        subject: 'Your Maltina Tour booking has been cancelled'
      }
    ]
  },
  
  // 19. Interest Confirmed - awaiting criteria decision (override candidate)
  {
    id: 'SCH019',
    name: 'Dawn Academy',
    state: 'Oyo',
    lga: 'Ibadan South',
    type: 'Private',
    ownership: 'Private',
    capacity: 450,
    status: 'Interest Confirmed',
    nominatedBy: 'A. Musa',
    nominatedDate: '2025-12-13T08:00:00Z',
    lastUpdate: '2025-12-20T09:00:00Z',
    decisions: [
      {
        id: 'D027',
        timestamp: '2025-12-20T09:00:00Z',
        actor: 'System',
        action: 'School confirmed interest',
        fromStatus: 'Interest Requested (Invite Sent)',
        toStatus: 'Interest Confirmed'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Fail', details: 'Current capacity: 450 (close to threshold)' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: []
  },
  
  // 20. Booked - different cluster
  {
    id: 'SCH020',
    name: 'Fountain College',
    state: 'Oyo',
    lga: 'Ogbomoso',
    type: 'Public',
    ownership: 'Government',
    capacity: 820,
    status: 'Booked',
    nominatedBy: 'T. Adebayo',
    nominatedDate: '2025-12-02T09:00:00Z',
    lastUpdate: '2025-12-21T13:00:00Z',
    clusterId: 'CLU004',
    clusterName: 'Oyo North - Week 5',
    bookingDate: '2026-01-22',
    bookingSlot: '10:00 AM - 01:00 PM',
    bookingConfirmedDate: '2025-12-21T13:00:00Z',
    receeOfficer: 'D. Adewale',
    receeScheduledDate: '2025-12-08T10:00:00Z',
    receeCompletedDate: '2025-12-08T15:00:00Z',
    decisions: [
      {
        id: 'D028',
        timestamp: '2025-12-21T13:00:00Z',
        actor: 'System',
        action: 'School booked slot',
        fromStatus: 'Booking Open (Link Sent)',
        toStatus: 'Booked',
        note: 'Booked slot: Jan 22, 2026 @ 10:00 AM - 01:00 PM'
      }
    ],
    criteriaResults: [
      { rule: 'School Type Eligible', result: 'Pass' },
      { rule: 'Location Within Campaign Zone', result: 'Pass' },
      { rule: 'Capacity >= 500', result: 'Pass' },
      { rule: 'Ownership Type Eligible', result: 'Pass' }
    ],
    emailEvents: [
      {
        id: 'E010',
        timestamp: '2025-12-21T13:01:00Z',
        channel: 'Email',
        recipient: 'info@fountaincollege.edu.ng',
        template: 'Booking Confirmation Sent',
        status: 'Sent',
        subject: 'Your Maltina Tour booking is confirmed'
      }
    ]
  }
];

// HELPER FUNCTIONS
export function getSchoolsByStatus(status: SchoolStatus): School[] {
  return SCHOOLS.filter(s => s.status === status);
}

export function getSchoolById(id: string): School | undefined {
  return SCHOOLS.find(s => s.id === id);
}

export function getSchoolsByCluster(clusterId: string): School[] {
  return SCHOOLS.filter(s => s.clusterId === clusterId);
}

export function getStatusColor(status: SchoolStatus): string {
  const colorMap: Record<SchoolStatus, string> = {
    'In Database (Unnominated)': '#C7C7C7',
    'Nominated': '#F5A623',
    'Rejected – Nomination': '#8C1D18',
    'Interest Requested (Invite Sent)': '#D4A017',
    'Interest Confirmed': '#2F6B3C',
    'Rejected – Criteria': '#8C1D18',
    'Approved for RECEE': '#F5A623',
    'RECEE Scheduled': '#D4A017',
    'RECEE Completed – Passed': '#2F6B3C',
    'RECEE Completed – Failed': '#8C1D18',
    'Approved for Tour': '#2F6B3C',
    'Clustered (Assigned to Cluster)': '#F5A623',
    'Booking Setup Complete (Dates/Slots Ready)': '#D4A017',
    'Booking Open (Link Sent)': '#F5A623',
    'Booked': '#2F6B3C',
    'Ready for Tour': '#2F6B3C',
    'Cancelled': '#8C1D18'
  };
  return colorMap[status] || '#C7C7C7';
}

export function getStatusBgColor(status: SchoolStatus): string {
  const colorMap: Record<SchoolStatus, string> = {
    'In Database (Unnominated)': '#F2F1EE',
    'Nominated': '#FFF7ED',
    'Rejected – Nomination': '#FDE8E7',
    'Interest Requested (Invite Sent)': '#FFF9E6',
    'Interest Confirmed': '#E8F5E9',
    'Rejected – Criteria': '#FDE8E7',
    'Approved for RECEE': '#FFF7ED',
    'RECEE Scheduled': '#FFF9E6',
    'RECEE Completed – Passed': '#E8F5E9',
    'RECEE Completed – Failed': '#FDE8E7',
    'Approved for Tour': '#E8F5E9',
    'Clustered (Assigned to Cluster)': '#FFF7ED',
    'Booking Setup Complete (Dates/Slots Ready)': '#FFF9E6',
    'Booking Open (Link Sent)': '#FFF7ED',
    'Booked': '#E8F5E9',
    'Ready for Tour': '#E8F5E9',
    'Cancelled': '#FDE8E7'
  };
  return colorMap[status] || '#F2F1EE';
}
