"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Picture from "./ui/Picture";
import ArrowButton from "./ui/ArrowButton";

export default function AboutFooterBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track scroll progress of this section through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Move the (oversized) image vertically as the section scrolls past.
  // The image is 130% tall, so it can travel ±15% without exposing edges.
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative h-145 w-full overflow-hidden">
      {/* Parallax image layer — taller than the container so it can move.
          Disabled (static) for reduced-motion users. */}
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 top-[-15%] h-[130%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
      >
        <Picture
          src="/images/about-footer-1.jpg"
          fill
          className="object-cover"
          alt=""
        />
      </motion.div>

      {/* Dark overlay so text reads on any part of the photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-label text-bone/70">
          Built to last a lifetime
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-[1.05] tracking-[0.02em] text-bone">
          Handcrafted cabinetry, made to fit the way you live
        </h2>
        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-bone/80">
          From the first sketch to the final install, every piece is built by
          hand in our North Shore workshop — no shortcuts, no cookie-cutter
          kits.
        </p>
        <div className="mt-8">
          <ArrowButton href="/contact" variant="camel" size="md">
            Start your project
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
