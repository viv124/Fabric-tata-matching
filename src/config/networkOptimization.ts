// Network Optimization Configuration
export const NETWORK_OPTIMIZATION_CONFIG = {
  // Image optimization settings
  images: {
    // Default quality settings by connection type
    quality: {
      'slow-2g': 30,
      '2g': 40,
      '3g': 60,
      '4g': 85,
      'default': 75
    },
    // Image sizes for responsive loading
    sizes: {
      thumbnail: 150,
      small: 400,
      medium: 800,
      large: 1200,
      xlarge: 1600
    },
    // Supported formats in order of preference
    formats: ['avif', 'webp', 'jpeg'],
    // Lazy loading settings
    lazyLoading: {
      rootMargin: '100px',
      threshold: 0.1
    }
  },

  // Caching strategies
  caching: {
    // Cache durations in milliseconds
    durations: {
      static: 7 * 24 * 60 * 60 * 1000, // 7 days
      images: 30 * 24 * 60 * 60 * 1000, // 30 days
      api: 5 * 60 * 1000, // 5 minutes
      html: 60 * 1000 // 1 minute
    },
    // Cache size limits
    limits: {
      static: 50 * 1024 * 1024, // 50MB
      images: 200 * 1024 * 1024, // 200MB
      api: 10 * 1024 * 1024 // 10MB
    }
  },

  // Network-aware loading
  networkAware: {
    // Batch sizes by connection type
    batchSizes: {
      'slow-2g': 3,
      '2g': 5,
      '3g': 8,
      '4g': 15,
      'default': 10
    },
    // Stagger delays in milliseconds
    staggerDelays: {
      'slow-2g': 500,
      '2g': 300,
      '3g': 200,
      '4g': 100,
      'default': 150
    },
    // Preloading settings
    preloading: {
      enabled: {
        'slow-2g': false,
        '2g': false,
        '3g': true,
        '4g': true,
        'default': true
      },
      maxImages: {
        'slow-2g': 0,
        '2g': 2,
        '3g': 5,
        '4g': 10,
        'default': 5
      }
    }
  },

  // Performance thresholds
  performance: {
    // Core Web Vitals thresholds
    thresholds: {
      fcp: 1800, // First Contentful Paint (ms)
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100,  // First Input Delay (ms)
      cls: 0.1   // Cumulative Layout Shift
    },
    // Warning thresholds (when to show warnings)
    warnings: {
      fcp: 1500,
      lcp: 2000,
      fid: 75,
      cls: 0.075
    }
  },

  // Bundle optimization
  bundle: {
    // Code splitting configuration
    chunks: {
      vendor: ['react', 'react-dom'],
      router: ['react-router-dom'],
      ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
      supabase: ['@supabase/supabase-js'],
      utils: ['lucide-react', 'sonner', 'clsx', 'tailwind-merge']
    },
    // Asset optimization
    assets: {
      inlineLimit: 4096, // 4KB
      cssCodeSplit: true,
      sourcemap: process.env.NODE_ENV === 'development'
    }
  },

  // Service Worker configuration
  serviceWorker: {
    version: 'fabric-gallery-v2',
    cacheStrategies: {
      static: 'cache-first',
      images: 'stale-while-revalidate',
      api: 'network-first',
      html: 'network-first'
    },
    // Background sync settings
    backgroundSync: {
      enabled: true,
      retryDelay: 5000, // 5 seconds
      maxRetries: 3
    }
  },

  // Analytics and monitoring
  monitoring: {
    // Performance monitoring intervals
    intervals: {
      metrics: 10000, // 10 seconds
      warnings: 5000  // 5 seconds
    },
    // Metrics to track
    metrics: [
      'fcp', 'lcp', 'fid', 'cls', 'ttfb', 'loadTime', 'domContentLoaded'
    ],
    // Resource types to monitor
    resourceTypes: [
      'javascript', 'stylesheet', 'image', 'font', 'api', 'other'
    ]
  }
};

// Helper functions for network optimization
export const getNetworkOptimizedSettings = (connectionType: string) => {
  const config = NETWORK_OPTIMIZATION_CONFIG;
  
  return {
    imageQuality: config.images.quality[connectionType as keyof typeof config.images.quality] || config.images.quality.default,
    batchSize: config.networkAware.batchSizes[connectionType as keyof typeof config.networkAware.batchSizes] || config.networkAware.batchSizes.default,
    staggerDelay: config.networkAware.staggerDelays[connectionType as keyof typeof config.networkAware.staggerDelays] || config.networkAware.staggerDelays.default,
    preloadEnabled: config.networkAware.preloading.enabled[connectionType as keyof typeof config.networkAware.preloading.enabled] || config.networkAware.preloading.enabled.default,
    maxPreloadImages: config.networkAware.preloading.maxImages[connectionType as keyof typeof config.networkAware.preloading.maxImages] || config.networkAware.preloading.maxImages.default
  };
};

// Check if performance metrics meet thresholds
export const checkPerformanceThresholds = (metrics: Record<string, number>) => {
  const thresholds = NETWORK_OPTIMIZATION_CONFIG.performance.thresholds;
  const warnings = NETWORK_OPTIMIZATION_CONFIG.performance.warnings;
  
  const results = {
    passed: true,
    warnings: [] as string[],
    failures: [] as string[]
  };

  Object.entries(thresholds).forEach(([metric, threshold]) => {
    const value = metrics[metric];
    if (value !== undefined) {
      if (value > threshold) {
        results.passed = false;
        results.failures.push(`${metric}: ${value}ms (threshold: ${threshold}ms)`);
      } else if (value > warnings[metric as keyof typeof warnings]) {
        results.warnings.push(`${metric}: ${value}ms (warning: ${warnings[metric as keyof typeof warnings]}ms)`);
      }
    }
  });

  return results;
};

// Get optimal image size based on viewport and connection
export const getOptimalImageSize = (viewportWidth: number, connectionType: string) => {
  const config = NETWORK_OPTIMIZATION_CONFIG.images.sizes;
  
  if (viewportWidth < 768) {
    return connectionType === 'slow-2g' || connectionType === '2g' ? config.thumbnail : config.small;
  } else if (viewportWidth < 1200) {
    return connectionType === 'slow-2g' || connectionType === '2g' ? config.small : config.medium;
  } else if (viewportWidth < 1600) {
    return connectionType === 'slow-2g' || connectionType === '2g' ? config.medium : config.large;
  } else {
    return connectionType === 'slow-2g' || connectionType === '2g' ? config.large : config.xlarge;
  }
};
