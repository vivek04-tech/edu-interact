'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';

export default function StudentDashboard() {
  const enrolledCourses = [
    { id: 1, name: 'Mathematics for Engineers', university: 'AKTU', progress: 65 },
    { id: 2, name: 'Web Development Fundamentals', university: 'AKTU', progress: 45 },
    { id: 3, name: 'Data Science 101', university: 'LU', progress: 80 },
  ];

  const opportunities = [
    { id: 1, type: 'internship', company: 'TechCorp', title: 'Frontend Developer Intern', applications: 120 },
    { id: 2, type: 'placement', company: 'DataSystems', title: 'Data Analyst - Full Time', applications: 85 },
    { id: 3, type: 'project', company: 'StartupXYZ', title: 'Mobile App Development Project', applications: 45 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />

      <main className="flex-1">
        <PageWrapper>
          {/* Header */}
          <PageSection className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Welcome back, Arjun!
                </h1>
                <p className="text-muted-foreground">
                  AKTU Affiliated | 6th Semester
                </p>
              </div>
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                View Profile
              </button>
            </div>
          </PageSection>

          {/* Stats Grid */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="p-6 border border-border rounded-lg bg-card">
                <p className="text-muted-foreground text-sm mb-2">Courses Enrolled</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-card">
                <p className="text-muted-foreground text-sm mb-2">Learning Hours</p>
                <p className="text-3xl font-bold text-foreground">127</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-card">
                <p className="text-muted-foreground text-sm mb-2">Certifications</p>
                <p className="text-3xl font-bold text-foreground">4</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-card">
                <p className="text-muted-foreground text-sm mb-2">Connections</p>
                <p className="text-3xl font-bold text-foreground">89</p>
              </div>
            </div>
          </PageSection>

          {/* Quick Navigation */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <Link href="/student/aktu" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">AKTU Courses</h3>
                <p className="text-sm text-muted-foreground">View your university courses</p>
                <p className="text-xs text-accent font-medium mt-4 group-hover:translate-x-1 transition-transform inline-block">
                  Explore →
                </p>
              </Link>
              <Link href="/student/lu" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">LU Courses</h3>
                <p className="text-sm text-muted-foreground">View Lucknow University courses</p>
                <p className="text-xs text-accent font-medium mt-4 group-hover:translate-x-1 transition-transform inline-block">
                  Explore →
                </p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">Internships</h3>
                <p className="text-sm text-muted-foreground">Apply for real opportunities</p>
                <p className="text-xs text-accent font-medium mt-4 group-hover:translate-x-1 transition-transform inline-block">
                  Explore →
                </p>
              </Link>
            </div>
          </PageSection>

          {/* Enrolled Courses */}
          <PageSection>
            <PageHeader
              title="Your Courses"
              description="Continue learning from where you left off"
            />
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.university}</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Career Opportunities */}
          <PageSection>
            <PageHeader
              title="Career Opportunities"
              description="Internships and placements matching your profile"
            />
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded">
                          {opportunity.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{opportunity.title}</h3>
                      <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{opportunity.applications} applicants</p>
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
