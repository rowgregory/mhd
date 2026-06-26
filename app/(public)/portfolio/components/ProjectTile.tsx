"use client";

import { useCallback, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Picture from "../../../components/ui/Picture";
import type { PortfolioProject } from "@/types/project.types";

export function ProjectTile({
  project,
  heightClass,
  variants,
  reduce,
}: {
  project: PortfolioProject;
  heightClass: string;
  variants: Variants;
  reduce: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLSpanElement>(null);
  const visible = useRef(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = linkRef.current;
    const float = floatRef.current;
    if (!el || !float) return;
    const r = el.getBoundingClientRect();
    float.style.translate = `${e.clientX - r.left}px ${e.clientY - r.top}px`;
    if (!visible.current) {
      float.style.opacity = "1";
      float.style.clipPath = "inset(0 0 0 0)";
      visible.current = true;
    }
  }, []);

  const onLeave = useCallback(() => {
    const float = floatRef.current;
    if (float) {
      float.style.opacity = "0";
      float.style.clipPath = "inset(0 100% 0 0)";
    }
    visible.current = false;
  }, []);

  return (
    <motion.div variants={variants} className="h-full w-full">
      <Link
        ref={linkRef}
        href={`/portfolio/${project.title}`}
        onMouseMove={reduce ? undefined : onMove}
        onMouseLeave={reduce ? undefined : onLeave}
        aria-label={`View project: ${project.title}`}
        className={`group relative block h-full w-full overflow-hidden ${heightClass} max-sm:cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        <Picture
          fill
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Subtle gradient so the static mobile label reads */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/70 to-transparent sm:hidden"
        />

        {/* Mobile/touch: static label at the bottom (no cursor to follow) */}
        <span className="pointer-events-none absolute bottom-0 left-0 p-4 sm:hidden">
          <span className="block font-display text-base uppercase leading-tight tracking-[0.04em] text-bone">
            {project.title}
          </span>
          {project.location && (
            <span className="mt-0.5 block font-sans text-xs text-bone/70">
              {project.location}
            </span>
          )}
        </span>

        {/* Desktop: cursor-following floating label with wipe reveal */}
        <span
          ref={floatRef}
          aria-hidden="true"
          style={{
            opacity: 0,
            translate: "0px 0px",
            clipPath: "inset(0 100% 0 0)",
            transition:
              "opacity 0.25s ease, clip-path 0.45s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            marginTop: "-3rem",
            marginLeft: "0.75rem",
            willChange: "translate",
          }}
          className="z-10 hidden w-max max-w-[80%] bg-bone px-4 py-3 text-left dark:bg-ink sm:block"
        >
          <span className="block font-display text-base uppercase leading-tight tracking-[0.04em] text-ink dark:text-bone">
            {project.title}
          </span>
          <span className="mt-2 inline-flex items-center border border-line/30 px-3 py-1 font-sans text-xs uppercase tracking-[0.14em] text-fg-muted">
            {project.location ?? "View project"}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
