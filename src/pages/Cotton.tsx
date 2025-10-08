import React, { useState, useEffect } from "react";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { SEOContent } from "@/components/SEOContent";
import { FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageSEO } from "@/components/PageSEO";

const Cotton = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites] = useState(new Set<string>());
  const isMobile = useIsMobile();

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  // Set cotton filter on page load
  useEffect(() => {
    // This will be handled by the FabricFilterSection component
    // to automatically filter for cotton materials
  }, []);

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content' : ''}`}>
      <PageSEO 
        title="Cotton Fabrics | Premium Surat Kapad Cotton Materials"
        description="Explore our extensive collection of premium Surat Kapad cotton fabrics. Natural, breathable, and comfortable cotton materials for all your needs."
        keywords="cotton fabrics, Surat Kapad cotton, natural cotton, cotton textiles, breathable fabrics, cotton materials"
        canonicalUrl="https://tata-matching-center.vercel.app/cotton"
      />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cotton Fabrics Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our extensive collection of premium Surat Kapad cotton fabrics. 
            Natural, breathable, and comfortable cotton materials for all your needs.
          </p>
        </div>
      </div>

      {/* Fabric Filters - Pre-filtered for Cotton */}
      <div className="py-8">
        <FabricFilterSection onItemClick={handleItemClick} />
      </div>
      
      {/* Fabric Gallery */}
      <div className="py-8">
        <FabricGallery 
          onItemClick={handleItemClick}
        />
      </div>

      {/* SEO Content Section */}
      <SEOContent />

      {/* Social Media Modal */}
      {selectedItem && (
        <SocialMediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          onSearchClick={() => setShowFilters(true)}
          onFilterClick={() => setShowFilters(true)}
          onWishlistClick={() => setShowFilters(true)}
          wishlistCount={favorites.size}
        />
      )}

      {/* Mobile Filters Modal */}
      {isMobile && showFilters && (
        <EnhancedFilters
          isMobile={true}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Cotton;
