"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Picture from "../../../components/ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import ArrowButton from "../../../components/ui/ArrowButton";
import { PROJECT_TYPES } from "@/app/lib/constants/home.constants";

export default function Collections() {
  const { container, rise } = useMotionPresets();

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
            What we build
          </motion.p>
          <motion.h2
            id="collections-heading"
            variants={rise}
            className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-fg"
          >
            Custom work for every room
          </motion.h2>
          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-prose font-sans text-base leading-relaxed text-fg-muted"
          >
            Cabinets aren&rsquo;t just for the kitchen. There&rsquo;s no catalog
            to pick from — every job starts from scratch — but here&rsquo;s the
            kind of work we take on, all built to your space, your wood, your
            finish.
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
          {PROJECT_TYPES.map((collection) => (
            <CollectionCard
              key={collection.name}
              collection={collection}
              variants={rise}
            />
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
          <p className="font-sans text-base text-fg-muted mb-4">
            Have something entirely your own in mind?
          </p>

          <ArrowButton href="/contact" variant="camel">
            Start a custom project
          </ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}

type Collection = {
  img: string;
  alt: string;
  name: string;
  style: string;
  href: string;
};

function CollectionCard({
  collection: { img, alt, name, style, href },
  variants,
}: {
  collection: Collection;
  variants: Variants;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.li variants={variants}>
      <Link
        href={href}
        className="group block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <article className="flex h-full flex-col">
          {/* Image (parallax) */}
          <div
            ref={ref}
            className="relative aspect-4/5 w-full overflow-hidden border border-line/10"
          >
            <motion.div
              style={reduce ? undefined : { y: imageY }}
              className="absolute inset-x-0 top-[-12%] h-[124%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
            >
              <Picture
                src={img}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 75vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Caption row — name + style on the left, arrow on the right */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl uppercase tracking-[0.08em] text-fg transition-colors duration-300 group-hover:text-accent">
                {name}
              </h3>
              <p className="mt-1 font-sans text-sm text-fg-muted">{style}</p>
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
  );
}
