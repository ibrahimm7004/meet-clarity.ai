import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const WORKOS_CLIENT_ID = import.meta.env.VITE_WORKOS_CLIENT_ID;
if (!WORKOS_CLIENT_ID) {
  // eslint-disable-next-line no-console
  console.warn('VITE_WORKOS_CLIENT_ID is not set. SSO will not work in production.');
}
const WORKOS_REDIRECT_URI = `${window.location.origin}/auth/callback`;

// PKCE helpers
const generateCodeVerifier = (length = 64) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(digest);
};

const base64UrlEncode = (array: Uint8Array) => {
  let str = '';
  array.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/g, '');
};

const generateCodeChallenge = async (verifier: string) => {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
};

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in, otherwise redirect to WorkOS
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      } else {
        // Automatically redirect to WorkOS
        handleWorkOSSignIn();
      }
    });
  }, [navigate]);

  const handleWorkOSSignIn = async () => {
    try {
      setLoading(true);
      
      if (!WORKOS_CLIENT_ID) {
        throw new Error("WorkOS Client ID not configured");
      }

      // PKCE: generate code verifier/challenge
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      sessionStorage.setItem('workos_code_verifier', verifier);

      // Redirect to WorkOS authorization page with PKCE
      const authorizationUrl = new URL("https://api.workos.com/user_management/authorize");
      authorizationUrl.searchParams.set("client_id", WORKOS_CLIENT_ID);
      authorizationUrl.searchParams.set("redirect_uri", WORKOS_REDIRECT_URI);
      authorizationUrl.searchParams.set("response_type", "code");
      authorizationUrl.searchParams.set("provider", "authkit");
      authorizationUrl.searchParams.set("code_challenge", challenge);
      authorizationUrl.searchParams.set("code_challenge_method", "S256");

      window.location.href = authorizationUrl.toString();
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to sign in with WorkOS",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Clarity
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your interview assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleWorkOSSignIn}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in with SSO"
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Enterprise SSO powered by WorkOS
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
