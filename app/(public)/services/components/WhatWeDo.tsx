"use client";

import Picture from "@/app/components/ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { motion } from "framer-motion";

type WhatWeDoProps = {
  src?: string;
  alt?: string;
};

const POINTS = [
  {
    title: "Built around you",
    detail:
      "We start with how you actually use the space, then design around it. No guessing.",
  },
  {
    title: "Made to outlive trends",
    detail:
      "Real wood, solid joints, finishes that hold up. Stuff you won't have to replace.",
  },
  {
    title: "With you the whole way",
    detail:
      "Same hands from the first cut to hanging the last door. Nothing gets lost in translation.",
  },
];

export default function WhatWeDo({
  src = "/images/what-we-do.jpg",
  alt = "A finished MHD Custom interior",
}: WhatWeDoProps) {
  const { reveal, makeContainer, rise, fromLeft } = useMotionPresets();

  return (
    <section
      aria-labelledby="whatwedo-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <motion.div
          variants={fromLeft}
          {...reveal}
          className="relative aspect-4/5 w-full overflow-hidden sm:aspect-square lg:aspect-4/5"
        >
          <Picture
            fill
            src={src}
            alt={alt}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div variants={makeContainer(0.1, 0.05)} {...reveal}>
          <motion.p
            variants={rise}
            className="font-mono text-[10px] uppercase tracking-label text-accent"
          >
            What we do
          </motion.p>

          <motion.h2
            id="whatwedo-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[1.05] tracking-[0.02em] text-fg"
          >
            We build the rooms you <span className="text-accent">live in</span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-fg-muted"
          >
            Every commission is drawn, milled, and fitted to one home — yours.
            No catalogs, no kits, no two jobs alike.
          </motion.p>

          {/* Points — custom square markers, not default bullets */}
          <motion.ul
            variants={makeContainer(0.08, 0.2)}
            className="mt-8 space-y-5"
          >
            {POINTS.map(({ title, detail }) => (
              <motion.li key={title} variants={rise} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-accent"
                />
                <span>
                  <span className="block font-display text-base uppercase tracking-[0.08em] text-fg">
                    {title}
                  </span>
                  <span className="mt-1 block font-sans text-sm leading-relaxed text-fg-muted">
                    {detail}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
