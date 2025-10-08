import React, { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { FeaturedSlideshow } from "@/components/FeaturedSlideshow";
import { SEOContent } from "@/components/SEOContent";
import { FabricItem } from "@/hooks/useFabricItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, Music, Volume2, VolumeX } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [musicFiles, setMusicFiles] = useState<Array<{ id: string; name: string; file_url: string }>>([]);
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioElement] = useState(new Audio());
  const { isAdmin } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  useEffect(() => {
    if (selectedMusic && isMusicPlaying) {
      const music = musicFiles.find(m => m.id === selectedMusic);
      if (music) {
        audioElement.src = music.file_url;
        audioElement.loop = true;
        audioElement.volume = 0.3;
        audioElement.play();
      }
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.pause();
    };
  }, [selectedMusic, isMusicPlaying, musicFiles]);

  const fetchMusicFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('music_files')
        .select('id, name, file_url')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMusicFiles(data || []);
    } catch (error) {
      console.error('Error fetching music files:', error);
    }
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  const handleFavorite = (item: FabricItem) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item.id)) {
        newFavorites.delete(item.id);
      } else {
        newFavorites.add(item.id);
      }
      return newFavorites;
    });
  };

  const handleShare = (item: FabricItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content pb-20' : ''}`}>
      <Hero />
      
      {/* Music Player Section */}
      <div className="container mx-auto px-4 py-6">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Background Music</span>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto max-w-md">
              <div className="flex-1 flex items-center gap-2">
                <Select value={selectedMusic} onValueChange={setSelectedMusic}>
                  <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select music" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-lg">
                    {musicFiles.map((music) => (
                      <SelectItem key={music.id} value={music.id}>
                        {music.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedMusic && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleMusic}
                      className="bg-background/80 backdrop-blur-sm shrink-0"
                    >
                      {isMusicPlaying ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedMusic("");
                        setIsMusicPlaying(false);
                      }}
                      className="shrink-0"
                    >
                      Clear
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <FeaturedSlideshow 
        onItemClick={handleItemClick}
      />
      
      <FestivalBanners />
      
      <FabricFilterSection onItemClick={handleItemClick} />
      
      <FabricGallery 
        onItemClick={handleItemClick}
      />

      {/* SEO Content Section */}
      <SEOContent />

      {/* Social Media Modal - Both Desktop and Mobile */}
      {selectedItem && (
        <SocialMediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          onSearchClick={() => setShowFilters(true)}
          onFilterClick={() => setShowFilters(true)}
          onWishlistClick={() => setShowFilters(true)}
          wishlistCount={favorites.size}
        />
      )}

      {/* Mobile Filters Modal */}
      {isMobile && showFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 mobile-filter-backdrop"
            onClick={() => setShowFilters(false)}
          />
          <EnhancedFilters
            isMobile={true}
            onClose={() => setShowFilters(false)}
          />
        </>
      )}
    </div>
  );
};

export default Index;
