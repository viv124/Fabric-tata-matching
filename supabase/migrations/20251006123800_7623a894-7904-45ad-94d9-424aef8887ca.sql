-- Create table for multiple images per fabric item
CREATE TABLE public.fabric_item_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  fabric_item_id UUID NOT NULL REFERENCES public.fabric_items(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fabric_item_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view fabric item images"
ON public.fabric_item_images
FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert fabric item images"
ON public.fabric_item_images
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can update fabric item images"
ON public.fabric_item_images
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can delete fabric item images"
ON public.fabric_item_images
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create index for faster queries
CREATE INDEX idx_fabric_item_images_fabric_item_id ON public.fabric_item_images(fabric_item_id);