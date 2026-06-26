"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMotionPresets } from "../../../../lib/hooks/useMotionPresets";
import { GridPhoto, PhotoGridProps } from "@/types/project.types";
import { PhotoCell } from "./PhotoCell";
import { Lightbox } from "./LightBox";

export default function PhotoGrid({ photos, lightbox = true }: PhotoGridProps) {
  const { reveal, makeContainer } = useMotionPresets();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<GridPhoto | null>(null);

  if (photos.length === 0) return null;

  const open = (p: GridPhoto) => lightbox && setActive(p);
  const close = () => setActive(null);

  const shown = photos.slice(0, 5);
  const count = shown.length;

  const cellVariants = (i: number): Variants => ({
    hidden: { opacity: 0, scale: reduce ? 1 : 1.02 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: i === 0 ? 0.7 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.05 * i,
      },
    },
  });

  const cell = (photo: GridPhoto, i: number) => (
    <PhotoCell
      key={photo.url}
      label={photo.alt}
      photo={photo}
      index={i}
      onOpen={open}
      lightbox={lightbox}
      reduce={!!reduce}
      variants={cellVariants(i)}
    />
  );

  return (
    <>
      <motion.div
        variants={makeContainer(0.08, 0.05)}
        {...reveal}
        className={layoutClass(count)}
        aria-label="Project photo gallery"
        role="region"
      >
        {count === 1 && cell(shown[0], 0)}

        {count === 2 &&
          shown.map((p, i) => (
            <div key={p.url} className="h-56 sm:h-auto">
              {cell(p, i)}
            </div>
          ))}

        {count === 3 && (
          <>
            <div className="h-64 sm:h-auto sm:row-span-2">
              {cell(shown[0], 0)}
            </div>
            <div className="h-48 sm:h-auto">{cell(shown[1], 1)}</div>
            <div className="h-48 sm:h-auto">{cell(shown[2], 2)}</div>
          </>
        )}

        {count === 4 &&
          shown.map((p, i) => (
            <div key={p.url} className="min-h-0">
              {cell(p, i)}
            </div>
          ))}

        {count === 5 && (
          <>
            <div className="h-64 sm:h-auto sm:row-span-2">
              {cell(shown[0], 0)}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:row-span-2">
              {shown.slice(1).map((p, i) => (
                <div key={p.url} className="h-32 sm:h-auto">
                  {cell(p, i + 1)}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {lightbox && (
        <Lightbox photo={active} onClose={close} reduce={!!reduce} />
      )}
    </>
  );
}

/**
 * Layout adapts to how many photos exist so there are never empty filler cells.
 * Mobile-first: simpler stacks on small screens, the richer split on sm+.
 */
function layoutClass(count: number): string {
  const base = "grid gap-2";
  switch (count) {
    case 1:
      return `${base} h-64 sm:h-96 lg:h-[32rem]`;
    case 2:
      return `${base} h-64 grid-cols-1 sm:h-96 sm:grid-cols-2 lg:h-[28rem]`;
    case 3:
      return `${base} grid-cols-1 sm:auto-rows-fr sm:grid-cols-2 sm:[grid-template-rows:repeat(2,1fr)] sm:h-[32rem] lg:h-[40rem]`;
    case 4:
      return `${base} grid-cols-2 [grid-auto-rows:1fr] h-80 sm:h-[28rem] lg:h-[36rem]`;
    default:
      return `${base} grid-cols-1 sm:grid-cols-2 sm:[grid-template-rows:repeat(2,1fr)] h-auto sm:h-[34rem] lg:h-[44rem]`;
  }
}
