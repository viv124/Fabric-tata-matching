import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/homepage.jpg";
import shopBackground from "@/assets/homepage.jpg";
import instagramLogo from "/instgram_logo.png";
import pinterestLogo from "/pinterest_logo.png";

export const Hero = () => {
  const scrollToGallery = () => {
    const galleryElement = document.getElementById('fabric-gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious fabric shop interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
        <div className="absolute inset-0 fabric-texture opacity-30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            <span className="block">Tata Matching</span>
            <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-shimmer">
              Center
            </span>
          </h1>
          
          <p className="font-elegant text-lg sm:text-2xl lg:text-3xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            Best Fabric Shop in Bilimora • Premier Kapad Dukan • Astar Dukaan • Designer Fabrics Collection
          </p>
          
          <p className="font-elegant text-base sm:text-lg lg:text-xl mb-8 text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            જ્યાં પરંપરા ભવ્યતાને મળે છે • પ્રીમિયમ ફેબ્રિક બુટિક અનુભવ • વધુ શ્રેષ્ઠ
          </p>
        </div>
        
        {/* Contact Information - Boutique Style */}
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 border border-white/10 shadow-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 group text-center sm:text-left">
                <a href="https://wa.me/917778036741?text=Hello%20from%20Tata%20Matching%20Center!" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp +91 77780 36741" className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/60 focus:ring-offset-2 focus:ring-offset-transparent">
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                <div className="text-center sm:text-left">
                  <span className="text-accent font-serif font-medium text-sm block">WhatsApp</span>
                  <a href="https://wa.me/917778036741?text=Hello%20from%20Tata%20Matching%20Center!" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp +91 77780 36741" className="text-white hover:text-accent transition-colors font-medium text-lg">
                    +91 77780 36741
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 group text-center sm:text-left">
                <a href="tel:+917490836570" aria-label="Call +91 74908 36570" className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-transparent">
                  <span className="text-2xl">📞</span>
                </a>
                <div className="text-center sm:text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Mobile</span>
                  <a href="tel:+917490836570" className="text-white hover:text-accent transition-colors font-medium text-lg">
                    +91 74908 36570
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 group text-center sm:text-left">
                <a href="https://share.google/977qj3y0QUjBZoWtG" target="_blank" rel="noopener noreferrer" aria-label="Open location: Bilimora 396321" className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-transparent">
                  <MapPin className="w-6 h-6 text-accent" />
                </a>
                <div className="text-center sm:text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Location</span>
                  <a 
                    href="https://share.google/977qj3y0QUjBZoWtG" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Open location: Bilimora 396321"
                    className="text-white hover:text-accent transition-colors font-medium text-lg"
                  >
                    Bilimora 396321
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 group text-center sm:text-left">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl">🏪</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Boutique</span>
                  <span className="text-white font-medium text-lg">Best Fabric Shop in Bilimora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connect With Us - Social Media Links */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 border border-white/20 shadow-2xl">
          <h3 className="text-white font-serif font-semibold text-xl mb-8 text-center">Connect With Us</h3>
          <div className="flex justify-center gap-6 sm:gap-8">
            <a 
              href="https://www.instagram.com/tata_matching_center/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="group flex flex-col items-center"
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xl border-2 border-white/20">
                  <img 
                    src={instagramLogo} 
                    alt="Instagram" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="text-white text-base font-semibold block mb-1">Instagram</span>
                <span className="text-white/80 text-sm">@tata_matching_center</span>
              </div>
            </a>
            
            <a 
              href="https://in.pinterest.com/tatamatchingcenter/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Pinterest"
              className="group flex flex-col items-center"
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xl border-2 border-white/20">
                  <img 
                    src={pinterestLogo} 
                    alt="Pinterest" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="text-white text-base font-semibold block mb-1">Pinterest</span>
                <span className="text-white/80 text-sm">tatamatchingcenter</span>
              </div>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Button 
            asChild
            className="btn-hero group w-full sm:w-auto text-lg"
            size="lg"
          >
            <Link to="/admin">
              <ShoppingBag className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline font-serif">Admin Panel</span>
              <span className="sm:hidden font-serif">Admin</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={scrollToGallery}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto text-lg font-serif rounded-2xl px-8 py-5 transition-all duration-500"
          >
            Browse Gallery
          </Button>
        </div>
      </div>

      {/* Floating Elements - Enhanced boutique style */}
      <div className="absolute top-16 left-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-24 right-12 w-40 h-40 bg-primary-glow/10 rounded-full blur-3xl animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse hidden xl:block" />
      
      {/* Shop Background Image - Enhanced decorative element */}
      <div className="absolute top-1/2 right-4 sm:right-8 lg:right-16 transform -translate-y-1/2 opacity-15 sm:opacity-25 pointer-events-none hidden md:block">
        <div className="relative">
          <img 
            src={shopBackground} 
            alt="Fabric Design" 
            className="w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 object-contain filter saturate-150 animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
};