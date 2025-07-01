import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  title?: string;
  features?: Feature[];
  className?: string;
  columns?: number;
}

const defaultFeatures: Feature[] = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50'
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: '100% secure payment processing'
  },
  {
    icon: '📱',
    title: 'Mobile App',
    description: 'Shop on the go with our mobile app'
  },
  {
    icon: '🎁',
    title: 'Gift Cards',
    description: 'Perfect gifts for your loved ones'
  }
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  title = 'Why Choose Us?',
  features = defaultFeatures,
  className = '',
  columns = 4
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  const gridClass = gridCols[columns as keyof typeof gridCols] || gridCols[4];

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        )}

        <div className={`grid ${gridClass} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-3xl" role="img" aria-label={feature.title}>
                  {feature.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
