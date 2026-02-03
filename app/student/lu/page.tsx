'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';

export default function LUCoursesPage() {
  const courses = [
    { id: 1, name: 'English Communication', semester: 1, duration: '6 weeks', enrolled: true, progress: 55 },
    { id: 2, name: 'Business Studies', semester: 1, duration: '8 weeks', enrolled: false, students: 287 },
    { id: 3, name: 'Mathematics for Commerce', semester: 2, duration: '8 weeks', enrolled: false, students: 201 },
    { id: 4, name: 'Accounting Basics', semester: 2, duration: '10 weeks', enrolled: true, progress: 72 },
    { id: 5, name: 'Economics Principles', semester: 3, duration: '8 weeks', enrolled: false, students: 165 },
    { id: 6, name: 'Management Fundamentals', semester: 3, duration: '9 weeks', enrolled: false, students: 214 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />

      <main className="flex-1">
        <PageWrapper>
          {/* Header */}
          <PageSection>
            <PageHeader
              title="Lucknow University Courses"
              description="Curriculum designed for Lucknow University students with comprehensive learning resources"
            />
          </PageSection>

          {/* Filters */}
          <PageSection>
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                All Courses
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                Enrolled
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                Semester 1
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                Semester 2
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                Semester 3
              </button>
            </div>
          </PageSection>

          {/* Course Grid */}
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all group cursor-pointer bg-card">
                  {/* Course Image Placeholder */}
                  <div className="h-40 bg-gradient-to-br from-secondary to-muted group-hover:from-accent/20 group-hover:to-secondary transition-all flex items-center justify-center">
                    <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                    </svg>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{course.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Semester {course.semester} · {course.duration}
                    </p>

                    {course.enrolled ? (
                      <>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <p className="text-xs font-medium text-foreground">{course.progress}%</p>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          Continue Learning
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-muted-foreground mb-4">{course.students} students enrolled</p>
                        <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors">
                          Enroll Now
                        </button>
                      </>
                    )}
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
