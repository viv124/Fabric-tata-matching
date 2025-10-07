import React, { useState } from "react";
import { FabricUpload } from "@/components/FabricUpload";
import { BannerManagement } from "@/components/BannerManagement";
import { CollectionManagement } from "@/components/CollectionManagement";
import { MusicManagement } from "@/components/MusicManagement";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, Upload, Settings, LogOut, Package, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Admin = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBannerManagementOpen, setIsBannerManagementOpen] = useState(false);
  const [isCollectionManagementOpen, setIsCollectionManagementOpen] = useState(false);
  const [isMusicManagementOpen, setIsMusicManagementOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const handleUploadSubmit = () => {
    // Refresh will happen automatically through realtime updates
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <PageSEO 
        title="Admin Panel - Tata Matching Center"
        description="Administrative panel for managing fabric collection, banners, and content. Access restricted to authorized personnel only."
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild className="p-2 sm:px-4">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Shop</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-primary">Admin Panel</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Welcome, {profile?.display_name || 'Admin'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => setIsUploadOpen(true)}
                  className="btn-hero flex-1 sm:flex-none"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Upload Fabric</span>
                  <span className="sm:hidden">Upload</span>
                </Button>
                
                <Button 
                  onClick={() => setIsCollectionManagementOpen(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="sm"
                >
                  <Package className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Collections</span>
                  <span className="sm:hidden">Items</span>
                </Button>
                
                <Button 
                  onClick={() => setIsBannerManagementOpen(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Banners</span>
                  <span className="sm:hidden">Banners</span>
                </Button>

                <Button 
                  onClick={() => setIsMusicManagementOpen(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="sm"
                >
                  <Music className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Music</span>
                  <span className="sm:hidden">Music</span>
                </Button>

                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid gap-4 sm:gap-8">
          <div className="bg-card rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="h-16 sm:h-24 text-sm sm:text-lg btn-hero"
                size="lg"
              >
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">Upload Fabric</span>
              </Button>
              
              <Button 
                onClick={() => setIsCollectionManagementOpen(true)}
                variant="outline"
                className="h-16 sm:h-24 text-sm sm:text-lg"
                size="lg"
              >
                <Package className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">Collections</span>
              </Button>
              
              <Button 
                onClick={() => setIsBannerManagementOpen(true)}
                variant="outline"
                className="h-16 sm:h-24 text-sm sm:text-lg"
                size="lg"
              >
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">Banners</span>
              </Button>

              <Button 
                onClick={() => setIsMusicManagementOpen(true)}
                variant="outline"
                className="h-16 sm:h-24 text-sm sm:text-lg"
                size="lg"
              >
                <Music className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">Music</span>
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Admin Dashboard</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome to your fabric collection management system. Here you can upload new fabrics, 
              manage categories, and control festival banners displayed on the homepage.
            </p>
          </div>
        </div>
      </main>

        {/* Modals */}
        {isUploadOpen && (
          <FabricUpload
            onClose={() => setIsUploadOpen(false)}
            onSubmit={handleUploadSubmit}
          />
        )}

        {isBannerManagementOpen && (
          <BannerManagement
            onClose={() => setIsBannerManagementOpen(false)}
          />
        )}

        {isCollectionManagementOpen && (
          <CollectionManagement
            onClose={() => setIsCollectionManagementOpen(false)}
          />
        )}

        {/* Music Management Modal */}
        {isMusicManagementOpen && (
          <Dialog open={isMusicManagementOpen} onOpenChange={setIsMusicManagementOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <MusicManagement />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Admin;