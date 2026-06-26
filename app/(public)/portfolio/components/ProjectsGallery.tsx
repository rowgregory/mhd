"use client";

import { motion } from "framer-motion";
import { useMotionPresets } from "../../../lib/hooks/useMotionPresets";
import { ProjectsGalleryProps } from "@/types/project.types";
import { ProjectTile } from "./ProjectTile";

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const { reveal, makeContainer, reduce, tileVariants } = useMotionPresets();

  if (projects.length === 0) {
    return (
      <p className="py-20 text-center font-sans text-sm text-fg-muted">
        Projects are on their way — check back soon.
      </p>
    );
  }

  // First 5 form the hero + 2×2 feature block; anything beyond flows into
  // gap-free rows below.
  const feature = projects.slice(0, 5);
  const rest = projects.slice(5);
  const [hero, ...featureCells] = feature;

  return (
    <motion.div
      variants={makeContainer(0.06, 0.05)}
      {...reveal}
      aria-label="Projects gallery"
      role="region"
    >
      {/* ── Feature block: hero left (full height) + 2×2 right ─────────────
          Flush (no gaps). Single column on mobile with fixed heights so the
          fill images don't collapse. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[repeat(2,1fr)] sm:h-136 lg:h-240">
        {/* hero — spans both rows on sm+ */}
        <div className="h-64 sm:h-auto sm:row-span-2">
          <ProjectTile
            project={hero}
            heightClass="h-full"
            variants={tileVariants(0)}
            reduce={!!reduce}
          />
        </div>

        {/* 2×2 of the next up-to-4, flush */}
        {featureCells.length > 0 && (
          <div className="grid grid-cols-2 sm:row-span-2 sm:h-full sm:grid-rows-[repeat(2,1fr)]">
            {featureCells.map((project, i) => (
              <div key={project.id} className="h-40 sm:h-auto">
                <ProjectTile
                  project={project}
                  heightClass="h-full"
                  variants={tileVariants(i + 1)}
                  reduce={!!reduce}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Overflow rows: remaining projects in flush rows of equal cells ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 auto-rows-[1fr] lg:grid-cols-3">
          {rest.map((project, i) => (
            <div key={project.id} className="h-40 sm:h-56 lg:h-64">
              <ProjectTile
                project={project}
                heightClass="h-full"
                variants={tileVariants(i + 5)}
                reduce={!!reduce}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
