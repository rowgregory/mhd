"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/types/project.types";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import Picture from "../ui/Picture";

export default function RecentProjects({
  projects,
  description,
}: {
  projects: PortfolioProject[];
  description?: string;
}) {
  const { reveal, makeContainer, rise } = useMotionPresets();
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Update arrow disabled state based on scroll position.
  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateEdges();
  }, [updateEdges, projects.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // scroll by ~one card width (first child's width + gap)
    const first = el.firstElementChild as HTMLElement | null;
    const amount = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <section className="bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <motion.div
          variants={makeContainer(0.1, 0.05)}
          {...reveal}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
        >
          <motion.div variants={rise}>
            <p className="font-mono text-[10px] uppercase tracking-label text-accent">
              Our portfolio
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-none tracking-[0.02em] text-bone">
              Recent projects
            </h2>
          </motion.div>

          {description && (
            <motion.p
              variants={rise}
              className="max-w-xl font-sans text-sm leading-relaxed text-bone/60 lg:px-4"
            >
              {description}
            </motion.p>
          )}

          {/* Arrows */}
          <motion.div variants={rise} className="flex items-center gap-2">
            <ArrowBtn
              dir="prev"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
            />
            <ArrowBtn
              dir="next"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
            />
          </motion.div>
        </motion.div>

        {/* Scroll-snap track */}
        <motion.ul
          ref={trackRef}
          onScroll={updateEdges}
          variants={makeContainer(0.08, 0.1)}
          {...reveal}
          aria-label="Recent projects carousel"
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <motion.li
              key={project.id}
              variants={{
                hidden: { opacity: 0, x: 24 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="w-[85vw] shrink-0 snap-start sm:w-[60vw] lg:w-[calc(50%-0.5rem)]"
            >
              <Link
                href={`/portfolio/${project.title}`}
                aria-label={`View project: ${project.title}`}
                className="group relative block aspect-4/3 w-full overflow-hidden focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Picture
                  fill
                  src={project.cover}
                  alt={project.coverAlt ?? project.title}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 60vw, 85vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Gradient + label */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/80 to-transparent"
                />
                <span className="pointer-events-none absolute bottom-0 left-0 p-5">
                  <span className="block font-display text-lg uppercase leading-tight tracking-[0.04em] text-bone sm:text-xl">
                    {project.title}
                  </span>
                  {project.location && (
                    <span className="mt-1 block font-sans text-xs text-bone/70">
                      {project.location}
                    </span>
                  )}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ArrowBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous projects" : "Next projects"}
      className="inline-flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-bone/25 disabled:hover:bg-transparent disabled:hover:text-bone"
    >
      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
