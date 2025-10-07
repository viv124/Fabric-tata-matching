import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Upload, Trash2, Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MusicFile {
  id: string;
  name: string;
  description: string | null;
  file_url: string;
  duration: number | null;
  slide_timing: number;
  is_active: boolean;
  sort_order: number;
}

export const MusicManagement = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [musicName, setMusicName] = useState("");
  const [musicDescription, setMusicDescription] = useState("");
  const [slideTiming, setSlideTiming] = useState(5);
  const [playingId, setPlayingId] = useState<string | null>(null);

  React.useEffect(() => {
    fetchMusicFiles();
  }, []);

  const fetchMusicFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('music_files')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMusicFiles(data || []);
    } catch (error) {
      console.error('Error fetching music files:', error);
      toast.error('Failed to load music files');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setMusicName(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      toast.error('Please select a valid audio file');
    }
  };

  const uploadMusicFile = async () => {
    if (!selectedFile || !musicName) {
      toast.error('Please select a file and provide a name');
      return;
    }

    setIsUploading(true);
    try {
      // Upload to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('music-files')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('music-files')
        .getPublicUrl(filePath);

      // Insert into database
      const { error: dbError } = await supabase
        .from('music_files')
        .insert([{
          name: musicName,
          description: musicDescription || null,
          file_url: urlData.publicUrl,
          slide_timing: slideTiming,
          is_active: true,
          sort_order: musicFiles.length
        }]);

      if (dbError) throw dbError;

      toast.success('Music file uploaded successfully!');
      setSelectedFile(null);
      setMusicName("");
      setMusicDescription("");
      setSlideTiming(5);
      fetchMusicFiles();
    } catch (error) {
      console.error('Error uploading music:', error);
      toast.error('Failed to upload music file');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMusicFile = async (id: string) => {
    try {
      const { error } = await supabase
        .from('music_files')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Music file deleted');
      fetchMusicFiles();
    } catch (error) {
      console.error('Error deleting music:', error);
      toast.error('Failed to delete music file');
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('music_files')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      fetchMusicFiles();
    } catch (error) {
      console.error('Error updating music:', error);
      toast.error('Failed to update music file');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Upload Music File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="music-file">Select Audio File</Label>
            <Input
              id="music-file"
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="mt-1"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="music-name">Music Name</Label>
            <Input
              id="music-name"
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
              placeholder="Enter music name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="music-description">Description (Optional)</Label>
            <Input
              id="music-description"
              value={musicDescription}
              onChange={(e) => setMusicDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="slide-timing">Slide Timing (seconds)</Label>
            <Input
              id="slide-timing"
              type="number"
              min="1"
              max="60"
              value={slideTiming}
              onChange={(e) => setSlideTiming(parseInt(e.target.value) || 5)}
              className="mt-1"
            />
          </div>

          <Button
            onClick={uploadMusicFile}
            disabled={isUploading || !selectedFile || !musicName}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Music'}
          </Button>
        </CardContent>
      </Card>

      {/* Music List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Music Files</CardTitle>
        </CardHeader>
        <CardContent>
          {musicFiles.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No music files uploaded yet
            </p>
          ) : (
            <div className="space-y-3">
              {musicFiles.map((music) => (
                <div
                  key={music.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{music.name}</h4>
                      {music.is_active ? (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                    {music.description && (
                      <p className="text-sm text-muted-foreground">{music.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Slide timing: {music.slide_timing}s
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(music.id, music.is_active)}
                    >
                      {music.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMusicFile(music.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
