import { NextRequest, NextResponse } from 'next/server';
import { step3Schema } from '@/lib/validators/nomination.validator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = step3Schema.parse(body);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Log the nomination (in production, this would save to database)
    console.log('School nomination submitted:', validatedData);
    
    return NextResponse.json({
      success: true,
      message: 'Your nomination has been successfully submitted.',
      data: {
        schoolName: validatedData.schoolName,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Nomination submission error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid form data. Please check all fields.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to submit nomination. Please try again.' },
      { status: 500 }
    );
  }
}
