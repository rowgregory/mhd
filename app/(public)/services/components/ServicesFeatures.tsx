"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  InstallIcon,
  DeliveryIcon,
  PrecisionIcon,
  QualityIcon,
} from "../../../components/ui/ServiceIcons";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";

type Service = {
  Icon: (props: { className?: string; size?: number }) => React.JSX.Element;
  title: string;
  blurb: string;
};

const SERVICES: Service[] = [
  {
    Icon: InstallIcon,
    title: "Installation",
    blurb: "Expert fitting, level and true, in your space.",
  },
  {
    Icon: DeliveryIcon,
    title: "Delivery",
    blurb: "Careful transport and handling, start to finish.",
  },
  {
    Icon: PrecisionIcon,
    title: "Precision",
    blurb: "Measured, milled and joined to exacting tolerances.",
  },
  {
    Icon: QualityIcon,
    title: "Quality",
    blurb: "Built by hand from materials chosen to last.",
  },
];

export default function ServicesFeatures() {
  const { container, rise } = useMotionPresets();

  return (
    <section
      aria-labelledby="services-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={rise}
            className="text-[clamp(11px,2vw,13px)] uppercase tracking-[0.28em] text-fg-subtle"
          >
            Welcome to MHD Custom
          </motion.p>
          <motion.h2
            id="services-heading"
            variants={rise}
            className="mt-5 font-display text-[clamp(1.75rem,5.5vw,3.25rem)] uppercase leading-[1.05] tracking-[0.01em] text-fg"
          >
            What goes into every{" "}
            <span className="text-accent">piece we build</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-2 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map(({ Icon, title, blurb }) => (
            <motion.li key={title} variants={rise}>
              <div className="group flex h-full flex-col items-center px-6 py-10 text-center transition-colors duration-300 hover:bg-surface-alt focus-within:bg-surface-alt">
                {/* Icon over soft blob — sized responsively: ~52px on mobile,
                    65px on desktop. The SVG fills this box. */}
                <div className="relative mb-7 flex h-20 w-20 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 -top-4 h-19 w-19 rounded-full bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <span className="relative h-13 w-13 text-accent sm:h-20 sm:w-20">
                    <Icon className="h-full w-full" />
                  </span>
                </div>

                <h3 className="font-display text-[22px] uppercase tracking-wide text-brown-text">
                  {title}
                </h3>
                <p className="font-sans leading-relaxed text-warm-gray">
                  {blurb}
                </p>

                {/* Plus — decorative accent that grows on hover */}
                <Plus
                  size={22}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="mt-6 text-fg-subtle transition-all duration-300 group-hover:rotate-90 group-hover:text-accent"
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
