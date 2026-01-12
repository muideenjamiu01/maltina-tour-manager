export interface RejectionData {
  stage: string;
  reason: string;
  count: number;
  state?: string;
  lga?: string;
  date?: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export interface RejectionByStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface RejectionByReason {
  stage: string;
  reason: string;
  count: number;
}

export interface TrendData {
  week: string;
  total: number;
}

export interface TopRejectedLGA {
  lga: string;
  state: string;
  count: number;
}
