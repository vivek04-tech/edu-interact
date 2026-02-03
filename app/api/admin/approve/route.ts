// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Course from '@/lib/models/Course';
import { getAuthFromRequest } from '@/lib/middleware';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { type, id, approved } = await request.json();

    if (!['user', 'course'].includes(type) || !id || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

     if (type === 'user') {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { isApproved: approved },
         { new: true }
        ).select('-password');


      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: `User ${approved ? 'approved' : 'rejected'} successfully`,
          user,
        },
        { status: 200 }
      );
    } else if (type === 'course') {
      const course = await Course.findByIdAndUpdate(
        id,
        { isApproved: approved },
        { new: true }
      ).populate('teacherId', 'name email');

      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: `Course ${approved ? 'approved' : 'rejected'} successfully`,
          course,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
