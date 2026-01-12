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

export interface Invite {
  id: string;
  email: string;
  role: string;
  roleColor: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  sentBy: string;
  sentDate: string;
  expiresDate: string;
  acceptedDate?: string;
  inviteLink: string;
}

export interface RoleUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  dateAssigned: string;
}
