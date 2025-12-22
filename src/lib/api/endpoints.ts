// API endpoint constants organized by module

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/auth/profile',
} as const;

export const CAMPAIGN_ENDPOINTS = {
  LIST: '/campaigns',
  CREATE: '/campaigns',
  GET: (id: string) => `/campaigns/${id}`,
  UPDATE: (id: string) => `/campaigns/${id}`,
  DELETE: (id: string) => `/campaigns/${id}`,
  YEARS: '/campaigns/years',
  TARGETS: '/campaigns/targets',
  PROGRESS: '/campaigns/progress',
  LOCK: '/campaigns/lock',
} as const;

export const SCHOOL_ENDPOINTS = {
  LIST: '/schools',
  CREATE: '/schools',
  GET: (id: string) => `/schools/${id}`,
  UPDATE: (id: string) => `/schools/${id}`,
  DELETE: (id: string) => `/schools/${id}`,
  DIRECTORY: '/schools/directory',
  NOMINATIONS: '/schools/nominations',
  INVITATIONS: '/schools/invitations',
  ASSIGNMENTS: '/schools/assignments',
  SEARCH: '/schools/search',
} as const;

export const INSPECTION_ENDPOINTS = {
  LIST: '/inspections',
  CREATE: '/inspections',
  GET: (id: string) => `/inspections/${id}`,
  UPDATE: (id: string) => `/inspections/${id}`,
  DELETE: (id: string) => `/inspections/${id}`,
  RECEE_CONTROL: '/inspections/recee-control',
  REPORTS: '/inspections/reports',
  INSPECTORS: '/inspections/inspectors',
  SCHEDULE: '/inspections/schedule',
} as const;

export const BOOKING_ENDPOINTS = {
  LIST: '/bookings',
  CREATE: '/bookings',
  GET: (id: string) => `/bookings/${id}`,
  UPDATE: (id: string) => `/bookings/${id}`,
  DELETE: (id: string) => `/bookings/${id}`,
  CONTROL: '/bookings/control',
  CALENDAR: '/bookings/calendar',
  SLOTS: '/bookings/slots',
  AVAILABLE_SLOTS: '/bookings/available-slots',
} as const;

export const USER_ENDPOINTS = {
  LIST: '/users',
  CREATE: '/users',
  GET: (id: string) => `/users/${id}`,
  UPDATE: (id: string) => `/users/${id}`,
  DELETE: (id: string) => `/users/${id}`,
  DIRECTORY: '/users/directory',
  FACILITATORS: '/users/facilitators',
  ROLES: '/users/roles',
  PERMISSIONS: '/users/permissions',
} as const;

export const COMMUNICATION_ENDPOINTS = {
  EMAIL_TEMPLATES: '/communication/email-templates',
  EMAIL_SEND: '/communication/emails/send',
  EMAIL_HISTORY: '/communication/emails/history',
  SMS_TEMPLATES: '/communication/sms-templates',
  SMS_SEND: '/communication/sms/send',
  SMS_HISTORY: '/communication/sms/history',
  NOTIFICATIONS: '/communication/notifications',
} as const;

export const FORM_ENDPOINTS = {
  LIST: '/forms',
  CREATE: '/forms',
  GET: (id: string) => `/forms/${id}`,
  UPDATE: (id: string) => `/forms/${id}`,
  DELETE: (id: string) => `/forms/${id}`,
  SUBMISSIONS: (id: string) => `/forms/${id}/submissions`,
  SURVEYS: '/forms/surveys',
} as const;

export const REPORT_ENDPOINTS = {
  ANALYTICS: '/reports/analytics',
  DASHBOARD_STATS: '/reports/dashboard-stats',
  CAMPAIGN_REPORTS: '/reports/campaigns',
  SCHOOL_REPORTS: '/reports/schools',
  INSPECTION_REPORTS: '/reports/inspections',
  BOOKING_REPORTS: '/reports/bookings',
  USER_REPORTS: '/reports/users',
  EXPORT: '/reports/export',
} as const;

export const AUDIT_ENDPOINTS = {
  LOGS: '/audit/logs',
  SEARCH: '/audit/search',
  EXPORT: '/audit/export',
} as const;

export const SETTINGS_ENDPOINTS = {
  GENERAL: '/settings/general',
  SECURITY: '/settings/security',
  INTEGRATIONS: '/settings/integrations',
  PREFERENCES: '/settings/preferences',
} as const;