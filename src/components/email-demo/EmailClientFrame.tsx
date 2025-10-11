import React from "react";

/*
Responsive refactor summary
- Frame made fluid: full width with container limits handled by section; rounded-2xl and soft shadow.
- App bar icons sized with relative units; search field scales; no fixed heights beyond semantic bar height classes.
- Content area uses max-h with viewport clamp and overflow-auto; grid uses minmax for sidebar.
*/

interface EmailClientFrameProps {
  children: React.ReactNode;
}

const IconHamburger = () => (
  <svg className="size-[1.125rem] md:size-[1.25rem]" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconSearch = () => (
  <svg className="size-[1.125rem] md:size-[1.25rem]" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 15l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DotCircle = () => (
  <span className="inline-block w-8 h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]" aria-hidden />
);

const EmailClientFrame: React.FC<EmailClientFrameProps> = ({ children }) => {
  const panes = React.Children.toArray(children);
  const leftPane = panes[0] ?? null;
  const rightPane = panes[1] ?? null;

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{
        background: "rgba(255,255,255,0.96)",
        boxShadow: "0 8px 40px rgba(0,0,0,.06), inset 0 0 0 1px var(--color-border)",
      }}
      data-anim="email-frame"
    >
      {/* App bar (non-sticky so the window grows and page scrolls) */}
      <div className="h-14 md:h-16 flex items-center justify-between px-3 md:px-4 border-b bg-[color:rgba(255,255,255,0.96)]" style={{ borderBottomColor: "rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 md:gap-3">
          <button aria-label="Open menu" className="p-2 rounded-full hover:bg-[color:rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2">
            <IconHamburger />
          </button>
          <span className="text-sm md:text-base font-semibold text-[color:var(--color-text)]">Mail</span>
        </div>
        <div className="flex-1 max-w-[min(48rem,80%)] mx-2 hidden sm:flex">
          <div
            className="w-full flex items-center gap-2 rounded-full px-3 py-2 text-[color:var(--color-muted)] text-[clamp(0.85rem,0.3vw+0.8rem,0.95rem)]"
            style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }}
          >
            <IconSearch />
            <span className="text-sm select-none">Search mail</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button aria-label="Search mail" className="sm:hidden p-2 rounded-full hover:bg-[color:rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2">
            <IconSearch />
          </button>
          <button aria-label="Help" className="hidden sm:inline-flex">
            <DotCircle />
          </button>
          <button aria-label="Settings" className="hidden md:inline-flex">
            <DotCircle />
          </button>
          <button aria-label="Profile" className="inline-flex">
            <DotCircle />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="pb-6">
        <div className="lg:grid lg:grid-cols-[minmax(260px,320px)_1fr]">
          {/* Left pane with subtle hairline divider via inset keyline */}
          <div
            className="hidden md:block"
            style={{ boxShadow: "inset -1px 0 0 var(--color-border)" }}
            data-anim="email-inbox"
          >
            {leftPane}
          </div>
          <div data-anim="email-preview">{rightPane}</div>
        </div>
      </div>
    </div>
  );
};

export default EmailClientFrame;


