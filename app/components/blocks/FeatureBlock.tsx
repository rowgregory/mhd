"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Picture from "../ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { ITEMS } from "@/app/lib/constants/home.constants";
import ArrowButton from "../ui/ArrowButton";

export default function Feature() {
  const { container, fromLeft, rise } = useMotionPresets();
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      aria-labelledby="feature-heading"
      className="bg-surface px-4 py-14 sm:px-6 sm:py-30 lg:px-8"
    >
      <div className="mx-auto grid max-w-330 items-center gap-10 lg:grid-cols-2 lg:gap-60">
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
          <div
            ref={imgRef}
            className="relative aspect-square w-full overflow-hidden sm:aspect-video lg:aspect-4/5 max-h-160"
          >
            <motion.div
              style={reduce ? undefined : { y: imageY }}
              className="absolute inset-x-0 top-[-10%] h-[120%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
            >
              <Picture
                src="/images/about-feature.jpeg"
                alt="Stacked hardwood ready for milling in the MHD Custom shop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
          {/* Caption — flush to the image's bottom-right corner, overlapping
                inward onto the photo. Mobile: pulls up onto the image edge. */}
          <div className="relative lg:-mt-12 ml-auto w-full lg:w-[60%] bg-taupe-raw px-6 py-7 lg:absolute lg:bottom-0 lg:-right-20 lg:px-12.5 lg:py-12.5">
            <p className="font-display text-[clamp(1.25rem,4vw,2.25rem)] uppercase leading-[1.1] tracking-[0.02em] text-bone">
              We build the pieces a room is remembered for
            </p>
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
            className="text-[clamp(1rem,0.9rem+0.5vw,1.1875rem)] uppercase text-brown-text tracking-[0.6px]"
          >
            What we do
          </motion.p>

          <motion.h2
            id="feature-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-brown-text"
          >
            Craftsmanship in every joint
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 max-w-prose font-sans text-[17px] leading-relaxed text-warm-gray"
          >
            From the first measurement to the final reveal, every cabinet is
            designed, built, and installed in-house.
          </motion.p>

          <motion.ol variants={container} className="mt-4 space-y-0">
            {ITEMS.map(({ n, label }) => (
              <motion.li
                key={n}
                variants={rise}
                className="flex items-baseline gap-5 border-b border-warm-gray/15 py-5 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-muted-gray"
                >
                  {n}.
                </span>
                <span className="font-display text-2xl uppercase tracking-[0.04em] text-espresso">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div variants={rise} className="mt-4">
            <ArrowButton href="/services" variant="camel">
              Our services
            </ArrowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
