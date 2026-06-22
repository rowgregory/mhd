"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Picture from "@/app/components/ui/Picture";
import { useMotionPresets } from "@/app/lib/hooks/useMotionPresets";
import type { ProjectRecord } from "@/types/project.types";
import PhotoGrid from "@/app/components/PhotoGrid";

export function ProjectDetailClient({
  project,
  shareUrl,
}: {
  project: ProjectRecord;
  shareUrl: string;
}) {
  const { reveal, makeContainer, rise, fromLeft } = useMotionPresets();

  const photos = project.photos;
  const featured = photos[0];
  // photos shown in the lower grid (everything after the featured one)
  const gridPhotos = photos.slice(1).map((p) => ({
    url: p.url,
    alt: p.alt ?? project.title,
  }));

  const dateLabel = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-1.5 font-sans text-sm text-fg-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
          All projects
        </Link>

        {/* ── Top: featured image left + meta right ─────────────────────── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Featured image */}
          {featured && (
            <motion.div
              variants={fromLeft}
              {...reveal}
              className="relative aspect-square w-full overflow-hidden"
            >
              <Picture
                fill
                src={featured.url}
                alt={featured.alt ?? project.title}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Meta column */}
          <motion.div variants={makeContainer(0.1, 0.05)} {...reveal}>
            {project.description && (
              <motion.p
                variants={rise}
                className="font-sans text-base leading-relaxed text-fg-muted"
              >
                {project.description}
              </motion.p>
            )}

            {/* Detail rows */}
            <motion.dl variants={rise} className="mt-8 space-y-3">
              {project.location && (
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 font-sans text-sm font-medium text-fg">
                    Location
                  </dt>
                  <dd className="font-sans text-sm text-fg-muted">
                    {project.location}
                  </dd>
                </div>
              )}
              {dateLabel && (
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 font-sans text-sm font-medium text-fg">
                    Date
                  </dt>
                  <dd className="font-sans text-sm text-fg-muted">
                    {dateLabel}
                  </dd>
                </div>
              )}
            </motion.dl>

            {/* Share row */}
            <motion.div
              variants={rise}
              className="mt-8 flex items-center gap-4"
            >
              <ShareLink
                label="Share on Facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              >
                <FacebookIcon />
              </ShareLink>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Title + body ──────────────────────────────────────────────── */}
        <motion.div
          variants={makeContainer(0.1, 0.05)}
          {...reveal}
          className="mt-16 max-w-3xl"
        >
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] uppercase leading-tight tracking-[0.02em] text-fg"
          >
            {project.title}
          </motion.h1>
          {project.description && (
            <motion.p
              variants={rise}
              className="mt-5 font-sans text-base leading-relaxed text-fg-muted"
            >
              {project.description}
            </motion.p>
          )}
        </motion.div>

        {/* ── Remaining photos ──────────────────────────────────────────── */}
        {gridPhotos.length > 0 && (
          <div className="mt-10">
            <PhotoGrid photos={gridPhotos} lightbox />
          </div>
        )}
      </div>
    </main>
  );
}

// ── Share helpers ─────────────────────────────────────────────────────────

function ShareLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
