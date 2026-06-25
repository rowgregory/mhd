"use client";

import { useReducedMotion, type Variants } from "framer-motion";

/**
 * Shared animation presets for MHD. Call once per component:
 *   const { container, rise } = useMotionPresets();
 * Reduced-motion is handled inside — presets collapse to near-instant when set.
 */
export function useMotionPresets() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Parent: staggers its children in. makeContainer(stagger, delay) for custom
  // timing (e.g. the header's quicker cascade); `container` is the default.
  const makeContainer = (stagger = 0.1, delay = 0.05): Variants => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  });
  const container = makeContainer();

  // Child: rises up + fades in.
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease },
    },
  };

  // Child: slides in from the left (for split/feature layouts).
  const fromLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -32 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0.01 : 0.7, ease },
    },
  };

  // Child: drops down + fades in (header items entering from above).
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : -12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease },
    },
  };

  // Reusable "reveal on scroll" props for a section wrapper.
  const reveal = {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.2 },
  };

  // Hamburger bar spring (Motion handles the morph instead of CSS).
  const barSpring = reduce
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 420, damping: 30 };

  // Slide-in drawer panel (from the right) + cascading links inside it.
  const drawerPanel: Variants = {
    hidden: { x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: reduce
        ? { duration: 0.01 }
        : {
            type: "spring",
            stiffness: 260,
            damping: 32,
            staggerChildren: 0.08,
          },
    },
    exit: {
      x: reduce ? 0 : "100%",
      opacity: reduce ? 0 : 1,
      transition: { duration: reduce ? 0.01 : 0.3, ease: [0.4, 0, 1, 1] },
    },
  };

  const drawerLink: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.5, ease },
    },
  };

  const tileVariants = (i: number): Variants => ({
    hidden: { opacity: 0, scale: reduce ? 1 : 1.02 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: i === 0 ? 0.7 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(0.05 * i, 0.4),
      },
    },
  });

  return {
    reduce,
    ease,
    container,
    makeContainer,
    rise,
    fromLeft,
    item,
    reveal,
    barSpring,
    drawerPanel,
    drawerLink,
    tileVariants,
  };
}
