import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthFromRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const university = searchParams.get('university');
    const approved = searchParams.get('approved') === 'true';

    // Build query
    const query: any = {};

    if (university && ['aktu', 'lu'].includes(university)) {
      query.university = university;
    }

    if (approved) {
      query.isApproved = true;
    }

    const courses = await Course.find(query)
      .populate('teacherId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
