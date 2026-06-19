"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV } from "../lib/constants/common.constants";
import { useScrollHeader } from "../lib/hooks/useScrollHeader";
import { useNavDrawer } from "../lib/stores/useNavDrawer";
import MhdLogo from "./MHDLogo";
import ArrowButton from "./ui/ArrowButton";

export default function StickyHeader() {
  const reduce = useReducedMotion();
  const { visible } = useScrollHeader();
  const openDrawer = useNavDrawer((s) => s.openDrawer);

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      // Hidden from AT + keyboard when off-screen so it isn't a focus trap.
      aria-hidden={!visible}
      inert={!visible}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-surface/95 backdrop-blur-sm"
    >
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="MHD Custom home"
          className="shrink-0 text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <MhdLogo className="h-8 w-auto sm:h-10" aria-hidden="true" />
        </Link>

        {/* Desktop nav — absolutely centered to the header, independent of
            the logo/right-cluster widths. */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative font-display text-sm uppercase tracking-label text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
                {/* underline wipe on hover */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Quote CTA — hidden on the smallest screens to save room */}
          <div className="hidden sm:block">
            <ArrowButton href="/contact" variant="brass" size="sm">
              Request a quote
            </ArrowButton>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
