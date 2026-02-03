'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';

export default function TeacherDashboard() {
  const courses = [
    { id: 1, name: 'Advanced JavaScript', university: 'AKTU', students: 284, rating: 4.8 },
    { id: 2, name: 'React Mastery', university: 'AKTU', students: 156, rating: 4.9 },
    { id: 3, name: 'Web Development Bootcamp', university: 'LU', students: 89, rating: 4.7 },
  ];

  const stats = [
    { label: 'Active Courses', value: 3 },
    { label: 'Total Students', value: 529 },
    { label: 'Avg. Rating', value: '4.8' },
    { label: 'Revenue (Month)', value: '₹45.2K' },
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
                  Teaching Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your courses and track student progress
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                + Create Course
              </button>
            </div>
          </PageSection>

          {/* Stats Grid */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Courses Management */}
          <PageSection>
            <PageHeader
              title="Your Courses"
              description="Manage course content, assignments, and student progress"
            />
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.university}</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-medium text-accent hover:bg-secondary rounded transition-colors">
                      Manage
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Students Enrolled</p>
                        <p className="text-lg font-semibold text-foreground">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Rating</p>
                        <p className="text-lg font-semibold text-accent flex items-center gap-1">
                          ★ {course.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Quick Actions */}
          <PageSection>
            <PageHeader title="Course Management" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">Upload Lecture</h3>
                <p className="text-sm text-muted-foreground">Add video or audio content</p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">Create Assignment</h3>
                <p className="text-sm text-muted-foreground">Set homework for students</p>
              </Link>
              <Link href="#" className="p-6 border border-border rounded-lg hover:bg-secondary transition-colors group">
                <h3 className="font-semibold text-foreground mb-2">View Submissions</h3>
                <p className="text-sm text-muted-foreground">Grade student work</p>
              </Link>
            </div>
          </PageSection>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}
