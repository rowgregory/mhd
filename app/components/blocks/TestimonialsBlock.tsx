"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title?: string | null; // e.g. "Homeowner" or job role
  company?: string | null; // e.g. town, or business name
};

const FALLBACK: Testimonial[] = [
  {
    id: "1",
    quote:
      "They built our kitchen exactly the way we pictured it — and caught details we hadn't even thought of. The craftsmanship speaks for itself.",
    name: "Dee C.",
    title: "Homeowner",
    company: "Marblehead, MA",
  },
  {
    id: "2",
    quote:
      "Hands-on, respectful, and genuinely skilled. Every piece fits like it grew there. We couldn't be happier with the result.",
    name: "David F.",
    title: "Homeowner",
    company: "Swampscott, MA",
  },
  {
    id: "3",
    quote:
      "From the first sketch to the final install, the whole process felt easy. The finished built-ins are the best part of our home.",
    name: "The Jacobs Family",
    title: null,
    company: "Beverly, MA",
  },
];

export default function TestimonialsBlock({
  testimonials = FALLBACK,
  autoplay = true,
}: {
  testimonials?: Testimonial[];
  autoplay?: boolean;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const count = testimonials.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number, direction: 1 | -1) => {
      setDir(direction);
      setIndex(((next % count) + count) % count); // wrap
    },
    [count],
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  // Autoplay — pauses on reduced motion or single item.
  useEffect(() => {
    if (!autoplay || reduce || count <= 1) return;
    timer.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [autoplay, reduce, count]);

  if (count === 0) return null;

  const active = testimonials[index];

  const variants = {
    enter: (d: 1 | -1) => ({
      opacity: 0,
      x: reduce ? 0 : d * 40,
    }),
    center: { opacity: 1, x: 0 },
    exit: (d: 1 | -1) => ({
      opacity: 0,
      x: reduce ? 0 : d * -40,
    }),
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      className="bg-surface-alt px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Kind words
        </p>
        <h2
          id="testimonials-heading"
          className="mt-3 font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.05] tracking-[0.01em] text-fg"
        >
          What our clients say
        </h2>

        {/* Quote icon */}
        <Quote
          size={40}
          strokeWidth={1.25}
          aria-hidden="true"
          className="mx-auto mt-10 text-accent/60"
        />

        {/* Rotating quote */}
        <div className="relative mt-6 min-h-[180px] sm:min-h-[160px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={active.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduce ? 0.01 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <blockquote className="font-display text-[clamp(1.125rem,3vw,1.75rem)] uppercase leading-[1.3] tracking-[0.01em] text-fg">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-display text-base uppercase tracking-[0.08em] text-fg">
                  {active.name}
                </span>
                {(active.title || active.company) && (
                  <span className="mt-1 block font-sans text-sm text-fg-muted">
                    {[active.title, active.company].filter(Boolean).join(", ")}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls — only if more than one */}
        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center border border-line/25 text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 w-2 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    i === index ? "bg-accent" : "bg-fg/20 hover:bg-fg/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center border border-line/25 text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
