import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, Star, Tag, Palette, SlidersHorizontal } from "lucide-react";
import { useFabricItems, FabricFilters } from "@/hooks/useFabricItems";
import { HorizontalOfferGrid } from "./HorizontalOfferGrid";

interface EnhancedFiltersProps {
  onClose?: () => void;
  isMobile?: boolean;
  onItemClick?: (item: any) => void;
}

const fabricColors = [
  { name: "Red", value: "red", hex: "#ef4444" },
  { name: "Blue", value: "blue", hex: "#3b82f6" },
  { name: "Green", value: "green", hex: "#22c55e" },
  { name: "Yellow", value: "yellow", hex: "#eab308" },
  { name: "Purple", value: "purple", hex: "#a855f7" },
  { name: "Pink", value: "pink", hex: "#ec4899" },
  { name: "Orange", value: "orange", hex: "#f97316" },
  { name: "Black", value: "black", hex: "#000000" },
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Gray", value: "gray", hex: "#6b7280" },
  { name: "Brown", value: "brown", hex: "#8b4513" },
  { name: "Navy", value: "navy", hex: "#1e3a8a" },
];

const materials = [
  "Silk", "Cotton", "Linen", "Wool", "Synthetic", "Chiffon", "Georgette", "Crepe", "Satin", "Velvet"
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "discount", label: "Best Discount" },
  { value: "popular", label: "Most Popular" },
];

