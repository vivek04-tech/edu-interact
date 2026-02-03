import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthFromRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');

    const query: any = {};

    if (approved !== null) {
      query.isApproved = approved === 'true';
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
