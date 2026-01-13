import { NextRequest, NextResponse } from 'next/server';
import { tourMetrics, mockSchools } from '@/data/tour-mock-data';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: {
        metrics: tourMetrics,
        schools: mockSchools,
      },
    });
  } catch (error) {
    console.error('Tour data fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tour data' },
      { status: 500 }
    );
  }
}
