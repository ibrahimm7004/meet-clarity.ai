-- Add explicit security for profiles table containing PII (email addresses)
-- This provides defense-in-depth even though existing policies already prevent unauthorized access

-- Add a comment documenting that this table contains PII
COMMENT ON COLUMN public.profiles.email IS 'Contains PII - user email addresses. Protected by RLS policies requiring authentication.';

-- Create an explicit policy to deny all access to anonymous users
-- This makes the security posture crystal clear
CREATE POLICY "Block all anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add a policy specifically for authenticated users to make access control explicit
-- This replaces relying solely on the "Users can view their own profile" policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view only their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Ensure update policy is also explicit about requiring authentication
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can update only their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Ensure insert policy is also explicit about requiring authentication
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can insert only their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);