import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles } from "lucide-react";
import { useFabricItems } from "@/hooks/useFabricItems";

export const FestivalBanners = () => {
  const { festivalBanners, loading } = useFabricItems();

  if (loading || festivalBanners.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold gradient-text">
              Festival Specials
            </h2>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="font-elegant text-base sm:text-lg text-muted-foreground">
            Exclusive collections for special occasions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {festivalBanners.map((banner, index) => (
            <Card 
              key={banner.id} 
              className="card-gradient overflow-hidden hover-lift group animate-scale-in"
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className="aspect-video overflow-hidden image-boutique">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif font-bold text-lg sm:text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {banner.title}
                  </h3>
                  <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-xs font-medium">
                    Special
                  </Badge>
                </div>
                
                {banner.description && (
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3 font-light leading-relaxed">
                    {banner.description}
                  </p>
                )}
                
                {(banner.start_date || banner.end_date) && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 opacity-60" />
                    <span>
                      {banner.start_date && `From ${new Date(banner.start_date).toLocaleDateString()}`}
                      {banner.start_date && banner.end_date && ' - '}
                      {banner.end_date && `Until ${new Date(banner.end_date).toLocaleDateString()}`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};