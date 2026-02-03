import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
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

    const { name, description, logo, website } = await request.json();

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const existingCompany = await Company.findOne({ name });

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company already exists' },
        { status: 400 }
      );
    }

    const company = new Company({
      name,
      description,
      logo: logo || '',
      website: website || '',
    });

    await company.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Company created successfully',
        company,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create company error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const companies = await Company.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        companies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get companies error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
