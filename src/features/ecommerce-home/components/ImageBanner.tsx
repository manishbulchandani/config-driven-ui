import React from 'react';

interface ImageBannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  imageUrl?: string; // For future image implementation
  height?: string;
  overlay?: boolean;
}

export const ImageBanner: React.FC<ImageBannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundColor = '#6366f1',
  textColor = '#ffffff',
  imageUrl, // TODO: Add image support
  height = '400px',
  overlay = true
}) => {
  return (
    <div 
      className="relative flex items-center justify-center text-center overflow-hidden rounded-lg"
      style={{
        background: imageUrl 
          ? `linear-gradient(${overlay ? 'rgba(0,0,0,0.5), rgba(0,0,0,0.5)' : 'transparent'}, transparent), url(${imageUrl}) center/cover`
          : `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}dd)`,
        height,
        color: textColor
      }}
    >
      {/* TODO: Replace with actual image */}
      {/* <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" /> */}
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <a
            href={ctaLink || '#'}
            className="inline-block px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-lg font-semibold hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};
