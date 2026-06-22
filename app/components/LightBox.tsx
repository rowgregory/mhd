"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GridPhoto } from "@/types/project.types";
import { useEscapeToClose } from "../lib/hooks/useEscapeToClose";

export function Lightbox({
  photo,
  onClose,
  reduce,
}: {
  photo: GridPhoto | null;
  onClose: () => void;
  reduce: boolean;
}) {
  useEscapeToClose(!!photo, onClose);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center text-bone/70 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>

          {/* Image — stop propagation so clicking the image doesn't close */}
          <motion.div
            initial={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
            transition={{
              duration: reduce ? 0.01 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl flex items-center justify-center"
            style={{ aspectRatio: "16 / 10" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt ?? ""}
              className="max-h-[90vh] object-contain"
            />
          </motion.div>

          {photo.alt && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-xs text-bone/50">
              {photo.alt}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
