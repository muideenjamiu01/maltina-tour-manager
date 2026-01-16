import { NextRequest, NextResponse } from 'next/server'
import voteDesigns from '@/data/vote-mock-data'

type VoteBody = {
  id?: number
  email?: string
  mobile?: string
}

export async function GET() {
  // Return all designs (simulate small delay)
  await new Promise((r) => setTimeout(r, 150))
  return NextResponse.json({ data: voteDesigns })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VoteBody

    // Basic validation
    if (!body.id || !body.email || !body.mobile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 800))

    const id = Number(body.id)
    const design = voteDesigns.find((d) => d.id === id)
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    // Increment in-memory vote count (mock persistence)
    design.votes = (design.votes || 0) + 1

    // Log vote (in production you'd persist and verify uniqueness)
    console.log('Vote received:', { designId: id, email: body.email, mobile: body.mobile })

    return NextResponse.json({ success: true, message: 'Vote recorded', data: { id, votes: design.votes } }, { status: 201 })
  } catch (error) {
    console.error('Vote API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
