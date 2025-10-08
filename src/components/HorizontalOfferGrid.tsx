import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { FabricItem } from "@/hooks/useFabricItems";
import { OptimizedImage } from "./OptimizedImage";

interface HorizontalOfferGridProps {
  items: FabricItem[];
  title: string;
  subtitle?: string;
  badgeColor?: string;
  badgeIcon?: React.ReactNode;
  onItemClick: (item: FabricItem) => void;
  className?: string;
}

export const HorizontalOfferGrid = ({
  items,
  title,
  subtitle,
  badgeColor = "from-red-500 to-red-600",
  badgeIcon = "🔥",
  onItemClick,
  className = ""
}: HorizontalOfferGridProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <Card className={`card-gradient border-accent/20 ${className}`}>
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge className={`bg-gradient-to-r ${badgeColor} text-white`}>
              {badgeIcon} {title}
            </Badge>
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
          </div>
          
          {/* Scroll Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scrollable Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide mobile-scroll"
            onScroll={checkScrollButtons}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((item, index) => (
              <Card
                key={item.id}
                className="flex-shrink-0 w-72 cursor-pointer hover-lift group overflow-hidden transition-all duration-300"
                onClick={() => onItemClick(item)}
                style={{ 
                  scrollSnapAlign: 'start',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <OptimizedImage
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      sizes="80px"
                      quality={70}
                    />
                    
                    {/* Discount Badge */}
                    {item.discount > 0 && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="text-xs bg-red-500 text-white">
                          -{item.discount}%
                        </Badge>
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute -top-2 -left-2">
                        <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Star className="h-2 w-2 mr-1 fill-current" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{(item.price * (1 - (item.discount || 0) / 100)).toFixed(0)}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.price.toFixed(0)}
                        </span>
                      )}
                    </div>
                    
                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.material && (
                        <Badge variant="outline" className="text-xs">
                          {item.material}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
