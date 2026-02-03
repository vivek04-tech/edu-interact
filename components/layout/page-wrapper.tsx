import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageWrapper: Global layout container for all pages
 * Ensures consistent padding, max-width, and hierarchy across entire platform
 */
export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`w-full bg-background text-foreground ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {children}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
}

/**
 * PageHeader: Consistent header component with title + description
 * Follows Antigravity principles: large, confident typography + calm whitespace
 */
export function PageHeader({ title, description, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16 lg:mb-20">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-4 text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg sm:text-xl text-muted-foreground mb-4">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageSection: Semantic wrapper for page sections with consistent spacing
 */
export function PageSection({ children, className = '' }: PageSectionProps) {
  return (
    <section className={`mb-12 sm:mb-16 lg:mb-20 ${className}`}>
      {children}
    </section>
  );
}
