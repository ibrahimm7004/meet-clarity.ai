import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get("code");
        
        if (!code) {
          throw new Error("No authorization code received");
        }

        console.log("Exchanging code for session...");

        const code_verifier = sessionStorage.getItem('workos_code_verifier');
        // Exchange code for session via edge function
        const { data, error } = await supabase.functions.invoke('workos-auth', {
          body: { code, code_verifier },
        });

        if (error) {
          throw error;
        }

        if (data?.access_token) {
          // Parse the magic link to get the token
          const url = new URL(data.access_token);
          const token = url.searchParams.get('token');
          
          if (token) {
            // Verify the token and create session
            const { error: verifyError } = await supabase.auth.verifyOtp({
              token_hash: token,
              type: 'magiclink',
            });

            if (verifyError) {
              throw verifyError;
            }
          }

          toast({
            title: "Success!",
            description: "You've been signed in successfully.",
          });
          navigate("/");
        } else {
          throw new Error("No access token received");
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete sign in",
          variant: "destructive",
        });
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate, toast, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
