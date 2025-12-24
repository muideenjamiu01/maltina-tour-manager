// Mock campaign data for ADM_C01_Campaign screen

export interface Cycle {
  id: string;
  cycleLabel: string;
  cycleType: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'H1' | 'H2' | 'Annual' | string;
  status: 'active' | 'locked' | 'draft' | 'closed';
  targetSchools: number;
  achievedSchools: number;
  targetChildren: number;
  achievedChildren: number;
  startDate: string;
  endDate: string;
  lockedBy?: string;
  tourEnabled: boolean;
  competitionEnabled: boolean;
  tourProgress: {
    nominated: number;
    confirmed: number;
    receeInspected: number;
    booked: number;
    toured: number;
  };
  competitionProgress: {
    submitted: number;
    judged: number;
    shortlisted: number;
    finalists: number;
  };
  submissionDeadline: {
    receeOfficers: string;
    tourSupervisors: string;
    tourAnalysts: string;
  };
}

export interface Campaign {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'locked' | 'draft' | 'closed';
  cycles: Cycle[];
  totalTargetSchools: number;
  totalAchievedSchools: number;
  totalTargetChildren: number;
  totalAchievedChildren: number;
}

export const mockCampaigns: Campaign[] = [
  {
    id: 'CMP-2024',
    name: 'Maltina Nourishment Programme 2024',
    year: 2024,
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    status: 'closed',
    cycles: [
      {
        id: 'CMP-2024-Q1',
        cycleLabel: 'Q1 2024',
        cycleType: 'Q1',
        status: 'closed',
        targetSchools: 200,
        achievedSchools: 195,
        targetChildren: 30000,
        achievedChildren: 29250,
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 250,
          confirmed: 210,
          receeInspected: 205,
          booked: 200,
          toured: 195
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Apr 2024 23:59',
          tourSupervisors: '02 May 2024 23:59',
          tourAnalysts: '05 May 2024 23:59'
        }
      },
      {
        id: 'CMP-2024-Q2',
        cycleLabel: 'Q2 2024',
        cycleType: 'Q2',
        status: 'closed',
        targetSchools: 200,
        achievedSchools: 198,
        targetChildren: 30000,
        achievedChildren: 29700,
        startDate: '2024-05-01',
        endDate: '2024-07-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 245,
          confirmed: 215,
          receeInspected: 210,
          booked: 205,
          toured: 198
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Jul 2024 23:59',
          tourSupervisors: '02 Aug 2024 23:59',
          tourAnalysts: '05 Aug 2024 23:59'
        }
      },
      {
        id: 'CMP-2024-Q3',
        cycleLabel: 'Q3 2024',
        cycleType: 'Q3',
        status: 'closed',
        targetSchools: 200,
        achievedSchools: 191,
        targetChildren: 30000,
        achievedChildren: 28650,
        startDate: '2024-08-01',
        endDate: '2024-10-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 240,
          confirmed: 205,
          receeInspected: 198,
          booked: 195,
          toured: 191
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Oct 2024 23:59',
          tourSupervisors: '02 Nov 2024 23:59',
          tourAnalysts: '05 Nov 2024 23:59'
        }
      },
      {
        id: 'CMP-2024-Q4',
        cycleLabel: 'Q4 2024',
        cycleType: 'Q4',
        status: 'closed',
        targetSchools: 200,
        achievedSchools: 198,
        targetChildren: 30000,
        achievedChildren: 29700,
        startDate: '2024-11-01',
        endDate: '2024-12-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 248,
          confirmed: 218,
          receeInspected: 208,
          booked: 203,
          toured: 198
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Dec 2024 23:59',
          tourSupervisors: '02 Jan 2025 23:59',
          tourAnalysts: '05 Jan 2025 23:59'
        }
      }
    ],
    totalTargetSchools: 800,
    totalAchievedSchools: 782,
    totalTargetChildren: 120000,
    totalAchievedChildren: 117300
  },
  {
    id: 'CMP-2025',
    name: 'Maltina School Tour 2025',
    year: 2025,
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    status: 'closed',
    cycles: [
      {
        id: 'CMP-2025-Q1',
        cycleLabel: 'Q1 2025',
        cycleType: 'Q1',
        status: 'closed',
        targetSchools: 450,
        achievedSchools: 432,
        targetChildren: 67500,
        achievedChildren: 64800,
        startDate: '2025-01-15',
        endDate: '2025-03-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Mar 2025 23:59',
          tourSupervisors: '02 Apr 2025 23:59',
          tourAnalysts: '05 Apr 2025 23:59'
        }
      },
      {
        id: 'CMP-2025-Q2',
        cycleLabel: 'Q2 2025',
        cycleType: 'Q2',
        status: 'locked',
        targetSchools: 500,
        achievedSchools: 487,
        targetChildren: 75000,
        achievedChildren: 73050,
        startDate: '2025-04-15',
        endDate: '2025-06-30',
        lockedBy: 'Campaign Manager',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Jun 2025 23:59',
          tourSupervisors: '02 Jul 2025 23:59',
          tourAnalysts: '05 Jul 2025 23:59'
        }
      },
      {
        id: 'CMP-2025-Q3',
        cycleLabel: 'Q3 2025',
        cycleType: 'Q3',
        status: 'closed',
        targetSchools: 520,
        achievedSchools: 516,
        targetChildren: 78000,
        achievedChildren: 77400,
        startDate: '2025-07-15',
        endDate: '2025-09-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Sep 2025 23:59',
          tourSupervisors: '02 Oct 2025 23:59',
          tourAnalysts: '05 Oct 2025 23:59'
        }
      },
      {
        id: 'CMP-2025-Q4',
        cycleLabel: 'Q4 2025',
        cycleType: 'Q4',
        status: 'closed',
        targetSchools: 550,
        achievedSchools: 543,
        targetChildren: 82500,
        achievedChildren: 81450,
        startDate: '2025-10-15',
        endDate: '2025-12-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Dec 2025 23:59',
          tourSupervisors: '02 Jan 2026 23:59',
          tourAnalysts: '05 Jan 2026 23:59'
        }
      }
    ],
    totalTargetSchools: 2020,
    totalAchievedSchools: 1978,
    totalTargetChildren: 303000,
    totalAchievedChildren: 296700
  },
  {
    id: 'CMP-2026',
    name: 'Maltina School Tour 2026',
    year: 2026,
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    status: 'active',
    cycles: [
      {
        id: 'CMP-2026-Q1',
        cycleLabel: 'Q1 2026',
        cycleType: 'Q1',
        status: 'active',
        targetSchools: 500,
        achievedSchools: 423,
        targetChildren: 75000,
        achievedChildren: 68240,
        startDate: '2026-01-15',
        endDate: '2026-03-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Mar 2026 23:59',
          tourSupervisors: '02 Apr 2026 23:59',
          tourAnalysts: '05 Apr 2026 23:59'
        }
      },
      {
        id: 'CMP-2026-Q2',
        cycleLabel: 'Q2 2026',
        cycleType: 'Q2',
        status: 'draft',
        targetSchools: 600,
        achievedSchools: 0,
        targetChildren: 90000,
        achievedChildren: 0,
        startDate: '2026-04-15',
        endDate: '2026-06-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Jun 2026 23:59',
          tourSupervisors: '02 Jul 2026 23:59',
          tourAnalysts: '05 Jul 2026 23:59'
        }
      },
      {
        id: 'CMP-2026-Q3',
        cycleLabel: 'Q3 2026',
        cycleType: 'Q3',
        status: 'draft',
        targetSchools: 550,
        achievedSchools: 0,
        targetChildren: 82500,
        achievedChildren: 0,
        startDate: '2026-07-15',
        endDate: '2026-09-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Sep 2026 23:59',
          tourSupervisors: '02 Oct 2026 23:59',
          tourAnalysts: '05 Oct 2026 23:59'
        }
      },
      {
        id: 'CMP-2026-Q4',
        cycleLabel: 'Q4 2026',
        cycleType: 'Q4',
        status: 'draft',
        targetSchools: 550,
        achievedSchools: 0,
        targetChildren: 82500,
        achievedChildren: 0,
        startDate: '2026-10-15',
        endDate: '2026-12-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Dec 2026 23:59',
          tourSupervisors: '02 Jan 2027 23:59',
          tourAnalysts: '05 Jan 2027 23:59'
        }
      }
    ],
    totalTargetSchools: 2200,
    totalAchievedSchools: 423,
    totalTargetChildren: 330000,
    totalAchievedChildren: 68240
  },
  {
    id: 'CMP-2027',
    name: 'Maltina School Tour 2027',
    year: 2027,
    startDate: '2027-01-15',
    endDate: '2027-12-31',
    status: 'draft',
    cycles: [
      {
        id: 'CMP-2027-Q1',
        cycleLabel: 'Q1 2027',
        cycleType: 'Q1',
        status: 'draft',
        targetSchools: 600,
        achievedSchools: 0,
        targetChildren: 90000,
        achievedChildren: 0,
        startDate: '2027-01-15',
        endDate: '2027-03-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Mar 2027 23:59',
          tourSupervisors: '02 Apr 2027 23:59',
          tourAnalysts: '05 Apr 2027 23:59'
        }
      },
      {
        id: 'CMP-2027-Q2',
        cycleLabel: 'Q2 2027',
        cycleType: 'Q2',
        status: 'draft',
        targetSchools: 600,
        achievedSchools: 0,
        targetChildren: 90000,
        achievedChildren: 0,
        startDate: '2027-04-15',
        endDate: '2027-06-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Jun 2027 23:59',
          tourSupervisors: '02 Jul 2027 23:59',
          tourAnalysts: '05 Jul 2027 23:59'
        }
      },
      {
        id: 'CMP-2027-Q3',
        cycleLabel: 'Q3 2027',
        cycleType: 'Q3',
        status: 'draft',
        targetSchools: 600,
        achievedSchools: 0,
        targetChildren: 90000,
        achievedChildren: 0,
        startDate: '2027-07-15',
        endDate: '2027-09-30',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '30 Sep 2027 23:59',
          tourSupervisors: '02 Oct 2027 23:59',
          tourAnalysts: '05 Oct 2027 23:59'
        }
      },
      {
        id: 'CMP-2027-Q4',
        cycleLabel: 'Q4 2027',
        cycleType: 'Q4',
        status: 'draft',
        targetSchools: 600,
        achievedSchools: 0,
        targetChildren: 90000,
        achievedChildren: 0,
        startDate: '2027-10-15',
        endDate: '2027-12-31',
        tourEnabled: true,
        competitionEnabled: false,
        tourProgress: {
          nominated: 0,
          confirmed: 0,
          receeInspected: 0,
          booked: 0,
          toured: 0
        },
        competitionProgress: {
          submitted: 0,
          judged: 0,
          shortlisted: 0,
          finalists: 0
        },
        submissionDeadline: {
          receeOfficers: '31 Dec 2027 23:59',
          tourSupervisors: '02 Jan 2028 23:59',
          tourAnalysts: '05 Jan 2028 23:59'
        }
      }
    ],
    totalTargetSchools: 2400,
    totalAchievedSchools: 0,
    totalTargetChildren: 360000,
    totalAchievedChildren: 0
  }
];