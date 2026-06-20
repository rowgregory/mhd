"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { LogLevel, LogCategory } from "@prisma/client";
import { ProjectInput, ProjectRecord, Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import { projectSelect } from "../../selects/projects.selects";
import { createLog } from "../../utils/log.server.utils";

export async function updateProject(
  id: string,
  input: ProjectInput,
): Promise<Result<ProjectRecord>> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  const title = input.title?.trim();
  if (!title) return { success: false, error: "Title is required." };

  try {
    const row = await prisma.project.update({
      where: { id },
      data: {
        title,
        location: input.location?.trim() || null,
        description: input.description?.trim() || null,
      },
      select: projectSelect,
    });
    await createLog(
      LogLevel.INFO,
      `${actor.name ?? actor.email} edited the project "${row.title}"`,
      { category: LogCategory.PROJECT, metadata: { projectId: row.id } },
    );
    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);
    return { success: true, data: row };
  } catch {
    return { success: false, error: "Could not update project." };
  }
}
