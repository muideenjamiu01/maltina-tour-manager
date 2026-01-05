import { ReactNode } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

export interface PermissionCategory {
  [key: string]: Permission[];
}

export interface Role {
  icon: ReactNode;
  id: string;
  name: string;
  description: string;
  userCount: number;
  type: 'system' | 'custom';
  color: string;
  pwaName: string;
  canCreateAccounts: boolean;
  summary: string;
}

export type PermissionKey = keyof typeof PERMISSION_CATALOG;

export const PERMISSION_CATALOG = {
  // Tour Supervisor PWA Permissions
  'tour-supervisor': {
    schoolAccess: [
      { id: 'view-state-schools', name: 'View schools in assigned state', enabled: true },
      { id: 'search-schools', name: 'Search and filter schools', enabled: true },
      { id: 'join-school', name: 'Join a school session', enabled: true },
    ],
    sessionControl: [
      { id: 'start-session', name: 'Start school session', enabled: true },
      { id: 'control-survey-flow', name: 'Control survey flow (open/close stages)', enabled: true },
      { id: 'unlock-post-survey', name: 'Unlock Post-Impact survey', enabled: true },
    ],
    facilitatorManagement: [
      { id: 'record-attendance', name: 'Record facilitator attendance', enabled: true },
      { id: 'rate-performance', name: 'Rate facilitator performance', enabled: true },
    ],
    surveyManagement: [
      { id: 'set-survey-count', name: 'Set how many children are being surveyed', enabled: true },
      { id: 'fill-pre-survey', name: 'Fill Pre-Impact surveys', enabled: true },
      { id: 'fill-post-survey', name: 'Fill Post-Impact surveys', enabled: true },
      { id: 'view-survey-dashboard', name: 'View survey dashboard with counts', enabled: true },
    ],
    teacherFeedback: [
      { id: 'share-teacher-link', name: 'Share teacher feedback link', enabled: true },
      { id: 'view-teacher-submissions', name: 'View teacher submission count', enabled: true },
    ],
    syncMonitoring: [
      { id: 'view-sync-status', name: 'View sync status', enabled: true },
      { id: 'sync-alerts', name: 'Get sync failure alerts', enabled: true },
    ],
  },

  // Tour Analyst PWA Permissions
  'tour-analyst': {
    schoolAccess: [
      { id: 'view-state-schools', name: 'View schools in assigned state', enabled: true },
      { id: 'search-schools', name: 'Search and filter schools', enabled: true },
      { id: 'join-school', name: 'Join a school session', enabled: true },
    ],
    sessionControl: [
      { id: 'wait-activation', name: 'Wait in holding room until supervisor activates', enabled: true },
    ],
    surveyManagement: [
      { id: 'fill-pre-survey', name: 'Fill Pre-Impact surveys', enabled: true },
      { id: 'fill-post-survey', name: 'Fill Post-Impact surveys (after unlock)', enabled: true },
      { id: 'view-progress-counters', name: 'View progress counters (school + personal totals)', enabled: true },
    ],
    syncMonitoring: [
      { id: 'view-own-sync', name: 'View own device sync status', enabled: true },
    ],
  },

  // RECEE Officer PWA Permissions
  'recee-officer': {
    inspectionAccess: [
      { id: 'view-recee-queue', name: 'View RECEE queue', enabled: true },
      { id: 'view-assigned-schools', name: 'View assigned schools for inspection', enabled: true },
      { id: 'navigate-to-school', name: 'Get navigation to school location', enabled: true },
    ],
    inspectionExecution: [
      { id: 'fill-inspection-form', name: 'Fill RECEE inspection form', enabled: true },
      { id: 'upload-photos', name: 'Upload inspection photos', enabled: true },
      { id: 'record-measurements', name: 'Record space measurements', enabled: true },
    ],
    inspectionDecision: [
      { id: 'approve-school', name: 'Approve school for tour', enabled: true },
      { id: 'reject-school', name: 'Reject school with reason', enabled: true },
      { id: 'request-clarification', name: 'Request clarification from school', enabled: true },
    ],
    syncMonitoring: [
      { id: 'view-sync-status', name: 'View sync status', enabled: true },
      { id: 'offline-mode', name: 'Work offline and sync later', enabled: true },
    ],
  },

  // Facilitator PWA Permissions
  'facilitator': {
    schoolAccess: [
      { id: 'view-assigned-schools', name: 'View only assigned schools', enabled: true },
      { id: 'view-schedule', name: 'View tour schedule', enabled: true },
    ],
    readOnlyAccess: [
      { id: 'view-school-info', name: 'View school information', enabled: true },
      { id: 'view-tour-details', name: 'View tour details and timing', enabled: true },
      { id: 'view-supervisor', name: 'View supervisor contact', enabled: true },
    ],
    messaging: [
      { id: 'send-messages', name: 'Send messages to supervisor', enabled: true },
      { id: 'receive-messages', name: 'Receive broadcast messages', enabled: true },
    ],
    checkIn: [
      { id: 'check-in', name: 'Check in at school location', enabled: true },
      { id: 'confirm-attendance', name: 'Confirm attendance', enabled: true },
    ],
  },

  // Judge PWA Permissions
  'judge': {
    designAccess: [
      { id: 'view-submissions', name: 'View competition submissions', enabled: true },
      { id: 'filter-designs', name: 'Filter by age group / category', enabled: true },
    ],
    scoring: [
      { id: 'rate-designs', name: 'Rate and score designs', enabled: true },
      { id: 'add-comments', name: 'Add judge comments', enabled: true },
      { id: 'flag-inappropriate', name: 'Flag inappropriate content', enabled: true },
    ],
    isolation: [
      { id: 'no-tour-access', name: 'No access to tour operations (walled off)', enabled: true },
      { id: 'no-school-data', name: 'No access to school data', enabled: true },
    ],
  },
};
