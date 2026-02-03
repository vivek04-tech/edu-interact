import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enrollment from '@/lib/models/Enrollment';
import Course from '@/lib/models/Course';
import { getAuthFromRequest } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth || auth.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Check if course exists and is approved
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    if (!course.isApproved) {
      return NextResponse.json(
        { error: 'Course is not approved yet' },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: auth.userId,
      courseId,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment with trial period
    const trialStartDate = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + course.trialDays);

    const enrollment = new Enrollment({
      userId: auth.userId,
      courseId,
      trialStartDate,
      trialEndDate,
      status: 'active',
    });

    await enrollment.save();

    const enrollmentData = await enrollment.populate('courseId', 'title');

    return NextResponse.json(
      {
        success: true,
        message: 'Enrolled successfully',
        enrollment: enrollmentData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const enrollments = await Enrollment.find({ userId: auth.userId })
      .populate('courseId')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        enrollments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get enrollments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
