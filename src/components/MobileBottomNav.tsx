import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileBottomNavProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onWishlistClick?: () => void;
}

export const MobileBottomNav = ({ 
  onSearchClick, 
  onFilterClick, 
  onWishlistClick
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-border/50 md:hidden safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-sm mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;
          
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200 mobile-touch-target ${
                isActive 
                  ? "bg-accent/20 text-accent" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              onClick={item.onClick}
              asChild={item.path ? true : false}
            >
              {item.path ? (
                <Link to={item.path} className="flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5" />
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
