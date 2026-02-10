import { NextRequest, NextResponse } from 'next/server'
import voteDesigns from '@/data/vote-mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    await new Promise((r) => setTimeout(r, 150));

    const design = voteDesigns.find((d) => d.id === id);

    if (!design) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: design });
  } catch (error) {
    console.error("Vote single fetch error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
