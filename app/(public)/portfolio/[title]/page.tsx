import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { getPublicProject } from "@/app/lib/actions/project/getPublicProject";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const { title } = await params;
  const project = await getPublicProject(title);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — MHD Custom`,
    description:
      project.description ??
      `Custom cabinetry project${project.location ? ` in ${project.location}` : ""} by MHD Custom.`,
    openGraph: {
      title: `${project.title} — MHD Custom`,
      images: project.photos[0]?.url ? [{ url: project.photos[0].url }] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = decodeURIComponent((await params).title);
  const project = await getPublicProject(title);

  if (!project) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/portfolio/${title}`;

  return <ProjectDetailClient project={project} shareUrl={shareUrl} />;
}
