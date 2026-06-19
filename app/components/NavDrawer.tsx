"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  NAV,
  PHONE,
  PHONE_HREF,
  EMAIL,
} from "../lib/constants/common.constants";
import { useNavDrawer } from "../lib/stores/useNavDrawer";
import { useMotionPresets } from "../lib/hooks/useMotionPresets";
import { useFocusReturn } from "../lib/hooks/useFocusReturn";
import { useDrawerKeyboard } from "../lib/hooks/useDrawerKeyboard";
import { useLockBodyScroll } from "../lib/hooks/useLockBodyScoll";
import MhdLogo from "./MHDLogo";

export default function NavDrawer() {
  const open = useNavDrawer((s) => s.open);
  const closeDrawer = useNavDrawer((s) => s.closeDrawer);
  const { reduce, drawerPanel, drawerLink } = useMotionPresets();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open
  useLockBodyScroll(open);

  // Capture the trigger on open; move focus in. Restore focus on close.
  useFocusReturn(open, closeBtnRef);

  // Escape to close + focus trap
  useDrawerKeyboard(open, closeDrawer, panelRef);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60">
          {/* Scrim */}
          <motion.div
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.3 }}
            className="absolute inset-0 bg-ink/60"
          />

          {/* Panel — slides in from the right */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            variants={drawerPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-y-0 right-0 flex h-full w-[88vw] max-w-sm flex-col bg-surface px-6 py-6 shadow-xl sm:px-8"
          >
            {/* Top: logo + close */}
            <div className="flex items-start justify-between gap-4">
              <Link
                href="/"
                onClick={closeDrawer}
                aria-label="MHD Custom home"
                className="text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <MhdLogo className="h-9 w-auto sm:h-10" aria-hidden="true" />
              </Link>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="-mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Links — big stacked Bebas; brass wipes across the type on hover */}
            <nav aria-label="Drawer" className="mt-10">
              <ul className="space-y-1">
                {NAV.map((item) => (
                  <motion.li key={item.href} variants={drawerLink}>
                    <Link
                      href={item.href}
                      onClick={closeDrawer}
                      className="fill-link py-1.5 font-display text-[clamp(2rem,9vw,3.5rem)] uppercase leading-[1.05] tracking-[0.02em] text-fg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {item.label}
                      <span aria-hidden="true" className="fill-overlay">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Divider */}
            <motion.div
              variants={drawerLink}
              className="my-8 h-px w-full bg-line/15"
            />

            {/* Contact */}
            <motion.div variants={drawerLink} className="mt-auto">
              <a
                href={PHONE_HREF}
                className="block font-display text-2xl tracking-[0.06em] text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block font-sans text-sm text-fg-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {EMAIL}
              </a>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
