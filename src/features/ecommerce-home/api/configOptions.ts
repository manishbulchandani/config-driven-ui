import type { UIConfig } from '../../../lib/hybrid-ui/types';

// Configuration 1: E-commerce Focus (Original)
export const ecommerceConfig: UIConfig = {
  id: 'ecommerce-home-v1',
  version: '1.0.0',
  metadata: {
    name: 'E-commerce Homepage',
    description: 'Traditional e-commerce layout with product focus',
    tags: ['ecommerce', 'shopping', 'products'],
    author: 'Demo Team',
    createdAt: new Date().toISOString(),
    performance: {
      priority: 'high',
      preload: true
    }
  },
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        muted: '#94a3b8'
      },
      border: '#e2e8f0',
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem'
    }
  },
  layout: {
    type: 'flex',
    direction: 'column',
    gap: '0',
    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100',
  },
  components: [
    {
      id: 'navbar-1',
      type: 'Navbar',
      order: 1,
      props: {
        logo: 'ShopMart',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Sale', href: '/sale' },
          { label: 'Contact', href: '/contact' }
        ],
        showSearch: true,
        cartCount: 3,
        className: 'shadow-lg backdrop-blur-sm bg-white/90'
      }
    },
    {
      id: 'festival-banner-1',
      type: 'FestivalBanner',
      order: 2,
      props: {
        title: 'Black Friday Sale',
        subtitle: 'Up to 70% off on everything!',
        discount: '70%',
        ctaText: 'Shop Now',
        ctaLink: '/sale',
        bgColor: '#1f2937',
        textColor: '#ffffff'
      }
    },
    {
      id: 'product-grid-1',
      type: 'ProductGrid',
      order: 3,
      props: {
        title: 'Featured Products',
        category: 'electronics',
        limit: 8,
        showFilters: true
      }
    },
    {
      id: 'newsletter-1',
      type: 'NewsletterSignup',
      order: 4,
      props: {
        title: 'Stay Updated',
        subtitle: 'Get notified about new products and exclusive deals'
      }
    },
    {
      id: 'footer-1',
      type: 'Footer',
      order: 5,
      props: {
        companyName: 'ShopMart',
        links: [
          { text: 'About Us', href: '/about' },
          { text: 'Support', href: '/support' },
          { text: 'Privacy', href: '/privacy' }
        ],
        socialMedia: [
          { platform: 'facebook', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'instagram', url: '#' }
        ]
      }
    }
  ]
};

// Configuration 2: SaaS/Business Focus
export const saasConfig: UIConfig = {
  id: 'saas-landing-v1',
  version: '1.0.0',
  metadata: {
    name: 'SaaS Landing Page',
    description: 'Modern SaaS business landing page',
    tags: ['saas', 'business', 'landing'],
    author: 'Demo Team',
    createdAt: new Date().toISOString()
  },
  theme: {
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        muted: '#94a3b8'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem',
      xxl: '6rem'
    }
  },
  layout: {
    type: 'flex',
    direction: 'column',
    gap: '0',
    className: 'min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50'
  },
  components: [
    {
      id: 'navbar-saas',
      type: 'Navbar',
      order: 1,
      props: {
        logo: 'ConfigUI Pro',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: '/docs' },
          { label: 'Contact', href: '/contact' }
        ],
        showSearch: false,
        ctaText: 'Start Free Trial',
        className: 'bg-white/80 backdrop-blur-md shadow-sm border-b'
      }
    },
    {
      id: 'hero-banner',
      type: 'ImageBanner',
      order: 2,
      props: {
        title: 'Build UIs at Lightning Speed',
        subtitle: 'Config-driven development that scales with your team. No more repetitive coding.',
        ctaText: 'Start Building →',
        ctaLink: '/get-started',
        backgroundColor: '#6366f1',
        height: '600px'
        // TODO: Add hero background image: imageUrl: '/images/hero-bg.jpg'
      }
    },
    {
      id: 'stats-section',
      type: 'StatsCounter',
      order: 3,
      props: {
        title: 'Trusted by Developers Worldwide',
        animated: true
      }
    },
    {
      id: 'features-cards',
      type: 'CardGrid',
      order: 4,
      props: {
        title: 'Why Choose ConfigUI?',
        columns: 3,
        cards: [
          {
            id: '1',
            title: 'Type-Safe',
            description: 'Full TypeScript support with comprehensive type definitions',
            icon: '🛡️',
            color: '#3b82f6'
            // TODO: Add feature image: imageUrl: '/images/typescript.jpg'
          },
          {
            id: '2',
            title: 'Performance First',
            description: 'Built-in optimizations, lazy loading, and performance monitoring',
            icon: '⚡',
            color: '#10b981'
            // TODO: Add performance image: imageUrl: '/images/performance.jpg'
          },
          {
            id: '3',
            title: 'Developer Experience',
            description: 'Intuitive APIs, great docs, and amazing debugging tools',
            icon: '💎',
            color: '#f59e0b'
            // TODO: Add DX image: imageUrl: '/images/developer-experience.jpg'
          }
        ]
      }
    },
    {
      id: 'testimonials',
      type: 'Testimonial',
      order: 5,
      props: {
        layout: 'grid',
        showRatings: true
      }
    },
    {
      id: 'footer-saas',
      type: 'Footer',
      order: 6,
      props: {
        companyName: 'ConfigUI Pro',
        links: [
          { text: 'Documentation', href: '/docs' },
          { text: 'API Reference', href: '/api' },
          { text: 'Support', href: '/support' },
          { text: 'Status', href: '/status' }
        ],
        socialMedia: [
          { platform: 'github', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'discord', url: '#' }
        ]
      }
    }
  ]
};

