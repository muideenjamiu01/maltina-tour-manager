import { NextRequest, NextResponse } from 'next/server';
import { mockSchools } from '@/data/tour-mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const school = mockSchools.find((s) => s.id === id);

    if (!school) {
      return NextResponse.json(
        { success: false, error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: school,
    });
  } catch (error) {
    console.error('School detail fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch school details' },
      { status: 500 }
    );
  }
}
