import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: FeatureProps[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="text-center">
      <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
        <div className="text-foreground">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * FeatureGrid: Responsive grid layout for platform features
 * Supports 2, 3, or 4 column layouts with consistent spacing
 */
export function FeatureGrid({
  features,
  title,
  description,
  columns = 3,
}: FeatureGridProps) {
  const gridClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div>
      {(title || description) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={`grid ${gridClass} gap-8 sm:gap-10 lg:gap-12`}>
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