export const EnhancedFilters = ({ onClose, isMobile = false, onItemClick }: EnhancedFiltersProps) => {
  const { categories, filters, updateFilters, clearFilters, fabricItems } = useFabricItems();
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");
  
  // Calculate actual price range from fabric items
  const actualPriceRange = React.useMemo(() => {
    if (fabricItems.length === 0) return { min: 0, max: 10000 };
    
    const prices = fabricItems.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return { min: minPrice, max: maxPrice };
  }, [fabricItems]);
  
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || actualPriceRange.min,
    filters.maxPrice || actualPriceRange.max
  ]);
  
  // Update price range when actual range changes
  React.useEffect(() => {
    if (fabricItems.length > 0) {
      setPriceRange([
        filters.minPrice || actualPriceRange.min,
        filters.maxPrice || actualPriceRange.max
      ]);
    }
  }, [actualPriceRange, filters.minPrice, filters.maxPrice]);
  
  const [selectedColors, setSelectedColors] = useState<string[]>(
    filters.color ? filters.color.split(",") : []
  );
  const [selectedMaterial, setSelectedMaterial] = useState(filters.material || "");
  const [sortBy, setSortBy] = useState(filters.sortBy || "newest");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateFilters({ searchQuery: query || undefined });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ 
      minPrice: value[0] > actualPriceRange.min ? value[0] : undefined,
      maxPrice: value[1] < actualPriceRange.max ? value[1] : undefined
    });
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const handleMinPriceInput = (raw: string) => {
    const numeric = Number(raw.replace(/[^0-9]/g, ""));
    const currentMax = priceRange[1];
    const nextMin = clamp(Number.isNaN(numeric) ? actualPriceRange.min : numeric, actualPriceRange.min, currentMax);
    const next = [nextMin, currentMax] as [number, number];
    setPriceRange(next);
    updateFilters({
      minPrice: nextMin > actualPriceRange.min ? nextMin : undefined,
      maxPrice: currentMax < actualPriceRange.max ? currentMax : undefined,
    });
  };

  const handleMaxPriceInput = (raw: string) => {
    const numeric = Number(raw.replace(/[^0-9]/g, ""));
    const currentMin = priceRange[0];
    const nextMax = clamp(Number.isNaN(numeric) ? actualPriceRange.max : numeric, currentMin, actualPriceRange.max);
    const next = [currentMin, nextMax] as [number, number];
    setPriceRange(next);
    updateFilters({
      minPrice: currentMin > actualPriceRange.min ? currentMin : undefined,
      maxPrice: nextMax < actualPriceRange.max ? nextMax : undefined,
    });
  };

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    updateFilters({ 
      color: newColors.length > 0 ? newColors.join(",") : undefined 
    });
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    updateFilters({ material: material === "all" ? undefined : material });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateFilters({ sortBy: sort === "newest" ? undefined : sort });
  };

  const getActiveFilterCount = () => {
    return Object.keys(filters).filter(key => {
      const value = filters[key as keyof FabricFilters];
      return value !== undefined && 
             value !== "" && 
             value !== "newest"; // Don't count default sort as active filter
    }).length;
  };

  const topOffers = fabricItems.filter(item => item.discount > 0).slice(0, 6);

  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-background flex flex-col mobile-filter-modal' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm flex-shrink-0 sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Filters & Search</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="touch-friendly">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className={`${isMobile ? 'flex-1 overflow-y-auto p-4 pb-24 mobile-filter-container' : ''}`}>
        <div className={`space-y-6 ${isMobile ? 'space-y-8' : ''}`}>
          
          {/* Search Bar */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Search Fabrics</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fabrics... (e.g., 'silk red', 'cotton dress', 'wedding')"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  // Handle Enter key to dismiss keyboard on mobile
                  if (e.key === 'Enter' && isMobile) {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                  }
                }}
                onBlur={() => {
                  // Dismiss keyboard on mobile after typing
                  if (isMobile) {
                    setTimeout(() => {
                      (document.activeElement as HTMLElement)?.blur();
                    }, 100);
                  }
                }}
                className="pl-10 input-boutique mobile-input-focus"
                inputMode="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Price Range Slider + Inputs */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Min (₹)</Label>
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={priceRange[0]}
                    onChange={(e) => handleMinPriceInput(e.target.value)}
                    onKeyDown={(e) => {
                      // Handle Enter key to dismiss keyboard on mobile
                      if (e.key === 'Enter' && isMobile) {
                        e.preventDefault();
                        (e.target as HTMLElement).blur();
                      }
                    }}
                    onBlur={() => {
                      // Dismiss keyboard on mobile after typing
                      if (isMobile) {
                        setTimeout(() => {
                          (document.activeElement as HTMLElement)?.blur();
                        }, 100);
                      }
                    }}
                    className="input-boutique mobile-input-focus"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Max (₹)</Label>
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={priceRange[1]}
                    onChange={(e) => handleMaxPriceInput(e.target.value)}
                    onKeyDown={(e) => {
                      // Handle Enter key to dismiss keyboard on mobile
                      if (e.key === 'Enter' && isMobile) {
                        e.preventDefault();
                        (e.target as HTMLElement).blur();
                      }
                    }}
                    onBlur={() => {
                      // Dismiss keyboard on mobile after typing
                      if (isMobile) {
                        setTimeout(() => {
                          (document.activeElement as HTMLElement)?.blur();
                        }, 100);
                      }
                    }}
                    className="input-boutique mobile-input-focus"
                    autoComplete="off"
                  />
                </div>
              </div>
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={actualPriceRange.max}
                min={actualPriceRange.min}
                step={Math.max(1, Math.floor((actualPriceRange.max - actualPriceRange.min) / 100))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </Label>
            <div className={`grid gap-2 ${isMobile ? 'grid-cols-5' : 'grid-cols-6 sm:grid-cols-8'}`}>
              {fabricColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorToggle(color.value)}
                  className={`relative ${isMobile ? 'w-12 h-12' : 'w-10 h-10 sm:w-12 sm:h-12'} rounded-full border-2 transition-all duration-200 hover:scale-110 touch-friendly ${
                    selectedColors.includes(color.value)
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColors.includes(color.value) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {selectedColors.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedColors.map((color) => (
                  <Badge key={color} variant="secondary" className="text-xs">
                    {fabricColors.find(c => c.value === color)?.name}
                    <button
                      onClick={() => handleColorToggle(color)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Material Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Material</Label>
            <Select onValueChange={handleMaterialChange} value={selectedMaterial}>
              <SelectTrigger className="input-boutique">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                {materials.map((material) => (
                  <SelectItem key={material} value={material.toLowerCase()}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Label>
            <Select onValueChange={handleSortChange} value={sortBy}>
              <SelectTrigger className="input-boutique">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-muted-foreground">
                Current sort: {sortBy} | Active filters: {getActiveFilterCount()}
              </div>
            )}
          </div>

          {/* Category Pills */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Categories</Label>
            <div className={`flex flex-wrap gap-2 ${isMobile ? 'gap-2' : 'sm:gap-3'}`}>
              <Button
                variant={!filters.category || filters.category === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ category: undefined })}
                className="rounded-full px-3 py-2 text-sm touch-friendly"
              >
                <Tag className="h-3 w-3 mr-1" />
                All Fabrics
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filters.category === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilters({ category: category.name })}
                  className="rounded-full px-3 py-2 text-sm touch-friendly"
                >
                  {category.name}
                </Button>
              ))}
              <Button
                variant={filters.featured === true ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ featured: filters.featured === true ? undefined : true })}
                className="rounded-full px-3 py-2 text-sm touch-friendly"
              >
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Button>
            </div>
          </div>

          {/* Active Filters & Clear */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              <Badge className="bg-accent text-accent-foreground">
                {getActiveFilterCount()}
              </Badge>
              {sortBy !== "newest" && (
                <Badge variant="outline" className="text-xs">
                  Sorted by: {sortOptions.find(opt => opt.value === sortBy)?.label}
                </Badge>
              )}
            </div>
            {(getActiveFilterCount() > 0 || sortBy !== "newest") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  clearFilters();
                  setSortBy("newest");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Top Offers Section */}
          {onItemClick && (
            <HorizontalOfferGrid
              items={topOffers}
              title="Top Offers"
              subtitle="Best deals available"
              badgeColor="from-red-500 to-red-600"
              badgeIcon="🔥"
              onItemClick={onItemClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
