import React from "react";

/*
Responsive refactor summary
- Removed fixed pixel widths on the sidebar; rely on parent grid minmax sizing.
- Converted paddings to p-3 md:p-4 and font sizes to clamp() for fluid scaling.
- Ensured selected item exposes aria-current and preserved token-based colors/borders.
*/

type InboxItem = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isNew?: boolean;
  isSelected?: boolean;
};

interface EmailMockInboxProps {
  items: InboxItem[];
}

const EmailMockInbox: React.FC<EmailMockInboxProps> = ({ items }) => {
  return (
    <aside aria-label="Inbox" className="w-full shrink-0" data-anim="inbox">
      <ul className="list-none m-0 p-0 divide-y" style={{ divideColor: "rgba(0,0,0,0.06)" }}>
        {items.map((item) => (
          <li key={item.id} className="first:pt-0 last:pb-0">
            <button
              type="button"
              aria-current={item.isSelected ? "true" : undefined}
              className={`group w-full text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${
                item.isSelected
                  ? "bg-[color:rgba(0,0,0,0.03)]"
                  : "hover:bg-[color:rgba(0,0,0,0.035)]"
              } ${item.isNew ? "relative" : ""}`}
            >
              <div className="flex items-start gap-3 p-3 md:p-4">
                {/* Left accent for new */}
                {item.isNew ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-[var(--color-primary)]"
                  />
                ) : null}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[color:var(--color-text)] truncate text-[clamp(0.95rem,0.4vw+0.85rem,1.0625rem)] leading-6">
                      {item.sender}
                    </p>
                    <span className="ml-2 flex items-center gap-2 text-[color:var(--color-muted)] text-[clamp(0.75rem,0.3vw+0.7rem,0.875rem)]">
                      {item.isNew ? (
                        <>
                          <span className="sr-only">New</span>
                          <span aria-hidden="true" className="text-[var(--color-primary)] align-middle">●</span>
                        </>
                      ) : null}
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[color:var(--color-text)] truncate mt-0.5 text-[clamp(0.95rem,0.35vw+0.85rem,1.0625rem)] leading-6">
                    {item.subject}
                  </p>
                  <p className="text-[color:var(--color-muted)] truncate mt-0.5 text-[clamp(0.8rem,0.3vw+0.75rem,0.9rem)] leading-5">
                    {item.preview}
                  </p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default EmailMockInbox;


