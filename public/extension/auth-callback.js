const SUPABASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGJ4aGVucm9veWZ0bHlqYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzkwOTEsImV4cCI6MjA3NDc1NTA5MX0.wDgyvbUODXbFNbsscSjC1UXa5iJIlK90wpMwYjySyuE';

async function handleCallback() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) {
      throw new Error('No authorization code received');
    }

    // Get code verifier from storage
    const result = await chrome.storage.local.get('workos_code_verifier');
    const code_verifier = result.workos_code_verifier;
    
    if (!code_verifier) {
      throw new Error('No code verifier found');
    }

    // Exchange code for session via edge function
    const response = await fetch(`${SUPABASE_URL}/functions/v1/workos-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ code, code_verifier })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    if (data?.access_token) {
      // Parse the magic link to get the token
      const url = new URL(data.access_token);
      const token = url.searchParams.get('token');
      
      if (token) {
        // Verify the token with Supabase
        const verifyResponse = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            token,
            type: 'magiclink'
          })
        });

        const sessionData = await verifyResponse.json();

        if (!verifyResponse.ok) {
          throw new Error(sessionData.error_description || 'Failed to verify token');
        }

        // Store session in extension storage
        await chrome.storage.local.set({
          session: {
            access_token: sessionData.access_token,
            refresh_token: sessionData.refresh_token,
            user: sessionData.user,
            expires_at: Date.now() + (sessionData.expires_in * 1000)
          }
        });

        // Clean up code verifier
        await chrome.storage.local.remove('workos_code_verifier');

        // Close this tab and open popup
        window.close();
      } else {
        throw new Error('No token in response');
      }
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    console.error('Auth callback error:', error);
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = error.message || 'Failed to complete sign in';
    errorDiv.style.display = 'block';
    
    // Auto-close after showing error
    setTimeout(() => {
      window.close();
    }, 3000);
  }
}

// Run on page load
handleCallback();
