import type { UIConfig } from '../../../lib/config-ui/types';

// Simulated backend response for homepage configuration
export const fetchHomePageConfig = async (): Promise<UIConfig> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 'ecommerce-home-v1',
    version: '1.0.0',
    metadata: {
      name: 'E-commerce Homepage',
      description: 'Homepage with festival banners and product recommendations',
      tags: ['ecommerce', 'homepage', 'festival'],
      author: 'Product Team',
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
      responsive: {
        mobile: {
          gap: '0.5rem'
        },
        tablet: {
          gap: '1rem'
        },
        desktop: {
          gap: '1.5rem'
        }
      }
    },
    components: [
      {
        id: 'navbar-1',
        type: 'Navbar',
        order: 1,
        props: {
          logo: 'ConfigUI Store',
          links: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ],
          showSearch: true,
          cartCount: 3,
          className: 'shadow-lg backdrop-blur-sm bg-white/90'
        },
        styles: {
          css: {
            position: 'sticky',
            top: 0,
            zIndex: 50
          }
        },
        accessibility: {
          role: 'navigation',
          ariaLabel: 'Main navigation'
        }
      },
      {
        id: 'festival-banner-1',
        type: 'FestivalBanner',
        order: 2,
        props: {
          title: 'Config-Driven UI Demo',
          subtitle: 'Experience the power of dynamic layouts with the same components',
          discount: 'NEW',
          ctaText: 'Try Different Layouts',
          ctaLink: '#switcher',
          bgColor: '#6366f1',
          textColor: '#ffffff'
          // TODO: Add banner background image: bgImage: '/images/config-hero-bg.jpg'
        },
        conditions: [
          {
            field: 'features',
            operator: 'contains',
            value: 'festival-banners'
          }
        ],
        animation: {
          entrance: 'slide',
          duration: 600,
          delay: 300
        }
      },
      {
        id: 'product-grid-1',
        type: 'ProductGrid',
        order: 3,
        props: {
          title: 'Featured Components',
          category: 'components',
          limit: 8,
          showFilters: true
          // TODO: Add product images in ProductGrid component
        },
        conditions: [
          {
            field: 'user.preferences',
            operator: 'contains',
            value: 'electronics'
          }
        ],
        responsive: {
          mobile: {
            props: {
              limit: 4,
              showFilters: false
            }
          },
          tablet: {
            props: {
              limit: 6
            }
          }
        }
      },
      {
        id: 'footer-1',
        type: 'Footer',
        order: 4,
        props: {
          companyName: 'ConfigUI Demo',
          links: [
            { text: 'Documentation', href: '/docs' },
            { text: 'GitHub', href: '/github' },
            { text: 'Examples', href: '/examples' }
          ],
          socialMedia: [
            { platform: 'github', url: '#' },
            { platform: 'twitter', url: '#' },
            { platform: 'discord', url: '#' }
          ]
        },
        accessibility: {
          role: 'contentinfo',
          ariaLabel: 'Site footer'
        }
      }
    ]
  };
};