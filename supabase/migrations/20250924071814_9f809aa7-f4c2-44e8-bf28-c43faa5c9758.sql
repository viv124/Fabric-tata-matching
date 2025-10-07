-- Update the existing user's profile to admin role
UPDATE public.profiles 
SET role = 'admin', display_name = 'Admin User'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'ahirevivek7490@gmail.com'
);

-- If profile doesn't exist, create it
INSERT INTO public.profiles (user_id, display_name, role)
SELECT 
  id,
  'Admin User',
  'admin'
FROM auth.users 
WHERE email = 'ahirevivek7490@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.user_id = auth.users.id
  );