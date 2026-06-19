"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Picture from "../ui/Picture";

const ITEMS = [
  { n: "01", label: "Design consultation" },
  { n: "02", label: "Shop fabrication" },
  { n: "03", label: "On-site installation" },
];

export default function Feature() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const fromLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -32 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const fromRight: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      aria-labelledby="feature-heading"
      className="bg-surface px-4 py-14 sm:px-6 sm:py-30 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-40">
        {/* Left: image with overlapping caption block */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fromLeft}
          className="relative"
        >
          {/* Image + caption share one relative box sized to the image, so the
              caption anchors to the IMAGE's corner (not the column). The image
              wrapper clips its own overflow; the caption is a sibling outside
              that clip so it can sit on top, flush to the bottom-right corner. */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden sm:aspect-video lg:aspect-4/5">
              <Picture
                src="/images/about-feature.jpg"
                alt="Stacked hardwood ready for milling in the MHD Custom shop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Caption — flush to the image's bottom-right corner, overlapping
                inward onto the photo. Mobile: pulls up onto the image edge. */}
            <div className="relative lg:-mt-12 ml-auto w-full lg:w-[86%] bg-taupe-raw px-6 py-7 lg:absolute lg:bottom-0 lg:-right-20 lg:px-12.5 lg:py-12.5">
              <p className="font-display text-[clamp(1.25rem,4vw,2.25rem)] uppercase leading-[1.1] tracking-[0.02em] text-bone">
                We build the pieces a room is remembered for
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="lg:pt-6"
        >
          <motion.p
            variants={fromRight}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-fg-subtle"
          >
            What we do
          </motion.p>

          <motion.h2
            id="feature-heading"
            variants={fromRight}
            className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-fg"
          >
            Craftsmanship in every joint
          </motion.h2>

          <motion.p
            variants={fromRight}
            className="mt-6 max-w-prose font-sans text-base leading-relaxed text-fg-muted"
          >
            From the first measurement to the final reveal, every cabinet is
            designed, built, and installed in-house — no outsourcing, no
            shortcuts, just work that holds up for decades.
          </motion.p>

          {/* Numbered process list */}
          <motion.ol variants={container} className="mt-10 space-y-0">
            {ITEMS.map(({ n, label }) => (
              <motion.li
                key={n}
                variants={fromRight}
                className="flex items-baseline gap-5 border-b border-line/15 py-5"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-lg tracking-[0.06em] text-accent"
                >
                  {n}.
                </span>
                <span className="font-display text-lg uppercase tracking-[0.08em] text-fg">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div variants={fromRight} className="mt-10">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 bg-camel-light px-6 py-3.5 font-display text-lg uppercase tracking-[0.06em] text-bone transition-colors hover:bg-bone hover:text-espresso-raw focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-8"
            >
              Our services
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
