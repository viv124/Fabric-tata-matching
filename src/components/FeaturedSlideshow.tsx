import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Volume2, VolumeX, Upload, Music } from "lucide-react";
import { useFabricItems, FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedSlideshowProps {
  onItemClick: (item: FabricItem) => void;
}

export const FeaturedSlideshow = ({ onItemClick }: FeaturedSlideshowProps) => {
  const { fabricItems } = useFabricItems();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [uploadedSong, setUploadedSong] = useState<File | null>(null);
  const [songUrl, setSongUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get featured items or top items with discounts
  const featuredItems = React.useMemo(() => {
    return fabricItems
      .filter(item => item.featured || item.discount > 0)
      .sort((a, b) => {
        // Sort by featured first, then by discount
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.discount - a.discount;
      })
      .slice(0, 8); // Show top 8 featured items
  }, [fabricItems]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying && !isHovered && featuredItems.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % featuredItems.length
        );
      }, 2000); // Change slide every 2 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovered, featuredItems.length]);

  // Scroll to show 3 items with center item highlighted
  useEffect(() => {
    if (scrollContainerRef.current && featuredItems.length > 0) {
      const container = scrollContainerRef.current;
      const itemWidth = 320 + 24; // Item width + gap (w-80 + gap-6)
      // Center the current item (show 1 item before, current item, 1 item after)
      const scrollPosition = Math.max(0, (currentIndex - 1) * itemWidth);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, featuredItems.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % featuredItems.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/mp4'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid audio file (MP3, OGG, WAV, or MP4)');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      setIsUploading(true);
      setUploadedSong(file);
      
      // Create object URL for the uploaded file
      const url = URL.createObjectURL(file);
      setSongUrl(url);
      setIsUploading(false);
      
      // Auto-enable music when song is uploaded
      setIsMusicEnabled(true);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeUploadedSong = () => {
    if (songUrl) {
      URL.revokeObjectURL(songUrl);
    }
    setUploadedSong(null);
    setSongUrl("");
    setIsMusicEnabled(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const testAudioPlayback = () => {
    if (audioRef.current && songUrl) {
      console.log('Testing audio playback...');
      audioRef.current.volume = 0.5; // Higher volume for testing
      audioRef.current.play().then(() => {
        console.log('Audio started playing');
      }).catch((error) => {
        console.error('Audio play failed:', error);
      });
    } else {
      console.log('No audio source available');
    }
  };

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && songUrl) {
      // Load the new audio source
      audioRef.current.load();
    }
  }, [songUrl]);

  // Music control effect
  useEffect(() => {
    if (audioRef.current) {
      // Set volume to 50% for better audibility
      audioRef.current.volume = 0.5;
      
      if (isMusicEnabled && isPlaying && songUrl) {
        // Add a small delay to ensure audio is loaded
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error('Audio playback failed:', error);
              // Show user-friendly error message
              alert('Audio playback failed. Please try uploading a different audio file.');
              // Try to play again after a short delay
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.play().catch(console.error);
                }
              }, 500);
            });
          }
        }, 200);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicEnabled, isPlaying, songUrl]);

  // Stop music when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Don't render on mobile
  if (isMobile || featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Premium Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our featured fabrics with exclusive discounts and premium quality
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Control Buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {/* Upload Song Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={triggerFileUpload}
              className={`bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg transition-all duration-300 ${
                uploadedSong ? 'ring-2 ring-green-500 bg-green-500/10' : ''
              }`}
              title={uploadedSong ? `Uploaded: ${uploadedSong.name}` : 'Upload your own song'}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : uploadedSong ? (
                <Music className="h-4 w-4 text-green-500" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </Button>

            {/* Music Toggle Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMusic}
                className={`bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg transition-all duration-300 ${
                  isMusicEnabled ? 'ring-2 ring-accent bg-accent/10' : ''
                }`}
                title={isMusicEnabled ? 'Disable background music' : 'Enable background music'}
                disabled={!uploadedSong && !songUrl}
              >
                {isMusicEnabled ? (
                  <Volume2 className="h-4 w-4 text-accent" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              
              {/* Animated Sound Waves */}
              {isMusicEnabled && isPlaying && uploadedSong && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                  <div className="w-0.5 bg-accent animate-pulse" style={{ height: '4px', animationDelay: '0ms' }}></div>
                  <div className="w-0.5 bg-accent animate-pulse" style={{ height: '6px', animationDelay: '100ms' }}></div>
                  <div className="w-0.5 bg-accent animate-pulse" style={{ height: '4px', animationDelay: '200ms' }}></div>
                  <div className="w-0.5 bg-accent animate-pulse" style={{ height: '8px', animationDelay: '300ms' }}></div>
                  <div className="w-0.5 bg-accent animate-pulse" style={{ height: '4px', animationDelay: '400ms' }}></div>
                </div>
              )}
            </div>

            {/* Play/Pause Button with Circular Progress */}
            <div className="relative">
              {/* Circular Progress Ring */}
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - (currentIndex + 1) / featuredItems.length)}`}
                  className="text-accent transition-all duration-1000"
                />
              </svg>
              
              {/* Play/Pause Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

   

          {/* Mobile Song Info - Bottom Position */}
          {uploadedSong && (
            <div className="fixed bottom-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-2xl border-2 border-green-200 sm:hidden block animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">Your Song</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeUploadedSong}
                  className="h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                  title="Remove uploaded song"
                >
                  ×
                </Button>
              </div>
              
              <div className="text-xs text-gray-800 font-medium truncate mb-2" title={uploadedSong.name}>
                {uploadedSong.name}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testAudioPlayback}
                  className="text-xs h-6 px-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 flex-1"
                >
                  🔊 Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMusicEnabled(!isMusicEnabled)}
                  className={`text-xs h-6 px-2 flex-1 ${
                    isMusicEnabled 
                      ? 'bg-green-100 text-green-700 border-green-300' 
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                  }`}
                >
                  {isMusicEnabled ? '🎵 ON' : '🔇 OFF'}
                </Button>
              </div>
            </div>
          )}

          {/* Slideshow Items - Show 3 items at a time */}
          <div className="relative overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`flex-shrink-0 w-80 cursor-pointer hover-lift group overflow-hidden animate-scale-in snap-start transition-all duration-500 ${
                  index === currentIndex 
                    ? 'ring-4 ring-accent scale-105 shadow-2xl bg-gradient-to-br from-accent/5 to-primary/5' 
                    : index === currentIndex - 1 || index === currentIndex + 1
                    ? 'ring-1 ring-muted-foreground/30 scale-95 opacity-80'
                    : 'opacity-50 scale-90'
                }`}
                onClick={() => onItemClick(item)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden image-boutique relative">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                        -{item.discount}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className={`p-6 space-y-4 ${index === currentIndex ? 'bg-gradient-to-br from-accent/10 to-primary/10' : ''}`}>
                  <div>
                    <h3 className={`font-serif font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1 ${
                      index === currentIndex ? 'text-2xl text-accent' : 'text-xl'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`mb-4 line-clamp-2 font-light leading-relaxed ${
                      index === currentIndex ? 'text-base text-foreground' : 'text-sm text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Price and Discount */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-primary font-serif ${
                        index === currentIndex ? 'text-3xl' : 'text-2xl'
                      }`}>
                        ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className={`text-muted-foreground line-through font-light ${
                            index === currentIndex ? 'text-base' : 'text-sm'
                          }`}>
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    {/* Color */}
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground font-medium">Color:</span>
                        <span className="text-sm font-semibold text-primary">{item.color}</span>
                      </div>
                    )}
                    
                    {/* Material */}
                    {item.material && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground font-medium">Material:</span>
                        <span className="text-sm font-semibold text-primary">{item.material}</span>
                      </div>
                    )}

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">Stock:</span>
                      <span className={`text-sm font-semibold ${item.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.stock_quantity > 0 ? `${item.stock_quantity} mtr available` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                title={`Item ${index + 1} of ${featuredItems.length}`}
              />
            ))}
          </div>
          
          {/* Circular Progress Indicator */}
          <div className="flex justify-center mt-4">
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {featuredItems.length} • Auto-cycling every 2s
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        onLoadedData={() => {
          console.log('Audio loaded successfully');
        }}
        onError={(e) => {
          console.error('Audio loading error:', e);
        }}
        onCanPlay={() => {
          console.log('Audio can play');
        }}
      >
        {songUrl ? (
          <source src={songUrl} type={uploadedSong?.type || "audio/mpeg"} />
        ) : (
          <>
            <source src="/audio/background-music.mp3" type="audio/mpeg" />
            <source src="/audio/background-music.ogg" type="audio/ogg" />
          </>
        )}
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};
