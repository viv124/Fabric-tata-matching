import instagramLogo from "/instgram_logo.png";
import pinterestLogo from "/pinterest_logo.png";

export const SEOContent = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main SEO Content Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              Tata Matching Center - Best Fabric Shop in Bilimora
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Welcome to Tata Matching Center, Bilimora's premier fabric shop and kapad dukan. 
              We are the leading astar dukaan in Bilimora, offering the finest collection of 
              designer fabrics, wedding fabrics, and party wear materials. As the best fabric shop 
              in Bilimora and kapda bazar, we provide near fabric shop services with premium quality materials.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👗</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Designer Fabrics</h3>
                <p className="text-muted-foreground">
                  Premium designer fabric collection at our kapad dukan in Bilimora. 
                  Best quality materials for all your fashion needs.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💒</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Wedding Fabrics</h3>
                <p className="text-muted-foreground">
                  Exquisite wedding fabric collection at Tata Matching Center. 
                  Perfect materials for your special day in Bilimora.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Party Wear Fabrics</h3>
                <p className="text-muted-foreground">
                  Trendy party wear fabrics at our astar dukaan. 
                  Latest designs and premium quality materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Services Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                  Why Choose Tata Matching Center?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground">
                      <strong>Best Fabric Shop in Bilimora</strong> - Premier kapad dukan with extensive collection
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground">
                      <strong>Expert Fabric Matching Service</strong> - Professional consultation for perfect fabric selection
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground">
                      <strong>Wholesale & Retail Services</strong> - Competitive prices for bulk and individual orders
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground">
                      <strong>Premium Quality Materials</strong> - Only the finest fabrics at our astar dukaan
                    </span>
                  </li>
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-serif font-semibold mb-4">Visit Our Store</h4>
                  <p className="text-muted-foreground mb-4">
                    Located in the heart of Bilimora, our fabric shop offers 
                    the best collection of kapad and astar materials.
                    Tata Matching Center, Bilimora, Gujarat 396321
                    બીલીમોરા ટાટા મેચિંગ સેન્ટર, ફેબ્રિક સ્ટોર, કૉટન્સ
                    matching 
                  </p>
                  
                  {/* Google Maps */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold mb-3 text-gray-700">Find Us</h5>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833.9005256000864!2d72.96285038691514!3d20.769065650298565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0efe9dc289677%3A0x733c4afcff8440ed!2sBilimora%20Tata%20matching%20center%2C%20fabric%20shop%2Ccotton!5e0!3m2!1sen!2sin!4v1759578533062!5m2!1sen!2sin" 
                        width="100%" 
                        height="300" 
                        style={{border: 0}} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Tata Matching Center Location"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Address:</strong> Bilimora, Gujarat 396321</p>
                    <p><strong>Phone:</strong> +91 77780 36741</p>
                    <p><strong>WhatsApp:</strong> +91 74908 36570</p>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-semibold mb-3 text-gray-700">Follow Us</h5>
                    <div className="flex gap-3 justify-center">
                      <a 
                        href="https://www.instagram.com/tata_matching_center/?hl=en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Follow us on Instagram"
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <img 
                          src={instagramLogo} 
                          alt="Instagram" 
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-xs font-medium">Instagram</span>
                      </a>
                      
                      <a 
                        href="https://in.pinterest.com/tatamatchingcenter/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Follow us on Pinterest"
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <img 
                          src={pinterestLogo} 
                          alt="Pinterest" 
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-xs font-medium">Pinterest</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section */}
        <section className="text-center">
          <h3 className="text-2xl font-serif font-bold mb-8">
            Our Services in Bilimora
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "Fabric Shop Bilimora",
              "Kapad Dukan Bilimora", 
              "Astar Dukaan Bilimora",
              "Best Fabric in Bilimora",
              "Fabric Matching Center",
              "Textile Shop Bilimora",
              "Designer Fabric Bilimora",
              "Wedding Fabric Bilimora",
              "Party Wear Fabric Bilimora",
              "Fabric Dealer Bilimora",
              "Kapad Wholesale Bilimora",
              "Fabric Retail Bilimora",
              "Kapda Bazar Bilimora",
              "Best Fabric Near Me",
              "Near Fabric Shop Bilimora",
              "Kapda Bazar Navsari",
              "Fabric Shop Near Bilimora"
            ].map((keyword, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Tata Matching Center is your one-stop destination for all fabric needs in Bilimora. 
            As the leading kapad dukan and astar dukaan, we provide premium quality fabrics 
            with expert matching services to help you find the perfect materials for any occasion.
          </p>
        </section>
      </div>
    </div>
  );
};
