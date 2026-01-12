import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API Handler for Roles & Permissions Management
 * Used during frontend development while backend APIs are not ready
 */

// Mock data store (in-memory for demo, would be database in production)
let mockRoles = [
  {
    id: 'tour-supervisor',
    name: 'Tour Supervisor',
    description: 'Field lead for school day — controls the session, manages facilitators, and monitors surveys',
    userCount: 36,
    type: 'system',
    color: '#F5A623',
    pwaName: 'School Tour PWA',
    canCreateAccounts: false,
    summary: 'Control tower for one school session',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'tour-analyst',
    name: 'Tour Analyst',
    description: 'Data collector locked behind Supervisor start/unlock — fills surveys only',
    userCount: 48,
    type: 'system',
    color: '#2F6B3C',
    pwaName: 'School Tour PWA',
    canCreateAccounts: false,
    summary: 'Survey runner, waits for supervisor activation',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'recee-officer',
    name: 'RECEE Officer',
    description: 'School inspection and verification — separate lane, approve or reject schools for tour',
    userCount: 24,
    type: 'system',
    color: '#8C1D18',
    pwaName: 'RECEE PWA',
    canCreateAccounts: false,
    summary: 'Inspections only, separate lane',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'facilitator',
    name: 'Facilitator',
    description: 'Assigned schools only — read-only access plus messaging to supervisor',
    userCount: 245,
    type: 'system',
    color: '#D4A017',
    pwaName: 'Facilitator PWA',
    canCreateAccounts: false,
    summary: 'View assigned schools + messaging',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'judge',
    name: 'Judge',
    description: 'Competition designs only — totally walled off from tour operations',
    userCount: 12,
    type: 'system',
    color: '#2F6B3C',
    pwaName: 'Judge PWA',
    canCreateAccounts: false,
    summary: 'Designs only, no tour access',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
];

// GET /api/roles-permissions - List all roles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const roleId = searchParams.get('roleId');
    const action = searchParams.get('action');

    // Get single role
    if (roleId) {
      const role = mockRoles.find((r) => r.id === roleId);
      if (!role) {
        return NextResponse.json(
          { success: false, message: 'Role not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: role }, { status: 200 });
    }

    // List all roles
    if (action === 'list') {
      return NextResponse.json(
        {
          success: true,
          data: mockRoles,
          meta: {
            total: mockRoles.length,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, data: mockRoles },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/roles-permissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}

// POST /api/roles-permissions - Create or update roles
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, role, roleId, permissions } = body;

    // Update role permissions
    if (action === 'updatePermissions' && roleId) {
      const roleIndex = mockRoles.findIndex((r) => r.id === roleId);
      if (roleIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Role not found' },
          { status: 404 }
        );
      }

      mockRoles[roleIndex] = {
        ...mockRoles[roleIndex],
        updatedAt: new Date(),
      };

      return NextResponse.json(
        {
          success: true,
          message: 'Permissions updated successfully',
          data: mockRoles[roleIndex],
        },
        { status: 200 }
      );
    }

    // Create new role
    if (action === 'create' && role) {
      const newRole = {
        ...role,
        id: role.id || `role-${Date.now()}`,
        type: 'custom',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRoles.push(newRole);

      return NextResponse.json(
        {
          success: true,
          message: 'Role created successfully',
          data: newRole,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid request action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST /api/roles-permissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// PUT /api/roles-permissions - Update specific role
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { roleId, data } = body;

    if (!roleId) {
      return NextResponse.json(
        { success: false, message: 'Role ID is required' },
        { status: 400 }
      );
    }

    const roleIndex = mockRoles.findIndex((r) => r.id === roleId);
    if (roleIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    mockRoles[roleIndex] = {
      ...mockRoles[roleIndex],
      ...data,
      updatedAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Role updated successfully',
        data: mockRoles[roleIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT /api/roles-permissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update role' },
      { status: 500 }
    );
  }
}

// DELETE /api/roles-permissions - Delete role
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const roleId = searchParams.get('roleId');

    if (!roleId) {
      return NextResponse.json(
        { success: false, message: 'Role ID is required' },
        { status: 400 }
      );
    }

    // Prevent deletion of system roles
    if (['tour-supervisor', 'tour-analyst', 'recee-officer', 'facilitator', 'judge'].includes(roleId)) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete system roles' },
        { status: 403 }
      );
    }

    const roleIndex = mockRoles.findIndex((r) => r.id === roleId);
    if (roleIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    const deletedRole = mockRoles.splice(roleIndex, 1)[0];

    return NextResponse.json(
      {
        success: true,
        message: 'Role deleted successfully',
        data: deletedRole,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/roles-permissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete role' },
      { status: 500 }
    );
  }
}
