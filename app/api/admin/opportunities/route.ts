import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Opportunity from '@/lib/models/Opportunity';
import Company from '@/lib/models/Company';
import { getAuthFromRequest } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = await getAuthFromRequest(request);

    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      type,
      title,
      description,
      companyId,
      university,
      stipend,
      duration,
      applicationDeadline,
    } = await request.json();

    if (!type || !title || !description || !companyId || !applicationDeadline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['project', 'internship', 'placement'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid opportunity type' },
        { status: 400 }
      );
    }

    // Verify company exists
    const company = await Company.findById(companyId);

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const opportunity = new Opportunity({
      type,
      title,
      description,
      companyId,
      university: university || 'all',
      stipend: stipend || null,
      duration: duration || null,
      applicationDeadline: new Date(applicationDeadline),
    });

    await opportunity.save();

    const populatedOpportunity = await opportunity.populate('companyId', 'name');

    return NextResponse.json(
      {
        success: true,
        message: 'Opportunity created successfully',
        opportunity: populatedOpportunity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create opportunity error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const query: any = {};

    if (type && ['project', 'internship', 'placement'].includes(type)) {
      query.type = type;
    }

    if (status && ['open', 'closed', 'archived'].includes(status)) {
      query.status = status;
    }

    const opportunities = await Opportunity.find(query)
      .populate('companyId', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        opportunities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get opportunities error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
