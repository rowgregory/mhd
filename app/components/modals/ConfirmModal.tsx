"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEscapeToClose } from "@/app/lib/hooks/useEscapeToClose";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  dangerous?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  dangerous = false,
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const reduce = useReducedMotion();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the cancel button on open (safe default for a destructive action).
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => cancelRef.current?.focus());
    }
  }, [open]);

  useEscapeToClose(open, onCancel);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Scrim */}
          <motion.div
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.2 }}
            className="absolute inset-0 bg-black/50"
          />

          {/* Dialog */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            initial={{
              opacity: 0,
              scale: reduce ? 1 : 0.95,
              y: reduce ? 0 : 8,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.95, y: reduce ? 0 : 8 }}
            transition={{
              duration: reduce ? 0.01 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-sm border border-admin-line bg-admin-surface p-6"
          >
            <div className="flex items-start gap-3">
              {dangerous && (
                <AlertTriangle
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-danger"
                />
              )}
              <div className="min-w-0">
                <h2
                  id="confirm-title"
                  className="font-sans text-sm font-medium text-admin-fg"
                >
                  {title}
                </h2>
                <p
                  id="confirm-message"
                  className="mt-1.5 font-sans text-sm text-admin-fg-muted"
                >
                  {message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                ref={cancelRef}
                type="button"
                onClick={onCancel}
                disabled={pending}
                className="border border-admin-line px-4 py-2 font-sans text-sm text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={pending}
                className={`px-4 py-2 font-sans text-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60 ${
                  dangerous
                    ? "bg-danger text-white"
                    : "bg-admin-fg text-admin-bg"
                }`}
              >
                {pending ? "…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
