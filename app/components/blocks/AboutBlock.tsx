"use client";

import { SERVICES } from "@/app/lib/constants/home.constants";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { motion } from "framer-motion";
import { WoodGrainTexture } from "../textures/WoodGrainTexture";

export default function About() {
  const { container, rise } = useMotionPresets();

  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-camel px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <WoodGrainTexture />
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
              <article className="group relative isolate flex h-full flex-col items-center overflow-hidden border border-line/10 bg-surface px-6 py-10 text-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 dark:bg-accent"
                />
                {/* Icon: brass on the dark (light-mode) fill, ink on the brass (dark-mode) fill */}
                <span
                  aria-hidden="true"
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center text-brand transition-colors duration-300 group-hover:text-accent dark:group-hover:text-ink"
                >
                  <Icon size={44} strokeWidth={1.25} />
                </span>
                <h3 className="font-display text-xl uppercase tracking-[0.08em] text-fg transition-colors duration-300 group-hover:text-bone dark:group-hover:text-ink">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-sm text-fg-muted transition-colors duration-300 group-hover:text-bone/80 dark:group-hover:text-ink/80">
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
