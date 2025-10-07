-- Add music_id column to fabric_items table
ALTER TABLE public.fabric_items 
ADD COLUMN music_id UUID REFERENCES public.music_files(id) ON DELETE SET NULL;