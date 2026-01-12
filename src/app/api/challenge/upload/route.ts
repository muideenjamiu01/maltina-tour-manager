import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (10MB for images, 50MB for videos)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png'];
    const validVideoTypes = ['video/mp4', 'video/quicktime'];
    
    if (type === 'image' && !validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid image format. Only JPG and PNG are allowed' },
        { status: 400 }
      );
    }

    if (type === 'video' && !validVideoTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid video format. Only MP4 and MOV are allowed' },
        { status: 400 }
      );
    }

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In production, you would upload to cloud storage (S3, Cloudinary, etc.)
    const fileUrl = `https://storage.example.com/uploads/${Date.now()}-${file.name}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
