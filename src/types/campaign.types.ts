// Campaign Management Types

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  isLocked: boolean;
  targetSchools: number;
  completedSchools: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface CampaignYear {
  id: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  campaigns: Campaign[];
}

export interface CampaignTarget {
  id: string;
  campaignId: string;
  targetType: string;
  targetValue: number;
  currentValue: number;
  description?: string;
}

export interface CampaignProgress {
  campaignId: string;
  totalSchools: number;
  completedSchools: number;
  pendingSchools: number;
  completionPercentage: number;
  milestones: CampaignMilestone[];
}

export interface CampaignMilestone {
  id: string;
  name: string;
  description?: string;
  targetDate: string;
  completedDate?: string;
  status: MilestoneStatus;
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}