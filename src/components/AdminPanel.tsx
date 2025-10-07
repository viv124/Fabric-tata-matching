import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Plus, Calendar, Settings } from "lucide-react";
import { useFabricItems } from "@/hooks/useFabricItems";
import { toast } from "sonner";

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const { addFestivalBanner, uploadImage, festivalBanners } = useFabricItems();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    sortOrder: "0",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !imageFile) {
      toast.error("Please fill in title and upload an image");
      return;
    }

    setLoading(true);
    
    try {
      // Upload image first
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }

      // Add festival banner to database
      const newBanner = await addFestivalBanner({
        title: formData.title,
        description: formData.description || null,
        image_url: imageUrl,
        is_active: true,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        sort_order: parseInt(formData.sortOrder) || 0,
      });

      if (newBanner) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          sortOrder: "0",
        });
        setImageFile(null);
        setImagePreview("");
        toast.success("Festival banner added successfully!");
      }
    } catch (error) {
      console.error('Error adding festival banner:', error);
      toast.error('Failed to add festival banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-4xl max-h-[95vh] card-gradient flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 flex-shrink-0 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="font-serif text-xl sm:text-2xl font-bold gradient-text">
                Admin Panel
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage festival banners and promotions
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50 rounded-full"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Add Festival Banner Form */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border/30">
                <Plus className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg font-semibold text-primary">
                  Add Festival Banner
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-title" className="text-sm font-medium">
                    Festival Title *
                  </Label>
                  <Input
                    id="banner-title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Diwali Special Collection"
                    className="input-boutique"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner-description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="banner-description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the festival offer or collection..."
                    className="input-boutique min-h-[80px] resize-none"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="input-boutique"
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="input-boutique"
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner-image" className="text-sm font-medium">
                    Festival Banner Image *
                  </Label>
                  <div>
                    <Input
                      id="banner-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={loading}
                    />
                    <Label
                      htmlFor="banner-image"
                      className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                        imagePreview 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent hover:bg-accent/5'
                      } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full group">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <p className="text-white text-sm font-medium">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium text-foreground">Upload festival banner</p>
                          <p className="text-xs text-muted-foreground mt-1">Recommended: 1200x400px</p>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-hero" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Adding Banner...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Festival Banner
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Current Festival Banners */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border/30">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg font-semibold text-primary">
                  Active Festival Banners ({festivalBanners.length})
                </h3>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {festivalBanners.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 opacity-50 mb-3" />
                    <p>No festival banners added yet</p>
                  </div>
                ) : (
                  festivalBanners.map((banner) => (
                    <Card key={banner.id} className="card-gradient border-border/30">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1 mb-1">
                              {banner.title}
                            </h4>
                            {banner.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {banner.description}
                              </p>
                            )}
                            {(banner.start_date || banner.end_date) && (
                              <div className="text-xs text-muted-foreground">
                                {banner.start_date && `From ${new Date(banner.start_date).toLocaleDateString()}`}
                                {banner.start_date && banner.end_date && ' - '}
                                {banner.end_date && `Until ${new Date(banner.end_date).toLocaleDateString()}`}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};