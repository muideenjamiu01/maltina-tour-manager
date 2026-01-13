import { School } from '../app/admin/week2-pipeline-data';

export interface CriteriaCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  value: string;
  requirement: string;
}

export interface ActionModal {
  type: 'approve' | 'reject' | 'override';
  school: School;
}
