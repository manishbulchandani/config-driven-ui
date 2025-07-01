import React from 'react';

interface TestimonialProps {
  testimonials?: Array<{
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatarUrl?: string; // For future image implementation
    companyLogo?: string; // For future image implementation
  }>;
  layout?: 'carousel' | 'grid';
  showRatings?: boolean;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonials = [],
  layout = 'grid',
  showRatings = true
}) => {
  const defaultTestimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      content: 'This config-driven approach has revolutionized how we build UIs. The flexibility and speed of development is incredible!',
      rating: 5,
      avatarUrl: '/avatars/sarah.jpg' // TODO: Add actual avatar images
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Lead Developer at StartupXYZ',
      content: 'We reduced our development time by 70% using this framework. The component registry system is brilliant.',
      rating: 5,
      avatarUrl: '/avatars/michael.jpg' // TODO: Add actual avatar images
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'UX Designer at DesignStudio',
      content: 'Finally, a system where designers and developers can collaborate seamlessly. Game changer!',
      rating: 5,
      avatarUrl: '/avatars/emily.jpg' // TODO: Add actual avatar images
    }
  ];

  const testimonialsToRender = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Users Say
        </h2>
        
        <div className={`grid gap-8 ${layout === 'grid' ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
          {testimonialsToRender.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              {showRatings && (
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                {/* TODO: Replace with actual avatar image */}
                {/* <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                /> */}
                <div 
                  className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: `hsl(${testimonial.name.charCodeAt(0) * 137.5 % 360}, 70%, 50%)` }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
