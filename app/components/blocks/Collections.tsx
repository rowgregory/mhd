"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Picture from "../ui/Picture";

type Collection = {
  img: string;
  alt: string;
  name: string;
  style: string;
  href: string;
};

const COLLECTIONS: Collection[] = [
  {
    img: "/images/collection-1.jpg",
    alt: "Shaker-style kitchen cabinetry in painted maple",
    name: "The Marblehead",
    style: "Shaker · painted maple",
    href: "/contact?collection=marblehead",
  },
  {
    img: "/images/collection-2.jpg",
    alt: "Flat-panel walnut cabinetry with integrated pulls",
    name: "The Atlantic",
    style: "Flat panel · walnut",
    href: "/contact?collection=atlantic",
  },
  {
    img: "/images/collection-3.jpg",
    alt: "Beaded inset white oak cabinetry, traditional detailing",
    name: "The Heritage",
    style: "Beaded inset · white oak",
    href: "/contact?collection=heritage",
  },
];

export default function Collections() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
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
      aria-labelledby="collections-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={rise}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-fg-subtle"
          >
            Where to start
          </motion.p>
          <motion.h2
            id="collections-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-fg"
          >
            Signature collections
          </motion.h2>
          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-prose font-sans text-base leading-relaxed text-fg-muted"
          >
            Not sure where to begin? Start from one of our refined cabinet lines
            — every piece is still built to your space, your wood, your finish.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {COLLECTIONS.map(({ img, alt, name, style, href }) => (
            <motion.li key={name} variants={rise}>
              <Link
                href={href}
                className="group block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <article className="flex h-full flex-col">
                  {/* Image */}
                  <div className="relative aspect-4/5 w-full overflow-hidden border border-line/10">
                    <Picture
                      src={img}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Caption row — name + style on the left, arrow on the right */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-[0.08em] text-fg transition-colors duration-300 group-hover:text-accent">
                        {name}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-fg-muted">
                        {style}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex shrink-0 text-fg-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    >
                      <ArrowUpRight size={22} strokeWidth={1.5} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={rise}
          className="mt-12 text-center sm:mt-16"
        >
          <p className="font-sans text-base text-fg-muted">
            Have something entirely your own in mind?
          </p>
          <Link
            href="/contact"
            className="group mt-5 inline-flex items-center gap-3 bg-taupe-raw px-8 py-3.5 font-display text-lg uppercase tracking-[0.06em] text-bone transition-colors hover:bg-bone hover:text-espresso-raw focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start a custom project
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