// Configuration 3: Portfolio/Agency Focus
export const portfolioConfig: UIConfig = {
  id: 'portfolio-agency-v1',
  version: '1.0.0',
  metadata: {
    name: 'Creative Portfolio',
    description: 'Modern portfolio and agency website',
    tags: ['portfolio', 'creative', 'agency'],
    author: 'Demo Team',
    createdAt: new Date().toISOString()
  },
  theme: {
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f9fafb'
    },
    spacing: {
      xs: '0.75rem',
      sm: '1.5rem',
      md: '3rem',
      lg: '4rem',
      xl: '6rem',
      xxl: '8rem'
    }
  },
  layout: {
    type: 'flex',
    direction: 'column',
    gap: '0',
    className: 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black'
  },
  components: [
    {
      id: 'navbar-portfolio',
      type: 'Navbar',
      order: 1,
      props: {
        logo: 'Creative Studio',
        links: [
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Services', href: '#services' },
          { label: 'Contact', href: '#contact' }
        ],
        showSearch: false,
        className: 'bg-gray-900/90 backdrop-blur-md text-white border-b border-gray-700'
      }
    },
    {
      id: 'hero-creative',
      type: 'ImageBanner',
      order: 2,
      props: {
        title: 'We Create Digital Experiences',
        subtitle: 'Pushing boundaries in design and technology to build memorable digital products',
        ctaText: 'View Our Work',
        ctaLink: '#portfolio',
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        height: '700px'
        // TODO: Add creative hero image: imageUrl: '/images/creative-hero.jpg'
      }
    },
    {
      id: 'services-grid',
      type: 'CardGrid',
      order: 3,
      props: {
        title: 'Our Services',
        columns: 2,
        cards: [
          {
            id: '1',
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies',
            icon: '💻',
            color: '#f59e0b'
            // TODO: Add service image: imageUrl: '/images/web-dev.jpg'
          },
          {
            id: '2',
            title: 'UI/UX Design',
            description: 'User-centered design that converts visitors into customers',
            icon: '🎨',
            color: '#3b82f6'
            // TODO: Add design image: imageUrl: '/images/ui-design.jpg'
          },
          {
            id: '3',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications',
            icon: '📱',
            color: '#10b981'
            // TODO: Add mobile image: imageUrl: '/images/mobile-apps.jpg'
          },
          {
            id: '4',
            title: 'Branding',
            description: 'Complete brand identity and visual communication systems',
            icon: '✨',
            color: '#8b5cf6'
            // TODO: Add branding image: imageUrl: '/images/branding.jpg'
          }
        ]
      }
    },
    {
      id: 'portfolio-stats',
      type: 'StatsCounter',
      order: 4,
      props: {
        title: 'Our Impact',
        stats: [
          {
            id: '1',
            value: '200+',
            label: 'Projects Completed',
            icon: '🚀',
            color: '#f59e0b'
          },
          {
            id: '2',
            value: '50+',
            label: 'Happy Clients',
            icon: '❤️',
            color: '#ef4444'
          },
          {
            id: '3',
            value: '5+',
            label: 'Years Experience',
            icon: '⭐',
            color: '#3b82f6'
          },
          {
            id: '4',
            value: '15+',
            label: 'Awards Won',
            icon: '🏆',
            color: '#10b981'
          }
        ]
      }
    },
    {
      id: 'footer-portfolio',
      type: 'Footer',
      order: 5,
      props: {
        companyName: 'Creative Studio',
        links: [
          { text: 'Work', href: '/work' },
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Careers', href: '/careers' }
        ],
        socialMedia: [
          { platform: 'dribbble', url: '#' },
          { platform: 'behance', url: '#' },
          { platform: 'instagram', url: '#' }
        ]
      }
    }
  ]
};

// Configuration switcher data
export const configOptions = [
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Traditional shopping experience with product focus',
    config: ecommerceConfig,
    color: '#3b82f6'
  },
  {
    id: 'saas',
    name: 'SaaS Landing',
    description: 'Modern business landing page with features showcase',
    config: saasConfig,
    color: '#6366f1'
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Agency and portfolio website with dark theme',
    config: portfolioConfig,
    color: '#1f2937'
  }
];

export const getConfigById = (id: string): UIConfig | null => {
  const option = configOptions.find(opt => opt.id === id);
  return option ? option.config : null;
};
