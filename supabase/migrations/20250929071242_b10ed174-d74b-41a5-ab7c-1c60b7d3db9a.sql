-- Add more social media URL fields to fabric_items table
ALTER TABLE public.fabric_items 
ADD COLUMN facebook_url TEXT,
ADD COLUMN twitter_url TEXT,
ADD COLUMN tiktok_url TEXT,
ADD COLUMN whatsapp_url TEXT;