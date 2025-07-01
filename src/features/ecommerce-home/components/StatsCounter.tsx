import React from 'react';

interface StatsCounterProps {
  title?: string;
  stats?: Array<{
    id: string;
    value: string;
    label: string;
    icon?: string;
    color?: string;
  }>;
  layout?: 'horizontal' | 'vertical';
  animated?: boolean;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  title = "By the Numbers",
  stats = [],
  layout = 'horizontal',
  animated = true
}) => {
  const defaultStats = [
    {
      id: '1',
      value: '10K+',
      label: 'Happy Users',
      icon: '👥',
      color: '#3b82f6'
    },
    {
      id: '2',
      value: '99.9%',
      label: 'Uptime',
      icon: '⚡',
      color: '#10b981'
    },
    {
      id: '3',
      value: '50+',
      label: 'Components',
      icon: '🧩',
      color: '#f59e0b'
    },
    {
      id: '4',
      value: '24/7',
      label: 'Support',
      icon: '🛟',
      color: '#ef4444'
    }
  ];

  const statsToRender = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {title}
          </h2>
        )}
        
        <div 
          className={`grid gap-8 ${
            layout === 'horizontal' 
              ? `grid-cols-2 md:grid-cols-${Math.min(4, statsToRender.length)}` 
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {statsToRender.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center ${animated ? 'animate-bounce' : ''}`}
              style={{ 
                animationDelay: animated ? `${index * 0.2}s` : '0s',
                animationDuration: animated ? '2s' : '0s'
              }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-lg opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
