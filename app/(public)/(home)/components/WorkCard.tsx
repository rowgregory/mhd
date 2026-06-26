import Picture from "@/app/components/ui/Picture";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type Project = {
  img: string;
  alt: string;
  title: string;
  meta: string;
};

export function WorkCard({
  project: { img, alt, title, meta },
  reduce,
}: {
  project: Project;
  reduce: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Vertical drift as the whole section passes through the page (not tied to
  // the horizontal carousel scroll — that stays as-is).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Link
      href={`/portfolio/${title}`}
      ref={ref}
      className="group relative w-[78vw] shrink-0 snap-start overflow-hidden first:snap-center sm:w-[48vw] md:w-[38vw] lg:w-[30vw]"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
        {/* Parallax image — oversized so it stays full as it drifts */}
        <motion.div
          style={reduce ? undefined : { y: imageY }}
          className="absolute inset-x-0 top-[-10%] h-[120%] will-change-transform max-md:top-0! max-md:h-full! max-md:translate-y-0!"
        >
          <Picture
            src={img}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, (min-width: 640px) 48vw, 78vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        {/* Bottom gradient so caption text always clears contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/80 to-transparent"
        />
        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-display text-xl uppercase tracking-[0.06em] text-bone sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 font-sans text-sm text-bone/75">{meta}</p>
        </div>
      </div>
    </Link>
  );
}
