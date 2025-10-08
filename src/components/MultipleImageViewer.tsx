import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MultipleImageViewerProps {
  mainImage: string;
  additionalImages: string[];
  itemName: string;
  className?: string;
}

export const MultipleImageViewer = ({ 
  mainImage, 
  additionalImages, 
  itemName,
  className = ""
}: MultipleImageViewerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const allImages = [mainImage, ...additionalImages];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-xl image-boutique group">
        <img
          src={allImages[currentImageIndex]}
          alt={`${itemName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Navigation arrows for multiple images */}
        {hasMultipleImages && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <Card
              key={index}
              className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                index === currentImageIndex
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:ring-1 hover:ring-border'
              }`}
              onClick={() => selectImage(index)}
            >
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${itemName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
