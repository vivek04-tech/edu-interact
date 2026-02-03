import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthFromRequest } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth || auth.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized. Only teachers can create courses.' },
        { status: 401 }
      );
    }

    const { title, description, university, price, trialDays } = await request.json();

    // Validation
    if (!title || !description || !university || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['aktu', 'lu'].includes(university)) {
      return NextResponse.json(
        { error: 'Invalid university' },
        { status: 400 }
      );
    }

    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Price must be a non-negative number' },
        { status: 400 }
      );
    }

    // Create course
    const course = new Course({
      title,
      description,
      university,
      price,
      trialDays: trialDays || 7,
      teacherId: auth.userId,
      isApproved: false, // Courses require admin approval
    });

    await course.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Course created successfully. Awaiting admin approval.',
        course,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create course error:', error);
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

    if (!auth || auth.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const courses = await Course.find({ teacherId: auth.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get teacher courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
