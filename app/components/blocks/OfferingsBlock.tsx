"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Picture from "../ui/Picture";

type Offering = {
  img: string;
  alt: string;
  title: string;
  blurb: string;
  href: string;
};

const OFFERINGS: Offering[] = [
  {
    img: "/images/work-1.jpg",
    alt: "Custom hardwood kitchen cabinetry installed in a bright home",
    title: "Kitchens & Cabinetry",
    blurb: "Full custom kitchens, islands, and storage built to your space.",
    href: "/services/kitchens",
  },
  {
    img: "/images/work-2.jpg",
    alt: "A craftsman fitting a built-in shelving unit",
    title: "Built-Ins & Millwork",
    blurb: "Shelving, wall units, and trim that look original to the room.",
    href: "/services/built-ins",
  },
  {
    img: "/images/work-3.jpg",
    alt: "Stacked finished hardwood panels in the workshop",
    title: "Commercial Casework",
    blurb: "Durable, precise cabinetry for offices, retail, and hospitality.",
    href: "/services/commercial",
  },
];

export default function Offerings() {
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
      aria-labelledby="offerings-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Centered heading + attribution */}
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
            className="mt-5 font-display text-[clamp(1.75rem,5.5vw,3.25rem)] uppercase leading-[1.02] tracking-[0.01em] text-fg"
          >
            Fine cabinetry and woodwork, delivered with excellence, precision
            and <span className="text-accent">care</span>
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

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OFFERINGS.map(({ img, alt, title, blurb, href }) => (
            <motion.li key={title} variants={rise}>
              <article className="group flex h-full flex-col border border-line/10 bg-surface-alt">
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Picture
                    src={img}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col items-center px-6 py-8 text-center">
                  <h3 className="font-display text-xl uppercase tracking-[0.08em] text-fg">
                    {title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
                    {blurb}
                  </p>

                  {/* Read more — label reveals to the left of the arrow box on
                      card hover (matches reference). Collapsed by default. */}
                  <Link
                    href={href}
                    aria-label={`Learn more about ${title}`}
                    className="group/btn mt-6 inline-flex items-center text-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span
                      aria-hidden="true"
                      className="max-w-0 -translate-x-2 overflow-hidden whitespace-nowrap pr-0 font-display text-sm uppercase tracking-[0.16em] opacity-0 transition-all duration-400 ease-out group-hover:max-w-28 group-hover:translate-x-0 group-hover:pr-3 group-hover:opacity-100 group-focus-within:max-w-28 group-focus-within:translate-x-0 group-focus-within:pr-3 group-focus-within:opacity-100"
                    >
                      Read&nbsp;more
                    </span>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line/25 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                      <ArrowRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        {/* About CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={rise}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 bg-taupe-raw px-8 py-3.5 font-display text-lg uppercase tracking-[0.06em] text-bone transition-colors hover:bg-bone hover:text-espresso-raw focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            About us
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
