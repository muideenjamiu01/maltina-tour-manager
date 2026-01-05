export interface GeoDataRow {
  state: string;
  lga: string;
  nominated: number;
  interestConfirmed: number;
  criteriaFail: number;
  receePass: number;
  receeFail: number;
  booked: number;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export interface CellProps {
  value: number;
  onClick: () => void;
  highlight?: 'high' | 'medium' | 'low' | 'fail';
}
