import { School } from '../app/admin/week2-pipeline-data';

export interface ActionModal {
  type: 'approve' | 'reject' | 'bulk-approve' | 'bulk-reject';
  schools: School[];
}
