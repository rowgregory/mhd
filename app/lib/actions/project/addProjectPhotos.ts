"use server";

import { NewPhoto, ProjectPhotoRecord, Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { photoSelect } from "../../selects/projects.selects";
import { createLog } from "../../utils/log.server.utils";
import { LogCategory, LogLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Add photos to a project. The files are uploaded to Firebase on the client;
 * this persists the resulting URLs. New photos are appended after existing ones
 * (order continues from the current max).
 */
export async function addProjectPhotos(
  projectId: string,
  photos: NewPhoto[],
): Promise<Result<ProjectPhotoRecord[]>> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };
  if (photos.length === 0) {
    return { success: false, error: "No photos to add." };
  }

  try {
    // continue ordering after the current highest
    const last = await prisma.projectPhoto.findFirst({
      where: { projectId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    let order = (last?.order ?? -1) + 1;

    await prisma.projectPhoto.createMany({
      data: photos.map((p) => ({
        projectId,
        url: p.url,
        alt: p.alt?.trim() || null,
        order: order++,
      })),
    });

    const rows = await prisma.projectPhoto.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
      select: photoSelect,
    });

    await createLog(
      LogLevel.INFO,
      `${actor.name ?? actor.email} added ${photos.length} photo(s) to a project`,
      {
        category: LogCategory.PROJECT,
        metadata: { projectId, count: photos.length },
      },
    );
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, data: rows };
  } catch {
    return { success: false, error: "Could not add photos." };
  }
}
