import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate validation
    if (!body.ageVerification || !body.parentGuardian || !body.childSchool) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate successful submission
    const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Design submitted successfully',
        submissionId,
        data: {
          ...body,
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Challenge submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simulate checking if submissions are open
  const isOpen = true; // Change this to false to simulate closed submissions

  return NextResponse.json({
    isOpen,
    closedDate: '2024-09-30',
    message: isOpen
      ? 'Submissions are currently open'
      : 'Submissions have closed for this year',
  });
}
