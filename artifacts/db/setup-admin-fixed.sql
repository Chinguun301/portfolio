-- =====================================================
-- FIXED: Create profiles table first, then admin user
-- 
-- 1. Go to https://supabase.com/dashboard/project/haslquwdgzuzkfcbocyq/sql/new
-- 2. Copy & paste this entire file
-- 3. Click RUN (CTRL+Enter or CMD+Enter)
-- 4. Login at http://localhost:3000/admin/login
-- =====================================================

-- STEP 1: Create the profiles table (referenced by the trigger)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- STEP 2: Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- STEP 3: Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- STEP 4: Create admin user
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
  'admn@gmail.com',
  crypt('Chinguun1234!', gen_salt('bf')),
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

-- STEP 5: Create identity record
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
  (SELECT id FROM auth.users WHERE email = 'admn@gmail.com'),
  format('{"sub":"%s","email":"%s"}',
    (SELECT id::text FROM auth.users WHERE email = 'admn@gmail.com'),
    'admn@gmail.com'
  )::jsonb,
  'email',
  'admn@gmail.com',
  now(),
  now(),
  now()
);

-- STEP 6: Verify
SELECT '✅ Admin user created!' AS status,
       id, email, created_at
FROM auth.users
WHERE email = 'admn@gmail.com';
