import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { teleprompterDemo } from "@/content/teleprompterDemo";
import { isMotionEnabled } from "@/lib/featureFlags";

export interface TeleprompterOverlayRef {
  play: () => void;
  pause: () => void;
  replay: () => void;
  next: () => void;
}

interface TeleprompterOverlayProps {
  leftAnchorRef?: React.RefObject<HTMLElement>;
  rightAnchorRef?: React.RefObject<HTMLElement>;
}

const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getQueryFlag = (key: string) => {
  if (typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search);
  return q.get(key) === "1";
};

export const TeleprompterOverlay = forwardRef<TeleprompterOverlayRef, TeleprompterOverlayProps>(function TeleprompterOverlay(
  { leftAnchorRef, rightAnchorRef },
  ref
) {
  const reduced = prefersReducedMotion() || !isMotionEnabled();
  const debug = getQueryFlag("teledebug");
  const highContrast = getQueryFlag("telecontrast");
  const fast = getQueryFlag("telefast");

  const turns = teleprompterDemo.turns;
  const [turnIdx, setTurnIdx] = useState<number>(0);
  const currentTurn = turns[Math.max(0, Math.min(turnIdx, turns.length - 1))];

  const [playing, setPlaying] = useState<boolean>(!reduced);
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const [showWave, setShowWave] = useState<boolean>(false);
  const [ghostProgress, setGhostProgress] = useState<number>(reduced ? 1 : 0);
  const [ghostBgAlpha, setGhostBgAlpha] = useState<number>(reduced ? 0.96 : 0.88);
  const [ghostShadowAlpha, setGhostShadowAlpha] = useState<number>(reduced ? 0.12 : 0.06);

  const timersRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const loggedRef = useRef<boolean>(false);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({ play, pause, replay, next }), [turnIdx, reduced, playing]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[teleprompter-v1] mounted");
    }
    if (!reduced) startTurn(turnIdx);
    else renderReduced();
    return () => stop();
  }, []);

  useEffect(() => {
    if (!debug) return;
    const id = window.setTimeout(() => {
      const leftA = leftAnchorRef?.current;
      const rightA = rightAnchorRef?.current;
      const leftR = leftA?.getBoundingClientRect();
      const rightR = rightA?.getBoundingClientRect();
      const lBox = leftBoxRef.current?.getBoundingClientRect();
      const rBox = rightBoxRef.current?.getBoundingClientRect();
      // eslint-disable-next-line no-console
      console.info("[teledebug] turn", { turn: currentTurn?.id, leftR, rightR, lBox, rBox });
      if (!leftR || !rightR || leftR.width === 0 || rightR.width === 0) {
        // eslint-disable-next-line no-console
        console.warn("[teledebug] anchor missing or zero size");
      }
    }, 0);
    return () => clearTimeout(id);
  }, [debug, turnIdx]);

  function scale(ms: number) {
    return fast ? Math.max(50, Math.floor(ms * 0.5)) : ms;
  }

  function stop() {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function renderReduced() {
    setPlaying(false);
    setShowBadge(false);
    setShowWave(false);
    setGhostProgress(1);
    setGhostBgAlpha(0.96);
    setGhostShadowAlpha(0.12);
  }

  function resetTurnVisuals() {
    setShowBadge(false);
    setShowWave(false);
    setGhostProgress(reduced ? 1 : 0);
    setGhostBgAlpha(reduced ? 0.96 : 0.88);
    setGhostShadowAlpha(reduced ? 0.12 : 0.06);
  }

  function play() {
    if (reduced) {
      renderReduced();
      return;
    }
    if (playing) return;
    setPlaying(true);
    startTurn(turnIdx);
  }

  function pause() {
    setPlaying(false);
    stop();
  }

  function replay() {
    stop();
    setTurnIdx(0);
    resetTurnVisuals();
    setPlaying(!reduced);
    if (!reduced) startTurn(0);
    else renderReduced();
  }

  function next() {
    stop();
    const nextIdx = Math.min(turns.length - 1, turnIdx + 1);
    setTurnIdx(nextIdx);
    resetTurnVisuals();
    if (reduced) renderReduced();
    else startTurn(nextIdx);
  }

  function startTurn(idx: number) {
    if (reduced) return;
    const t = turns[idx];
    if (!t) return;
    const detectDelay = scale(t.timings?.detectDelay ?? 300);
    const typeMs = scale(t.timings?.typeMs ?? 1400);
    const holdMs = scale(t.timings?.holdMs ?? 1000);

    // Badge + waveform cue
    timersRef.current.push(window.setTimeout(() => {
      setShowBadge(true);
      setShowWave(true);
      if (debug && !loggedRef.current) {
        // eslint-disable-next-line no-console
        console.info(`[tele] turn ${t.id}: detect @${detectDelay}ms`);
      }
    }, detectDelay));
    timersRef.current.push(window.setTimeout(() => setShowBadge(false), detectDelay + 260));
    timersRef.current.push(window.setTimeout(() => setShowWave(false), detectDelay + 560));

    // Typing by chunks starting at 600ms after turn start
    const typingStart = scale(600);
    timersRef.current.push(window.setTimeout(() => {
      const words = t.answer.split(/\s+/);
      let idxw = 0;
      const chunkSize = 3;
      const ticks = Math.ceil(words.length / chunkSize);
      const tickMs = Math.max(80, Math.floor(typeMs / ticks));
      intervalRef.current = window.setInterval(() => {
        idxw = Math.min(words.length, idxw + chunkSize);
        setGhostProgress(idxw / words.length);
        if (idxw >= words.length && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          // Elevate soon after typing completes
          timersRef.current.push(window.setTimeout(() => {
            setGhostBgAlpha(0.96);
            setGhostShadowAlpha(0.12);
          }, scale(200)));
        }
      }, tickMs) as unknown as number;
      if (debug && !loggedRef.current) {
        // eslint-disable-next-line no-console
        console.info(`[tele] turn ${t.id}: typing start @${typingStart}ms (tick ${tickMs}ms)`);
      }
    }, typingStart));

    // Advance to next turn after hold
    const totalAdvance = typingStart + typeMs + scale(200) + holdMs;
    timersRef.current.push(window.setTimeout(() => {
      if (idx < turns.length - 1) {
        setTurnIdx(idx + 1);
        resetTurnVisuals();
        startTurn(idx + 1);
      } else {
        setPlaying(false);
      }
    }, totalAdvance));
  }

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  const hint = currentTurn?.hint || (isMac ? teleprompterDemo.hintMac : teleprompterDemo.hintWin);

  const ghostWords = useMemo(() => (currentTurn?.answer || "").split(/\s+/), [turnIdx]);
  const visibleWords = Math.max(0, Math.floor(ghostWords.length * ghostProgress));
  const ghostDisplay = ghostWords.slice(0, visibleWords).join(" ");
  const caretVisible = !reduced && visibleWords < ghostWords.length;

  // Responsive clamps for width & offsets
  const widthClamp = useMemo(() => {
    if (typeof window === "undefined") return "clamp(220px,26vw,360px)";
    const w = window.innerWidth;
    if (w < 768) return "clamp(200px,38vw,280px)";
    if (w < 1024) return "clamp(200px,30vw,300px)";
    return "clamp(220px,26vw,360px)";
  }, []);
  const bottomOffset = useMemo(() => {
    if (typeof window === "undefined") return 40;
    const w = window.innerWidth;
    return w < 768 ? 44 : 40;
  }, []);
  const sideOffset = useMemo(() => {
    if (typeof window === "undefined") return 32;
    const w = window.innerWidth;
    return w < 768 ? 24 : 32;
  }, []);

  const baseShadow = (alpha: number) => `0 6px 18px rgba(0,0,0,${alpha})`;
  const pillBgAlphaRight = highContrast ? 0.98 : 0.96;
  const pillBgRight = `rgba(255,255,255,${pillBgAlphaRight})`;
  const pillOutline = highContrast ? { outline: "1px dashed var(--color-primary)" } : undefined;

  const Wave = showWave && !reduced ? (
    <div style={{ position: "absolute", left: sideOffset, top: 12 }} className="flex gap-0.5">
      <span className="w-1 h-2 bg-primary/60 rounded-sm" />
      <span className="w-1 h-3 bg-primary/70 rounded-sm" />
      <span className="w-1 h-2 bg-primary/60 rounded-sm" />
    </div>
  ) : null;

  // Left tile: recruiter question (bottom-left)
  const recruiterCaption = (
    <div style={{ position: "relative" }}>
      {Wave}
      <div
        ref={leftBoxRef}
        className="pointer-events-none text-[13px] leading-snug rounded-[12px] border border-[var(--color-border)] text-foreground z-[10]"
        style={{ position: "absolute", left: sideOffset, bottom: bottomOffset, maxWidth: widthClamp, padding: "10px 14px", background: pillBgRight, boxShadow: baseShadow(0.12), ...pillOutline }}
      >
        {currentTurn?.question}
        {showBadge && !reduced && (
          <div style={{ position: "absolute", left: 0, top: -22 }} className="text-[11px] px-2 py-0.5 rounded-full bg-primary text-white">
            Question detected
          </div>
        )}
      </div>
    </div>
  );

  // Right tile: Clarity ghost reply (bottom-right)
  const clarityGhost = (
    <div
      ref={rightBoxRef}
      className="pointer-events-none text-[13px] leading-snug rounded-[12px] border border-[var(--color-border)] text-foreground z-[10]"
      style={{ position: "absolute", right: sideOffset, bottom: bottomOffset, maxWidth: widthClamp, padding: "10px 14px", background: highContrast ? "rgba(255,255,255,0.98)" : `rgba(255,255,255,${ghostBgAlpha})`, boxShadow: baseShadow(ghostShadowAlpha), transition: "background-color 300ms ease, box-shadow 300ms ease", ...pillOutline }}
    >
      <div className="relative">
        <span>{ghostDisplay}</span>
        <span className={`ml-0.5 text-primary ${caretVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
        <span className="absolute -top-5 left-0 text-[10px] px-2 py-0.5 rounded-full bg-primary text-white">Clarity</span>
        <span className="absolute -top-4 left-[58px] w-1.5 h-1.5 rounded-full bg-primary" />
      </div>
      {!caretVisible && (
        <div className="mt-1 text-[11px] text-foreground/60">{hint}</div>
      )}
    </div>
  );

  return (
    <>
      {leftAnchorRef?.current ? createPortal(recruiterCaption, leftAnchorRef.current) : null}
      {rightAnchorRef?.current ? createPortal(clarityGhost, rightAnchorRef.current) : null}
    </>
  );
});

export default TeleprompterOverlay;


