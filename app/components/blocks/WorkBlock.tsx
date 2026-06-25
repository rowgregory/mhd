"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Picture from "../ui/Picture";
import { PROJECTS } from "@/app/lib/constants/home.constants";

export default function Work() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 520) * dir;
    el.scrollBy({ left: amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="work-heading" className="bg-ink py-16 sm:py-24">
      {/* Header row — padded; the track below bleeds to the edge */}
      <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6 px-4 sm:mb-14 sm:px-6 lg:px-8">
        <div>
          <p className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-brass">
            Selected work
          </p>
          <h2
            id="work-heading"
            className="mt-4 font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase leading-[0.98] tracking-[0.01em] text-bone"
          >
            Recent projects
          </h2>
        </div>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous projects"
            className="inline-flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-brass hover:bg-brass hover:text-ink focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next projects"
            className="inline-flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-brass hover:bg-brass hover:text-ink focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scroll track — full-bleed, edge to edge. */}
      <motion.ul
        ref={trackRef}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        tabIndex={0}
        aria-label="Project gallery, scroll horizontally"
        className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden sm:gap-3"
        style={{ scrollPaddingLeft: 0 }}
      >
        {PROJECTS.map((project) => (
          <WorkCard key={project.title} project={project} reduce={!!reduce} />
        ))}
      </motion.ul>
    </section>
  );
}

type Project = {
  img: string;
  alt: string;
  title: string;
  meta: string;
};

function WorkCard({
  project: { img, alt, title, meta },
  reduce,
}: {
  project: Project;
  reduce: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // Vertical drift as the whole section passes through the page (not tied to
  // the horizontal carousel scroll — that stays as-is).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <li
      ref={ref}
      className="group relative w-[78vw] shrink-0 snap-start overflow-hidden first:snap-center sm:w-[48vw] md:w-[38vw] lg:w-[30vw]"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
        {/* Parallax image — oversized so it stays full as it drifts */}
        <motion.div
          style={reduce ? undefined : { y: imageY }}
          className="absolute inset-x-0 top-[-10%] h-[120%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
        >
          <Picture
            src={img}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, (min-width: 640px) 48vw, 78vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        {/* Bottom gradient so caption text always clears contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/80 to-transparent"
        />
        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-display text-xl uppercase tracking-[0.06em] text-bone sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 font-sans text-sm text-bone/75">{meta}</p>
        </div>
      </div>
    </li>
  );
}
