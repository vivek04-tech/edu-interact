'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageWrapper } from '@/components/layout/page-wrapper';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role);
    setStep('credentials');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Redirect based on role
    switch (selectedRole) {
      case 'student':
        router.push('/student');
        break;
      case 'teacher':
        router.push('/teacher');
        break;
      case 'admin':
        router.push('/admin');
        break;
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />

      <main className="flex-1 flex items-center justify-center py-12 sm:py-16 px-4">
        <PageWrapper>
          <div className="max-w-md mx-auto">
            {/* Role Selection Step */}
            {step === 'role' && (
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  Get Started
                </h1>
                <p className="text-muted-foreground mb-12">
                  Choose your role to continue
                </p>

                <div className="space-y-4">
                  {/* Student Button */}
                  <button
                    onClick={() => handleRoleSelect('student')}
                    className="w-full p-6 border border-border rounded-lg hover:bg-secondary hover:border-foreground transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary rounded-lg text-primary-foreground flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5m0 0l9-5m-9 5v-10m0-1l-9-5m18 0l-9-5" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Student</h3>
                        <p className="text-sm text-muted-foreground">Learn and grow your career</p>
                      </div>
                      <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Teacher Button */}
                  <button
                    onClick={() => handleRoleSelect('teacher')}
                    className="w-full p-6 border border-border rounded-lg hover:bg-secondary hover:border-foreground transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary rounded-lg text-primary-foreground flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Teacher</h3>
                        <p className="text-sm text-muted-foreground">Share your expertise</p>
                      </div>
                      <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Admin Button */}
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className="w-full p-6 border border-border rounded-lg hover:bg-secondary hover:border-foreground transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary rounded-lg text-primary-foreground flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Admin</h3>
                        <p className="text-sm text-muted-foreground">Manage the platform</p>
                      </div>
                      <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Credentials Step */}
            {step === 'credentials' && selectedRole && (
              <div>
                {/* Back Button */}
                <button
                  onClick={() => {
                    setStep('role');
                    setEmail('');
                    setPassword('');
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {selectedRole === 'student' && 'Student Login'}
                  {selectedRole === 'teacher' && 'Teacher Login'}
                  {selectedRole === 'admin' && 'Admin Access'}
                </h1>
                <p className="text-muted-foreground mb-8">
                  Sign in to your {selectedRole} account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-card text-foreground placeholder-muted-foreground transition-all"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-card text-foreground placeholder-muted-foreground transition-all"
                      required
                    />
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-accent hover:text-accent/80 transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Demo Note */}
                <div className="mt-8 p-4 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Demo Mode:</strong> Use any email and password to proceed
                  </p>
                </div>

                {/* Sign Up */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                  Don't have an account?{' '}
                  <a href="#" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    Create one
                  </a>
                </p>
              </div>
            )}
          </div>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}
