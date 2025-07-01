# Hybrid UI - Production-Ready Config-Driven UI Framework

A powerful, type-safe, and production-ready framework for building dynamic user interfaces through JSON configurations. Hybrid UI combines the flexibility of configuration-driven development with the performance and reliability expected in modern web applications.

## 🚀 Features

### Core Features
- **Type-Safe Configuration**: Full TypeScript support with comprehensive type definitions
- **Performance Optimized**: Built-in performance tracking, lazy loading, and optimization utilities
- **Error Boundaries**: Comprehensive error handling with custom fallback components
- **Responsive Design**: Built-in responsive configuration support
- **Theme System**: Comprehensive theming with CSS variables and design tokens
- **Animation Support**: Configurable animations with performance considerations
- **Accessibility**: Built-in accessibility features and ARIA support

### Advanced Features
- **Component Registry**: Sophisticated component management with categories and metadata
- **Condition Evaluation**: Advanced conditional rendering with logical operators
- **Props Resolution**: Template strings, responsive props, and computed values
- **Validation System**: Schema validation with detailed error reporting
- **Development Tools**: Debug console, performance dashboard, and registry inspection

## 📦 Installation

```bash
npm install @your-org/hybrid-ui
# or
yarn add @your-org/hybrid-ui
```

## 🏗️ Project Structure

```
src/lib/hybrid-ui/
├── core/
│   ├── ConfigRenderer.tsx      # Main rendering component
│   ├── ComponentRegistry.ts    # Component management
│   └── index.ts
├── types/
│   ├── config.types.ts         # Configuration interfaces
│   ├── component.types.ts      # Component interfaces
│   └── index.ts
├── hooks/
│   ├── useConfigRenderer.ts    # Main hook for config management
│   └── index.ts
├── utils/
│   ├── configValidator.ts      # Validation utilities
│   ├── propsResolver.ts        # Props resolution utilities
│   └── index.ts
└── index.ts                    # Main library export
```

## 🎯 Quick Start

### 1. Basic Setup

```tsx
import React from 'react';
import { ConfigRenderer, componentRegistry } from '@your-org/hybrid-ui';
import type { UIConfig } from '@your-org/hybrid-ui/types';

// Register your components
componentRegistry.register('Button', {
  component: MyButton,
  displayName: 'Custom Button',
  defaultProps: { variant: 'primary' }
});

// Define your configuration
const config: UIConfig = {
  id: 'my-page',
  version: '1.0.0',
  layout: {
    type: 'flex',
    direction: 'column',
    gap: '1rem'
  },
  components: [
    {
      id: 'header',
      type: 'Button',
      order: 1,
      props: {
        children: 'Click me!',
        onClick: () => alert('Hello!')
      }
    }
  ]
};

// Render your UI
export const MyPage = () => {
  return (
    <ConfigRenderer 
      config={config}
      enablePerformanceTracking={true}
      enableAnimations={true}
    />
  );
};
```

### 2. Advanced Usage with Hooks

```tsx
import { useConfigRenderer } from '@your-org/hybrid-ui/hooks';

export const AdvancedPage = () => {
  const {
    config,
    context,
    isLoading,
    isValid,
    errors,
    updateContext
  } = useConfigRenderer(initialConfig, {
    user: { id: '123', theme: 'dark' },
    features: ['premium', 'beta']
  }, {
    enablePerformanceTracking: true,
    enableValidation: true,
    onError: (error) => console.error('Config error:', error)
  });

  if (isLoading) return <LoadingSpinner />;
  if (!isValid) return <ErrorDisplay errors={errors} />;

  return (
    <ConfigRenderer 
      config={config}
      context={context}
      fallbackComponent={CustomErrorBoundary}
    />
  );
};
```

## 🏗️ Configuration Schema

### Basic Configuration

```typescript
interface UIConfig {
  id: string;                    // Unique identifier
  version: string;               // Configuration version
  layout: LayoutConfig;          // Layout configuration
  components: ComponentConfig[]; // Component definitions
  theme?: ThemeConfig;           // Theme configuration
  metadata?: ConfigMetadata;     // Additional metadata
  errorBoundary?: ErrorBoundaryConfig;
  loading?: LoadingConfig;
  animations?: AnimationConfig;
}
```

### Component Configuration

```typescript
interface ComponentConfig {
  id: string;                    // Unique component ID
  type: string;                  // Registered component type
  props: Record<string, any>;    // Component props
  children?: ComponentConfig[];  // Child components
  conditions?: ConditionConfig[]; // Rendering conditions
  order: number;                 // Render order
  styles?: StyleConfig;          // Custom styles
  animation?: ComponentAnimationConfig;
  responsive?: ResponsiveConfig;
  accessibility?: AccessibilityConfig;
}
```

## 🎨 Theming

### Theme Configuration

```typescript
const theme: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    text: {
      primary: '#1e293b',
      secondary: '#64748b'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem'
  },
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif'
    }
  }
};
```

### Using Theme Values

```typescript
// In component props, use theme() function
{
  props: {
    color: 'theme(colors.primary)',
    fontSize: 'theme(typography.fontSize.lg)'
  }
}
```

