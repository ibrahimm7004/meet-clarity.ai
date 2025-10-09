export const motionPresets = {
  parallax: {
    slow: { distance: 12, axis: "y", ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    medium: { distance: 18, axis: "y", ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    fast: { distance: 24, axis: "y", ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  reveal: {
    // Base durations before multiplier
    fadeUp: { opacityFrom: 0, yFrom: 16, duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    fadeScale: { opacityFrom: 0, scaleFrom: 0.96, duration: 0.46, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    fade: { opacityFrom: 0, duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
} as const;

export type ParallaxPresetKey = keyof typeof motionPresets.parallax;
export type RevealPresetKey = keyof typeof motionPresets.reveal;

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function getRevealDurationMultiplier(): number {
  const envVal = (import.meta as any)?.env?.VITE_REVEAL_DURATION_MULTIPLIER;
  let mult = 1.5; // default slower
  if (envVal !== undefined) {
    const parsed = parseFloat(String(envVal));
    if (!Number.isNaN(parsed)) mult = parsed;
  }
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("motionSlow") === "1") {
      mult *= 2; // temporary review boost
    }
  }
  return clamp(mult, 0.5, 3);
}

export function resolveRevealDuration(baseSeconds: number): number {
  return baseSeconds * getRevealDurationMultiplier();
}


