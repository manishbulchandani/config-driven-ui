# Config-Driven UI Demo

A powerful demonstration of configuration-driven user interface development using React, TypeScript, and React Router DOM. This project showcases how the same set of components can create completely different user experiences through JSON configurations.

## 🚀 Features

- **🎨 Multiple UI Layouts**: Switch between e-commerce, SaaS, and portfolio layouts instantly
- **⚙️ Configuration Engine**: JSON-based component configuration system
- **🔗 Router Integration**: Layout switching persists across pages with URL-based state
- **⚡ Real-time Switching**: Change layouts without page refresh
- **🛡️ Error Handling**: Robust error boundaries and validation
- **📱 Responsive Design**: Mobile-first responsive layouts
- **🎯 Component Registry**: Centralized component management system

## 🎮 Live Demo

1. **Layout Switcher**: Click the gear icon (⚙️) in the top-left corner
2. **Navigation**: Use the bottom-right navigation to switch between pages
3. **URL Persistence**: Notice how the layout choice is preserved in the URL
4. **Cross-Page Consistency**: Layout selections work across all pages

## 🏗️ Architecture

### Core Components

- **ConfigRenderer**: Dynamically renders components based on JSON configuration
- **ComponentRegistry**: Maps component names to React components
- **ConfigValidator**: Validates and sanitizes configuration objects
- **useConfigRenderer**: React hook for config processing and rendering

### Available Layouts

1. **E-commerce Store** (`/ecommerce`)
   - Product grids, shopping features, promotional banners
   - Focus on conversion and product discovery

2. **SaaS Platform** (`/saas`)
   - Feature highlights, testimonials, pricing focus
   - Professional and clean design

3. **Portfolio Site** (`/portfolio`)
   - Project showcases, personal branding, creative layout
   - Visual and engaging presentation

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd config-driven-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── config-ui/           # Configuration system core
│   │   ├── core/           # ConfigRenderer, ComponentRegistry
│   │   ├── hooks/          # useConfigRenderer hook
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Validation and utilities
│   └── config-ui/          # Enhanced config system
├── features/
│   └── ecommerce-home/
│       ├── api/            # Configuration data
│       ├── components/     # Reusable UI components
│       └── slices/         # State management
├── pages/
│   ├── HomePage.tsx        # Main config-driven page
│   ├── AboutPage.tsx       # About the demo
│   └── DemoPage.tsx        # Component showcase
└── utils/                  # Shared utilities
```

## 🔧 Configuration System

### Basic Configuration Structure

```json
{
  "id": "ecommerce",
  "name": "E-commerce Store",
  "theme": {
    "primary": "#3B82F6",
    "secondary": "#10B981"
  },
  "components": [
    {
      "type": "Navbar",
      "props": {
        "logo": "ShopCo",
        "showSearch": true,
        "cartCount": 3
      }
    },
    {
      "type": "HeroSection",
      "props": {
        "title": "Discover Amazing Products",
        "subtitle": "Shop the latest trends",
        "ctaText": "Shop Now"
      }
    }
  ]
}
```

### Adding New Components

1. **Create the Component**:
```tsx
export const MyComponent: React.FC<MyComponentProps> = ({ title, ...props }) => {
  return <div>{title}</div>;
};
```

2. **Register the Component**:
```tsx
componentRegistry.register("MyComponent", {
  component: MyComponent,
  displayName: "My Component",
});
```

3. **Use in Configuration**:
```json
{
  "type": "MyComponent",
  "props": {
    "title": "Hello World"
  }
}
```

## 🎯 Key Features Explained

### Router Integration
- Layout configurations are stored in URL parameters (`/:configId`)
- Switching layouts updates the URL and maintains state across navigation
- Bookmarkable and shareable layout configurations

### Component Registry
- Centralized mapping of component names to React components
- Dynamic component resolution at runtime
- Type-safe component registration with default props

### Configuration Validation
- JSON schema validation for configurations
- Automatic sanitization of invalid data
- Graceful fallbacks for missing components

### Error Handling
- Component-level error boundaries
- Validation error reporting
- Fallback components for failed renders

## 🚀 Extending the System

### Adding New Layouts

1. Create a new configuration in `configOptions.ts`:
```tsx
export const myNewLayout: UIConfig = {
  id: "mynewlayout",
  name: "My New Layout",
  description: "A custom layout for specific use cases",
  color: "#FF6B6B",
  components: [
    // Component configurations
  ]
};
```

2. Add to the `configOptions` array:
```tsx
export const configOptions = [
  ecommerceConfig,
  saasConfig, 
  portfolioConfig,
  myNewLayout, // Add here
];
```

### Creating Custom Components

Follow the pattern in `src/features/ecommerce-home/components/` to create new reusable components that work with the configuration system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

For questions and support, please open an issue in the GitHub repository.

---

**Built with ❤️ by Manish**
