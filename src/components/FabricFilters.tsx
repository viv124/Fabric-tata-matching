import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, Star, Tag } from "lucide-react";
import { useFabricItems, FabricFilters } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { EnhancedFilters } from "./EnhancedFilters";

export const FabricFilterSection = () => {
  const { categories, filters, updateFilters, clearFilters, fabricItems } = useFabricItems();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateFilters({ searchQuery: query || undefined });
  };

  const handleFilterChange = (key: keyof FabricFilters, value: any) => {
    updateFilters({ [key]: value === "all" ? undefined : value });
  };

  const getActiveFilterCount = () => {
    return Object.keys(filters).filter(key => {
      const value = filters[key as keyof FabricFilters];
      return value !== undefined && 
             value !== "" && 
             value !== "newest"; // Don't count default sort as active filter
    }).length;
  };

  const topOffers = fabricItems.filter(item => item.discount > 0).slice(0, 3);

  return (
    <>
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-gradient-to-br from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, category, material..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => {
                // Dismiss keyboard on mobile after typing
                if (isMobile) {
                  setTimeout(() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }, 100);
                }
              }}
              className="pl-10 input-boutique"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl"
            >
              <Filter className="h-4 w-4" />
              {isMobile ? "Advanced" : "Filters"}
              {getActiveFilterCount() > 0 && (
                <Badge className="ml-1 bg-accent text-accent-foreground text-xs">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
            
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center animate-fade-in">
          <Button
            variant={!filters.category || filters.category === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("category", "all")}
            className="rounded-full px-4 py-2"
          >
            <Tag className="h-3 w-3 mr-1" />
            All Fabrics
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("category", category.name)}
              className="rounded-full px-4 py-2"
            >
              {category.name}
            </Button>
          ))}
          <Button
            variant={filters.featured === true ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("featured", filters.featured === true ? undefined : true)}
            className="rounded-full px-4 py-2"
          >
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Button>
        </div>

        {/* Advanced Filters - Desktop Only */}
        {showFilters && !isMobile && (
          <EnhancedFilters isMobile={false} />
        )}

        {/* Top Offers Section */}
        {topOffers.length > 0 && (
          <Card className="card-gradient border-accent/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                  🔥 Top Offers
                </Badge>
                <span className="text-sm text-muted-foreground">Limited time deals</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topOffers.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          ₹{(item.price * (1 - item.discount / 100)).toFixed(0)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.price.toFixed(0)}
                        </span>
                        <Badge className="text-xs bg-red-500 text-white">
                          -{item.discount}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
    </>
  );
};