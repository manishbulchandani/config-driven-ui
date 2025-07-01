import React from 'react';

interface CardGridProps {
  title?: string;
  cards?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    color?: string;
    imageUrl?: string; // For future image implementation
  }>;
  columns?: number;
  spacing?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  title = "Features",
  cards = [],
  columns = 3,
  spacing = "2rem"
}) => {
  const defaultCards = [
    {
      id: '1',
      title: 'Fast Performance',
      description: 'Lightning fast loading and smooth interactions',
      icon: '⚡',
      color: '#f59e0b'
    },
    {
      id: '2', 
      title: 'Responsive Design',
      description: 'Perfect on all devices and screen sizes',
      icon: '📱',
      color: '#3b82f6'
    },
    {
      id: '3',
      title: 'Easy to Use',
      description: 'Intuitive interface that anyone can master',
      icon: '🎯',
      color: '#10b981'
    }
  ];

  const cardsToRender = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="py-16 px-6">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
      )}
      
      <div 
        className="max-w-6xl mx-auto grid gap-8"
        style={{
          gridTemplateColumns: `repeat(${Math.min(columns, cardsToRender.length)}, 1fr)`,
          gap: spacing
        }}
      >
        {cardsToRender.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* TODO: Add image support */}
            {/* {card.imageUrl && (
              <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
            )} */}
            
            <div className="p-8 text-center">
              <div
                className="text-4xl mb-4 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
