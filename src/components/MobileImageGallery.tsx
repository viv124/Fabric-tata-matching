import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Share2, Heart, ExternalLink, Instagram } from "lucide-react";
import { FabricItem } from "@/hooks/useFabricItems";

interface MobileImageGalleryProps {
  item: FabricItem;
  onClose: () => void;
  onShare?: (item: FabricItem) => void;
  onFavorite?: (item: FabricItem) => void;
  isFavorite?: boolean;
}

export const MobileImageGallery = ({ 
  item, 
  onClose, 
  onShare, 
  onFavorite, 
  isFavorite = false 
}: MobileImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Mock multiple images for demonstration
  const images = [
    item.image_url,
    // You can add more images here when you have multiple angles
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const isLeftSwipe = deltaX > 50;
    const isRightSwipe = deltaX < -50;

    if (isLeftSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe left - next image
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe right - previous image
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };


  const handleShare = () => {
    if (onShare) {
      onShare(item);
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href,
        });
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
      }
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(item);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-semibold text-base sm:text-lg truncate">{item.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-accent font-bold text-base sm:text-lg">
                ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
              </span>
              {item.discount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  -{item.discount}%
                </Badge>
              )}
            </div>
            
            {/* Product Details */}
            <div className="mt-2 space-y-1">
              {/* Color */}
              {item.color && (
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-medium">Color:</span>
                  <span className="text-white text-xs font-semibold">{item.color}</span>
                </div>
              )}
              
              {/* Stock */}
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-xs font-medium">Stock:</span>
                <span className={`text-xs font-semibold ${item.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.stock_quantity > 0 ? `${item.stock_quantity} mtr available` : 'Out of stock'}
                </span>
              </div>

              {/* Material */}
              {item.material && (
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-medium">Material:</span>
                  <span className="text-white text-xs font-semibold">{item.material}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex items-center justify-center h-full pt-20 pb-24">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            ref={imageRef}
            src={images[currentImageIndex]}
            alt={item.name}
            className="max-w-full max-h-full object-contain transition-all duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            draggable={false}
          />
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="p-4">

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={`text-white hover:bg-white/20 ${
                isFavorite ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-white hover:bg-white/20"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            
            {/* Instagram Link */}
            {item.instagram_url && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(item.instagram_url, '_blank', 'noopener,noreferrer')}
                className="text-white hover:bg-white/20"
                title="View on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            )}
            
            {/* Pinterest Link */}
            {item.pinterest_url && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(item.pinterest_url, '_blank', 'noopener,noreferrer')}
                className="text-white hover:bg-white/20"
                title="View on Pinterest"
              >
                <div className="h-5 w-5 bg-red-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </Button>
            )}
            
            {/* Other Link */}
            {item.other_link && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(item.other_link, '_blank', 'noopener,noreferrer')}
                className="text-white hover:bg-white/20"
                title="View External Link"
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Swipe Instructions */}
          <div className="text-center mt-4">
            <p className="text-white/70 text-xs">
              Swipe left/right to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
