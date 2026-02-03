'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: '12,482', change: '+8.2%' },
    { label: 'Active Teachers', value: '287', change: '+3.1%' },
    { label: 'Published Courses', value: '1,043', change: '+12.4%' },
    { label: 'Platform Revenue', value: '₹524.8K', change: '+15.3%' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Teacher', name: 'Dr. Ravi Kumar', university: 'AKTU', status: 'pending' },
    { id: 2, type: 'Course', name: 'Machine Learning Advanced', teacher: 'Prof. Sharma', status: 'pending' },
    { id: 3, type: 'Course', name: 'Cloud Computing Essentials', teacher: 'Dr. Patel', status: 'pending' },
  ];

  const recentDrives = [
    { id: 1, company: 'Google', position: 'SDE Intern', openings: 15, applicants: 324 },
    { id: 2, company: 'Microsoft', position: 'Cloud Architect', openings: 8, applicants: 212 },
    { id: 3, company: 'Amazon', position: 'DevOps Engineer', openings: 12, applicants: 456 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />

      <main className="flex-1">
        <PageWrapper>
          {/* Header */}
          <PageSection className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Platform Administration
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage all platform activities
            </p>
          </PageSection>

          {/* Key Metrics */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 border border-border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Admin Navigation Grid */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <svg className="w-6 h-6 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3.545M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                <h3 className="font-semibold text-foreground mb-1">Manage Students</h3>
                <p className="text-xs text-muted-foreground">View, edit, or remove students</p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <svg className="w-6 h-6 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="font-semibold text-foreground mb-1">Manage Teachers</h3>
                <p className="text-xs text-muted-foreground">Approve and manage teachers</p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <svg className="w-6 h-6 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                </svg>
                <h3 className="font-semibold text-foreground mb-1">Manage Courses</h3>
                <p className="text-xs text-muted-foreground">Approve and moderate courses</p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <svg className="w-6 h-6 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m5.581 0a2 2 0 100-4 2 2 0 000 4m0-16L9 9m0 0L5 5m4 4l4-4" />
                </svg>
                <h3 className="font-semibold text-foreground mb-1">Career Drives</h3>
                <p className="text-xs text-muted-foreground">Create internships & placements</p>
              </Link>
            </div>
          </PageSection>

          {/* Pending Approvals */}
          <PageSection>
            <PageHeader
              title="Pending Approvals"
              description="Review and approve pending teacher and course submissions"
            />
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                          {item.type}
                        </span>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.type === 'Teacher' ? `${item.university}` : `${item.teacher}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium border border-border text-foreground rounded hover:bg-secondary transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Active Placement Drives */}
          <PageSection>
            <PageHeader
              title="Placement Drives"
              description="Active internships and placement opportunities"
            />
            <div className="space-y-4">
              {recentDrives.map((drive) => (
                <div key={drive.id} className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{drive.company}</h3>
                      <p className="text-sm text-muted-foreground">{drive.position}</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-medium text-accent hover:opacity-70 transition-opacity">
                      Manage
                    </button>
                  </div>
                  <div className="flex gap-6 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Openings</p>
                      <p className="font-semibold text-foreground">{drive.openings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Applications</p>
                      <p className="font-semibold text-foreground">{drive.applicants}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}
