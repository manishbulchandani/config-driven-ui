import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConfigRenderer } from "../lib/hybrid-ui";
import { useConfigRenderer } from "../lib/hybrid-ui/hooks";
import { componentRegistry } from "../lib/hybrid-ui/core/ComponentRegistry";
import { fetchHomePageConfig } from "../features/ecommerce-home/api/homePageApi";
import { getConfigById, configOptions } from "../features/ecommerce-home/api/configOptions";
import {
  Navbar,
  FestivalBanner,
  ProductGrid,
  Footer,
  HeroSection,
  FeaturesGrid,
  NewsletterSignup,
  ImageBanner,
  CardGrid,
  Testimonial,
  StatsCounter,
  ConfigSwitcher,
  DemoNavigation,
} from "../features/ecommerce-home/components";
import type { UIConfig, ComponentError } from "../lib/hybrid-ui/types";

// Register all components
componentRegistry.register("Navbar", {
  component: Navbar,
  displayName: "Navigation Bar",
});

componentRegistry.register("HeroSection", {
  component: HeroSection,
  displayName: "Hero Section",
});

componentRegistry.register("FestivalBanner", {
  component: FestivalBanner,
  displayName: "Festival Banner",
});

componentRegistry.register("FeaturesGrid", {
  component: FeaturesGrid,
  displayName: "Features Grid",
});

componentRegistry.register("ProductGrid", {
  component: ProductGrid,
  displayName: "Product Grid",
});

componentRegistry.register("NewsletterSignup", {
  component: NewsletterSignup,
  displayName: "Newsletter Signup",
});

componentRegistry.register("Footer", {
  component: Footer,
  displayName: "Footer",
});

// Register new components
componentRegistry.register("ImageBanner", {
  component: ImageBanner,
  displayName: "Image Banner",
});

componentRegistry.register("CardGrid", {
  component: CardGrid,
  displayName: "Card Grid",
});

componentRegistry.register("Testimonial", {
  component: Testimonial,
  displayName: "Testimonials",
});

componentRegistry.register("StatsCounter", {
  component: StatsCounter,
  displayName: "Statistics Counter",
});

