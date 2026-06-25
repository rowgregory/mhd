"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV } from "../lib/constants/common.constants";

import { useMotionPresets } from "../lib/hooks/useMotionPresets";
import MhdLogo from "./MHDLogo";
import ArrowButton from "./ui/ArrowButton";
import { BurgerButton } from "./ui/BurgerButton";

export default function InnerHeader() {
  const pathname = usePathname();
  const { makeContainer, item } = useMotionPresets();

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={makeContainer(0.06, 0.05)}
      className="absolute inset-x-0 top-0 z-30 text-bone"
    >
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-16 lg:h-30"
      >
        <div className="flex items-center gap-x-10">
          {/* Logo — left */}
          <motion.div variants={item} className="shrink-0">
            <Link
              href="/"
              aria-label="MHD Custom home"
              className="block text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <MhdLogo className="h-8 w-auto sm:h-20" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul
            variants={makeContainer(0.07, 0.15)}
            className="items-center gap-8 hidden lg:flex"
          >
            {NAV.map((navItem) => {
              const active =
                navItem.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(navItem.href);
              return (
                <motion.li key={navItem.href} variants={item}>
                  <Link
                    href={navItem.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative font-display uppercase text-lg font-medium tracking-[1px] transition-colors focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent
                    before:absolute before:inset-x-0 before:-bottom-1 before:h-0.5 before:origin-left before:bg-bone before:transition-transform before:duration-300 before:ease-out
                    ${
                      active
                        ? "text-bone before:scale-x-100"
                        : "text-bone before:scale-x-0 hover:text-bone hover:before:scale-x-100"
                    }`}
                  >
                    {navItem.label}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Right: quote CTA (desktop) + mobile hamburger */}
        <motion.div
          variants={item}
          className="flex shrink-0 items-center gap-2"
        >
          <div className="hidden sm:block">
            <ArrowButton href="/contact" variant="taupe" size="sm">
              Request a quote
            </ArrowButton>
          </div>
          <BurgerButton />
        </motion.div>
      </nav>
    </motion.header>
  );
}
