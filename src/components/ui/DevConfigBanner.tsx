import { useEffect, useMemo, useState } from "react";

function getMissingEnvKeys(): string[] {
  const env = (import.meta as any)?.env || {};
  const requiredKeys = [
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "VITE_WORKOS_CLIENT_ID",
  ];
  return requiredKeys.filter((k) => env[k] === undefined || String(env[k]).length === 0);
}

const STORAGE_KEY = "clarity.dev.config.dismissed";

export default function DevConfigBanner() {
  const [dismissed, setDismissed] = useState(false);
  const missing = useMemo(() => getMissingEnvKeys(), []);
  const show = import.meta.env.DEV && missing.length > 0 && !dismissed;

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      setDismissed(v === "1");
    } catch {
      // ignore
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-2 left-2 right-2 z-[1000]">
      <div className="mx-auto max-w-3xl rounded-md border border-yellow-300 bg-yellow-50 text-yellow-950 shadow-sm">
        <div className="flex items-start justify-between gap-3 p-3">
          <div className="text-sm">
            <strong className="font-medium">Missing dev config</strong>: {missing.join(", ")}. See docs/dev-config.md. The app still renders with limited features.
          </div>
          <button
            type="button"
            className="shrink-0 rounded-md border border-yellow-300 bg-white/60 px-2 py-1 text-xs hover:bg-white"
            onClick={() => {
              setDismissed(true);
              try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}


