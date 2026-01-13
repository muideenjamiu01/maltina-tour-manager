import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators/contact.validator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Log the contact form submission (in production, this would send an email or save to database)
    console.log('Contact form submission:', validatedData);
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid form data' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
