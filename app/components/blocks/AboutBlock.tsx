"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Trees,
  Hammer,
  Ruler,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

const SERVICES: Service[] = [
  {
    icon: Ruler,
    title: "Design & Measure",
    blurb: "On-site templating to the millimeter.",
  },
  {
    icon: Trees,
    title: "Material Selection",
    blurb: "Hand-picked hardwoods and veneers.",
  },
  {
    icon: Hammer,
    title: "Custom Build",
    blurb: "Joinery cut and finished in-shop.",
  },
  {
    icon: PackageCheck,
    title: "Install & Finish",
    blurb: "Fitted, leveled, and signed off.",
  },
];

export default function About() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-camel-light px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Wood-grain texture — pure CSS, no image. Two layers of low-contrast
          repeating gradients (fine grain + occasional darker "ring" lines)
          over the camel band. Decorative, so aria-hidden. Flips with the
          token in dark mode automatically since it sits on bg-camel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 2px, rgba(28,26,23,0.6) 2px 3px, transparent 3px 7px), repeating-linear-gradient(90deg, transparent 0 23px, rgba(28,26,23,0.9) 23px 24px, transparent 24px 60px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow + heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={rise}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-espresso-raw"
          >
            About us
          </motion.p>
          <motion.h2
            id="about-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,7vw,3.75rem)] uppercase leading-[0.95] tracking-[0.01em] text-bone"
          >
            Cabinetry made by hand, to measure
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {SERVICES.map(({ icon: Icon, title, blurb }) => (
            <motion.li key={title} variants={rise}>
              <article className="group relative isolate flex h-full flex-col items-center overflow-hidden bg-surface px-6 py-10 text-center">
                {/* Brass fill — wipes up from the bottom on hover, like a finish
                    being drawn across the panel face. Sits behind the content. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />
                {/* Icon — walnut, inverts to ink as the brass crosses it */}
                <span
                  aria-hidden="true"
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center text-brand transition-colors duration-300 group-hover:text-ink"
                >
                  <Icon size={44} strokeWidth={1.25} />
                </span>
                <h3 className="font-display text-xl uppercase tracking-[0.08em] text-fg transition-colors duration-300 group-hover:text-ink">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-sm text-fg-muted transition-colors duration-300 group-hover:text-ink/80">
                  {blurb}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
