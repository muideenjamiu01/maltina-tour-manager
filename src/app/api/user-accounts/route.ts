import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API Handler for User Account Management
 * Used during frontend development while backend APIs are not ready
 */

// Mock data store
let mockRoles = [
  {
    id: 'ROLE-002',
    name: 'Campaign Manager',
    type: 'system',
    description: 'Manages campaigns, cycles, and competitions',
    color: '#F5A623',
    userCount: 5,
    permissions: [
      'View Campaigns',
      'Create Campaigns',
      'Edit Campaigns',
      'Lock/Unlock Campaigns',
      'Manage Competitions',
      'View Reports'
    ],
    createdBy: 'System',
    createdDate: '2024-01-01'
  },
  {
    id: 'ROLE-003',
    name: 'RECEE Officer',
    type: 'system',
    description: 'Conducts school inspections and submissions',
    color: '#2F6B3C',
    userCount: 24,
    permissions: [
      'View Assigned Schools',
      'Submit Inspection Reports',
      'Upload Photos',
      'Approve/Reject Schools',
      'View History'
    ],
    createdBy: 'System',
    createdDate: '2024-01-01'
  },
  {
    id: 'ROLE-004',
    name: 'Tour Coordinator',
    type: 'custom',
    description: 'Coordinates tour logistics and bookings',
    color: '#D4A017',
    userCount: 8,
    permissions: [
      'View Booking Status',
      'Manage Clusters',
      'Assign Dates',
      'View Tour Calendar',
      'Contact Schools'
    ],
    createdBy: 'Admin User',
    createdDate: '2025-06-15'
  },
  {
    id: 'ROLE-005',
    name: 'Data Analyst',
    type: 'custom',
    description: 'Read-only access to reports and analytics',
    color: '#9E9E9E',
    userCount: 3,
    permissions: [
      'View All Reports',
      'Export Data',
      'View Campaign KPIs',
      'View Competition Analytics'
    ],
    createdBy: 'Admin User',
    createdDate: '2025-08-20'
  },
  {
    id: 'ROLE-006',
    name: 'Competition Judge',
    type: 'custom',
    description: 'Reviews and scores competition entries',
    color: '#F5A623',
    userCount: 12,
    permissions: [
      'View Assigned Entries',
      'Score Submissions',
      'Add Comments',
      'Submit Judgements'
    ],
    createdBy: 'Campaign Manager',
    createdDate: '2025-11-10'
  }
];

let mockInvites = [
  {
    id: 'INV-001',
    email: 'john.smith@maltina.com',
    role: 'Campaign Manager',
    roleColor: '#F5A623',
    status: 'pending',
    sentBy: 'Admin User',
    sentDate: '2025-12-20',
    expiresDate: '2025-12-27',
    inviteLink: 'https://admin.maltina.com/invite/abc123'
  },
  {
    id: 'INV-002',
    email: 'sarah.jones@agency.com',
    role: 'RECEE Officer',
    roleColor: '#2F6B3C',
    status: 'accepted',
    sentBy: 'Admin User',
    sentDate: '2025-12-15',
    expiresDate: '2025-12-22',
    acceptedDate: '2025-12-16',
    inviteLink: 'https://admin.maltina.com/invite/def456'
  },
  {
    id: 'INV-003',
    email: 'michael.brown@maltina.com',
    role: 'Tour Coordinator',
    roleColor: '#D4A017',
    status: 'pending',
    sentBy: 'Campaign Manager',
    sentDate: '2025-12-18',
    expiresDate: '2025-12-25',
    inviteLink: 'https://admin.maltina.com/invite/ghi789'
  }
];

let mockUsers = [
  {
    id: 'USER-001',
    name: 'John Smith',
    email: 'john.smith@maltina.com',
    status: 'active',
    lastLogin: '2025-12-20 10:30 AM',
    dateAssigned: '2024-01-01'
  },
  {
    id: 'USER-002',
    name: 'Sarah Jones',
    email: 'sarah.jones@agency.com',
    status: 'active',
    lastLogin: '2025-12-16 03:45 PM',
    dateAssigned: '2024-01-01'
  },
  {
    id: 'USER-003',
    name: 'Michael Brown',
    email: 'michael.brown@maltina.com',
    status: 'active',
    lastLogin: '2025-12-18 09:15 AM',
    dateAssigned: '2025-06-15'
  }
];

