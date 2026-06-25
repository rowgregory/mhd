"use client";

import Link from "next/link";
import { NAV, PHONE, PHONE_HREF } from "../lib/constants/common.constants";
import { motion } from "framer-motion";
import MhdLogo from "./MHDLogo";
import ArrowButton from "./ui/ArrowButton";
import { useMotionPresets } from "../lib/hooks/useMotionPresets";
import { BurgerButton } from "./ui/BurgerButton";

export default function Header() {
  const { item, makeContainer } = useMotionPresets();
  const headerContainer = makeContainer(0.08, 0.1);

  return (
    // Not fixed — sits in normal flow above the hero and scrolls away with it.
    // Transparent so the hero image shows through; text is bone for contrast.
    <motion.header
      initial="hidden"
      animate="show"
      variants={headerContainer}
      className="absolute inset-x-0 top-0 z-30 text-bone"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-14">
        {/* Top row: hamburger · logo · phone + quote.
            Relative so the wordmark can be absolutely centered to the page,
            independent of the left/right cluster widths. */}
        <div className="relative flex items-center justify-between py-4 sm:py-9">
          {/* Left: custom hamburger — staggered bars (stacked-timber nod),
              morphs to an X when open. Drives the drawer via the store. */}
          <BurgerButton />

          {/* Center: logo — absolutely centered to the header width.
              currentColor SVG: bone over the hero, brass on hover. The hero
              is always dark, so the logo stays bone regardless of theme. */}
          <motion.div
            variants={item}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Link
              href="/"
              aria-label="MHD Custom home"
              className="block text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <MhdLogo className="h-12 w-auto sm:h-20" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right: phone (hidden until lg) + quote CTA (hidden until sm) */}
          <motion.div
            variants={item}
            className="flex items-center gap-4 sm:gap-6"
          >
            <a
              href={PHONE_HREF}
              className="hidden text-[22px] text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-block"
            >
              {PHONE}
            </a>
            <div className="hidden lg:block">
              <ArrowButton href="/contact" variant="taupe" size="sm">
                Request a quote
              </ArrowButton>
            </div>
            {/* Spacer keeps the row balanced on mobile where right side is empty,
                so the absolutely-centered wordmark stays optically centered. */}
            <span aria-hidden="true" className="block h-11 w-11 sm:hidden" />
          </motion.div>
        </div>

        {/* Divider hairline (matches reference) */}
        <motion.div
          variants={item}
          className="hidden h-px w-full bg-bone/20 md:block"
        />

        {/* Bottom row: primary nav (desktop). Inactive = stone (#D4D0C3),
            active = bone; underline wipes in left-to-right on hover. */}
        <nav aria-label="Primary" className="mt-4 hidden md:block">
          <motion.ul
            variants={headerContainer}
            className="flex items-center justify-center gap-8 py-4"
          >
            {NAV.map((navItem) => {
              const active = navItem.href === "/";
              return (
                <motion.li key={navItem.href} variants={item}>
                  <Link
                    href={navItem.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative pb-1 text-lg uppercase leading-none transition-colors focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent
            before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-left before:bg-bone before:transition-transform before:duration-300 before:ease-out
            ${
              active
                ? "text-bone before:scale-x-100"
                : "text-stone before:scale-x-0 hover:text-bone hover:before:scale-x-100"
            }`}
                  >
                    {navItem.label}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}
