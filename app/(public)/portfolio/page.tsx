import { listProjects } from "@/app/lib/actions/project";
import { PortfolioClient } from "./PortfolioClient";
import { PortfolioProject } from "@/types/project.types";

export default async function PortfolioPage() {
  const result = await listProjects();

  // Map to the gallery shape. On failure, fall back to an empty list so the
  // page still renders (the gallery shows its own empty state).
  const galleryProjects: PortfolioProject[] = result.success
    ? result.data
        // only projects that actually have a cover image
        .filter((p) => p.photos.length > 0)
        .map((p) => ({
          id: p.id,
          title: p.title,
          location: p.location,
          cover: p.photos.find((ph) => ph.featured)?.url ?? p.photos[0].url,
        }))
    : [];

  return <PortfolioClient galleryProjects={galleryProjects} />;
}
