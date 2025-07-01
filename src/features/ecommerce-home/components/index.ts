export { Navbar } from './Navbar';
export { FestivalBanner } from './FestivalBanner';
export { ProductGrid } from './ProductGrid';
export { Footer } from './Footer';
export { HeroSection } from './HeroSection';
export { FeaturesGrid } from './FeaturesGrid';
export { NewsletterSignup } from './NewsletterSignup';
export { ImageBanner } from './ImageBanner';
export { CardGrid } from './CardGrid';
export { Testimonial } from './Testimonial';
export { StatsCounter } from './StatsCounter';
export { ConfigSwitcher } from './ConfigSwitcher';
export { DemoNavigation } from './DemoNavigation';

// Register all components helper
import { componentRegistry } from '../../../lib/config-ui';
import { Navbar } from './Navbar';
import { FestivalBanner } from './FestivalBanner';
import { ProductGrid } from './ProductGrid';

export const registerEcommerceComponents = () => {
  componentRegistry.register('Navbar', { 
    component: Navbar,
    defaultProps: {
      logo: 'Store',
      links: [],
      showSearch: true,
      cartCount: 0
    }
  });
  
  componentRegistry.register('FestivalBanner', { 
    component: FestivalBanner,
    defaultProps: {
      ctaText: 'Shop Now',
      ctaLink: '#'
    }
  });
  
  componentRegistry.register('ProductGrid', { 
    component: ProductGrid,
    defaultProps: {
      columns: 4,
      showFilters: true
    }
  });
};