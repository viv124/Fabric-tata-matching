import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Instagram, Youtube, ExternalLink, ArrowUpDown } from "lucide-react";
import { useFabricItems, FabricItem } from "@/hooks/useFabricItems";

interface FabricGalleryProps {
  onItemClick: (item: FabricItem) => void;
}

export const FabricGallery = ({ onItemClick }: FabricGalleryProps) => {
  const { fabricItems, loading, filters } = useFabricItems();

  if (loading) {
    return (
      <section id="fabric-gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="section-header">Exquisite Collection</h2>
            <p className="font-elegant text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked fabrics with exclusive social media showcase
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="card-gradient overflow-hidden hover-lift animate-scale-in group" style={{animationDelay: `${i * 100}ms`}}>
                <div className="aspect-square overflow-hidden image-boutique">
                  <Skeleton className="w-full h-full shimmer" />
                </div>
                <CardContent className="p-4 sm:p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4 shimmer" />
                  <Skeleton className="h-4 w-full shimmer" />
                  <Skeleton className="h-4 w-1/2 shimmer" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-5 w-16 shimmer" />
                    <Skeleton className="h-8 w-20 rounded-full shimmer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (fabricItems.length === 0) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h2 className="section-header mb-8">Your Boutique Collection</h2>
          <p className="font-elegant text-lg sm:text-xl text-muted-foreground mb-12 sm:mb-16 max-w-2xl mx-auto">
            Begin curating your exquisite fabric collection
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-gradient p-6 sm:p-8 hover-lift opacity-60 group">
                <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl mb-6 flex items-center justify-center group-hover:from-accent/10 group-hover:to-accent/5 transition-all duration-500">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted-foreground/10 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 sm:h-5 bg-muted/60 rounded-full" />
                  <div className="h-3 sm:h-4 bg-muted/40 rounded-full w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fabric-gallery" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="section-header">Premium Collection</h2>
          <p className="font-elegant text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tap any fabric to explore exclusive social media content
          </p>
          {/* Sorting indicator */}
          {filters.sortBy && filters.sortBy !== "newest" && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-sm">
                {filters.sortBy === "oldest" && "Oldest First"}
                {filters.sortBy === "price-low" && "Price: Low to High"}
                {filters.sortBy === "price-high" && "Price: High to Low"}
                {filters.sortBy === "discount" && "Best Discount"}
                {filters.sortBy === "popular" && "Most Popular"}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {fabricItems.map((item, index) => (
            <Card
              key={item.id}
              className="card-gradient cursor-pointer hover-lift group overflow-hidden animate-scale-in"
              onClick={() => onItemClick(item)}
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="aspect-square overflow-hidden image-boutique">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-4 sm:p-6 space-y-4">
                <h3 className="font-serif font-semibold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 font-light leading-relaxed">
                  {item.description}
                </p>
                
                {/* Price and Discount */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-primary font-serif">
                      ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
                    </span>
                    {item.discount > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-muted-foreground line-through font-light">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <span className="text-xs bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full font-medium">
                          -{item.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-2 mb-4">
                  {/* Color */}
                  {item.color && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Color:</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary">{item.color}</span>
                    </div>
                  )}
                  
                  {/* Stock Quantity */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">Stock:</span>
                    <span className={`text-xs sm:text-sm font-semibold ${item.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.stock_quantity > 0 ? `${item.stock_quantity} mtr available` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Material */}
                  {item.material && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Material:</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary">{item.material}</span>
                    </div>
                  )}

                  {/* Pattern */}
                  {item.pattern && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Pattern:</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary">{item.pattern}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.instagram_url && (
                    <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200">
                      <Instagram className="h-3 w-3 mr-1" />
                      Reel
                    </Badge>
                  )}
                  {item.pinterest_url && (
                    <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-700 border-red-200">
                      <div className="h-3 w-3 bg-red-500 rounded-sm mr-1" />
                      Pin
                    </Badge>
                  )}
                  {item.other_link && (
                    <Badge variant="secondary" className="text-xs bg-gray-500/10 text-gray-700 border-gray-200">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Link
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground font-light">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2 opacity-60" />
                  Explore this fabric
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};