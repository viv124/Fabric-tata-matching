import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload, Instagram, Youtube, Loader2, Link, Music } from "lucide-react";
import { useFabricItems } from "@/hooks/useFabricItems";
import { MultipleImageUpload } from "./MultipleImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FabricUploadProps {
  onClose: () => void;
  onSubmit: () => void;
}

export const FabricUpload = ({ onClose, onSubmit }: FabricUploadProps) => {
  const { addFabricItem, uploadImage, categories } = useFabricItems();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [musicFiles, setMusicFiles] = useState<Array<{ id: string; name: string }>>([]);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    material: "",
    color: "",
    pattern: "",
    stock: "100",
    featured: false,
    instagramUrl: "",
    pinterestUrl: "",
    otherLink: "",
    musicId: "none",
  });

  React.useEffect(() => {
    fetchMusicFiles();
  }, []);

  const fetchMusicFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('music_files')
        .select('id, name')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMusicFiles(data || []);
    } catch (error) {
      console.error('Error fetching music files:', error);
    }
  };

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
    
    // Enhanced validation with user feedback
    if (!formData.name.trim()) {
      toast.error('Please enter a fabric name');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please enter a fabric description');
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }
    
    if (!imageFile) {
      toast.error('Please upload a fabric image');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Starting fabric upload process...');
      
      // Upload image first
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        console.error('Image upload failed');
        toast.error('Failed to upload image. Please try again.');
        setLoading(false);
        return;
      }
      
      console.log('Image uploaded successfully:', imageUrl);

      // Add fabric item to database
      const newItem = await addFabricItem({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        category: formData.category,
        featured: formData.featured,
        stock_quantity: parseInt(formData.stock) || 100,
        fabric_type: null,
        color: formData.color?.trim() || null,
        pattern: formData.pattern?.trim() || null,
        material: formData.material?.trim() || null,
        image_url: imageUrl,
        instagram_url: formData.instagramUrl?.trim() || null,
        pinterest_url: formData.pinterestUrl?.trim() || null,
        other_link: formData.otherLink?.trim() || null,
        music_id: formData.musicId && formData.musicId !== "none" ? formData.musicId : null,
      });

      if (newItem) {
        console.log('Fabric item added successfully:', newItem);
        
        // Upload additional images if any
        if (additionalImages.length > 0) {
          try {
            const imagePromises = additionalImages.map(async (imageUrl, index) => {
              return supabase
                .from('fabric_item_images')
                .insert({
                  fabric_item_id: newItem.id,
                  image_url: imageUrl,
                  sort_order: index
                });
            });
            
            await Promise.all(imagePromises);
            console.log('Additional images saved successfully');
          } catch (error) {
            console.error('Error saving additional images:', error);
            // Don't fail the whole upload if additional images fail
          }
        }
        
        toast.success('Fabric added to collection successfully!');
        onSubmit();
        onClose();
      } else {
        toast.error('Failed to add fabric item. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting fabric item:', error);
      toast.error('An error occurred while adding the fabric. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] card-gradient flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 flex-shrink-0 p-4 sm:p-6">
          <div>
            <CardTitle className="font-serif text-xl sm:text-2xl font-bold gradient-text">Upload Fabric</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Add your premium fabric to the collection</p>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-primary border-b border-border/30 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Fabric Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Silk Saree Fabric"
                    className="input-boutique"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-foreground">
                    Category *
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input-boutique w-full"
                    required
                    disabled={loading}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-foreground">
                    Price (₹) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    className="input-boutique"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount" className="text-sm font-medium text-foreground">
                    Discount (%)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                    placeholder="0"
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Fabric Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-sm font-medium text-foreground">
                    Material
                  </Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                    placeholder="e.g., Silk, Cotton"
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-sm font-medium text-foreground">
                    Color
                  </Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="e.g., Red, Blue"
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pattern" className="text-sm font-medium text-foreground">
                    Pattern
                  </Label>
                  <Input
                    id="pattern"
                    value={formData.pattern}
                    onChange={(e) => setFormData(prev => ({ ...prev, pattern: e.target.value }))}
                    placeholder="e.g., Floral, Geometric"
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm font-medium text-foreground">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="100"
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="music" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Background Music
                </Label>
                <Select
                  value={formData.musicId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, musicId: value }))}
                  disabled={loading}
                >
                  <SelectTrigger className="input-boutique">
                    <SelectValue placeholder="Select music (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No music</SelectItem>
                    {musicFiles.map((music) => (
                      <SelectItem key={music.id} value={music.id}>
                        {music.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description *
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the fabric material, texture, patterns, and best use cases..."
                  className="input-boutique min-h-[100px] resize-none"
                  rows={4}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-border"
                  disabled={loading}
                />
                <Label htmlFor="featured" className="text-sm font-medium text-foreground">
                  Mark as Featured (will appear in top sections)
                </Label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-primary border-b border-border/30 pb-2">
                Fabric Image
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium text-foreground">
                  Upload Fabric Photo *
                </Label>
                <div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                  />
                  <Label
                    htmlFor="image"
                    className={`flex items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
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
                      <div className="text-center py-8">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm font-medium text-foreground mb-1">Click to upload fabric image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 20MB</p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>

            {/* Additional Images */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-primary border-b border-border/30 pb-2">
                Additional Images (Optional)
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload multiple images to showcase different angles and details
              </p>
              
              <MultipleImageUpload
                onImagesUploaded={(urls) => {
                  console.log('Images uploaded:', urls);
                  setAdditionalImages(urls);
                }}
                maxImages={10}
              />
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-primary border-b border-border/30 pb-2">
                Social Media Showcase
              </h3>
              <p className="text-sm text-muted-foreground">
                Add links to showcase your fabric on social platforms (optional)
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-purple-600" />
                    Instagram Reel URL
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                    placeholder="https://instagram.com/reel/..."
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pinterest" className="text-sm font-medium flex items-center gap-2">
                    <div className="h-4 w-4 bg-red-500 rounded-sm" />
                    Pinterest URL
                  </Label>
                  <Input
                    id="pinterest"
                    value={formData.pinterestUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, pinterestUrl: e.target.value }))}
                    placeholder="https://pinterest.com/pin/..."
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherLink" className="text-sm font-medium flex items-center gap-2">
                    <Link className="h-4 w-4 text-gray-600" />
                    Other Link
                  </Label>
                  <Input
                    id="otherLink"
                    value={formData.otherLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, otherLink: e.target.value }))}
                    placeholder="https://example.com/..."
                    className="input-boutique"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        {/* Fixed Footer with Buttons */}
        <div className="border-t border-border/20 p-4 sm:p-6 flex-shrink-0 bg-card">
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 rounded-xl" 
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 btn-hero" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add to Collection
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};