export function scrollToSection(targetId: string, opts: { updateHash?: boolean } = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headerEl = document.querySelector('[data-site-header]') as HTMLElement | null;
  const headerH = headerEl ? headerEl.getBoundingClientRect().height : 0;
  const el = targetId === 'home' ? document.body : (document.getElementById(targetId) as HTMLElement | null);
  const top = el ? (el.getBoundingClientRect().top + window.scrollY - headerH - 12) : 0;

  if (opts.updateHash) {
    try { history.replaceState(null, '', targetId === 'home' ? ' ' : `#${targetId}`); } catch {}
  }

  if (reduced) {
    window.scrollTo(0, Math.max(0, top));
  } else {
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}

export function applyHashOffsetOnLoad() {
  if (typeof window === 'undefined') return;
  const hash = (window.location.hash || '').replace('#', '');
  if (!hash) return;
  setTimeout(() => scrollToSection(hash), 0);
}


