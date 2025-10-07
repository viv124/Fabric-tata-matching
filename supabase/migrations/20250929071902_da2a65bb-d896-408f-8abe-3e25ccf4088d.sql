-- Remove extra social media fields and add other_link field
ALTER TABLE public.fabric_items 
DROP COLUMN facebook_url,
DROP COLUMN twitter_url,
DROP COLUMN tiktok_url,
DROP COLUMN whatsapp_url,
ADD COLUMN other_link TEXT;