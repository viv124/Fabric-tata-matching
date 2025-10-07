-- Fix festival_banners RLS policies since we removed the role system
-- Now allow anyone to manage festival banners (since this is a small boutique)

DROP POLICY IF EXISTS "Admins can manage banners" ON public.festival_banners;
DROP POLICY IF EXISTS "Anyone can view active banners" ON public.festival_banners;

-- Allow anyone to manage festival banners
CREATE POLICY "Anyone can manage banners" 
ON public.festival_banners 
FOR ALL
USING (true)
WITH CHECK (true);

-- Allow anyone to view banners (both active and inactive for admin purposes)
CREATE POLICY "Anyone can view banners" 
ON public.festival_banners 
FOR SELECT
USING (true);