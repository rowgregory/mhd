import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { getAllProjectIds } from "@/app/lib/actions/project/getAppProjectIds";
import { getPublicProject } from "@/app/lib/actions/project/getPublicProject";

// Pre-render a static page per project at build time (revalidated on demand
// via the admin revalidatePath calls). Comment out if you prefer pure SSR.
export async function generateStaticParams() {
  const ids = await getAllProjectIds();
  return ids.map((id) => ({ id }));
}

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
  const { title } = await params;
  const cleanTitle = title.replace(/%20/g, " ");
  const project = await getPublicProject(cleanTitle);

  if (!project) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/portfolio/${title}`;

  return <ProjectDetailClient project={project} shareUrl={shareUrl} />;
}
