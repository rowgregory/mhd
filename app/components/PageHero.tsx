"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Picture from "./ui/Picture";
import InnerHeader from "./InnerHeader";

type PageHeroProps = {
  /** Page title shown centered over the photo. */
  title: string;
  /** Optional eyebrow line above the title. */
  eyebrow?: string;
  /** Hero background image path (from /public). */
  src: string;
  /** Alt text for the background image. */
  alt?: string;
  /** How tall the hero should be. Defaults to a short inner-page height. */
  height?: "sm" | "md" | "lg";
  /** Whether to show the scroll-down chevron. Default true. */
  showChevron?: boolean;
};

const HEIGHTS: Record<"sm" | "md" | "lg", string> = {
  sm: "min-h-[280px] sm:min-h-[340px]",
  md: "min-h-[380px] sm:min-h-[480px]",
  lg: "min-h-[480px] sm:min-h-[600px]",
};

export default function PageHero({
  title,
  eyebrow,
  src,
  alt = "",
  height = "md",
  showChevron = true,
}: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    // The header is absolute inside this relative container — they scroll away
    // together as one locked unit (no sticky behaviour here).
    <section
      className={`relative flex flex-col overflow-hidden ${HEIGHTS[height]}`}
    >
      {/* Background photo */}
      <Picture
        fill
        src={src}
        alt={alt}
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay so text reads on any photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      {/* Site header — sits on top, transparent (photo shows through). Same
          position/style as the main hero header. Scrolls away with the hero. */}
      <InnerHeader />

      {/* Centered page title */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-sans text-xs uppercase tracking-label text-bone/70"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: eyebrow ? 0.1 : 0,
          }}
          className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-none tracking-[0.04em] text-bone"
        >
          {title}
        </motion.h1>
      </div>

      {/* Scroll chevron */}
      {showChevron && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          aria-hidden="true"
          className="relative z-10 mb-8 flex justify-center"
        >
          <ChevronDown
            size={24}
            strokeWidth={1.5}
            className="animate-bounce text-bone/60"
          />
        </motion.div>
      )}
    </section>
  );
}
