import React from 'react';

interface FestivalBannerProps {
  title?: string;
  subtitle?: string;
  discount?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export const FestivalBanner: React.FC<FestivalBannerProps> = ({
  title = 'Festival Sale',
  subtitle = 'Amazing deals and offers',
  discount = '50%',
  ctaText = 'Shop Now',
  ctaLink = '#',
  bgColor = '#f59e0b',
  textColor = '#ffffff',
  className = ''
}) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl mx-4 my-6 ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 transform -translate-x-16 -translate-y-16">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 transform translate-y-10">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 px-8 py-12 text-center md:px-12 md:py-16">
        {/* Discount Badge */}
        <div className="inline-block mb-4">
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-2xl md:text-3xl font-bold">
            {discount} OFF
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* CTA Button */}
        <a
          href={ctaLink}
          className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {ctaText}
          <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};