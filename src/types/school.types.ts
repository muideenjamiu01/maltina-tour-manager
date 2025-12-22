// School Management Types

export interface School {
  id: string;
  name: string;
  code: string;
  type: SchoolType;
  level: SchoolLevel;
  address: Address;
  contact: ContactInfo;
  principal: Principal;
  status: SchoolStatus;
  nominationStatus?: NominationStatus;
  inspectionStatus?: InspectionStatus;
  tourStatus?: TourStatus;
  capacity: number;
  enrollmentCount: number;
  facilities: SchoolFacility[];
  createdAt: string;
  updatedAt: string;
}

export enum SchoolType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  MISSIONARY = 'missionary',
  INTERNATIONAL = 'international',
}

export enum SchoolLevel {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  MIXED = 'mixed',
}

export enum SchoolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_APPROVAL = 'pending_approval',
}

export enum NominationStatus {
  NOT_NOMINATED = 'not_nominated',
  NOMINATED = 'nominated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum InspectionStatus {
  NOT_INSPECTED = 'not_inspected',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum TourStatus {
  NOT_SCHEDULED = 'not_scheduled',
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  alternatePhone?: string;
}

export interface Principal {
  name: string;
  phone: string;
  email: string;
  title?: string;
}

export interface SchoolFacility {
  id: string;
  name: string;
  type: FacilityType;
  capacity?: number;
  description?: string;
  isAvailable: boolean;
}

export enum FacilityType {
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  LIBRARY = 'library',
  AUDITORIUM = 'auditorium',
  SPORTS_FACILITY = 'sports_facility',
  CAFETERIA = 'cafeteria',
  PLAYGROUND = 'playground',
}

export interface Nomination {
  id: string;
  schoolId: string;
  school: School;
  campaignId: string;
  nominatedBy: string;
  nominationDate: string;
  reason: string;
  status: NominationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComments?: string;
  documents: NominationDocument[];
}

export interface NominationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface SchoolInvitation {
  id: string;
  schoolId: string;
  school: School;
  campaignId: string;
  invitedBy: string;
  invitationDate: string;
  status: InvitationStatus;
  respondedAt?: string;
  response?: string;
  expiresAt: string;
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
}