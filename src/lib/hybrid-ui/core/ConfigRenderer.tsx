import React, {
  useMemo,
  useCallback,
  useEffect,
  Suspense,
  Component as ReactComponent,
  type ErrorInfo,
} from "react";
import type {
  UIConfig,
  ComponentConfig,
  RenderContext,
  ComponentError,
} from "../types";
import { componentRegistry } from "./ComponentRegistry";
import { evaluateConditions } from "../utils/configValidator";

interface ConfigRendererProps {
  config: UIConfig;
  context?: RenderContext;
  className?: string;
  onError?: (error: ComponentError) => void;
  enableAnimations?: boolean;
  fallbackComponent?: React.ComponentType<{
    error?: Error;
    retry?: () => void;
  }>;
}

interface ConfigRendererState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

// Enhanced Error Boundary Component
class ConfigErrorBoundary extends ReactComponent<
  {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; retry?: () => void }>;
    onError?: (error: ComponentError) => void;
    componentId?: string;
    componentType?: string;
  },
  ConfigRendererState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ConfigRendererState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    if (this.props.onError) {
      this.props.onError({
        componentId: this.props.componentId || "unknown",
        componentType: this.props.componentType || "unknown",
        error,
        errorInfo,
        timestamp: Date.now(),
        context: { retryCount: this.state.retryCount },
      });
    }

    // Log to console in development
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      console.error("ConfigRenderer Error:", error);
      console.error("Error Info:", errorInfo);
    }
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: prevState.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent error={this.state.error} retry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
const DefaultErrorFallback: React.FC<{ error?: Error; retry?: () => void }> = ({
  error,
  retry,
}) => (
  <div
    className="config-ui-error-boundary"
    style={{
      padding: "1rem",
      border: "1px solid #ef4444",
      borderRadius: "0.5rem",
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
      Something went wrong
    </h3>
    {typeof window !== "undefined" &&
      window.location.hostname === "localhost" &&
      error && (
        <details style={{ marginBottom: "1rem", textAlign: "left" }}>
          <summary style={{ cursor: "pointer" }}>Error Details</summary>
          <pre
            style={{
              fontSize: "0.75rem",
              overflow: "auto",
              marginTop: "0.5rem",
              padding: "0.5rem",
              backgroundColor: "#fee2e2",
              borderRadius: "0.25rem",
            }}
          >
            {error.message}
          </pre>
        </details>
      )}
    {retry && (
      <button
        onClick={retry}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    )}
  </div>
);

// Default Loading Component
const DefaultLoadingFallback: React.FC = () => (
  <div
    className="config-ui-loading"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      color: "#6b7280",
    }}
  >
    <div
      style={{
        width: "2rem",
        height: "2rem",
        border: "2px solid #e5e7eb",
        borderTop: "2px solid #3b82f6",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <span style={{ marginLeft: "0.5rem" }}>Loading...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const ConfigRenderer: React.FC<ConfigRendererProps> = ({
  config,
  context = {},
  className,
  onError,
  enableAnimations = true,
  fallbackComponent,
}) => {
  useEffect(() => {
    console.log("Config Renderer initialized with config:", config);
  }, [config]);

  // Stabilize the enhanced context
  const enhancedContext = useMemo((): RenderContext => {
    const viewport = {
      width: typeof window !== "undefined" ? window.innerWidth : 1200,
      height: typeof window !== "undefined" ? window.innerHeight : 800,
      isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
      isTablet:
        typeof window !== "undefined"
          ? window.innerWidth >= 768 && window.innerWidth < 1024
          : false,
      isDesktop:
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
    };

    return {
      ...context,
      viewport,
      performance: {
        isSlowDevice:
          typeof navigator !== "undefined"
            ? navigator.hardwareConcurrency <= 2
            : false,
        connection:
          typeof navigator !== "undefined" && "connection" in navigator
            ? (navigator as any).connection?.effectiveType?.includes("2g")
              ? "slow"
              : "fast"
            : "fast",
        ...context.performance,
      },
    };
  }, [context]); // Remove other dependencies that change frequently

  // Simple component renderer without circular dependencies
  const renderComponent = useCallback(
    (componentConfig: ComponentConfig): React.ReactNode => {
      const { type, props, conditions, id } = componentConfig;

      // Check conditions
      if (conditions && !evaluateConditions(conditions, enhancedContext)) {
        return null;
      }

      const registeredComponent = componentRegistry.get(type);
      if (!registeredComponent) {
        console.warn(`⚠️ Component type "${type}" not found in registry`);
        return null;
      }

      const Component = registeredComponent.component;

      // Merge all props
      const mergedProps = {
        ...registeredComponent.defaultProps,
        ...props,
        key: id,
      };

      // Don't render children recursively here - let the components handle their own children
      return (
        <ConfigErrorBoundary
          key={id}
          fallback={fallbackComponent}
          onError={onError}
          componentId={id}
          componentType={type}
        >
          <Component {...mergedProps} />
        </ConfigErrorBoundary>
      );
    },
    [enhancedContext, fallbackComponent, onError]
  );

  // Sort and render all components
  const sortedComponents = useMemo(() => {
    console.log(`🎨 Rendering ${config.components.length} components`);
    
    return config.components
      .sort((a, b) => a.order - b.order)
      .map((component) => renderComponent(component))
      .filter(Boolean);
  }, [config.components, renderComponent]);

  // Enhanced layout props
  const layoutProps = useMemo(() => {
    const { layout, theme } = config;

    return {
      className: `config-ui-layout config-ui-layout--${layout.type} ${
        layout.className || ""
      } ${className || ""}`.trim(),
      style: {
        // Base layout styles
        display:
          layout.type === "flex"
            ? "flex"
            : layout.type === "grid"
            ? "grid"
            : layout.type === "masonry"
            ? "block"
            : "block",
        flexDirection: layout.direction,
        gap: layout.gap,
        padding: layout.padding,
        margin: layout.margin,

        // Alignment
        justifyContent: layout.alignment?.justify,
        alignItems: layout.alignment?.align,

        // Background
        backgroundColor: layout.background?.color || theme?.colors?.background,
        backgroundImage: layout.background?.image,

        // Theme colors
        color: theme?.colors?.text?.primary,

        // Animation support
        transition: enableAnimations ? "all 0.3s ease-in-out" : undefined,
      } as React.CSSProperties,
    };
  }, [config.layout, config.theme, className, enableAnimations]);

  // Add global styles
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("config-ui-styles")
    ) {
      const style = document.createElement("style");
      style.id = "config-ui-styles";
      style.textContent = `
        .config-ui-layout {
          box-sizing: border-box;
        }
        .config-ui-layout--grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .config-ui-layout--masonry {
          column-count: auto;
          column-width: 250px;
          column-gap: 1rem;
        }
        .config-ui-layout--masonry > * {
          break-inside: avoid;
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .config-ui-layout--grid {
            grid-template-columns: 1fr;
          }
          .config-ui-layout--masonry {
            column-count: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Wrap in loading boundary if configured
  const content = config.loading?.enabled ? (
    <Suspense fallback={<DefaultLoadingFallback />}>
      <div {...layoutProps}>{sortedComponents}</div>
    </Suspense>
  ) : (
    <div {...layoutProps}>{sortedComponents}</div>
  );

  // Wrap in error boundary if configured
  return config.errorBoundary?.enabled ? (
    <ConfigErrorBoundary
      fallback={fallbackComponent}
      onError={onError}
      componentId={config.id}
      componentType="ConfigRenderer"
    >
      {content}
    </ConfigErrorBoundary>
  ) : (
    content
  );
};
