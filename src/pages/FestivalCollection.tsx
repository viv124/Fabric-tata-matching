import React, { useState, useEffect } from "react";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { SEOContent } from "@/components/SEOContent";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageSEO } from "@/components/PageSEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const FestivalCollection = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites] = useState(new Set<string>());
  const [musicFiles, setMusicFiles] = useState<Array<{ id: string; name: string; file_url: string }>>([]);
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioElement] = useState(new Audio());
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  // Auto-play music when music files are loaded
  useEffect(() => {
    if (musicFiles.length > 0 && !selectedMusic) {
      // Select the first music file by default
      setSelectedMusic(musicFiles[0].id);
      setIsMusicPlaying(true);
    }
  }, [musicFiles, selectedMusic]);

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

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content' : ''}`}>
      <PageSEO 
        title="Festival Collection | Surat Kapad Festival Fabrics"
        description="Discover our exclusive festival collection of Surat Kapad fabrics. Perfect materials for Navratri, Diwali, and all Gujarati festivals."
        keywords="festival fabrics, Surat Kapad festival, Navratri fabrics, Diwali fabrics, Gujarati festival textiles, celebration fabrics"
        canonicalUrl="https://tata-matching-center.vercel.app/festival-collection"
      />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Festival Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover our exclusive festival collection of Surat Kapad fabrics. 
            Perfect materials for Navratri, Diwali, and all Gujarati festivals.
          </p>
          
          {/* Music Selection */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 w-full sm:flex-1">
              <Music className="h-5 w-5 text-primary" />
              <Select value={selectedMusic} onValueChange={setSelectedMusic}>
                <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select background music" />
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
              )}
            </div>
            
            {selectedMusic && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMusic}
                className="bg-background/80 backdrop-blur-sm"
              >
                {isMusicPlaying ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Festival Banners */}
      <div className="py-8">
        <FestivalBanners />
      </div>

      {/* Fabric Filters - Pre-filtered for Festival */}
      <div className="py-8">
        <FabricFilterSection onItemClick={handleItemClick} />
      </div>
      
      {/* Fabric Gallery */}
      <div className="py-8">
        <FabricGallery 
          onItemClick={handleItemClick}
        />
      </div>

      {/* SEO Content Section */}
      <SEOContent />

      {/* Social Media Modal */}
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
        />
      )}

      {/* Mobile Filters Modal */}
      {isMobile && showFilters && (
        <EnhancedFilters
          isMobile={true}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default FestivalCollection;
