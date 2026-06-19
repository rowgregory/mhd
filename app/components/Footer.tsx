"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  NAV,
  PHONE,
  PHONE_HREF,
  EMAIL,
} from "../lib/constants/common.constants";

const HOURS = [
  "Mon–Fri: 8 AM – 5 PM",
  "Saturday: by appointment",
  "Sunday: closed",
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/mhdcustom",
    Icon: FacebookIcon,
  },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer className="bg-footer text-bone">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {/* Working hours */}
          <motion.div variants={rise}>
            <h2 className="font-display text-sm uppercase tracking-label text-bone">
              Working hours
            </h2>
            <ul className="mt-6 space-y-3 font-sans text-sm text-bone/70">
              {HOURS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </motion.div>

          {/* Office / contact */}
          <motion.div variants={rise}>
            <h2 className="font-display text-sm uppercase tracking-label text-bone">
              Workshop
            </h2>
            <address className="mt-6 space-y-1 font-sans text-sm not-italic leading-relaxed text-bone/70">
              <p>North Shore, MA —</p>
              <p>Serving Greater Boston</p>
              <p>by appointment</p>
            </address>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-block border-b border-bone/30 pb-0.5 font-sans text-sm text-bone/80 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="mt-5 block font-display text-2xl tracking-[0.04em] text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {PHONE}
            </a>
          </motion.div>

          {/* Links */}
          <motion.nav variants={rise} aria-label="Footer">
            <h2 className="font-display text-sm uppercase tracking-label text-bone">
              Links
            </h2>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-bone/70 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Socials */}
          <motion.div variants={rise}>
            <h2 className="font-display text-sm uppercase tracking-label text-bone">
              Get in touch
            </h2>
            <ul className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`MHD Custom on ${label}`}
                    className="inline-flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-bone/15 pt-8 sm:mt-16">
          <p className="font-sans text-xs text-bone/50">
            © {year} MHD Custom. All rights reserved. Built by{" "}
            <a
              href="https://sqysh.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone/70 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Sqysh
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Custom brand icons (Lucide has no social icons) ─────────────────────────
   currentColor fills so they follow text color through hover. Decorative —
   the link's aria-label carries the meaning. */
type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}
