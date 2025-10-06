-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  price_monthly decimal(10,2),
  price_annual decimal(10,2),
  features jsonb NOT NULL,
  limits jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  subscription_plan_id uuid REFERENCES public.subscription_plans(id),
  subscription_status text DEFAULT 'free',
  trial_ends_at timestamptz,
  usage_count jsonb DEFAULT '{"interviews": 0, "ai_answers": 0, "emails": 0}'::jsonb,
  usage_reset_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.user_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  feature_type text NOT NULL,
  usage_date date DEFAULT CURRENT_DATE,
  count integer DEFAULT 1,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plans (public read)
CREATE POLICY "Anyone can view subscription plans"
  ON public.subscription_plans FOR SELECT
  USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_usage
CREATE POLICY "Users can view their own usage"
  ON public.user_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON public.user_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  free_plan_id uuid;
BEGIN
  -- Get the free plan ID
  SELECT id INTO free_plan_id
  FROM public.subscription_plans
  WHERE name = 'Free'
  LIMIT 1;

  -- Insert profile for new user
  INSERT INTO public.profiles (id, email, full_name, subscription_plan_id, subscription_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    free_plan_id,
    'free'
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, price_monthly, price_annual, features, limits) VALUES
('Free', 0, 0, 
  '["Automated note-taking", "Professional meeting summaries", "Basic interview performance insights", "Follow-up email summaries", "Email support"]'::jsonb,
  '{"interviews_per_month": 5, "ai_answers_per_day": 0, "email_generation": true, "advanced_features": false}'::jsonb
),
('Pro', 24.99, 249.99,
  '["Everything in Free", "Real-time Clarity answer search (0.3s)", "Advanced interview analysis & scoring", "Acceptance probability prediction", "CV-interview compatibility analysis", "Meeting action items & timelines", "Advanced question bank (1000+)", "Industry-specific optimization", "Post-job meeting summaries", "Automated work timeline management", "Follow-up email automation", "Priority support", "Unlimited interviews"]'::jsonb,
  '{"interviews_per_month": -1, "ai_answers_per_day": -1, "email_generation": true, "advanced_features": true}'::jsonb
);

-- Create function to check and reset monthly usage
CREATE OR REPLACE FUNCTION public.check_and_reset_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Reset usage for profiles where reset date has passed
  UPDATE public.profiles
  SET 
    usage_count = '{"interviews": 0, "ai_answers": 0, "emails": 0}'::jsonb,
    usage_reset_date = CURRENT_DATE + INTERVAL '1 month'
  WHERE usage_reset_date <= CURRENT_DATE;
END;
$$;