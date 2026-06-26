"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Picture from "../../../components/ui/Picture";
import ArrowButton from "../../../components/ui/ArrowButton";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Hero is at the top of the page — parallax plays as it scrolls up and out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image drifts down; content lingers (slower) and fades as the hero leaves.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative min-h-svh w-full overflow-hidden bg-ink"
    >
      {/* Background image — decorative, so empty alt. Real meaning is in the text.
          hero-zoom: slow 10s push on load. The parallax wrapper adds the
          scroll-linked drift on top (oversized so edges never expose).
          Static on mobile and for reduced motion. */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: imageY }}
        className="absolute inset-x-0 top-[-9%] h-[118%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
      >
        <Picture
          priority
          src="/images/hero-2.png"
          // src="/images/hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Scrim: darkens the photo so bone text always clears WCAG contrast.
          Heavier at the vertical center where the headline sits. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/30 to-ink/70"
      />

      {/* Content — lingers slower than the page scroll, then fades out */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 pb-20 pt-40 text-center will-change-transform sm:px-6 sm:pt-44"
      >
        <h1
          id="hero-heading"
          className="font-display text-[clamp(3rem,14vw,8rem)] uppercase leading-[0.92] tracking-[0.02em] text-bone"
        >
          <span className="hero-line-mask block">
            <span
              className="hero-line whitespace-nowrap"
              style={{ animationDelay: "0.15s" }}
            >
              Built to last
            </span>
          </span>
        </h1>

        <p
          className="hero-rise-item mt-4 text-[clamp(15px,3.4vw,32px)] uppercase tracking-[0.12em] text-bone/85"
          style={{ animationDelay: "0.65s" }}
        >
          Custom cabinetry &amp; fine woodwork
        </p>

        <span className="block lg:hidden">
          <ArrowButton
            href="/contact"
            variant="camel"
            ariaLabel="View our work"
            className="hero-rise-item mt-8"
            style={{ animationDelay: "0.85s" }}
          >
            Request a Quote
          </ArrowButton>
        </span>
        <span className="hidden lg:block">
          <ArrowButton
            href="/projects"
            variant="camel"
            ariaLabel="View our work"
            className="hero-rise-item mt-8"
            style={{ animationDelay: "0.85s" }}
          >
            View our work
          </ArrowButton>
        </span>
      </motion.div>

      {/* Scroll cue (decorative) — gentle continuous travel down the line */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="hero-rise-item absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        // animationDelay drives the initial rise-in; the line pulse is below
      >
        <span className="uppercase text-[17px] tracking-[1px] text-bone/80">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-bone/30">
          {/* travelling fill that loops down the line */}
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-bone"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={
              reduce
                ? undefined
                : { duration: 1.8, ease: "easeInOut", repeat: Infinity }
            }
          />
        </span>
      </motion.div>
    </section>
  );
}
