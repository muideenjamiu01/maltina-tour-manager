import { NextRequest, NextResponse } from 'next/server';
import { mockVoters } from '@/data/voters-mock-data';

export interface VoteRequest {
  designId: number;
  designName: string;
  email?: string;
  phone?: string;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  data?: {
    voteId: string;
    designId: number;
    designName: string;
    votedAt: string;
  };
  error?: {
    type: 'ALREADY_VOTED' | 'INVALID_INPUT' | 'ERROR';
    previousVoteData?: {
      designName: string;
      voteDate: string;
    };
  };
}

// Simulate checking if voter already exists
function checkExistingVote(email?: string, phone?: string): any {
  if (email) {
    return mockVoters.find(v => v.email?.toLowerCase() === email.toLowerCase());
  }
  if (phone) {
    return mockVoters.find(v => v.phone === phone);
  }
  return null;
}

export async function POST(request: NextRequest): Promise<NextResponse<VoteResponse>> {
  try {
    const body: VoteRequest = await request.json();
    const { designId, designName, email, phone } = body;

    // Validate input
    if (!designId || !designName || (!email && !phone)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid vote data',
          error: {
            type: 'INVALID_INPUT',
          },
        },
        { status: 400 }
      );
    }

    // Check if voter already exists
    const existingVote = checkExistingVote(email, phone);
    if (existingVote) {
      return NextResponse.json(
        {
          success: false,
          message: 'You have already voted in this cycle',
          error: {
            type: 'ALREADY_VOTED',
            previousVoteData: {
              designName: existingVote.designName,
              voteDate: existingVote.voteDate,
            },
          },
        },
        { status: 409 }
      );
    }

    // Simulate successful vote recording
    const newVote = {
      id: `v${mockVoters.length + 1}`,
      email,
      phone,
      designId,
      designName,
      voteDate: new Date().toISOString(),
    };

    mockVoters.push(newVote);

    return NextResponse.json(
      {
        success: true,
        message: 'Vote recorded successfully',
        data: {
          voteId: newVote.id,
          designId,
          designName,
          votedAt: newVote.voteDate,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to record vote',
        error: {
          type: 'ERROR',
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  // Get all votes (for admin/analytics)
  return NextResponse.json({
    totalVotes: mockVoters.length,
    voters: mockVoters,
  });
}
