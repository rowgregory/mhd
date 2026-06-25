"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import InnerHeader from "./InnerHeader";
import Picture from "./ui/Picture";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  src: string;
  alt?: string;
  height?: "sm" | "md" | "lg";
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
  const ref = useRef<HTMLElement>(null);

  // Track this hero's scroll progress. Since it's at the top of the page it
  // starts fully in view; the parallax plays as it scrolls up and out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Drift the oversized image down as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // add: content drifts down slower than the page, so it lingers.
  // Positive y = moves down as you scroll = counteracts the upward scroll = stays on screen longer.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // optional: fade it out near the end so it doesn't overlap the next section
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    // The header is absolute inside this relative container — they scroll away
    // together as one locked unit (no sticky behaviour here).
    <section
      ref={ref}
      className={`relative flex flex-col overflow-hidden ${HEIGHTS[height]}`}
    >
      {/* Parallax background photo — taller than the section so it can travel
          without exposing edges. Static on mobile and for reduced motion. */}
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 top-[-10%] h-[130%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
      >
        <Picture
          fill
          src={src}
          alt={alt}
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay so text reads on any photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      {/* Site header — sits on top, transparent (photo shows through). Same
          position/style as the main hero header. Scrolls away with the hero. */}
      <InnerHeader />

      {/* Centered page title */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center will-change-transform"
      >
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
      </motion.div>

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
