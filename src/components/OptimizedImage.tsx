import React, { useState, useRef, useEffect, useMemo } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty' | 'shimmer';
  formats?: ('webp' | 'avif' | 'jpeg')[];
  adaptiveQuality?: boolean;
}

// Network connection detection
const useNetworkInfo = () => {
  const [connection, setConnection] = useState<{
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  }>({});

  useEffect(() => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      setConnection({
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt
      });

      const updateConnection = () => {
        setConnection({
          effectiveType: conn.effectiveType,
          downlink: conn.downlink,
          rtt: conn.rtt
        });
      };

      conn.addEventListener('change', updateConnection);
      return () => conn.removeEventListener('change', updateConnection);
    }
  }, []);

  return connection;
};

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  placeholder = 'shimmer',
  formats = ['avif', 'webp', 'jpeg'],
  adaptiveQuality = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentFormat, setCurrentFormat] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const networkInfo = useNetworkInfo();

  // Adaptive quality based on network connection
  const adaptiveQualityValue = useMemo(() => {
    if (!adaptiveQuality) return quality;
    
    const { effectiveType, downlink } = networkInfo;
    
    // Adjust quality based on connection
    if (effectiveType === '4g' && (downlink || 0) > 2) {
      return Math.min(quality + 10, 95); // High quality for fast connections
    } else if (effectiveType === '3g' || (downlink || 0) < 1) {
      return Math.max(quality - 20, 30); // Lower quality for slow connections
    }
    
    return quality;
  }, [networkInfo, quality, adaptiveQuality]);

  // Generate responsive image sources
  const imageSources = useMemo(() => {
    if (!src.includes('supabase')) return [{ src, format: 'original' }];

    const baseUrl = new URL(src);
    const sources = [];

    // Generate different sizes and formats
    const sizes = [
      { width: 400, suffix: 'sm' },
      { width: 800, suffix: 'md' },
      { width: 1200, suffix: 'lg' },
      { width: 1600, suffix: 'xl' }
    ];

    formats.forEach(format => {
      sizes.forEach(size => {
        const url = new URL(baseUrl);
        url.searchParams.set('width', size.width.toString());
        url.searchParams.set('quality', adaptiveQualityValue.toString());
        url.searchParams.set('format', format);
        
        sources.push({
          src: url.toString(),
          format,
          width: size.width,
          suffix: size.suffix
        });
      });
    });

    return sources;
  }, [src, formats, adaptiveQualityValue]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '100px', // Increased for better UX
        threshold: 0.1 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Try next format if available
    if (currentFormat < formats.length - 1) {
      setCurrentFormat(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  // Get the best image source based on current format and viewport
  const getBestImageSrc = () => {
    if (hasError) return src;
    
    const currentFormatName = formats[currentFormat];
    const sources = imageSources.filter(s => s.format === currentFormatName);
    
    // Return the most appropriate size based on viewport
    const viewportWidth = window.innerWidth;
    let bestSource = sources[0];
    
    if (viewportWidth < 768) {
      bestSource = sources.find(s => s.suffix === 'sm') || sources[0];
    } else if (viewportWidth < 1200) {
      bestSource = sources.find(s => s.suffix === 'md') || sources[0];
    } else if (viewportWidth < 1600) {
      bestSource = sources.find(s => s.suffix === 'lg') || sources[0];
    } else {
      bestSource = sources.find(s => s.suffix === 'xl') || sources[0];
    }
    
    return bestSource?.src || src;
  };

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!src.includes('supabase')) return undefined;
    
    const currentFormatName = formats[currentFormat];
    const sources = imageSources.filter(s => s.format === currentFormatName);
    
    return sources.map(s => `${s.src} ${s.width}w`).join(', ');
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`${className} bg-muted flex items-center justify-center`}
      >
        <div className="text-muted-foreground text-sm text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-muted-foreground/20 rounded"></div>
          <div>Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Enhanced placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50">
          {placeholder === 'shimmer' && (
            <div className="w-full h-full bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent animate-pulse"></div>
          )}
          {placeholder === 'blur' && (
            <div className="w-full h-full bg-muted-foreground/10 blur-sm"></div>
          )}
        </div>
      )}
      
      {/* Actual image with advanced optimization */}
      {isInView && (
        <picture>
          {/* AVIF source for modern browsers */}
          {formats.includes('avif') && (
            <source
              srcSet={imageSources
                .filter(s => s.format === 'avif')
                .map(s => `${s.src} ${s.width}w`)
                .join(', ')}
              type="image/avif"
            />
          )}
          
          {/* WebP source for good browser support */}
          {formats.includes('webp') && (
            <source
              srcSet={imageSources
                .filter(s => s.format === 'webp')
                .map(s => `${s.src} ${s.width}w`)
                .join(', ')}
              type="image/webp"
            />
          )}
          
          {/* Fallback image */}
          <img
            src={getBestImageSrc()}
            srcSet={generateSrcSet()}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            // Performance hints
            fetchPriority={priority ? "high" : "auto"}
            // Accessibility
            role="img"
            aria-label={alt}
          />
        </picture>
      )}
    </div>
  );
};
