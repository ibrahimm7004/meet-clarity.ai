const SUPABASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGJ4aGVucm9veWZ0bHlqYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzkwOTEsImV4cCI6MjA3NDc1NTA5MX0.wDgyvbUODXbFNbsscSjC1UXa5iJIlK90wpMwYjySyuE';
const WORKOS_CLIENT_ID = 'client_01K6D8DT7N27PY1F9KES0EYSRH';

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

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(digest);
};

const base64UrlEncode = (array) => {
  let str = '';
  array.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const generateCodeChallenge = async (verifier) => {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
};

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const view = tab.dataset.view;
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    document.querySelectorAll('.form-view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    
    hideMessages();
  });
});

// SSO Sign In
document.getElementById('sso-signin-btn').addEventListener('click', async () => {
  try {
    hideMessages();
    
    // Get the extension ID
    const extensionId = chrome.runtime.id;
    const redirectUri = `https://${extensionId}.chromiumapp.org/auth-callback.html`;
    
    // Generate PKCE parameters
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    
    // Store verifier for later use
    await chrome.storage.local.set({ workos_code_verifier: verifier });
    
    // Build WorkOS authorization URL
    const authUrl = new URL('https://api.workos.com/user_management/authorize');
    authUrl.searchParams.set('client_id', WORKOS_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('provider', 'authkit');
    authUrl.searchParams.set('code_challenge', challenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');
    
    // Open auth URL in new tab
    chrome.tabs.create({ url: authUrl.toString() });
    window.close();
    
  } catch (error) {
    showError(error.message || 'Failed to initiate SSO sign in');
  }
});

// Sign In
document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideMessages();
  
  const btn = e.target.querySelector('button');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.innerHTML = '<span class="loader"></span>';
  
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || data.msg || 'Sign in failed');
    }
    
    // Store session
    await chrome.storage.local.set({
      session: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
        expires_at: Date.now() + (data.expires_in * 1000)
      }
    });
    
    showSuccess('Sign in successful! Redirecting...');
    
    setTimeout(() => {
      window.close();
    }, 1000);
    
  } catch (error) {
    showError(error.message);
    btn.disabled = false;
    btn.textContent = originalText;
  }
});

// Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideMessages();
  
  const btn = e.target.querySelector('button');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.innerHTML = '<span class="loader"></span>';
  
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ 
        email, 
        password,
        data: { full_name: name }
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || data.msg || 'Sign up failed');
    }
    
    // Store session
    await chrome.storage.local.set({
      session: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
        expires_at: Date.now() + (data.expires_in * 1000)
      }
    });
    
    showSuccess('Account created! Redirecting...');
    
    setTimeout(() => {
      window.close();
    }, 1000);
    
  } catch (error) {
    showError(error.message);
    btn.disabled = false;
    btn.textContent = originalText;
  }
});

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function showSuccess(message) {
  const successDiv = document.getElementById('success');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
}

function hideMessages() {
  document.getElementById('error').style.display = 'none';
  document.getElementById('success').style.display = 'none';
}
