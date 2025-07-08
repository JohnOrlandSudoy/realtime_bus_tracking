-- Verify Complete Setup
-- Run this to check if everything is working

-- 1. Check if admin user exists in auth.users
SELECT 'auth.users' as table_name, id, email, created_at 
FROM auth.users 
WHERE email = 'admin@bustracker.com';

-- 2. Check if admin user exists in admin_users
SELECT 'admin_users' as table_name, id, email, full_name, role, is_active 
FROM admin_users 
WHERE email = 'admin@bustracker.com';

-- 3. Check RLS status on all tables
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('admin_users', 'terminals', 'routes', 'buses');

-- 4. Check trigger status
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 5. Test the exact query your app will run
SELECT * FROM admin_users WHERE email = 'admin@bustracker.com';

-- 6. Check if there are any recent errors in the logs
-- (This will show any recent warnings or errors from the trigger)
-- Note: This query may not work in all Supabase environments
-- SELECT 
--   log_time,
--   log_level,
--   log_message
-- FROM pg_stat_activity 
-- WHERE log_message LIKE '%admin_users%' 
--    OR log_message LIKE '%handle_new_user%'
-- ORDER BY log_time DESC
-- LIMIT 10; 