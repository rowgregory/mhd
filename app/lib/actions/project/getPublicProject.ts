import prisma from "@/prisma/client";
import type { ProjectRecord } from "@/types/project.types";

export async function getPublicProject(
  title: string,
): Promise<ProjectRecord | null> {
  try {
    const project = await prisma.project.findFirst({
      where: { title },
      select: {
        id: true,
        title: true,
        location: true,
        description: true,
        createdAt: true,
        photos: {
          orderBy: [{ featured: "desc" }, { order: "asc" }],
          select: {
            id: true,
            url: true,
            alt: true,
            order: true,
            featured: true,
          },
        },
      },
    });
    return project;
  } catch {
    return null;
  }
}
