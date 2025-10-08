import { useState, useEffect, useCallback } from 'react';

interface NetworkInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  connectionType?: string;
}

interface OptimizationSettings {
  imageQuality: number;
  enableAnimations: boolean;
  preloadImages: boolean;
  batchRequests: boolean;
  compressionLevel: 'low' | 'medium' | 'high';
}

export const useNetworkOptimization = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({});
  const [optimizationSettings, setOptimizationSettings] = useState<OptimizationSettings>({
    imageQuality: 75,
    enableAnimations: true,
    preloadImages: true,
    batchRequests: false,
    compressionLevel: 'medium'
  });
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Update network information
  const updateNetworkInfo = useCallback(() => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const newNetworkInfo: NetworkInfo = {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
        connectionType: conn.type
      };
      
      setNetworkInfo(newNetworkInfo);
      
      // Determine if connection is slow
      const isSlow = 
        conn.effectiveType === 'slow-2g' ||
        conn.effectiveType === '2g' ||
        conn.effectiveType === '3g' ||
        (conn.downlink && conn.downlink < 1) ||
        (conn.rtt && conn.rtt > 1000) ||
        conn.saveData;
      
      setIsSlowConnection(isSlow);
      
      // Update optimization settings based on connection
      if (isSlow) {
        setOptimizationSettings({
          imageQuality: 50,
          enableAnimations: false,
          preloadImages: false,
          batchRequests: true,
          compressionLevel: 'high'
        });
      } else if (conn.effectiveType === '4g' && conn.downlink && conn.downlink > 2) {
        setOptimizationSettings({
          imageQuality: 90,
          enableAnimations: true,
          preloadImages: true,
          batchRequests: false,
          compressionLevel: 'low'
        });
      }
    }
  }, []);

  // Handle online/offline status
  const handleOnlineStatus = useCallback(() => {
    setIsOffline(!navigator.onLine);
  }, []);

  // Initialize network monitoring
  useEffect(() => {
    updateNetworkInfo();
    
    // Listen for connection changes
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      conn.addEventListener('change', updateNetworkInfo);
      
      return () => {
        conn.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, [updateNetworkInfo]);

  // Listen for online/offline events
  useEffect(() => {
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [handleOnlineStatus]);

  // Get optimized image quality based on network
  const getOptimizedImageQuality = useCallback((baseQuality: number = 75) => {
    if (isSlowConnection) {
      return Math.max(baseQuality - 25, 30);
    }
    if (networkInfo.effectiveType === '4g' && (networkInfo.downlink || 0) > 2) {
      return Math.min(baseQuality + 15, 95);
    }
    return baseQuality;
  }, [isSlowConnection, networkInfo]);

  // Get optimized image size based on network
  const getOptimizedImageSize = useCallback((baseSize: number = 800) => {
    if (isSlowConnection) {
      return Math.max(baseSize - 200, 400);
    }
    if (networkInfo.effectiveType === '4g' && (networkInfo.downlink || 0) > 2) {
      return Math.min(baseSize + 400, 1600);
    }
    return baseSize;
  }, [isSlowConnection, networkInfo]);

  // Determine if animations should be enabled
  const shouldEnableAnimations = useCallback(() => {
    return optimizationSettings.enableAnimations && !isSlowConnection;
  }, [optimizationSettings.enableAnimations, isSlowConnection]);

  // Get batch size for API requests
  const getBatchSize = useCallback(() => {
    if (isSlowConnection) {
      return 5; // Smaller batches for slow connections
    }
    if (networkInfo.effectiveType === '4g' && (networkInfo.downlink || 0) > 2) {
      return 20; // Larger batches for fast connections
    }
    return 10; // Default batch size
  }, [isSlowConnection, networkInfo]);

  // Get delay for staggered loading
  const getStaggerDelay = useCallback(() => {
    if (isSlowConnection) {
      return 200; // Longer delay for slow connections
    }
    if (networkInfo.effectiveType === '4g' && (networkInfo.downlink || 0) > 2) {
      return 50; // Shorter delay for fast connections
    }
    return 100; // Default delay
  }, [isSlowConnection, networkInfo]);

  // Check if preloading should be enabled
  const shouldPreload = useCallback(() => {
    return optimizationSettings.preloadImages && !isSlowConnection && !isOffline;
  }, [optimizationSettings.preloadImages, isSlowConnection, isOffline]);

  // Get compression level for data requests
  const getCompressionLevel = useCallback(() => {
    return optimizationSettings.compressionLevel;
  }, [optimizationSettings.compressionLevel]);

  // Get connection speed category
  const getConnectionSpeed = useCallback(() => {
    if (isOffline) return 'offline';
    if (isSlowConnection) return 'slow';
    if (networkInfo.effectiveType === '4g' && (networkInfo.downlink || 0) > 2) return 'fast';
    return 'medium';
  }, [isOffline, isSlowConnection, networkInfo]);

  return {
    networkInfo,
    optimizationSettings,
    isSlowConnection,
    isOffline,
    getOptimizedImageQuality,
    getOptimizedImageSize,
    shouldEnableAnimations,
    getBatchSize,
    getStaggerDelay,
    shouldPreload,
    getCompressionLevel,
    getConnectionSpeed,
    updateNetworkInfo
  };
};
