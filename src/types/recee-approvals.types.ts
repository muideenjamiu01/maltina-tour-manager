import { School } from '../app/admin/week2-pipeline-data';

export interface RECEEResult {
  id: string;
  school: School;
  officer: string;
  inspectionDate: string;
  recommendation: 'PASS' | 'FAIL' | 'REINSPECT';
  overallScore: number;
  criticalIssues: string[];
  observations: string;
  photos: number;
}

export interface ActionModal {
  type: 'approve-pass' | 'approve-fail' | 'override' | 'reinspect';
  result: RECEEResult;
}
