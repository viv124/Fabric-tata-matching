import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface PinterestImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  pinterestUrl: string;
}

const extractPinterestImageUrl = (url: string): string => {
  // Try to extract Pinterest image URL from the pin URL
  // This is a simplified approach - in a real app you might use Pinterest API
  if (url.includes('pinterest.com/pin/')) {
    // For demonstration, we'll use a placeholder or try to construct image URL
    // In reality, you'd need Pinterest API or web scraping
    return url;
  }
  return url;
};

export const PinterestImageModal = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title, 
  pinterestUrl 
}: PinterestImageModalProps) => {
  const handleOpenPinterest = () => {
    window.open(pinterestUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Pinterest Inspiration</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenPinterest}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View on Pinterest
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-4">
          <div className="text-center">
            <h3 className="font-medium mb-4">{title}</h3>
            <div className="relative max-w-full max-h-[60vh] mx-auto overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={`Pinterest inspiration for ${title}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Fallback to a placeholder or the fabric image
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This is a Pinterest-inspired view. Click "View on Pinterest" to see the original pin.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};