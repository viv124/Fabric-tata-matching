import React from "react";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Star } from "lucide-react";

const BilimoraFabricShop = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO 
        title="Bilimora Fabric Shop | Premium Surat Kapad Textiles in Gujarat"
        description="Visit our premium Surat Kapad fabric shop in Bilimora, Gujarat. Quality textiles, designer fabrics, and expert service for all your fabric needs."
        canonicalUrl="https://tata-matching-center.vercel.app/bilimora-fabric-shop"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tata Matching Center - Bilimora
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Your premier destination for quality Surat Kapad fabrics in Bilimora, Gujarat. 
            Located near Surat, we offer the finest Surat textiles and designer materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Visit Our Shop
            </Button>
            <Button size="lg" variant="outline">
              View Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Bilimora Location</h2>
              <p className="text-muted-foreground mb-6">
                Located in the heart of Bilimora, near Surat, our fabric shop offers a wide range of premium Surat Kapad textiles 
                and designer fabrics. We pride ourselves on quality Surat fabrics and exceptional customer service.
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
              <h3 className="text-xl font-semibold mb-4">Shop Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Premium Surat Kapad Fabrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Expert Fabric Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Custom Design Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Wholesale Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Professional Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Surat Kapad fabric solutions for all your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Fabric Selection</CardTitle>
                <CardDescription>
                  Expert guidance in choosing the right Surat Kapad fabrics for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our knowledgeable staff helps you select the perfect Surat Kapad fabrics based on your specific requirements, 
                  budget, and design preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Matching</CardTitle>
                <CardDescription>
                  Professional Surat Kapad fabric matching and color coordination services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get perfect color matches and pattern coordination for your projects with our 
                  professional Surat Kapad matching service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Orders</CardTitle>
                <CardDescription>
                  Wholesale pricing and bulk order options for businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Special pricing and services for retailers, manufacturers, and businesses 
                  requiring large quantities of Surat Kapad fabrics.
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
              Visit Our Bilimora Shop Today
            </h2>
            <p className="text-muted-foreground mb-6">
              Experience our premium Surat Kapad fabric collection and expert service in person
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Directions
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BilimoraFabricShop;
