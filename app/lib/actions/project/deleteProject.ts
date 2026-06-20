"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { LogLevel, LogCategory } from "@prisma/client";
import { Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import { createLog } from "../../utils/log.server.utils";

export async function deleteProject(id: string): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  try {
    const row = await prisma.project.delete({
      where: { id },
      select: { title: true },
    });
    await createLog(
      LogLevel.WARN,
      `${actor.name ?? actor.email} deleted the project "${row.title}"`,
      { category: LogCategory.PROJECT, metadata: { projectId: id } },
    );
    revalidatePath("/dashboard/projects");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not delete project." };
  }
}
