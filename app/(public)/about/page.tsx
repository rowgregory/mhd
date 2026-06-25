import { AboutClient } from "./AboutClient";
import prisma from "@/prisma/client";
import type { PortfolioProject } from "@/types/project.types";

/**
 * Public fetch for the homepage "Recent projects" carousel. No auth — public
 * content. Returns the newest projects that have at least one photo, shaped as
 * PortfolioProject (cover = featured photo, or first by order).
 */
export async function getRecentProjects(
  limit = 8,
): Promise<PortfolioProject[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { photos: { some: {} } }, // only projects that have photos
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        location: true,
        photos: {
          orderBy: [{ featured: "desc" }, { order: "asc" }],
          take: 1, // just the cover
          select: { url: true, alt: true },
        },
      },
    });

    return (
      projects
        // guard: drop any that somehow came back with no photo
        .filter((p) => p.photos.length > 0)
        .map((p) => ({
          id: p.id,
          title: p.title,
          location: p.location,
          cover: p.photos[0].url,
          coverAlt: p.photos[0].alt ?? p.title,
        }))
    );
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const projects = await getRecentProjects();
  return <AboutClient description="" projects={projects} />;
}