export const HomePage: React.FC = () => {
  const [config, setConfig] = useState<UIConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ComponentError[]>([]);
  
  // Get config ID from URL params
  const { configId } = useParams<{ configId: string }>();
  const navigate = useNavigate();
  
  // Default to ecommerce if no config ID or invalid config ID
  const currentConfigId = configId && configOptions.some(opt => opt.id === configId) 
    ? configId 
    : "ecommerce";

  // Redirect if invalid config ID
  useEffect(() => {
    if (configId && !configOptions.some(opt => opt.id === configId)) {
      navigate("/ecommerce", { replace: true });
    }
  }, [configId, navigate]);

  // Enhanced render context with user data and feature flags
  const renderContext = {
    user: {
      id: "123",
      preferences: ["electronics", "fashion"],
      isLoggedIn: true,
      region: "IN",
    },
    features: ["festival-banners", "personalization", "recommendations"],
    theme: "light" as const,
    viewport: {
      width: typeof window !== "undefined" ? window.innerWidth : 1200,
      height: typeof window !== "undefined" ? window.innerHeight : 800,
      isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
      isTablet:
        typeof window !== "undefined"
          ? window.innerWidth >= 768 && window.innerWidth < 1024
          : false,
      isDesktop:
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
    },
    data: {
      currentTime: new Date().toISOString(),
      sessionId: "session-123",
    },
  };

  // Load config from API or config options
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Get config based on current selection
        let configToLoad: UIConfig;

        if (currentConfigId === "ecommerce") {
          // Load original e-commerce config from API
          configToLoad = await fetchHomePageConfig();
        } else {
          // Load static config options
          const selectedConfig = getConfigById(currentConfigId);
          if (!selectedConfig) {
            throw new Error(`Configuration not found: ${currentConfigId}`);
          }
          configToLoad = selectedConfig;
        }

        setConfig(configToLoad);
      } catch (error) {
        console.error("Failed to load homepage config:", error);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Failed to load configuration"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [currentConfigId]); // Reload when config changes

  const handleError = useCallback((error: ComponentError) => {
    setErrors((prev) => [...prev, error]);
    console.error("Component Error:", error);
  }, []);

  const {
    config: processedConfig,
    isLoading: isProcessing,
    isValid,
    errors: validationErrors,
    warnings,
    context,
  } = useConfigRenderer(config, renderContext, {
    enablePerformanceTracking: true,
    enableValidation: true,
    enableOptimization: true,
    onError: handleError,
  });

  // Custom error fallback component
  const ErrorFallback: React.FC<{ error?: Error; retry?: () => void }> = ({
    error,
    retry,
  }) => (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 mb-4">
        We're sorry, but this component failed to load.
      </p>
      {error && (
        <details className="mb-4">
          <summary className="cursor-pointer text-red-700 font-medium">
            Error Details
          </summary>
          <pre className="mt-2 p-2 bg-red-100 rounded text-sm overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );

  // Loading state
  if (isLoading || isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Loading your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  // Load error state
  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Failed to Load
          </h2>
          <p className="text-gray-600 mb-6">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Validation error state (only show if we have a config but it's invalid)
  if (config && !isValid) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
          Configuration Issues
        </h2>
        {validationErrors.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-yellow-700 mb-2">Errors:</h3>
            <ul className="list-disc list-inside text-yellow-600">
              {validationErrors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}
        {warnings.length > 0 && (
          <div>
            <h3 className="font-semibold text-yellow-700 mb-2">Warnings:</h3>
            <ul className="list-disc list-inside text-yellow-600">
              {warnings.map((warning, index) => (
                <li key={index}>{warning.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // No config state
  if (!processedConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Configuration Available
          </h2>
          <p className="text-gray-600">
            Please check your configuration and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Configuration Switcher */}
      <ConfigSwitcher isLoading={isLoading} />
      
      {/* Demo Navigation */}
      <DemoNavigation />

      {/* Performance Dashboard (Development Only) */}
      {/* {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-40">
          <h4 className="font-semibold text-gray-800 mb-2">Config Dashboard</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Active: <span className="font-medium text-blue-600">{configOptions.find(opt => opt.id === currentConfigId)?.name}</span></p>
            <p>Components: {processedConfig?.components.length || 0}</p>
            <p>Errors: {errors.length}</p>
            <p>Avg Render Time: {metrics.length > 0 ? (metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length).toFixed(2) : 0}ms</p>
            <p>Theme: {context.theme}</p>
            <p>Viewport: {context.viewport?.isMobile ? 'Mobile' : context.viewport?.isTablet ? 'Tablet' : 'Desktop'}</p>
          </div>
        </div>
      )} */}

      {/* Demo Information Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 text-center z-30">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base">
            <span className="font-semibold"> Config-Driven UI Demo</span> - Same
            components, completely different layouts! Use the switcher to see
            the magic ✨
          </p>
        </div>
      </div>

      {/* Add top padding to account for demo banner */}
      <div className="pt-12">
        {/* Main Content */}
        <ConfigRenderer
          config={processedConfig}
          context={context}
          className="homepage-content"
          enableAnimations={true}
          fallbackComponent={ErrorFallback}
          onError={handleError}
        />
      </div>

      {/* Error Toast Notifications */}
      {errors.length > 0 && (
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {errors.slice(-3).map((error, index) => (
            <div
              key={index}
              className="bg-red-500 text-white p-3 rounded-lg shadow-lg max-w-sm"
            >
              <p className="font-semibold">Error in {error.componentType}</p>
              <p className="text-sm opacity-90">{error.error.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', system-ui, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          min-height: 100vh;
        }
        
        .homepage-content {
          animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .config-ui-layout > * {
          animation: slideInUp 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .config-ui-layout > *:nth-child(1) { animation-delay: 0.1s; }
        .config-ui-layout > *:nth-child(2) { animation-delay: 0.2s; }
        .config-ui-layout > *:nth-child(3) { animation-delay: 0.3s; }
        .config-ui-layout > *:nth-child(4) { animation-delay: 0.4s; }
        .config-ui-layout > *:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .config-ui-layout > *,
          .homepage-content {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
