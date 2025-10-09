export const teleprompterDemo = {
  hintMac: "Press ⌘↵ to use",
  hintWin: "Press Ctrl+Enter to use",
  turns: [
    {
      id: "db-perf",
      question: "How did you improve database performance on your last project?",
      answer:
        "I profiled slow queries, added targeted indexes, and batched writes—cutting P95 latency by ~60% without extra infra.",
      hint: "Press ⌘↵ to use",
      timings: { detectDelay: 300, typeMs: 1400, holdMs: 900 },
    },
    {
      id: "team-conflict",
      question: "Tell me about a time you resolved a team conflict.",
      answer:
        "I aligned on shared goals, clarified roles, and set decision criteria—unblocked delivery while keeping trust high.",
      hint: "Press ⌘↵ to use",
      timings: { detectDelay: 320, typeMs: 1300, holdMs: 900 },
    },
    {
      id: "leadership",
      question: "Share a leadership example you’re proud of.",
      answer:
        "I led a cross‑functional rewrite behind feature flags—reduced incidents 40% and improved cycle time by 25%.",
      hint: "Press ⌘↵ to use",
      timings: { detectDelay: 300, typeMs: 1500, holdMs: 1000 },
    },
    {
      id: "follow-up",
      question: "What’s your plan for the first 90 days?",
      answer:
        "Map systems and stakeholders, ship a low‑risk win in 2–3 weeks, then tackle a measurable reliability/throughput goal.",
      hint: "Press ⌘↵ to use",
      timings: { detectDelay: 300, typeMs: 1400, holdMs: 1000 },
    },
  ],
} as const;


