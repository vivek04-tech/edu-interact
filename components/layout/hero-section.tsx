import React from 'react';

interface HeroSectionProps {
  title: React.ReactNode;
  description: string;
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
}

/**
 * HeroSection: Premium landing section with large typography
 * Antigravity-inspired with confident hierarchy and whitespace
 */
export function HeroSection({
  title,
  description,
  cta,
  secondaryCta,
  className = '',
}: HeroSectionProps) {
  return (
    <div className={`relative w-full py-20 sm:py-28 lg:py-36 ${className}`}>
      {/* Background elements - minimal and calm */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-muted rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6 sm:mb-8 text-balance">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* CTAs */}
        {(cta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta && (
              <a
                href={cta.href}
                className="inline-flex items-center justify-center px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                {cta.text}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3 sm:py-4 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
              >
                {secondaryCta.text}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
