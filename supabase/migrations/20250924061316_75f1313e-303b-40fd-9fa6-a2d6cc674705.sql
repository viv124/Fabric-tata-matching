-- Remove unnecessary HR/employee management tables that don't relate to fabric boutique

-- Drop tables in correct order (considering potential dependencies)
DROP TABLE IF EXISTS public.performance_reviews CASCADE;
DROP TABLE IF EXISTS public.leave_requests CASCADE;
DROP TABLE IF EXISTS public.attendance CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;

-- Also remove the related custom types that were used by these tables
DROP TYPE IF EXISTS attendance_status CASCADE;
DROP TYPE IF EXISTS leave_status CASCADE;
DROP TYPE IF EXISTS leave_type CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;

-- Remove functions that were specific to HR functionality
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_roles(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;