import type { ComponentType, ErrorInfo } from 'react';

export interface RegisteredComponent {
  component: ComponentType<any>;
  defaultProps?: Record<string, any>;
  propTypes?: Record<string, string>;
  displayName?: string;
  category?: ComponentCategory;
  tags?: string[];
  description?: string;
  examples?: ComponentExample[];
  performance?: {
    lazy?: boolean;
    priority?: 'low' | 'normal' | 'high';
    preload?: boolean;
  };
  accessibility?: {
    requirements?: string[];
    tested?: boolean;
  };
}

export interface ComponentRegistry {
  [key: string]: RegisteredComponent;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ComponentExample {
  name: string;
  description?: string;
  props: Record<string, any>;
  code?: string;
}

export interface ComponentError {
  componentId: string;
  componentType: string;
  error: Error;
  errorInfo: ErrorInfo;
  timestamp: number;
  context?: Record<string, any>;
}

export interface ComponentPerformanceMetrics {
  componentId: string;
  componentType: string;
  renderTime: number;
  mountTime?: number;
  updateCount: number;
  lastUpdate: number;
  memoryUsage?: number;
}

export interface ComponentValidationResult {
  isValid: boolean;
  errors: ComponentValidationError[];
  warnings: ComponentValidationWarning[];
}

export interface ComponentValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  code?: string;
}

export interface ComponentValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}
