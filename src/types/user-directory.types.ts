export interface Role {
  id: string;
  name: string;
  type: 'system' | 'custom';
  description: string;
  color: string;
  userCount: number;
  permissions: string[];
  createdBy?: string;
  createdDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  accountStatus: 'active' | 'inactive';
  activationStatus: 'activated' | 'pending';
  dateCreated: string;
  lastLogin: string | null;
  createdBy: string;
}
