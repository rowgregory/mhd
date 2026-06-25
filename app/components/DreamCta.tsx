"use client";

import { motion } from "framer-motion";
import ArrowButton from "./ui/ArrowButton";
import { useMotionPresets } from "../lib/hooks/useMotionPresets";
import { WoodGrainTexture } from "./textures/WoodGrainTexture";

export default function DreamCta({
  title = "Bring your space to life with cabinetry built just for you!",
  buttonLabel = "Let's build it",
  href = "/contact",
}: {
  title?: string;
  buttonLabel?: string;
  href?: string;
}) {
  const { reveal, makeContainer, rise } = useMotionPresets();

  return (
    <section className="bg-camel dark:bg-camel-dark relative">
      <WoodGrainTexture />
      <motion.div
        variants={makeContainer(0.12, 0.05)}
        {...reveal}
        className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8"
      >
        <motion.h2
          variants={rise}
          className="max-w-3xl font-display text-[clamp(1.75rem,4.5vw,2.75rem)] uppercase leading-[1.1] tracking-[0.02em] text-bone"
        >
          {title}
        </motion.h2>

        <motion.div variants={rise} className="shrink-0">
          <ArrowButton href={href} variant="ink" size="md">
            {buttonLabel}
          </ArrowButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
