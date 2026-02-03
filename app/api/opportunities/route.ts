import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Opportunity from '@/lib/models/Opportunity';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const university = searchParams.get('university');

    const query: any = { status: 'open' };

    if (type && ['project', 'internship', 'placement'].includes(type)) {
      query.type = type;
    }

    if (university && ['aktu', 'lu'].includes(university)) {
      query.$or = [{ university: university }, { university: 'all' }];
    }

    const opportunities = await Opportunity.find(query)
      .populate('companyId', 'name description logo')
      .sort({ applicationDeadline: 1 });

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
