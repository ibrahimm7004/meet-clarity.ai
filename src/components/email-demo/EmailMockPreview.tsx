import React from "react";
import clarityLogo from "@/assets/clarity-logo.png";

/*
Responsive refactor summary
- Replaced fixed paddings with p-4 md:p-6 lg:p-7 and fluid text via clamp().
- Avatar and icons sized in rem/relative units; image scales to half of the avatar.
- Removed fixed heights; the card grows naturally; max-height is controlled by frame.
*/

interface EmailMockPreviewProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
}

const EmailMockPreview: React.FC<EmailMockPreviewProps> = ({ senderName, senderEmail, subject, timestamp }) => {
  const chips = [
    { label: "Talk ratio 62%", aria: "Talk ratio sixty two percent" },
    { label: "Keywords hit 84%", aria: "Keywords hit eighty four percent" },
    { label: "Topics covered 7", aria: "Topics covered seven" },
  ];

  const topChips = [
    { label: "Role: Senior Frontend Engineer", icon: (
      <svg className="size-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M3 7h14M5 5h10M7 7v8m6-8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ) },
    { label: "Focus: Perf & DB optimization", icon: (
      <svg className="size-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10l4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ) },
    { label: "Overall: Strong", icon: (
      <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 15l-4.045 2.128.773-4.51L3 9.372l4.523-.657L10 4.5l2.477 4.215 4.523.657-3.728 3.246.773 4.51z"/>
      </svg>
    ) },
  ];

  return (
    <article
      aria-label="Selected email"
      className="w-full rounded-xl bg-[var(--color-surface)]"
      style={{ boxShadow: "0 6px 24px rgba(0,0,0,.05)" }}
      data-anim="preview"
    >
      {/* Header */}
      <header className="p-4 md:p-5 lg:p-6 border-b border-[var(--color-border)] flex items-start justify-between">
        <div className="flex items-start gap-3 md:gap-4 min-w-0">
          {/* Avatar (Clarity logo in circular badge) */}
          <div className="rounded-full overflow-hidden flex items-center justify-center size-[2.25rem] md:size-[2.5rem] outline outline-1 outline-[var(--color-border)]" style={{ background: "rgba(30,90,255,0.12)" }}>
            <img src={clarityLogo} alt="Clarity logo" className="w-1/2 h-1/2 opacity-95" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[color:var(--color-text)] truncate text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] leading-6">{senderName}</p>
            <p className="text-[color:var(--color-muted)] truncate text-[clamp(0.75rem,0.3vw+0.7rem,0.875rem)]">{senderEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[color:var(--color-muted)] text-[clamp(0.75rem,0.3vw+0.7rem,0.875rem)]">{timestamp}</span>
          <span className="px-2.5 py-1 rounded-full text-[color:var(--color-muted)] bg-[color:rgba(0,0,0,0.04)] text-[clamp(0.7rem,0.2vw+0.65rem,0.8rem)]">Auto-generated</span>
        </div>
      </header>

      {/* Subject */}
      <div className="px-4 md:px-5 lg:px-6 pt-4">
        <h2 className="font-semibold text-[color:var(--color-text)] text-[clamp(1rem,1vw+0.9rem,1.25rem)]">{subject}</h2>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 lg:p-6 pt-3 space-y-5">
        {/* A) Top summary chips */}
        <div className="flex flex-wrap gap-2">
          {topChips.map((chip) => (
            <span key={chip.label} className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[clamp(0.85rem,0.3vw+0.8rem,0.95rem)] text-[color:var(--color-text)] bg-[color:rgba(0,0,0,0.04)]">
              <span className="text-[color:var(--color-muted)]" aria-hidden>
                {chip.icon}
              </span>
              {chip.label}
            </span>
          ))}
        </div>

        {/* B) KPI mini-cards */}
        <div role="group" aria-label="Interview KPIs" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Overall score */}
          <div aria-label="Overall score eighty five out of one hundred" className="rounded-lg bg-[var(--color-surface)] p-3 md:p-4" style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }}>
            <p className="text-[color:var(--color-muted)] text-[clamp(0.8rem,0.25vw+0.75rem,0.9rem)]">Overall score</p>
            <p className="font-semibold text-[color:var(--color-text)] text-[clamp(1.25rem,1.2vw+1rem,1.5rem)]">85/100</p>
          </div>
          {/* Talk ratio */}
          <div aria-label="Talk ratio sixty two percent" className="rounded-lg bg-[var(--color-surface)] p-3 md:p-4" style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }}>
            <p className="text-[color:var(--color-muted)] text-[clamp(0.8rem,0.25vw+0.75rem,0.9rem)]">Talk ratio</p>
            <p className="font-semibold text-[color:var(--color-text)] text-[clamp(1.1rem,1vw+0.95rem,1.3rem)]">62%</p>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden" role="progressbar" aria-valuenow={62} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-[var(--color-primary)]" style={{ width: "62%" }} />
            </div>
          </div>
          {/* Keywords hit */}
          <div aria-label="Keywords hit eighty four percent" className="rounded-lg bg-[var(--color-surface)] p-3 md:p-4" style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }}>
            <p className="text-[color:var(--color-muted)] text-[clamp(0.8rem,0.25vw+0.75rem,0.9rem)]">Keywords hit</p>
            <p className="font-semibold text-[color:var(--color-text)] text-[clamp(1.1rem,1vw+0.95rem,1.3rem)]">84%</p>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden" role="progressbar" aria-valuenow={84} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-[var(--color-accent)]" style={{ width: "84%" }} />
            </div>
          </div>
        </div>

        {/* C) Action checklist */}
        <div>
          <p className="font-medium text-[color:var(--color-text)] text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] mb-2">Action items</p>
          <ul role="list" className="space-y-1 text-[color:var(--color-text)] text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] leading-relaxed">
            <li className="pl-6 [-text-indent:.9ch]">□ Send portfolio summary (2–3 projects)</li>
            <li className="pl-6 [-text-indent:.9ch]">□ Prepare before/after perf example (metrics + note)</li>
            <li className="pl-6 [-text-indent:.9ch]">□ Share availability for a 30-min walkthrough</li>
          </ul>
        </div>

        {/* D) Highlights */}
        <div>
          <p className="font-medium text-[color:var(--color-text)] text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] mb-2">Highlights</p>
          <ul role="list" className="list-disc pl-5 space-y-1 text-[color:var(--color-text)] text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] leading-7">
            <li>Clear impact improving DB-backed features and load time.</li>
            <li>Strong communication of trade-offs & ownership.</li>
          </ul>
        </div>

        {/* E) Resources */}
        <div className="space-y-1">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[color:var(--color-primary)] hover:text-[var(--color-primary-hover)] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)]"
          >
            View full interview report
            <span aria-hidden>→</span>
          </a>
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[color:var(--color-primary)] hover:text-[var(--color-primary-hover)] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)]"
            >
              Download PDF summary
            </a>
          </div>
        </div>

        {/* F) Footer */}
        <div className="pt-4 mt-2 border-t border-[var(--color-border)]">
          <p className="text-[color:var(--color-text)] text-[clamp(0.9rem,0.35vw+0.8rem,1rem)]">— Clarity AI</p>
          <p className="text-[color:var(--color-muted)] text-[clamp(0.8rem,0.3vw+0.75rem,0.9rem)] mt-1">This email was generated automatically from your meeting.</p>
        </div>
      </div>
    </article>
  );
};

export default EmailMockPreview;


