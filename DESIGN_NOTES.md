# Clarity Design Notes

## Theme Tokens

- --color-primary: #1E5AFF
- --color-primary-hover: #0047D1
- --color-accent: #00B3FF
- --color-bg: #F8F9FB
- --color-text: #0F1115
- --color-muted: #666F7A
- --color-surface: #FFFFFF
- --color-border: rgba(0,0,0,0.08)

These map into Tailwind via CSS variables in `src/index.css` and `tailwind.config.ts`.

## Global Effects

- Background: subtle grid (180px) with low-opacity lines and a central radial gradient.
- Shadows: primary glow and card shadow updated for a crisp, elevated look.
- Animations: shimmer (for gradient text), fade-up for hero, subtle hover scale.

## Header (Floating Card)

- Sticky `top-4` translucent card with `backdrop-blur-md`, rounded corners, and soft elevation.
- On scroll, padding compresses and background becomes solid white with consistent border.
- Sign In button: black pill, hover lift with blue glow shadow.

## Hero Section

- Centered composition with increased spacing and clearer hierarchy.
- "CLARITY" word uses gradient text from primary to accent with shimmer animation.
- Primary CTA: Download Extension (blue). Secondary CTA: Get started (outlined blue).
- Ambient blobs and radial gradient provide depth without distraction.

## Accessibility

- Colors chosen to meet WCAG AA for typical text-on-surface usage.
- Hover and focus states are visible with clear color and motion affordances.
