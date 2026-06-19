"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  NAV,
  PHONE,
  PHONE_HREF,
  EMAIL,
  SOCIALS,
  HOURS,
  SQYSH_URL,
} from "../lib/constants/common.constants";
import { useMotionPresets } from "../lib/hooks/useMotionPresets";
import MhdLogo from "./MHDLogo";

export default function Footer() {
  const year = new Date().getFullYear();
  const { container, rise } = useMotionPresets();

  return (
    <footer className="bg-footer text-bone">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Brand row — logo + tagline above the columns */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={rise}
          className="mb-12 flex flex-col gap-4 border-b border-bone/15 pb-10 sm:mb-14 sm:pb-12"
        >
          <Link
            href="/"
            aria-label="MHD Custom home"
            className="inline-flex w-fit text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <MhdLogo className="h-12 w-auto sm:h-14" aria-hidden="true" />
          </Link>
          <p className="max-w-md font-sans text-sm leading-relaxed text-bone/60">
            Custom cabinetry and fine woodwork, built by hand on Boston&rsquo;s
            North Shore.
          </p>
        </motion.div>

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
              href={SQYSH_URL}
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
