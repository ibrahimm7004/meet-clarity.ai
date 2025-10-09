import { motion } from "framer-motion";
import { useMemo } from "react";
import { motionPresets, RevealPresetKey, resolveRevealDuration } from "@/components/ui/scrollMotion.config";
import { ENABLE_PARALLAX } from "@/lib/featureFlags";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPresetKey;
  delay?: number;
  once?: boolean;
}

export const RevealOnScroll = ({
  children,
  className,
  preset = "fadeUp",
  delay = 0,
  once = true,
}: RevealOnScrollProps) => {
  const cfg = motionPresets.reveal[preset];

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const disabled = prefersReducedMotion || !ENABLE_PARALLAX;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const initial: any = { opacity: cfg.opacityFrom ?? 0 };
  if (cfg.yFrom !== undefined) initial.y = cfg.yFrom;
  if ((cfg as any).scaleFrom !== undefined) initial.scale = (cfg as any).scaleFrom;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once }}
      transition={{ duration: resolveRevealDuration(cfg.duration ?? 0.6), ease: cfg.ease, delay }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;


