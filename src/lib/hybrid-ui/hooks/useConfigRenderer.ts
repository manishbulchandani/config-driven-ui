import { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  UIConfig, 
  RenderContext, 
  ComponentError, 
  ComponentPerformanceMetrics 
} from '../types';
import { validateConfig, sanitizeConfig, optimizeConfig } from '../utils/configValidator';

interface UseConfigRendererOptions {
  enablePerformanceTracking?: boolean;
  enableValidation?: boolean;
  enableOptimization?: boolean;
  onError?: (error: ComponentError) => void;
  onPerformanceMetric?: (metric: ComponentPerformanceMetrics) => void;
  onValidationError?: (errors: any[]) => void;
}

interface UseConfigRendererReturn {
  config: UIConfig | null;
  isLoading: boolean;
  isValid: boolean;
  errors: any[];
  warnings: any[];
  performanceMetrics: ComponentPerformanceMetrics[];
  context: RenderContext;
  updateContext: (updates: Partial<RenderContext>) => void;
  revalidate: () => void;
  optimize: () => void;
}

export const useConfigRenderer = (
  initialConfig: UIConfig | null,
  initialContext: RenderContext = {},
  options: UseConfigRendererOptions = {}
): UseConfigRendererReturn => {
  const {
    enablePerformanceTracking = false,
    enableValidation = true,
    enableOptimization = false,
    onError,
    onPerformanceMetric,
    onValidationError
  } = options;

  const [config, setConfig] = useState<UIConfig | null>(null);
  const [context, setContext] = useState<RenderContext>(initialContext);
  const [isLoading, setIsLoading] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<ComponentPerformanceMetrics[]>([]);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: any[];
    warnings: any[];
  }>({ isValid: true, errors: [], warnings: [] });

  // Enhanced context with viewport detection and feature flags
  const enhancedContext = useMemo((): RenderContext => {
    const viewport = {
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
      height: typeof window !== 'undefined' ? window.innerHeight : 800,
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
      isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
      isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    };

    const performance = {
      isSlowDevice: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency <= 2 : false,
      connection: (typeof navigator !== 'undefined' && 'connection' in navigator 
        ? (navigator as any).connection?.effectiveType?.includes('2g') ? 'slow' : 'fast'
        : 'fast') as 'slow' | 'fast',
    };

    return {
      ...context,
      viewport,
      performance,
      theme: context.theme || 'light',
    };
  }, [context]);

  // Process and validate config
  const processConfig = useCallback(async (rawConfig: UIConfig | null) => {
    if (!rawConfig) {
      setConfig(null);
      setValidationResult({ isValid: true, errors: [], warnings: [] }); // Reset validation when no config
      return;
    }

    setIsLoading(true);

    try {
      let processedConfig = rawConfig;

      // Sanitize config to prevent XSS
      processedConfig = sanitizeConfig(processedConfig);

      // Validate config if enabled
      if (enableValidation) {
        const validation = validateConfig(processedConfig);
        setValidationResult(validation);
        
        // Use the fixed config if it was corrected
        if (validation.fixedConfig) {
          processedConfig = validation.fixedConfig;
        }
        
        if (!validation.isValid) {
          onValidationError?.(validation.errors);
          console.warn('Config validation failed:', validation.errors);
        }
      } else {
        // Reset validation result when validation is disabled
        setValidationResult({ isValid: true, errors: [], warnings: [] });
      }

      // Optimize config if enabled
      if (enableOptimization) {
        processedConfig = optimizeConfig(processedConfig);
      }

      setConfig(processedConfig);
    } catch (error) {
      console.error('Failed to process config:', error);
      onError?.({
        componentId: 'config-processor',
        componentType: 'ConfigProcessor',
        error: error as Error,
        errorInfo: { componentStack: 'useConfigRenderer' },
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  }, [enableValidation, enableOptimization, onError, onValidationError]);

  // Handle performance metrics
  const handlePerformanceMetric = useCallback((metric: ComponentPerformanceMetrics) => {
    if (enablePerformanceTracking) {
      setPerformanceMetrics(prev => {
        const updated = prev.filter(m => m.componentId !== metric.componentId);
        return [...updated, metric];
      });
      onPerformanceMetric?.(metric);
    }
  }, [enablePerformanceTracking, onPerformanceMetric]);

  // Update context
  const updateContext = useCallback((updates: Partial<RenderContext>) => {
    setContext((prev: RenderContext) => ({ ...prev, ...updates }));
  }, []);

  // Revalidate config
  const revalidate = useCallback(() => {
    if (config) {
      processConfig(config);
    }
  }, [config, processConfig]);

  // Optimize config
  const optimize = useCallback(() => {
    if (config) {
      const optimized = optimizeConfig(config);
      setConfig(optimized);
    }
  }, [config]);

  // Handle viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      };

      updateContext({ viewport });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateContext]);

  // Process initial config
  useEffect(() => {
    processConfig(initialConfig);
  }, [initialConfig, processConfig]);

  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceTracking) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('config-ui-component')) {
          // Extract component info from entry name
          const [, componentId, componentType] = entry.name.split(':');
          handlePerformanceMetric({
            componentId: componentId || 'unknown',
            componentType: componentType || 'unknown',
            renderTime: entry.duration,
            updateCount: 1,
            lastUpdate: Date.now()
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['measure'] });
    } catch {
      // Performance Observer not supported
    }

    return () => {
      try {
        observer.disconnect();
      } catch {
        // Observer was not created
      }
    };
  }, [enablePerformanceTracking, handlePerformanceMetric]);

  return {
    config,
    isLoading,
    isValid: validationResult.isValid,
    errors: validationResult.errors,
    warnings: validationResult.warnings,
    performanceMetrics,
    context: enhancedContext,
    updateContext,
    revalidate,
    optimize
  };
};

export default useConfigRenderer;
