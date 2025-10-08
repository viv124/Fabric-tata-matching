import React, { useState } from "react";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { SEOContent } from "@/components/SEOContent";
import { FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageSEO } from "@/components/PageSEO";

const DesignerFabrics = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites] = useState(new Set<string>());
  const isMobile = useIsMobile();

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content' : ''}`}>
      <PageSEO 
        title="Designer Fabrics Collection | Premium Fashion Materials"
        description="Explore our exclusive designer fabrics collection featuring premium materials from top designers. Perfect for couture fashion and luxury garments."
        keywords="designer fabrics, premium fabrics, couture materials, luxury fabrics, fashion designer materials, high-end textiles"
        canonicalUrl="https://tata-matching-center.vercel.app/designer-fabrics"
      />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Designer Fabrics Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of designer Surat Kapad fabrics featuring premium materials 
            from renowned fashion designers. Perfect for couture creations and luxury garments.
          </p>
        </div>
      </div>

      {/* Fabric Filters - Pre-filtered for Designer */}
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

export default DesignerFabrics;
