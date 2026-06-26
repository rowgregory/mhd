"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useReducedMotion,
  animate,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

export type Stat = {
  /** The number to count up to. */
  value: number;
  /** Label shown over the number, e.g. "Projects". */
  label: string;
  /** Optional suffix like "+" or "%". */
  suffix?: string;
};

const DEFAULT_STATS: Stat[] = [
  { value: 37, label: "Projects" },
  { value: 65, label: "People" },
  { value: 5, label: "Years" },
  { value: 1, label: "Shop" },
];

export default function StatsCounter({
  stats = DEFAULT_STATS,
}: {
  stats?: Stat[];
}) {
  const ref = useRef<HTMLUListElement>(null);
  // start the count when the row scrolls into view (once)
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          ref={ref}
          className="grid grid-cols-2 gap-y-10 sm:gap-y-0 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={[
                "relative flex items-center justify-center",
                // half-height centered divider via a pseudo-element on the left edge
                "before:absolute before:left-0 before:top-1/2 before:h-1/2 before:w-px before:-translate-y-1/2 before:bg-warm-gray/30 before:content-['']",
                // hide the divider on the first item of each row (no leading line)
                i % 2 === 0 ? "before:hidden" : "",
                "sm:before:block lg:before:block",
                // re-hide on the true first item at each breakpoint
                "sm:first:before:hidden lg:first:before:hidden",
              ].join(" ")}
            >
              <StatItem stat={stat} start={inView} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const reduce = useReducedMotion();
  const [counted, setCounted] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const display = reduce ? stat.value : counted;

  // Parallax the big number watermark as the row scrolls through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCounted(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce, start, stat.value]);

  return (
    <div
      ref={ref}
      className="relative flex h-40 w-full items-center justify-center overflow-hidden sm:h-48"
    >
      {/* Giant faded number watermark — drifts on scroll for depth */}
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { y: numberY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[7rem] leading-none text-surface-alt will-change-transform sm:text-[11rem]"
      >
        {display}
        {stat.suffix}
      </motion.span>

      {/* Label on top — stays put, so it separates from the drifting number */}
      <span className="relative font-display text-fg text-sm uppercase tracking-[0.08em] sm:text-xl">
        {stat.label}
      </span>

      <span className="sr-only">
        {stat.value}
        {stat.suffix} {stat.label}
      </span>
    </div>
  );
}
