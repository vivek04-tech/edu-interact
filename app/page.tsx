"use client";

import React from 'react';
import InstallButton from '@/components/InstallButton';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/layout/hero-section';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';
import { RoleCard } from '@/components/layout/role-card';
import { FeatureGrid } from '@/components/layout/feature-grid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header showNav={true} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title={
            <span>
              Your Gateway to{' '}
              <span className="text-accent">Learning, Career,</span>{' '}
              and Success
            </span>
          }
          description="Master university courses from expert educators. Connect with peers. Secure internships and placements at top companies."
          cta={{ text: 'Get Started', href: '/login' }}
          secondaryCta={{ text: 'Learn More', href: '#features' }}
        />

        {/* ✅ INSTALL APP BUTTON */}
        <div className="flex justify-center mt-6">
          <InstallButton />
        </div>

        <PageWrapper>
          {/* Platform Overview Section */}
          <PageSection>
            <PageHeader
              title="Why Choose Edu-Interact?"
              subtitle="A unified platform for every stage of your academic and professional journey"
            />

            <FeatureGrid
              columns={3}
              features={[
                 {
                title: 'Learn from Experts',
                  description: 'Access structured courses taught by industry professionals and university faculty with real-world insights.',
                },
                {
                  title: 'Connect & Collaborate',
                  description: 'Learn from peers, share knowledge, and build your professional network within your university community.',
                },
                {
                  title: 'Accelerate Your Career',
                  description: 'Access real company projects, internship opportunities, and direct placement drives from top organizations.',
                },
              ]}
            />
          </PageSection>

          {/* User Roles Section */}
          <PageSection>
            <div id="roles">
              <PageHeader
                title="Choose Your Path"
                description="Edu-Interact is designed for three distinct user groups. Select your role to explore features tailored just for you."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <RoleCard
                  title="Student"
                  description="Master your field, grow your network, and land your dream career."
                  features={[
                    'Access curated courses for your university',
                    'Learn from industry experts and mentors',
                    'Join study groups and collaborate with peers',
                    'Apply for internships and placements',
                    '7-day free trial on premium courses',
                  ]}
                  href="/login"
                  ctaText="Start Learning"
                />

                <RoleCard
                  title="Teacher"
                  description="Share your expertise and inspire the next generation of professionals."
                  features={[
                    'Create and manage university-specific courses',
                    'Upload video lectures, notes, and assignments',
                    'Track student progress in real-time',
                    'Build your teaching portfolio',
                    'Earn revenue from your courses',
                  ]}
                  href="/login"
                  ctaText="Start Teaching"
                />

                <RoleCard
                  title="Admin"
                  description="Manage the platform, approve content, and drive ecosystem growth."
                  features={[
                    'Approve teachers and courses',
                    'Manage student and teacher accounts',
                    'Create internship and placement drives',
                    'Add company partners and projects',
                    'Monitor platform analytics',
                  ]}
                  href="/login"
                  ctaText="Manage Platform"
                />
              </div>
            </div>
          </PageSection>

          {/* Features Section */}
          <PageSection>
            <div id="features">
              <PageHeader
                title="Comprehensive Features"
                description="Everything you need to succeed in one platform"
              />

              <FeatureGrid
                columns={2}
                features={[
                  {
                   title: 'Structured Learning Paths',
                    description: 'Organized curriculum tailored to each university and course level.',
                  },
                  {
                    title: 'Flexible Pricing',
                    description: '7-day free trial for students with affordable subscriptions.',
                  },
                ]}
              />
            </div>
          </PageSection>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}
