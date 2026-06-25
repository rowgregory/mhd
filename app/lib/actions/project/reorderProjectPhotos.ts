"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";
import { Result } from "@/types/project.types";

export async function reorderProjectPhotos(
  projectId: string,
  orderedIds: string[],
): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.projectPhoto.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not reorder photos." };
  }
}
