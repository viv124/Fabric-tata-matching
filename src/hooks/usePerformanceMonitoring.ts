import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  fmp?: number; // First Meaningful Paint
  loadTime?: number; // Page Load Time
  domContentLoaded?: number; // DOM Content Loaded
  networkInfo?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  };
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

export const usePerformanceMonitoring = () => {
  // Get performance metrics
  const getPerformanceMetrics = useCallback((): PerformanceMetrics => {
    const metrics: PerformanceMetrics = {};

    if ('performance' in window) {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart;
        metrics.loadTime = navigation.loadEventEnd - navigation.navigationStart;
        metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        if (entry.name === 'first-paint') {
          metrics.fmp = entry.startTime;
        }
      });

      // Get LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.lcp = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP observer not supported:', error);
        }
      }

      // Get FID (First Input Delay)
      if ('PerformanceObserver' in window) {
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              if (entry.entryType === 'first-input') {
                metrics.fid = (entry as any).processingStart - entry.startTime;
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('FID observer not supported:', error);
        }
      }

      // Get CLS (Cumulative Layout Shift)
      if ('PerformanceObserver' in window) {
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            });
            metrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('CLS observer not supported:', error);
        }
      }

      // Get network information
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        metrics.networkInfo = {
          effectiveType: conn.effectiveType,
          downlink: conn.downlink,
          rtt: conn.rtt
        };
      }
    }

    return metrics;
  }, []);

  // Get resource timing information
  const getResourceTimings = useCallback((): ResourceTiming[] => {
    if (!('performance' in window)) return [];

    const resources: ResourceTiming[] = [];
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    resourceEntries.forEach(entry => {
      resources.push({
        name: entry.name,
        duration: entry.duration,
        size: entry.transferSize || 0,
        type: getResourceType(entry.name)
      });
    });

    return resources.sort((a, b) => b.duration - a.duration);
  }, []);

  // Determine resource type from URL
  const getResourceType = (url: string): string => {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)) return 'image';
    if (url.includes('fonts.googleapis.com') || url.includes('.woff')) return 'font';
    if (url.includes('api') || url.includes('supabase')) return 'api';
    return 'other';
  };

  // Get bundle analysis
  const getBundleAnalysis = useCallback(() => {
    const resources = getResourceTimings();
    const analysis = {
      totalSize: 0,
      totalLoadTime: 0,
      byType: {} as Record<string, { count: number; size: number; loadTime: number }>,
      slowestResources: [] as ResourceTiming[],
      largestResources: [] as ResourceTiming[]
    };

    resources.forEach(resource => {
      analysis.totalSize += resource.size;
      analysis.totalLoadTime += resource.duration;

      if (!analysis.byType[resource.type]) {
        analysis.byType[resource.type] = { count: 0, size: 0, loadTime: 0 };
      }
      analysis.byType[resource.type].count++;
      analysis.byType[resource.type].size += resource.size;
      analysis.byType[resource.type].loadTime += resource.duration;
    });

    analysis.slowestResources = resources.slice(0, 10);
    analysis.largestResources = [...resources].sort((a, b) => b.size - a.size).slice(0, 10);

    return analysis;
  }, [getResourceTimings]);

  // Log performance metrics
  const logPerformanceMetrics = useCallback(() => {
    const metrics = getPerformanceMetrics();
    const bundleAnalysis = getBundleAnalysis();
    
    console.group('🚀 Performance Metrics');
    console.log('Core Web Vitals:', {
      FCP: metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
      LCP: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
      FID: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
      CLS: metrics.cls ? metrics.cls.toFixed(4) : 'N/A'
    });
    
    console.log('Loading Times:', {
      TTFB: metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
      'Page Load': metrics.loadTime ? `${metrics.loadTime.toFixed(2)}ms` : 'N/A',
      'DOM Ready': metrics.domContentLoaded ? `${metrics.domContentLoaded.toFixed(2)}ms` : 'N/A'
    });
    
    console.log('Network Info:', metrics.networkInfo);
    
    console.log('Bundle Analysis:', {
      'Total Size': `${(bundleAnalysis.totalSize / 1024).toFixed(2)}KB`,
      'Total Load Time': `${bundleAnalysis.totalLoadTime.toFixed(2)}ms`,
      'Resource Types': bundleAnalysis.byType
    });
    
    console.log('Slowest Resources:', bundleAnalysis.slowestResources.slice(0, 5));
    console.log('Largest Resources:', bundleAnalysis.largestResources.slice(0, 5));
    console.groupEnd();
  }, [getPerformanceMetrics, getBundleAnalysis]);

  // Send metrics to analytics (if configured)
  const sendMetricsToAnalytics = useCallback((metrics: PerformanceMetrics) => {
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        custom_map: {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          ttfb: metrics.ttfb,
          load_time: metrics.loadTime
        }
      });
    }

    // Send to custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(error => {
        console.warn('Failed to send performance metrics:', error);
      });
    }
  }, []);

  // Monitor performance on page load
  useEffect(() => {
    const handleLoad = () => {
      // Wait a bit for all metrics to be available
      setTimeout(() => {
        const metrics = getPerformanceMetrics();
        logPerformanceMetrics();
        sendMetricsToAnalytics(metrics);
      }, 2000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [getPerformanceMetrics, logPerformanceMetrics, sendMetricsToAnalytics]);

  // Monitor performance continuously
  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = getPerformanceMetrics();
      if (metrics.fcp && metrics.lcp) {
        // Log performance warnings
        if (metrics.fcp > 1800) {
          console.warn('⚠️ FCP is slow:', metrics.fcp);
        }
        if (metrics.lcp > 2500) {
          console.warn('⚠️ LCP is slow:', metrics.lcp);
        }
        if (metrics.fid && metrics.fid > 100) {
          console.warn('⚠️ FID is slow:', metrics.fid);
        }
        if (metrics.cls && metrics.cls > 0.1) {
          console.warn('⚠️ CLS is high:', metrics.cls);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [getPerformanceMetrics]);

  return {
    getPerformanceMetrics,
    getResourceTimings,
    getBundleAnalysis,
    logPerformanceMetrics,
    sendMetricsToAnalytics
  };
};
