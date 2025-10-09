## Motion Guidelines

Scope: Marketing site only (React app under `src/`). Extension UI is not affected.

Feature flag: set `VITE_ENABLE_PARALLAX=false` to disable all motion.

Reduced motion: if `prefers-reduced-motion` is enabled, all parallax and reveals are disabled automatically.

Presets (see `src/components/ui/scrollMotion.config.ts`):
- parallax.slow | parallax.medium | parallax.fast — use for layered backgrounds or subtle depth (≤24px total shift).
- reveal.fadeUp | reveal.scaleIn — use for section headings and cards; keep subtle.

Components:
- ParallaxLayer: wraps decorative layers; accepts `axis`, `speed`, `distance`, `start`, `end`.
- RevealOnScroll: wraps content that should fade/slide in once when in view; accepts `preset`, `delay`, `once`.

Usage recommendations:
- Hero: slowest on far background grid/glow, medium on ambient blobs; keep headline/CTAs static.
- Features: apply `reveal.fadeUp` with small stagger to cards; optional micro parallax (≤10px) for decorative accents.
- Footer/Final CTA: reveal only; avoid parallax.

Performance:
- All movement uses `transform` for no layout shift. Avoid heavy filters on moving layers.


