import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  useEffect(() => {
    // Google Analytics 4 (GA4) tracking code
    const GA_TRACKING_ID = 'G-PWL91VH3PZ'; // Google Analytics 4 tracking ID
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: 'Tata Matching Center - Best Fabric Shop in Bilimora',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'fabric_shop',
        'custom_parameter_2': 'bilimora'
      }
    });

    // Track page views
    gtag('event', 'page_view', {
      page_title: 'Tata Matching Center - Best Fabric Shop in Bilimora',
      page_location: window.location.href,
      page_path: window.location.pathname,
      content_group1: 'Fabric Shop',
      content_group2: 'Bilimora'
    });

    // Track custom events
    const trackEvent = (eventName: string, parameters: any = {}) => {
      gtag('event', eventName, {
        event_category: 'Fabric Shop',
        event_label: 'Bilimora',
        ...parameters
      });
    };

    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          event_category: 'Contact',
          event_label: 'WhatsApp Contact'
        });
      });
    });

    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click', {
          event_category: 'Contact',
          event_label: 'Phone Contact'
        });
      });
    });

    // Track gallery interactions
    const galleryItems = document.querySelectorAll('[data-fabric-item]');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        trackEvent('fabric_item_click', {
          event_category: 'Gallery',
          event_label: 'Fabric Item Interaction'
        });
      });
    });

    // Track location clicks
    const locationLinks = document.querySelectorAll('a[href*="google"]');
    locationLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('location_click', {
          event_category: 'Location',
          event_label: 'Google Maps'
        });
      });
    });

    return () => {
      // Cleanup event listeners if needed
      whatsappLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      phoneLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      galleryItems.forEach(item => {
        item.removeEventListener('click', () => {});
      });
      locationLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return null;
};

// SEO Helper Functions
export const trackSEOEvent = (eventName: string, parameters: any = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'SEO',
      event_label: 'Bilimora Fabric Shop',
      ...parameters
    });
  }
};

export const trackKeywordSearch = (keyword: string) => {
  trackSEOEvent('keyword_search', {
    search_term: keyword,
    event_category: 'Search',
    event_label: 'Fabric Keywords'
  });
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
      content_group1: 'Fabric Shop',
      content_group2: 'Bilimora'
    });
  }
};
