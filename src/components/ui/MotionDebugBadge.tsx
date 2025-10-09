import { isMotionDebugEnabled, isMotionEnabled, isReducedMotionPreferred, RAW_ENABLE_PARALLAX_ENV, ENABLE_PARALLAX } from "@/lib/featureFlags";

export const MotionDebugBadge = () => {
  if (typeof window === "undefined") return null;
  if (!isMotionDebugEnabled()) return null;

  const reduced = isReducedMotionPreferred();
  const enabled = isMotionEnabled();

  const label = `PARALLAX ${enabled ? "ON" : "OFF"} · REDUCED ${reduced ? "ON" : "OFF"}`;

  return (
    <div
      style={{
        position: "fixed",
        right: 8,
        bottom: 8,
        zIndex: 1000,
        fontSize: 11,
        padding: "4px 8px",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        borderRadius: 6,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {label}
      <div style={{ fontSize: 10, opacity: 0.75, marginTop: 2 }}>env: {String(RAW_ENABLE_PARALLAX_ENV ?? "undefined")} · codeDefault: {String(ENABLE_PARALLAX)}</div>
    </div>
  );
};

export default MotionDebugBadge;


