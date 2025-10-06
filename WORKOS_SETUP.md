# WorkOS Authentication Setup

This application uses WorkOS for enterprise SSO authentication. Follow these steps to complete the setup:

## 1. Configure Environment Variables

Add the following to your `.env` file:

```bash
VITE_WORKOS_CLIENT_ID=your_workos_client_id_here
```

Get your Client ID from the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

## 2. Configure WorkOS Secrets in Lovable Cloud

The following secrets need to be configured in your Lovable Cloud backend:

- `WORKOS_API_KEY` - Your WorkOS API Key
- `WORKOS_CLIENT_ID` - Your WorkOS Client ID  
- `WORKOS_REDIRECT_URI` - Your callback URL (e.g., `https://your-domain.com/auth/callback`)

You should have already set these up. If not, access your backend to configure them.

## 3. Configure Redirect URI in WorkOS Dashboard

In your [WorkOS Dashboard](https://dashboard.workos.com):

1. Go to your application settings
2. Add the following redirect URIs:
   - `https://your-preview-url.lovable.app/auth/callback` (for preview)
   - `https://your-custom-domain.com/auth/callback` (for production)
   - `https://YOUR_EXTENSION_ID.chromiumapp.org/auth-callback.html` (for browser extension - replace YOUR_EXTENSION_ID with your actual Chrome extension ID from chrome://extensions)

## 4. How Authentication Works

1. User clicks "Sign In" button
2. App redirects to WorkOS authorization page
3. User authenticates via their organization's SSO
4. WorkOS redirects back to `/auth/callback` with authorization code
5. Callback page exchanges code for session via edge function
6. Edge function:
   - Exchanges code with WorkOS for user info
   - Creates/updates user in Supabase
   - Generates Supabase session
   - Returns session to frontend
7. User is logged in and redirected to home page

## 5. Extension Authentication

For browser extension users, you'll need to:

1. Create `auth-callback.html` in the extension folder
2. Handle the callback in the extension
3. Store the session in extension storage
4. Update the manifest with the extension ID after publishing

## Testing

1. Make sure all environment variables are set
2. Deploy your changes
3. Click "Sign In" on the homepage
4. You should be redirected to WorkOS login
5. After authentication, you should be redirected back and logged in

## Troubleshooting

- **"WorkOS credentials not configured"**: Make sure all secrets are set in Lovable Cloud
- **"No authorization code received"**: Check redirect URI configuration in WorkOS Dashboard
- **"Failed to complete sign in"**: Check browser console and edge function logs for details
