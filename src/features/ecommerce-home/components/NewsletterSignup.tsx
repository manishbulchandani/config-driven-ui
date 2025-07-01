import React, { useState } from 'react';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  onSubmit?: (email: string) => void;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = 'Stay Updated',
  description = 'Get the latest deals and updates delivered to your inbox',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  className = '',
  onSubmit
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-green-100 border border-green-300 rounded-lg p-8">
            <div className="flex justify-center mb-4">
              <svg 
                className="w-16 h-16 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Thank You for Subscribing!
            </h3>
            <p className="text-green-700">
              You'll receive our latest updates and exclusive offers in your inbox.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-green-600 hover:text-green-800 font-medium"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg mb-8 opacity-90">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white'
                } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={isSubmitting}
              />
              {error && (
                <p className="text-red-600 text-sm mt-2 text-left">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Subscribing...
                </div>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>

        <p className="text-sm opacity-75 mt-4">
          By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};
