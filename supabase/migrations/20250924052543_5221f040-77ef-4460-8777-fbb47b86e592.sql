-- Create storage bucket for fabric images
INSERT INTO storage.buckets (id, name, public) VALUES ('fabric-images', 'fabric-images', true);

-- Create fabric_items table
CREATE TABLE public.fabric_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  image_url TEXT NOT NULL,
  instagram_url TEXT,
  pinterest_url TEXT,
  youtube_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fabric_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view fabric items" 
ON public.fabric_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert fabric items" 
ON public.fabric_items 
FOR INSERT 
WITH CHECK (true);

-- Create storage policies for fabric images
CREATE POLICY "Anyone can view fabric images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'fabric-images');

CREATE POLICY "Anyone can upload fabric images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'fabric-images');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_fabric_items_updated_at
BEFORE UPDATE ON public.fabric_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();