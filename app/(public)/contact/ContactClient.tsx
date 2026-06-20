"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import {
  ADDRESS_LINE1,
  ADDRESS_LINE2,
  EMAIL,
  PHONE,
  PHONE_HREF,
} from "@/app/lib/constants/common.constants";
import RequestAQuoteForm from "@/app/components/forms/RequestAQuoteForm";

export function ContactClient() {
  const { makeContainer, rise, fromLeft, reveal } = useMotionPresets();
  return (
    <>
      <PageHero
        title="Contact"
        src="/images/contact.jpg"
        eyebrow="Get in Touch"
        height="md"
      />
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* ── Left: info ─────────────────────────────────────────────── */}
            <motion.div
              variants={makeContainer(0.1, 0.05)}
              {...reveal}
              className="flex flex-col"
            >
              <motion.p
                variants={rise}
                className="font-mono text-[10px] uppercase tracking-label text-accent"
              >
                Contact us
              </motion.p>

              <motion.h2
                variants={rise}
                className="mt-4 font-display text-[clamp(2.25rem,6vw,3.5rem)] uppercase leading-[1.05] tracking-[0.02em] text-fg"
              >
                Have questions? <span className="block">Get in touch!</span>
              </motion.h2>

              <motion.p
                variants={rise}
                className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-fg-muted"
              >
                We build custom cabinetry and fine woodwork for homes and
                businesses across the North Shore. Tell us about your project
                and we&rsquo;ll get back to you within one business day.
              </motion.p>

              <motion.ul
                variants={makeContainer(0.08, 0.3)}
                className="mt-10 space-y-5"
              >
                <motion.li variants={rise} className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <address className="not-italic font-sans text-sm leading-relaxed text-fg-muted">
                    {ADDRESS_LINE1}
                    <br />
                    {ADDRESS_LINE2}
                  </address>
                </motion.li>

                <motion.li variants={rise} className="flex items-center gap-3">
                  <Phone
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  />
                  <a
                    href={PHONE_HREF}
                    className="font-display text-xl tracking-[0.04em] text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {PHONE}
                  </a>
                </motion.li>

                <motion.li variants={rise} className="flex items-center gap-3">
                  <Mail
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="border-b border-line/30 pb-0.5 font-sans text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {EMAIL}
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* ── Right: form ─────────────────────────────────────────────── */}
            <motion.div variants={fromLeft} {...reveal} className="lg:pt-8">
              <RequestAQuoteForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
