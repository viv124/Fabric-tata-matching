-- First, let's drop all existing policies on festival_banners and recreate them properly
DROP POLICY IF EXISTS "Anyone can manage banners" ON public.festival_banners;
DROP POLICY IF EXISTS "Anyone can view banners" ON public.festival_banners;
DROP POLICY IF EXISTS "Admins can manage banners" ON public.festival_banners;
DROP POLICY IF EXISTS "Anyone can view active banners" ON public.festival_banners;

-- Create simple policies that allow full access since this is a boutique app
CREATE POLICY "Enable all access for festival banners" 
ON public.festival_banners 
FOR ALL
USING (true)
WITH CHECK (true);