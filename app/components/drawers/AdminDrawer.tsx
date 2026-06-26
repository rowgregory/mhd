"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBodyScroll } from "../../lib/hooks/useLockBodyScoll";
import { useDrawerKeyboard } from "../../lib/hooks/useDrawerKeyboard";
import { useFocusReturn } from "../../lib/hooks/useFocusReturn";
import { AdminDrawerProps } from "@/types/admin.types";

export default function AdminDrawer({
  open,
  onClose,
  title,
  children,
}: AdminDrawerProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll while open.
  useLockBodyScroll(open);

  // Capture focus on open, move it into the panel, restore on close.
  useFocusReturn(open, initialFocusRef);

  // Escape to close + simple focus trap.
  useDrawerKeyboard(open, onClose, panelRef);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Scrim */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25 }}
            className="absolute inset-0 bg-black/40"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 280, damping: 32 }
            }
            className="absolute inset-y-0 right-0 flex h-full w-[92vw] max-w-md flex-col border-l border-admin-line bg-admin-surface"
          >
            <div className="flex items-center justify-between border-b border-admin-line px-5 py-4">
              <h2 className="font-sans text-sm font-medium text-admin-fg">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 inline-flex h-9 w-9 items-center justify-center text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
              >
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
