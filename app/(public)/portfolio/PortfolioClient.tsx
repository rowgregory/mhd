"use client";

import PageHero from "@/app/components/PageHero";
import ProjectsGallery from "@/app/(public)/portfolio/components/ProjectsGallery";
import { PortfolioProject } from "@/types/project.types";

export function PortfolioClient({
  galleryProjects,
}: {
  galleryProjects: PortfolioProject[];
}) {
  return (
    <>
      <PageHero
        title="Portfolio"
        src="/images/portfolio.jpg"
        eyebrow="View our work"
        height="md"
      />

      <ProjectsGallery projects={galleryProjects} />
    </>
  );
}
