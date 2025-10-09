export const ENABLE_PARALLAX: boolean =
  (import.meta as any)?.env?.VITE_ENABLE_PARALLAX !== undefined
    ? String((import.meta as any).env.VITE_ENABLE_PARALLAX).toLowerCase() === "true"
    : true;

export const RAW_ENABLE_PARALLAX_ENV: string | undefined = (import.meta as any)?.env?.VITE_ENABLE_PARALLAX;

export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMotionEnabled(): boolean {
  const reduced = isReducedMotionPreferred();
  return ENABLE_PARALLAX && !reduced;
}

export function isMotionDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("motionDebug") === "1";
}