## 📱 Responsive Design

```typescript
const responsiveComponent: ComponentConfig = {
  id: 'hero',
  type: 'HeroSection',
  order: 1,
  props: {
    title: 'Welcome'
  },
  responsive: {
    mobile: {
      props: {
        title: 'Hi!'
      }
    },
    tablet: {
      props: {
        title: 'Welcome!'
      }
    },
    desktop: {
      props: {
        title: 'Welcome to our platform!'
      }
    }
  }
};
```

## 🔧 Conditional Rendering

```typescript
const conditionalComponent: ComponentConfig = {
  id: 'premium-banner',
  type: 'Banner',
  order: 2,
  props: {
    message: 'Upgrade to Premium!'
  },
  conditions: [
    {
      field: 'user.isPremium',
      operator: 'equals',
      value: false
    },
    {
      field: 'features',
      operator: 'contains',
      value: 'premium-upsell'
    }
  ]
};
```

## 🎭 Animation Configuration

```typescript
const animatedComponent: ComponentConfig = {
  id: 'feature-card',
  type: 'Card',
  order: 3,
  animation: {
    entrance: 'fade',
    duration: 500,
    delay: 200,
    easing: 'ease-out'
  }
};
```

## 🧪 Development Tools

### Performance Dashboard

```tsx
// Automatically enabled in development
const config = {
  // ... your config
};

<ConfigRenderer 
  config={config}
  enablePerformanceTracking={true}
  onPerformanceMetric={(metric) => {
    console.log('Performance:', metric);
  }}
/>
```

### Component Registry Inspector

```javascript
// In browser console (development only)
window.__HYBRID_UI_REGISTRY__.list();
window.__HYBRID_UI_REGISTRY__.getMetrics();
```

## 🔒 Security

### XSS Prevention
- Automatic sanitization of string values
- Script tag removal
- JavaScript protocol filtering

### Validation
- Schema validation for all configurations
- Runtime type checking
- Error boundary protection

## 📊 Performance

### Built-in Optimizations
- Component lazy loading
- Responsive image handling
- Animation performance monitoring
- Memory usage tracking
- Render time optimization

### Best Practices
- Use `enableOptimization` for production builds
- Implement proper error boundaries
- Monitor performance metrics
- Use responsive configurations wisely

## 🧩 Component Registry

### Registering Components

```typescript
import { componentRegistry } from '@your-org/hybrid-ui';

// Basic registration
componentRegistry.register('MyButton', {
  component: MyButton,
  defaultProps: { size: 'medium' }
});

// Advanced registration with metadata
componentRegistry.register('MyCard', {
  component: MyCard,
  displayName: 'Custom Card',
  category: {
    id: 'layout',
    name: 'Layout Components'
  },
  tags: ['card', 'container', 'layout'],
  description: 'A flexible card component',
  performance: {
    lazy: true,
    priority: 'normal'
  }
});

// Lazy loading
componentRegistry.registerLazy('HeavyComponent', 
  () => import('./HeavyComponent'),
  { 
    displayName: 'Heavy Component',
    performance: { priority: 'low' }
  }
);
```

## 🚨 Error Handling

### Custom Error Boundaries

```tsx
const CustomErrorFallback = ({ error, retry }) => (
  <div className="error-boundary">
    <h3>Something went wrong</h3>
    <p>{error?.message}</p>
    <button onClick={retry}>Try Again</button>
  </div>
);

<ConfigRenderer 
  config={config}
  fallbackComponent={CustomErrorFallback}
  onError={(error) => {
    // Log to monitoring service
    console.error('Component error:', error);
  }}
/>
```

## 📝 TypeScript Support

Hybrid UI is built with TypeScript and provides comprehensive type definitions:

```typescript
import type {
  UIConfig,
  ComponentConfig,
  ThemeConfig,
  RenderContext
} from '@your-org/hybrid-ui/types';

// Full type safety for configurations
const config: UIConfig = {
  // TypeScript will validate your configuration
};
```

## 🔧 API Reference

### ConfigRenderer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `UIConfig` | - | The UI configuration object |
| `context` | `RenderContext` | `{}` | Render context for conditions/props |
| `className` | `string` | - | CSS class for the root element |
| `enablePerformanceTracking` | `boolean` | `false` | Enable performance monitoring |
| `enableAnimations` | `boolean` | `true` | Enable component animations |
| `fallbackComponent` | `ComponentType` | - | Custom error boundary component |
| `onError` | `function` | - | Error callback |
| `onPerformanceMetric` | `function` | - | Performance metric callback |

### useConfigRenderer Hook

```typescript
const {
  config,           // Processed configuration
  isLoading,        // Loading state
  isValid,          // Validation state
  errors,           // Validation errors
  warnings,         // Validation warnings
  context,          // Enhanced render context
  updateContext,    // Function to update context
  revalidate,       // Function to revalidate config
  optimize          // Function to optimize config
} = useConfigRenderer(
  initialConfig,    // Initial configuration
  initialContext,   // Initial context
  options          // Hook options
);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- Open source community for inspiration

---

**Built with ❤️ for modern web development**
