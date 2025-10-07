-- Add category and enhanced features to fabric_items
ALTER TABLE public.fabric_items 
ADD COLUMN category TEXT DEFAULT 'General',
ADD COLUMN featured BOOLEAN DEFAULT false,
ADD COLUMN stock_quantity INTEGER DEFAULT 100,
ADD COLUMN fabric_type TEXT,
ADD COLUMN color TEXT,
ADD COLUMN pattern TEXT,
ADD COLUMN material TEXT;

-- Create categories table
CREATE TABLE public.fabric_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default categories
INSERT INTO public.fabric_categories (name, description, sort_order) VALUES
('Silk Fabrics', 'Premium silk fabrics for special occasions', 1),
('Cotton Fabrics', 'Comfortable cotton fabrics for daily wear', 2),
('Designer Fabrics', 'Exclusive designer collection', 3),
('Wedding Collection', 'Special fabrics for wedding ceremonies', 4),
('Casual Wear', 'Everyday comfortable fabrics', 5),
('Festive Collection', 'Traditional festive fabrics', 6);

-- Create festival banners table
CREATE TABLE public.festival_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.fabric_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festival_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for fabric_categories
CREATE POLICY "Anyone can view categories" 
ON public.fabric_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage categories" 
ON public.fabric_categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for festival_banners
CREATE POLICY "Anyone can view active banners" 
ON public.festival_banners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage banners" 
ON public.festival_banners 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for timestamps
CREATE TRIGGER update_fabric_categories_updated_at
BEFORE UPDATE ON public.fabric_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_festival_banners_updated_at
BEFORE UPDATE ON public.festival_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER TABLE public.fabric_items REPLICA IDENTITY FULL;
ALTER TABLE public.fabric_categories REPLICA IDENTITY FULL;
ALTER TABLE public.festival_banners REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER publication supabase_realtime ADD TABLE public.fabric_items;
ALTER publication supabase_realtime ADD TABLE public.fabric_categories;
ALTER publication supabase_realtime ADD TABLE public.festival_banners;