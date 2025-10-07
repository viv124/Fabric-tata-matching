import { useEffect } from 'react';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  robots?: string;
  noindex?: boolean;
}

export const PageSEO = ({ 
  title, 
  description,
  keywords,
  canonicalUrl,
  robots = 'index, follow',
  noindex = false 
}: PageSEOProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update robots directive
    const robotsContent = noindex ? 'noindex, nofollow' : robots;
    updateMetaTag('robots', robotsContent);

    // Update canonical URL
    const finalCanonicalUrl = canonicalUrl || window.location.href;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalCanonicalUrl;

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      // Restore original title (you might want to store the original title)
      document.title = 'Tata Matching Center - Best Fabric Shop in Bilimora | Kapad Dukan | Astar Dukaan';
      
      // Restore original robots directive
      updateMetaTag('robots', 'index, follow');
    };
  }, [title, description, keywords, canonicalUrl, robots, noindex]);

  return null; // This component doesn't render anything
};
