"use client";

import { useEffect, useRef, useState } from "react";

type ScrollHeader = {
  /** true when the sticky header should be visible (scrolling up, past hero) */
  visible: boolean;
  /** true once scrolled past the threshold (used for bg/shadow) */
  scrolled: boolean;
};

/**
 * Drives a "smart" sticky header: hidden at the very top, reveals on scroll up,
 * hides on scroll down. Scroll positions are kept in refs (no per-scroll
 * re-render); only the two booleans that actually change the UI are state.
 *
 * @param threshold  px from top before the header can appear at all
 */
export function useScrollHeader(threshold = 600): ScrollHeader {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current;
      const past = y > threshold;

      // Visible only when scrolling up AND past the hero threshold.
      // Always hidden near the top (the hero has its own header there).
      setVisible(past && goingUp);
      setScrolled(past);

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { visible, scrolled };
}
