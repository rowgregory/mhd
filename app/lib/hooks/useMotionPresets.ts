"use client";

import { useReducedMotion, type Variants } from "framer-motion";

/**
 * Shared animation presets for MHD sections.
 *
 * Instead of redeclaring `container`/`rise` variants at the top of every
 * component, call this once:
 *
 *   const { container, rise, ease } = useMotionPresets();
 *
 * Reduced-motion is handled inside — when the user prefers reduced motion the
 * presets collapse to near-instant, no-movement variants automatically.
 */
export function useMotionPresets() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Parent: staggers its children in.
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

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

  // Reusable "reveal on scroll" props for a section wrapper.
  const reveal = {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.2 },
  };

  const fromRight: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : -12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Hamburger bar spring (Motion handles the morph instead of CSS).
  const barSpring = reduce
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 420, damping: 30 };

  const headerContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  return {
    reduce,
    ease,
    container,
    rise,
    fromLeft,
    reveal,
    fromRight,
    item,
    barSpring,
    headerContainer,
  };
}
