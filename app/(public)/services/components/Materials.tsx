"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import Picture from "@/app/components/ui/Picture";

type Material = {
  img: string;
  alt: string;
  title: string;
  subtitle: string;
  href?: string;
};

const MATERIALS: Material[] = [
  {
    img: "/images/material-hardwood.jpg",
    alt: "Stacked hardwood boards, kiln-dried",
    title: "Solid Hardwoods",
    subtitle: "Oak, walnut, maple, cherry",
  },
  {
    img: "/images/material-ply.jpg",
    alt: "Furniture-grade plywood panels",
    title: "Furniture-Grade Ply",
    subtitle: "Stable cores, clean veneers",
  },
  {
    img: "/images/material-finishes.jpg",
    alt: "Hand-applied wood finishes and stains",
    title: "Lasting Finishes",
    subtitle: "Hand-applied, built to wear in",
  },
];

export default function Materials({
  materials = MATERIALS,
}: {
  materials?: Material[];
}) {
  const { container, rise } = useMotionPresets();

  return (
    <section
      aria-labelledby="materials-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
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
            Our materials
          </motion.p>
          <motion.h2
            id="materials-heading"
            variants={rise}
            className="mt-5 font-display text-[clamp(1.75rem,5.5vw,3.25rem)] uppercase leading-[1.05] tracking-[0.01em] text-fg"
          >
            We build with premium{" "}
            <span className="text-accent">materials only</span>
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {materials.map(({ img, alt, title, subtitle, href }) => {
            const Card = (
              <>
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Picture
                    fill
                    src={img}
                    alt={alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-lg uppercase tracking-[0.08em] text-fg">
                    {title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-fg-muted">
                    {subtitle}
                  </p>
                </div>
              </>
            );

            return (
              <motion.li key={title} variants={rise}>
                {href ? (
                  <Link
                    href={href}
                    className="group block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {Card}
                  </Link>
                ) : (
                  <div className="group">{Card}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
