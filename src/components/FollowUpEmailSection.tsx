import React from "react";
/*
Responsive refactor summary
- Section spacing updated to py-16 md:py-20 lg:py-24; container remains transparent.
- Frame is full-width within container; content gaps use responsive tokens.
- Mobile strip cards use min-w and token spacing; text uses clamp where needed in subcomponents.
*/
import EmailMockInbox from "./email-demo/EmailMockInbox";
import EmailMockPreview from "./email-demo/EmailMockPreview";
import EmailClientFrame from "./email-demo/EmailClientFrame";

const FollowUpEmailSection: React.FC = () => {
  const content = {
    senderName: "Clarity AI",
    senderEmail: "noreply@clarity.ai",
    subject: "Interview follow-up & action items",
    timestamp: "2 mins ago",
  };

  const inboxItems = [
    {
      id: "1",
      sender: "Clarity AI",
      subject: content.subject,
      preview: "Thanks for your time today — here are action items and next steps…",
      time: "2m",
      isNew: true,
      isSelected: true,
    },
    { id: "2", sender: "Hiring Team", subject: "Next steps for Frontend role", preview: "Could you share availability next week?", time: "1h" },
    { id: "3", sender: "Recruiter", subject: "Interview scheduling", preview: "Let’s confirm a time that works for you.", time: "1d" },
    { id: "4", sender: "Engineering", subject: "Follow-up questions", preview: "We’d love to hear more about your approach.", time: "2d" },
    { id: "5", sender: "Team Updates", subject: "Weekly summary", preview: "Highlights from this week’s releases.", time: "3d" },
  ];

  return (
    <section id="follow-up" data-email-demo className="py-16 md:py-20 lg:py-24 px-4">
      <div className="container mx-auto max-w-screen-xl">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Follow-up email, done for you
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
            After every meeting, Clarity sends you a polished follow-up email with action items.
          </p>
        </div>

        {/* Gmail-like frame with panes inside */}
        <EmailClientFrame>
          <div className="hidden md:block">
            <EmailMockInbox items={inboxItems} />
          </div>
          <div>
            {/* Mobile compact inbox strip inside frame */}
            <div className="md:hidden mb-4 overflow-x-auto">
              <div className="flex gap-3 min-w-full">
                {inboxItems.slice(0, 4).map((it) => (
                  <div key={it.id} className="min-w-[14rem] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm">
                    <p className="text-sm font-medium text-[color:var(--color-text)] truncate">{it.sender}</p>
                    <p className="text-xs text-[color:var(--color-text)] truncate">{it.subject}</p>
                    <p className="text-[11px] text-[color:var(--color-muted)] truncate mt-1">{it.preview}</p>
                  </div>
                ))}
              </div>
            </div>

            <EmailMockPreview
              senderName={content.senderName}
              senderEmail={content.senderEmail}
              subject={content.subject}
              timestamp={content.timestamp}
            />
          </div>
        </EmailClientFrame>
      </div>
    </section>
  );
};

export default FollowUpEmailSection;


