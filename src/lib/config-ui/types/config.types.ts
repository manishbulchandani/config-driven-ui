// Core types
export interface UIConfig {
  id: string;
  version: string;
  layout: LayoutConfig;
  components: ComponentConfig[];
  theme?: ThemeConfig;
  metadata?: ConfigMetadata;
  errorBoundary?: ErrorBoundaryConfig;
  loading?: LoadingConfig;
  animations?: AnimationConfig;
}

export interface LayoutConfig {
  type: 'flex' | 'grid' | 'stack' | 'masonry' | 'auto';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: number | string;
  padding?: number | string;
  margin?: number | string;
  className?: string;
  responsive?: ResponsiveConfig;
  alignment?: {
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  };
  background?: BackgroundConfig;
}

export interface ComponentConfig {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentConfig[];
  conditions?: ConditionConfig[];
  order: number;
  styles?: StyleConfig;
  animation?: ComponentAnimationConfig;
  responsive?: ResponsiveConfig;
  accessibility?: AccessibilityConfig;
  errorFallback?: ComponentConfig;
}

export interface ConditionConfig {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'in' | 'exists' | 'matches';
  value: any;
  logicalOperator?: 'and' | 'or';
  nested?: ConditionConfig[];
}

export interface ThemeConfig {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: {
      primary?: string;
      secondary?: string;
      muted?: string;
    };
    border?: string;
    error?: string;
    warning?: string;
    success?: string;
    info?: string;
  };
  spacing?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
  };
  typography?: {
    fontFamily?: {
      primary?: string;
      secondary?: string;
      mono?: string;
    };
    fontSize?: Record<string, string>;
    fontWeight?: Record<string, number>;
    lineHeight?: Record<string, number>;
  };
  borderRadius?: Record<string, string>;
  shadows?: Record<string, string>;
  breakpoints?: Record<string, string>;
}

export interface ConfigMetadata {
  name?: string;
  description?: string;
  tags?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  performance?: {
    priority?: 'low' | 'normal' | 'high';
    preload?: boolean;
    lazy?: boolean;
  };
}

export interface ErrorBoundaryConfig {
  enabled: boolean;
  fallbackComponent?: string;
  onError?: string;
  retryButton?: boolean;
}

export interface LoadingConfig {
  enabled: boolean;
  component?: string;
  delay?: number;
  minDuration?: number;
}

export interface AnimationConfig {
  enabled: boolean;
  duration?: number;
  easing?: string;
  stagger?: number;
  presets?: Record<string, any>;
}

export interface ResponsiveConfig {
  mobile?: Partial<LayoutConfig | ComponentConfig>;
  tablet?: Partial<LayoutConfig | ComponentConfig>;
  desktop?: Partial<LayoutConfig | ComponentConfig>;
  wide?: Partial<LayoutConfig | ComponentConfig>;
}

export interface StyleConfig {
  className?: string;
  css?: Record<string, any>;
  hover?: Record<string, any>;
  focus?: Record<string, any>;
  active?: Record<string, any>;
}

export interface ComponentAnimationConfig {
  entrance?: 'fade' | 'slide' | 'scale' | 'bounce' | 'flip';
  exit?: 'fade' | 'slide' | 'scale' | 'bounce' | 'flip';
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
  focusable?: boolean;
  screenReaderOnly?: boolean;
}

export interface BackgroundConfig {
  color?: string;
  image?: string;
  gradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    direction?: string;
  };
  pattern?: string;
  overlay?: {
    color: string;
    opacity: number;
  };
}

export interface RenderContext {
  user?: any;
  theme?: 'light' | 'dark' | 'auto';
  viewport?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  feature?: Record<string, boolean>;
  data?: Record<string, any>;
  state?: Record<string, any>;
  performance?: {
    isSlowDevice?: boolean;
    connection?: 'slow' | 'fast';
  };
}
