"use client";

import { motion } from "framer-motion";
import Picture from "../ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { ITEMS } from "@/app/lib/constants/home.constants";
import ArrowButton from "../ui/ArrowButton";

export default function Feature() {
  const { container, fromLeft, rise } = useMotionPresets();

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
            variants={rise}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-fg-subtle"
          >
            What we do
          </motion.p>

          <motion.h2
            id="feature-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-fg"
          >
            Craftsmanship in every joint
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 max-w-prose font-sans text-base leading-relaxed text-fg-muted"
          >
            From the first measurement to the final reveal, every cabinet is
            designed, built, and installed in-house — no outsourcing, no
            shortcuts, just work that holds up for decades.
          </motion.p>

          <motion.ol variants={container} className="mt-10 space-y-0">
            {ITEMS.map(({ n, label }) => (
              <motion.li
                key={n}
                variants={rise}
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

          <motion.div variants={rise} className="mt-10">
            <ArrowButton href="/services" variant="camel">
              Our services
            </ArrowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
