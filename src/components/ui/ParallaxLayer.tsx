import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { ENABLE_PARALLAX, isMotionEnabled } from "@/lib/featureFlags";

type Axis = "x" | "y";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  axis?: Axis;
  /** Positive moves with scroll; negative moves opposite */
  speed?: number;
  /** Max shift in px */
  distance?: number;
  /** Start and end scroll progress (0..1) for mapping */
  start?: number;
  end?: number;
  /** Set to true to disable pointer events on the layer */
  inert?: boolean;
}

export const ParallaxLayer = ({
  children,
  className,
  axis = "y",
  speed = 1,
  distance = 16,
  start = 0,
  end = 1,
  inert = true,
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // viewport scroll by default; could attach to target later
  const { scrollYProgress } = useScroll({
    // If we want to scope to the element, uncomment the following two lines
    // target: ref,
    // offset: ["start end", "end start"],
  });

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const disabled = prefersReducedMotion || !ENABLE_PARALLAX || !isMotionEnabled();

  // Mobile clamp
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const maxDistance = isMobile ? Math.round(distance * 0.7) : distance;

  const t = useTransform(scrollYProgress, [start, end], [0, speed * maxDistance]);
  const style = axis === "x" ? { x: disabled ? 0 : t, willChange: disabled ? undefined : "transform" } : { y: disabled ? 0 : t, willChange: disabled ? undefined : "transform" };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style as any}
      aria-hidden={inert ? true : undefined}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;


