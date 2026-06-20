"use server";

import { Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function setFeaturedPhoto(
  projectId: string,
  photoId: string,
): Promise<Result> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Not authorized." };
  }
  try {
    // one featured per project: clear others, set this one
    await prisma.$transaction([
      prisma.projectPhoto.updateMany({
        where: { projectId },
        data: { featured: false },
      }),
      prisma.projectPhoto.update({
        where: { id: photoId },
        data: { featured: true },
      }),
    ]);
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not set featured photo." };
  }
}
