"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { LogLevel, LogCategory } from "@prisma/client";
import { Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import { createLog } from "../../utils/log.server.utils";

export async function deleteProjectPhoto(photoId: string): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  try {
    const photo = await prisma.projectPhoto.delete({
      where: { id: photoId },
      select: { projectId: true },
    });
    await createLog(
      LogLevel.INFO,
      `${actor.name ?? actor.email} removed a project photo`,
      { category: LogCategory.PROJECT, metadata: { photoId } },
    );
    revalidatePath(`/dashboard/projects/${photo.projectId}`);
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not delete photo." };
  }
}
