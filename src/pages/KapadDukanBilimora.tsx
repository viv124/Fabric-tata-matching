import React from "react";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Star } from "lucide-react";

const KapadDukanBilimora = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO 
        title="Kapad Dukan Bilimora | Traditional Fabric Store Gujarat"
        description="Visit Kapad Dukan in Bilimora for traditional and modern fabrics. Authentic Gujarati textiles and quality materials for all occasions."
        keywords="Kapad Dukan Bilimora, traditional fabric store, Gujarati textiles, Bilimora fabrics, authentic fabrics Gujarat"
        canonicalUrl="https://tata-matching-center.vercel.app/kapad-dukan-bilimora"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kapad Dukan - Bilimora
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Your trusted traditional Surat Kapad store in Bilimora, near Surat. 
            Discover authentic Surat textiles and quality Gujarati fabrics for every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline">
              Visit Store
            </Button>
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">About Kapad Dukan</h2>
              <p className="text-muted-foreground mb-6">
                Kapad Dukan has been serving the Bilimora community with quality Surat Kapad fabrics and traditional textiles 
                for generations. Located near Surat, we specialize in authentic Surat textiles and modern materials.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-foreground font-medium">Bilimora, Gujarat, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-foreground font-medium">Mon-Sat: 9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-foreground font-medium">+91 7490836570</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-foreground font-medium">ahirevivek7490@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Store Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Traditional Surat Kapad Fabrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Authentic Handloom Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Festival & Wedding Fabrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Custom Tailoring Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Generations of Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Specialties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional fabrics and authentic Gujarati textiles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Traditional Gujarati Fabrics</CardTitle>
                <CardDescription>
                  Authentic handloom and traditional textiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We carry a wide selection of traditional Gujarati fabrics including 
                  handloom materials, authentic prints, and cultural textiles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Festival Collections</CardTitle>
                <CardDescription>
                  Special fabrics for festivals and celebrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From Navratri to Diwali, we have the perfect fabrics for all 
                  Gujarati festivals and special occasions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wedding Fabrics</CardTitle>
                <CardDescription>
                  Elegant materials for weddings and ceremonies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beautiful wedding fabrics including bridal materials, 
                  ceremony textiles, and traditional wedding attire fabrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-primary/5 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Experience Traditional Quality
            </h2>
            <p className="text-muted-foreground mb-6">
              Visit Kapad Dukan for authentic Gujarati fabrics and traditional textiles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Visit Kapad Dukan
              </Button>
              <Button size="lg" variant="outline">
                View Traditional Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KapadDukanBilimora;
