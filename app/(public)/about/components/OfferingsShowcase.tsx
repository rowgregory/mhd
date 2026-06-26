"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Picture from "../../../components/ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import { OFFERINGS } from "@/app/lib/constants/home.constants";

export default function OfferingsShowcase() {
  const { container, rise } = useMotionPresets();

  return (
    <section
      aria-labelledby="offerings-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={rise}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-fg-subtle"
          >
            What we offer
          </motion.p>

          <motion.h2
            id="offerings-heading"
            variants={rise}
            className="mt-5 font-display text-[clamp(1.75rem,5.5vw,3.25rem)] uppercase leading-[1.05] tracking-[0.01em] text-fg"
          >
            Custom cabinetry and fine woodwork, built to fit your{" "}
            <span className="text-accent">home</span>
          </motion.h2>

          <motion.div variants={rise} className="mt-7">
            <p className="font-display text-base uppercase tracking-[0.12em] text-fg">
              Jackson Rogers
            </p>
            <p className="mt-1 font-sans text-sm text-fg-muted">
              Founder, MHD Custom
            </p>
          </motion.div>
        </motion.div>

        {/* Category cards — tinted reveal on hover */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3"
        >
          {OFFERINGS.map(({ img, alt, title, subtitle, href }, i) => (
            <motion.li key={title} variants={rise}>
              <Link
                href={href}
                aria-label={`See ${title} projects`}
                className="group relative block aspect-3/4 w-full overflow-hidden focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Picture
                  src={img}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* Espresso tint wash — fades in on hover/focus */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 ease-out group-hover:bg-espresso/80 group-focus-visible:bg-espresso/80"
                />

                {/* Baseline gradient so the title reads at rest */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink/70 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Number — top-left, reveals on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 font-display text-lg text-bone/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {String(i + 1).padStart(2, "0")}.
                </span>

                {/* Title + subtitle — bottom-left */}
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-lg uppercase tracking-[0.08em] text-bone sm:text-xl">
                    {title}
                  </span>
                  {/* Subtitle reveals on hover */}
                  <span className="mt-1 block font-sans text-sm text-bone/70 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 max-h-0 group-hover:max-h-8 group-focus-visible:max-h-8 overflow-hidden">
                    {subtitle ?? "Custom build"}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
