import React from 'react';
import Link from 'next/link';

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  ctaText?: string;
}

/**
 * RoleCard: Featured card for each user role (Student, Teacher, Admin)
 * Clean design with hierarchy and minimal styling
 */
export function RoleCard({
  icon,
  title,
  description,
  features,
  href,
  ctaText = 'Get Started',
}: RoleCardProps) {
  return (
    <Link href={href}>
      <div className="group relative h-full p-6 sm:p-8 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* Icon */}
        <div className="mb-6 inline-block p-3 bg-primary rounded-lg text-primary-foreground">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
          {ctaText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
