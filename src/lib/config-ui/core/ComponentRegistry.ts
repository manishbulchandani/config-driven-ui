import { lazy, type ComponentType } from 'react';

interface RegisteredComponent {
  component: ComponentType<any>;
  defaultProps?: Record<string, any>;
  displayName?: string;
}

class ComponentRegistryManager {
  private registry: Map<string, RegisteredComponent> = new Map();

  register(type: string, config: RegisteredComponent): void {
    this.registry.set(type, {
      ...config,
      displayName: config.displayName || type,
    });
    console.log(`✅ Component "${type}" registered successfully`);
  }

  registerLazy(
    type: string, 
    loader: () => Promise<{ default: ComponentType<any> }>,
    config: Omit<RegisteredComponent, 'component'> = {}
  ): void {
    const LazyComponent = lazy(loader);
    this.register(type, {
      ...config,
      component: LazyComponent,
    });
  }

  get(type: string): RegisteredComponent | undefined {
    return this.registry.get(type);
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }

  getAll(): Record<string, RegisteredComponent> {
    const result: Record<string, RegisteredComponent> = {};
    this.registry.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  unregister(type: string): void {
    if (this.registry.has(type)) {
      this.registry.delete(type);
      console.log(`🗑️ Component "${type}" unregistered`);
    }
  }

  clear(): void {
    this.registry.clear();
    console.log('🧹 Component registry cleared');
  }

  list(): void {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.group('📋 Registered Components');
      this.registry.forEach((config, type) => {
        console.log(`${type}:`, {
          displayName: config.displayName,
        });
      });
      console.groupEnd();
    }
  }
}

export const componentRegistry = new ComponentRegistryManager();

// Development helpers
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  (window as any).__HYBRID_UI_REGISTRY__ = componentRegistry;
}
