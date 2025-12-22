import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const users = [
  {
    id: '1',
    email: 'admin@maltina.com',
    password: 'admin123', // In production, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    email: 'user@maltina.com',
    password: 'user123',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    status: 'active',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create mock tokens
    const accessToken = `mock-access-token-${user.id}-${Date.now()}`;
    const refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        user: {
          ...userWithoutPassword,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}