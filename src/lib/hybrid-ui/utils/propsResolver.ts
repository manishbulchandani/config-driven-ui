import type { RenderContext, ResponsiveConfig } from '../types';

export const resolveProps = (
  props: Record<string, any>,
  context: RenderContext
): Record<string, any> => {
  const resolved: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
      // Template string resolution: {{user.name}} -> context.user.name
      const path = value.slice(2, -2).trim();
      resolved[key] = getNestedValue(context, path) || value;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      resolved[key] = resolveProps(value, context);
    } else {
      resolved[key] = value;
    }
  }

  return resolved;
};

export const resolveResponsiveProps = (
  responsive: ResponsiveConfig,
  viewport: { width: number; height: number; isMobile: boolean; isTablet: boolean; isDesktop: boolean }
): Record<string, any> => {
  let resolvedProps: Record<string, any> = {};

  // Apply props based on viewport
  if (viewport.isMobile && responsive.mobile) {
    resolvedProps = { ...resolvedProps, ...responsive.mobile };
  } else if (viewport.isTablet && responsive.tablet) {
    resolvedProps = { ...resolvedProps, ...responsive.tablet };
  } else if (viewport.isDesktop && responsive.desktop) {
    resolvedProps = { ...resolvedProps, ...responsive.desktop };
  }

  // Apply wide screen props if applicable
  if (viewport.width >= 1440 && responsive.wide) {
    resolvedProps = { ...resolvedProps, ...responsive.wide };
  }

  return resolvedProps;
};

export const resolveThemeValues = (
  value: string,
  theme: Record<string, any>
): string => {
  // Resolve theme variables: theme(colors.primary) -> actual color value
  if (typeof value === 'string' && value.includes('theme(')) {
    return value.replace(/theme\(([^)]+)\)/g, (match, path) => {
      const themeValue = getNestedValue(theme, path);
      return themeValue || match;
    });
  }
  return value;
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};
