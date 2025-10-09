# Branding Tokens and Usage

Allowed tokens (CSS variables):
- --color-primary, --color-primary-hover, --color-accent, --color-bg, --color-text, --color-muted, --color-surface, --color-border

Allowed utility mappings (Tailwind):
- bg-primary, text-primary, text-foreground, bg-card, border, etc., mapped via `tailwind.config.ts` to CSS variables.

Rules:
- No non-brand hues in marketing UI. Gradients only primary→accent.
- Icons use currentColor; tint using token classes.
- Cards/panels on `--color-surface` with `--color-border`.
- Shadows neutral only.

Guardrails:
- `npm run colors:scan` flags disallowed color usage.
- Reduced-motion and feature flags unaffected by token usage.


