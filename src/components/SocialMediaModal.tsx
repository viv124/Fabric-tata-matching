import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Link, ChevronLeft, ChevronRight } from "lucide-react";
import instagramLogo from "/instgram_logo.png";
import pinterestLogo from "/pinterest_logo.png";
import { FabricItem } from "@/hooks/useFabricItems";
import { ImageGalleryModal } from "./ImageGalleryModal";
import { MultipleImageViewer } from "./MultipleImageViewer";
import { supabase } from "@/integrations/supabase/client";

interface SocialMediaModalProps {
  item: FabricItem;
  onClose: () => void;
}

export const SocialMediaModal = ({ item, onClose }: SocialMediaModalProps) => {
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  React.useEffect(() => {
    fetchAdditionalImages();
  }, [item.id]);

  const fetchAdditionalImages = async () => {
    try {
      const { data, error } = await supabase
        .from('fabric_item_images')
        .select('image_url')
        .eq('fabric_item_id', item.id)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setAdditionalImages(data?.map(img => img.image_url) || []);
    } catch (error) {
      console.error('Error fetching additional images:', error);
    }
  };

  const allImages = [item.image_url, ...additionalImages];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto card-gradient">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold truncate">{item.name}</CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">Social Media Content</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg sm:text-xl font-bold text-primary">
                ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
              </span>
              {item.discount > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{item.discount}% OFF
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="mt-3 space-y-2">
              {item.color && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Color:</span>
                  <span className="text-sm font-semibold text-primary">{item.color}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">Stock:</span>
                <span className={`text-sm font-semibold ${item.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.stock_quantity > 0 ? `${item.stock_quantity} mtr available` : 'Out of stock'}
                </span>
              </div>

              {item.material && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Material:</span>
                  <span className="text-sm font-semibold text-primary">{item.material}</span>
                </div>
              )}

              {item.pattern && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Pattern:</span>
                  <span className="text-sm font-semibold text-primary">{item.pattern}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Social Media Links */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Content</h3>
                <div className="space-y-3 sm:space-y-4">
                  
                   {/* Instagram Reel */}
                  {item.instagram_url && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <img src={instagramLogo} alt="Instagram" className="h-4 w-4 mr-1 object-contain" />
                          Instagram Reel
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => window.open(item.instagram_url!, '_blank', 'noopener,noreferrer')}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open in Instagram
                        </Button>
                      </div>
                      <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                        <img src={instagramLogo} alt="Instagram" className="h-12 w-12 mx-auto mb-3 object-contain" />
                        <p className="text-sm text-muted-foreground mb-3">
                          View this fabric showcase on Instagram
                        </p>
                        <Button
                          onClick={() => window.open(item.instagram_url!, '_blank', 'noopener,noreferrer')}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                        >
                          <img src={instagramLogo} alt="Instagram" className="h-4 w-4 mr-2 object-contain" />
                          View Instagram Reel
                        </Button>
                      </div>
                    </div>
                  )}

                   {/* Pinterest */}
                  {item.pinterest_url && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-red-600">
                          <img src={pinterestLogo} alt="Pinterest" className="h-4 w-4 mr-1 object-contain" />
                          Pinterest
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => window.open(item.pinterest_url!, '_blank', 'noopener,noreferrer')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open in Pinterest
                        </Button>
                      </div>
                      <div className="w-full bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 text-center">
                        <img src={pinterestLogo} alt="Pinterest" className="h-12 w-12 mx-auto mb-3 object-contain" />
                        <p className="text-sm text-muted-foreground mb-3">
                          View this fabric inspiration on Pinterest
                        </p>
                        <Button
                          onClick={() => window.open(item.pinterest_url!, '_blank', 'noopener,noreferrer')}
                          className="bg-red-600 hover:bg-red-700 w-full"
                        >
                          <img src={pinterestLogo} alt="Pinterest" className="h-4 w-4 mr-2 object-contain" />
                          View Pinterest Pin
                        </Button>
                      </div>
                    </div>
                  )}

                   {/* Other Link */}
                  {item.other_link && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gray-600">
                          <Link className="h-4 w-4 mr-1" />
                          Other Link
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => window.open(item.other_link!, '_blank', 'noopener,noreferrer')}
                          className="bg-gray-600 hover:bg-gray-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="w-full bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 text-center">
                        <ExternalLink className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                        <p className="text-sm text-muted-foreground mb-3">
                          Visit external link for more details
                        </p>
                        <Button
                          onClick={() => window.open(item.other_link!, '_blank', 'noopener,noreferrer')}
                          className="bg-gray-600 hover:bg-gray-700 w-full"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit External Link
                        </Button>
                      </div>
                    </div>
                  )}

                  {!item.instagram_url && !item.pinterest_url && !item.other_link && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No social media content available for this fabric.</p>
                      <p className="text-sm mt-2">Add links when uploading to showcase your content!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Multiple Images Gallery */}
            {allImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Images ({allImages.length})</h3>
                <MultipleImageViewer
                  mainImage={item.image_url}
                  additionalImages={additionalImages}
                  itemName={item.name}
                />
              </div>
            )}
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Image Gallery Modal */}
      <ImageGalleryModal
        images={allImages}
        initialIndex={selectedImageIndex}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};
