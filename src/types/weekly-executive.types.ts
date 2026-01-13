export interface WeeklyMetric {
  label: string;
  current: number;
  previous: number;
  delta: number;
  deltaPercentage: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export interface TopLGA {
  lga: string;
  state: string;
  nominations: number;
  booked: number;
  conversionRate: number;
}

export interface RejectionReason {
  reason: string;
  count: number;
  percentage: number;
}

export interface SLARisk {
  stage: string;
  count: number;
  criticalCount: number;
}

export interface WeekData {
  week: string;
  metrics: WeeklyMetric[];
  topLGAs: TopLGA[];
  rejectionReasons: RejectionReason[];
  slaRisks: SLARisk[];
}
