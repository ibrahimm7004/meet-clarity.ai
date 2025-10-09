### Dev configuration

Required env keys (client-exposed via Vite):

- VITE_SUPABASE_URL — Supabase project URL
- VITE_SUPABASE_PUBLISHABLE_KEY — Supabase anon/public key
- VITE_WORKOS_CLIENT_ID — WorkOS client id for SSO

Optional:

- VITE_ENABLE_PARALLAX — default true; set to "false" to disable motion
- VITE_REVEAL_DURATION_MULTIPLIER — default 1.5; tweak motion pacing

Setup:

1. Copy `.env.example` to `.env.local` and fill values.
2. Run `npm run dev`.

Behavior when missing:

- The app still renders. A small banner appears in dev listing missing keys.
- Features requiring keys are disabled until configured.

Node/PM:

- Node 18+ recommended. See `package.json` and use the latest npm.


