"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import Picture from "@/app/components/ui/Picture";
import { useEscapeToClose } from "@/app/lib/hooks/useEscapeToClose";

type VideoBannerProps = {
  src?: string;
  alt?: string;
  /** YouTube/Vimeo embed URL, or an .mp4 URL. Swap in a real one later. */
  videoUrl?: string;
  /** Optional small label over the image. */
  eyebrow?: string;
  height?: "sm" | "md" | "lg";
};

const HEIGHTS: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[320px] sm:h-[400px]",
  md: "h-[420px] sm:h-[560px]",
  lg: "h-[520px] sm:h-[680px]",
};

// Generic placeholder video (Big Buck Bunny). Replace with MHD footage later.
const PLACEHOLDER =
  "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0";

export default function VideoBanner({
  src = "/images/video-banner.jpg",
  alt = "",
  videoUrl = PLACEHOLDER,
  eyebrow,
  height = "md",
}: VideoBannerProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEscapeToClose(open, () => setOpen(false));

  return (
    <section className={`relative w-full overflow-hidden ${HEIGHTS[height]}`}>
      {/* Full-bleed image */}
      <Picture
        fill
        src={src}
        alt={alt}
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle darkening so the play button reads on any photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />

      {/* Optional eyebrow */}
      {eyebrow && (
        <p className="absolute left-1/2 top-8 -translate-x-1/2 font-mono text-[10px] uppercase tracking-label text-bone/80">
          {eyebrow}
        </p>
      )}

      {/* Play button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play video"
        className="group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-bone text-ink transition-colors duration-300 hover:bg-accent hover:text-accent-fg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-bone sm:h-24 sm:w-24"
      >
        {/* pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping bg-bone/40 [animation-duration:2.5s] group-hover:bg-accent/40"
        />
        <Play
          size={28}
          strokeWidth={1.5}
          aria-hidden="true"
          className="relative ml-1 fill-current"
        />
      </button>

      {/* Video modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center text-bone/70 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
              transition={{
                duration: reduce ? 0.01 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-4xl bg-ink"
            >
              <iframe
                src={videoUrl}
                title="MHD Custom video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
