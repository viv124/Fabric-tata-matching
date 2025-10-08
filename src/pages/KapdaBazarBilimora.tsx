import React from 'react';
import { PageSEO } from '@/components/PageSEO';
import { SEOContent } from '@/components/SEOContent';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

const KapdaBazarBilimora = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO 
        title="Kapda Bazar Bilimora - Best Fabric Shop | Tata Matching Center"
        description="Visit Tata Matching Center, the best kapda bazar in Bilimora. Premium fabric shop with designer fabrics, wedding materials, and party wear. Located in Bilimora 396321."
        keywords="kapda bazar bilimora, best fabric shop bilimora, fabric shop near bilimora, kapad dukan bilimora, astar dukaan bilimora, designer fabric bilimora"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
              Kapda Bazar Bilimora - Best Fabric Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Welcome to Tata Matching Center, the premier kapda bazar in Bilimora. 
              We offer the finest collection of designer fabrics, wedding materials, 
              and party wear fabrics in Bilimora and surrounding areas.
            </p>
          </div>

          {/* Location Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Bilimora, Gujarat 396321</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground">+91 77780 36741</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Timings</h3>
              <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Our Services at Kapda Bazar Bilimora
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👗</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Designer Fabrics</h3>
                <p className="text-muted-foreground">
                  Premium designer fabric collection at our kapda bazar in Bilimora. 
                  Best quality materials for all your fashion needs.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Wedding Fabrics</h3>
                <p className="text-muted-foreground">
                  Exquisite wedding fabric collection at Tata Matching Center. 
                  Perfect materials for your special day in Bilimora.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Party Wear Fabrics</h3>
                <p className="text-muted-foreground">
                  Trendy party wear fabrics at our kapda bazar. 
                  Latest designs and premium quality materials.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Why Choose Tata Matching Center - Best Kapda Bazar in Bilimora?
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Best Kapda Bazar in Bilimora</h3>
                    <p className="text-muted-foreground">
                      We are recognized as the premier kapda bazar in Bilimora with the most extensive 
                      collection of premium fabrics and materials.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expert Fabric Matching</h3>
                    <p className="text-muted-foreground">
                      Our experienced team provides professional consultation for perfect fabric 
                      selection and matching services.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Wholesale & Retail</h3>
                    <p className="text-muted-foreground">
                      Competitive prices for both bulk orders and individual purchases at our 
                      kapda bazar in Bilimora.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Visit Our Kapda Bazar</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Bilimora, Gujarat 396321</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 77780 36741</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>9:00 AM - 7:00 PM (Mon-Sat)</span>
                </div>
              </div>
              
              <div className="mt-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833.9005256000864!2d72.96285038691514!3d20.769065650298565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0efe9dc289677%3A0x733c4afcff8440ed!2sBilimora%20Tata%20matching%20center%2C%20fabric%20shop%2Ccotton!5e0!3m2!1sen!2sin!4v1759578533062!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{border: 0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tata Matching Center Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-serif font-bold text-center mb-8">
            Related Services in Bilimora
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "Kapda Bazar Bilimora",
              "Best Fabric Shop Bilimora",
              "Fabric Shop Near Bilimora",
              "Kapad Dukan Bilimora",
              "Astar Dukaan Bilimora",
              "Designer Fabric Bilimora",
              "Wedding Fabric Bilimora",
              "Party Wear Fabric Bilimora",
              "Fabric Matching Center Bilimora",
              "Textile Shop Bilimora",
              "Fabric Dealer Bilimora",
              "Kapad Wholesale Bilimora"
            ].map((keyword, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            Tata Matching Center is your one-stop destination for all fabric needs in Bilimora. 
            As the leading kapda bazar and fabric shop, we provide premium quality fabrics 
            with expert matching services to help you find the perfect materials for any occasion.
          </p>
        </div>
      </section>

      <SEOContent />
    </div>
  );
};

export default KapdaBazarBilimora;
