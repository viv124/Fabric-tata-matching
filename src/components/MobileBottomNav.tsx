import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileBottomNavProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onWishlistClick?: () => void;
  wishlistCount?: number;
}

export const MobileBottomNav = ({ 
  onSearchClick, 
  onFilterClick, 
  onWishlistClick,
  wishlistCount = 0 
}: MobileBottomNavProps) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      onClick: undefined,
    },
    {
      icon: Search,
      label: "Search",
      path: null,
      onClick: onSearchClick,
    },
    {
      icon: Heart,
      label: "Favorites",
      path: null,
      onClick: onWishlistClick,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      icon: ShoppingBag,
      label: "Admin",
      path: "/admin",
      onClick: undefined,
    },
    {
      icon: Menu,
      label: "Filters",
      path: null,
      onClick: onFilterClick,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-border/50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;
          
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-accent/20 text-accent" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              onClick={item.onClick}
              asChild={item.path ? true : false}
            >
              {item.path ? (
                <Link to={item.path} className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 text-xs p-0 flex items-center justify-center bg-red-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 text-xs p-0 flex items-center justify-center bg-red-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
