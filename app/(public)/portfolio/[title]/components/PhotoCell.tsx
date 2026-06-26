"use client";

import { useCallback, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Picture from "../../../../components/ui/Picture";
import { GridPhoto } from "@/types/project.types";

export function PhotoCell({
  photo,
  index,
  onOpen,
  lightbox,
  reduce,
  label,
  variants,
}: {
  photo: GridPhoto;
  index: number;
  onOpen: (p: GridPhoto) => void;
  lightbox: boolean;
  reduce: boolean;
  label?: string;
  variants: Variants;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const floatRef = useRef<HTMLSpanElement>(null);
  const visible = useRef(false);

  // Cursor-following label — position written directly to the DOM on mousemove
  // (no re-renders). `translate` follows instantly; `clip-path` wipes it in.
  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
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
    <motion.button
      ref={btnRef}
      variants={variants}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      onClick={() => onOpen(photo)}
      disabled={!lightbox}
      aria-label={`View photo: ${photo.alt ?? `project ${index + 1}`}`}
      className="group relative h-full w-full cursor-none overflow-hidden disabled:cursor-default max-sm:cursor-pointer"
    >
      <Picture
        fill
        src={photo.url}
        alt={photo.alt ?? ""}
        sizes="(min-width: 1024px) 100vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-disabled:transform-none"
        priority
      />

      {/* Floating label — follows the cursor, wipes in via clip-path.
          Hidden on touch (no cursor); the grid is still tappable to open. */}
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
        {(photo.alt || label) && (
          <span className="block font-display text-base uppercase leading-tight tracking-[0.04em] text-ink dark:text-bone">
            {photo.alt ?? label}
          </span>
        )}
        <span className="mt-2 inline-flex items-center border border-line/30 px-3 py-1 font-sans text-xs uppercase tracking-[0.14em] text-fg-muted">
          {label ?? "Our projects"}
        </span>
      </span>
    </motion.button>
  );
}
