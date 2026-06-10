-- =====================================================
-- Admin user setup for portfolio
-- 
-- 1. Copy this entire file
-- 2. Go to https://supabase.com/dashboard/project/haslquwdgzuzkfcbocyq/sql/new
-- 3. Replace email/password below
-- 4. Run
-- =====================================================

-- Create admin user directly in auth.users
-- This bypasses the trigger issue that causes "Database error creating new user"
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your-email@example.com',     -- ← CHANGE THIS
  crypt('your-password', gen_salt('bf')),  -- ← CHANGE THIS
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Also create the identity record so the user can sign in
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),  -- ← SAME EMAIL
  format('{"sub":"%s","email":"%s"}', 
    (SELECT id::text FROM auth.users WHERE email = 'your-email@example.com'),
    'your-email@example.com'
  )::jsonb,
  'email',
  'your-email@example.com',     -- ← SAME EMAIL
  now(),
  now(),
  now()
);