// GET endpoints
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const resource = searchParams.get('resource');
    const roleId = searchParams.get('roleId');

    // Get roles
    if (resource === 'roles' || !resource) {
      return NextResponse.json(
        {
          success: true,
          data: mockRoles,
          meta: { total: mockRoles.length }
        },
        { status: 200 }
      );
    }

    // Get invites
    if (resource === 'invites') {
      return NextResponse.json(
        {
          success: true,
          data: mockInvites,
          meta: { total: mockInvites.length }
        },
        { status: 200 }
      );
    }

    // Get users for a role
    if (resource === 'role-users' && roleId) {
      return NextResponse.json(
        {
          success: true,
          data: mockUsers,
          meta: { roleId, total: mockUsers.length }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid resource' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET /api/user-accounts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// POST - Create role, send invite, create user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, role, invite, user } = body;

    // Create role
    if (action === 'createRole' && role) {
      const newRole = {
        ...role,
        id: `ROLE-${Date.now()}`,
        type: 'custom',
        createdDate: new Date().toISOString().split('T')[0],
        userCount: 0
      };
      mockRoles.push(newRole);

      return NextResponse.json(
        {
          success: true,
          message: 'Role created successfully',
          data: newRole
        },
        { status: 201 }
      );
    }

    // Send invite
    if (action === 'sendInvite' && invite) {
      const newInvite = {
        ...invite,
        id: `INV-${Date.now()}`,
        status: 'pending',
        sentDate: new Date().toISOString().split('T')[0],
        expiresDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        inviteLink: `https://admin.maltina.com/invite/${Math.random().toString(36).substr(2, 9)}`
      };
      mockInvites.push(newInvite);

      return NextResponse.json(
        {
          success: true,
          message: 'Invitation sent successfully',
          data: newInvite
        },
        { status: 201 }
      );
    }

    // Create user account
    if (action === 'createUser' && user) {
      const newUser = {
        ...user,
        id: `USER-${Date.now()}`,
        status: 'active',
        lastLogin: new Date().toISOString(),
        dateAssigned: new Date().toISOString().split('T')[0]
      };
      mockUsers.push(newUser);

      return NextResponse.json(
        {
          success: true,
          message: 'User account created successfully',
          data: newUser
        },
        { status: 201 }
      );
    }

    // Bulk upload users
    if (action === 'bulkUpload') {
      return NextResponse.json(
        {
          success: true,
          message: 'Users imported successfully',
          data: { usersCreated: 15, usersSkipped: 2 }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST /api/user-accounts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// PUT - Update role, resend invite
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, roleId, inviteId, data } = body;

    // Update role
    if (action === 'updateRole' && roleId) {
      const roleIndex = mockRoles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Role not found' },
          { status: 404 }
        );
      }

      mockRoles[roleIndex] = { ...mockRoles[roleIndex], ...data };

      return NextResponse.json(
        {
          success: true,
          message: 'Role updated successfully',
          data: mockRoles[roleIndex]
        },
        { status: 200 }
      );
    }

    // Resend invite
    if (action === 'resendInvite' && inviteId) {
      const inviteIndex = mockInvites.findIndex(i => i.id === inviteId);
      if (inviteIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Invite not found' },
          { status: 404 }
        );
      }

      mockInvites[inviteIndex].sentDate = new Date().toISOString().split('T')[0];
      mockInvites[inviteIndex].status = 'pending';

      return NextResponse.json(
        {
          success: true,
          message: 'Invitation resent successfully',
          data: mockInvites[inviteIndex]
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('PUT /api/user-accounts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update' },
      { status: 500 }
    );
  }
}

// DELETE - Delete role, revoke invite, remove user
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const roleId = searchParams.get('roleId');
    const inviteId = searchParams.get('inviteId');
    const userId = searchParams.get('userId');

    // Delete role
    if (action === 'deleteRole' && roleId) {
      const roleIndex = mockRoles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Role not found' },
          { status: 404 }
        );
      }

      // Prevent deletion of system roles
      if (mockRoles[roleIndex].type === 'system') {
        return NextResponse.json(
          { success: false, message: 'Cannot delete system roles' },
          { status: 403 }
        );
      }

      const deletedRole = mockRoles.splice(roleIndex, 1)[0];

      return NextResponse.json(
        {
          success: true,
          message: 'Role deleted successfully',
          data: deletedRole
        },
        { status: 200 }
      );
    }

    // Revoke invite
    if (action === 'revokeInvite' && inviteId) {
      const inviteIndex = mockInvites.findIndex(i => i.id === inviteId);
      if (inviteIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Invite not found' },
          { status: 404 }
        );
      }

      mockInvites[inviteIndex].status = 'revoked';

      return NextResponse.json(
        {
          success: true,
          message: 'Invitation revoked successfully',
          data: mockInvites[inviteIndex]
        },
        { status: 200 }
      );
    }

    // Remove user role
    if (action === 'removeUserRole' && userId) {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }

      const removedUser = mockUsers.splice(userIndex, 1)[0];

      return NextResponse.json(
        {
          success: true,
          message: 'User role removed successfully',
          data: removedUser
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('DELETE /api/user-accounts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete' },
      { status: 500 }
    );
  }
}
