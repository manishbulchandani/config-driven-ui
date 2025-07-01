import type { 
  ConditionConfig, 
  RenderContext, 
  UIConfig, 
  ComponentConfig
} from '../types';

export const evaluateConditions = (
  conditions: ConditionConfig[],
  context: RenderContext
): boolean => {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(condition => evaluateCondition(condition, context));
};

const evaluateCondition = (condition: ConditionConfig, context: RenderContext): boolean => {
  const contextValue = getNestedValue(context, condition.field);
  
  let result = false;
  
  switch (condition.operator) {
    case 'equals':
      result = contextValue === condition.value;
      break;
    case 'contains':
      if (Array.isArray(contextValue)) {
        result = contextValue.includes(condition.value);
      } else if (typeof contextValue === 'string') {
        result = contextValue.includes(String(condition.value));
      }
      break;
    case 'greaterThan':
      result = Number(contextValue) > Number(condition.value);
      break;
    case 'lessThan':
      result = Number(contextValue) < Number(condition.value);
      break;
    case 'in':
      result = Array.isArray(condition.value) && condition.value.includes(contextValue);
      break;
    case 'exists':
      result = contextValue !== undefined && contextValue !== null;
      break;
    case 'matches':
      if (typeof condition.value === 'string' && typeof contextValue === 'string') {
        try {
          const regex = new RegExp(condition.value);
          result = regex.test(contextValue);
        } catch {
          result = false;
        }
      }
      break;
    default:
      console.warn(`Unknown condition operator: ${condition.operator}`);
      result = true;
  }

  return result;
};

// Helper function to convert objects with numeric keys back to arrays
const convertObjectToArray = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj !== 'object') return obj;
  
  // Check if this is an object with numeric keys that should be an array
  const keys = Object.keys(obj);
  const isArrayLike = keys.length > 0 && keys.every((key, index) => key === index.toString());
  
  if (isArrayLike) {
    // Convert to array
    return keys.map(key => convertObjectToArray(obj[key]));
  }
  
  // Recursively process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = convertObjectToArray(value);
  }
  return result;
};

export const validateConfig = (config: UIConfig): { isValid: boolean; errors: any[]; warnings: any[]; fixedConfig?: UIConfig } => {
  const errors: any[] = [];
  const warnings: any[] = [];

  // Fix serialized arrays before validation
  const fixedConfig = convertObjectToArray(config) as UIConfig;

  // Validate basic structure
  if (!fixedConfig.id) {
    errors.push({
      field: 'id',
      message: 'Config must have an id',
      severity: 'error',
      code: 'MISSING_ID'
    });
  }

  if (!fixedConfig.version) {
    warnings.push({
      field: 'version',
      message: 'Config should have a version for better tracking',
      suggestion: 'Add a version field like "1.0.0"'
    });
  }

  if (!fixedConfig.components || !Array.isArray(fixedConfig.components)) {
    errors.push({
      field: 'components',
      message: 'Config must have a components array',
      severity: 'error',
      code: 'MISSING_COMPONENTS'
    });
  }

  if (!fixedConfig.layout) {
    errors.push({
      field: 'layout',
      message: 'Config must have a layout configuration',
      severity: 'error',
      code: 'MISSING_LAYOUT'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fixedConfig // Return the fixed config so it can be used
  };
};

export const sanitizeConfig = (config: UIConfig): UIConfig => {
  // Deep clone the config to avoid mutations
  const sanitized = JSON.parse(JSON.stringify(config));

  // Fix serialized arrays first
  const fixedConfig = convertObjectToArray(sanitized);

  // Basic XSS prevention for string values
  const sanitizeValue = (value: any): any => {
    if (typeof value === 'string') {
      return value
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    } else if (Array.isArray(value)) {
      return value.map(sanitizeValue);
    } else if (typeof value === 'object' && value !== null) {
      const sanitizedObj: any = {};
      for (const [key, val] of Object.entries(value)) {
        sanitizedObj[key] = sanitizeValue(val);
      }
      return sanitizedObj;
    }
    return value;
  };

  return sanitizeValue(fixedConfig);
};

export const optimizeConfig = (config: UIConfig): UIConfig => {
  // Remove empty properties and optimize for performance
  const optimized = JSON.parse(JSON.stringify(config));
  
  // Fix serialized arrays first
  const fixedConfig = convertObjectToArray(optimized);

  const optimizeComponent = (component: ComponentConfig): ComponentConfig => {
    const optimizedComponent: ComponentConfig = {
      id: component.id,
      type: component.type,
      props: component.props || {},
      order: component.order
    };

    if (component.children && component.children.length > 0) {
      optimizedComponent.children = component.children.map(optimizeComponent);
    }

    if (component.conditions && component.conditions.length > 0) {
      optimizedComponent.conditions = component.conditions;
    }

    return optimizedComponent;
  };

  if (fixedConfig.components && Array.isArray(fixedConfig.components)) {
    fixedConfig.components = fixedConfig.components.map(optimizeComponent);
  } else if (fixedConfig.components) {
    // If components exists but is not an array, log error and set to empty array
    console.error('Components is not an array after conversion:', fixedConfig.components);
    fixedConfig.components = [];
  }
  
  return fixedConfig;
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};
